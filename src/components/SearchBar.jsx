import './SearchBar.css';

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        placeholder="Search recipes by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search recipes"
      />
    </label>
  );
}
