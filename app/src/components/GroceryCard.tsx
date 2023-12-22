import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function GroceryCard({
  name,
  date_added,
  handleRemoveGrocery,
  handleMoveGroceryToIngredientList,
}: {
  name: string;
  date_added: string;
  handleRemoveGrocery: () => void;
  handleMoveGroceryToIngredientList: () => void;
}) {
  return (
    <Card className="mt-10 flex flex-col flex-wrap bg-[#FCFCF6]">
      <CardHeader>
        <CardTitle>
          {name
            .split(" ")
            .map((s) => s[0].toUpperCase() + s.substring(1))
            .join(" ")}
        </CardTitle>
        <CardDescription>{`Date Added: ${date_added.slice(
          0,
          10
        )}`}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={handleMoveGroceryToIngredientList}
          className="mr-2"
          variant={"move"}
        >
          Move to Ingredient List
        </Button>
        <Button onClick={handleRemoveGrocery} variant={"destructive"}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
