import React from 'react';

const galleryImages = [
  { src: '/adveture1.jpeg',       alt: 'Rope climbing adventure',      className: 'discover-img--tall'   },
  { src: '/discover-scooter.png', alt: 'Kids on scooters in the park',  className: 'discover-img--top-mid' },
  { src: '/discover-sack-race.png', alt: 'Children sack race',          className: 'discover-img--top-right' },
  { src: '/discover-camping.png', alt: 'Campfire night under the stars', className: 'discover-img--bot-mid' },
  { src: '/discover-rock-wall.png', alt: 'Rock climbing wall',           className: 'discover-img--bot-right' },
];

export default function DiscoverSection() {
  return (
    <section className="discover-section" id="discover-world" aria-label="Discover Our World">

      {/* Decorative sun burst */}
      <span className="discover-sun" aria-hidden="true">✦</span>

      {/* Title */}
      <div className="discover-title-row">
        <span className="discover-leaf" aria-hidden="true">🌿</span>
        <h2 className="discover-title-script">Discover Our World</h2>
        <span className="discover-leaf discover-leaf--flip" aria-hidden="true">🌿</span>
      </div>

      {/* Mosaic grid */}
      <div className="discover-mosaic">
        {galleryImages.map(({ src, alt, className }) => (
          <div key={alt} className={`discover-cell ${className}`}>
            <img src={src} alt={alt} className="discover-photo" loading="lazy" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="discover-cta">
        <button className="discover-btn" id="discover-learn-more-btn">Learn More</button>
      </div>
    </section>
  );
}
