import { render, screen, waitFor } from "@testing-library/react";
import { RecipeDetailPage } from "./RecipeDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "@/mocks/browser";

describe("recipe details page", async () => {
  const queryClient = new QueryClient();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render component", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RecipeDetailPage />
        </Router>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(
        screen.getByTestId("recipes-details-component")
      ).toBeInTheDocument();
    });
  });
});
