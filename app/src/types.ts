export type MissingIngredients = {
  name: string;
  id: number;
};

export type HomeRecipes = {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
  missedIngredients: MissingIngredients[];
};

export type SavedRecipe = {
  id: number;
  recipe_id: number;
  title: string;
  image: string;
};

export type Groceries = {
  id: number;
  name: string;
  date_added: string;
};

export type Recipe = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  servings: number;
  sourceUrl: string;
  extendedIngredients: ExtendedIngredients[];
  analyzedInstructions: AnalyzedInstructions[];
};

export type ExtendedIngredients = {
  id: number;
  original: string;
};

export type AnalyzedInstructions = {
  name: string;
  steps: Steps[];
};

export type Steps = {
  number: number;
  step: string;
};
