import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup";

describe("Login component", () => {
  const mockHandleClick = vi.fn();

  it("form accepts changes", async () => {
    render(
      <Router>
        <Signup handleClick={mockHandleClick} />
      </Router>
    );
    expect(screen.getByTestId("sign-up-component")).toBeInTheDocument();
  });

  it("changes form inputs", async () => {
    render(
      <Router>
        <Signup handleClick={mockHandleClick} />
      </Router>
    );
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "testpassword" },
    });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("testpassword");
    expect(confirmPasswordInput.value).toBe("testpassword");
  });

  it("changes password visibility", async () => {
    render(
      <Router>
        <Signup handleClick={mockHandleClick} />
      </Router>
    );
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input"
    ) as HTMLInputElement;
    const visibilityBtn = screen.getByTestId("visibility-button");
    fireEvent.click(visibilityBtn);
    expect(passwordInput.type).toBe("text");
    expect(confirmPasswordInput.type).toBe("text");
  });

  it("renders correct error message (invalid email)", async () => {
    render(
      <Router>
        <Signup handleClick={mockHandleClick} />
      </Router>
    );
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input"
    ) as HTMLInputElement;
    const signInBtn = screen.getByTestId("sign-in-button");
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "testpassword" },
    });
    fireEvent.click(signInBtn);
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByTestId("error-message").textContent).toBe(
        "Invalid Email"
      );
    });
  });

  it("renders correct error message (email already in use)", async () => {
    render(
      <Router>
        <Signup handleClick={mockHandleClick} />
      </Router>
    );
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input"
    ) as HTMLInputElement;
    const signInBtn = screen.getByTestId("sign-in-button");
    fireEvent.change(emailInput, { target: { value: "example@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "testpassword" },
    });
    fireEvent.click(signInBtn);
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByTestId("error-message").textContent).toBe(
        "Email is already in use"
      );
    });
  });
});
