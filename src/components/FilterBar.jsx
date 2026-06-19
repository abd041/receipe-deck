import './FilterBar.css';

export default function FilterBar({ filters, options, onChange, onClear, activeCount }) {
  return (
    <section className="filter-bar" aria-label="Recipe filters">
      <div className="filter-bar__controls">
        <label>
          <span>Cuisine</span>
          <select
            value={filters.cuisine}
            onChange={(e) => onChange('cuisine', e.target.value)}
          >
            <option value="">All cuisines</option>
            {options.cuisines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Difficulty</span>
          <select
            value={filters.difficulty}
            onChange={(e) => onChange('difficulty', e.target.value)}
          >
            <option value="">All levels</option>
            {options.difficulties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Meal type</span>
          <select
            value={filters.mealType}
            onChange={(e) => onChange('mealType', e.target.value)}
          >
            <option value="">All meals</option>
            {options.mealTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Max prep time</span>
          <select
            value={filters.maxPrepTime}
            onChange={(e) => onChange('maxPrepTime', e.target.value)}
          >
            <option value="">Any time</option>
            {options.prepTimes.map((item) => (
              <option key={item} value={item}>
                Up to {item} min
              </option>
            ))}
          </select>
        </label>
      </div>

      {activeCount > 0 && (
        <div className="filter-bar__active">
          <p>{activeCount} filter{activeCount > 1 ? 's' : ''} active</p>
          <button type="button" className="filter-bar__clear" onClick={onClear}>
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}
