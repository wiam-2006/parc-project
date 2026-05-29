import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './ContactSection.css';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact-form">
      <div className="contact-section__inner">

        {/* LEFT — Form */}
        <motion.div 
          className="contact-form-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="contact-form-card__title">Send Us a Message</h2>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__group">
              <label htmlFor="name" className="contact-form__label">First name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="contact-form__input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__group">
              <label htmlFor="email" className="contact-form__label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Address"
                className="contact-form__input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__group">
              <label htmlFor="phone" className="contact-form__label">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+212..."
                className="contact-form__input"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__group">
              <label htmlFor="message" className="contact-form__label">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your plans to visit our park"
                className="contact-form__textarea"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-form__btn" id="send-message-btn">
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* RIGHT — Get In Touch */}
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="contact-info__title">Get In Touch</h2>
          <p className="contact-info__intro">
            We'd love to hear from you! Whether you're planning your next adventure, have questions
            about our activities, or just want to learn more about our nature park, feel free to reach out.
          </p>

          <div className="contact-info__items">
            <div className="contact-info__item">
              <div className="contact-info__icon-wrap">
                <Phone size={20} strokeWidth={1.8} />
              </div>
              <div className="contact-info__detail">
                <span className="contact-info__label">Phone</span>
                <span className="contact-info__value">+(212) 123-4567</span>
                <span className="contact-info__sub">Mon–Sun, 8:00 AM – 6:00 PM</span>
              </div>
            </div>

            <div className="contact-info__item">
              <div className="contact-info__icon-wrap">
                <Mail size={20} strokeWidth={1.8} />
              </div>
              <div className="contact-info__detail">
                <span className="contact-info__label">Email</span>
                <span className="contact-info__value">info@naturepark.com</span>
                <span className="contact-info__sub">We'll respond within 24 hours</span>
              </div>
            </div>

            <div className="contact-info__item">
              <div className="contact-info__icon-wrap">
                <MapPin size={20} strokeWidth={1.8} />
              </div>
              <div className="contact-info__detail">
                <span className="contact-info__label">Location</span>
                <span className="contact-info__value">123 street monterreo</span>
                <span className="contact-info__sub">Morocco, CA 94043</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
