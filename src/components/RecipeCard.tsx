import React, { useState } from 'react';
import { RecipeMatchResult } from '../types/recipe';
import { Clock, Users, Bookmark, ChefHat, ArrowRight, Utensils, Check } from 'lucide-react';

interface RecipeCardProps {
  matchResult: RecipeMatchResult;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onSelectRecipe: (recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  matchResult,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
}) => {
  const { recipe, matchScore, matchingIngredients, missingIngredients, canCookNow } =
    matchResult;
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-0.5">
      {/* Recipe image container (4:3 aspect ratio) with zero-broken-image fallback */}
      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
        {recipe.imageUrl && !imageError ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          /* Styled culinary fallback container */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/50 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white shadow-2xs flex items-center justify-center mb-2 border border-stone-200">
              <ChefHat className="w-6 h-6 text-amber-700" />
            </div>
            <p className="text-xs font-serif font-semibold text-stone-700 line-clamp-2">
              {recipe.title}
            </p>
          </div>
        )}

        {/* Top-right Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-xs ${
            isFavorite
              ? 'bg-amber-500 text-white shadow-amber-500/20'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:text-stone-950'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Bottom match indicator overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {canCookNow ? (
            <div className="px-2.5 py-1 rounded-lg bg-emerald-900/90 backdrop-blur-md text-emerald-50 text-2xs font-semibold tracking-wide flex items-center gap-1.5 shadow-xs">
              <Check className="w-3 h-3 stroke-3 text-emerald-400" />
              <span>Lista para cocinar (100%)</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-lg bg-stone-900/80 backdrop-blur-md text-stone-100 text-2xs font-medium tracking-wide shadow-xs">
              <span>{matchScore}% de ingredientes</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata line (Zero-Pill discipline: unboxed text with · separators) */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-medium text-stone-700">{recipe.totalTimeMinutes} min</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{recipe.servings} porciones</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Ingredients summary */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <div className="text-2xs text-stone-500">
            {matchingIngredients.length > 0 && (
              <p className="truncate">
                <span className="font-semibold text-stone-700">Tienes:</span>{' '}
                {matchingIngredients.join(', ')}
              </p>
            )}
            {missingIngredients.length > 0 && (
              <p className="truncate text-stone-500 mt-0.5">
                <span className="font-semibold text-amber-800">Falta:</span>{' '}
                {missingIngredients.join(', ')}
              </p>
            )}
          </div>

          {/* Primary View Action */}
          <button
            onClick={() => onSelectRecipe(recipe.id)}
            className="w-full mt-2 py-2 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 group-hover:bg-stone-900 group-hover:text-stone-50 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-98"
          >
            <span>Ver receta y cocinar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
