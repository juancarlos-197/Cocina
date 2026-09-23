import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { X, Bookmark, Trash2, ArrowRight, ShoppingCart, Check, Copy } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Recipe[];
  onRemoveFavorite: (id: string) => void;
  onSelectRecipe: (id: string) => void;
  availableIngredients: string[];
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectRecipe,
  availableIngredients,
}) => {
  const [copiedShoppingList, setCopiedShoppingList] = useState(false);

  if (!isOpen) return null;

  // Calculate missing items across all favorites
  const missingItems = Array.from(
    new Set(
      favorites.flatMap((recipe) =>
        recipe.requiredIngredients.filter(
          (req) => !availableIngredients.some((avail) => avail.toLowerCase() === req.toLowerCase())
        )
      )
    )
  );

  const handleCopyShoppingList = () => {
    if (missingItems.length === 0) return;
    const text = `Lista de compras para mis recetas:\n${missingItems
      .map((item) => `[ ] ${item}`)
      .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedShoppingList(true);
    setTimeout(() => setCopiedShoppingList(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-title"
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-2xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600 fill-current" />
            <h2 id="favorites-title" className="text-lg font-serif font-bold text-stone-900">
              Recetas Favoritas ({favorites.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            aria-label="Cerrar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {favorites.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-900">Aún no has guardado recetas</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Haz clic en el icono de marcador en cualquier receta para guardarla aquí y tenerla siempre a mano.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-3.5 rounded-2xl border border-stone-200/90 hover:border-stone-300 bg-stone-50/50 flex items-center justify-between gap-3 group transition-all"
                >
                  <div
                    onClick={() => {
                      onSelectRecipe(recipe.id);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer truncate"
                  >
                    <p className="text-xs text-stone-500">
                      {recipe.totalTimeMinutes} min · {recipe.difficulty}
                    </p>
                    <h4 className="text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                      {recipe.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onRemoveFavorite(recipe.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectRecipe(recipe.id);
                        onClose();
                      }}
                      className="p-1.5 text-stone-600 group-hover:text-stone-900"
                      title="Abrir receta"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Missing items shopping list helper */}
          {favorites.length > 0 && missingItems.length > 0 && (
            <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-amber-800" />
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    Lista de compra ({missingItems.length} faltantes)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyShoppingList}
                  className="text-2xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-amber-300 shadow-2xs"
                >
                  {copiedShoppingList ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar lista</span>
                    </>
                  )}
                </button>
              </div>
              <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
                {missingItems.slice(0, 8).map((item) => (
                  <li key={item} className="capitalize">
                    {item}
                  </li>
                ))}
                {missingItems.length > 8 && (
                  <li className="text-2xs text-amber-700 italic">
                    +{missingItems.length - 8} más...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-200 rounded-xl hover:bg-stone-100 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
