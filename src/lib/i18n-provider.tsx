import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import {
  getInitialLocale,
  getMessagesByLocale,
  I18N_STORAGE_KEY,
  I18nContext,
} from "@/lib/i18n-store";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState(getInitialLocale);

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    localStorage.setItem(I18N_STORAGE_KEY, locale);
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prevLocale) => (prevLocale === "es" ? "en" : "es"));
  }, []);

  const contextValue = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, toggleLocale],
  );

  return (
    <I18nContext.Provider value={contextValue}>
      <IntlProvider locale={locale} messages={getMessagesByLocale(locale)}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};
