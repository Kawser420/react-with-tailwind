/**
 * exportUtils.js - Vanilla JS utilities for data export (CSV, PNG via canvas).
 * No deps, browser-native.
 */

// CSV Export
export const saveAsCSV = (filename, csvContent) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// PNG Export from DOM Element (Canvas)
export const saveAsImage = (element, filename) => {
  html2canvas(element, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    allowTaint: true,
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
    .catch((err) => console.error("Export failed:", err));
};
