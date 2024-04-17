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
    fireEvent.click(screen.getByTestId("remove-ingredient"));
  });

  // move ingredient
  it("should call api endpoint that moves ingredient to groceries", () => {
    render(
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <MyIngredients />
        </QueryClientProvider>
      </UserContextProvider>
    );
    fireEvent.click(screen.getByTestId("move-ingredient"));
  });
  // add ingredient + handle submit
  it("should fill text box with ingredients and submit should call ingredients post", () => {
    render(
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <MyIngredients />
        </QueryClientProvider>
      </UserContextProvider>
    );
    const textBox = screen.getByTestId("ingredients-input");
    fireEvent.change(textBox, { target: { value: "carrots, peas, potatoes" } });
    fireEvent.click(screen.getByTestId("ingredients-submit"));
  });
});

// error fetching ingredients
// remove ingredient (ingredient card)
// move ingredient (ingredient card)
// message when there are no ingredients
