import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Navbar } from "./Navbar";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { UserContext } from "@/context/context";
import App from "@/App";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

describe("Navbar component", () => {
  // it("renders the navbar component", async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <UserContext.Provider value="user">
  //         <App />
  //       </UserContext.Provider>
  //     </QueryClientProvider>
  //   );
  //   await waitFor(() => {
  //     expect(screen.getByTestId("home-component")).toBeInTheDocument();
  //   });
  // });

  it("does not render navbar component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("navigation-bar")).not.toBeInTheDocument();
  });

  // it("navigates to ingredients", async () => {
  //   render(
  //     <UserContext.Provider value="user">
  //       <MemoryRouter initialEntries={["/home"]}>
  //         <Navbar />
  //       </MemoryRouter>
  //     </UserContext.Provider>
  //   );
  //   const ingredientsLink = screen.getByTestId("ingredients-link");
  //   fireEvent.click(ingredientsLink);
  // });

  // it("navigates to groceries", async () => {
  //   render(
  //     <UserContext.Provider value="user">
  //       <MemoryRouter initialEntries={["/home"]}>
  //         <Navbar />
  //       </MemoryRouter>
  //     </UserContext.Provider>
  //   );
  //   const groceriesLink = screen.getByTestId("groceries-link");
  //   fireEvent.click(groceriesLink);
  // });
  // it("bottom navigation works (need to figure out how to display that in a test since it is dependant on screen size")
});
