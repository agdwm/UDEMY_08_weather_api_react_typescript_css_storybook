import { env } from "@/lib/env";
import type { Weather } from "@/types/weather-interface";

import { useState } from "react";

const CITY_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

interface CityValidationResult {
  normalizedCity: string;
  error: string | null;
}

const validateCity = (rawValue: string): CityValidationResult => {
  const normalizedCity = rawValue.trim();

  if (!normalizedCity) {
    return { normalizedCity, error: "Enter a valid city name." };
  }

  if (normalizedCity.length < 2) {
    return {
      normalizedCity,
      error: "City name must be at least 2 characters long.",
    };
  }

  if (normalizedCity.length > 85) {
    return { normalizedCity, error: "City name is too long." };
  }

  if (!CITY_PATTERN.test(normalizedCity)) {
    return {
      normalizedCity,
      error:
        "City name can only include letters, spaces, apostrophes, and hyphens.",
    };
  }

  if (normalizedCity.includes("  ")) {
    return {
      normalizedCity,
      error: "City name cannot contain consecutive spaces.",
    };
  }

  return { normalizedCity, error: null };
};

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

  // Gestiona el envío del formulario y manejo de datos, incluyendo el estado de carga y errores.
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    // ENTRADA: detener submit + normalizar + validar.
    // 1) Evita el submit por defecto del navegador.
    e.preventDefault();

    // 2) Limpia, normaliza y valida la ciudad ingresada.
    const { normalizedCity, error: validationError } = validateCity(city);

    if (validationError) {
      // 3) Si falla, muestra el error y termina.
      setOutputWeather(validationError);
      return;
    }

    // PETICIÓN: activar loading + consultar API.
    // 4) Activa estado de carga para bloquear UI.
    setIsLoading(true);

    try {
      // 5) Muestra feedback y consulta datos remotos.
      setOutputWeather("Loading data...");
      const data = await fetchWeather(normalizedCity);

      // SALIDA: mostrar éxito.
      // 6) Si todo va bien, renderiza resultado.
      setOutputWeather(JSON.stringify(data, null, 2));
    } catch (error) {
      // SALIDA: mostrar fallo.
      // 7) Si falla la petición, informa el error.
      if (error instanceof Error) {
        setOutputWeather(`Error fetching weather: ${error.message}`);
      } else {
        setOutputWeather("Unknown error while fetching weather.");
      }
    } finally {
      // SALIDA: cerrar loading siempre.
      // 8) Cierra siempre el estado de carga.
      setIsLoading(false);
    }
  };

  return (
    <main className="u-container">
      <section className="u-flow">
        <h1>REST API Practice</h1>
        <form action="#" onSubmit={handleSubmit} className="u-form">
          <label htmlFor="city-input">City:</label>
          <input
            id="city-input"
            type="text"
            value={city}
            name="city"
            placeholder="Enter a city name"
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="u-btn u-focus-ring u-inline"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
        {outputWeather.trim().length > 0 && <pre>{outputWeather}</pre>}
      </section>
    </main>
  );
};

export default App;
