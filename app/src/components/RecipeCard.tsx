import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function RecipeCard(recipe: any) {
  const recipeObj = recipe.recipe;
  console.log(recipeObj);
  return (
    <Card className="w-[30vw] mt-10 flex flex-col overflow-hidden">
      <CardContent className="h-50 overflow-hidden flex items-center justify-center">
        <img src={recipeObj.image} />
      </CardContent>
      <CardHeader>
        <CardTitle>{recipeObj.title}</CardTitle>
        <p>Missing</p>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant={"link"}>Read Recipe</Button>
        <Button>Save Recipe</Button>
      </CardFooter>
    </Card>
  );
}
