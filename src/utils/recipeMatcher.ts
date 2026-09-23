import { Recipe, RecipeMatchResult } from '../types/recipe';

// Common staples usually available or easy to substitute
export const DEFAULT_PANTRY_STAPLES = new Set([
  'sal',
  'aceite-oliva',
  'aceite',
  'agua',
  'pimienta',
  'vinagre',
  'oregano',
  'pimenton',
]);

// Normalize ingredient strings for matching
export function normalizeIngredient(term: string): string {
  return term
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9]/g, ' ')
    .trim();
}

// Synonyms and aliases
const INGREDIENT_ALIASES: Record<string, string[]> = {
  patatas: ['patata', 'papa', 'papas', 'patatas'],
  huevos: ['huevo', 'huevos', 'blanquillo', 'blanquillos'],
  cebolla: ['cebolla', 'cebollas', 'cebolleta', 'cebollin'],
  ajo: ['ajo', 'ajos', 'diente de ajo', 'dientes de ajo'],
  tomate: ['tomate', 'tomates', 'jitomate', 'jitomates', 'tomate frito', 'tomate triturado', 'tomates cherry'],
  zanahoria: ['zanahoria', 'zanahorias'],
  calabacin: ['calabacin', 'calabacines', 'zucchini', 'zapallito'],
  espinacas: ['espinaca', 'espinacas'],
  champinones: ['champinon', 'champinones', 'setas', 'hongos'],
  limon: ['limon', 'limones'],
  queso: ['queso', 'quesos', 'mozzarella', 'parmesano', 'cheddar', 'gouda', 'feta'],
  leche: ['leche', 'bebida vegetal'],
  atun: ['atun', 'atun en lata', 'bonito'],
  pollo: ['pollo', 'pechuga de pollo', 'pechuga', 'muslo'],
  jamon: ['jamon', 'jamon serrano', 'jamon york', 'jamon cocido', 'bacon', 'panceta'],
  pasta: ['pasta', 'espagueti', 'espaguetis', 'macarron', 'macarrones', 'fideos', 'tallarines'],
  arroz: ['arroz', 'arroz blanco'],
  garbanzos: ['garbanzo', 'garbanzos'],
  lentejas: ['lenteja', 'lentejas'],
  pan: ['pan', 'pan de molde', 'tostada', 'tostadas'],
  'tortillas-trigo': ['tortillas de trigo', 'tortillas', 'fajitas', 'tortilla de maiz', 'burritos'],
  'aceite-oliva': ['aceite', 'aceite de oliva', 'aceite de girasol', 'aceite vegetal'],
  sal: ['sal', 'sal fina', 'sal gruesa'],
  pimienta: ['pimienta', 'pimienta negra'],
  oregano: ['oregano'],
  pimenton: ['pimenton', 'paprika'],
  mantequilla: ['mantequilla', 'margarina'],
  avena: ['avena', 'copos de avena'],
  yogur: ['yogur', 'yogurt', 'yogur natural', 'yogur griego'],
};

// Check if user has an ingredient
function isIngredientMatched(requiredKey: string, availableIngredients: string[]): boolean {
  const normRequired = normalizeIngredient(requiredKey);
  const aliases = INGREDIENT_ALIASES[requiredKey] || [requiredKey];

  return availableIngredients.some((avail) => {
    const normAvail = normalizeIngredient(avail);
    if (normAvail === normRequired) return true;
    if (aliases.some((a) => normalizeIngredient(a) === normAvail || normAvail.includes(normalizeIngredient(a)) || normalizeIngredient(a).includes(normAvail))) {
      return true;
    }
    return false;
  });
}

// Calculate match results for a list of recipes
export function matchRecipes(
  recipes: Recipe[],
  availableIngredients: string[],
  assumedStaples: string[] = []
): RecipeMatchResult[] {
  const fullAvailable = Array.from(new Set([...availableIngredients, ...assumedStaples]));

  const results: RecipeMatchResult[] = recipes.map((recipe) => {
    const required = recipe.requiredIngredients;
    if (required.length === 0) {
      return {
        recipe,
        matchScore: 100,
        matchingIngredients: [],
        missingIngredients: [],
        canCookNow: true,
      };
    }

    const matching: string[] = [];
    const missing: string[] = [];

    for (const req of required) {
      if (isIngredientMatched(req, fullAvailable)) {
        matching.push(req);
      } else {
        missing.push(req);
      }
    }

    // Match percentage based on primary ingredients
    const rawScore = Math.round((matching.length / required.length) * 100);

    // Can cook now if there are 0 missing items, OR missing items are basic pantry staples that can be skipped or are common
    const essentialMissing = missing.filter((item) => !DEFAULT_PANTRY_STAPLES.has(item));
    const canCookNow = essentialMissing.length === 0;

    return {
      recipe,
      matchScore: rawScore,
      matchingIngredients: matching,
      missingIngredients: missing,
      canCookNow,
    };
  });

  // Sort: highest score first, then canCookNow, then quickest time
  return results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    if (b.canCookNow !== a.canCookNow) {
      return b.canCookNow ? 1 : -1;
    }
    return a.recipe.totalTimeMinutes - b.recipe.totalTimeMinutes;
  });
}
