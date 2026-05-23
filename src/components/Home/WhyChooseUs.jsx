import React from 'react';

const features = [
  {
    id: 1,
    icon: '🧗',
    title: 'Adventure Without Limits',
    desc: 'More than 20 outdoor activities designed for all ages and all skill levels.',
  },
  {
    id: 2,
    icon: '👨‍👩‍👧',
    title: 'Perfect for Families',
    desc: 'A secure environment for unforgettable experiences for both children and parents.',
  },
  {
    id: 3,
    icon: '🌿',
    title: 'Unique Setting',
    desc: 'Enjoy the freshness of the forest and a breathtaking view of the sea.',
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Tailor-Made Services',
    desc: 'For private events (birthdays, team building) and group outings.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why-choose-us" aria-label="Why Choose Us">
      {/* ── Title ── */}
      <div className="why-title-row">
        <span className="why-leaf" aria-hidden="true">🌿</span>
        <h2 className="why-title-script">Why Choose Us</h2>
        <span className="why-leaf why-leaf--flip" aria-hidden="true">🌿</span>
      </div>

      {/* ── Body ── */}
      <div className="why-body">
        {/* Left: text + features */}
        <div className="why-left">
          <h3 className="why-subtitle">Nature Escape at the Summit of Tangier</h3>
          <p className="why-desc">
            Our park, located in the heart of the forest, offers exceptional views between the sea
            and nature, for experiences that combine adrenaline and relaxation.
          </p>

          <div className="why-grid">
            {features.map((f) => (
              <div className="why-feature" key={f.id}>
                <span className="why-feature__icon" aria-hidden="true">{f.icon}</span>
                <h4 className="why-feature__title">{f.title}</h4>
                <p className="why-feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="why-right">
          <div className="why-image-blob">
            <img
              src="/why-choose-us.png"
              alt="Family cycling through the forest at our adventure park"
              className="why-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
