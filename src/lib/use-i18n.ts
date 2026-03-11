import { useContext } from "react";
import { I18nContext } from "@/lib/i18n-store";
import type { I18nContextValue } from "@/lib/i18n-store";

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
};
