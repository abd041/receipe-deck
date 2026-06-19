import RecipeCard from './RecipeCard';
import Reveal from './Reveal';
import './RecipeGrid.css';

export default function RecipeGrid({ recipes, isFavorite, onToggleFavorite }) {
  if (!recipes.length) {
    return (
      <Reveal>
        <div className="empty-state">
          <h2>No recipes found</h2>
          <p>Try adjusting your search or filters to discover more recipe cards.</p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => {
        const featured = (index + 1) % 4 === 0;
        const offset = index % 4 === 1;

        return (
          <Reveal
            key={recipe.id}
            delay={Math.min(index * 80, 480)}
            className={`recipe-grid__item ${featured ? 'recipe-grid__item--featured' : ''} ${
              offset ? 'recipe-grid__item--offset' : ''
            }`}
          >
            <RecipeCard
              recipe={recipe}
              isFavorite={isFavorite(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              featured={featured}
            />
          </Reveal>
        );
      })}
    </div>
  );
}
