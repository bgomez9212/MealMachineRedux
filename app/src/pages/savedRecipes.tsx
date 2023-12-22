import { SavedRecipeCard } from "@/components/SavedRecipeCard";
import { UserContext } from "@/context/context";
import axios from "axios";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

export function SavedRecipes() {
  const queryClient = useQueryClient();
  const user = useContext(UserContext);

  const {
    data: savedRecipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () =>
      axios
        .get(`http://127.0.0.1:8888/api/savedRecipes?user_id=${user}`)
        .then((res) => {
          return res.data;
        }),
  });

  function handleDeleteSavedRecipe(recipe_id: string) {
    axios
      .delete(
        `http://127.0.0.1:8888/api/savedRecipes?user_id=${user}&recipe_id=${recipe_id}`
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      });
  }

  if (isLoading) {
    return <h1>is loading...</h1>;
  }

  return (
    <>
      {savedRecipes.length ? (
        <>
          {savedRecipes.map(
            (recipe: { id: string; image: string; title: string }) => (
              <SavedRecipeCard
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                handleDeleteSavedRecipe={() =>
                  handleDeleteSavedRecipe(recipe.id)
                }
              ></SavedRecipeCard>
            )
          )}
        </>
      ) : (
        <div className="text-center mt-10">View Saved Recipes Here</div>
      )}
    </>
  );
}
