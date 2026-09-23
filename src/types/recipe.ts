export type DifficultyLevel = 'Muy fácil' | 'Fácil' | 'Media';

export interface IngredientAmount {
  name: string;
  amount: string;
  isOptional?: boolean;
  substitute?: string;
  category?: 'proteína' | 'verdura' | 'lácteo' | 'cereal' | 'despensa' | 'especia' | 'otro';
}

export interface CookingStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  difficulty: DifficultyLevel;
  requiredIngredients: string[];
  ingredientsWithAmounts: IngredientAmount[];
  steps: CookingStep[];
  chefTip: string;
  nutrition: NutritionInfo;
  tags: string[];
  utensils?: string[];
  isAiGenerated?: boolean;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchScore: number; // 0 to 100
  matchingIngredients: string[];
  missingIngredients: string[];
  canCookNow: boolean; // missing items are only basic pantry staples or none
}

export interface FilterState {
  maxTime: number; // 0 means any
  difficulty: string; // 'all' | 'Muy fácil' | 'Fácil' | 'Media'
  diet: string; // 'all' | 'vegetariana' | 'sin-gluten' | 'rapida'
  searchQuery: string;
  onlyCanCookNow: boolean;
}
