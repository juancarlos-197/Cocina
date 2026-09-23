import React from 'react';
import { X, Sun, Moon, Type, Volume2, VolumeX, Eye } from 'lucide-react';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isOpen,
  onClose,
  isHighContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
  soundEnabled,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-amber-700" />
            <h2 id="accessibility-title" className="text-lg font-serif font-bold text-stone-900">
              Opciones de Accesibilidad
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Cerrar panel de accesibilidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High contrast */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-stone-900">Alto Contraste</p>
            <p className="text-xs text-stone-500">Refuerza bordes y maximiza la legibilidad del texto.</p>
          </div>
          <button
            type="button"
            onClick={onToggleHighContrast}
            role="switch"
            aria-checked={isHighContrast}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isHighContrast
                ? 'bg-black text-white border-black ring-2 ring-black ring-offset-2'
                : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
            }`}
          >
            {isHighContrast ? 'Activado' : 'Desactivado'}
          </button>
        </div>

        {/* Font size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-stone-900">Tamaño del Texto</p>
            <Type className="w-4 h-4 text-stone-500" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onChangeFontSize('normal')}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                fontSize === 'normal'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Estándar
            </button>
            <button
              type="button"
              onClick={() => onChangeFontSize('large')}
              className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                fontSize === 'large'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Grande
            </button>
            <button
              type="button"
              onClick={() => onChangeFontSize('xlarge')}
              className={`py-2 px-3 text-base font-medium rounded-lg border transition-colors ${
                fontSize === 'xlarge'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              Muy grande
            </button>
          </div>
        </div>

        {/* Audio Alert Toggle */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-sm font-semibold text-stone-900">Avisos Sonoros del Temporizador</p>
            <p className="text-xs text-stone-500">Alarma sonora al completar los minutos de un paso.</p>
          </div>
          <button
            type="button"
            onClick={onToggleSound}
            role="switch"
            aria-checked={soundEnabled}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-stone-100 text-stone-500 border-stone-200'
            }`}
            aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        <div className="pt-3 border-t border-stone-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
