import WeatherCard from "@/components/weather/WeatherCard";
import type { Weather } from "@/types/weather-interface";

interface WeatherResultProps {
  data: Weather;
}

const WeatherResult = ({ data }: WeatherResultProps) => {
  const iconUrl = data.current.condition.icon.startsWith("//")
    ? `https:${data.current.condition.icon}`
    : data.current.condition.icon;

  const metricCards = [
    {
      title: "Viento",
      values: [
        `${Math.round(data.current.wind_kph)} km/h`,
        data.current.wind_dir,
      ],
    },
    {
      title: "Humedad",
      values: [`${data.current.humidity}%`],
    },
    {
      title: "Presion",
      values: [`${Math.round(data.current.pressure_mb)} mb`],
    },
    {
      title: "Visibilidad",
      values: [`${Math.round(data.current.vis_km)} km`],
    },
  ];

  return (
    <article className="c-weather-result" aria-live="polite">
      <h3 className="c-weather-result__city">
        {data.location.name}, {data.location.country}
      </h3>

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
            Sensacion termica: {Math.round(data.current.feelslike_c)}º C
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
