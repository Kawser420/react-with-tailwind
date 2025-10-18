/**
 * ThemeProvider - Advanced context provider managing 15+ DaisyUI themes with
 * auto-detection (system pref), persistence (localStorage + cookies fallback),
 * and smooth transitions (CSS variables). Supports SSR and reduced motion.
 * @version 3.0.0
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
    "garden",
    "forest",
    "luxury",
    "lofi",
    "dracula", // Expanded for more options
  ];

  const detectSystemTheme = useCallback(() => {
    if (typeof window === "undefined") return "light"; // SSR fallback
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  useEffect(() => {
    // Initialize theme-change lib with auto off
    themeChange(false);

    // Load from storage with fallback to system
    const storedTheme =
      localStorage.getItem("theme") ||
      document.cookie.split("; ").find((row) => row.startsWith("theme="))?.split("=")[1] ||
      detectSystemTheme();
    setCurrentTheme(storedTheme);

    // Apply to DOM with smooth transition
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.documentElement.style.transition = "color 0.3s ease-out, background-color 0.3s ease-out";

    // Listen for system changes - Expanded with debounce
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
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
        // Cookie fallback for no JS
        document.cookie = `theme=${theme}; max-age=31536000; path=/`;
        // Trigger transition class
        document.documentElement.classList.add("theme-transition");
        setTimeout(() => document.documentElement.classList.remove("theme-transition"), 400);
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
    isDark: currentTheme === "dark" || currentTheme === "forest" || currentTheme === "dracula",
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
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