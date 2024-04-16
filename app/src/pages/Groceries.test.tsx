import { render, screen, waitFor } from "@testing-library/react";
import { MyGroceries } from "./Groceries";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "@/context/context";

describe("MyGroceries page", () => {
  const queryClient = new QueryClient();
  it("renders MyGroceries page", async () => {
    render(
      <UserContextProvider testUser="test-user">
        <QueryClientProvider client={queryClient}>
          <MyGroceries />
        </QueryClientProvider>
      </UserContextProvider>
    );
    expect(screen.getByTestId("groceries-component")).toBeInTheDocument();
    // await waitFor(() =>
    //   expect(screen.getByTestId("no-groceries-message")).toBeInTheDocument()
    // );
  });
});

// remove grocery
// move grocery
// add grocery
// handle submit
// simulate getting error from api
// render grocery card for every grocery
