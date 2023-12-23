import { useParams } from "react-router-dom";
import data from "./randomRecipes.json";

export function RecipeDetailPage() {
  const { recipe_id } = useParams();
  const { recipes } = data;

  const recipe = recipes.filter(
    (recipe) => recipe.id === parseInt(recipe_id!)
  )[0];
  console.log(recipe);
  return (
    <div className="mx-10">
      <h1>{recipe.title}</h1>
      <h1>{`Ready in ${recipe.readyInMinutes} minutes`}</h1>
      <h1>Ingredients</h1>
      <ul className="list-disc pl-4">
        {recipe.extendedIngredients
          .filter(
            (obj, index, self) =>
              index === self.findIndex((o) => o.id === obj.id)
          )
          .map(({ original, id }) => (
            <li key={id}>{original}</li>
          ))}
      </ul>
      <h1>Directions</h1>
      <ol className="list-decimal pl-4">
        {recipe.analyzedInstructions[0].steps.map((step) => (
          <li key={step.number}>{step.step}</li>
        ))}
      </ol>
    </div>
  );
}
