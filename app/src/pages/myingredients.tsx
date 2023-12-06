import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IngredientCard } from "@/components/IngredientCard";

export function MyIngredients() {
  const ingredients = [
    { name: "Eggs", date_added: "12-04-2023" },
    { name: "Bananas", date_added: "12-04-2023" },
    { name: "Spaghetti", date_added: "12-04-2023" },
    { name: "Lettuce", date_added: "12-04-2023" },
    { name: "Tomatoes", date_added: "12-04-2023" },
  ];
  return (
    <div className="px-10 py-10">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Ingredients</Label>
        <Textarea placeholder="Type your ingredients here." id="message-2" />
        <p className="text-sm text-muted-foreground">
          You can enter multiple ingredients by submitting a comma-separated
          list.
        </p>
      </div>
      {ingredients.map(({ name, date_added }) => (
        <IngredientCard
          name={name}
          date_added={date_added}
          listType="ingredient"
        />
      ))}
    </div>
  );
}
