import './FilterChips.css';

const LABELS = {
  search: 'Search',
  cuisine: 'Cuisine',
  difficulty: 'Difficulty',
  mealType: 'Meal',
  maxPrepTime: 'Preparation time',
};

export default function FilterChips({ search, filters, onRemoveSearch, onRemoveFilter }) {
  const chips = [];

  if (search) {
    chips.push({
      key: 'search',
      label: `${LABELS.search}: "${search}"`,
      onRemove: onRemoveSearch,
    });
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;
    const display =
      key === 'maxPrepTime' ? `Up to ${value} min` : value;
    chips.push({
      key,
      label: `${LABELS[key]}: ${display}`,
      onRemove: () => onRemoveFilter(key),
    });
  });

  if (!chips.length) return null;

  return (
    <div className="filter-chips" aria-label="Active filters">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          className="filter-chip"
          onClick={chip.onRemove}
          aria-label={`Remove ${chip.label} filter`}
        >
          {chip.label}
          <span aria-hidden="true">×</span>
        </button>
      ))}
    </div>
  );
}
