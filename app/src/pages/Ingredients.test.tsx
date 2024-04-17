import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "@/mocks/browser";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyIngredients } from "./Ingredients";
import UserContextProvider from "@/context/context";

describe("Ingredients component", () => {
  const queryClient = new QueryClient();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render component", async () => {
    render(
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <MyIngredients />
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("ingredients-component")).toHaveTextContent(
        "Apples"
      );
    });
  });
  // remove ingredient
  it("should call api endpoint that deletes ingredient", () => {
    render(
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <MyIngredients />
        </QueryClientProvider>
      </UserContextProvider>
    );
    fireEvent.click(screen.getByTestId("move-ingredient"));
    fireEvent.click(screen.getByTestId("remove-ingredient"));
  });
});

// move ingredient
// add ingredient + handle submit
// error fetching ingredients
// remove ingredient (ingredient card)
// move ingredient (ingredient card)
// message when there are no ingredients
