import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GroceryCard } from "@/components/GroceryCard";
import { useQueryClient } from "react-query";
import { useContext, useState } from "react";
import { UserContext } from "@/context/context";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Groceries = {
  id: number;
  name: string;
  date_added: string;
  gro_user_id: string;
};

export function MyGroceries({ groceries }: { groceries: Groceries[] }) {
  const queryClient = useQueryClient();
  const user = useContext(UserContext);

  const [groceryInput, setGroceryInput] = useState("");

  function handleRemoveGrocery(gro_user_id: string) {
    axios
      .delete(`http://127.0.0.1:8888/api/groceries?gro_user_id=${gro_user_id}`)
      .then(() => queryClient.invalidateQueries({ queryKey: ["groceries"] }));
  }

  function handleSubmit() {
    const groceryArray = groceryInput
      .split(",")
      .map((grocery) => grocery.trim());

    groceryArray.forEach((grocery) => {
      axios
        .post("http://127.0.0.1:8888/api/groceries", {
          user_id: user,
          food_name: grocery,
        })
        .then(() => queryClient.invalidateQueries({ queryKey: ["groceries"] }))
        .then(() => setGroceryInput(""));
    });
  }

  function handleMoveGroceryToIngredientList(
    gro_user_id: string,
    food_name: string
  ) {
    axios
      .post("http://127.0.0.1:8888/api/ingredients", {
        user_id: user,
        food_name: food_name,
      })
      .then(() => handleRemoveGrocery(gro_user_id))
      .then(() => queryClient.invalidateQueries({ queryKey: ["groceries"] }));
  }

  return (
    <div className="px-10 py-10">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Groceries</Label>
        <Textarea
          placeholder="Type your groceries here."
          id="message-2"
          value={groceryInput}
          onChange={(e) => setGroceryInput(e.target.value)}
        />
        <div className="flex flex-col justify-between md:flex-row">
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">
            You can enter multiple groceries by submitting a comma-separated
            list.
          </p>
          <Button className="order-last" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </div>
      </div>
      {groceries.length ? (
        <div className="mb-10">
          {groceries?.map(
            ({
              name,
              date_added,
              gro_user_id,
            }: {
              name: string;
              date_added: string;
              gro_user_id: string;
            }) => (
              <GroceryCard
                key={name}
                name={name}
                date_added={date_added}
                handleRemoveGrocery={() => handleRemoveGrocery(gro_user_id)}
                handleMoveGroceryToIngredientList={() =>
                  handleMoveGroceryToIngredientList(gro_user_id, name)
                }
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-10">
          ⬆️ Get started by adding some groceries to your grocery list ⬆️
        </div>
      )}
    </div>
  );
}
