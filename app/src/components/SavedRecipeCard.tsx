import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function SavedRecipeCard({
  image,
  title,
  handleDeleteSavedRecipe,
  handleReadRecipe,
}: {
  image: string;
  title: string;
  handleDeleteSavedRecipe: () => void;
  handleReadRecipe: () => void;
}) {
  return (
    <Card className="w-full lg:w-[30%] md:w-[47%] mt-10 flex flex-col overflow-hidden recipe-card bg-[#FCFCF6] dark:bg-[#526345]">
      <CardContent className="h-50 overflow-hidden flex items-center justify-center">
        <img src={image} />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p>Missing</p>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant={"link"} onClick={handleReadRecipe}>
          Read Recipe
        </Button>
        <Button variant={"destructive"} onClick={handleDeleteSavedRecipe}>
          Remove Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
