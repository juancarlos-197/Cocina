import React, { useState, useEffect, useMemo } from 'react';
import { CURATED_RECIPES } from './data/curatedRecipes';
import { DEFAULT_PANTRY_STAPLES, matchRecipes } from './utils/recipeMatcher';
import { FilterState, Recipe, RecipeMatchResult } from './types/recipe';
import { Header } from './components/Header';
import { IngredientSelector } from './components/IngredientSelector';
import { FilterBar } from './components/FilterBar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { AiChefModal } from './components/AiChefModal';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Sparkles, UtensilsCrossed, CheckCircle, ChefHat, RefreshCw } from 'lucide-react';

const LOCAL_STORAGE_FAVORITES = 'alacena_favorites_v1';
const LOCAL_STORAGE_INGREDIENTS = 'alacena_ingredients_v1';

export default function App() {
  // Recipes list (curated + AI generated)
  const [recipes, setRecipes] = useState<Recipe[]>(CURATED_RECIPES);

  // Selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_INGREDIENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Friendly initial selection
    return ['huevos', 'patatas', 'cebolla', 'tomate', 'ajo'];
  });

  // Assumed basic staples
  const [assumedStaplesEnabled, setAssumedStaplesEnabled] = useState<boolean>(true);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    maxTime: 0,
    difficulty: 'all',
    diet: 'all',
    searchQuery: '',
    onlyCanCookNow: false,
  });

  // Active view tab
  const [activeTab, setActiveTab] = useState<'recipes' | 'pantry' | 'favorites'>('recipes');

  // Active recipe modal
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return ['tortilla-patatas-clasica'];
  });

  // Modals state
  const [isAiChefOpen, setIsAiChefOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Accessibility state
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync ingredients to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INGREDIENTS, JSON.stringify(selectedIngredients));
    } catch (e) {}
  }, [selectedIngredients]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES, JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  // Ingredient toggle
  const handleToggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddCustomIngredient = (name: string) => {
    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return;
    if (!selectedIngredients.includes(trimmed)) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
    }
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
  };

  const handleApplyPreset = (presetIngredients: string[]) => {
    setSelectedIngredients(presetIngredients);
    setActiveTab('recipes');
  };

  const handleToggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  // When AI generates new recipes
  const handleRecipesGenerated = (newRecipes: Recipe[]) => {
    setRecipes((prev) => [...newRecipes, ...prev]);
    if (newRecipes.length > 0) {
      setActiveRecipeId(newRecipes[0].id);
    }
  };

  // Match calculations
  const matchResults: RecipeMatchResult[] = useMemo(() => {
    const staples = assumedStaplesEnabled ? Array.from(DEFAULT_PANTRY_STAPLES) : [];
    return matchRecipes(recipes, selectedIngredients, staples);
  }, [recipes, selectedIngredients, assumedStaplesEnabled]);

  // Apply search and filter criteria
  const filteredMatches = useMemo(() => {
    return matchResults.filter(({ recipe, canCookNow }) => {
      // Can cook now toggle
      if (filters.onlyCanCookNow && !canCookNow) {
        return false;
      }

      // Max time
      if (filters.maxTime > 0 && recipe.totalTimeMinutes > filters.maxTime) {
        return false;
      }

      // Difficulty
      if (filters.difficulty !== 'all' && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      // Diet
      if (filters.diet === 'vegetariana') {
        const isVeg = recipe.tags.some((t) => t.toLowerCase().includes('vegetariana'));
        if (!isVeg) return false;
      } else if (filters.diet === 'sin-gluten') {
        const isGlutenFree = recipe.tags.some((t) => t.toLowerCase().includes('sin gluten'));
        if (!isGlutenFree) return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesDesc = recipe.description.toLowerCase().includes(q);
        const matchesTags = recipe.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }

      return true;
    });
  }, [matchResults, filters]);

  // Active recipe for modal
  const activeRecipe = useMemo(() => {
    if (!activeRecipeId) return null;
    return recipes.find((r) => r.id === activeRecipeId) || null;
  }, [activeRecipeId, recipes]);

  // Favorite recipes list
  const favoriteRecipes = useMemo(() => {
    return recipes.filter((r) => favorites.includes(r.id));
  }, [recipes, favorites]);

  // Font size styling root class
  const fontSizeClass =
    fontSize === 'large' ? 'text-[17px]' : fontSize === 'xlarge' ? 'text-[19px]' : 'text-base';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${fontSizeClass} ${
        isHighContrast ? 'high-contrast' : ''
      }`}
    >
      {/* Top Header */}
      <Header
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAiChef={() => setIsAiChefOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetPantry={handleClearIngredients}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Editorial Hero Section (Zero-pill discipline, natural title-case, no fake badges) */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#F5F2EB] to-[#FAF8F5] border border-stone-200/80 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xs">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Cocina fácil con lo que tienes en tu despensa.
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-pretty">
              Indica qué ingredientes tienes disponibles y te mostraremos recetas sencillas, rápidas y
              deliciosas que puedes preparar ahora mismo, sin compras innecesarias ni desperdiciar comida.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('pantry');
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs active:scale-98"
              >
                Elegir mis ingredientes
              </button>
              <button
                onClick={() => setIsAiChefOpen(true)}
                className="px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-2 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Crear receta única con IA</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pantry Section (Always accessible) */}
        <IngredientSelector
          selectedIngredients={selectedIngredients}
          onToggleIngredient={handleToggleIngredient}
          onAddCustomIngredient={handleAddCustomIngredient}
          onClearIngredients={handleClearIngredients}
          onApplyPreset={handleApplyPreset}
          assumedStaplesEnabled={assumedStaplesEnabled}
          onToggleStaples={() => setAssumedStaplesEnabled(!assumedStaplesEnabled)}
        />

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          totalMatches={filteredMatches.length}
        />

        {/* Recipe Grid Section */}
        <section aria-labelledby="recipe-catalog-heading" className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2
              id="recipe-catalog-heading"
              className="text-xl sm:text-2xl font-serif font-bold text-stone-900"
            >
              Recetas sugeridas para ti
            </h2>
            <span className="text-xs text-stone-500">
              {filteredMatches.filter((m) => m.canCookNow).length} listas con tus ingredientes
            </span>
          </div>

          {filteredMatches.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-stone-200 p-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <ChefHat className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  No hay recetas que coincidan con estos filtros
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                  Prueba a desmarcar el filtro de 100% disponibles o selecciona más ingredientes en el selector superior.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() =>
                    setFilters({
                      maxTime: 0,
                      difficulty: 'all',
                      diet: 'all',
                      searchQuery: '',
                      onlyCanCookNow: false,
                    })
                  }
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                >
                  Restablecer filtros
                </button>
                <button
                  onClick={() => setIsAiChefOpen(true)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pedir receta a medida a la IA</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <RecipeCard
                  key={match.recipe.id}
                  matchResult={match}
                  isFavorite={favorites.includes(match.recipe.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectRecipe={(id) => setActiveRecipeId(id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Alacena. Recetas fáciles, cocina accesible y sin desperdicios.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAccessibilityOpen(true)}
              className="hover:text-stone-900 transition-colors"
            >
              Accesibilidad
            </button>
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="hover:text-stone-900 transition-colors"
            >
              Favoritos ({favorites.length})
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-stone-900 transition-colors"
            >
              Volver arriba ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipeId(null)}
        isFavorite={activeRecipe ? favorites.includes(activeRecipe.id) : false}
        onToggleFavorite={handleToggleFavorite}
        soundEnabled={soundEnabled}
      />

      {/* AI Chef Modal */}
      <AiChefModal
        isOpen={isAiChefOpen}
        onClose={() => setIsAiChefOpen(false)}
        availableIngredients={selectedIngredients}
        onRecipesGenerated={handleRecipesGenerated}
      />

      {/* Accessibility Toolbar Modal */}
      <AccessibilityToolbar
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteRecipes}
        onRemoveFavorite={handleToggleFavorite}
        onSelectRecipe={(id) => setActiveRecipeId(id)}
        availableIngredients={selectedIngredients}
      />
    </div>
  );
}
