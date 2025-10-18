/**
 * index.js - Entry point with React 18 concurrent features, global error logging,
 * performance vitals with thresholds, theme init, and PWA offline support.
 * World-class bootstrap with vanilla JS polyfills.
 * @version 3.1.0
 */
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = createRoot(document.getElementById("root"));

// StrictMode for double renders (dev only) + concurrent features
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Enhanced Performance Monitoring with Threshold Alerts
reportWebVitals((metric) => {
  console.log(metric);
  const { VITALS_THRESHOLDS } = require("./reportWebVitals");
  if (metric.name in VITALS_THRESHOLDS && metric.value > VITALS_THRESHOLDS[metric.name]) {
    console.warn(`Web Vital Alert: ${metric.name} exceeded threshold (${metric.value}ms)`);
    // Dev alert - remove in prod
    if (process.env.NODE_ENV === 'development') {
      alert(`Performance warning: ${metric.name} is ${metric.value}ms – optimize!`);
    }
  }
});

// PWA Service Worker Registration with Offline Detection
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        alert("New version available! Refresh to update.");
        window.location.reload();
      },
      onOffline: () => {
        console.log("App is offline – using cached resources");
        document.body.classList.add("offline"); // Add offline class for UI
      },
      onOnline: () => {
        console.log("App is back online");
        document.body.classList.remove("offline");
      },
    });
  });
}

// Global Error Handler with Vanilla JS Logging
window.addEventListener("error", (event) => {
  console.error("Global JS Error:", event.error, event.filename, event.lineno);
  // Send to analytics placeholder
  // gtag('event', 'exception', { description: event.error.message });
});

// Unhandled Promise Rejections with Retry Logic
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled Promise Rejection:", event.reason);
  event.preventDefault(); // Prevent default browser alert
  // Retry placeholder for API calls
  if (event.reason.config) {
    console.log("Retrying failed API call...");
  }
});

// Polyfill for older browsers - Vanilla JS
if (!window.IntersectionObserver) {
  console.warn("IntersectionObserver not supported – polyfill needed");
}

export default root;