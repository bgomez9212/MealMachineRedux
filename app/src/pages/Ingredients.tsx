import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IngredientCard } from "@/components/IngredientCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserContext } from "@/context/context";
import {
  addIngredient,
  getIngredients,
  moveIngredient,
  removeIngredient,
} from "@/hooks/ingredients";

export function MyIngredients() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [ingredientInput, setIngredientInput] = useState("");

  const {
    data: ingredients,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => getIngredients(user),
    enabled: !!user,
  });

  const { mutateAsync: removeIngredientMutation } = useMutation({
    mutationFn: removeIngredient,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ingredients"] }),
  });

  const { mutateAsync: moveIngredientMutation } = useMutation({
    mutationFn: moveIngredient,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ingredients"] }),
  });

  const { mutateAsync: addIngredientMutation } = useMutation({
    mutationFn: addIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      setIngredientInput("");
    },
  });

  function handleSubmit() {
    const ingredientArray = ingredientInput
      .split(",")
      .map((ingredient) => ingredient.trim());
    ingredientArray.forEach((ingredients) => {
      addIngredientMutation({ user, ingredients });
    });
  }

  return (
    <div data-testid="ingredients-component" className="px-10 py-10">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Ingredients</Label>
        <Textarea
          data-testid="ingredients-input"
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
          <Button
            data-testid="ingredients-submit"
            className="order-last"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div
          data-testid="ingredients-loader"
          className="flex justify-center items-center pt-10"
        >
          <ClipLoader color="#8FAC5F" />
        </div>
      ) : isError ? (
        <div
          data-testid="ingredients-error"
          className="flex justify-center items-center"
        >
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
        <div data-testid="no-ingredients-message" className="text-center mt-10">
          ⬆️ Start by adding some ingredients to your kitchen ⬆️
        </div>
      )}
    </div>
  );
}
