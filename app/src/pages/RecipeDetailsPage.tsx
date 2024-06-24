import { useParams, Link, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { type Recipe, type Ingredients, type Groceries } from "@/types";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserContext } from "@/context/context";
import { addGrocery, getGroceries } from "@/hooks/groceries";
import { getIngredients } from "@/hooks/ingredients";
import { getRecipeDetails } from "@/hooks/recipes";

export function RecipeDetailPage() {
  const { recipe_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const {
    data: recipe,
    isFetching,
    error,
  } = useQuery<Recipe>({
    queryKey: ["recipeDetails"],
    queryFn: () => getRecipeDetails(recipe_id),
    refetchOnWindowFocus: false,
  });

  const { data: ingredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getIngredients(user),
  });

  const { data: groceries } = useQuery({
    queryKey: ["groceries"],
    queryFn: () => getGroceries(user),
    enabled: !!user,
  });

  const { mutateAsync: saveGroceryMutation } = useMutation({
    mutationFn: addGrocery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groceries"] }),
  });

  function renderButton(recipeIngredient: string) {
    const userIngredients = ingredients?.map(
      (ingredientObj: Ingredients) => ingredientObj.name
    );
    const userGroceries = groceries?.map(
      (groceryObj: Groceries) => groceryObj.name
    );

    const groceryBtn = userGroceries?.some((userGrocery: string) => {
      return recipeIngredient.includes(userGrocery.toLowerCase());
    });

    const ingredientBtn = userIngredients?.some((userIngredient: string) => {
      return recipeIngredient.includes(userIngredient.toLowerCase());
    });

    if (ingredientBtn) {
      return (
        <Button
          className="md:w-1/4"
          onClick={() => console.log(recipeIngredient)}
          variant="secondary"
        >
          In Ingredients
        </Button>
      );
    }

    if (groceryBtn) {
      return (
        <Button
          className="md:w-1/4"
          onClick={() => console.log(recipeIngredient)}
          variant="secondary"
        >
          In Groceries
        </Button>
      );
    }
    return (
      <Button
        data-testid={`recipe-detail-button-${recipeIngredient}`}
        className="md:w-1/4 text-wrap md:h-auto"
        onClick={() => saveGroceryMutation({ grocery: recipeIngredient, user })}
      >
        Add to groceries
      </Button>
    );
  }

  function renderCheckmark(condition: boolean | undefined) {
    if (condition === undefined) {
      return "";
    }
    return condition ? (
      <Check color="#008a09" />
    ) : (
      <X data-testid="x-mark" color="#ff0000" />
    );
  }

  function handleBackClick() {
    queryClient.setQueryData(["recipeDetails"], undefined);
    navigate(-1);
  }

  if (isFetching) {
    return (
      <div
        data-testid="recipe-details-loader"
        className="w-full flex items-center justify-center mt-20"
      >
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  if (error) {
    <div className="w-full flex items-center justify-center mt-20">
      There seems to be an error. Try again later.
    </div>;
  }

  return (
    <div data-testid="recipes-details-component" className="px-10 py-10">
      <Button
        data-testid="back-button"
        className="mb-5"
        variant={"outline"}
        onClick={handleBackClick}
      >
        {"<"}
      </Button>
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
            {recipe?.ingredientList?.map(
              ({ ingredientWithMeasurement, id, ingredientName }) => (
                <li
                  className="mb-5 mr-10 flex md:flex-row md:items-center md:justify-between flex-col"
                  key={id}
                >
                  {ingredientWithMeasurement}
                  {renderButton(ingredientName.toLowerCase())}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="md:w-[47%] mb-10">
          <h1 className="text-3xl mb-4 underline underline-offset-8">
            Directions
          </h1>
          <ol className="list-decimal list-inside">
            {recipe?.analyzedInstructions[0]?.steps?.map((step) => (
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
