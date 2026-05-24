import React from 'react';

export default function NewsletterSection() {
  return (
    <section className="nl-section" aria-label="Newsletter Subscription">
      <div className="nl-card">
        <h2 className="nl-title">
          Subscribe To Our Newsletter &<br />
          Grab 30% OFF
        </h2>
        <form className="nl-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="nl-input"
            placeholder="Enter Your Email"
            aria-label="Email Address"
            required
          />
          <button type="submit" className="nl-submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
