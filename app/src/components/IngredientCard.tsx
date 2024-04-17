import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function IngredientCard({
  name,
  date_added,
  removeIngredient,
  moveIngredient,
}: {
  name: string;
  date_added: string;
  removeIngredient: () => void;
  moveIngredient: () => void;
}) {
  return (
    <Card
      data-testid="ingredient-card"
      className="mt-10 flex flex-col flex-wrap bg-[#FCFCF6] dark:bg-[#526345]"
    >
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
          data-testid="move-ingredient"
          onClick={moveIngredient}
          className="mr-2"
          variant={"move"}
        >
          Move to Grocery List
        </Button>
        <Button
          data-testid="remove-ingredient"
          onClick={removeIngredient}
          variant={"destructive"}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
