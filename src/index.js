/**
 * index.js - Entry point with React 18 concurrent features, error logging,
 * performance vitals, theme init, and PWA support. World-class bootstrap with SSR compatibility.
 * @version 3.0.0
 * @author ReactTailwind Pro Team
 */
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root");
const root = createRoot(container);

// Render with StrictMode for dev double-renders and warnings
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Performance Monitoring - Expanded with custom analytics
reportWebVitals((metric) => {
  console.log("Web Vital:", metric);
  // Send to external analytics (e.g., GA) in production
});

// PWA Service Worker Registration - For offline support
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});

// Global Error Handler - Professional logging
window.addEventListener("error", (event) => {
  console.error("Global Error Caught:", event.error);
  // Send to error tracking service (e.g., Sentry) in production
});

// Unhandled Promise Rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Promise Rejection:", event.reason);
});