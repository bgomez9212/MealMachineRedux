import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders app component", () => {
    render(<App />);
    expect(screen.getByTestId("app-loader")).toBeInTheDocument();
  });
  // it("navigates to landing page without no user auth", async () => {
  //   render(<App />);
  //   await waitFor(() =>
  //     expect(screen.getByTestId("landing-page")).toBeInTheDocument()
  //   );
  // });
});
