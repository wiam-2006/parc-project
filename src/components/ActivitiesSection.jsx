import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './ActivitiesSection.css';

const activities = [
  {
    id: 'quad-biking',
    icon: '🚵',
    title: 'Quad Biking',
    description: 'Thrilling rides through scenic trails',
  },
  {
    id: 'biking',
    icon: '🚴',
    title: 'Biking',
    description: 'Explore breathtaking mountain paths',
  },
  {
    id: 'camping',
    icon: '🏕️',
    title: 'Camping',
    description: 'Overnight adventures under the stars',
  },
  {
    id: 'navigation',
    icon: '🧭',
    title: 'Navigation',
    description: 'Learn wilderness survival skills',
  },
  {
    id: 'nature-tours',
    icon: '🌲',
    title: 'Nature Tours',
    description: 'Guided walks through pristine forests',
  },
  {
    id: 'climbing',
    icon: '🧗',
    title: 'Climbing',
    description: 'Challenge yourself on natural rock formations',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function ActivityCardComponent({ activity }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="activity-card"
      id={`activity-${activity.id}`}
    >
      <motion.div 
        className="activity-card__icon" 
        aria-hidden="true"
        whileHover={{ y: [0, -8, 0], transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } }}
      >
        {activity.icon}
      </motion.div>
      <h3 className="activity-card__title">{activity.title}</h3>
      <p className="activity-card__desc">{activity.description}</p>
    </motion.div>
  );
}

export default function ActivitiesSection({ setCurrentPage }) {
  return (
    <section className="activities-section">
      {/* Heading */}
      <div className="activities-section__header">
        <h2 className="activities-section__title">Adventure Awaits</h2>
        <p className="activities-section__subtitle">
          Discover endless possibilities for outdoor excitement and eco-friendly adventures.
          <br />
          Every visit brings new memories to cherish.
        </p>
      </div>

      {/* 3×2 Activity Grid */}
      <motion.div 
        className="activities-section__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {activities.map((activity) => (
          <ActivityCardComponent key={activity.id} activity={activity} />
        ))}
      </motion.div>

      {/* CTA Banner */}
      <div className="activities-cta">
        <h3 className="activities-cta__title">Ready for Your Next Adventure?</h3>
        <p className="activities-cta__body">
          We're here to help you plan the perfect outdoor experience. Whether you're a solo
          explorer or bringing the whole family, our team is ready to make your visit
          unforgettable. Reach out today and let's start planning!
        </p>
        <button 
          className="activities-cta__btn" 
          id="cta-contact-us-now"
          onClick={() => {
            setCurrentPage?.('Contact Us');
            setTimeout(() => {
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        >
          Contact us now
        </button>
      </div>
    </section>
  );
}
