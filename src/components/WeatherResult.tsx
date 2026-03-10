import type { Weather } from "@/types/weather-interface";

interface WeatherResultProps {
  data: Weather;
}

const WeatherResult = ({ data }: WeatherResultProps) => {
  const iconUrl = data.current.condition.icon.startsWith("//")
    ? `https:${data.current.condition.icon}`
    : data.current.condition.icon;

  return (
    <article className="c-weather-result" aria-live="polite">
      <h2 className="c-weather-result__city">
        {data.location.name}, {data.location.region}
      </h2>

      <div className="c-weather-result__cards">
        <section className="c-weather-card c-weather-card--condition">
          <img
            src={iconUrl}
            alt={data.current.condition.text}
            width={64}
            height={64}
            loading="lazy"
          />
          <p className="c-weather-card__title">{data.current.condition.text}</p>
        </section>

        <section className="c-weather-card c-weather-card--temperature">
          <p className="c-weather-card__temp">
            {Math.round(data.current.temp_c)}º C
          </p>
          <p className="c-weather-card__subtitle">
            Sensacion termica: {Math.round(data.current.feelslike_c)}º C
          </p>
        </section>

        <section className="c-weather-card">
          <h3 className="c-weather-card__heading">Viento</h3>
          <p className="c-weather-card__value">
            {Math.round(data.current.wind_kph)} km/h
          </p>
          <p className="c-weather-card__value">{data.current.wind_dir}</p>
        </section>

        <section className="c-weather-card">
          <h3 className="c-weather-card__heading">Humedad</h3>
          <p className="c-weather-card__value">{data.current.humidity}%</p>
        </section>

        <section className="c-weather-card">
          <h3 className="c-weather-card__heading">Presión</h3>
          <p className="c-weather-card__value">
            {Math.round(data.current.pressure_mb)} mb
          </p>
        </section>

        <section className="c-weather-card">
          <h3 className="c-weather-card__heading">Visibilidad</h3>
          <p className="c-weather-card__value">
            {Math.round(data.current.vis_km)} km
          </p>
        </section>
      </div>
    </article>
  );
};

export default WeatherResult;
