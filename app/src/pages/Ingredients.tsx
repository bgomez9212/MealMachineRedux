import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IngredientCard } from "@/components/IngredientCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserContext } from "@/context/context";

interface moveIngredientVariables {
  user_id: string | undefined;
  food_name: string;
  ingredient_id: number;
}

export function MyIngredients() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const regex = new RegExp("^[a-zA-Z]+.*$");
  const [ingredientInput, setIngredientInput] = useState("");

  const {
    data: ingredients,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () =>
      axios
        .get(import.meta.env.VITE_server_ingredients, {
          params: {
            user_id: user,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  async function removeIngredient(ingredient_id: number) {
    await axios.delete(import.meta.env.VITE_server_ingredients, {
      data: {
        ingredient_id: ingredient_id,
      },
    });
  }

  const { mutateAsync: removeIngredientMutation } = useMutation({
    mutationFn: removeIngredient,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ingredients"] }),
  });

  async function moveIngredient({
    user_id,
    food_name,
    ingredient_id,
  }: moveIngredientVariables) {
    await axios
      .post(import.meta.env.VITE_server_groceries, {
        user_id: user_id,
        food_name: food_name,
      })
      .then(() => removeIngredientMutation(ingredient_id));
  }

  const { mutateAsync: moveIngredientMutation } = useMutation({
    mutationFn: moveIngredient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groceries"] }),
  });

  async function addIngredient(grocery: string) {
    if (regex.test(grocery)) {
      await axios
        .post(import.meta.env.VITE_server_ingredients, {
          user_id: user,
          food_name: grocery,
        })
        .then(() => setIngredientInput(""));
    }
  }

  const { mutateAsync: addIngredientMutation } = useMutation({
    mutationFn: addIngredient,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ingredients"] }),
  });

  function handleSubmit() {
    const ingredientArray = ingredientInput
      .split(",")
      .map((ingredient) => ingredient.trim());
    ingredientArray.forEach((ingredient) => {
      addIngredientMutation(ingredient);
    });
  }

  return (
    <div data-testid="ingredients-component" className="px-10 py-10">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Ingredients</Label>
        <Textarea
          placeholder="Type your ingredients here."
          id="message-2"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
        <div className="flex flex-col md:flex-row justify-between">
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">
            You can enter multiple ingredients by submitting a comma-separated
            list.
          </p>
          <Button className="order-last" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center pt-10">
          <ClipLoader color="#8FAC5F" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center">
          An Error has occured, please try again later.
        </div>
      ) : ingredients.length ? (
        <div className="mb-10">
          {ingredients?.map(
            ({
              name,
              date_added,
              id,
            }: {
              name: string;
              date_added: string;
              id: number;
            }) => (
              <IngredientCard
                key={name}
                name={name}
                date_added={date_added}
                removeIngredient={async () => {
                  try {
                    await removeIngredientMutation(id);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                moveIngredient={async () => {
                  try {
                    await moveIngredientMutation({
                      user_id: user,
                      food_name: name,
                      ingredient_id: id,
                    });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-10">
          ⬆️ Start by adding some ingredients to your kitchen ⬆️
        </div>
      )}
    </div>
  );
}
