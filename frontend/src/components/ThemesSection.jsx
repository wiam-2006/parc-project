import { useState } from 'react';
import './index.css';

const tabs = [
  {
    id: 'birthdays',
    label: 'BIRTHDAYS',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <path d="M12 3c0 0-3 2-3 4s1.5 2 3 2 3-.5 3-2-3-4-3-4z"/>
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <line x1="8" y1="11" x2="8" y2="21"/>
        <line x1="16" y1="11" x2="16" y2="21"/>
      </svg>
    ),
  },
  {
    id: 'groups',
    label: 'GROUPS',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'corporate',
    label: 'CORPORATE',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="17"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    id: 'private',
    label: 'PRIVATE',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

const eventsData = {
  birthdays: [
    {
      id: 'b1',
      title: 'Forest Fairy-tale Birthday',
      description: 'A magical setup deep in the pine groves including campfire treats and woodland activities.',
      guests: '10–25 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
    },
    {
      id: 'b2',
      title: 'Garden Bloom Birthday',
      description: 'A vibrant floral birthday celebration surrounded by blooming gardens and fresh nature scenery.',
      guests: '15–30 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    },
  ],
  groups: [
    {
      id: 'g1',
      title: 'Forest Fairy-tale Birthday',
      description: 'A magical setup deep in the pine groves including campfire treats and woodland activities.',
      guests: '10–25 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
    },
    {
      id: 'g2',
      title: 'Family Day',
      description: 'A joyful family day surrounded by nature, featuring outdoor games, picnic areas, and fun activities for all ages, creating unforgettable moments in a peaceful green setting.',
      guests: '10–20 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80',
    },
  ],
  corporate: [
    {
      id: 'c1',
      title: 'Executive Team Retreat',
      description: 'A premium outdoor corporate retreat with team-building workshops, gourmet dining, and networking zones set in serene nature.',
      guests: '20–60 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    },
    {
      id: 'c2',
      title: 'Outdoor Conference Day',
      description: 'Host your next company meeting surrounded by greenery. Includes open-air presentation setup and catered lunch.',
      guests: '30–80 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    },
  ],
  private: [
    {
      id: 'p1',
      title: 'Romantic Garden Evening',
      description: 'An intimate private dinner for two in a secluded garden corner, with candlelight, flowers, and a curated menu.',
      guests: '2–10 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    },
    {
      id: 'p2',
      title: 'Private Nature Picnic',
      description: 'A bespoke picnic experience in a peaceful meadow, tailored to your preferences with premium food and décor.',
      guests: '4–12 Guests',
      catering: 'Catering Incl.',
      image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&q=80',
    },
  ],
};

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#c8a84b' }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <StarIcon />
        <h3 className="event-card-title">{event.title}</h3>
      </div>
      <p className="event-card-description">{event.description}</p>
      <div className="event-card-meta">
        <span className="event-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {event.guests}
        </span>
        <span className="event-meta-divider" />
        <span className="event-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l19-9-9 19-2-8-8-2z"/>
          </svg>
          {event.catering}
        </span>
      </div>
      <div className="event-card-image-wrapper">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-image"
          loading="lazy"
        />
        <button className="event-card-btn" aria-label={`See more about ${event.title}`}>
          See more
        </button>
      </div>
    </div>
  );
}

export default function ThemesSection() {
  const [activeTab, setActiveTab] = useState('groups');
  const events = eventsData[activeTab];

  return (
    <section className="themes-section" id="themes" aria-label="Discover Themes">
      <span className="themes-bg-icon" aria-hidden="true">🌿</span>

      {/* Heading */}
      <div className="themes-heading-wrapper">
        <span className="leaf-icon" aria-hidden="true">🌿</span>
        <h2 className="themes-title">Discover Themes</h2>
        <span className="leaf-icon right" aria-hidden="true">🌿</span>
      </div>

      {/* Tabs */}
      <div className="themes-tabs" role="tablist" aria-label="Event categories">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`themes-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="themes-tab-icon">{tab.icon}</span>
            <span className="themes-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div
        className="themes-cards"
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
