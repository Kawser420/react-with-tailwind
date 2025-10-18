/**
 * App.test.js - Comprehensive Jest tests for world-class code quality.
 * Covers rendering, interactions, accessibility, edge cases, and new features like mega nav/transitions.
 * @version 2.0.0
 */
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";

describe("App Integration Tests", () => {
  test("renders core components without crashing", () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/ReactTailwind Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/Unlock World-Class UI Power/i)).toBeInTheDocument();
  });

  test("navbar title and toggle interact correctly", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );
    const title = screen.getByText(/ReactTailwind Pro/i);
    expect(title).toBeInTheDocument();

    // Simulate theme toggle click
    const toggleButton = screen.getByLabelText(/Switch to next theme/i);
    fireEvent.click(toggleButton);
    await waitFor(() => expect(toggleButton).toHaveAttribute("title", /Current: (dark|light)/i));
  });

  test("pricing header and cards render with interactions", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );
    const header = screen.getByText(/Unlock World-Class UI Power/i);
    expect(header).toBeInTheDocument();

    const cards = screen.getAllByRole("button", { name: /Buy Plan/i });
    expect(cards).toHaveLength(3);

    // Simulate purchase - expect confetti log or state change
    fireEvent.click(cards[0]);
    await waitFor(() => expect(screen.getByText(/Processing.../i)).toBeInTheDocument());
  });

  test("charts lazy load and display data", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Wait for lazy components
    await waitFor(() => {
      expect(screen.getByText(/Assignment Marks Progress/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone Price & Rating Comparison/i)).toBeInTheDocument();
    });
  });

  test("footer subscription form validates and submits", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const submitButton = screen.getByRole("button", { name: /Subscribe/i });

    // Invalid email
    fireEvent.change(emailInput, { target: { value: "invalid" } });
    fireEvent.submit(emailInput.closest("form"));
    await waitFor(() => expect(screen.getByText(/Please enter a valid email./i)).toBeInTheDocument());

    // Valid email
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.submit(emailInput.closest("form"));
    await waitFor(() => expect(screen.getByText(/Subscribed Successfully!/i)).toBeInTheDocument());
  });

  test("error boundary catches and displays gracefully", async () => {
    // Mock error in a component (for test, use a faulty child)
    const FaultyComponent = () => { throw new Error("Test error"); };
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ThemeProvider>
        <MemoryRouter>
          <ErrorBoundary>
            <FaultyComponent />
          </ErrorBoundary>
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/Oops! Something Went Wrong/i)).toBeInTheDocument();
    const retryButton = screen.getByRole("button", { name: /Retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  test("responsive mobile menu opens/closes with backdrop", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Simulate mobile toggle
    const mobileToggle = screen.getByLabelText(/Open menu/i); // Updated ARIA
    fireEvent.click(mobileToggle);
    await waitFor(() => expect(screen.getByTestId("mobile-menu")).toBeVisible());

    const closeButton = screen.getByLabelText(/Close menu/i);
    fireEvent.click(closeButton);
    await waitFor(() => expect(screen.queryByTestId("mobile-menu")).not.toBeVisible());
  });

  test("mega menu appears on hover for desktop", async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Mock hover on Product link
    const productLink = screen.getByText(/Product/i);
    fireEvent.mouseEnter(productLink);
    await waitFor(() => expect(screen.getByText(/Overview/i)).toBeInTheDocument()); // Subitem
  });

  test("theme toggle cycles through available themes", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    const toggleButton = screen.getByLabelText(/Switch to next theme/i);
    fireEvent.click(toggleButton);
    await waitFor(() => {
      // Expect class change or title update
      expect(document.documentElement).toHaveAttribute("data-theme", expect.stringMatching(/^(light|dark|cupcake)$/));
    });
  });
});