import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IngredientCard } from "@/components/IngredientCard";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserContext } from "@/context/context";
import { useQuery, useQueryClient } from "react-query";

export function MyIngredients() {
  const queryClient = useQueryClient();
  const user = useContext(UserContext);
  const {
    data: ingredients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () =>
      axios
        .get(`http://127.0.0.1:8888/api/ingredients?user_id=${user}`)
        .then((res) => {
          return res.data;
        }),
  });

  // user input section
  const [textAreaData, setTextAreaData] = useState("");

  function handleSubmit() {
    const ingredientArray = textAreaData.split(",").map((word) => word.trim());
    ingredientArray.forEach((ingredient) => {
      const postUrl = `http://127.0.0.1:8888/api/ingredients?user_id=${user}&food_name=${ingredient}`;
      axios
        .post(postUrl)
        .then(() =>
          queryClient.invalidateQueries({ queryKey: ["ingredients"] })
        )
        .then(() => setTextAreaData(""))
        .catch((err) => console.log(err));
    });
  }

  function handleRemoveIngredient(ing_user_id: string) {
    axios
      .delete(
        `http://127.0.0.1:8888/api/ingredients?ing_user_id=${ing_user_id}`
      )
      .then(() => queryClient.invalidateQueries({ queryKey: ["ingredients"] }))
      .catch((err) => console.log(err));
  }

  function handleMoveIngredientToGroceryList(
    ing_user_id: string,
    food_name: string
  ) {
    axios
      .post(
        `http://127.0.0.1:8888/api/groceries?user_id=${user}&food_name=${food_name}`
      )
      .then(() => handleRemoveIngredient(ing_user_id))
      .then(() => queryClient.invalidateQueries({ queryKey: ["ingredients"] }));
  }

  if (error) {
    return <div>Sorry there seems to be something wrong on our end</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 py-10">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Ingredients</Label>
        <Textarea
          placeholder="Type your ingredients here."
          id="message-2"
          value={textAreaData}
          onChange={(e) => setTextAreaData(e.target.value)}
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
      {ingredients.length ? (
        <div className="mb-10">
          {ingredients?.map(
            ({
              name,
              date_added,
              ing_user_id,
            }: {
              name: string;
              date_added: string;
              ing_user_id: string;
            }) => (
              <IngredientCard
                key={name}
                name={name}
                date_added={date_added}
                handleRemoveIngredient={() =>
                  handleRemoveIngredient(ing_user_id)
                }
                handleMoveIngredientToGroceryList={() =>
                  handleMoveIngredientToGroceryList(ing_user_id, name)
                }
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
