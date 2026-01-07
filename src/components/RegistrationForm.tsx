// Registration Form Component
// Complete form with validation and Firestore integration

import { useState, useEffect } from 'react';
import { X, Loader, CheckCircle } from 'lucide-react';
import { Registration, Department, DEPARTMENTS } from '../types';
import { saveRegistration, validateRegistration } from '../firebaseUtils';
import { TECHNICAL_EVENTS, NON_TECHNICAL_EVENTS, PAPER_PRESENTATION_TOPICS } from '../data';
import './RegistrationForm.css';

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialEvent?: { name: string; department: Department };
}

export const RegistrationForm = ({ isOpen, onClose, initialEvent }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<Omit<Registration, 'timestamp'>>({
    name: '',
    college: '',
    department: 'auto_mech',
    year: '1',
    phone: '',
    email: '',
    eventType: 'technical',
    eventName: initialEvent?.name || ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

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
      return TECHNICAL_EVENTS.filter((e) => e.department === formData.department).map((e) => e.name);
    } else if (formData.eventType === 'paper_presentation') {
      return PAPER_PRESENTATION_TOPICS[formData.department]?.map(
        (topic) => `Paper Presentation: ${topic}`
      ) || [];
    } else if (formData.eventType === 'non_technical') {
      return NON_TECHNICAL_EVENTS.map((e) => e.name);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setErrors([]);

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
            eventName: ''
          });
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
                    <option value="4">4th Year</option>
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

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-gold btn-large"
                disabled={loading || availableEvents.length === 0}
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
