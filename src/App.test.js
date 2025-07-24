// App.test.js

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/advanced progress bar component/i);
  expect(headingElement).toBeInTheDocument();
});
