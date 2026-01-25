// Registration Page Component
// Standalone page for registration instead of modal

import { useState, useEffect } from 'react';
import { ChevronLeft, Loader, CheckCircle, Upload, FileText, X as CloseIcon } from 'lucide-react';
import type { Registration, Department } from '../types';
import { DEPARTMENTS } from '../types';
import { saveRegistration, validateRegistration } from '../firebaseUtils';
import { uploadPaymentScreenshot, uploadPaperFile } from '../cloudinaryUtils';
import { getAllEventsFromFirestore, getAllPaperTopicsFromFirestore } from '../firestoreEventDataUtils';
import type { TechEvent } from '../firestoreEventDataUtils';
import './RegistrationPage.css';

interface RegistrationPageProps {
  onNavigateBack: () => void;
  initialEvent?: { name: string; department: Department };
}

// QR Code Image (Static QR code - replace with your actual QR code image)
const QR_CODE_IMAGE = '/qr.jpeg';

export const RegistrationPage = ({ onNavigateBack, initialEvent }: RegistrationPageProps) => {
  const [formData, setFormData] = useState<Omit<Registration, 'timestamp'>>({
    name: '',
    college: '',
    department: 'auto_mech',
    year: '1',
    phone: '',
    email: '',
    eventType: 'technical',
    eventName: initialEvent?.name || '',
    paymentScreenshot: undefined,
    paperFile: undefined,
    paperFileName: undefined
  });

  const [events, setEvents] = useState<TechEvent[]>([]);
  const [paperTopics, setPaperTopics] = useState<Record<string, string[]>>({});
  const [paymentScreenshotPreview, setPaymentScreenshotPreview] = useState<string | null>(null);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const [uploadingPaperFile, setUploadingPaperFile] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  // Load events and paper topics from Firestore
  useEffect(() => {
    loadEventData();
  }, []);

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

  const loadEventData = async () => {
    try {
      console.log('Loading event data...');
      const [eventsData, topicsData] = await Promise.all([
        getAllEventsFromFirestore(),
        getAllPaperTopicsFromFirestore()
      ]);
      console.log('Events loaded:', eventsData);
      console.log('Topics loaded:', topicsData);
      console.log('Total events:', eventsData.length);
      console.log('Events by type:', {
        technical: eventsData.filter(e => e.type === 'technical').length,
        non_technical: eventsData.filter(e => e.type === 'non_technical').length,
      });
      setEvents(eventsData);
      setPaperTopics(topicsData);
      setEventsLoaded(true);
    } catch (err) {
      console.error('Error loading event data:', err);
      setEventsLoaded(true);
    }
  };

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
  };

  const handlePaymentScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPaymentScreenshotPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      setUploadingScreenshot(true);
      try {
        const url = await uploadPaymentScreenshot(file);
        setFormData((prev) => ({
          ...prev,
          paymentScreenshot: url
        }));
      } catch (err) {
        console.error('Error uploading screenshot:', err);
        setErrors(['Failed to upload payment screenshot. Please try again.']);
      } finally {
        setUploadingScreenshot(false);
      }
    }
  };

  const handlePaperFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('=== PAPER FILE INPUT CHANGE ===');
    console.log('File selected:', file ? 'YES' : 'NO');
    
    if (file) {
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size,
        sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
      });

      // Upload to Cloudinary
      setUploadingPaperFile(true);
      console.log('Starting paper file upload...');
      
      try {
        console.log('Calling uploadPaperFile function...');
        const url = await uploadPaperFile(file);
        console.log('✅ Upload completed successfully!');
        console.log('Returned URL:', url);
        
        setFormData((prev) => {
          console.log('Updating form data with paper file');
          const updated = {
            ...prev,
            paperFile: url,
            paperFileName: file.name
          };
          console.log('Updated form data:', {
            paperFile: url ? 'URL set' : 'URL not set',
            paperFileName: updated.paperFileName
          });
          return updated;
        });
        setErrors([]);
        console.log('✅ Paper file upload process complete');
      } catch (err: any) {
        console.error('❌ Error uploading paper file:', err);
        console.error('Error message:', err.message);
        setErrors([err.message || 'Failed to upload paper file. Please try again.']);
        // Clear the input
        e.target.value = '';
      } finally {
        setUploadingPaperFile(false);
        console.log('=== END PAPER FILE INPUT CHANGE ===');
      }
    }
  };

  const removePaperFile = () => {
    setFormData((prev) => ({
      ...prev,
      paperFile: undefined,
      paperFileName: undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION START ===');
    console.log('Form data at submission:', {
      name: formData.name,
      email: formData.email,
      eventType: formData.eventType,
      eventName: formData.eventName,
      paymentScreenshot: formData.paymentScreenshot ? 'SET' : 'NOT SET',
      paperFile: formData.paperFile ? 'SET' : 'NOT SET',
      paperFileName: formData.paperFileName
    });

    setErrors([]);
    setFormError('');
    setLoading(true);

    try {
      // Validate form data
      console.log('Validating registration data...');
      const validation = validateRegistration(formData);
      console.log('Validation result:', {
        isValid: validation.isValid,
        errors: validation.errors
      });
      
      if (!validation.isValid) {
        console.log('❌ Validation failed');
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Check if payment screenshot is uploaded
      console.log('Checking payment screenshot...');
      if (!formData.paymentScreenshot) {
        console.log('❌ Payment screenshot missing');
        setFormError('Please upload a payment screenshot before submitting.');
        setLoading(false);
        return;
      }
      console.log('✅ Payment screenshot present');

      // Paper file is now optional for paper presentations
      console.log('Event type:', formData.eventType);
      if (formData.eventType === 'paper_presentation' && formData.paperFile) {
        console.log('✅ Paper file present:', formData.paperFileName);
      } else if (formData.eventType === 'paper_presentation') {
        console.log('⚠️  Paper file not uploaded (optional)');
      }

      // Save to Firestore
      console.log('Saving registration to Firestore...');
      await saveRegistration(formData);
      console.log('✅ Registration saved successfully');
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
      console.error('❌ Form submission error:', errorMessage);
      setFormError(errorMessage);
    } finally {
      setLoading(false);
      console.log('=== FORM SUBMISSION END ===');
    }
  };

  const availableEvents = getAvailableEvents();

  if (submitted) {
    return (
      <div className="registration-page">
        <div className="success-container">
          <CheckCircle size={80} color="#FFD700" />
          <h3>Registration Successful!</h3>
          <p>Thank you for registering for TECH BLITZ 2K26</p>
          <div className="success-details">
            <p>
              <strong>Name:</strong>
              <span>{formData.name}</span>
            </p>
            <p>
              <strong>Event:</strong>
              <span>{formData.eventName}</span>
            </p>
            <p>
              <strong>Email:</strong>
              <span>{formData.email}</span>
            </p>
          </div>
          <p className="success-note">We have sent a confirmation email to your registered email address.</p>
          <button className="btn btn-gold" onClick={onNavigateBack}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-page">
      <div className="page-container">
        {/* Page Header with Back Button */}
        <div className="page-header">
          <button className="back-button" onClick={onNavigateBack}>
            <ChevronLeft size={24} />
            <span>Back</span>
          </button>
          <div className="header-content">
            <h1>Register for TECH BLITZ 2K26</h1>
            <p>Fill in your details below to register for the event</p>
          </div>
        </div>

        {/* Error Messages */}
        {formError && <div className="alert alert-error">{formError}</div>}
        {errors.length > 0 && (
          <div className="alert alert-error">
            <ul>
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
            {!eventsLoaded ? (
              <div className="no-events-message">
                Loading events...
              </div>
            ) : availableEvents.length > 0 ? (
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

          {/* Paper File Upload Section (for Paper Presentations) */}
          {formData.eventType === 'paper_presentation' && (
            <div className="paper-file-section">
              <div className="paper-upload-container">
                <h4>Upload Your Paper (Optional)</h4>
                <p className="upload-description">
                  Submit your paper as a PDF or Word document (DOC/DOCX)
                </p>
                <div className="upload-area">
                  <input
                    type="file"
                    id="paperFile"
                    name="paperFile"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => {
                      console.log('📎 Paper file input changed');
                      console.log('Files:', e.target.files);
                      handlePaperFileChange(e);
                    }}
                    disabled={uploadingPaperFile}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="paperFile" className="upload-label">
                    <FileText size={40} />
                    <span>{uploadingPaperFile ? 'Uploading...' : 'Click or drag to upload'}</span>
                  </label>
                  <p className="upload-hint">Accepted: PDF, DOC, DOCX (Max 10MB)</p>
                </div>
                {formData.paperFile && (
                  <div className="file-uploaded">
                    <div className="file-info">
                      <FileText size={20} />
                      <div className="file-details">
                        <p className="file-name">{formData.paperFileName}</p>
                        <p className="file-status">✓ Uploaded successfully</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-remove-file"
                      onClick={removePaperFile}
                      disabled={uploadingPaperFile}
                    >
                      <CloseIcon size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

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
                      <Upload size={40} />
                      <span>{uploadingScreenshot ? 'Uploading...' : 'Click or drag to upload'}</span>
                    </label>
                    <p className="upload-hint">Accepted: JPG, PNG, GIF (Max 5MB)</p>
                  </div>
                  {paymentScreenshotPreview && (
                    <div className="screenshot-preview">
                      <p>Payment Proof Preview:</p>
                      <img src={paymentScreenshotPreview} alt="Payment Screenshot Preview" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn btn-gold" 
            disabled={loading || uploadingScreenshot || uploadingPaperFile}
          >
            {loading ? (
              <Loader className="animate-spin" size={20} />
            ) : uploadingScreenshot ? (
              <span>Uploading Payment Proof...</span>
            ) : uploadingPaperFile ? (
              <span>Uploading Paper File...</span>
            ) : null}
            {!loading && !uploadingScreenshot && !uploadingPaperFile && 'Complete Registration'}
          </button>

          <p className="form-note">* All fields are required. Make sure to upload payment proof before submitting.</p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
