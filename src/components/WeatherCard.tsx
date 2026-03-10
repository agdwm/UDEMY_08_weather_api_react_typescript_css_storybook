import type { ReactNode } from "react";

interface WeatherCardProps {
  title?: string;
  values?: string[];
  className?: string;
  children?: ReactNode;
}

const WeatherCard = ({
  title,
  values = [],
  className = "",
  children,
}: WeatherCardProps) => {
  return (
    <section className={`c-weather-card ${className}`.trim()}>
      {children ? (
        children
      ) : (
        <>
          {title && <h3 className="c-weather-card__heading">{title}</h3>}
          {values.map((value) => (
            <p key={value} className="c-weather-card__value">
              {value}
            </p>
          ))}
        </>
      )}
    </section>
  );
};

export default WeatherCard;
