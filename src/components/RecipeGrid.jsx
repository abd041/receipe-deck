import RecipeCard from './RecipeCard';
import './RecipeGrid.css';

export default function RecipeGrid({ recipes, isFavorite, onToggleFavorite }) {
  if (!recipes.length) {
    return (
      <div className="empty-state">
        <h2>No recipes found</h2>
        <p>Try adjusting your search or filters to discover more recipe cards.</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={isFavorite(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
