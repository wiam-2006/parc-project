import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, ChevronRight, Sprout, Wind, Compass } from 'lucide-react';
import './Activities.css';

/* ── Bento layout: 4 cards — left tall, right: 1 medium + 2 small ── */
const bentoActivities = [
  {
    id: 'high-ropes',
    title: 'High Ropes',
    description: 'Traverse the canopy on our suspension bridges and giant zip lines.',
    image: '/high_ropes_adventure_1778779353538.png',      // High quality generated image
    size: 'large',                       // left tall card
  },
  {
    id: 'zip-line',
    title: 'Zip Line',
    description: null,
    image: '/activity_zipline.png',
    size: 'medium',                      // top-right
  },
  {
    id: 'climbing-wall',
    title: 'Climbing Wall',
    description: null,
    image: '/activity_climbing.png',
    size: 'small',                       // bottom-right left
  },
  {
    id: 'ninja-course',
    title: 'Ninja Course',
    description: null,
    image: '/activity_navigation.png',
    size: 'small',                       // bottom-right right
  },
];

/* ── Adrenaline & Outdoor Fun data ── */
const adrenalineActivities = [
  { id: 'adr-1', title: 'High Ropes', badge: 'High Intensity', age: 'Age 6+', duration: '2 Hours', image: '/activity_biking.png' },
  { id: 'adr-2', title: 'Zipline', badge: 'Epic Height', age: 'Age 10+', duration: '45 Min', image: '/activity_zipline.png' },
  { id: 'adr-3', title: 'Climbing Wall', badge: 'Skill Based', age: 'Age 5+', duration: '1 Hour', image: '/activity_climbing.png' },
  { id: 'adr-4', title: 'Laser Game', badge: 'Elite Skill', age: 'Age 7+', duration: '30 Min', image: '/premium_photo-1677870728119-52aef052d7ef.avif' },
  { id: 'adr-5', title: 'Trampoline Park', badge: 'Pure Fun', age: 'All Ages', duration: '1 Hour', image: '/photo-1751235600651-94bbbeb29567.avif' },
  { id: 'adr-6', title: 'Karting', badge: 'High Speed', age: 'Age 14+', duration: '15 Min', image: '/photo-1505570554449-69ce7d4fa36b.avif' },
  { id: 'adr-7', title: 'Paintball', badge: 'Tactical', age: 'Age 12+', duration: '1.5 Hours', image: '/photo-1588432815128-363254491e4e.avif' },
  { id: 'adr-8', title: 'Laser Game Pro', badge: 'Sci-Fi Fan', age: 'Age 7+', duration: '30 Min', image: '/istockphoto-1290872085-612x612.webp' },
];


/* ── Off-Road Karting data ── */
const kartingActivities = [
  {
    id: 'karting-1',
    title: 'Off-Road Karting',
    description: 'Master the dirt track with our high-performance electric karts.',
    image: '/photo-1505570554449-69ce7d4fa36b.avif',
  },
  {
    id: 'karting-2',
    title: 'Off-Road Karting',
    description: 'Master the dirt track with our high-performance electric karts.',
    image: '/photo-1505570554449-69ce7d4fa36b.avif',
  }
];

/* ── Kids Zone data ── */
const kidsActivities = [
  {
    id: 'mini-farm',
    title: 'Interactive Mini Farm',
    description: 'Meet our dwarf goats, rabbits, and ponies in a fun and educational setting.',
    image: '/premium_photo-1663090902336-a9b2c07a210d.avif',
    age: 'From 3 years',
  },
  {
    id: 'creative-workshops',
    title: 'Creative Workshops',
    description: 'Insect hotel building and stone painting with our qualified animators.',
    image: '/photo-1755187338391-91b31b053d91.avif',
    age: 'Every 2 hours',
  },
  {
    id: 'giant-slides',
    title: 'Giant Slides',
    description: 'Inflatable structures and obstacle courses for safe fun.',
    image: '/premium_photo-1661547762303-1b99bfd73f09.avif',
    age: 'Unlimited access',
  }
];

/* Subtle fade-up for each card */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

function BentoCard({ activity, index, setCurrentPage }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = activity.size === 'large';

  return (
    <motion.div
      className={`bento-card bento-card--${activity.size}`}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
    >
      {/* Background image */}
      <div className="bento-card__bg">
        <img
          src={activity.image}
          alt={activity.title}
          className="bento-card__img"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Gradient overlay — stronger at bottom */}
        <div className="bento-card__gradient" />
      </div>

      {/* Content pinned to bottom */}
      <div className="bento-card__content">
        <h3 className="bento-card__title">{activity.title}</h3>

        {/* Description only on large card */}
        {isLarge && activity.description && (
          <p className="bento-card__desc">{activity.description}</p>
        )}

        {/* Book Now button (large) or link (others) */}
        {isLarge ? (
          <motion.button
            className="bento-card__btn"
            whileHover={{ scale: 1.05, backgroundColor: '#1a4332' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setCurrentPage('Reservation')}
          >
            Book Now
          </motion.button>
        ) : (
          <span 
            className="bento-card__link" 
            onClick={() => setCurrentPage('Reservation')}
            style={{ cursor: 'pointer' }}
          >
            Book Now <ChevronRight size={13} strokeWidth={2.5} />
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Activities({ setCurrentPage }) {
  return (
    <div className="activities-page">

      {/* ── HERO BANNER ─────────────────────────────────── */}
      <section className="act-hero">
        <motion.div
          className="act-hero__card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left content */}
          <div className="act-hero__left">
            <motion.span
              className="act-hero__badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginBottom: '60px' }}
            >
              <Zap size={15} fill="currentColor" stroke="none" />
              UNLEASH ENERGY
            </motion.span>

            <motion.h1
              className="act-hero__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ marginBottom: '30px' }}
            >
              Adventure for every{' '}
              <em className="act-hero__title-em">kinetic soul.</em>
            </motion.h1>

            <motion.p
              className="act-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ marginBottom: '25px' }}
            >
              From gravity-defying ziplines to tranquil zen gardens, discover our curated
              experiences designed to move your spirit.
            </motion.p>

            <motion.button
              className="act-hero__btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document.getElementById('activities-bento')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Start Exploring
            </motion.button>
          </div>

          {/* Right image */}
          <motion.div
            className="act-hero__img-wrap"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/activity_zipline.png"
              alt="Zipline adventure through forest"
              className="act-hero__img"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ACTIVITIES BENTO SECTION ──────────────────────── */}
      <section className="act-bento-section" id="activities-bento">
        <div className="act-bento-container">
          {/* Section heading */}
          <motion.div
            className="act-bento-section__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
            >
              <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              Activities
              <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            </motion.h2>
            <p className="act-bento-section__subtitle">
              Challenge your limits between sky and earth.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="bento-grid">
            {/* Large card — left tall */}
            <BentoCard activity={bentoActivities[0]} index={0} setCurrentPage={setCurrentPage} />
            {/* Medium card — top right */}
            <BentoCard activity={bentoActivities[1]} index={1} setCurrentPage={setCurrentPage} />
            {/* Small cards — bottom right, wrapped in sub-grid */}
            <div className="bento-smalls">
              <BentoCard activity={bentoActivities[2]} index={2} setCurrentPage={setCurrentPage} />
              <BentoCard activity={bentoActivities[3]} index={3} setCurrentPage={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ADRENALINE & OUTDOOR FUN ────────────────────────── */}
      <section className="adrenaline-section">
        <div className="adrenaline-header">
          <div className="adrenaline-header__top">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
            >
              <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              Adrenaline & Outdoor Fun
              <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            </motion.h2>
          </div>
          <p className="adrenaline-subtitle">
            Push your limits with our flagship activities designed for thrill-seekers.<br />
            From the treetops to the dusty tracks.
          </p>
        </div>

        <div className="adrenaline-grid">
          {adrenalineActivities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              className="adr-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="adr-card__img-wrap">
                <img src={activity.image} alt={activity.title} />
                <span className="adr-card__badge">{activity.badge}</span>
              </div>
              <div className="adr-card__content">
                <h3 className="adr-card__title">{activity.title}</h3>
                <div className="adr-card__details">
                  <span>👤 {activity.age}</span>
                  <span>⏱️ {activity.duration}</span>
                </div>
                <button 
                  className="adr-card__btn"
                  onClick={() => setCurrentPage('Reservation')}
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OFF-ROAD KARTING SECTION ──────────────────────── */}
      <section className="karting-section">
        <div className="karting-grid">
          {kartingActivities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              className="karting-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="karting-card__img-wrap">
                <img src={activity.image} alt={activity.title} />
              </div>
              <div className="karting-card__content">
                <h3 className="karting-card__title">{activity.title}</h3>
                <p className="karting-card__desc">{activity.description}</p>
                <a href="#" className="karting-card__link">Learn More <ChevronRight size={14} /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── KIDS ZONE SECTION ───────────────────────────── */}
      <section className="kids-section">
        <div className="kids-container">
          <div className="kids-header">
            <div className="kids-header__top">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
              >
                <span className="why-leaf" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
                Kids Zone
                <span className="why-leaf why-leaf--flip" aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              </motion.h2>
            </div>
            <p className="kids-subtitle">A safe and stimulating universe for budding adventurers aged 3 to 12.</p>
          </div>

          <div className="kids-grid">
            {kidsActivities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                className="kids-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="kids-card__img-wrap">
                  <img src={activity.image} alt={activity.title} />
                </div>
                <div className="kids-card__content">
                  <h3 className="kids-card__title">{activity.title}</h3>
                  <p className="kids-card__desc">{activity.description}</p>
                  <span className="kids-card__age">{activity.age}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELAXATION & NATURE SECTION ───────────────────────────── */}
      <section className="nature-section">
        <div className="nature-container">
          <div className="nature-card">
            {/* Left Image */}
            <div className="nature-img-wrap">
              <img
                src="/premium_photo-1710846919368-91fb1945e6db.avif"
                alt="Relaxation and Nature yoga forest"
                className="nature-img"
              />
            </div>

            {/* Right Content */}
            <div className="nature-content">
              <span className="nature-badge">BREATHE</span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ fontFamily: 'Dancing Script', marginTop: '15px', paddingBottom: '20px', fontSize: '3.5rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
              >
                Relaxation & Nature
              </motion.h2>

              <div className="nature-list">
                <div className="nature-item">
                  <div className="nature-item__icon-wrap">
                    <Sprout size={18} className="nature-item__icon" />
                  </div>
                  <div className="nature-item__text">
                    <h3 className="nature-item__title">Zen Garden</h3>
                    <p className="nature-item__desc">
                      A Japanese-inspired landscaped space with a water cascade and a barefoot sensory trail.
                    </p>
                  </div>
                </div>

                <div className="nature-item">
                  <div className="nature-item__icon-wrap">
                    <Wind size={18} className="nature-item__icon" />
                  </div>
                  <div className="nature-item__text">
                    <h3 className="nature-item__title">Outdoor Yoga</h3>
                    <p className="nature-item__desc">
                      Group sessions every morning facing the rising sun, led by certified professionals.
                    </p>
                  </div>
                </div>

                <div className="nature-item">
                  <div className="nature-item__icon-wrap">
                    <Compass size={18} className="nature-item__icon" />
                  </div>
                  <div className="nature-item__text">
                    <h3 className="nature-item__title">Guided Hikes</h3>
                    <p className="nature-item__desc">
                      Discover local wildlife with our passionate botanist guides on scenic nature trails.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENTS & GROUP ADVENTURES SECTION ──────────────────────── */}
      <section className="events-section">
        <div className="events-container">
          <div className="events-header">
            <div className="events-header__left">
              <h2 className="events-title">Events & Group Adventures</h2>
              <p className="events-subtitle">
                From team building to birthday milestones, we create kinetic memories that last a lifetime.
              </p>
            </div>
            <button className="events-header__btn" onClick={() => setCurrentPage('Contact Us')}>
              Inquire Now
            </button>
          </div>

          <div className="events-grid">
            <div className="event-card">
              <div className="event-card__img-wrap">
                <img src="/photo-1610070835951-156b6921281d.avif" alt="Team Building" />
              </div>
              <div className="event-card__content">
                <h3 className="event-card__title">Team Building</h3>
                <p className="event-card__desc">
                  Strengthen bonds and build trust with customized challenges on our high ropes courses.
                </p>
                <button className="event-card__btn" onClick={() => setCurrentPage('Contact Us')}>Learn More</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-card__img-wrap">
                <img src="/photo-1758275557553-0c46c061d43e.avif" alt="Birthday Parties" />
              </div>
              <div className="event-card__content">
                <h3 className="event-card__title">Birthday Parties</h3>
                <p className="event-card__desc">
                  Celebrate in style with action-packed packages across all activity zones.
                </p>
                <button className="event-card__btn" onClick={() => setCurrentPage('Contact Us')}>Learn More</button>
              </div>
            </div>

            <div className="event-card">
              <div className="event-card__img-wrap">
                <img src="/istockphoto-1492557867-612x612.webp" alt="School & Groups" />
              </div>
              <div className="event-card__content">
                <h3 className="event-card__title">School & Groups</h3>
                <p className="event-card__desc">
                  Educational nature walks and fun-filled outdoor experiences designed for all sizes.
                </p>
                <button className="event-card__btn" onClick={() => setCurrentPage('Contact Us')}>Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
