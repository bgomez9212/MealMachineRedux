import { screen, render, fireEvent } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";
import UserContextProvider from "@/context/context";
import { QueryClient, QueryClientProvider } from "react-query";
import GroceryContextProvider from "@/context/groceryContext";

describe("Recipe card component", () => {
  const mockHandleSaveClick = vi.fn();
  const mockHandleReadRecipe = vi.fn();
  const mockHandleDeleteSavedRecipe = vi.fn();
  const queryClient = new QueryClient();

  it("renders recipes card component", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <GroceryContextProvider>
            <RecipeCard
              image="test-image"
              title="test-title"
              handleSaveClick={mockHandleSaveClick}
              handleReadRecipe={mockHandleReadRecipe}
              handleDeleteSavedRecipe={mockHandleDeleteSavedRecipe}
              isSaved={true}
              missedIngredients={[]}
              missedIngredientCount={2}
            />
          </GroceryContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    );
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Missing 2 Ingredients"
    );
  });

  it("renders correct message when user is missing zero ingredients", () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <GroceryContextProvider>
            <RecipeCard
              image="test-image"
              title="test-title"
              handleSaveClick={mockHandleSaveClick}
              handleReadRecipe={mockHandleReadRecipe}
              handleDeleteSavedRecipe={mockHandleDeleteSavedRecipe}
              isSaved={true}
              missedIngredients={[]}
              missedIngredientCount={0}
            />
          </GroceryContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    );
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Ready to make!"
    );
  });

  it("renders a saved recipe correctly", () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <GroceryContextProvider>
            <RecipeCard
              image="test-image"
              title="test-title"
              handleSaveClick={mockHandleSaveClick}
              handleReadRecipe={mockHandleReadRecipe}
              handleDeleteSavedRecipe={mockHandleDeleteSavedRecipe}
              isSaved={false}
              missedIngredients={[]}
              missedIngredientCount={0}
            />
          </GroceryContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    );
  });
  it("renders modal", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <GroceryContextProvider
            testGroceries={[
              { name: "carrots", id: 1, date_added: "2024-01-01" },
              { name: "bread", id: 3, date_added: "2024-01-01" },
            ]}
          >
            <RecipeCard
              image="test-image"
              title="test-title"
              handleSaveClick={mockHandleSaveClick}
              handleReadRecipe={mockHandleReadRecipe}
              handleDeleteSavedRecipe={mockHandleDeleteSavedRecipe}
              isSaved={true}
              missedIngredients={[
                { name: "carrots", id: 1 },
                { name: "apples", id: 2 },
              ]}
              missedIngredientCount={2}
            />
          </GroceryContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    );
    fireEvent.click(screen.getByTestId("card-description"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    // expect(screen.getByTestId("missing-ingredients")).toHaveTextContent(
    //   "carrots"
    // );
    screen.debug();
  });
});
