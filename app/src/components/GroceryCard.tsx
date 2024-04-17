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
  removeGrocery,
  moveGrocery,
}: {
  name: string;
  date_added: string;
  removeGrocery: () => void;
  moveGrocery: () => void;
}) {
  return (
    <Card
      data-testid="grocery-card"
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
          data-testid="move-grocery"
          onClick={moveGrocery}
          className="mr-2"
          variant={"move"}
        >
          Move to Ingredient List
        </Button>
        <Button
          data-testid="remove-grocery"
          onClick={removeGrocery}
          variant={"destructive"}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
