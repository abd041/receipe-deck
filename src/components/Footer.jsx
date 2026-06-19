import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const scrollToBrowse = () => {
    document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__ambient" aria-hidden="true">
        <div className="site-footer__glow site-footer__glow--olive" />
        <div className="site-footer__glow site-footer__glow--warm" />
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__cta">
          <div className="site-footer__cta-shine" aria-hidden="true" />

          <span className="site-footer__eyebrow">Your recipe box awaits</span>
          <h2 className="site-footer__title">
            Ready to build your
            <span className="site-footer__gradient"> personal deck?</span>
          </h2>
          <p className="site-footer__text">
            Flip, expand, and save your favorite recipes — stored locally in your
            browser. No account. No clutter. Just beautiful cards.
          </p>

          <div className="site-footer__actions">
            {isHome ? (
              <button
                type="button"
                className="btn btn-primary btn-xl btn-shine"
                onClick={scrollToBrowse}
              >
                Explore the deck
                <span className="btn__arrow" aria-hidden="true">→</span>
              </button>
            ) : (
              <Link to="/" className="btn btn-primary btn-xl btn-shine">
                Browse recipes
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            )}
            <Link to="/favorites" className="btn btn-glass btn-xl">
              View favorites
            </Link>
          </div>

          <p className="site-footer__fineprint">
            RecipeDeck — interactive digital recipe cards · Favorites saved locally
          </p>
        </div>
      </div>
    </footer>
  );
}
