/**
 * exportUtils.js - Enhanced vanilla JS utilities for data export (CSV, PNG via canvas, PDF placeholder).
 * No deps (except html2canvas for images), browser-native with error handling.
 * @version 2.0.0
 * @author ReactTailwind Pro Team
 */

// CSV Export with UTF-8 BOM for Excel compatibility
export const saveAsCSV = (filename, csvContent, delimiter = ",") => {
  try {
    const bom = "\uFEFF"; // UTF-8 BOM
    const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename || "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log(`Exported ${filename} successfully`);
  } catch (err) {
    console.error("CSV Export failed:", err);
    alert("Export failed. Please try again.");
  }
};

// PNG Export from DOM Element with options
export const saveAsImage = (element, filename, options = {}) => {
  const { scale = 2, backgroundColor = null, format = "png" } = options;
  if (!element) {
    console.error("No element provided for export");
    return;
  }
  html2canvas(element, {
    backgroundColor,
    scale,
    useCORS: true,
    allowTaint: true,
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.download = filename || "chart.png";
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
      console.log(`Image exported: ${filename}`);
    })
    .catch((err) => {
      console.error("Image Export failed:", err);
      alert("Image export failed. Ensure the element is visible.");
    });
};

// PDF Export Placeholder (requires jsPDF - add if needed)
export const saveAsPDF = (element, filename) => {
  // Placeholder: Integrate jsPDF for full PDF
  console.warn("PDF export: Add jsPDF dep for production");
  if (element) {
    saveAsImage(element, `${filename}.png`); // Fallback to image
  }
};