import { render, screen } from "@testing-library/react";
import { GroceryCard } from "./GroceryCard";

describe("Grocery Card Component", () => {
  const mockRemoveGrocery = vi.fn();
  const mockMoveGrocery = vi.fn();
  it("renders grocery card component", () => {
    render(
      <GroceryCard
        name="test"
        date_added="test"
        removeGrocery={mockRemoveGrocery}
        moveGrocery={mockMoveGrocery}
      />
    );
    expect(screen.getByTestId("grocery-card")).toBeInTheDocument();
  });
});
