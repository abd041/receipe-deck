import { Link } from 'react-router-dom';
import recipes from '../data/recipes.json';
import useFavorites from '../contexts/FavoritesContext';
import DocumentTitle from '../components/DocumentTitle';
import RecipeGrid from '../components/RecipeGrid';

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <>
      <DocumentTitle title="Saved Favorites" />
      <header className="page-header">
        <h1>Saved favorites</h1>
        <p>Recipes you have saved to your local recipe box.</p>
      </header>

      {favoriteRecipes.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Tap the heart on any recipe card to save it here.</p>
          <Link to="/" className="btn btn-primary">
            Browse recipes
          </Link>
        </div>
      ) : (
        <RecipeGrid
          recipes={favoriteRecipes}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}
