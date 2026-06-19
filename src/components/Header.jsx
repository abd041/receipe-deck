import { Link, NavLink } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import useScrolled from '../hooks/useScrolled';
import './Header.css';

export default function Header() {
  const { favorites } = useFavorites();
  const scrolled = useScrolled();

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__logo" aria-hidden="true">
            <span className="site-header__logo-mark">RD</span>
            <span className="site-header__logo-ring" />
          </span>
          <span className="site-header__brand-text">
            <strong>RecipeDeck</strong>
            <small>Interactive recipe cards</small>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Browse
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Favorites
            {favorites.length > 0 && (
              <span className="site-header__badge">{favorites.length}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
