import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "@/mocks/browser";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyIngredients } from "./Ingredients";
import UserContextProvider from "@/context/context";
import { HttpResponse, http } from "msw";

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
  // message when there are no ingredients
  it("message should render when there are no ingredients", async () => {
    server.use(
      http.get(import.meta.env.VITE_server_ingredients, () => {
        return HttpResponse.json([]);
      })
    );
    render(
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <MyIngredients />
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("no-ingredients-message")).toBeInTheDocument();
    });
  });
});

// error fetching ingredients
// remove ingredient (ingredient card)
// move ingredient (ingredient card)
