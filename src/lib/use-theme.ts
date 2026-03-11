import { useContext } from "react";
import { ThemeContext } from "@/lib/theme-store";
import type { ThemeContextValue } from "@/lib/theme-store";

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
