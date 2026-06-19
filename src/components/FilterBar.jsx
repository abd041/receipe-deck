import { BowlIcon, ChefHatIcon, ClockIcon } from './Icons';
import PremiumDropdown from './PremiumDropdown';
import './FilterBar.css';

const FILTER_ICONS = {
  cuisine: <BowlIcon size={15} />,
  difficulty: <ChefHatIcon size={15} />,
  mealType: <BowlIcon size={15} />,
  maxPrepTime: <ClockIcon size={15} />,
};

export default function FilterBar({ filters, options, onChange, onClear, activeCount }) {
  const fields = [
    { key: 'cuisine', label: 'Cuisine', placeholder: 'All cuisines', options: options.cuisines },
    {
      key: 'difficulty',
      label: 'Difficulty',
      placeholder: 'All levels',
      options: options.difficulties,
    },
    {
      key: 'mealType',
      label: 'Meal type',
      placeholder: 'All meals',
      options: options.mealTypes,
    },
    {
      key: 'maxPrepTime',
      label: 'Max prep time',
      placeholder: 'Any time',
      options: options.prepTimes,
      format: (v) => `Up to ${v} min`,
    },
  ];

  return (
    <section className="filter-bar" aria-label="Recipe filters">
      <div className="filter-bar__controls">
        {fields.map(({ key, label, placeholder, options: opts, format }) => (
          <PremiumDropdown
            key={key}
            label={label}
            icon={FILTER_ICONS[key]}
            value={filters[key]}
            placeholder={placeholder}
            options={opts}
            formatOption={format}
            onChange={(val) => onChange(key, val)}
          />
        ))}
      </div>

      {activeCount > 0 && (
        <div className="filter-bar__active">
          <p>
            <span className="filter-bar__dot" />
            {activeCount} filter{activeCount > 1 ? 's' : ''} active
          </p>
          <button type="button" className="filter-bar__clear" onClick={onClear}>
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}
