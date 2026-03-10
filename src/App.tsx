import { validateCity } from "@/lib/city-validation";
import { fetchWeatherByCity } from "@/lib/weather-service";
import { useState } from "react";

const App = () => {
  const [city, setCity] = useState<string>("");
  const [outputWeather, setOutputWeather] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const data = await fetchWeatherByCity(normalizedCity);

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
        <h1>REST API Practice - Weather App</h1>
        <form action="#" onSubmit={handleSubmit}>
          <label htmlFor="input-city">City:</label>
          <input
            id="input-city"
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
          {outputWeather.length > 0 && <pre>{outputWeather}</pre>}
        </form>
      </section>
    </main>
  );
};

export default App;
