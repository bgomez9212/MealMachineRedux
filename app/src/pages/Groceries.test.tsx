import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MyGroceries } from "./Groceries";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "@/context/context";
import { server } from "@/mocks/browser";

describe("MyGroceries page", () => {
  server.listen();
  const queryClient = new QueryClient();
  it("calls delete and move grocery functions", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <MyGroceries />
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("groceries-container")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("remove-grocery"));
    fireEvent.click(screen.getByTestId("move-grocery"));
  });

  it("calls delete and move grocery functions", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <MyGroceries />
        </QueryClientProvider>
      </UserContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("groceries-container")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("remove-grocery"));
    fireEvent.click(screen.getByTestId("move-grocery"));
  });

  it("calls post grocery endpoint", () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <MyGroceries />
        </QueryClientProvider>
      </UserContextProvider>
    );
    const textInput = screen.getByTestId(
      "groceries-test-input"
    ) as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: "carrots, potatoes" } });
    fireEvent.click(screen.getByTestId("input-submit-button"));
  });
});
