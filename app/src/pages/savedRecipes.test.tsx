import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SavedRecipes } from "./savedRecipes";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "@/context/context";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "@/mocks/browser";
import { HttpResponse, http } from "msw";

describe("saved recipes component", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 1,
        retry: 0,
      },
    },
  });
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it("renders component and calls delete recipe", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <Router>
            <SavedRecipes />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("saved-recipes-component")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("remove-recipe"));
    });
  });
  // message when there are no recipes to display
  it("renders message when there are no recipes", async () => {
    server.use(
      http.get(
        import.meta.env.VITE_server_savedRecipes,
        () => {
          return HttpResponse.json([]);
        },
        { once: true }
      )
    );
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <Router>
            <SavedRecipes />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("no-recipes-message")).toBeInTheDocument()
    );
  });
  // handle error
  it("renders message when there is an error", async () => {
    server.use(
      http.get(
        import.meta.env.VITE_server_savedRecipes,
        () => {
          return new HttpResponse(null, { status: 404 });
        },
        { once: true }
      )
    );
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <Router>
            <SavedRecipes />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("saved-ingredients-error")).toBeInTheDocument()
    );
  });
  // it("renders message when there are no recipes", async () => {
  //   render(
  //     <UserContextProvider testUser="test-user">
  //       <QueryClientProvider client={queryClient}>
  //         <Router>
  //           <SavedRecipes />
  //         </Router>
  //       </QueryClientProvider>
  //     </UserContextProvider>
  //   );
  // });
});

// navigate to recipe details page
