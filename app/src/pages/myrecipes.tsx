import { RecipeCard } from "@/components/RecipeCard";

export function MyRecipes() {
  return (
    <div className="px-10 flex justify-between">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  );
}
