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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Groceries, type MissingIngredients } from "@/types";
import { useUserContext } from "@/context/context";
import { addGrocery, getGroceries } from "@/hooks/groceries";

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
  handleSaveClick?: () => void;
  handleReadRecipe: () => void;
  handleDeleteSavedRecipe: () => void;
  isSaved: boolean;
  missedIngredientCount?: number | null;
  missedIngredients?: MissingIngredients[] | null;
}) {
  const [selectedRecipe, setSelectedRecipe] = useState<
    MissingIngredients[] | null
  >(null);
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const { data: groceries } = useQuery<Groceries[]>({
    queryKey: ["groceries"],
    queryFn: () => getGroceries(user),
    enabled: !!user,
  });

  const { mutateAsync: saveGroceryMutation } = useMutation({
    mutationFn: addGrocery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groceries"] }),
  });

  return (
    <>
      <Modal
        data-testid="modal"
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
              <div
                data-testid="missing-ingredients"
                key={ingredient.id}
                className="flex flex-col sm:flex-row items-center justify-between py-5 border-b w-full"
              >
                <p className="sm:block" key={ingredient.name}>
                  {ingredient.name
                    .split(" ")
                    .map((word) => word[0].toUpperCase() + word.substring(1))
                    .join(" ")}
                </p>
                {groceries &&
                groceries
                  .map((grocery) => grocery.name)
                  .indexOf(ingredient.name) > -1 ? (
                  <Button
                    data-testid="disabled-button"
                    key={ingredient.id}
                    className="disabled bg-[#8fac5f]"
                  >
                    In Your Groceries
                  </Button>
                ) : (
                  <Button
                    data-testid={`${ingredient.id}-test`}
                    className="whitespace-normal h-auto"
                    onClick={() =>
                      saveGroceryMutation({ grocery: ingredient.name, user })
                    }
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
            data-testid="close-modal-btn"
            className="w-full md:w-1/2 mt-10"
            onClick={() => setSelectedRecipe(null)}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Card
        data-testid="recipe-card"
        className="w-full mt-10 flex flex-col overflow-hidden recipe-card bg-[#FCFCF6] dark:bg-[#526345]"
      >
        <CardContent className="h-50 overflow-hidden flex items-center justify-center">
          <img data-testid="test-image" src={image} className="w-full" />
        </CardContent>
        <CardHeader className="flex mb-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardDescription
          data-testid="card-description"
          onClick={() => {
            missedIngredients &&
              missedIngredients.length &&
              setSelectedRecipe(missedIngredients);
          }}
          className={`flex flex-grow flex-col justify-end mb-5 mx-6 ${missedIngredientCount ? "cursor-pointer" : ""} text-black dark:text-white`}
        >
          {missedIngredientCount === 0
            ? "Ready to make!"
            : !missedIngredientCount
              ? ""
              : `Missing ${missedIngredientCount} Ingredient${
                  missedIngredientCount > 1 ? "s" : ""
                }`}
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button
            data-testid={`read-${title}`}
            onClick={handleReadRecipe}
            variant={"link"}
          >
            Read Recipe
          </Button>
          {isSaved ? (
            <Button
              variant={"saved"}
              onClick={handleDeleteSavedRecipe}
              data-testid="remove-recipe"
            ></Button>
          ) : (
            <Button data-testid="save-recipe" onClick={handleSaveClick}>
              Save Recipe
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
