import { useParams, Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { useQuery } from "react-query";
import axios from "axios";

type Recipe = {
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

type ExtendedIngredients = {
  id: number;
  original: string;
};

type AnalyzedInstructions = {
  name: string;
  steps: Steps[];
};

type Steps = {
  number: number;
  step: string;
};

export function RecipeDetailPage() {
  const { recipe_id } = useParams();

  const {
    data: recipe,
    // isLoading,
    // error,
  } = useQuery<Recipe>({
    queryKey: ["recipeDetails"],
    queryFn: async () =>
      axios
        .get(`http://127.0.0.1:8888/api/recipeDetails?recipe_id=${recipe_id}`)
        .then((res) => {
          return res.data;
        }),
  });

  function renderCheckmark(condition: boolean | undefined) {
    if (condition === undefined) {
      return "";
    }
    return condition ? <Check color="#008a09" /> : <X color="#ff0000" />;
  }

  return (
    <div className="px-10 py-10">
      <header className="flex flex-col md:flex md:flex-row mb-10 justify-between border md:max-h-[300px] p-5 rounded-md">
        <div className="mr-10 flex flex-col justify-evenly w-full">
          <h1 className="text-3xl mb-2">{recipe?.title}</h1>
          <img src={recipe?.image} className="md:hidden mb-2" />
          <h1 className="mb-2">{`Ready in ${recipe?.readyInMinutes} minutes`}</h1>
          <div className="flex">
            <h1>{`Vegetarian? `}</h1>
            {renderCheckmark(recipe?.vegetarian)}
          </div>
          <div className="flex">
            <h1>{`Vegan? `}</h1>
            {renderCheckmark(recipe?.vegan)}
          </div>
          <div className="flex">
            <h1>{`Gluten Free? `}</h1>
            {renderCheckmark(recipe?.glutenFree)}
          </div>
          <h1 className="mb-2">{`Servings: ${recipe?.servings}`}</h1>
          {recipe?.sourceUrl ? (
            <Link
              to={recipe.sourceUrl}
              className="text-xs text-[#667b4d]"
            >{`Source: ${recipe?.sourceUrl}`}</Link>
          ) : (
            ""
          )}
          {/* Number of ingredients missing */}
        </div>
        <div className="max-h-[320px] hidden md:flex justify-end md:min-w-[400px]">
          <img
            className="rounded-lg"
            style={{ maxHeight: "100%" }}
            src={recipe?.image}
          />
        </div>
      </header>
      <div className="md:flex justify-between">
        <div className="md:w-[47%] mb-5 md:mb-0">
          <h1 className="text-3xl mb-4 underline underline-offset-8">
            Ingredients
          </h1>
          <ul className="list-disc list-inside">
            {recipe?.extendedIngredients
              .filter(
                (obj, index, self) =>
                  index === self.findIndex((o) => o.id === obj.id)
              )
              .map(({ original, id }) => (
                <li className="mb-2" key={id}>
                  {original}
                </li>
              ))}
          </ul>
        </div>
        <div className="md:w-[47%] mb-10">
          <h1 className="text-3xl mb-4 underline underline-offset-8">
            Directions
          </h1>
          <ol className="list-decimal list-inside">
            {recipe?.analyzedInstructions[0].steps.map((step) => (
              <li className="mb-2" key={step.number}>
                {step.step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
