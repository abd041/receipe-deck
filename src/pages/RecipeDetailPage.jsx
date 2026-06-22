import { useId, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import recipes from '../data/recipes.json';
import useFavorites from '../contexts/FavoritesContext';
import useMediaQuery from '../hooks/useMediaQuery';
import DocumentTitle from '../components/DocumentTitle';
import FavoriteButton from '../components/FavoriteButton';
import './RecipeDetailPage.css';

const FACT_FIELDS = [
  { key: 'cuisine', label: 'Cuisine' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'prepTime', label: 'Preparation time', format: (v) => `${v} min` },
  { key: 'cookTime', label: 'Cooking time', format: (v) => `${v} min` },
  { key: 'servings', label: 'Serving size', format: (v) => `Serves ${v}` },
  { key: 'mealType', label: 'Meal type' },
];

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('ingredients');
  const isMobileLayout = useMediaQuery('(max-width: 900px)');
  const instructionsRef = useRef(null);
  const tabListId = useId();
  const ingredientsPanelId = `${tabListId}-ingredients-panel`;
  const instructionsPanelId = `${tabListId}-instructions-panel`;
  const ingredientsTabId = `${tabListId}-ingredients-tab`;
  const instructionsTabId = `${tabListId}-instructions-tab`;

  const recipe = useMemo(() => recipes.find((item) => item.id === id), [id]);

  const handleStartCooking = () => {
    setActiveTab('instructions');
    requestAnimationFrame(() => {
      instructionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  if (!recipe) {
    return (
      <div className="empty-state">
        <DocumentTitle title="Recipe Not Found" />
        <h2>Recipe not found</h2>
        <p>The recipe card you are looking for is not in the deck.</p>
        <Link to="/" className="btn btn-primary">
          Back to browse
        </Link>
      </div>
    );
  }

  return (
    <article className="recipe-detail">
      <DocumentTitle title={recipe.name} />
      <Link to="/" className="recipe-detail__back">
        ← Back to recipe box
      </Link>

      <div className="recipe-detail__layout">
        <div className="recipe-detail__image">
          <img src={recipe.image} alt={recipe.name} />
        </div>

        <div className="recipe-detail__content">
          <div className="recipe-detail__header">
            <div>
              <p className="recipe-detail__cuisine">{recipe.cuisine}</p>
              <h1>{recipe.name}</h1>
            </div>
            <FavoriteButton
              active={isFavorite(recipe.id)}
              onClick={() => toggleFavorite(recipe.id)}
              label={
                isFavorite(recipe.id)
                  ? `Remove ${recipe.name} from favorites`
                  : `Save ${recipe.name} to favorites`
              }
            />
          </div>

          <p className="recipe-detail__description">{recipe.description}</p>

          <dl className="recipe-detail__facts">
            {FACT_FIELDS.map(({ key, label, format }) => (
              <div key={key} className="recipe-detail__fact">
                <dt>{label}</dt>
                <dd>{format ? format(recipe[key]) : recipe[key]}</dd>
              </div>
            ))}
          </dl>

          <div
            className="recipe-detail__tabs recipe-detail__tabs--mobile"
            role="tablist"
            aria-label="Recipe details"
          >
            <button
              type="button"
              role="tab"
              id={ingredientsTabId}
              aria-selected={activeTab === 'ingredients'}
              aria-controls={ingredientsPanelId}
              className={activeTab === 'ingredients' ? 'active' : ''}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              type="button"
              role="tab"
              id={instructionsTabId}
              aria-selected={activeTab === 'instructions'}
              aria-controls={instructionsPanelId}
              className={activeTab === 'instructions' ? 'active' : ''}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
          </div>

          <div className="recipe-detail__columns" aria-hidden={isMobileLayout}>
            <section className="recipe-detail__column" aria-labelledby={`${tabListId}-ingredients-heading`}>
              <h2 id={`${tabListId}-ingredients-heading`}>Ingredients</h2>
              <ul className="recipe-detail__ingredients">
                {recipe.ingredients.map((item, index) => (
                  <li key={`${recipe.id}-ingredient-${index}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section
              ref={instructionsRef}
              className="recipe-detail__column"
              aria-labelledby={`${tabListId}-instructions-heading`}
            >
              <h2 id={`${tabListId}-instructions-heading`}>Instructions</h2>
              <ol className="recipe-detail__instructions">
                {recipe.instructions.map((step, index) => (
                  <li key={`${recipe.id}-step-${index}`}>{step}</li>
                ))}
              </ol>
            </section>
          </div>

          <div
            className="recipe-detail__panel recipe-detail__panel--mobile"
            aria-hidden={!isMobileLayout}
          >
            {activeTab === 'ingredients' ? (
              <div
                role="tabpanel"
                id={ingredientsPanelId}
                aria-labelledby={ingredientsTabId}
              >
                <ul className="recipe-detail__ingredients">
                  {recipe.ingredients.map((item, index) => (
                    <li key={`${recipe.id}-mobile-ingredient-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                ref={instructionsRef}
                role="tabpanel"
                id={instructionsPanelId}
                aria-labelledby={instructionsTabId}
              >
                <ol className="recipe-detail__instructions">
                  {recipe.instructions.map((step, index) => (
                    <li key={`${recipe.id}-mobile-step-${index}`}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <button type="button" className="btn btn-primary recipe-detail__cta" onClick={handleStartCooking}>
            Start Cooking
          </button>
        </div>
      </div>
    </article>
  );
}
