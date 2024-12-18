import { createContext, useState, useEffect } from "react";

// Create the context
export const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Use system preference or default to light
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Effect to update the DOM and store the theme in localStorage
  useEffect(() => {
    const root = document.documentElement; // Target the <html> element
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Store preference in localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
