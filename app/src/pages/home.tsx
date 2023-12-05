import { RecipeCard } from "@/components/RecipeCard";
import data from "./randomRecipes.json";
export function Home() {
  const recipes = data.recipes;
  return (
    <div className="px-10 flex flex-wrap justify-between">
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} />
      ))}
    </div>
  );
}
