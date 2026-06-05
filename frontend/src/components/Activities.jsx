import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Sprout, Wind, Compass } from 'lucide-react';
import './Activities.css';

// ── API base URL ─────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/Funzone-park/backend/public/api';

// ── Hook────────────────────────────────
function useActivities() {
  const [data, setData] = useState({ bento: [], adrenaline: [], kids: [], karting: [], nature: [], event: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/activities`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// ── Card animations ──────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Skeleton loader ──────────────────────────────────────────────────
function SkeletonCard({ height = 300 }) {
  return (
    <div
      style={{
        height,
        borderRadius: 16,
        background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
      }}
    />
  );
}

// ── Bento Card ───────────────────────────────────────────────────────
function BentoCard({ activity, index, onBookActivity }) {
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
        <div className="bento-card__gradient" />
      </div>

      <div className="bento-card__content">
        <h3 className="bento-card__title">{activity.title}</h3>

        {isLarge && activity.description && (
          <p className="bento-card__desc">{activity.description}</p>
        )}

        {isLarge ? (
          <motion.button
            className="bento-card__btn"
            whileHover={{ scale: 1.05, backgroundColor: '#1a4332' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onBookActivity(activity)}
          >
            Book Now
          </motion.button>
        ) : (
          <button
            className="bento-card__link"
            style={{ cursor: 'pointer' }}
            onClick={() => onBookActivity(activity)}
          >
            Book Now <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────
export default function Activities({ setCurrentPage, onBookActivity }) {
  const { data, loading, error } = useActivities();

  return (
    <div className="activities-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="act-hero">
        <motion.div
          className="act-hero__card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
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

          <motion.div
            className="act-hero__img-wrap"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={data.bento[1]?.image || "/activity_zipline.png"}
              alt="Zipline adventure through forest"
              className="act-hero__img"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ERROR STATE ──────────────────────────────────── */}
      {error && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#e53e3e' }}>
          Impossible de charger les activités. ({error})
        </div>
      )}

      {/* ── BENTO SECTION ────────────────────────────────── */}
      <section className="act-bento-section" id="activities-bento">
        <div className="act-bento-container">
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
              viewport={{ once: true, margin: '-100px' }}
              style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
            >
              <span aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              Activities
              <span aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            </motion.h2>
            <p className="act-bento-section__subtitle">
              Challenge your limits between sky and earth.
            </p>
          </motion.div>

          <div className="bento-grid">
            {loading ? (
              <>
                <SkeletonCard height={500} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <SkeletonCard height={240} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <SkeletonCard height={220} />
                    <SkeletonCard height={220} />
                  </div>
                </div>
              </>
            ) : (
              <>
                {data.bento[0] && <BentoCard activity={data.bento[0]} index={0} onBookActivity={onBookActivity} />}
                {data.bento[1] && <BentoCard activity={data.bento[1]} index={1} onBookActivity={onBookActivity} />}
                <div className="bento-smalls">
                  {data.bento[2] && <BentoCard activity={data.bento[2]} index={2} onBookActivity={onBookActivity} />}
                  {data.bento[3] && <BentoCard activity={data.bento[3]} index={3} onBookActivity={onBookActivity} />}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── ADRENALINE ───────────────────────────────────── */}
      <section className="adrenaline-section">
        <div className="adrenaline-header">
          <div className="adrenaline-header__top">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
            >
              <span aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              Adrenaline & Outdoor Fun
              <span aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
            </motion.h2>
          </div>
          <p className="adrenaline-subtitle">
            Push your limits with our flagship activities designed for thrill-seekers.<br />
            From the treetops to the dusty tracks.
          </p>
        </div>

        <div className="adrenaline-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} height={280} />)
            : data.adrenaline.map((activity, idx) => (
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
                  <button className="adr-card__btn" onClick={() => onBookActivity(activity)}>
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))
          }
        </div>
      </section>

      {/* ── KARTING ──────────────────────────────────────── */}
      <section className="karting-section">
        <div className="karting-grid">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} height={300} />)
            : data.karting.map((activity, idx) => (
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
            ))
          }
        </div>
      </section>

      {/* ── KIDS ZONE ────────────────────────────────────── */}
      <section className="kids-section">
        <div className="kids-container">
          <div className="kids-header">
            <div className="kids-header__top">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                style={{ fontFamily: 'Dancing Script', fontSize: '4rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
              >
                <span aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
                Kids Zone
                <span aria-hidden="true" style={{ margin: '15px' }}>🌿</span>
              </motion.h2>
            </div>
            <p className="kids-subtitle">A safe and stimulating universe for budding adventurers aged 3 to 12.</p>
          </div>

          <div className="kids-grid">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} height={320} />)
              : data.kids.map((activity, idx) => (
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
              ))
            }
          </div>
        </div>
      </section>

      {/* ── RELAXATION & NATURE (static — mkaynsh f DB) ──── */}
      <section className="nature-section">
        <div className="nature-container">
          <div className="nature-card">
            <div className="nature-img-wrap">
              <img
                src="/premium_photo-1710846919368-91fb1945e6db.avif"
                alt="Relaxation and Nature yoga forest"
                className="nature-img"
              />
            </div>
            <div className="nature-content">
              <span className="nature-badge">BREATHE</span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                style={{ fontFamily: 'Dancing Script', marginTop: '15px', paddingBottom: '20px', fontSize: '3.5rem', color: '#1a503a', marginBottom: '0.5rem', fontWeight: 700 }}
              >
                Relaxation & Nature
              </motion.h2>

              <div className="nature-list">
                {data.nature.length > 0 ? data.nature.map((item, i) => (
                  <div className="nature-item" key={item.id || i}>
                    <div className="nature-item__icon-wrap">
                      {i === 0 ? <Sprout size={18} /> : i === 1 ? <Wind size={18} /> : <Compass size={18} />}
                    </div>
                    <div className="nature-item__text">
                      <h3 className="nature-item__title">{item.title}</h3>
                      <p className="nature-item__desc">{item.description}</p>
                    </div>
                  </div>
                )) : (
                  <p>Loading nature activities...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENTS & GROUPS (static — khassha page Contact) ── */}
      <section className="events-section" >
        <div className="events-container" style={{ padding: '50px' }}>
          <div className="events-header">
            <div className="events-header__left">
              <h2 className="events-title" style={{ fontSize: '70px' }}>Events & Group Adventures</h2>
              <p className="events-subtitle" style={{ fontSize: '15px' }}>
                From team building to birthday milestones, we create kinetic memories that last a lifetime.
              </p>
            </div>
            <button className="events-header__btn" onClick={() => setCurrentPage('Contact Us')}>
              Inquire Now
            </button>
          </div>

          <div className="events-grid">
            {data.event.length > 0 ? data.event.map((ev, i) => (
              <div className="event-card" key={ev.id || i} style={{ background: '#8fb996', border: '1px solid #8fb996', borderRadius: '26px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.35s ease' }}>
                <div className="event-card__img-wrap">
                  <img src={ev.image} alt={ev.title} />
                </div>
                <div className="event-card__content">
                  <h3 className="event-card__title">{ev.title}</h3>
                  <p className="event-card__desc">{ev.description}</p>
                  <button className="event-card__btn" onClick={() => setCurrentPage('Events')}>Learn More</button>
                </div>
              </div>
            )) : (
              <p>Loading events...</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}