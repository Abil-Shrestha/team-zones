import { useEffect, useState } from "react";

function getCurrentColorScheme() {
  if (!window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useCurrentColorScheme() {
  const [currentDarkMode, setCurrentDarkMode] = useState(getCurrentColorScheme);

  useEffect(() => {
    function handleColorSchemeChange(event) {
      const newColorScheme = event.matches ? "dark" : "light";
      setCurrentDarkMode(newColorScheme);
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, []);

  useEffect(() => {
    // change meta theme color
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (currentDarkMode === "dark") {
      metaThemeColor.setAttribute("content", "#0c0c0c");
    } else {
      metaThemeColor.setAttribute("content", "#F5F6F8");
    }
  }, [currentDarkMode]);

  return currentDarkMode;
}
