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

export function RecipeCard({
  image,
  title,
  handleSaveClick,
  handleReadRecipe,
  handleDeleteSavedRecipe,
  isSaved,
}: {
  image: string;
  title: string;
  handleSaveClick: () => void;
  handleReadRecipe: () => void;
  handleDeleteSavedRecipe: () => void;
  isSaved: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Card className="w-full mt-10 flex flex-col overflow-hidden recipe-card bg-[#FCFCF6] dark:bg-[#526345]">
      <CardContent className="h-50 overflow-hidden flex items-center justify-center">
        <img src={image} />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p>Missing</p>
        <CardDescription></CardDescription>
      </CardHeader>
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
  );
}
