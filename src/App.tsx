import type { Weather } from "@/types/weather-interface";
import { env } from "@/lib/env";
import { useState } from "react";

const App = () => {
  const [outputWeather, setOutputWeather] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Se encarga solo de consultar la API y devolver los datos del clima.
  const fetchWeather = async (city: string): Promise<Weather> => {
    const endpointPath = "/current.json";
    const requestUrl = `${env.apiRootUrl}${endpointPath}?key=${env.apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data: Weather = await response.json();
    return data;
  };

  // Gestiona el envío del formulario y actualiza el estado de la UI.
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedCity = city.trim();

    if (!normalizedCity) {
      setOutputWeather("Introduce una ciudad válida.");
      return;
    }

    setIsLoading(true);

    try {
      setOutputWeather("Cargando datos...");
      const data = await fetchWeather(normalizedCity);
      setOutputWeather(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setOutputWeather(`Error on fetching weather, ${error.message}`);
      } else {
        setOutputWeather("Unknown error on fetching weather");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="u-container">
      <section className="u-flow">
        <h1>API Rest Practice</h1>
        <form action="" onSubmit={handleSubmit} className="u-flow">
          <label htmlFor="city-input" className="u-inline">
            Ciudad:
          </label>
          <input
            id="city-input"
            type="text"
            value={city}
            name="city"
            placeholder="Madrid"
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="u-btn u-focus-ring u-inline"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Obtener clima"}
          </button>
        </form>
        {outputWeather.trim().length > 0 && <pre>{outputWeather}</pre>}
      </section>
    </main>
  );
};

export default App;
