import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
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

  const localeOptions = [
    { value: "es", id: "language.es", defaultMessage: "Spanish" },
    { value: "en", id: "language.en", defaultMessage: "English" },
  ] as const;

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    if (nextLocale === "es" || nextLocale === "en") {
      setLocale(nextLocale);
    }
  };

  return (
    <header className="c-app-header">
      <div className="u-container c-app-header__inner">
        <div className="u-flex-row c-app-header__controls">
          <Label
            className="c-app-header__language"
            htmlFor="header-language-select"
          >
            <span className="u-visually-hidden">
              {intl.formatMessage({
                id: "language.label",
                defaultMessage: "Language",
              })}
            </span>

            <Select
              id="header-language-select"
              className="c-app-header__language-select u-focus-ring"
              value={locale}
              onChange={handleLocaleChange}
              aria-label={intl.formatMessage({
                id: "language.label",
                defaultMessage: "Language",
              })}
            >
              {localeOptions.map(({ value, id, defaultMessage }) => (
                <option key={value} value={value}>
                  {intl.formatMessage({ id, defaultMessage })}
                </option>
              ))}
            </Select>
          </Label>
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
        </div>

        <h1 className="c-app-header__title">{title}</h1>
        <p className="c-app-header__subtitle">{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
