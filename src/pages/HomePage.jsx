import recipes from '../data/recipes.json';
import useFavorites from '../hooks/useFavorites';
import useRecipeFilters from '../hooks/useRecipeFilters';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import FilterChips from '../components/FilterChips';
import RecipeGrid from '../components/RecipeGrid';

export default function HomePage() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    search,
    setSearch,
    filters,
    updateFilter,
    removeFilter,
    clearFilters,
    options,
    filteredRecipes,
    activeFilterCount,
  } = useRecipeFilters(recipes);

  return (
    <>
      <Hero recipeCount={recipes.length} />

      <section className="browse-section" aria-label="Browse recipes">
        <div className="browse-section__header">
          <h2>Browse the deck</h2>
          <p className="results-count" aria-live="polite">
            Showing {filteredRecipes.length} of {recipes.length} recipes
          </p>
        </div>

        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          filters={filters}
          options={options}
          onChange={updateFilter}
          onClear={clearFilters}
          activeCount={activeFilterCount}
        />
        <FilterChips
          search={search}
          filters={filters}
          onRemoveSearch={() => removeFilter('search')}
          onRemoveFilter={removeFilter}
        />
      </section>

      <RecipeGrid
        recipes={filteredRecipes}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}
