// import { render, screen, fireEvent } from "vitest";
// import LandingPage from "../pages/LandingPage";

// // Mocking useState hook
// vi.mock("react", () => ({
//   ...vi.requireActual("react"),
//   useState: vi.fn(),
// }));

// describe("LandingPage Component", () => {
//   beforeEach(() => {
//     // Mocking useState initial state and setState function
//     useState.mockImplementation(() => [true, vi.fn()]);
//   });

//   it("renders Login component by default", () => {
//     render(<LandingPage />);
//     const loginComponent = screen.getByTestId("login-component");
//     expect(loginComponent).toBeInTheDocument();
//   });

//   it("renders Signup component when clicking on the signup button", () => {
//     render(<LandingPage />);
//     const signupButton = screen.getByTestId("signup-button");
//     fireEvent.click(signupButton);
//     const signupComponent = screen.getByTestId("signup-component");
//     expect(signupComponent).toBeInTheDocument();
//   });

//   it("toggles between Login and Signup components when clicking on the toggle button", () => {
//     render(<LandingPage />);
//     const toggleButton = screen.getByTestId("toggle-button");

//     fireEvent.click(toggleButton);
//     let signupComponent = screen.getByTestId("signup-component");
//     expect(signupComponent).toBeInTheDocument();

//     fireEvent.click(toggleButton);
//     const loginComponent = screen.getByTestId("login-component");
//     expect(loginComponent).toBeInTheDocument();
//   });
// });
