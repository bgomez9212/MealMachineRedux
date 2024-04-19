import { render, fireEvent } from "@testing-library/react";
import { LandingPage } from "./LandingPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("LandingPage component", () => {
  const landing = (
    <Router>
      <LandingPage />
    </Router>
  );
  it("renders Login component by default", () => {
    const { getByTestId } = render(landing);
    const loginComponent = getByTestId("login-component");
    expect(loginComponent).toBeInTheDocument();
  });

  it('renders Signup component when "Sign Up" button is clicked', () => {
    const { getByTestId } = render(landing);
    const signUpButton = getByTestId("sign-up-button");
    fireEvent.click(signUpButton);
    const signupComponent = getByTestId("sign-up-component");
    expect(signupComponent).toBeInTheDocument();
  });
});
