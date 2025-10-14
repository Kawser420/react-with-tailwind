import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders navbar title", () => {
  render(<App />);
  const title = screen.getByText(/ReactTailwind Pro/i);
  expect(title).toBeInTheDocument();
});

test("pricing header appears", () => {
  render(<App />);
  const header = screen.getByText(/Select Your Best Plan/i);
  expect(header).toBeInTheDocument();
});
