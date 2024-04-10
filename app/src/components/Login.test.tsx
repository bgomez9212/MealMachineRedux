import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";

describe("Login component", () => {
  it("renders error message when errorMessage is present", async () => {
    const mockAuthenticateUser = vi.fn();
    const mockHandleClick = vi.fn();
    render(
      <Router>
        <Login
          handleClick={mockHandleClick}
          authenticateUser={mockAuthenticateUser}
        />
      </Router>
    );
    const loginBtn = screen.getByTestId("login-button");
    fireEvent.click(loginBtn);
    await waitFor(() =>
      expect(screen.getByTestId("login-error")).toBeInTheDocument()
    );
  });
});
