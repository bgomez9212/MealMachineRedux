import { render, fireEvent } from "@testing-library/react";
import { LandingPage } from "./LandingPage";
import { BrowserRouter as Router } from "react-router-dom";
import { vi } from "vitest";

// Mock authenticateUser function
const mockAuthenticateUser = vi.fn();

describe("LandingPage component", () => {
  it("renders Login component by default", () => {
    const { getByTestId } = render(
      <Router>
        <LandingPage authenticateUser={mockAuthenticateUser} />
      </Router>
    );
    const loginComponent = getByTestId("login-component");
    expect(loginComponent).toBeInTheDocument();
  });

  it('renders Signup component when "Sign Up" button is clicked', () => {
    const { getByTestId } = render(
      <Router>
        <LandingPage authenticateUser={mockAuthenticateUser} />
      </Router>
    );
    const signUpButton = getByTestId("sign-up-button");
    fireEvent.click(signUpButton);
    const signupComponent = getByTestId("sign-up-component");
    expect(signupComponent).toBeInTheDocument();
  });
});
