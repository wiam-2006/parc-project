import { useEffect } from 'react';
import EventForm from '../components/EventForm';
import './EventsPage.css';


const eventsList = [
  {
    id: 'birthday',
    title: 'Birthday Party',
    frenchTitle: 'Anniversaires Enchantés',
    description: 'Celebrate your special day surrounded by magical forest decorations, glowing fairy lights, and customized outdoor activities tailored to your dream theme.',
    frenchDescription: 'Célébrez votre journée spéciale au cœur d\'un décor forestier féerique avec des guirlandes lumineuses, un gâteau thématique et des animations sur mesure.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80',
    capacity: '15 - 50 Guests',
    catering: 'Gourmet Buffet & Custom Cake',
    highlight: 'Woodland theme'
  },
  {
    id: 'festival',
    title: 'Festival',
    frenchTitle: 'Festivals de Musique & Nature',
    description: 'Immersive outdoor festivals with state-of-the-art stage setups, custom lighting under the canopy, gourmet food trucks, and acoustic nature sessions.',
    frenchDescription: 'Des festivals en plein air immersifs avec des scènes intégrées à la nature, un éclairage LED sous la canopée, des food trucks haut de gamme et des sessions acoustiques.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.THsKsuq8RV3gKhmwA8wOdQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    capacity: '100 - 500 Guests',
    catering: 'Diverse Food Trucks & Open Bar',
    highlight: 'Live acoustics & light shows'
  },
  {
    id: 'family',
    title: 'Family Day',
    frenchTitle: 'Journées Famille & Détente',
    description: 'A perfect gathering for all generations, featuring custom outdoor giant lawn games, scenic picnics, agricultural workshop visits, and group challenges.',
    frenchDescription: 'Un rassemblement idéal pour toutes les générations, comprenant des pique-niques gourmands, des jeux géants en plein air, des ateliers nature et des défis amusants.',
    image: 'https://thumbs.dreamstime.com/b/amusement-en-famille-dans-le-parc-heureuse-passer-du-temps-et-jouer-avec-sa-fille-270847757.jpg',
    capacity: '20 - 150 Guests',
    catering: 'Rustic Barbecue & Fresh Juices',
    highlight: 'All ages activities'
  },
  {
    id: 'kids',
    title: 'Kids Event',
    frenchTitle: 'Aventures & Anniversaires Enfants',
    description: 'Exciting outdoor treasure hunts, secure mini-zipline courses, educational farm tours, and creative eco-craft workshops led by certified animators.',
    frenchDescription: 'Des chasses au trésor palpitantes, des parcours accrobranche sécurisés, la visite guidée de la ferme pédagogique et des ateliers créatifs encadrés par des professionnels.',
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1000&q=80',
    capacity: '10 - 40 Kids',
    catering: 'Kid-Friendly Snacks & Sweet Table',
    highlight: '100% Supervised & Active'
  },
  {
    id: 'corporate',
    title: 'Corporate Event',
    frenchTitle: 'Séminaires & Retraites d\'Entreprise',
    description: 'High-end outdoor presentation spaces, customized premium team-building workshops, luxury nature lounge zones, and premium dining for executive networking.',
    frenchDescription: 'Des espaces de conférence en plein air haut de gamme, des ateliers de team building sur mesure, des salons forestiers luxueux et des dîners gastronomiques en plein air.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80',
    capacity: '30 - 200 Guests',
    catering: 'Gastronomic Dinner & Cocktail Bar',
    highlight: 'Advanced AV Setup & VIP Lounge'
  }
];

export default function EventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="events-premium-page">
      {/* Cinematic Hero */}
      <section className="events-hero animate-on-scroll fade-in">
        <div className="events-hero-bg">
          <div className="events-hero-overlay"></div>
          <div className="floating-decorations">
            <span className="floating-leaf item-1">🍃</span>
            <span className="floating-leaf item-2">🍁</span>
            <span className="floating-leaf item-3">🍂</span>
            <span className="floating-leaf item-4">🌱</span>
          </div>
          <div className="events-hero-content">
            <span className="events-hero-pretitle animate-on-scroll blur-reveal">UNFORGETTABLE MOMENTS</span>
            <h1 className="events-hero-title animate-on-scroll blur-reveal delay-1">
              Immersive Nature Events <br />
              <span>Tailored To Perfection</span>
            </h1>
            <p className="events-hero-subtitle animate-on-scroll fade-in delay-2">
              Transform your celebrations into premium cinematic memories. From intimate gatherings to high-scale corporate retreats, we design immersive experiences under the forest canopy.
            </p>
            <div className="events-hero-buttons animate-on-scroll fade-in delay-3">
              <a href="#contact" className="cta-btn-primary">Book an Event</a>
              <a href="#packages" className="cta-btn-secondary">Explore Packages</a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="events-intro animate-on-scroll fade-in" id="packages">
        <div className="events-container">
          <span className="section-leaf" aria-hidden="true">🌿</span>
          <h2 className="events-sec-title">Premium Event Packages</h2>
          <p className="events-sec-subtitle">Discover our five core bespoke offerings, created to blend luxury, comfort, and direct connection with nature.</p>
        </div>
      </section>

      {/* Showcase Grid of Event Cards */}
      <section className="events-showcase">
        <div className="events-container">
          <div className="events-modern-grid">
            {eventsList.map((event, index) => (
              <div 
                key={event.id} 
                className={`events-showcase-card animate-on-scroll slide-up delay-${index % 4}`}
              >
                <div className="events-card-media">
                  <img src={event.image} alt={event.title} className="events-card-img" loading="lazy" />
                  <div className="events-card-tag">{event.highlight}</div>
                  <div className="events-card-glass-glow"></div>
                </div>
                <div className="events-card-details">
                  <span className="events-card-number">0{index + 1}</span>
                  <h3 className="events-card-title">{event.title}</h3>
                  <h4 className="events-card-subtitle">{event.frenchTitle}</h4>
                  <p className="events-card-desc">{event.description}</p>
                  
                  <div className="events-card-specs">
                    <div className="spec-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      <span>{event.capacity}</span>
                    </div>
                    <div className="spec-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
                      </svg>
                      <span>{event.catering}</span>
                    </div>
                  </div>
                  
                  <a href="#contact" className="events-card-cta">
                    <span>Enquire Package</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlight band */}
      <section className="events-nature-experience animate-on-scroll fade-in">
        <div className="experience-glass-card">
          <div className="experience-content">
            <h3>Why Host with FunZone?</h3>
            <p>Every event is uniquely integrated into our protected environment. We manage low-impact sustainable logistics, professional safety coverage, custom artistic lighting, and premium dining so you can fully live the magic of your moments.</p>
            <div className="experience-badges">
              <div className="badge">🌲 Eco-Responsible</div>
              <div className="badge">⭐ High-End Catering</div>
              <div className="badge">🔒 Full Event Management</div>
            </div>
          </div>
        </div>
      </section>

      {/* Injected custom inquiries / contact block */}
      <EventForm />
    </div>
  );
}
