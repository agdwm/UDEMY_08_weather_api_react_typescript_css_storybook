import Alert from "@/components/ui/Alert";
import Header from "@/components/ui/Header";
import WeatherForm from "@/components/weather/WeatherForm";
import WeatherResult from "@/components/weather/WeatherResult";
import { validateCity } from "@/lib/city-validation";
import { fetchWeatherByCity, WeatherRequestError } from "@/lib/weather-service";
import type { Weather } from "@/types/weather-interface";
import { useState } from "react";
import { useIntl } from "react-intl";

type UiStatus = "idle" | "loading" | "success";

const App = () => {
  const intl = useIntl();

  // Estado del input de ciudad
  const [city, setCity] = useState<string>("");
  // Estado de la UI: "idle", "loading" o "success"
  const [uiStatus, setUiStatus] = useState<UiStatus>("idle");
  // Datos meteorológicos obtenidos
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  // Mensaje de error (si existe, hay error)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    // Previene recarga de página
    e.preventDefault();

    // Valida la ciudad introducida
    const { normalizedCity, errorKey } = validateCity(city);
    if (errorKey) {
      setErrorMessage(intl.formatMessage({ id: errorKey }));
      setWeatherData(null);
      setUiStatus("idle");
      return;
    }

    // Inicia búsqueda: limpia estados previos y activa loading
    setUiStatus("loading");
    setErrorMessage(null);
    setWeatherData(null);

    try {
      const data = await fetchWeatherByCity(normalizedCity);
      setWeatherData(data);
      setUiStatus("success");
    } catch (error) {
      setWeatherData(null);
      let message = "";
      if (error instanceof WeatherRequestError) {
        message = intl.formatMessage(
          { id: error.messageKey, defaultMessage: error.message },
          error.messageValues,
        );
      } else if (error instanceof Error) {
        message = intl.formatMessage(
          {
            id: "errors.fetchGeneric",
            defaultMessage: "Error fetching weather: {message}",
          },
          { message: error.message },
        );
      } else {
        message = intl.formatMessage({
          id: "errors.unknown",
          defaultMessage: "Unknown error while fetching weather.",
        });
      }
      setErrorMessage(message);
      setUiStatus("idle");
    }
  };

  const renderStatusContent = () => {
    type AlertVariant = "info" | "success" | "warning" | "error";
    let alertProps:
      | (Omit<React.ComponentProps<typeof Alert>, "children"> & {
          children: React.ReactNode;
        })
      | null = null;
    if (uiStatus === "loading") {
      alertProps = {
        variant: "info" as AlertVariant,
        title: intl.formatMessage({
          id: "alert.loading",
          defaultMessage: "Loading",
        }),
        children: intl.formatMessage({
          id: "alert.loadingMessage",
          defaultMessage: "Fetching weather data...",
        }),
      };
    } else if (errorMessage) {
      alertProps = {
        variant: "error" as AlertVariant,
        title: intl.formatMessage({
          id: "alert.error",
          defaultMessage: "Error",
        }),
        onDismiss: () => setErrorMessage(null),
        children: errorMessage,
      };
    }
    if (alertProps) {
      return <Alert {...alertProps}>{alertProps.children}</Alert>;
    }
    if (uiStatus === "success" && weatherData) {
      return <WeatherResult data={weatherData} />;
    }
    return null;
  };

  return (
    <div className="c-app-shell">
      <Header
        title={intl.formatMessage({
          id: "app.title",
          defaultMessage: "Weather Search",
        })}
        subtitle={intl.formatMessage({
          id: "app.subtitle",
          defaultMessage: "Enter a city to get real-time weather information",
        })}
      />

      <main className="u-container c-app-main">
        <section className="u-flow">
          <WeatherForm
            city={city}
            isLoading={uiStatus === "loading"}
            onCityChange={setCity}
            onSubmit={handleSubmit}
          />
          {/* Renderiza alertas o resultados según el estado actual */}
          {renderStatusContent()}
        </section>
      </main>
    </div>
  );
};

export default App;
