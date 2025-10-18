/**
 * exportUtils.js - Vanilla JS utilities for data export (CSV, PNG via canvas).
 * No deps, browser-native. Expanded with headers, quality, error handling.
 * @version 3.0.0
 */

// CSV Export - Expanded with optional headers
export const saveAsCSV = (filename, csvContent, headers = "") => {
  const blob = new Blob([headers + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("CSV download not supported in this browser.");
  }
};

// PNG Export from DOM Element (Canvas) - Expanded with scale and error
// export const saveAsImage = (element, filename) => {
//   if (!element) return console.error("Element not found for export.");
//   // html2canvas(element, {
//     backgroundColor: null,
//     scale: 3, // Higher quality
//     useCORS: true,
//     allowTaint: true,
//     logging: false,
//   })
//     .then((canvas) => {
//       const link = document.createElement("a");
//       link.download = filename;
//       link.href = canvas.toDataURL("image/png", 1.0); // Max quality
//       link.click();
//     })
//     .catch((err) => console.error("Image Export Failed:", err));
// };