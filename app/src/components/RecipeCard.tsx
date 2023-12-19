import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function RecipeCard({
  image,
  title,
  handleSaveClick,
}: {
  image: string;
  title: string;
  handleSaveClick: () => void;
}) {
  return (
    <Card className="w-full lg:w-[30%] mt-10 flex flex-col overflow-hidden recipe-card bg-[#FCFCF6]">
      <CardContent className="h-50 overflow-hidden flex items-center justify-center">
        <img src={image} />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p>Missing</p>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant={"link"}>Read Recipe</Button>
        <Button onClick={handleSaveClick}>Save Recipe</Button>
      </CardFooter>
    </Card>
  );
}
