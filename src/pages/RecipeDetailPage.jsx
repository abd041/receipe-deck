import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import recipes from '../data/recipes.json';
import useFavorites from '../hooks/useFavorites';
import FavoriteButton from '../components/FavoriteButton';
import './RecipeDetailPage.css';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState('ingredients');

  const recipe = useMemo(() => recipes.find((item) => item.id === id), [id]);

  if (!recipe) {
    return (
      <div className="empty-state">
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

          <p className="recipe-detail__meta">
            {recipe.cuisine} · {recipe.difficulty} · {recipe.prepTime} min prep ·{' '}
            {recipe.cookTime} min cook · Serves {recipe.servings} · {recipe.mealType}
          </p>

          <div className="recipe-detail__tabs recipe-detail__tabs--mobile" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'ingredients'}
              className={activeTab === 'ingredients' ? 'active' : ''}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'instructions'}
              className={activeTab === 'instructions' ? 'active' : ''}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
          </div>

          <div className="recipe-detail__columns">
            <section className="recipe-detail__column">
              <h2>Ingredients</h2>
              <ul className="recipe-detail__ingredients">
                {recipe.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="recipe-detail__column">
              <h2>Instructions</h2>
              <ol className="recipe-detail__instructions">
                {recipe.instructions.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          </div>

          <div className="recipe-detail__panel recipe-detail__panel--mobile">
            {activeTab === 'ingredients' ? (
              <ul className="recipe-detail__ingredients">
                {recipe.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <ol className="recipe-detail__instructions">
                {recipe.instructions.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
          </div>

          <button type="button" className="btn btn-primary recipe-detail__cta">
            Start Cooking
          </button>
        </div>
      </div>
    </article>
  );
}
