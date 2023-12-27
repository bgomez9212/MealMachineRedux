import { useParams } from "react-router-dom";
import data from "./randomRecipes.json";
import { Check, X } from "lucide-react";

export function RecipeDetailPage() {
  const { recipe_id } = useParams();
  const { recipes } = data;

  const recipe = recipes.filter(
    (recipe) => recipe.id === parseInt(recipe_id!)
  )[0];

  function renderCheckmark(condition: boolean) {
    return condition ? <Check color="#008a09" /> : <X color="#ff0000" />;
  }

  return (
    <div className="px-10 py-10">
      <header className="flex mb-10 justify-between border max-h-[300px] p-5 rounded-md">
        <div className="mr-10">
          <h1 className="text-3xl mb-2">{recipe.title}</h1>
          <h1 className="mb-2">{`Ready in ${recipe.readyInMinutes} minutes`}</h1>
          <div className="flex">
            <h1>{`Vegetarian? `}</h1>
            {renderCheckmark(recipe.vegetarian)}
          </div>
          <div className="flex">
            <h1>{`Vegan? `}</h1>
            {renderCheckmark(recipe.vegan)}
          </div>
          <div className="flex">
            <h1>{`Gluten Free? `}</h1>
            {renderCheckmark(recipe.glutenFree)}
          </div>
          <h1>{`Servings: ${recipe.servings}`}</h1>
          <h1 className="text-xs mt-6">{`Source: ${recipe.sourceUrl}`}</h1>
          {/* Number of ingredients missing */}
        </div>
        <div className="max-h-[320px] flex justify-end min-w-[400px]">
          <img
            className="rounded-lg"
            style={{ maxHeight: "100%" }}
            src={recipe.image}
          />
        </div>
      </header>
      <div className="flex justify-between">
        <div className="w-[47%]">
          <h1 className="text-xl">Ingredients</h1>
          <ul className="list-disc list-inside">
            {recipe.extendedIngredients
              .filter(
                (obj, index, self) =>
                  index === self.findIndex((o) => o.id === obj.id)
              )
              .map(({ original, id }) => (
                <li key={id}>{original}</li>
              ))}
          </ul>
        </div>
        <div className="w-[47%]">
          <h1 className="text-xl">Directions</h1>
          <ol className="list-decimal list-inside">
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
