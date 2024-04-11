import { render, screen } from "@testing-library/react";
import { IngredientCard } from "./IngredientCard";

describe("Ingredient Card Component", () => {
  const mockRemoveIngredient = vi.fn();
  const mockMoveIngredient = vi.fn();
  it("renders ingredient card component", () => {
    render(
      <IngredientCard
        name="test"
        date_added="test"
        removeIngredient={mockRemoveIngredient}
        moveIngredient={mockMoveIngredient}
      />
    );
    expect(screen.getByTestId("ingredient-card")).toBeInTheDocument();
  });
});
