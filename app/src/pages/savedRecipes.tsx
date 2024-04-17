import { RecipeCard } from "@/components/RecipeCard";
import { useUserContext } from "@/context/context";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export function SavedRecipes() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const navigate = useNavigate();

  function handleReadRecipe(recipe_id: number) {
    navigate(`/details/${recipe_id}`);
  }

  const {
    data: savedRecipes,
    isLoading,
    isError,
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
          return res.data;
        }),
  });

  function handleDeleteSavedRecipe(recipe_id: number) {
    axios
      .delete(import.meta.env.VITE_server_savedRecipes, {
        data: {
          user_id: user,
          recipe_id: recipe_id,
        },
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items center pt-10">
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items center pt-10">
        An error has occured, please try again later.
      </div>
    );
  }

  return (
    <>
      {savedRecipes.length ? (
        <div
          data-testid="saved-recipes-component"
          className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20"
        >
          {savedRecipes.map(
            (recipe: { recipe_id: number; image: string; title: string }) => (
              <RecipeCard
                key={recipe.recipe_id}
                image={recipe.image}
                title={recipe.title}
                handleDeleteSavedRecipe={() =>
                  handleDeleteSavedRecipe(recipe.recipe_id)
                }
                handleReadRecipe={() => handleReadRecipe(recipe.recipe_id)}
                isSaved={true}
              ></RecipeCard>
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-10">View Saved Recipes Here</div>
      )}
    </>
  );
}
