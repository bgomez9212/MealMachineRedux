import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IngredientCard } from "@/components/IngredientCard";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserContext } from "@/context/context";
import { useQuery, useQueryClient, useMutation } from "react-query";

export function MyIngredients() {
  const queryClient = useQueryClient();
  const user = useContext(UserContext);
  const [ingredients, setIngredients] = useState([]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () =>
      axios
        .get(`http://127.0.0.1:8888/api/ingredients?user_id=${user}`)
        .then((res) => setIngredients(res.data)),
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
        .catch((err) => console.log(err));
    });
  }

  function handleRemoveIngredient(ing_user_id: string) {
    axios
      .delete(
        `http://127.0.0.1:8888/api/ingredients?ing_user_id=${ing_user_id}`
      )
      .then(() => console.log("deleted"))
      .catch((err) => console.log(err));
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
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            You can enter multiple ingredients by submitting a comma-separated
            list.
          </p>
          <Button onClick={handleSubmit}>SUBMIT</Button>
        </div>
      </div>
      {ingredients.length && (
        <>
          {ingredients.map(({ name, date_added, ing_user_id }) => (
            <IngredientCard
              key={name}
              name={name}
              date_added={date_added}
              handleRemoveIngredient={() => handleRemoveIngredient(ing_user_id)}
              listType="ingredient"
            />
          ))}
        </>
      )}
    </div>
  );
}
