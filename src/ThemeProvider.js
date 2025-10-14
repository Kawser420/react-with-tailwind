/**
 * ThemeProvider - Manages 10 DaisyUI themes with persistence.
 * Uses React Context for state, vanilla JS for DOM/localStorage.
 * @author Your Name
 * @version 1.0.0
 */
import React, { createContext, useContext, useEffect, useState } from "react";
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
  ];

  useEffect(() => {
    // Initialize theme-change with vanilla JS fallback
    themeChange(false);
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    // Vanilla JS DOM update for immediate effect
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const setTheme = (theme) => {
    if (availableThemes.includes(theme)) {
      setCurrentTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  };

  const toggleNextTheme = () => {
    const currentIndex = availableThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, toggleNextTheme, availableThemes }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
