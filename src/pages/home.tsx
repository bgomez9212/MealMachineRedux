import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import Card from "../components/Card";

export function Home({ randomRecipes }) {
  return (
    <div>
      {randomRecipes.map((recipe: { id: number; title: string }) => (
        <Card key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
