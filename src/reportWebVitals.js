/**
 * reportWebVitals.js - Advanced web vitals reporting with thresholds, alerts,
 * and custom metrics for world-class performance tracking.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB, getFCP }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      }
    );
  }
};

// Custom Metrics Reporting
const sendToAnalytics = (metric) => {
  // Placeholder for GA or custom endpoint
  console.log("Custom Metric:", metric);
  if (metric.name === "CLS" && metric.value > 0.1) {
    alert("Cumulative Layout Shift detected – optimize reflows!"); // Dev alert
  }
};

// Thresholds for Alerts
const VITALS_THRESHOLDS = {
  LCP: 2500,
  FID: 100,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 600,
};

export default reportWebVitals;
export { sendToAnalytics, VITALS_THRESHOLDS };
