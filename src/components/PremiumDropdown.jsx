import { useEffect, useId, useRef, useState } from 'react';
import './PremiumDropdown.css';

export default function PremiumDropdown({
  label,
  value,
  placeholder,
  options,
  onChange,
  formatOption = (v) => v,
  icon,
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listId = useId();

  const items = [
    { value: '', label: placeholder },
    ...options.map((opt) => ({ value: String(opt), label: formatOption(opt) })),
  ];

  const selectedLabel =
    items.find((item) => item.value === String(value))?.label ?? placeholder;

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) setHighlight(-1);
  }, [open]);

  const selectItem = (itemValue) => {
    onChange(itemValue);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault();
      setOpen(true);
      setHighlight(Math.max(0, items.findIndex((i) => i.value === String(value))));
      return;
    }

    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlight >= 0) selectItem(items[highlight].value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setHighlight(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setHighlight(items.length - 1);
    }
  };

  return (
    <div className="premium-dropdown" ref={rootRef}>
      <span className="premium-dropdown__label" id={`${listId}-label`}>
        {icon}
        {label}
      </span>

      <button
        type="button"
        ref={triggerRef}
        className={`premium-dropdown__trigger ${value ? 'has-value' : ''} ${open ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${listId}-label`}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onKeyDown}
      >
        <span className="premium-dropdown__value">{selectedLabel}</span>
        <span className="premium-dropdown__chevron" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="premium-dropdown__trigger-shine" aria-hidden="true" />
      </button>

      <div
        className={`premium-dropdown__menu ${open ? 'is-open' : ''}`}
        role="listbox"
        id={listId}
        aria-labelledby={`${listId}-label`}
        aria-hidden={!open}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <ul>
          {items.map((item, index) => {
            const isSelected = item.value === String(value);
            const isHighlighted = index === highlight;

            return (
              <li key={item.value || '__all'} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'premium-dropdown__option',
                    isSelected && 'is-selected',
                    isHighlighted && 'is-highlighted',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => selectItem(item.value)}
                >
                  {item.label}
                  {isSelected && (
                    <span className="premium-dropdown__check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
