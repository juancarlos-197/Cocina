import React, { useState, useEffect, useRef } from 'react';
import { Recipe } from '../types/recipe';
import {
  X,
  Clock,
  Users,
  Check,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Bookmark,
  Sparkles,
  Share2,
  AlertCircle,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  soundEnabled: boolean;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  isFavorite,
  onToggleFavorite,
  soundEnabled,
}) => {
  if (!recipe) return null;

  // Portion multiplier state
  const baseServings = recipe.servings || 2;
  const [servings, setServings] = useState<number>(baseServings);

  // Checked state for ingredients and steps
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Timer state
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [timerTotalSeconds, setTimerTotalSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Text to speech state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Copy feedback
  const [copied, setCopied] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Audio tone synthesizer for timer alarm
  const playTimerAlarm = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;

      // 3 pleasant bell beeps
      [0, 0.25, 0.5].forEach((offset) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now + offset); // A5
        gain.gain.setValueAtTime(0.3, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.2);
      });
    } catch (e) {
      console.warn('AudioContext not allowed or not supported:', e);
    }
  };

  // Timer tick effect
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setIsTimerRunning(false);
            playTimerAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  // Start timer from step duration
  const startStepTimer = (minutes: number) => {
    const totalSec = minutes * 60;
    setTimerTotalSeconds(totalSec);
    setTimerSecondsLeft(totalSec);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    if (timerSecondsLeft === 0 && timerTotalSeconds > 0) {
      setTimerSecondsLeft(timerTotalSeconds);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(!isTimerRunning);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(timerTotalSeconds);
  };

  // Speech Synthesis helper
  const speakCurrentStep = () => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentStep = recipe.steps[activeStepIndex];
    if (!currentStep) return;

    const textToSpeak = `Paso número ${currentStep.stepNumber}. ${currentStep.instruction}. ${
      currentStep.tip ? `Consejo: ${currentStep.tip}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech when closing or changing steps
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeStepIndex]);

  // Scale amount string according to servings
  const scaleAmount = (originalAmount: string): string => {
    const ratio = servings / baseServings;
    if (ratio === 1) return originalAmount;

    // Try to detect leading numbers
    return originalAmount.replace(/(\d+(?:[.,]\d+)?)/g, (match) => {
      const num = parseFloat(match.replace(',', '.'));
      if (isNaN(num)) return match;
      const scaled = Math.round(num * ratio * 10) / 10;
      return scaled.toString().replace('.', ',');
    });
  };

  // Copy recipe to clipboard
  const handleCopyRecipe = () => {
    const text = `${recipe.title} (${servings} porciones)\n\nIngredientes:\n${recipe.ingredientsWithAmounts
      .map((ing) => `- ${scaleAmount(ing.amount)} ${ing.name}`)
      .join('\n')}\n\nPasos:\n${recipe.steps
      .map((s) => `${s.stepNumber}. ${s.instruction}`)
      .join('\n')}\n\nTip del Chef: ${recipe.chefTip}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedStepsCount / recipe.steps.length) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Volver al catálogo"
            >
              <X className="w-5 h-5" />
            </button>
            <h2
              id="recipe-detail-title"
              className="text-base sm:text-lg font-serif font-bold text-stone-900 truncate"
            >
              {recipe.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyRecipe}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
              title="Copiar receta para compartir"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? '¡Copiada!' : 'Copiar'}</span>
            </button>
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-amber-500 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image (if available) */}
            {recipe.imageUrl && (
              <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 border border-stone-200 shadow-2xs">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={recipe.imageUrl ? 'md:col-span-7 space-y-4' : 'md:col-span-12 space-y-4'}>
              {/* Metadata with Zero-Pill discipline */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-stone-900">{recipe.totalTimeMinutes} minutos</span>
                <span aria-hidden="true">·</span>
                <span>Preparación: {recipe.prepTimeMinutes} min</span>
                <span aria-hidden="true">·</span>
                <span>Cocción: {recipe.cookTimeMinutes} min</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-stone-800">{recipe.difficulty}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {recipe.title}
              </h1>

              <p className="text-sm text-stone-600 leading-relaxed">
                {recipe.description}
              </p>

              {/* Nutrition summary */}
              {recipe.nutrition && (
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-stone-100">
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-center">
                    <p className="text-2xs text-stone-500 uppercase tracking-wider">Calorías</p>
                    <p className="text-xs font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                      {recipe.nutrition.calories} kcal
                    </p>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-center">
                    <p className="text-2xs text-stone-500 uppercase tracking-wider">Proteína</p>
                    <p className="text-xs font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                      {recipe.nutrition.protein}
                    </p>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-center">
                    <p className="text-2xs text-stone-500 uppercase tracking-wider">Carbos</p>
                    <p className="text-xs font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                      {recipe.nutrition.carbs}
                    </p>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-center">
                    <p className="text-2xs text-stone-500 uppercase tracking-wider">Grasas</p>
                    <p className="text-xs font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                      {recipe.nutrition.fat}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Kitchen Timer Banner (Sticky / Accessible) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center shrink-0 border border-stone-700">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-300">Temporizador de Cocina</p>
                <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wider tabular-nums">
                  {formatTime(timerSecondsLeft)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                type="button"
                onClick={toggleTimer}
                disabled={timerTotalSeconds === 0}
                className="flex-1 sm:flex-none px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-98"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pausar' : 'Iniciar'}</span>
              </button>
              <button
                type="button"
                onClick={resetTimer}
                disabled={timerTotalSeconds === 0}
                className="p-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 rounded-xl text-xs transition-colors"
                title="Reiniciar temporizador"
                aria-label="Reiniciar temporizador"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-stone-800 text-2xs text-stone-400">
                <span>Pulsa en los tiempos de cada paso para cargarlo</span>
              </div>
            </div>
          </div>

          {/* Hands-Free Voice Assistant Bar */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/90 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ChefHat className="w-5 h-5 text-amber-800 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Modo Manos Libres (Lectura en voz alta)
                </p>
                <p className="text-2xs text-amber-800">
                  Ideal para no ensuciar tu pantalla mientras cocinas.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={speakCurrentStep}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-amber-700 text-white animate-pulse'
                  : 'bg-white text-stone-900 border border-amber-300 shadow-2xs hover:bg-amber-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Detener voz' : 'Leer paso actual'}</span>
            </button>
          </div>

          {/* Ingredients Section with dynamic portion scaler */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Ingredientes necesarios
                </h3>
                <p className="text-xs text-stone-500">
                  Marca los ingredientes que ya tengas listos en tu mesa.
                </p>
              </div>

              {/* Servings stepper */}
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl p-1 self-start sm:self-center">
                <Users className="w-3.5 h-3.5 text-stone-500 ml-2" />
                <span className="text-xs font-medium text-stone-700 pr-1">Porciones:</span>
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setServings(num)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors font-mono tabular-nums ${
                      servings === num
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recipe.ingredientsWithAmounts.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                      isChecked
                        ? 'bg-stone-50/70 border-stone-200 text-stone-400 line-through'
                        : 'bg-white border-stone-200/90 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-stone-900">
                          {scaleAmount(ing.amount)}
                        </span>
                        {ing.isOptional && (
                          <span className="text-2xs font-normal text-stone-400">(Opcional)</span>
                        )}
                      </div>
                      <p className="text-stone-700">{ing.name}</p>
                      {ing.substitute && !isChecked && (
                        <p className="text-2xs text-amber-800 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>Sustituto: {ing.substitute}</span>
                        </p>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Cooking Steps with Progress Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Instrucciones paso a paso
                </h3>
                <p className="text-xs text-stone-500">
                  {completedStepsCount} de {recipe.steps.length} pasos completados ({progressPercent}%)
                </p>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 rounded-lg hover:bg-stone-100"
                  aria-label="Paso anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-medium text-stone-700 px-1">
                  {activeStepIndex + 1}/{recipe.steps.length}
                </span>
                <button
                  type="button"
                  disabled={activeStepIndex === recipe.steps.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.min(recipe.steps.length - 1, prev + 1))
                  }
                  className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 rounded-lg hover:bg-stone-100"
                  aria-label="Paso siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Steps list */}
            <div className="space-y-3">
              {recipe.steps.map((step, idx) => {
                const isStepCompleted = !!completedSteps[idx];
                const isActive = activeStepIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300/40 shadow-xs'
                        : isStepCompleted
                        ? 'bg-stone-50/60 border-stone-200 opacity-75'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Step Number Circle / Completed Check */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
                        }}
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                          isStepCompleted
                            ? 'bg-emerald-600 text-white'
                            : isActive
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                        aria-label={`Marcar paso ${step.stepNumber} como ${
                          isStepCompleted ? 'pendiente' : 'completado'
                        }`}
                      >
                        {isStepCompleted ? <Check className="w-4 h-4 stroke-3" /> : step.stepNumber}
                      </button>

                      <div className="flex-1 space-y-2">
                        <p
                          className={`text-sm sm:text-base leading-relaxed ${
                            isStepCompleted
                              ? 'line-through text-stone-400'
                              : 'text-stone-900 font-medium'
                          }`}
                        >
                          {step.instruction}
                        </p>

                        {/* Tip for this step */}
                        {step.tip && (
                          <p className="text-xs text-amber-900 bg-amber-100/60 rounded-xl p-2.5 border border-amber-200/50">
                            💡 <span className="font-semibold">Consejo:</span> {step.tip}
                          </p>
                        )}

                        {/* Duration timer trigger button */}
                        {step.durationMinutes && step.durationMinutes > 0 && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                startStepTimer(step.durationMinutes!);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition-colors"
                            >
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>
                                Iniciar {step.durationMinutes} min de este paso
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chef's Secret Tip */}
          {recipe.chefTip && (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>El Secreto del Chef</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {recipe.chefTip}
              </p>
            </div>
          )}

          {/* Utensils recommended */}
          {recipe.utensils && recipe.utensils.length > 0 && (
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-100">
              <span className="font-semibold text-stone-700">Utensilios recomendados:</span>{' '}
              {recipe.utensils.join(', ')}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="sticky bottom-0 bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            {recipe.isAiGenerated ? 'Receta creada por Chef IA' : 'Receta tradicional probada'}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors active:scale-98"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
