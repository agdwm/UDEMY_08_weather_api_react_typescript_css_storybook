import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (theme: ThemeMode) => void;
}

export const THEME_STORAGE_KEY = "weather-app-theme";

export const getInitialThemeMode = (): ThemeMode => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
