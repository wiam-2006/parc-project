import React, { useState } from 'react';

/* ── Review data ── */
const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    avatar: 'https://i.pravatar.cc/100?img=47',
    stars: 5,
    text: '"I had an amazing time! The activities were exciting and well organized. The staff was very friendly and helpful. Definitely a place I would visit again with my family."',
  },
  {
    id: 2,
    name: 'James T.',
    avatar: 'https://i.pravatar.cc/100?img=12',
    stars: 5,
    text: '"Absolutely breathtaking views and so many activities for all ages. The zip-line was a highlight — our kids are still talking about it weeks later!"',
  },
  {
    id: 3,
    name: 'Amina R.',
    avatar: 'https://i.pravatar.cc/100?img=33',
    stars: 4,
    text: '"A truly unique setting in the heart of nature. Everything felt safe and well-maintained. We loved the paintball and the picnic area with sea views."',
  },
];

const Stars = ({ count }) => (
  <span className="ts-stars" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? 'ts-star--on' : 'ts-star--off'}>★</span>
    ))}
  </span>
);

/* Botanical swirl SVG */
const SwirlSVG = () => (
  <svg width="46" height="90" viewBox="0 0 46 90" fill="none">
    <path
      d="M23 5 C10 20 5 35 15 48 C25 60 38 55 38 42 C38 30 28 26 20 32 C12 38 14 52 23 58 C34 65 42 58 40 47"
      stroke="rgba(168,213,176,0.55)" strokeWidth="2" fill="none" strokeLinecap="round"
    />
    <path d="M23 58 C20 70 18 80 23 85" stroke="rgba(168,213,176,0.55)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="23" cy="5" r="3" fill="rgba(168,213,176,0.5)" />
    <circle cx="38" cy="42" r="2.5" fill="rgba(168,213,176,0.4)" />
  </svg>
);

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  return (
    <section className="ts-section" id="testimonials" aria-label="Our Customers Say">

      {/* Title */}
      <div className="ts-title-row">
        <span className="ts-leaf" aria-hidden="true">🌿</span>
        <h2 className="ts-title-script">Our Customers Says</h2>
        <span className="ts-leaf ts-leaf--flip" aria-hidden="true">🌿</span>
      </div>

      {/* Featured card */}
      <div className="ts-card">

        {/* LEFT panel */}
        <div className="ts-card__left">

          {/* Vertical dots — pinned to left edge */}
          <div className="ts-dots-v" role="tablist" aria-label="Select review">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                className={`ts-dot ${i === active ? 'ts-dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Review by ${r.name}`}
                aria-selected={i === active}
                role="tab"
              />
            ))}
          </div>

          {/* Botanical swirl */}
          <span className="ts-swirl-left" aria-hidden="true">
            <SwirlSVG />
          </span>

          {/* TOP zone — lighter green */}
          <div className="ts-zone ts-zone--top">
            <div className="ts-ornament" aria-hidden="true">
              <svg width="90" height="30" viewBox="0 0 90 30" fill="none">
                <path d="M4 15 Q22 4 45 15 Q68 26 86 15" stroke="rgba(168,213,176,0.7)" strokeWidth="1.5" fill="none" />
                <circle cx="45" cy="15" r="4.5" fill="rgba(168,213,176,0.6)" />
                <circle cx="4" cy="15" r="3" fill="rgba(168,213,176,0.5)" />
                <circle cx="86" cy="15" r="3" fill="rgba(168,213,176,0.5)" />
                <circle cx="25" cy="9" r="2" fill="rgba(168,213,176,0.4)" />
                <circle cx="65" cy="21" r="2" fill="rgba(168,213,176,0.4)" />
              </svg>
            </div>

            <p className="ts-card__intro">
              Discover what our visitors think about their experience at our park.
              We are proud to offer memorable moments filled with adventure,
              fun, and relaxation for all ages.
            </p>
          </div>

          {/* Stars — at boundary, right-aligned */}
          <div className="ts-stars-boundary">
            <Stars count={review.stars} />
          </div>

          {/* BOTTOM zone — darker green */}
          <div className="ts-zone ts-zone--bot">
            <blockquote className="ts-card__quote">{review.text}</blockquote>
            <p className="ts-card__name">— {review.name}</p>
          </div>
        </div>

        {/* RIGHT panel */}
        <div className="ts-card__right">
          <div className="ts-card__bg-img" aria-hidden="true" />
          <div className="ts-card__arch">
            <img
              src="/testimonial-portrait.png"
              alt={`Happy visitor ${review.name}`}
              className="ts-card__portrait"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
