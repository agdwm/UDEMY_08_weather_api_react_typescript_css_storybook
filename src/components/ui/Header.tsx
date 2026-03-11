import Switch from "@/components/ui/Switch";
import { useTheme } from "@/lib/use-theme";
import { useI18n } from "@/lib/use-i18n";
import type { ChangeEvent } from "react";
import { useIntl } from "react-intl";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const intl = useIntl();
  const { themeMode, toggleTheme } = useTheme();
  const { locale, setLocale } = useI18n();
  const isDarkMode = themeMode === "dark";

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    if (nextLocale === "es" || nextLocale === "en") {
      setLocale(nextLocale);
    }
  };

  return (
    <header className="c-app-header">
      <div className="u-container c-app-header__inner">
        <label
          className="c-app-header__language"
          htmlFor="header-language-select"
        >
          <span className="u-visually-hidden">
            {intl.formatMessage({
              id: "language.label",
              defaultMessage: "Language",
            })}
          </span>
          <select
            id="header-language-select"
            className="c-app-header__language-select u-focus-ring"
            value={locale}
            onChange={handleLocaleChange}
            aria-label={intl.formatMessage({
              id: "language.label",
              defaultMessage: "Language",
            })}
          >
            <option value="es">
              {intl.formatMessage({
                id: "language.es",
                defaultMessage: "Spanish",
              })}
            </option>
            <option value="en">
              {intl.formatMessage({
                id: "language.en",
                defaultMessage: "English",
              })}
            </option>
          </select>
        </label>
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className="c-app-header__theme-switch u-focus-ring"
          aria-label={intl.formatMessage({
            id: "theme.toggleLabel",
            defaultMessage: "Toggle dark mode",
          })}
          onIcon="🌙"
          offIcon="☀️"
          screenReaderLabel={
            isDarkMode
              ? intl.formatMessage({
                  id: "theme.darkEnabled",
                  defaultMessage: "Dark mode enabled",
                })
              : intl.formatMessage({
                  id: "theme.lightEnabled",
                  defaultMessage: "Light mode enabled",
                })
          }
        />
        <h1 className="c-app-header__title">{title}</h1>
        <p className="c-app-header__subtitle">{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
