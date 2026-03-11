import Switch from "@/components/ui/Switch";
import { useTheme } from "@/lib/use-theme";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  const { themeMode, toggleTheme } = useTheme();
  const isDarkMode = themeMode === "dark";

  return (
    <header className="c-app-header">
      <div className="u-container c-app-header__inner">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className="c-app-header__theme-switch u-focus-ring"
          aria-label="Toggle dark mode"
          onIcon="🌙"
          offIcon="☀️"
          screenReaderLabel={
            isDarkMode ? "Dark mode enabled" : "Light mode enabled"
          }
        />
        <h1 className="c-app-header__title">{title}</h1>
        <p className="c-app-header__subtitle">{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
