import { Link, NavLink } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import './Header.css';

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__logo" aria-hidden="true">
            RD
          </span>
          <span>
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
