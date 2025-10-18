// jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows: expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Global Mocks for World-Class Testing - Expanded
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  };

Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver for animations
global.IntersectionObserver = jest.fn().mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});