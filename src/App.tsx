import type { Weather } from "@/types/weather-interface";
import { useState } from "react";

const App = () => {
  const [outputWeather, setOutputWeather] = useState(
    "Haz clic para cargar datos",
  );

  const fetchWeather = async (city: string): Promise<void> => {
    const apiRootUrl = import.meta.env.VITE_API_BASE_URL;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const endpointPath = "/current.json";
    const requestUrl = `${apiRootUrl}${endpointPath}?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
      setOutputWeather("Cargando datos...");

      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data: Weather = await response.json();
      setOutputWeather(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setOutputWeather(`Error al consultar la API: ${error.message}`);
      } else {
        setOutputWeather(`Error desconocido al consultar la API`);
      }
    }
  };

  return (
    <main className="u-container">
      <section className="u-flow">
        <h1>API Practice</h1>
        <button
          className="u-btn u-focus-ring"
          onClick={() => {
            fetchWeather("Meco, Spain");
          }}
        >
          Consultar tiempo para Meco
        </button>
        {outputWeather && <pre>{outputWeather}</pre>}
      </section>
    </main>
  );
};

export default App;
