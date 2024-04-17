"use client";
import React from "react";
import { DARK_THEME, LIGHT_THEME } from "theme";

interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
  logoUrl: string;
  aboutUrl: string;
  aboutUrlSmall: string;
}

const DARK_THEME_CONTEXT_VALUE: ThemeContextValue = {
  theme: "dark",
  toggleTheme: () => {},
  logoUrl: "/images/logo.png",
  aboutUrl: "/images/pawan-2.png",
  aboutUrlSmall: "/images/pawan-small.png",
};

const LIGHT_THEME_CONTEXT_VALUE: ThemeContextValue = {
  theme: "light",
  toggleTheme: () => {},
  logoUrl: "/images/logo-light.png",
  aboutUrl: "/images/pawan-2-light.png",
  aboutUrlSmall: "/images/pawan-small-light.png",
};

const ThemeContext = React.createContext<ThemeContextValue>(
  DARK_THEME_CONTEXT_VALUE
);

interface Props extends React.PropsWithChildren<{}> {}

const ThemeProvider = ({ children }: Props) => {
  const [selectedTheme, setSelectedTheme] = React.useState(
    window.localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === "light" ? "dark" : "light");
  };

  const theme = selectedTheme === "light" ? LIGHT_THEME : DARK_THEME;
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.colors.primary);
    root.style.setProperty("--color-primary-hover", theme.colors.primaryHover);
    root.style.setProperty("--color-text-regular", theme.colors.text.regular);
    root.style.setProperty("--color-text-light", theme.colors.text.light);
    root.style.setProperty("--color-text-dark", theme.colors.text.dark);
    root.style.setProperty(
      "--color-background-light",
      theme.colors.background.light
    );
    root.style.setProperty(
      "--color-background-regular",
      theme.colors.background.regular
    );
    root.style.setProperty(
      "--color-background-dark",
      theme.colors.background.dark
    );
    root.style.setProperty(
      "--color-background-blur",
      theme.colors.background.blur
    );
    root.style.setProperty("--color-footer", theme.colors.footer);
    window.localStorage.setItem("theme", selectedTheme);
  }, [theme]);

  const value =
    selectedTheme === "light"
      ? LIGHT_THEME_CONTEXT_VALUE
      : DARK_THEME_CONTEXT_VALUE;

  return (
    <ThemeContext.Provider value={{ ...value, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => React.useContext(ThemeContext);

export { ThemeProvider, useTheme };
