import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Successfully subscribed!' });
        setEmail('');
      } else {
        // Handle validation errors or already subscribed
        setStatus({ 
          type: 'error', 
          message: data.errors?.email?.[0] || data.message || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to connect to server. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="nl-section" aria-label="Newsletter Subscription">
      <div className="nl-card">
        <h2 className="nl-title">
          Subscribe To Our Newsletter &<br />
          Grab 30% OFF
        </h2>
        <form className="nl-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="nl-input"
            placeholder="Enter Your Email"
            aria-label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="nl-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status.message && (
          <p className={`nl-status ${status.type}`} style={{ 
            marginTop: '1rem', 
            fontSize: '0.9rem', 
            color: status.type === 'success' ? '#48bb78' : '#f56565',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
}
