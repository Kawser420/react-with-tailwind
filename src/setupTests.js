// jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows: expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Global Mocks for World-Class Testing
global.matchMedia =
  global.matchMedia ||
  (() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});
