// /**
//  * App.test.js - Advanced Jest tests for world-class code quality.
//  * Covers rendering, interactions, accessibility, edge cases, and responsiveness.
//  * Uses testing-library for best practices.
//  */
// import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
// import App from "./App";
// import { ThemeProvider } from "./ThemeProvider";

// describe("App Integration Tests - Expanded for Full Coverage", () => {
//   test("renders core components without crashing and checks accessibility", () => {
//     render(
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     );
//     expect(screen.getByText(/ReactTailwind Pro/i)).toBeInTheDocument();
//     expect(screen.getByText(/Welcome to ReactTailwind Pro/i)).toBeInTheDocument();
//     // Accessibility check
//     expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Welcome/i);
//   });

//   test("navbar title, toggle, and mobile menu interact correctly", async () => {
//     render(
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     );
//     const title = screen.getByText(/ReactTailwind Pro/i);
//     expect(title).toBeInTheDocument();

//     // Theme toggle
//     const themeToggle = screen.getByLabelText(/Switch to next theme/i);
//     fireEvent.click(themeToggle);
//     await waitFor(() => expect(document.documentElement).toHaveAttribute("data-theme", expect.any(String)));

//     // Mobile menu toggle
//     const mobileToggle = screen.getByRole("button", { name: /Open menu/i });
//     fireEvent.click(mobileToggle);
//     await waitFor(() => expect(screen.getByRole("navigation")).toBeVisible());
//     const closeButton = screen.getByRole("button", { name: /Close menu/i });
//     fireEvent.click(closeButton);
//     await waitFor(() => expect(screen.queryByRole("navigation")).not.toBeVisible());
//   });

//   test("pricing hero, toggle, and cards render and interact", async () => {
//     render(
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     );
//     const header = screen.getByText(/Unlock World-Class UI Power/i);
//     expect(header).toBeInTheDocument();

//     // Yearly toggle
//     const yearlyToggle = screen.getByRole("switch", { name: /Toggle yearly/i }); // Assume ARIA
//     fireEvent.click(yearlyToggle);
//     await waitFor(() => expect(screen.getByText(/Save 17%/i)).toBeInTheDocument());

//     const buyButtons = screen.getAllByRole("button", { name: /Buy Plan Now/i });
//     expect(buyButtons).toHaveLength(3);
//     act(() => fireEvent.click(buyButtons[0]));
//     await waitFor(() => expect(screen.getByText(/Processing.../i)).toBeInTheDocument());
//   });

//   test("charts lazy load, display data, and handle filters/exports", async () => {
//     render(
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     );

//     // Wait for lazy components
//     await waitFor(() => {
//       expect(screen.getByText(/Assignment Marks Progress/i)).toBeInTheDocument();
//       expect(screen.getByText(/Phone Price & Rating Comparison/i)).toBeInTheDocument();
//     });

//     // Filter interaction (PhoneBar example)
//     const filterSelect = screen.getByLabelText(/Filter by metric/i);
//     fireEvent.change(filterSelect, { target: { value: "rating" } });
//     await waitFor(() => expect(filterSelect).toHaveValue("rating"));

//     // Export button
//     const exportButton = screen.getByLabelText(/Export chart/i);
//     fireEvent.click(exportButton);
//   });

//   test("footer subscription form validates, submits, and triggers confetti", async () => {
//     render(
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     );

//     const emailInput = screen.getByPlaceholderText(/Enter your email for exclusive updates/i);
//     const submitButton = screen.getByRole("button", { name: /Subscribe/i });

//     // Invalid email
//     fireEvent.change(emailInput, { target: { value: "invalid" } });
//     fireEvent.submit(submitButton.closest("form"));
//     await waitFor(() => expect(screen.getByText(/Please enter a valid email./i)).toBeInTheDocument());

//     // Valid email with confetti simulation
//     fireEvent.change(emailInput, { target: { value: "user@example.com" } });
//     fireEvent.submit(submitButton.closest("form"));
//     await waitFor(() => expect(screen.getByText(/Subscribed Successfully!/i)).toBeInTheDocument());
//   });

//   test("error boundary catches and displays gracefully with retry", async () => {
//     // Mock error in a component
//     jest.spyOn(console, "error").mockImplementation(() => {});
//     const ThrowError = () => { throw new Error("Test Error"); };
//     render(
//       <ThemeProvider>
//         <ErrorBoundary>
//           <ThrowError />
//         </ErrorBoundary>
//       </ThemeProvider>
//     );
//     await waitFor(() => expect(screen.getByText(/Oops! Something Went Wrong/i)).toBeInTheDocument());
//     const retryButton = screen.getByRole("button", { name: /Retry/i });
//     fireEvent.click(retryButton);
//     // Assume retry logic clears error
//   });

//   test("responsiveness: checks mobile vs desktop layouts", () => {
//     // Mock mobile viewport
//     global.innerWidth = 500;
//     render(
//       <ThemeProvider>
//         <App />
//       </ThemeProvider>
//     );
//     expect(screen.getByRole("button", { name: /Open menu/i })).toBeVisible(); // Mobile toggle

//     // Mock desktop
//     global.innerWidth = 1024;
//     fireEvent.resize(window);
//     expect(screen.queryByRole("button", { name: /Open menu/i })).not.toBeInTheDocument();
//   });
// });