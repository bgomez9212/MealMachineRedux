import { SavedRecipe } from "@/types";
import axios from "axios";

export async function getRecipes(user: string | undefined) {
  return axios
    .get(import.meta.env.VITE_server_recipes, {
      params: {
        user_id: user,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function getSavedRecipes(user: string | undefined) {
  return axios
    .get(import.meta.env.VITE_server_savedRecipes, {
      params: {
        user_id: user,
      },
    })
    .then((res) => {
      return res.data.map((recipe: SavedRecipe) => recipe.recipe_id);
    });
}

export async function getSearchResults({
  user,
  debouncedSearch,
}: {
  user: string | undefined;
  debouncedSearch: string;
}) {
  return axios
    .get(import.meta.env.VITE_server_searchRecipes, {
      params: {
        user_id: user,
        term: debouncedSearch,
      },
    })
    .then((res) => res.data.results);
}

export async function saveRecipe({
  user,
  id,
  image,
  title,
}: {
  user: string | undefined;
  id: number;
  title: string;
  image: string;
}) {
  return axios.post(import.meta.env.VITE_server_savedRecipes, {
    user_id: user,
    recipe_id: id,
    image: image,
    title: title,
  });
}

export async function removeSavedRecipe({
  user,
  id,
  title,
}: {
  user: string | undefined;
  id: number;
  title: string;
}) {
  return axios.delete(import.meta.env.VITE_server_savedRecipes, {
    data: {
      user_id: user,
      recipe_id: id,
    },
  });
}
