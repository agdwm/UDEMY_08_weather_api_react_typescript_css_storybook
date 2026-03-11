import Switch from "@/components/ui/Switch";

interface HeaderProps {
  title: string;
  subtitle: string;
  currentTheme: "light" | "dark";
  onToggleTheme: () => void;
}

const Header = ({
  title,
  subtitle,
  currentTheme,
  onToggleTheme,
}: HeaderProps) => {
  const isDarkMode = currentTheme === "dark";

  return (
    <header className="c-app-header">
      <div className="u-container c-app-header__inner">
        <Switch
          checked={isDarkMode}
          onCheckedChange={onToggleTheme}
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
