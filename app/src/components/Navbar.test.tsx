import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "@/context/context";
import App from "@/App";

describe("Navbar component", () => {
  const queryClient = new QueryClient();
  const navbar = (
    <UserContextProvider testUser="testuser">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserContextProvider>
  );

  it("navigates to ingredients screen", () => {
    render(navbar);
    const ingredientsLink = screen.getByTestId("ingredients-link");
    fireEvent.click(ingredientsLink);
    expect(window.location.pathname).toBe("/ingredients");
  });

  it("navigates to groceries screen", () => {
    render(navbar);
    const groceriesLink = screen.getByTestId("groceries-link");
    fireEvent.click(groceriesLink);
    expect(window.location.pathname).toBe("/groceries");
  });
});

// need test for dropdown menu item that navigates to saved recipes
// need test for bottom navigation that is rendered on smaller screens
