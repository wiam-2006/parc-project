import React, { useState } from 'react';
import sendEventInquiry from '../api/eventInquiryApi';

export default function EventForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Birthday Party',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes('@')) {
      newErrors.email = "Invalid email format (must contain @)";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
    }
    
    if (!formData.eventType) newErrors.eventType = "Event Type is required";
    
    if (!formData.date) {
      newErrors.date = "Preferred Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }
    
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await sendEventInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        preferred_date: formData.date,
        message: formData.message,
      });

      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: 'Birthday Party',
        date: '',
        message: ''
      });
      setErrors({});
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        setErrors({
          name: validationErrors.name?.[0],
          email: validationErrors.email?.[0],
          phone: validationErrors.phone?.[0],
          eventType: validationErrors.event_type?.[0],
          date: validationErrors.preferred_date?.[0],
          message: validationErrors.message?.[0],
        });
      }

      setSubmitError(error.response?.data?.message || 'Unable to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setSubmitError('');
    // Clear error for this field when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  return (
    <section className="event-form-section" id="contact" aria-label="Plan Your Event">
      {/* Success Message Popup */}
      {showSuccess && (
        <div className="success-popup-overlay">
          <div className="success-popup animate-popup">
            <div className="success-icon-wrapper">
              <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="success-text">
              <h3>Merci !</h3>
              <p>
                Votre réservation a bien été prise en compte.<br />
                Notre équipe examinera votre demande avec attention et vous contactera prochainement.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="event-form-container">
        <div className="event-form-header">
          <h2 className="event-form-title">Plan Your Event</h2>
          <p className="event-form-subtitle">Tell us your vision and we'll handle the rest.</p>
        </div>
        
        <form className="event-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">FULL NAME</label>
            <input 
              type="text" 
              id="name" 
              className={`form-input ${errors.name ? 'error' : ''}`} 
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">EMAIL</label>
              <input 
                type="email" 
                id="email" 
                className={`form-input ${errors.email ? 'error' : ''}`} 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">PHONE NUMBER</label>
              <input 
                type="tel" 
                id="phone" 
                className={`form-input ${errors.phone ? 'error' : ''}`} 
                placeholder="0612345678" 
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="eventType" className="form-label">EVENT TYPE</label>
              <div className="select-wrapper">
                <select 
                  id="eventType" 
                  className={`form-input select-input ${errors.eventType ? 'error' : ''}`} 
                  value={formData.eventType}
                  onChange={handleChange}
                >
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Festival">Festival</option>
                  <option value="Family Day">Family Day</option>
                  <option value="Kids Event">Kids Event</option>
                  <option value="Corporate Event">Corporate Event</option>
                </select>
              </div>
              {errors.eventType && <span className="error-msg">{errors.eventType}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="date" className="form-label">PREFERRED DATE</label>
              <input 
                type="date" 
                id="date" 
                className={`form-input ${errors.date ? 'error' : ''}`} 
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <span className="error-msg">{errors.date}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">MESSAGE</label>
            <textarea 
              id="message" 
              className={`form-input textarea-input ${errors.message ? 'error' : ''}`} 
              placeholder="How can we make it special?"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Submit Request'}
          </button>
          {submitError && <span className="error-msg">{submitError}</span>}
        </form>
      </div>
    </section>
  );
}
