import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Home } from "./home";
import UserContextProvider from "@/context/context";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { server } from "@/mocks/browser";
import { HttpResponse, http } from "msw";

describe("home component", () => {
  const queryClient = new QueryClient();
  server.listen();
  it("should render component, call endpoints delete and post saved recipe", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Home />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("home-component")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("remove-recipe"));
      fireEvent.click(screen.getByTestId("save-recipe"));
    });
  });
  it("should render component with no recipes", async () => {
    server.use(
      http.get(import.meta.env.VITE_server_recipes, () => {
        return HttpResponse.json([]);
      })
    );
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Home />
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("no-ingredients-msg")).toBeInTheDocument();
    });
  });
  // if ("should change search recipe text input", () => {

  // })
});

// search results
// save click (post saved recipe)
// navigate to recipe details page
// delete saved recipe
// no ingredients message
