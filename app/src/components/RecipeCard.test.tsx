import { screen, render, fireEvent } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";
import UserContextProvider from "@/context/context";
import { QueryClient, QueryClientProvider } from "react-query";
import { server } from "@/mocks/browser";

describe("Recipe card component", () => {
  const queryClient = new QueryClient();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const recipeCard = (
    saved: boolean,
    missedIngredients: any[],
    missedIngredientCounter: number
  ) => (
    <UserContextProvider testUser="test-user">
      <QueryClientProvider client={queryClient}>
        <RecipeCard
          image="test-image"
          title="test-title"
          handleSaveClick={vi.fn}
          handleReadRecipe={vi.fn}
          handleDeleteSavedRecipe={vi.fn}
          isSaved={saved}
          missedIngredients={missedIngredients}
          missedIngredientCount={missedIngredientCounter}
        />
      </QueryClientProvider>
    </UserContextProvider>
  );

  it("renders recipes card component", async () => {
    render(recipeCard(true, [], 2));
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Missing 2 Ingredients"
    );
  });

  it("renders correct message when user is missing zero ingredients", () => {
    render(recipeCard(true, [], 0));
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Ready to make!"
    );
  });

  it("renders correct message when user is missing 1 ingredient", async () => {
    render(recipeCard(true, [], 1));
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Missing 1 Ingredient"
    );
  });

  it("renders an unsaved recipe correctly", () => {
    render(recipeCard(false, [], 0));
  });

  it("calls handle save grocery api", async () => {
    render(
      recipeCard(
        false,
        [
          { name: "Tomato", id: 1 },
          { name: "oranges", id: 11 },
        ],
        2
      )
    );
    // open modal
    fireEvent.click(screen.getByTestId("card-description"));
    // click button to save grocery
    fireEvent.click(screen.getByTestId("11-test"));
    fireEvent.click(screen.getByTestId("close-modal-btn"));
  });
});
