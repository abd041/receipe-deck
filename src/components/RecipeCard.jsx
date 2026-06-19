import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { BowlIcon, ChefHatIcon, ClockIcon, LeafIcon } from './Icons';
import './RecipeCard.css';

function MetaItem({ icon, label }) {
  return (
    <span className="recipe-card__meta-item">
      {icon}
      {label}
    </span>
  );
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFlip = () => {
    if (!isExpanded) setIsFlipped((prev) => !prev);
  };

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded) setIsFlipped(false);
  };

  return (
    <article
      className={`recipe-card ${isFlipped ? 'is-flipped' : ''} ${
        isExpanded ? 'is-expanded' : ''
      }`}
    >
      {!isExpanded ? (
        <div className="recipe-card__flip">
          <div className="recipe-card__inner">
            <div className="recipe-card__face recipe-card__front">
              <button
                type="button"
                className="recipe-card__image-btn"
                onClick={handleFlip}
                aria-label={`Flip ${recipe.name} card to see ingredients`}
              >
                <img src={recipe.image} alt={recipe.name} loading="lazy" />
                <span className="recipe-card__meal-badge">{recipe.mealType}</span>
              </button>
              <div className="recipe-card__favorite">
                <FavoriteButton
                  active={isFavorite}
                  onClick={() => onToggleFavorite(recipe.id)}
                />
              </div>
              <div className="recipe-card__body">
                <h3>{recipe.name}</h3>
                <p className="recipe-card__cuisine">{recipe.cuisine}</p>
                <div className="recipe-card__meta">
                  <MetaItem icon={<ClockIcon />} label={`${recipe.prepTime} min`} />
                  <MetaItem icon={<ChefHatIcon />} label={recipe.difficulty} />
                </div>
              </div>
              <div className="recipe-card__actions">
                <button type="button" className="btn btn-secondary" onClick={handleFlip}>
                  Flip card
                </button>
                <button type="button" className="btn btn-primary" onClick={handleExpand}>
                  Expand
                </button>
              </div>
            </div>

            <div className="recipe-card__face recipe-card__back">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.slice(0, 6).map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {recipe.ingredients.length > 6 && (
                  <li className="recipe-card__more">
                    +{recipe.ingredients.length - 6} more
                  </li>
                )}
              </ul>
              <div className="recipe-card__leaf" aria-hidden="true">
                <LeafIcon />
              </div>
              <div className="recipe-card__actions">
                <button type="button" className="btn btn-secondary" onClick={handleFlip}>
                  Flip back
                </button>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
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
            <p>{recipe.description}</p>
            <div className="recipe-card__meta">
              <MetaItem icon={<BowlIcon />} label={recipe.mealType} />
              <MetaItem icon={<ClockIcon />} label={`${recipe.prepTime} min prep`} />
              <MetaItem icon={<ChefHatIcon />} label={recipe.difficulty} />
            </div>
            <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
              View Recipe
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
