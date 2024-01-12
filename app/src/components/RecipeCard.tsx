import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type MissingIngredients = {
  name: string;
  id: number;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
  missedIngredientCount: number;
  missedIngredients: MissingIngredients[];
}) {
  const [hovered, setHovered] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<
    MissingIngredients[] | null
  >(null);

  return (
    <>
      <Modal
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="dark:text-black text-xl">
            Ingredients You Are Missing:
          </p>
          {selectedRecipe?.map((ingredient: MissingIngredients) => (
            <div className="flex items-center justify-between border-b last:border-b-0 py-2">
              <p key={ingredient.name} className="dark:text-black">
                {ingredient.name
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.substring(1))
                  .join(" ")}
              </p>
              <Button
                key={ingredient.id}
                className="dark:bg-black dark:text-white hover:bg-green-700 dark:hover:bg-green-700"
              >
                Add "{ingredient.name}" To Groceries
              </Button>
            </div>
          ))}
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
          onClick={() => setSelectedRecipe(missedIngredients)}
          className="flex flex-grow flex-col justify-end mb-5 mx-6 cursor-pointer"
        >
          {missedIngredientCount >= 1
            ? `Missing ${missedIngredientCount} Ingredient${
                missedIngredientCount > 1 ? "s" : ""
              }`
            : `Ready To Cook!`}
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button onClick={handleReadRecipe} variant={"link"}>
            Read Recipe
          </Button>
          {isSaved ? (
            <Button
              variant={"saved"}
              onClick={handleDeleteSavedRecipe}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered ? "Unsave" : "Saved"}
            </Button>
          ) : (
            <Button onClick={handleSaveClick}>Save Recipe</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
