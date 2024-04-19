import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MyGroceries } from "./Groceries";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "@/context/context";
import { server } from "@/mocks/browser";
import { http, HttpResponse } from "msw";

describe("MyGroceries page", () => {
  const queryClient = new QueryClient();
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  const groceries = (
    <UserContextProvider testUser="test-user">
      <QueryClientProvider client={queryClient}>
        <MyGroceries />
      </QueryClientProvider>
    </UserContextProvider>
  );
  it("calls delete and move grocery functions", async () => {
    render(groceries);
    await waitFor(() => {
      expect(screen.getByTestId("groceries-container")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("remove-grocery"));
    fireEvent.click(screen.getByTestId("move-grocery"));
  });

  it("calls post grocery endpoint", () => {
    render(groceries);
    const textInput = screen.getByTestId(
      "groceries-test-input"
    ) as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: "carrots, potatoes" } });
    fireEvent.click(screen.getByTestId("input-submit-button"));
  });
  it("renders empty array message", async () => {
    server.use(
      http.get(
        import.meta.env.VITE_server_groceries,
        () => {
          return HttpResponse.json([]);
        },
        {
          once: true,
        }
      )
    );
    render(groceries);
    await waitFor(() => {
      expect(screen.getByTestId("no-groceries-message")).toBeInTheDocument();
    });
  });
});
