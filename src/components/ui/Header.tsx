interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="c-app-header">
      <div className="u-container c-app-header__inner">
        <h1 className="c-app-header__title">{title}</h1>
        <p className="c-app-header__subtitle">{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
