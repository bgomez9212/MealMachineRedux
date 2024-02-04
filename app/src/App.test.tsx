import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
// Mocking the server for axios requests
const server = setupServer(
  http.get(import.meta.env.VITE_server_groceries, (_req, res, ctx) => {
    return res(ctx.json([]));
  })
);

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("app to be rendered", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("test1")).toBeVisible();
  });

  // Simulate authentication (replace with your actual UI elements and interactions)
  // await userEvent.click(screen.getByTestId("test1"));

  // Replace the user authentication logic with your actual UI elements and interactions

  // Authenticated state
  // expect(screen.getByText(/home/i)).toBeInTheDocument();
  // expect(screen.getByText(/groceries/i)).toBeInTheDocument();
});
