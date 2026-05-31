import React, { useState, useRef } from 'react';

/* ── Activity images (served from /public) ── */
const image1 = '/image1.jfif';
const image2 = '/image2.jfif';
const image3 = '/image3.jfif';
const image4 = '/image4.jfif';
const image5 = '/image5.jfif';
const image6 = '/image6.jfif';
const image7 = '/image7.jfif';
const image8 = '/image8.jfif';
const image9 = '/image9.jfif';
const image10 = '/image10.jfif';

const activities = [
  { id: 1, title: "Quads & Buggies", price: "250 DH", image: image1, alt: "Quads & Buggies" },
  { id: 2, title: "Trampolines", price: "120 DH", image: image2, alt: "Trampolines" },
  { id: 3, title: "Free Fall", price: "150 DH", image: image3, alt: "Free Fall" },
  { id: 4, title: "Rock Climbing", price: "200 DH", image: image4, alt: "Rock Climbing" },
  { id: 5, title: "Padel Tennis", price: "280 DH", image: image5, alt: "Padel Tennis" },
  { id: 6, title: "Paintball", price: "180 DH", image: image6, alt: "Paintball" },
  { id: 7, title: "Archery", price: "130 DH", image: image7, alt: "Archery" },
  { id: 8, title: "Zip Line", price: "220 DH", image: image8, alt: "Zip Line" },
  { id: 9, title: "Swimming Pool", price: "100 DH", image: image9, alt: "Swimming Pool" },
  { id: 10, title: "Horse Riding", price: "300 DH", image: image10, alt: "Horse Riding" },
];

export default function ActivitiesSection({ onBookActivity }) {
  const [hovered, setHovered] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="activities-section" id="home-activities" aria-label="Our Activities">
      {/* Dot pattern */}
      <div className="dot-pattern" aria-hidden="true">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="dot" />
        ))}
      </div>

      {/* Title */}
      <div className="activities-title">
        <span className="why-leaf" aria-hidden="true">🌿</span>
        <h2>Our Activities</h2>
        <span className="why-leaf why-leaf--flip" aria-hidden="true">🌿</span>
      </div>

      {/* Cards */}
      <div className="cards-wrapper">
        <button className="arrow-btn arrow-left" onClick={() => scroll(-1)} aria-label="Scroll left">
          ‹
        </button>

        <div className="cards-scroll" ref={scrollRef}>
          {activities.map((act) => (
            <div
              key={act.id}
              className={`card ${hovered === act.id ? 'card-hovered' : ''}`}
              onMouseEnter={() => setHovered(act.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="card-image-wrap">
                <img
                  src={act.image}
                  alt={act.alt}
                  className={`card-image ${hovered === act.id ? 'card-image-hovered' : ''}`}
                  loading="lazy"
                />
              </div>
              <div className="card-body">
                <p className="card-title" style={{ fontSize: '20px' }}>{act.title}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-btn arrow-right" onClick={() => scroll(1)} aria-label="Scroll right">
          ›
        </button>
      </div>
    </section>
  );
}
