import { memo, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { ChefHatIcon, ClockIcon, LeafIcon, UsersIcon } from './Icons';
import './RecipeCard.css';

function MetaItem({ icon, label }) {
  return (
    <span className="recipe-card__meta-item">
      {icon}
      {label}
    </span>
  );
}

function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  featured = false,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  const handleFlip = () => {
    if (!isExpanded) setIsFlipped((prev) => !prev);
  };

  const handleExpand = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (next) {
        setIsFlipped(false);
        requestAnimationFrame(() => {
          cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
      return next;
    });
  };

  const handleParallax = useCallback((e) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    el.style.setProperty('--px', `${x}px`);
    el.style.setProperty('--py', `${y}px`);
  }, []);

  const resetParallax = useCallback(() => {
    const el = imageRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0px');
    el.style.setProperty('--py', '0px');
  }, []);

  const cardClass = [
    'recipe-card',
    isFlipped && 'is-flipped',
    isExpanded && 'is-expanded',
    featured && 'is-featured',
  ]
    .filter(Boolean)
    .join(' ');

  const previewIngredients = recipe.ingredients.slice(0, 5);

  return (
    <article className={cardClass} ref={cardRef}>
      <div className="recipe-card__glow" aria-hidden="true" />

      {!isExpanded ? (
        <div className="recipe-card__flip">
          <div className="recipe-card__inner">
            <div className="recipe-card__face recipe-card__front" aria-hidden={isFlipped}>
              <div
                className="recipe-card__media"
                onMouseMove={handleParallax}
                onMouseLeave={resetParallax}
              >
                <button
                  type="button"
                  className="recipe-card__image-btn"
                  onClick={handleFlip}
                  aria-label={`Flip ${recipe.name} card to see ingredients`}
                >
                  <div className="recipe-card__image-parallax" ref={imageRef}>
                    <img src={recipe.image} alt={recipe.name} loading="lazy" />
                  </div>
                  <div className="recipe-card__image-overlay" aria-hidden="true" />
                  <span className="recipe-card__category">{recipe.mealType}</span>
                </button>
                <div className="recipe-card__favorite">
                  <FavoriteButton
                    active={isFavorite}
                    onClick={() => onToggleFavorite(recipe.id)}
                  />
                </div>
              </div>

              <div className="recipe-card__glass-footer">
                <div className="recipe-card__body">
                  <p className="recipe-card__cuisine">{recipe.cuisine}</p>
                  <h3>{recipe.name}</h3>
                  <div className="recipe-card__meta">
                    <MetaItem icon={<ClockIcon size={14} />} label={`${recipe.prepTime} min`} />
                    <MetaItem icon={<ChefHatIcon size={14} />} label={recipe.difficulty} />
                  </div>
                </div>
                <div className="recipe-card__actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleFlip}>
                    Flip
                  </button>
                  <button type="button" className="btn btn-primary btn-sm btn-shine" onClick={handleExpand}>
                    Expand
                    <span className="btn__arrow" aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="recipe-card__face recipe-card__back" aria-hidden={!isFlipped}>
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.slice(0, 6).map((item, index) => (
                  <li key={`${recipe.id}-back-${index}`}>{item}</li>
                ))}
                {recipe.ingredients.length > 6 && (
                  <li className="recipe-card__more">+{recipe.ingredients.length - 6} more</li>
                )}
              </ul>
              <div className="recipe-card__leaf" aria-hidden="true">
                <LeafIcon />
              </div>
              <div className="recipe-card__actions recipe-card__actions--back">
                <button type="button" className="btn btn-ghost btn-sm" onClick={handleFlip}>
                  Back
                </button>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary btn-sm btn-shine">
                  View recipe
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="recipe-card__expanded">
          <div className="recipe-card__expanded-image">
            <img src={recipe.image} alt={recipe.name} />
            <div className="recipe-card__image-overlay" aria-hidden="true" />
            <span className="recipe-card__preview-badge">Recipe preview</span>
            <FavoriteButton
              active={isFavorite}
              onClick={() => onToggleFavorite(recipe.id)}
            />
          </div>
          <div className="recipe-card__expanded-content">
            <div className="recipe-card__expanded-top">
              <div>
                <p className="recipe-card__cuisine">{recipe.cuisine}</p>
                <h3>{recipe.name}</h3>
              </div>
              <button
                type="button"
                className="recipe-card__collapse"
                onClick={handleExpand}
                aria-label="Collapse card"
              >
                ×
              </button>
            </div>

            <p className="recipe-card__expanded-description">{recipe.description}</p>

            <div className="recipe-card__expanded-facts">
              <MetaItem icon={<ClockIcon size={14} />} label={`${recipe.prepTime} min prep`} />
              <MetaItem icon={<ClockIcon size={14} />} label={`${recipe.cookTime} min cook`} />
              <MetaItem icon={<UsersIcon size={14} />} label={`Serves ${recipe.servings}`} />
              <MetaItem icon={<ChefHatIcon size={14} />} label={recipe.difficulty} />
              <span className="recipe-card__meta-item">{recipe.mealType}</span>
            </div>

            <div className="recipe-card__expanded-ingredients">
              <h4>Key ingredients</h4>
              <ul>
                {previewIngredients.map((item, index) => (
                  <li key={`${recipe.id}-preview-${index}`}>{item}</li>
                ))}
                {recipe.ingredients.length > previewIngredients.length && (
                  <li className="recipe-card__more">
                    +{recipe.ingredients.length - previewIngredients.length} more in full recipe
                  </li>
                )}
              </ul>
            </div>

            <div className="recipe-card__expanded-actions">
              <button type="button" className="btn btn-ghost" onClick={handleExpand}>
                Collapse
              </button>
              <Link to={`/recipe/${recipe.id}`} className="btn btn-primary btn-shine">
                View Recipe
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default memo(RecipeCard);
