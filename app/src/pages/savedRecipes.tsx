import { SavedRecipeCard } from "@/components/SavedRecipeCard";
import { UserContext } from "@/context/context";
import axios from "axios";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export function SavedRecipes() {
  const queryClient = useQueryClient();
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleReadRecipe(recipe_id: number) {
    navigate(`/details/${recipe_id}`);
  }

  const {
    data: savedRecipes,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () =>
      axios
        .get(`http://127.0.0.1:8888/api/savedRecipes?user_id=${user}`)
        .then((res) => {
          return res.data;
        }),
  });

  function handleDeleteSavedRecipe(recipe_id: number) {
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
        <div className="min-[630px]:grid min-[630px]:grid-cols-2 lg:grid-cols-3 px-10 gap-x-10 mb-20">
          {savedRecipes.map(
            (recipe: { id: number; image: string; title: string }) => (
              <SavedRecipeCard
                key={recipe.id}
                image={recipe.image}
                title={recipe.title}
                handleDeleteSavedRecipe={() =>
                  handleDeleteSavedRecipe(recipe.id)
                }
                handleReadRecipe={() => handleReadRecipe(recipe.id)}
              ></SavedRecipeCard>
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-10">View Saved Recipes Here</div>
      )}
    </>
  );
}
