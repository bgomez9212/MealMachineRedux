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
  listType,
}: {
  name: string;
  date_added: string;
  listType: string;
}) {
  return (
    <Card className="mt-10 flex flex-col flex-wrap bg-[#FCFCF6]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{date_added}</CardDescription>
      </CardHeader>
      {listType === "ingredient" && (
        <CardFooter>
          <Button className="mr-2" variant={"move"}>
            Move to Grocery List
          </Button>
          <Button variant={"destructive"}>Remove</Button>
        </CardFooter>
      )}
      {listType === "grocery" && (
        <CardFooter>
          <Button className="mr-2" variant={"move"}>
            Move to Ingredients List
          </Button>
          <Button variant={"destructive"}>Remove</Button>
        </CardFooter>
      )}
    </Card>
  );
}
