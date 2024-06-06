import { render, screen, waitFor } from "@testing-library/react";
import { RecipeDetailPage } from "./RecipeDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "@/mocks/browser";
import UserContextProvider from "@/context/context";
import { HttpResponse, http } from "msw";

describe("recipe details page", async () => {
  const queryClient = new QueryClient();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render component", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider testUser="test">
          <Router>
            <RecipeDetailPage />
          </Router>
        </UserContextProvider>
      </QueryClientProvider>
    );
    server.use(
      http.get(
        import.meta.env.VITE_server_recipeDetails,
        () => {
          return HttpResponse.json([]);
        },
        { once: true }
      )
    );
    await waitFor(() => {
      expect(
        screen.getByTestId("recipes-details-component")
      ).toBeInTheDocument();
    });
  });
});
