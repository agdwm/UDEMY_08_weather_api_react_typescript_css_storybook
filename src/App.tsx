import type { Weather } from "@/types/weather-interface";
import { useState } from "react";

const App = () => {
  const [outputWeather, setOutputWeather] = useState("");

  const fetchWeather = async (city: string): Promise<void> => {
    const apiRootUrl = import.meta.env.VITE_WEATHER_API_ROOT_URL;
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
        setOutputWeather(`Error on fetching weather, ${error.message}`);
      } else {
        setOutputWeather("Unknown error on fetching weather");
      }
    }
  };

  return (
    <main className="u-container">
      <section className="u-flow">
        <h1>API Rest Practice</h1>
        <button
          className="u-btn u-focus-ring"
          onClick={() => {
            fetchWeather("Meco, Spain");
          }}
        >
          Clic to search weather for Meco
        </button>
        {outputWeather.trim().length > 0 && <pre>{outputWeather}</pre>}
      </section>
    </main>
  );
};

export default App;
