import recipes from '../data/recipes.json';
import useFavorites from '../hooks/useFavorites';
import useRecipeFilters from '../hooks/useRecipeFilters';
import Hero from '../components/Hero';
import FeaturedRecipe from '../components/FeaturedRecipe';
import HowItWorks from '../components/HowItWorks';
import SectionDivider from '../components/SectionDivider';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import FilterChips from '../components/FilterChips';
import RecipeGrid from '../components/RecipeGrid';
import Reveal from '../components/Reveal';
import './HomePage.css';

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
    <div className="home-page">
      <Hero recipeCount={recipes.length} />

      <div className="home-page__flow">
        <FeaturedRecipe />
        <HowItWorks />
        <SectionDivider />

        <section id="browse" className="browse-section home-page__browse" aria-label="Browse recipes">
          <Reveal>
            <div className="browse-section__panel">
              <div className="browse-section__header">
                <div>
                  <span className="browse-section__eyebrow">The collection</span>
                  <h2>
                    Find your next
                    <br />
                    favorite card
                  </h2>
                </div>
                <p className="results-count" aria-live="polite">
                  {filteredRecipes.length} of {recipes.length}
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
            </div>
          </Reveal>
        </section>

        <div className="home-page__grid-wrap">
          <RecipeGrid
            recipes={filteredRecipes}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}
