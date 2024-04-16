import { screen, render, fireEvent } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";
import UserContextProvider from "@/context/context";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Recipe card component", () => {
  const mockHandleSaveClick = vi.fn();
  const mockHandleReadRecipe = vi.fn();
  const mockHandleDeleteSavedRecipe = vi.fn();
  const queryClient = new QueryClient();

  it("renders recipes card component", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </UserContextProvider>
    );
  });

  it("calls handle save grocery", () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <RecipeCard
            image="test-image"
            title="test-title"
            handleSaveClick={mockHandleSaveClick}
            handleReadRecipe={mockHandleReadRecipe}
            handleDeleteSavedRecipe={mockHandleDeleteSavedRecipe}
            isSaved={false}
            missedIngredients={[
              { name: "Tomato", id: 1 },
              { name: "oranges", id: 11 },
            ]}
            missedIngredientCount={2}
          />
        </QueryClientProvider>
      </UserContextProvider>
    );

    // open modal
    fireEvent.click(screen.getByTestId("card-description"));
    // click button to save grocery
    fireEvent.click(screen.getByTestId("1-test"));
  });
});
