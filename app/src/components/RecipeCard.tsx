import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { UserContext } from "@/context/context";
import { useQueryClient } from "react-query";
import { type MissingIngredients } from "@/types";
import { useGroceryContext } from "@/context/groceryContext";

export function RecipeCard({
  image,
  title,
  missedIngredientCount,
  handleSaveClick,
  handleReadRecipe,
  handleDeleteSavedRecipe,
  isSaved,
  missedIngredients,
}: {
  image: string;
  title: string;
  handleSaveClick: () => void;
  handleReadRecipe: () => void;
  handleDeleteSavedRecipe: () => void;
  isSaved: boolean;
  missedIngredientCount: number | null;
  missedIngredients: MissingIngredients[] | null;
}) {
  const [selectedRecipe, setSelectedRecipe] = useState<
    MissingIngredients[] | null
  >(null);
  const user = useContext(UserContext);
  const queryClient = useQueryClient();
  const { groceries } = useGroceryContext();
  function handleSaveGrocery(grocery: string) {
    axios
      .post(import.meta.env.VITE_server_groceries, {
        user_id: user,
        food_name: grocery,
      })
      .then(() => queryClient.invalidateQueries({ queryKey: ["groceries"] }));
  }

  return (
    <>
      <Modal
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        className="flex justify-center items-center"
      >
        <Box
          className={
            "w-3/4 bg-white dark:bg-black shadow-lg border border-white p-10 flex flex-col items-center max-h-[50vh]"
          }
        >
          <p className="text-2xl mb-4">Missing Ingredients:</p>
          <div className="overflow-auto w-full">
            {selectedRecipe?.map((ingredient: MissingIngredients) => (
              <div className="flex flex-col sm:flex-row items-center justify-between py-5 border-b w-full">
                <p className="sm:block" key={ingredient.name}>
                  {ingredient.name
                    .split(" ")
                    .map((word) => word[0].toUpperCase() + word.substring(1))
                    .join(" ")}
                </p>
                {groceries
                  .map((grocery) => grocery.name)
                  .indexOf(ingredient.name) > -1 ? (
                  <Button key={ingredient.id} className="disabled bg-[#8fac5f]">
                    In Your Groceries
                  </Button>
                ) : (
                  <Button
                    className="whitespace-normal h-auto"
                    onClick={() => handleSaveGrocery(ingredient.name)}
                    key={ingredient.id}
                  >
                    Add "
                    {ingredient.name
                      .split(" ")
                      .map((word) => word[0].toUpperCase() + word.substring(1))
                      .join(" ")}
                    " To Groceries
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            className="w-full md:w-1/2 mt-10"
            onClick={() => setSelectedRecipe(null)}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Card className="w-full mt-10 flex flex-col overflow-hidden recipe-card bg-[#FCFCF6] dark:bg-[#526345]">
        <CardContent className="h-50 overflow-hidden flex items-center justify-center">
          <img src={image} className="w-full" />
        </CardContent>
        <CardHeader className="flex mb-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardDescription
          onClick={() => {
            missedIngredientCount ? setSelectedRecipe(missedIngredients) : "";
          }}
          className={`flex flex-grow flex-col justify-end mb-5 mx-6 ${missedIngredientCount ? "cursor-pointer" : ""} text-black dark:text-white`}
        >
          {!missedIngredientCount
            ? "Ready to make!"
            : `Missing ${missedIngredientCount} Ingredient${
                missedIngredientCount > 1 ? "s" : ""
              }`}
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button onClick={handleReadRecipe} variant={"link"}>
            Read Recipe
          </Button>
          {isSaved ? (
            <Button
              variant={"saved"}
              onClick={handleDeleteSavedRecipe}
            ></Button>
          ) : (
            <Button onClick={handleSaveClick}>Save Recipe</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
