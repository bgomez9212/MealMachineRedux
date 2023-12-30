import { RecipeCard } from "@/components/RecipeCard";
import data from "./randomRecipes.json";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/context";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

export function Home() {
  const user = useContext(UserContext);
  const recipes = data.recipes;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleSaveClick(recipe_id: number) {
    const postUrl = `http://127.0.0.1:8888/api/savedRecipes?user_id=${user}&recipe_id=${recipe_id}`;
    axios
      .post(postUrl)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  const {
    data: savedRecipes,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["savedRecipes"],
    queryFn: async () =>
      axios
        .get(`http://127.0.0.1:8888/api/savedRecipes?user_id=${user}`)
        .then((res) => {
          return res.data.map((recipe: { id: number }) => recipe.id);
        }),
  });

  function handleReadRecipe(recipe_id: number) {
    navigate(`/details/${recipe_id}`);
  }

  function handleDeleteSavedRecipe(recipe_id: number) {
    axios
      .delete(
        `http://127.0.0.1:8888/api/savedRecipes?user_id=${user}&recipe_id=${recipe_id}`
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
      });
  }

  return (
    <div className="px-10 flex flex-wrap justify-between">
      {recipes.map(({ title, image, id }) => (
        <RecipeCard
          key={title}
          title={title}
          image={image}
          handleSaveClick={() => handleSaveClick(id)}
          handleReadRecipe={() => handleReadRecipe(id)}
          handleDeleteSavedRecipe={() => handleDeleteSavedRecipe(id)}
          isSaved={savedRecipes?.includes(id)}
        />
      ))}
    </div>
  );
}
