import { createContext } from "react";
import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";

export type Locale = "es" | "en";

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const I18N_STORAGE_KEY = "weather-app-locale";

const messagesByLocale = {
  es: esMessages,
  en: enMessages,
};

export const getMessagesByLocale = (locale: Locale) => messagesByLocale[locale];

export const getInitialLocale = (): Locale => {
  const savedLocale = localStorage.getItem(I18N_STORAGE_KEY);

  if (savedLocale === "es" || savedLocale === "en") {
    return savedLocale;
  }

  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
};

export const I18nContext = createContext<I18nContextValue | null>(null);
