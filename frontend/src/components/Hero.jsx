import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__image-wrap"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/premium_photo-1675039871605-eb156cc0575d.avif" alt="Funzone Park tropical landscape" className="hero__img" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Connect with nature's adventure hub. Let's plan your perfect<br />
            outdoor experience.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
