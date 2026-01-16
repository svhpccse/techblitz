// Registration Form Component
// Complete form with validation and Firestore integration

import { useState, useEffect } from 'react';
import { X, Loader, CheckCircle, Upload } from 'lucide-react';
import type { Registration, Department } from '../types';
import { DEPARTMENTS } from '../types';
import { saveRegistration, validateRegistration } from '../firebaseUtils';
import { uploadPaymentScreenshot } from '../cloudinaryUtils';
import { getAllEventsFromFirestore, getAllPaperTopicsFromFirestore } from '../firestoreEventDataUtils';
import type { TechEvent } from '../firestoreEventDataUtils';
import './RegistrationForm.css';

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialEvent?: { name: string; department: Department };
}

// QR Code Image (Static QR code - replace with your actual QR code image)
const QR_CODE_IMAGE = '/qr.jpeg';

export const RegistrationForm = ({ isOpen, onClose, initialEvent }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<Omit<Registration, 'timestamp'>>({
    name: '',
    college: '',
    department: 'auto_mech',
    year: '1',
    phone: '',
    email: '',
    eventType: 'technical',
    eventName: initialEvent?.name || '',
    paymentScreenshot: undefined
  });

  const [events, setEvents] = useState<TechEvent[]>([]);
  const [paperTopics, setPaperTopics] = useState<Record<string, string[]>>({});
  const [paymentScreenshotPreview, setPaymentScreenshotPreview] = useState<string | null>(null);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  // Load events and paper topics from Firestore
  useEffect(() => {
    loadEventData();
  }, []);

  const loadEventData = async () => {
    try {
      const [eventsData, topicsData] = await Promise.all([
        getAllEventsFromFirestore(),
        getAllPaperTopicsFromFirestore()
      ]);
      setEvents(eventsData);
      setPaperTopics(topicsData);
    } catch (err) {
      console.error('Error loading event data:', err);
    }
  };

  // Update form when initialEvent changes
  useEffect(() => {
    if (initialEvent) {
      setFormData((prev) => ({
        ...prev,
        eventName: initialEvent.name,
        department: initialEvent.department,
        eventType: initialEvent.name.includes('Paper') ? 'paper_presentation' : 
                   initialEvent.name === 'RHYTHMICA' ? 'non_technical' : 'technical'
      }));
    }
  }, [initialEvent]);

  // Get available events based on event type and department
  const getAvailableEvents = () => {
    if (formData.eventType === 'technical') {
      return events
        .filter((e) => e.department === formData.department && e.type === 'technical')
        .map((e) => e.name);
    } else if (formData.eventType === 'paper_presentation') {
      return paperTopics[formData.department]?.map(
        (topic) => `Paper Presentation: ${topic}`
      ) || [];
    } else if (formData.eventType === 'non_technical') {
      return events.filter((e) => e.type === 'non_technical').map((e) => e.name);
    }
    return [];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset event name when department or event type changes
      if (name === 'department' || name === 'eventType') {
        updated.eventName = '';
      }
      return updated;
    });
    setFormError('');
  };

  const handlePaymentScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormError('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setFormError('Please upload an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      uploadToCloudinary(file);
      setFormError('');
    }
  };

  const uploadToCloudinary = async (file: File) => {
    setUploadingScreenshot(true);
    try {
      const url = await uploadPaymentScreenshot(file);
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: url
      }));
      setFormError('');
    } catch (error: any) {
      setFormError('Failed to upload payment screenshot. Please try again.');
      console.error('Cloudinary upload error:', error);
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setErrors([]);

    // Check if payment screenshot is uploaded
    if (!formData.paymentScreenshot) {
      setFormError('Please upload a screenshot of your payment');
      return;
    }

    // Validate form
    const validation = validateRegistration(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const result = await saveRegistration(formData);
      if (result.success) {
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            college: '',
            department: 'auto_mech',
            year: '1',
            phone: '',
            email: '',
            eventType: 'technical',
            eventName: '',
            paymentScreenshot: undefined
          });
          setPaymentScreenshotPreview(null);
          setShowPaymentSection(false);
          onClose();
        }, 3000);
      } else {
        setFormError(result.message);
      }
    } catch (error: any) {
      setFormError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const availableEvents = getAvailableEvents();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {!submitted ? (
          <>
            {/* Form Header */}
            <div className="form-header">
              <h2>Register for TECH BLITZ 2K26</h2>
              <p>Fill in your details below to register for the event</p>
            </div>

            {/* Error Messages */}
            {formError && <div className="alert alert-error">{formError}</div>}
            {errors.length > 0 && (
              <div className="alert alert-error">
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="registration-form">
              {/* Row 1: Name and College */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="college">College Name *</label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    placeholder="Enter your college name"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Department and Year */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    {Object.entries(DEPARTMENTS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year *</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Phone and Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Event Type */}
              <div className="form-group">
                <label htmlFor="eventType">Event Type *</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="technical">Technical Event</option>
                  <option value="paper_presentation">Paper Presentation</option>
                  <option value="non_technical">Non-Technical Event</option>
                </select>
              </div>

              {/* Row 5: Event Name */}
              <div className="form-group">
                <label htmlFor="eventName">Select Event *</label>
                {availableEvents.length > 0 ? (
                  <select
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose an event...</option>
                    {availableEvents.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="no-events-message">
                    No events available for this selection. Please change department or event type.
                  </div>
                )}
              </div>

              {/* Payment Section */}
              <div className="payment-section">
                <button
                  type="button"
                  onClick={() => setShowPaymentSection(!showPaymentSection)}
                  className="payment-toggle-btn"
                >
                  {showPaymentSection ? '▼' : '▶'} Complete Payment
                </button>

                {showPaymentSection && (
                  <div className="payment-content">
                    {/* QR Code */}
                    <div className="qr-code-container">
                      <h4>Scan to Pay</h4>
                      <p>Registration Fee: ₹150</p>
                      <img src={QR_CODE_IMAGE} alt="Payment QR Code" className="qr-code" />
                      <p className="qr-instruction">Scan this QR code to complete your payment</p>
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div className="payment-upload-container">
                      <h4>Upload Payment Proof</h4>
                      <div className="upload-area">
                        <input
                          type="file"
                          id="paymentScreenshot"
                          name="paymentScreenshot"
                          accept="image/*"
                          onChange={handlePaymentScreenshotChange}
                          disabled={uploadingScreenshot}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="paymentScreenshot" className="upload-label">
                          {uploadingScreenshot ? (
                            <>
                              <Loader size={24} className="animate-spin" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload size={24} />
                              <span>Click to upload payment screenshot</span>
                              <p className="upload-hint">PNG, JPG, GIF up to 5MB</p>
                            </>
                          )}
                        </label>
                      </div>

                      {/* Preview */}
                      {paymentScreenshotPreview && (
                        <div className="screenshot-preview">
                          <p>Payment proof uploaded:</p>
                          <img src={paymentScreenshotPreview} alt="Payment Screenshot" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-gold btn-large"
                disabled={loading || availableEvents.length === 0 || !showPaymentSection}
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Complete Registration</span>
                )}
              </button>

              <p className="form-note">
                Registration Fee: ₹150/head • Spot Registration Available (Except Paper Presentation)
              </p>
            </form>
          </>
        ) : (
          // Success Message
          <div className="success-container">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h3>Registration Successful!</h3>
            <p>Thank you for registering for TECH BLITZ 2K26</p>
            <div className="success-details">
              <p>
                <strong>Event:</strong> {formData.eventName}
              </p>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Department:</strong> {DEPARTMENTS[formData.department]}
              </p>
            </div>
            <p className="success-note">Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
