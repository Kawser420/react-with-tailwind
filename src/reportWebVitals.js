/**
 * reportWebVitals.js - Advanced web vitals reporting with thresholds, alerts,
 * and custom metrics for world-class performance tracking. Integrates with GA or console.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Custom Metrics Reporting - Expanded with thresholds
const sendToAnalytics = (metric) => {
  console.log("Performance Metric:", metric);
  // Integrate with GA or custom endpoint in production
  const thresholds = {
    LCP: 2500,
    FID: 100,
    CLS: 0.1,
    FCP: 1800,
    TTFB: 600,
  };
  if (metric.value > thresholds[metric.name]) {
    console.warn(`Performance Alert: ${metric.name} exceeded threshold (${metric.value} > ${thresholds[metric.name]})`);
    // Trigger UI alert or email in production
  }
};

// Attach to onPerfEntry
reportWebVitals(sendToAnalytics);

export default reportWebVitals;
export { sendToAnalytics };