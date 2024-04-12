import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "./context/context";

describe("App component", () => {
  it("renders app component", () => {
    render(
      <UserContextProvider>
        <App />
      </UserContextProvider>
    );
    expect(screen.getByTestId("app-loader")).toBeInTheDocument();
  });

  it("navigates to landing page without user auth", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("login-component")).toBeInTheDocument()
    );
  });

  it("navigates to home page with user auth", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider testUser={"user"}>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId("home-component")).toBeInTheDocument()
    );
  });
});
