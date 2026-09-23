import React from 'react';
import { FilterState } from '../types/recipe';
import { Clock, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalMatches: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalMatches,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Total matches header */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-stone-900">
            {totalMatches} receta{totalMatches === 1 ? '' : 's'} encontrada{totalMatches === 1 ? '' : 's'}
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-stone-500">Ordenadas por mayor coincidencia</span>
        </div>

        {/* Can cook now toggle */}
        <button
          type="button"
          onClick={() =>
            onFilterChange({ ...filters, onlyCanCookNow: !filters.onlyCanCookNow })
          }
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
            filters.onlyCanCookNow
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-1 ring-emerald-300/50'
              : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
          }`}
        >
          <CheckCircle2
            className={`w-3.5 h-3.5 ${
              filters.onlyCanCookNow ? 'text-emerald-600' : 'text-stone-400'
            }`}
          />
          <span>Solo las que puedo cocinar ya (100% disponibles)</span>
        </button>
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
        {/* Max Time Filter */}
        <div className="space-y-1.5">
          <label className="text-2xs font-semibold text-stone-500 uppercase tracking-wider">
            Tiempo máximo
          </label>
          <div className="flex gap-1">
            {[
              { label: 'Todos', value: 0 },
              { label: '≤15 min', value: 15 },
              { label: '≤30 min', value: 30 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ ...filters, maxTime: option.value })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  filters.maxTime === option.value
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-1.5">
          <label className="text-2xs font-semibold text-stone-500 uppercase tracking-wider">
            Dificultad
          </label>
          <div className="flex gap-1">
            {[
              { label: 'Todas', value: 'all' },
              { label: 'Muy fácil', value: 'Muy fácil' },
              { label: 'Fácil', value: 'Fácil' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ ...filters, difficulty: option.value })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  filters.difficulty === option.value
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diet Filter */}
        <div className="space-y-1.5">
          <label className="text-2xs font-semibold text-stone-500 uppercase tracking-wider">
            Preferencia
          </label>
          <div className="flex gap-1">
            {[
              { label: 'Todas', value: 'all' },
              { label: 'Vegetariana', value: 'vegetariana' },
              { label: 'Sin gluten', value: 'sin-gluten' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ ...filters, diet: option.value })}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  filters.diet === option.value
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
