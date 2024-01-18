import { RecipeCard } from "@/components/RecipeCard";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/context";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { type HomeRecipes, type SavedRecipe, type Groceries } from "@/types";
import ClipLoader from "react-spinners/ClipLoader";

export function Home({ groceries }: { groceries: Groceries[] }) {
  const { toast } = useToast();
  const user = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: recipes,
    isLoading: isLoadingRecipes,
    // error,
  } = useQuery<HomeRecipes[]>({
    queryKey: ["recipes"],
    queryFn: async () =>
      axios
        .get(import.meta.env.VITE_server_recipes, {
          params: {
            user_id: user,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const {
    data: savedRecipes,
    isLoading: isLoadingSavedRecipes,
    // error,
  } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () =>
      axios
        .get(import.meta.env.VITE_server_savedRecipes, {
          params: {
            user_id: user,
          },
        })
        .then((res) => {
          return res.data.map((recipe: SavedRecipe) => recipe.recipe_id);
        }),
  });

  function handleSaveClick(
    recipe_id: number,
    recipe_title: string,
    imageUrl: string
  ) {
    axios
      .post(import.meta.env.VITE_server_savedRecipes, {
        user_id: user,
        recipe_id: recipe_id,
        image: imageUrl,
        title: recipe_title,
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
        toast({
          title: "Recipe Saved!",
          description: `${recipe_title} added to your saved recipes!`,
        });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  function handleReadRecipe(recipe_id: number) {
    navigate(`/details/${recipe_id}`);
  }

  function handleDeleteSavedRecipe(recipe_id: number, recipe_title: string) {
    axios
      .delete(import.meta.env.VITE_server_savedRecipes, {
        data: {
          user_id: user,
          recipe_id: recipe_id,
        },
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
        toast({
          title: "Recipe Removed",
          description: `${recipe_title} removed from your saved recipes!`,
        });
      });
  }

  if (isLoadingRecipes || isLoadingSavedRecipes) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  if (!recipes?.length) {
    return (
      <div className="text-center mt-10">
        <h1>How To Get Started</h1>
        <p>
          To get your recommended recipes, add some ingredients to your kitchen.
          Navigate to the Ingredients page and add whatever you have available
          to cook with. After submitting your ingredients, come back to this
          page by hitting the Recipes link, and you will have a list of recipes
          that are either ready to cook, or missing a minimal amount of
          ingredients.
        </p>
      </div>
    );
  }

  return (
    <div className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20">
      {recipes?.map(
        ({ title, image, id, missedIngredientCount, missedIngredients }) => (
          <RecipeCard
            key={title}
            title={title}
            image={image}
            handleSaveClick={() => handleSaveClick(id, title, image)}
            handleReadRecipe={() => handleReadRecipe(id)}
            handleDeleteSavedRecipe={() => handleDeleteSavedRecipe(id, title)}
            isSaved={savedRecipes?.includes(id)}
            missedIngredientCount={missedIngredientCount}
            missedIngredients={missedIngredients}
            groceries={groceries}
          />
        )
      )}
    </div>
  );
}
