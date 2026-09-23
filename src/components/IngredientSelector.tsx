import React, { useState } from 'react';
import { Plus, X, Search, Check, Sparkles, RefreshCw, ChefHat } from 'lucide-react';
import { COMMON_PANTRY_CATEGORIES, PANTRY_PRESETS } from '../data/defaultPantry';

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onToggleIngredient: (id: string) => void;
  onAddCustomIngredient: (name: string) => void;
  onClearIngredients: () => void;
  onApplyPreset: (ingredients: string[]) => void;
  assumedStaplesEnabled: boolean;
  onToggleStaples: () => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  selectedIngredients,
  onToggleIngredient,
  onAddCustomIngredient,
  onClearIngredients,
  onApplyPreset,
  assumedStaplesEnabled,
  onToggleStaples,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchFilter, setSearchFilter] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onAddCustomIngredient(customInput.trim());
    setCustomInput('');
  };

  // Filter items by category & search
  const allCategoryItems = COMMON_PANTRY_CATEGORIES.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryName: c.name }))
  );

  const displayedItems = allCategoryItems.filter((item) => {
    const matchesCategory = activeCategory === 'todos' || item.categoryId === activeCategory;
    const matchesSearch =
      !searchFilter.trim() ||
      item.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            ¿Qué ingredientes tienes en tu cocina?
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Marca lo que tengas en la nevera o escribe cualquier otro ingrediente.
          </p>
        </div>

        {/* Counter and clear */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="text-xs font-medium text-stone-600 px-3 py-1.5 bg-stone-100 rounded-lg">
            <span className="font-semibold text-stone-900 tabular-nums">
              {selectedIngredients.length}
            </span>{' '}
            ingrediente{selectedIngredients.length === 1 ? '' : 's'} seleccionado{selectedIngredients.length === 1 ? '' : 's'}
          </div>
          {selectedIngredients.length > 0 && (
            <button
              onClick={onClearIngredients}
              className="text-xs font-medium text-stone-500 hover:text-stone-900 px-2.5 py-1.5 hover:bg-stone-100 rounded-lg transition-colors"
              title="Deseleccionar todos los ingredientes"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Selected ingredients bar */}
      {selectedIngredients.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Tu lista actual
          </span>
          <div className="flex flex-wrap gap-2 items-center">
            {selectedIngredients.map((ing) => {
              const pantryItem = allCategoryItems.find(
                (item) => item.id === ing || item.name.toLowerCase() === ing.toLowerCase()
              );
              const displayName = pantryItem ? pantryItem.name : ing;
              const displayIcon = pantryItem ? pantryItem.icon : '✨';

              return (
                <button
                  key={ing}
                  onClick={() => onToggleIngredient(ing)}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-lg text-xs font-medium transition-all shadow-2xs"
                  aria-label={`Eliminar ${displayName}`}
                >
                  <span aria-hidden="true">{displayIcon}</span>
                  <span>{displayName}</span>
                  <X className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-100 transition-colors ml-0.5" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input box to add custom ingredient */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <form onSubmit={handleAddSubmit} className="md:col-span-8 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Escribe otro ingrediente (ej. calabaza, nata, berenjena...)"
              className="w-full pl-3.5 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-colors"
            />
            {customInput && (
              <button
                type="button"
                onClick={() => setCustomInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-stone-50 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir</span>
          </button>
        </form>

        {/* Quick filter by name */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filtrar catálogo..."
            className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900 transition-colors"
          />
        </div>
      </div>

      {/* Preset starter packs */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          O prueba una selección rápida:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PANTRY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.ingredients)}
              className="text-left p-3 rounded-xl border border-stone-200 hover:border-stone-400 bg-stone-50/60 hover:bg-stone-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {preset.name}
                </p>
                <Plus className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
              </div>
              <p className="text-2xs text-stone-500 mt-1 line-clamp-1">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === 'todos'
                ? 'bg-stone-900 text-stone-50 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Todos ({allCategoryItems.length})
          </button>
          {COMMON_PANTRY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-stone-50 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {displayedItems.map((item) => {
            const isSelected = selectedIngredients.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onToggleIngredient(item.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-300 text-amber-950 shadow-2xs ring-1 ring-amber-400/40'
                    : 'bg-stone-50/50 border-stone-200/90 text-stone-700 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base select-none shrink-0" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </div>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ml-1 transition-colors ${
                    isSelected ? 'bg-amber-600 text-white' : 'border border-stone-300 text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Assumed staples checkbox */}
      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-stone-700 select-none">
          <input
            type="checkbox"
            checked={assumedStaplesEnabled}
            onChange={onToggleStaples}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300"
          />
          <span>
            Asumir condimentos básicos disponibles (aceite, sal, pimienta, agua)
          </span>
        </label>
      </div>
    </section>
  );
};
