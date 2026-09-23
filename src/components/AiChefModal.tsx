import React, { useState } from 'react';
import { Sparkles, X, Loader2, ChefHat, Check, AlertCircle } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface AiChefModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableIngredients: string[];
  onRecipesGenerated: (recipes: Recipe[]) => void;
}

export const AiChefModal: React.FC<AiChefModalProps> = ({
  isOpen,
  onClose,
  availableIngredients,
  onRecipesGenerated,
}) => {
  const [maxTime, setMaxTime] = useState<number>(25);
  const [difficulty, setDifficulty] = useState<string>('Muy fácil');
  const [diet, setDiet] = useState<string>('Cualquiera');
  const [servings, setServings] = useState<number>(2);
  const [specialCraving, setSpecialCraving] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (availableIngredients.length === 0) {
      setErrorMessage('Por favor selecciona o añade al menos un ingrediente disponible.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: availableIngredients,
          maxTimeMinutes: maxTime,
          difficulty,
          diet: specialCraving ? `${diet} (Preferencia del usuario: ${specialCraving})` : diet,
          servings,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron generar recetas en este momento.');
      }

      if (data.recipes && Array.isArray(data.recipes) && data.recipes.length > 0) {
        const enriched: Recipe[] = data.recipes.map((r: any, idx: number) => ({
          ...r,
          id: r.id || `ai-${Date.now()}-${idx}`,
          requiredIngredients: r.matchingIngredients || availableIngredients,
          isAiGenerated: true,
          prepTimeMinutes: r.prepTimeMinutes || 5,
          cookTimeMinutes: r.cookTimeMinutes || 15,
          totalTimeMinutes: r.totalTimeMinutes || 20,
          servings: r.servings || servings,
          difficulty: r.difficulty || difficulty,
          nutrition: r.nutrition || {
            calories: 320,
            protein: '14g',
            carbs: '30g',
            fat: '12g',
          },
          steps: r.steps || [],
          ingredientsWithAmounts: r.ingredientsWithAmounts || [],
        }));

        onRecipesGenerated(enriched);
        onClose();
      } else {
        throw new Error('El chef no pudo componer una receta con esos datos.');
      }
    } catch (err: any) {
      console.error('Error with AI recipe generation:', err);
      setErrorMessage(
        err.message || 'Error al conectar con el Chef IA. Revisa tu conexión o usa las recetas curadas.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chef-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-7 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="ai-chef-title" className="text-lg font-serif font-bold text-stone-900">
                Chef IA Personalizado
              </h2>
              <p className="text-xs text-stone-500">
                Crea recetas a medida con Gemini para tus ingredientes exactos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 text-stone-400 hover:text-stone-700 disabled:opacity-30 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Cerrar ventana de Chef IA"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current ingredients summary */}
        <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
          <span className="text-2xs font-semibold text-stone-500 uppercase tracking-wider">
            Ingredientes que cocinarás ({availableIngredients.length}):
          </span>
          <p className="text-xs text-stone-800 font-medium line-clamp-2">
            {availableIngredients.length > 0
              ? availableIngredients.join(', ')
              : 'No has seleccionado ingredientes todavía. Te sugerimos marcar algunos antes.'}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Nota del Chef</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Max Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex justify-between">
              <span>Tiempo total máximo:</span>
              <span className="font-mono text-stone-900">{maxTime} minutos</span>
            </label>
            <input
              type="range"
              min="10"
              max="45"
              step="5"
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Dificultad</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:border-stone-900"
              >
                <option value="Muy fácil">Muy fácil (para novatos)</option>
                <option value="Fácil">Fácil (estándar)</option>
                <option value="Media">Media</option>
              </select>
            </div>

            {/* Servings */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Porciones</label>
              <select
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:border-stone-900"
              >
                <option value={1}>1 persona (individual)</option>
                <option value={2}>2 personas</option>
                <option value={4}>4 personas</option>
              </select>
            </div>
          </div>

          {/* Dieta / Estilo */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Preferencia dietética</label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white focus:border-stone-900"
            >
              <option value="Cualquiera">Cualquiera / Cocina tradicional casera</option>
              <option value="Vegetariana">Vegetariana (sin carne ni pescado)</option>
              <option value="Sin gluten">Sin gluten</option>
              <option value="Económica de aprovechamiento">Aprovechamiento total (cero desperdicio)</option>
            </select>
          </div>

          {/* Optional notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">
              ¿Algún deseo o detalle especial? (Opcional)
            </label>
            <input
              type="text"
              value={specialCraving}
              onChange={(e) => setSpecialCraving(e.target.value)}
              placeholder="ej. que sea crujiente, para cenar ligero, que use solo sartén..."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-stone-900"
            />
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || availableIngredients.length === 0}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed text-stone-50 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 active:scale-98"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>El Chef está pensando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Crear 3 recetas nuevas</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
