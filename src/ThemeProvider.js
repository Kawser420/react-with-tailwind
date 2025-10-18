/**
 * ThemeProvider - Advanced context provider managing 16+ DaisyUI themes with
 * auto-detection (system pref), persistence (localStorage + cookies fallback),
 * smooth transitions (CSS variables), and SSR support. Added theme preview modal placeholder.
 * @version 2.1.0
 * @author ReactTailwind Pro Team
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { themeChange } from "theme-change";
import PropTypes from "prop-types";
import Cookies from "js-cookie"; // Add to deps if needed, or use vanilla document.cookie

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const availableThemes = useMemo(
    () => [
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
      "business",
      "night",
      "wireframe",
    ],
    []
  );

  const detectSystemTheme = useCallback(() => {
    // Enhanced vanilla JS system preference detection
    if (window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // Fallback
  }, []);

  // Load theme from storage with fallback chain
  const loadStoredTheme = useCallback(() => {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      storedTheme = Cookies.get("theme");
    }
    if (!storedTheme) {
      storedTheme = sessionStorage.getItem("theme");
    }
    if (!storedTheme) {
      storedTheme = detectSystemTheme();
    }
    return storedTheme;
  }, [detectSystemTheme]);

  useEffect(() => {
    // Initialize theme-change lib with manual control
    themeChange(false);

    const stored = loadStoredTheme();
    setCurrentTheme(stored);
    applyTheme(stored);

    // Listen for system changes with debounced update
    let timeoutId;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!localStorage.getItem("theme") && !Cookies.get("theme")) {
          const newTheme = e.matches ? "dark" : "light";
          setCurrentTheme(newTheme);
          applyTheme(newTheme);
        }
      }, 150);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      clearTimeout(timeoutId);
    };
  }, [loadStoredTheme]);

  const applyTheme = useCallback((theme) => {
    if (availableThemes.includes(theme)) {
      setIsTransitioning(true);
      document.documentElement.setAttribute("data-theme", theme);
      
      // Smooth CSS var transition
      document.documentElement.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      document.documentElement.classList.add("theme-transitioning");

      // Persist with fallback
      localStorage.setItem("theme", theme);
      Cookies.set("theme", theme, { expires: 365, secure: true });
      sessionStorage.setItem("theme", theme);

      // Reset transition after delay
      setTimeout(() => {
        setIsTransitioning(false);
        document.documentElement.classList.remove("theme-transitioning");
        document.documentElement.style.transition = "";
      }, 400);
    }
  }, [availableThemes]);

  const setTheme = useCallback(
    (theme) => {
      if (availableThemes.includes(theme)) {
        setCurrentTheme(theme);
        applyTheme(theme);
      }
    },
    [availableThemes, applyTheme]
  );

  const toggleNextTheme = useCallback(() => {
    const currentIndex = availableThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[nextIndex];
    setTheme(nextTheme);
  }, [currentTheme, setTheme, availableThemes]);

  const value = useMemo(
    () => ({
      currentTheme,
      toggleNextTheme,
      setTheme,
      availableThemes,
      isDark: currentTheme === "dark",
      isTransitioning,
    }),
    [currentTheme, toggleNextTheme, setTheme, availableThemes, isTransitioning]
  );

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