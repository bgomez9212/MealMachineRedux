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

export type Ingredients = {
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
  ingredientList: ingredientList[];
  analyzedInstructions: AnalyzedInstructions[];
};

export type ingredientList = {
  id: number;
  ingredientName: string;
  ingredientWithMeasurement: string;
};

export type AnalyzedInstructions = {
  name: string;
  steps: Steps[];
};

export type Steps = {
  number: number;
  step: string;
};

export type moveGroceryVariables = {
  user_id: string | undefined;
  food_name: string;
  grocery_id: number;
};

export type moveIngredientVariables = {
  user_id: string | undefined;
  food_name: string;
  ingredient_id: number;
};

export type Occurrences = {
  [key: string]: number;
};

export type CombinedObject = {
  id: string;
  value: number;
};
