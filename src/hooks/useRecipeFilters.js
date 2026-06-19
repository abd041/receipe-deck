import { useMemo, useState } from 'react';

const INITIAL_FILTERS = {
  cuisine: '',
  difficulty: '',
  mealType: '',
  maxPrepTime: '',
};

export function filterRecipes(recipes, { search, ...filters }) {
  const query = search.trim().toLowerCase();

  return recipes.filter((recipe) => {
    if (query && !recipe.name.toLowerCase().includes(query)) return false;
    if (filters.cuisine && recipe.cuisine !== filters.cuisine) return false;
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
    if (filters.mealType && recipe.mealType !== filters.mealType) return false;
    if (filters.maxPrepTime && recipe.prepTime > Number(filters.maxPrepTime)) return false;
    return true;
  });
}

export function getFilterOptions(recipes) {
  const unique = (key) => [...new Set(recipes.map((r) => r[key]))].sort();

  return {
    cuisines: unique('cuisine'),
    difficulties: unique('difficulty'),
    mealTypes: unique('mealType'),
    prepTimes: [...new Set(recipes.map((r) => r.prepTime))].sort((a, b) => a - b),
  };
}

export default function useRecipeFilters(recipes) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const options = useMemo(() => getFilterOptions(recipes), [recipes]);

  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, { search, ...filters }),
    [recipes, search, filters]
  );

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearch('');
    setFilters(INITIAL_FILTERS);
  };

  const removeFilter = (key) => {
    if (key === 'search') {
      setSearch('');
      return;
    }
    setFilters((prev) => ({ ...prev, [key]: '' }));
  };

  const activeFilterCount =
    Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  return {
    search,
    setSearch,
    filters,
    updateFilter,
    removeFilter,
    clearFilters,
    options,
    filteredRecipes,
    activeFilterCount,
  };
}
