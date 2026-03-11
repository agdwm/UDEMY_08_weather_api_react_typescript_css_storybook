import WeatherCard from "@/components/weather/WeatherCard";
import type { Weather } from "@/types/weather-interface";
import { useIntl } from "react-intl";

interface WeatherResultProps {
  data: Weather;
}

const WeatherResult = ({ data }: WeatherResultProps) => {
  const intl = useIntl();

  const iconUrl = data.current.condition.icon.startsWith("//")
    ? `https:${data.current.condition.icon}`
    : data.current.condition.icon;

  const metricCards = [
    {
      title: intl.formatMessage({
        id: "weatherResult.wind",
        defaultMessage: "Wind",
      }),
      values: [
        `${Math.round(data.current.wind_kph)} km/h`,
        data.current.wind_dir,
      ],
    },
    {
      title: intl.formatMessage({
        id: "weatherResult.humidity",
        defaultMessage: "Humidity",
      }),
      values: [`${data.current.humidity}%`],
    },
    {
      title: intl.formatMessage({
        id: "weatherResult.pressure",
        defaultMessage: "Pressure",
      }),
      values: [`${Math.round(data.current.pressure_mb)} mb`],
    },
    {
      title: intl.formatMessage({
        id: "weatherResult.visibility",
        defaultMessage: "Visibility",
      }),
      values: [`${Math.round(data.current.vis_km)} km`],
    },
  ];

  return (
    <article
      className="c-weather-result"
      aria-live="polite"
      aria-labelledby="weather-result-city"
    >
      <h2 id="weather-result-city" className="c-weather-result__city">
        {data.location.name}, {data.location.country}
      </h2>

      <div className="c-weather-result__cards">
        <WeatherCard className="c-weather-card--condition">
          <img
            src={iconUrl}
            alt={data.current.condition.text}
            width={64}
            height={64}
            loading="lazy"
          />
          <p className="c-weather-card__title">{data.current.condition.text}</p>
        </WeatherCard>

        <WeatherCard className="c-weather-card--temperature">
          <p className="c-weather-card__temp">
            {Math.round(data.current.temp_c)}º C
          </p>
          <p className="c-weather-card__subtitle">
            {intl.formatMessage({
              id: "weatherResult.feelsLike",
              defaultMessage: "Feels like",
            })}
            : {Math.round(data.current.feelslike_c)}º C
          </p>
        </WeatherCard>

        {metricCards.map((card) => (
          <WeatherCard
            key={card.title}
            title={card.title}
            values={card.values}
          />
        ))}
      </div>
    </article>
  );
};

export default WeatherResult;
