import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Home } from "./home";
import { vi } from "vitest";
import UserContextProvider from "@/context/context";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { server } from "@/mocks/browser";
import { HttpResponse, http } from "msw";
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from "react-intersection-observer/test-utils";

describe("home component", () => {
  beforeAll(() => server.listen());
  beforeEach(() =>
    setupIntersectionMocking(
      vi.fn as unknown as {
        (): jest.Mock<any, any, any>;
        <T, Y extends any[], C = any>(
          implementation?: (this: C, ...args: Y) => T
        ): jest.Mock<T, Y, C>;
      }
    )
  );
  afterEach(() => {
    server.resetHandlers();
    resetIntersectionMocking();
  });
  afterAll(() => server.close());

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 1,
        retry: 0,
      },
    },
  });
  const home = (
    <UserContextProvider testUser="test-user">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Home />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  );
  // save click (post saved recipe)
  // delete saved recipe
  it("should render component, call endpoints delete and post saved recipe", async () => {
    render(home);
    await waitFor(() => {
      expect(screen.getByTestId("home-component")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("remove-recipe"));
      fireEvent.click(screen.getByTestId("save-recipe"));
    });
  });
  // no ingredients message
  it("should render component with no recipes", async () => {
    server.use(
      http.get(
        import.meta.env.VITE_server_recipes,
        () => {
          return HttpResponse.json({ data: [] });
        },
        { once: true }
      )
    );
    render(home);
    await waitFor(() => {
      expect(screen.getByTestId("no-ingredients-msg")).toBeInTheDocument();
    });
  });
  // // search results
  it("should change search recipe text input", async () => {
    server.use(
      http.get(import.meta.env.VITE_server_searchRecipes, () => {
        return HttpResponse.json({
          results: [
            {
              id: 1,
              title: "test1",
              image: "test-img",
              missedIngredientCount: 2,
              missedIngredients: [],
            },
            {
              id: 7,
              title: "test7",
              image: "test-img",
              missedIngredientCount: 4,
              missedIngredients: [],
            },
          ],
        });
      })
    );
    render(home);
    const textInput = (await waitFor(() =>
      screen.getByTestId("recipe-search")
    )) as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: "eggs" } });
    await waitFor(() => {
      expect(screen.getByTestId("search-recipe-results")).toBeInTheDocument();
    });
  });

  it("calls function to navigate to recipe details page", async () => {
    render(home);
    const readRecipeBtn = await waitFor(() => screen.getByTestId("read-test7"));
    // fireEvent.click(screen.getByTestId("read-test7"));
    fireEvent.click(readRecipeBtn);
  });
});

// render toast
// error when saving recipe
// navigate to recipe details page
