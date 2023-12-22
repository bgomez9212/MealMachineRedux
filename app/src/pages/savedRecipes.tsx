import { RecipeCard } from "@/components/RecipeCard";
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

  if (isLoading) {
    return <h1>is loading...</h1>;
  }

  console.log(savedRecipes);

  return (
    <>
      {savedRecipes.length ? (
        <>
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              title={recipe.title}
            ></RecipeCard>
          ))}
        </>
      ) : (
        <h1>View Saved Recipes Here</h1>
      )}
    </>
  );
}
