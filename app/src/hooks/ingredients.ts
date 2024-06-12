import { moveIngredientVariables } from "@/types";
import axios from "axios";
const regex = new RegExp("^[a-zA-Z]+.*$");

export async function getIngredients(user: string | undefined) {
  return axios
    .get(import.meta.env.VITE_server_ingredients, {
      params: {
        user_id: user,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function removeIngredient(ingredient_id: number) {
  await axios.delete(import.meta.env.VITE_server_ingredients, {
    data: {
      ingredient_id: ingredient_id,
    },
  });
}

export async function moveIngredient({
  user_id,
  food_name,
  ingredient_id,
}: moveIngredientVariables) {
  await axios
    .post(import.meta.env.VITE_server_groceries, {
      user_id: user_id,
      food_name: food_name,
    })
    .then(() => removeIngredient(ingredient_id));
}

export async function addIngredient({
  user,
  ingredients,
}: {
  user: string | undefined;
  ingredients: string;
}) {
  if (regex.test(ingredients)) {
    await axios.post(import.meta.env.VITE_server_ingredients, {
      user_id: user,
      food_name: ingredients,
    });
  }
}
