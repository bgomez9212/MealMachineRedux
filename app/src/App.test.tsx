import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "./context/context";
import { server } from "./mocks/browser";

describe("App component", () => {
  const queryClient = new QueryClient();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  function app(user?: string) {
    return (
      <QueryClientProvider client={queryClient}>
        <UserContextProvider testUser={user}>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    );
  }

  it("renders app component", () => {
    render(app());
    expect(screen.getByTestId("app-loader")).toBeInTheDocument();
  });

  it("navigates to landing page without user auth", async () => {
    render(app());
    await waitFor(() =>
      expect(screen.getByTestId("login-component")).toBeInTheDocument()
    );
  });

  // it("navigates to home page with user auth", async () => {
  //   render(app("test-user"));
  //   await waitFor(() =>
  //     expect(screen.getByTestId("home-component")).toBeInTheDocument()
  //   );
  // });
});
