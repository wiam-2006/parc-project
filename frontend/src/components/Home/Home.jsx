import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ActivitiesSection from './ActivitiesSection';
import WhyChooseUs from './WhyChooseUs';
import DiscoverSection from './DiscoverSection';
import TestimonialsSection from './TestimonialsSection';
import NewsletterSection from './NewsletterSection';
import './Home.css';

/* ─── Data ────────────────────────────────────────────────────────────────── */
const STATS = [
  { number: '50+', label: 'Attractions' },
  { number: '1M+', label: 'Happy visitors' },
  { number: '25', label: 'Years of fun' },
  { number: '4.9★', label: 'Average rating' },
];


/* ─── Component ───────────────────────────────────────────────────────────── */
export default function Home({ currentPage, setCurrentPage, onBookActivity }) {
  const handleBookNow = (e) => {
    e.preventDefault();
    setCurrentPage?.('Home');          // stay on current page and let the user scroll to booking
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Shared Header — same instance used across all pages */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="home-main">

        {/* ── Hero ── */}
        <section className="home-hero" id="home-hero" aria-label="Hero banner">
          <div className="home-hero__bg" aria-hidden="true" />
          <div className="home-hero__overlay" aria-hidden="true" />

          <div className="home-hero__content">
            <div className="home-hero__badge">
              <span className="home-hero__badge-icon">🏕️</span>
              CAMPING TRIP
            </div>
            <h1 className="home-hero__title">
              START YOUR<br />ADVENTURE!
            </h1>
            <p className="home-hero__subtitle">
              We provide various of our best services for the beauty of nature from exploring the forest to camping
            </p>

            <div className="home-hero__reviews">
              <div className="home-hero__review-avatars">
                <img src="https://i.pravatar.cc/100?img=33" alt="user" loading="lazy" />
                <img src="https://i.pravatar.cc/100?img=47" alt="user" loading="lazy" />
                <img src="https://i.pravatar.cc/100?img=12" alt="user" loading="lazy" />
                <div className="home-hero__review-plus">+</div>
              </div>
              <div className="home-hero__review-stats">
                <div className="home-hero__review-count">10k+ Customer Review</div>
                <div className="home-hero__review-rating">
                  ⭐ 4.8/5 Rating
                </div>
              </div>
            </div>
          </div>

          <div className="home-hero__booking-bar">
            <div className="home-hero__booking-item">
              <div className="home-hero__booking-label">Location</div>
              <input type="text" placeholder="Explore nearby..." aria-label="Location" />
            </div>
            <div className="home-hero__booking-divider" aria-hidden="true"></div>
            <div className="home-hero__booking-item">
              <div className="home-hero__booking-label">Date</div>
              <input type="text" placeholder="Add dates" aria-label="Date" />
            </div>
            <div className="home-hero__booking-divider" aria-hidden="true"></div>
            <div className="home-hero__booking-item">
              <div className="home-hero__booking-label">Guest</div>
              <input type="text" placeholder="Add guests" aria-label="Guest" />
            </div>
            <button className="home-hero__booking-search" onClick={handleBookNow}>
              <span aria-hidden="true">🔍</span> Search
            </button>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="home-stats" aria-label="Park statistics">
          <div className="home-stats__inner">
            {STATS.map(({ number, label }) => (
              <div className="home-stats__item" key={label}>
                <div className="home-stats__number">{number}</div>
                <div className="home-stats__label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── About Us ── */}
        <section className="home-about" id="home-about" aria-label="About Us">
          <div className="home-about__inner">
            <div className="home-about__images">
              <img src="/adveture1.jpeg" alt="Ropes course" className="home-about__img-back" loading="lazy" />
              <img src="/adventure2.jpeg" alt="Biking in the forest" className="home-about__img-front" loading="lazy" />
            </div>
            <div className="home-about__content">
              <h2 className="home-about__title-script">About Us</h2>
              <h3 className="home-about__title-main">The Adventure at the Summit of Tangier</h3>
              <p className="home-about__text">
                A park located in the forest of Tangier, combining nature and adventure, with stunning views of the coastline and over 20 activities for all ages.
              </p>
              <p className="home-about__text">
                It offers a variety of experiences, blending adrenaline and relaxation, with main activities such as zip-lining, horseback riding, a swimming pool, and paintball, as well as services for private events and group outings.
              </p>
              <button className="home-about__btn" onClick={() => setCurrentPage('Contact Us')}>Learn More</button>
            </div>
          </div>
        </section>

        {/* ── Activities ── */}
        <ActivitiesSection onBookActivity={onBookActivity} />

        {/* ── Why Choose Us ── */}
        <WhyChooseUs />

        {/* ── Discover Our World ── */}
        <DiscoverSection setCurrentPage={setCurrentPage} />

        {/* ── Testimonials ── */}
        <TestimonialsSection />

        {/* ── Newsletter ── */}
        <NewsletterSection />

      </main>

      {/* Shared Footer — same instance used across all pages */}
      <Footer />
    </div>
  );
}
