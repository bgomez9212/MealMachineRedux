import { RecipeCard } from "@/components/RecipeCard";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/context";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";

type MissingIngredients = {
  name: string;
  id: number;
};

type HomeRecipes = {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
  missedIngredients: MissingIngredients[];
};

type SavedRecipe = {
  id: number;
  recipe_id: number;
  title: string;
  image: string;
};

type Groceries = {
  id: number;
  name: string;
  date_added: string;
  gro_user_id: string;
};

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
        .get(`http://127.0.0.1:8888/api/recipes?user_id=${user}`)
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
        .get(`http://127.0.0.1:8888/api/savedRecipes?user_id=${user}`)
        .then((res) => {
          return res.data.map((recipe: SavedRecipe) => recipe.recipe_id);
        }),
  });

  function handleSaveClick(
    recipe_id: number,
    recipe_title: string,
    imageUrl: string
  ) {
    const postUrl = "http://127.0.0.1:8888/api/savedRecipes";
    axios
      .post(postUrl, {
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
      .delete(
        `http://127.0.0.1:8888/api/savedRecipes?user_id=${user}&recipe_id=${recipe_id}`
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
        toast({
          title: "Recipe Removed",
          description: `${recipe_title} removed from your saved recipes!`,
        });
      });
  }

  if (isLoadingRecipes || isLoadingSavedRecipes) {
    return <div>isLoading...</div>;
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
