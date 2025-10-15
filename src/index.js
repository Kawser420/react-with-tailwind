/**
 * index.js - Entry point with React 18 concurrent features, error logging,
 * performance vitals, and theme init. World-class bootstrap.
 * @version 3.0.0
 */
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // New for PWA

const root = createRoot(document.getElementById("root"));

// StrictMode for double renders (dev only)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Performance Monitoring
reportWebVitals(console.log);

// PWA Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    serviceWorkerRegistration.register();
  });
}

// Global Error Handler
window.addEventListener("error", (event) => {
  console.error("Global Error:", event.error);
});

// Unhandled Promise Rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Rejection:", event.reason);
});

export default root;
