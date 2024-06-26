import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";

describe("Login component", () => {
  const loginComponent = (
    <Router>
      <Login handleClick={vi.fn} />
    </Router>
  );

  it("renders error message when errorMessage is present", async () => {
    render(loginComponent);
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    fireEvent.change(emailInput, {
      target: { value: "nonexistent@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const loginBtn = screen.getByTestId("login-button");
    fireEvent.click(loginBtn);
    await waitFor(() =>
      expect(screen.getByTestId("login-error")).toBeInTheDocument()
    );
  });

  it("changes form inputs", async () => {
    render(loginComponent);
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("testpassword");
  });

  it("changes password visibility", async () => {
    render(loginComponent);
    const visibilityButton = screen.getByTestId("visibility-button");
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    fireEvent.click(visibilityButton);
    expect(passwordInput.type).toBe("text");
  });
});
