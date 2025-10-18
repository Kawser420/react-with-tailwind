/**
 * reportWebVitals.js - Advanced web vitals reporting with thresholds, custom metrics,
 * alerts, and GA integration for world-class performance tracking.
 * @version 2.0.0
 * @author ReactTailwind Pro Team
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(
      ({ getCLS, getFID, getFCP, getLCP, getINP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getINP(onPerfEntry); // New: Interaction to Next Paint
        getTTFB(onPerfEntry);
      }
    );
  }
};

// Custom Metrics Reporting with GA Placeholder
const sendToAnalytics = (metric) => {
  // Placeholder for GA4 or custom endpoint
  if (typeof gtag !== 'undefined') {
    gtag('event', 'web_vital', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  console.group(`%c${metric.name}: ${metric.value}ms`, 'color: #3b82f6; font-weight: bold;');
  console.log('Label:', metric.label || 'N/A');
  console.log('ID:', metric.id || 'N/A');
  console.groupEnd();
};

// Thresholds for Alerts - Expanded
const VITALS_THRESHOLDS = {
  LCP: 2500, // ms
  FID: 100,
  INP: 200,
  CLS: 0.1,
  FCP: 1800,
  TTFB: 600,
};

const sendToAnalyticsWithThresholds = (metric) => {
  sendToAnalytics(metric);
  if (metric.name in VITALS_THRESHOLDS && metric.value > VITALS_THRESHOLDS[metric.name]) {
    console.error(`Threshold exceeded: ${metric.name} = ${metric.value} (limit: ${VITALS_THRESHOLDS[metric.name]})`);
    // Email/Slack alert placeholder
    if (process.env.NODE_ENV === 'production') {
      // fetch('/api/alert', { method: 'POST', body: JSON.stringify(metric) });
    }
  }
};

export default reportWebVitals;
export { sendToAnalytics, sendToAnalyticsWithThresholds, VITALS_THRESHOLDS };