import { validateCity } from "@/lib/city-validation";
import { fetchWeatherByCity } from "@/lib/weather-service";
import type { Weather } from "@/types/weather-interface";
import { useState } from "react";

type UiStatus = "idle" | "loading" | "success" | "error";

const App = () => {
  // 1) Estado de entrada del formulario.
  const [city, setCity] = useState<string>("");

  // 2) Estado de UI: controla que se renderiza (reposo, carga, exito o error).
  const [uiStatus, setUiStatus] = useState<UiStatus>("idle");

  // 3) Dato de negocio cuando la peticion sale bien.
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  // 4) Mensaje de error para validacion o fallo de red/API.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Flujo mental para memorizar:
  // A) prevenir submit por defecto
  // B) validar entrada
  // C) pasar a loading y limpiar estado previo
  // D) pedir datos al servicio
  // E) success con datos o error con mensaje
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    // A) Evita recarga de pagina al enviar el formulario.
    e.preventDefault();

    // B) Normaliza y valida la ciudad escrita por el usuario.
    const { normalizedCity, error: validationError } = validateCity(city);

    if (validationError) {
      // B.1) Si falla validacion, no llamamos a la API.
      setUiStatus("error");
      setErrorMessage(validationError);
      setWeatherData(null);
      return;
    }

    // C) Inicia una nueva busqueda: limpiamos error/datos anteriores y activamos loading.
    setUiStatus("loading");
    setErrorMessage(null);
    setWeatherData(null);

    try {
      // D) Llamada al servicio desacoplado de la UI.
      const data = await fetchWeatherByCity(normalizedCity);

      // E.1) Exito: guardamos datos y cambiamos el estado para renderizar resultado.
      setWeatherData(data);
      setUiStatus("success");
    } catch (error) {
      // E.2) Error: mantenemos datos en null y mostramos mensaje.
      setUiStatus("error");
      setWeatherData(null);

      if (error instanceof Error) {
        setErrorMessage(`Error fetching weather: ${error.message}`);
      } else {
        setErrorMessage("Unknown error while fetching weather.");
      }
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
            disabled={uiStatus === "loading"}
            required
          />
          <button
            type="submit"
            disabled={uiStatus === "loading"}
            className="u-btn u-focus-ring u-inline"
          >
            {uiStatus === "loading" ? "Loading..." : "Search"}
          </button>

          {/* Render por estado para reforzar el modelo mental de la UI */}
          {uiStatus === "loading" && <p>Loading data...</p>}
          {uiStatus === "error" && errorMessage && <pre>{errorMessage}</pre>}
          {uiStatus === "success" && weatherData && (
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          )}
        </form>
      </section>
    </main>
  );
};

export default App;
