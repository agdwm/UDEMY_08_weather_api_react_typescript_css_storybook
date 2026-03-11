import { clsx } from "clsx";
import Card from "@/components/ui/Card";
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
  const weatherCardClasses = clsx("c-weather-card", className);

  return (
    <Card as="section" className={weatherCardClasses}>
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
    </Card>
  );
};

export default WeatherCard;
