import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  getInitialThemeMode,
  ThemeContext,
  THEME_STORAGE_KEY,
} from "@/lib/theme-store";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo(
    () => ({ themeMode, toggleTheme, setThemeMode }),
    [themeMode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
};
