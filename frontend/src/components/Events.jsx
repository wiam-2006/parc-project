import React from 'react';
import { motion } from 'framer-motion';
import { Users, PartyPopper, School, Calendar, ArrowRight, Zap, Target, Star } from 'lucide-react';
import './Events.css';

const Events = () => {
    const eventTypes = [
        {
            icon: <Users size={32} />,
            title: "Team Building",
            desc: "Boost morale and foster collaboration with custom-designed challenges that push your team beyond their comfort zones.",
            features: ["Custom Itineraries", "Facilitated Workshops", "Catering Options"]
        },
        {
            icon: <PartyPopper size={32} />,
            title: "Birthdays & Parties",
            desc: "Make your special day unforgettable with adrenaline-packed adventures and dedicated party zones for all ages.",
            features: ["Private Host", "Activity Packages", "Party Decoration"]
        },
        {
            icon: <School size={32} />,
            title: "School Trips",
            desc: "Perfect blend of education and exhilaration. Our school programs focus on youth development and outdoor learning.",
            features: ["Safety Certified", "Educational Guides", "Group Discounts"]
        }
    ];

    return (
        <div className="events-page">
            {/* Hero Section */}
            <section className="events-hero">
                <div className="events-hero-overlay"></div>
                <div className="events-hero-content">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-badge"
                    >
                        UNSFORGETTABLE MOMENTS
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="hero-title"
                    >
                        Kinetic Memories for <br /><span>Groups & Events</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hero-desc"
                    >
                        From corporate power-plays to birthday celebrations, we turn ordinary 
                        outings into epic adventures that your group will talk about for years.
                    </motion.p>
                </div>
            </section>

            {/* Event Cards Section */}
            <section className="event-types-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Whatever the Occasion</h2>
                        <p className="section-subtitle">We have the perfect package to match your kinetic energy.</p>
                    </div>

                    <div className="event-cards-grid">
                        {eventTypes.map((event, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="event-type-card"
                            >
                                <div className="card-icon-box">{event.icon}</div>
                                <h3 className="card-title">{event.title}</h3>
                                <p className="card-desc">{event.desc}</p>
                                <ul className="card-features">
                                    {event.features.map((f, i) => (
                                        <li key={i}><Zap size={14} className="feature-icon" /> {f}</li>
                                    ))}
                                </ul>
                                <button className="card-cta">
                                    Explore Details <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us for Events */}
            <section className="event-stats">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Events Hosted</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50k+</span>
                        <span className="stat-label">Happy Guests</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Safety Record</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">4.9/5</span>
                        <span className="stat-label">Client Rating</span>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="events-cta">
                <div className="cta-box">
                    <h2 className="cta-title">Ready to plan your legend?</h2>
                    <p className="cta-desc">Contact our events team today for a custom quote and let the adventure begin.</p>
                    <div className="cta-buttons">
                        <button className="btn-primary">Download Brochure</button>
                        <button className="btn-secondary">Speak to a Planner</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
