import { useState, useEffect } from "react";
import "./Home.css";

const testimonials = [
  {
    id: 1,
    name: "Sofia Martinez",
    role: "Visitor",
    rating: 4,
    text: "I had an amazing time! The activities were exciting and well organized. The staff was very friendly and helpful. Definitely a place I would visit again with my family.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Karim Benali",
    role: "Family Trip",
    rating: 5,
    text: "An unforgettable experience for the whole family. The kids loved every moment, and the natural surroundings were breathtaking. We will definitely be coming back!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Amina Tazi",
    role: "Solo Traveler",
    rating: 5,
    text: "The peaceful atmosphere and beautiful landscape made it the perfect retreat. I felt completely at home and the staff went above and beyond to make my stay special.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
  },
];

const Star = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill={filled ? "#D4A017" : "#ccc"}
      fillOpacity={filled ? 1 : 0.4}
    />
  </svg>
);

const RatingStars = ({ rating }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} filled={i <= rating} />
    ))}
  </div>
);

const OrnamentSVG = () => (
  <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="12" x2="40" y2="12" stroke="#2d6a4f" strokeWidth="1" strokeOpacity="0.5" />
    <circle cx="50" cy="12" r="3" fill="#2d6a4f" fillOpacity="0.6" />
    <circle cx="60" cy="12" r="5" fill="none" stroke="#2d6a4f" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M60,7 Q65,12 60,17 Q55,12 60,7Z" fill="#2d6a4f" fillOpacity="0.4" />
    <circle cx="70" cy="12" r="3" fill="#2d6a4f" fillOpacity="0.6" />
    <line x1="80" y1="12" x2="120" y2="12" stroke="#2d6a4f" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const changeTo = (idx) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeTo((active + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active, animating]);

  const t = testimonials[active];

  return (
    <div className="testimonial-wrapper">
      <div style={{ position: "relative" }}>
        <img src="/Arrow.png" alt="" className="testimonial-arrow" />
        <div className="testimonial-card">

          {/* Left panel */}
          <div className="left-panel">
            <p className="intro-text text-center">
              <img src="/Rhyme.png" alt="" width={160} style={{ display: 'block', margin: '0 auto' }} />
              Discover what our visitors think about their experience at our park. We are proud to offer
              memorable moments filled with adventure, fun, and relaxation for all ages.
            </p>

            <div className={`quote-block ${animating ? "fade-out" : ""}`}>
              <span className="big-quote">"</span>
              <p className="quote-text">{t.text}</p>
              <p className="reviewer-name">{t.name}</p>
              <p className="reviewer-role">{t.role}</p>
            </div>

            <div className="bottom-controls">
              <div className="dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === active ? "active" : ""}`}
                    onClick={() => changeTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className={`stars-anim ${animating ? "fade-out" : ""}`}>
                <RatingStars rating={t.rating} />
              </div>
            </div>
          </div>

          {/* Right photo panel */}
          <div className="photo-panel">
            <div
              className="photo-bg"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=700&fit=crop)`,
              }}
            />
            <div className="arch-overlay" />
            <div className="arch-wrapper">
              <div className="arch-frame">
                <img
                  src={t.image}
                  alt={t.name}
                  className={`arch-photo ${animating ? "fade-out" : ""}`}
                />
              </div>
            </div>
            <span className="leaf-deco">🌿</span>
          </div>

        </div>
      </div>
    </div>
  );
}
