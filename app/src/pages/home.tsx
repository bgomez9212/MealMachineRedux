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
  // get saved recipes here, create an array of recipe ids,
  // then set a prop on recipe card that will be a boolean and will
  // render the appropriate button style? then change handleSave to
  // refetch the savedRecipes ?
  // I want the button to be conditionally rendered based on if the
  // recipe is saved or not

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

  return (
    <div className="px-10 flex flex-wrap justify-between">
      {recipes.map(({ title, image, id }) => (
        <RecipeCard
          key={title}
          title={title}
          image={image}
          handleSaveClick={() => handleSaveClick(id)}
          handleReadRecipe={() => handleReadRecipe(id)}
          isSaved={savedRecipes?.includes(id)}
        />
      ))}
    </div>
  );
}
