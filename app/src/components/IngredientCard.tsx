import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function IngredientCard({
  name,
  date_added,
}: {
  name: string;
  date_added: string;
}) {
  return (
    <Card className="mt-10 flex flex-col flex-wrap">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{date_added}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="mr-2" variant={"move"}>
          Move to Grocery List
        </Button>
        <Button variant={"destructive"}>Remove</Button>
      </CardFooter>
    </Card>
  );
}
