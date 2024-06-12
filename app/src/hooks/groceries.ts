import { moveGroceryVariables } from "@/types";
import axios from "axios";
const regex = new RegExp("^[a-zA-Z]+.*$");

export async function getGroceries(user: string | undefined) {
  return axios
    .get(import.meta.env.VITE_server_groceries, {
      params: {
        user_id: user,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function removeGrocery(grocery_id: number) {
  await axios.delete(import.meta.env.VITE_server_groceries, {
    data: {
      grocery_id: grocery_id,
    },
  });
}

export async function moveGrocery({
  user_id,
  food_name,
  grocery_id,
}: moveGroceryVariables) {
  await axios
    .post(import.meta.env.VITE_server_ingredients, {
      user_id: user_id,
      food_name: food_name,
    })
    .then(() => removeGrocery(grocery_id));
}

export async function addGrocery({
  grocery,
  user,
}: {
  grocery: string;
  user: string | undefined;
}) {
  if (regex.test(grocery)) {
    await axios.post(import.meta.env.VITE_server_groceries, {
      user_id: user,
      food_name: grocery,
    });
  }
}
