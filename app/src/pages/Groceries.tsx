import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GroceryCard } from "@/components/GroceryCard";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserContext } from "@/context/context";
import getGroceries from "@/hooks/api-hooks";

interface moveGroceryVariables {
  user_id: string | undefined;
  food_name: string;
  grocery_id: number;
}

export function MyGroceries() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const regex = new RegExp("^[a-zA-Z]+.*$");
  const [groceryInput, setGroceryInput] = useState("");

  const {
    data: groceries,
    isLoading: isGroceryLoading,
    isError: isGroceryError,
  } = useQuery({
    queryKey: ["groceries"],
    queryFn: () => getGroceries(user),
    enabled: !!user,
  });

  async function removeGrocery(grocery_id: number) {
    await axios.delete(import.meta.env.VITE_server_groceries, {
      data: {
        grocery_id: grocery_id,
      },
    });
  }

  const { mutateAsync: removeGroceryMutation } = useMutation({
    mutationFn: removeGrocery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groceries"] }),
  });

  async function moveGrocery({
    user_id,
    food_name,
    grocery_id,
  }: moveGroceryVariables) {
    await axios
      .post(import.meta.env.VITE_server_ingredients, {
        user_id: user_id,
        food_name: food_name,
      })
      .then(() => removeGroceryMutation(grocery_id));
  }

  const { mutateAsync: moveGroceryMutation } = useMutation({
    mutationFn: moveGrocery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groceries"] }),
  });

  async function addGrocery(grocery: string) {
    if (regex.test(grocery)) {
      await axios
        .post(import.meta.env.VITE_server_groceries, {
          user_id: user,
          food_name: grocery,
        })
        .then(() => setGroceryInput(""));
    }
  }

  const { mutateAsync: addGroceryMutation } = useMutation({
    mutationFn: addGrocery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groceries"] }),
  });

  function handleSubmit() {
    const groceryArray = groceryInput
      .split(",")
      .map((grocery) => grocery.trim());
    groceryArray.forEach((grocery) => {
      addGroceryMutation(grocery);
    });
  }

  return (
    <div data-testid="groceries-component" className="px-10 py-10">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Groceries</Label>
        <Textarea
          data-testid="groceries-test-input"
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
          <Button
            data-testid="input-submit-button"
            className="order-last"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
      {isGroceryLoading ? (
        <div className="flex justify-center items-center pt-10">
          <ClipLoader color="#8FAC5F" />
        </div>
      ) : isGroceryError ? (
        <div className="flex justify-center items-center">
          An Error has occured, please try again later.
        </div>
      ) : groceries?.length ? (
        <div data-testid="groceries-container" className="mb-10">
          {groceries?.map(
            ({
              id,
              name,
              date_added,
            }: {
              id: number;
              name: string;
              date_added: string;
            }) => (
              <GroceryCard
                key={id}
                name={name}
                date_added={date_added}
                removeGrocery={async () => {
                  try {
                    removeGroceryMutation(id);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                moveGrocery={async () => {
                  try {
                    moveGroceryMutation({
                      user_id: user,
                      food_name: name,
                      grocery_id: id,
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
        <div className="text-center mt-10" data-testid="no-groceries-message">
          ⬆️ Get started by adding some groceries to your grocery list ⬆️
        </div>
      )}
    </div>
  );
}
