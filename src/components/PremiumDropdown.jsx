import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [menuPosition, setMenuPosition] = useState(null);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const listId = useId();

  const items = [
    { value: '', label: placeholder },
    ...options.map((opt) => ({ value: String(opt), label: formatOption(opt) })),
  ];

  const selectedLabel =
    items.find((item) => item.value === String(value))?.label ?? placeholder;

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportPadding = 12;
    const gap = 6;
    const availableBelow = window.innerHeight - rect.bottom - viewportPadding;
    const availableAbove = rect.top - viewportPadding;
    const openUpward = availableBelow < 180 && availableAbove > availableBelow;
    const maxHeight = Math.min(240, openUpward ? availableAbove - gap : availableBelow - gap);
    const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - width - viewportPadding
    );

    setMenuPosition({
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top + gap }
        : { top: rect.bottom + gap }),
      left,
      width,
      maxHeight: Math.max(120, maxHeight),
      placement: openUpward ? 'top' : 'bottom',
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (
        rootRef.current?.contains(event.target) ||
        menuRef.current?.contains(event.target)
      ) {
        return;
      }
      setOpen(false);
    };

    const onViewportChange = () => updateMenuPosition();

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onViewportChange);
    window.addEventListener('scroll', onViewportChange, true);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('scroll', onViewportChange, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) setHighlight(-1);
  }, [open]);

  const selectItem = (itemValue) => {
    onChange(itemValue);
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (!open && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      setOpen(true);
      setHighlight(Math.max(0, items.findIndex((i) => i.value === String(value))));
      return;
    }

    if (!open) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlight((prev) => (prev + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlight((prev) => (prev - 1 + items.length) % items.length);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (highlight >= 0) selectItem(items[highlight].value);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setHighlight(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setHighlight(items.length - 1);
    }
  };

  const menuStyle = menuPosition
    ? {
        ...(menuPosition.top != null ? { top: menuPosition.top } : {}),
        ...(menuPosition.bottom != null ? { bottom: menuPosition.bottom } : {}),
        left: menuPosition.left,
        width: menuPosition.width,
        '--menu-max-height': `${menuPosition.maxHeight}px`,
      }
    : undefined;

  const menu = (
    <div
      ref={menuRef}
      className="premium-dropdown__menu is-open is-portal"
      role="listbox"
      id={listId}
      aria-labelledby={`${listId}-label`}
      tabIndex={-1}
      style={menuStyle}
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
  );

  return (
    <div className={`premium-dropdown ${open ? 'is-open' : ''}`} ref={rootRef}>
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

      {open && menuPosition && createPortal(menu, document.body)}
    </div>
  );
}
