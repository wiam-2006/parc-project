import { useEffect } from 'react';
import './index.css';
export default function AboutPage() {
  // Simple intersection observer to trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-v2-page">
      {/* Hero Section */}
      <section className="about-hero animate-on-scroll fade-in">
        <div className="about-hero-bg">
          <div className="about-hero-overlay"></div>
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              Experience The Serenity Of Our Curated<br />Landscape With Your Loved Ones
            </h1>
            <p className="about-hero-subtitle">
              Faciliel Lactus Finhue Habitstase Masse Sx Condeeseuret Ligora Lagurat. Condimentum Laculs<br />
              Metris Mnnes Fringilla Lic A Lacus Suscipit. Dignissam Placent
            </p>
          </div>
        </div>
        
        {/* Overlapping Cards */}
        <div className="about-hero-cards-wrapper">
          <div className="about-hero-cards">
            {/* Card 1 */}
            <div className="hero-card">
              <div className="hero-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <div className="hero-card-text">
                <h3>Curated Nature Walks</h3>
                <p>Guided explorations led by our resident naturalists to uncover the hidden secrets of the forest floor.</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="hero-card">
              <div className="hero-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5.5" cy="17.5" r="3.5"/>
                  <circle cx="18.5" cy="17.5" r="3.5"/>
                  <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
                </svg>
              </div>
              <div className="hero-card-text">
                <h3>Cycle Path Network</h3>
                <p>Over 20 miles of smooth, organic material paths designed for both leisure cruising and fitness challenges.</p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="hero-card">
              <div className="hero-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="hero-card-text">
                <h3>Community Markets</h3>
                <p>Weekly gatherings featuring local artisans, sustainable farmers, and live acoustic nature-inspired music.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Header Section */}
      <section className="about-v2-header">
        <h3 className="about-v2-subtitle animate-on-scroll fade-in">Qui Sommes-Nous?</h3>
        <h1 className="about-v2-title animate-on-scroll fade-in delay-1">
          AVENTURE INSPIRANTE<br />ET SOLIDARITÉ
        </h1>
        <p className="about-v2-desc animate-on-scroll fade-in delay-2">
          Niché au cœur de la forêt de Tanger, notre parc est un véritable havre de 
          nature et d'aventure. Offrant une vue imprenable sur la mer et la forêt, nous 
          proposons une large gamme d'activités pour tous les âges : tyroliennes, 
          équitation, piscine panoramique, trampolines, paintball, ferme 
          pédagogique, des parcs pour enfants ainsi que des balades en quad et 
          buggy pour une dose d'adrénaline.
        </p>
        <p className="about-v2-desc animate-on-scroll fade-in delay-3">
          Nous offrons également un éventail de services adaptés aux particuliers et 
          aux entreprises, pour des journées inoubliables en pleine nature. Et pour 
          une pause gourmande, notre restaurant vous invite à découvrir des 
          spécialités marocaines savoureuses, préparées avec passion.
        </p>
      </section>

      {/* Features Grid Section */}
      <section className="about-v2-features">
        <div className="about-v2-grid">
          
          {/* Column 1: Activités */}
          <div className="about-v2-card animate-on-scroll slide-up">
            <div className="about-v2-card-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" 
                alt="Activités en plein air" 
                className="about-v2-card-img" 
                loading="lazy"
              />
            </div>
            <h4 className="about-v2-card-title">Activités en plein air</h4>
            <p className="about-v2-card-text">
              Explorez la nature et vivez des expériences inoubliables grâce à nos 
              activités en plein air, idéales pour les amateurs d'aventure et de sensations 
              fortes.
            </p>
          </div>

          {/* Column 2: Aventures (Center Elevated) */}
          <div className="about-v2-card center-card animate-on-scroll slide-up delay-1">
            <div className="about-v2-card-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80" 
                alt="Aventures en groupe" 
                className="about-v2-card-img" 
                loading="lazy"
              />
            </div>
            <h4 className="about-v2-card-title">Aventures en groupe</h4>
            <p className="about-v2-card-text">
              Vivez des aventures inoubliables avec votre groupe, que ce soit entre 
              amis, collègues ou famille, pour des moments de plaisir et de cohésion 
              en pleine nature.
            </p>
          </div>

          {/* Column 3: Aventure */}
          <div className="about-v2-card animate-on-scroll slide-up delay-2">
            <div className="about-v2-card-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&q=80" 
                alt="Aventure en pleine nature" 
                className="about-v2-card-img" 
                loading="lazy"
              />
            </div>
            <h4 className="about-v2-card-title">Aventure en pleine nature</h4>
            <p className="about-v2-card-text">
              Libérez votre esprit d'aventurier avec nos activités en plein air et profitez 
              d'un moment de détente et d'exploration en pleine nature. Une 
              expérience idéale pour toute la famille ou entre amis.
            </p>
          </div>

        </div>
      </section>

      {/* Our Story Timeline Section */}
      <section className="about-story">
        <div className="about-story-header">
          <h3 className="about-story-subtitle animate-on-scroll fade-in">Notre Histoire</h3>
          <h2 className="about-story-title animate-on-scroll fade-in delay-1">L'ÉVOLUTION DE FUNZONE PARK</h2>
        </div>

        <div className="timeline">
          <div className="timeline-item animate-on-scroll fade-in">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2015</div>
            <div className="timeline-content">
              <h3>La Naissance d'un Rêve</h3>
              <p>Ouverture du premier parcours de tyrolienne au cœur de la forêt de Tanger.</p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll fade-in delay-1">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2018</div>
            <div className="timeline-content">
              <h3>Expansion & Diversité</h3>
              <p>Introduction des balades en quad, du buggy et de l'espace équitation pour plus de sensations.</p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll fade-in delay-2">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2021</div>
            <div className="timeline-content">
              <h3>Engagement Nature</h3>
              <p>Lancement de la ferme pédagogique et du programme de conservation forestière.</p>
            </div>
          </div>

          <div className="timeline-item animate-on-scroll fade-in delay-3">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2024</div>
            <div className="timeline-content">
              <h3>Une Destination Incontournable</h3>
              <p>Modernisation de la piscine panoramique et du restaurant pour une expérience complète.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs Section */}
      <section className="about-values">
        <div className="about-values-header">
          <h3 className="about-values-subtitle animate-on-scroll fade-in">Nos Valeurs</h3>
          <h2 className="about-values-title animate-on-scroll fade-in delay-1">
            CONNECTER LES GENS À LA<br />
            NATURE À TRAVERS DES<br />
            AVENTURES EN PLEIN AIR
          </h2>
        </div>

        <div className="values-grid">
          {/* Card 1 */}
          <div className="value-card animate-on-scroll slide-up">
            <div className="value-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L8 8H10L6 14H18L14 8H16L12 2Z"/>
                <path d="M11 14H13V22H11V14Z"/>
              </svg>
            </div>
            <h4>Nature & Authenticité</h4>
            <p>Respecter et sublimer notre environnement exceptionnel tout en proposant des expériences authentiques en pleine nature</p>
          </div>

          {/* Card 2 (Highlighted) */}
          <div className="value-card highlighted animate-on-scroll slide-up delay-1">
            <div className="value-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                <path d="M13 10h.01M16 10h.01M10 10h.01"/>
              </svg>
            </div>
            <h4>Convivialité & Partage</h4>
            <p>Créer un espace où familles, amis et équipes se retrouvent pour partager des moments de complicité et de plaisir</p>
          </div>

          {/* Card 3 */}
          <div className="value-card animate-on-scroll slide-up delay-2">
            <div className="value-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 20L12 4L2 20h20z"/>
                <path d="M12 15v5"/>
                <path d="M9 15l3-3 3 3"/>
                <path d="M18 10h.01M15 7h.01M6 14h.01"/>
              </svg>
            </div>
            <h4>Aventure & Émotion</h4>
            <p>Offrir des activités riches en sensations fortes et en découvertes, pour que chaque visite soit une aventure inoubliable</p>
          </div>

          {/* Card 4 */}
          <div className="value-card animate-on-scroll slide-up delay-3">
            <div className="value-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h4>Excellence & Qualité</h4>
            <p>Garantir des services et des infrastructures de haut niveau, pour une sécurité optimale et une satisfaction totale</p>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="about-team">
        <div className="about-team-header">
          <svg className="team-leaf-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
          <h2 className="about-team-title animate-on-scroll fade-in">Meet Our Team</h2>
          <svg className="team-leaf-icon" style={{transform: 'scaleX(-1)'}} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
        </div>

        <div className="team-grid">
          {/* Team Member 1 */}
          <div className="team-card animate-on-scroll slide-up">
            <div className="team-img-wrapper">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" alt="Team Member Avatar" loading="lazy" />
              <div className="team-img-overlay"></div>
              <div className="team-socials">
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <h4>Elias Thorne</h4>
            <p>Lead Horticulturist</p>
          </div>

          {/* Team Member 2 */}
          <div className="team-card animate-on-scroll slide-up delay-1">
            <div className="team-img-wrapper">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" alt="Team Member Avatar" loading="lazy" />
              <div className="team-img-overlay"></div>
              <div className="team-socials">
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <h4>Arthur Finch</h4>
            <p>Conservation Specialist</p>
          </div>

          {/* Team Member 3 */}
          <div className="team-card animate-on-scroll slide-up delay-2">
            <div className="team-img-wrapper">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" alt="Team Member Avatar" loading="lazy" />
              <div className="team-img-overlay"></div>
              <div className="team-socials">
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <h4>Sarah Woods</h4>
            <p>Events Coordinator</p>
          </div>

          {/* Team Member 4 */}
          <div className="team-card animate-on-scroll slide-up delay-3">
            <div className="team-img-wrapper">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" alt="Team Member Avatar" loading="lazy" />
              <div className="team-img-overlay"></div>
              <div className="team-socials">
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <h4>Oliver Brooks</h4>
            <p>Operations Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}
