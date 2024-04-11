import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

describe("App component", () => {
  it("renders app component", () => {
    render(<App />);
    expect(screen.getByTestId("app-loader")).toBeInTheDocument();
  });
  it("navigates to landing page without no user auth", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("login-component")).toBeInTheDocument()
    );
  });
});
