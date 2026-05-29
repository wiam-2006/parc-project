import './index.css';
export default function HeroSection() {
  return (
    <section className="hero" id="events" aria-label="Events and Celebrations hero">
      <div className="hero-bg" role="img" aria-label="Outdoor garden party in a park setting" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Events &amp; Celebrations</h1>
        <p className="hero-subtitle">
          Create unforgettable memories in the heart of the wild.
        </p>
      </div>
    </section>
  );
}
