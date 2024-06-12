import { RecipeCard } from "@/components/RecipeCard";
import { useUserContext } from "@/context/context";
import { getSavedRecipes, removeSavedRecipe } from "@/hooks/recipes";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
    queryFn: () => getSavedRecipes(user),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: removeSavedRecipeMutation } = useMutation({
    mutationFn: removeSavedRecipe,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["savedRecipes"] }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items center pt-10">
        <ClipLoader color="#8FAC5F" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        data-testid="saved-ingredients-error"
        className="flex justify-center items center pt-10"
      >
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
                  removeSavedRecipeMutation({
                    user,
                    id: recipe.recipe_id,
                    title: recipe.title,
                  })
                }
                handleReadRecipe={() => handleReadRecipe(recipe.recipe_id)}
                isSaved={true}
              ></RecipeCard>
            )
          )}
        </div>
      ) : (
        <div data-testid="no-recipes-message" className="text-center mt-10">
          View Saved Recipes Here
        </div>
      )}
    </>
  );
}
