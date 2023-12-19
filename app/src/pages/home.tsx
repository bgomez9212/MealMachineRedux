import { RecipeCard } from "@/components/RecipeCard";
import data from "./randomRecipes.json";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/context";

export function Home() {
  const user = useContext(UserContext);
  const recipes = data.recipes;
  function handleSaveClick(recipe_id: number) {
    const postUrl = `http://127.0.0.1:8888/api/savedRecipes?user_id=${user}&recipe_id=${recipe_id}`;
    axios
      .post(postUrl)
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.error("Error:", err);
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
        />
      ))}
    </div>
  );
}
