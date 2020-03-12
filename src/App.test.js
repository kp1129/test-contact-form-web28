import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders App without crashing", () => {
  render(<App />);
});

test('just double checking that the App component is visible', () => {
  // arrange
  const {getByTestId} = render(<App />);
  // act
  const app = getByTestId("test-app");
  // assert
  expect(app).toBeVisible();
  expect(app).toBeInTheDocument();
})