import React, { useState } from 'react';
import { Share2, Users, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = e => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Star decoration */}
      <div className="footer__stars" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="footer__star" style={{ left: `${(i * 5.3) % 100}%`, top: `${(i * 7.1) % 100}%`, animationDelay: `${i * 0.3}s` }}>✦</span>
        ))}
      </div>

      <div className="footer__inner">

        {/* Logo */}
        <div className="footer__brand">
          <a href="#" className="footer__logo">
            <img src="/logo-funzone.png" alt="Funzone Park Logo" className="footer__logo-img" />
          </a>
        </div>

        {/* Service */}
        <div className="footer__col">
          <h4 className="footer__col-title">Service</h4>
          <ul className="footer__col-list">
            <li><a href="#" className="footer__link">Furniture's</a></li>
            <li><a href="#" className="footer__link">Legal Notice</a></li>
            <li><a href="#" className="footer__link">Data Protection</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__col">
          <h4 className="footer__col-title">Newsletter</h4>
          <form className="footer__newsletter" onSubmit={handleNewsletterSubmit}>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter Email Address"
              className="footer__newsletter-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer__newsletter-btn" id="newsletter-signup-btn">Sign Up</button>
          </form>
        </div>

        {/* Connect */}
        <div className="footer__col">
          <h4 className="footer__col-title">Connect</h4>
          <div className="footer__socials">
            <a href="#" className="footer__social-link" aria-label="Instagram" id="footer-instagram">
              <Share2 size={16} />
              <span>Instagram</span>
            </a>
            <a href="#" className="footer__social-link" aria-label="Facebook" id="footer-facebook">
              <Users size={16} />
              <span>Facebook</span>
            </a>
            <a href="#" className="footer__social-link" aria-label="Twitter" id="footer-twitter">
              <MessageCircle size={16} />
              <span>Twitter</span>
            </a>
          </div>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h4 className="footer__col-title">Support</h4>
          <ul className="footer__col-list">
            <li><a href="#" className="footer__link">24/7 Support</a></li>
            <li><a href="#" className="footer__link">Terms &amp; Conditions</a></li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Funzone Park. All rights reserved.</p>
      </div>
    </footer>
  );
}
