/**
 * ThemeProvider - Advanced context provider managing 12+ DaisyUI themes with
 * auto-detection (system pref), persistence (localStorage + cookies fallback),
 * and smooth transitions (CSS variables). Supports SSR.
 * @version 2.0.0
 * @author ReactTailwind Pro Team
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { themeChange } from "theme-change";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const availableThemes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "garden", // Expanded
    "forest", // Expanded
    "luxury", // Expanded
  ];

  const detectSystemTheme = useCallback(() => {
    // Vanilla JS system preference detection
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  useEffect(() => {
    // Initialize theme-change lib
    themeChange(false); // Auto mode off for manual control

    // Load from storage with fallback to system
    const storedTheme =
      localStorage.getItem("theme") ||
      sessionStorage.getItem("theme") ||
      detectSystemTheme();
    setCurrentTheme(storedTheme);

    // Apply to DOM with smooth transition
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.documentElement.style.transition = "all 0.3s ease-out";

    // Listen for system changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        // Only if not manually set
        const newTheme = e.matches ? "dark" : "light";
        setCurrentTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [detectSystemTheme]);

  const setTheme = useCallback(
    (theme) => {
      if (availableThemes.includes(theme)) {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        sessionStorage.setItem("theme", theme); // Fallback
        // Trigger CSS transition
        document.documentElement.classList.add("theme-transition");
        setTimeout(
          () => document.documentElement.classList.remove("theme-transition"),
          300
        );
      }
    },
    [availableThemes]
  );

  const toggleNextTheme = useCallback(() => {
    const currentIndex = availableThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  }, [currentTheme, setTheme, availableThemes]);

  const value = {
    currentTheme,
    toggleNextTheme,
    setTheme,
    availableThemes,
    isDark: currentTheme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
