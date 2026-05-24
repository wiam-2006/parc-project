import React, { useState, useEffect } from 'react';
import './Header.css';

const navLinks = ['Home', 'About Us', 'Activities', 'Events', 'Restaurant', 'Memberships', 'Contact Us'];

export default function Header({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (['Home', 'Memberships', 'Contact Us', 'Restaurant', 'Activities'].includes(link)) {
      setCurrentPage?.(link);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="#" className="header__logo" onClick={(e) => handleNavClick(e, 'Home')}>
          <img src="/logo-funzone.png" alt="Funzone Park Logo" className="header__logo-img" />
        </a>

        <button
          className={`header__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link}
              href="#"
              className={`header__nav-link ${link === currentPage ? 'header__nav-link--active' : ''
                }`}
              onClick={(e) => handleNavClick(e, link)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
