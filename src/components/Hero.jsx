import { Link } from 'react-router-dom';
import HeroShowcase from './HeroShowcase';
import './Hero.css';

export default function Hero({ recipeCount }) {
  const scrollToBrowse = () => {
    document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true">
        <div className="hero__ambient-blob hero__ambient-blob--1" />
        <div className="hero__ambient-blob hero__ambient-blob--2" />
        <div className="hero__ambient-blob hero__ambient-blob--3" />
        <div className="hero__grain" />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Interactive recipe cards
          </div>

          <h1 id="hero-title">
            Cook from a deck
            <br />
            of <span className="hero__gradient">digital</span>
            <br />
            <span className="hero__gradient">recipe cards</span>
          </h1>

          <p className="hero__subtitle">
            Flip for ingredients. Expand for a preview.
            <br />
            Save favorites — like a recipe box, reimagined for the web.
          </p>

          <div className="hero__cta">
            <button
              type="button"
              className="btn btn-primary btn-xl btn-shine"
              onClick={scrollToBrowse}
            >
              <span className="btn__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              Explore the deck
              <span className="btn__arrow" aria-hidden="true">→</span>
            </button>
            <Link to="/favorites" className="btn btn-glass btn-xl">
              <span className="btn__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
              Saved favorites
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>{recipeCount}</strong>
              <span>Recipe cards</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>Flip</strong>
              <span>&amp; expand</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>Local</strong>
              <span>Favorites</span>
            </div>
          </div>
        </div>

        <div className="hero__showcase-wrap">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
