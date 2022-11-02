import { render, cleanUp, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductList } from "../components/product/ProductList";

afterEach(() => {
  cleanUp();
});

test("should render test component", () => {
  render(<ProductList />);

  var textElm = screen.getByTestId("owner");

  expect(textElm).toBeInTheDocument();
});
