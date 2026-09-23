import React from 'react';
import { ChefHat, Bookmark, Sparkles, Eye, RotateCcw } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenAiChef: () => void;
  onOpenAccessibility: () => void;
  activeTab: 'recipes' | 'pantry' | 'favorites';
  setActiveTab: (tab: 'recipes' | 'pantry' | 'favorites') => void;
  onResetPantry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenAiChef,
  onOpenAccessibility,
  activeTab,
  setActiveTab,
  onResetPantry,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('recipes')}
          className="text-left group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-md py-1"
          aria-label="Ir a inicio de Alacena"
        >
          <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-50 flex items-center justify-center font-serif text-lg font-bold shadow-xs">
            A
          </span>
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
            Alacena
          </span>
        </button>

        {/* Zone 2: 3-4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`transition-colors py-1 relative ${
              activeTab === 'recipes'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            Recetas disponibles
          </button>
          <button
            onClick={() => setActiveTab('pantry')}
            className={`transition-colors py-1 relative ${
              activeTab === 'pantry'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            Seleccionar ingredientes
          </button>
          <button
            onClick={onOpenFavorites}
            className={`transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-900'
                : 'hover:text-stone-900'
            }`}
          >
            <span>Favoritos</span>
            {favoriteCount > 0 && (
              <span className="text-xs font-mono font-medium bg-amber-100 text-amber-900 rounded-full px-1.5 py-0.2">
                {favoriteCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Accessibility settings */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors border border-transparent hover:border-stone-200"
            title="Opciones de accesibilidad (contraste y texto)"
            aria-label="Abrir panel de accesibilidad y tamaño de texto"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Favorites mobile button */}
          <button
            onClick={onOpenFavorites}
            className="md:hidden relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label={`Ver ${favoriteCount} recetas favoritas`}
          >
            <Bookmark className="w-4 h-4" />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-600" />
            )}
          </button>

          {/* AI Chef button */}
          <button
            onClick={onOpenAiChef}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-stone-900 bg-amber-200/90 hover:bg-amber-300 border border-amber-300/60 rounded-lg shadow-2xs transition-all whitespace-nowrap active:scale-98"
            aria-label="Crear receta personalizada con Inteligencia Artificial"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Chef IA</span>
          </button>
        </div>
      </div>
    </header>
  );
};
