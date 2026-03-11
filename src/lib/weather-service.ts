import { env } from "@/lib/env";
import type { Weather } from "@/types/weather-interface";

type WeatherErrorKind =
  | "city_not_found"
  | "invalid_api_key"
  | "network"
  | "unknown";

interface WeatherApiErrorResponse {
  error?: {
    code?: number;
    message?: string;
  };
}

const CITY_NOT_FOUND_CODE = 1006;
const INVALID_API_KEY_CODES = new Set([1002, 2006]);

export class WeatherRequestError extends Error {
  kind: WeatherErrorKind;
  messageKey: string;
  messageValues?: Record<string, string | number>;

  constructor(
    kind: WeatherErrorKind,
    messageKey: string,
    message: string,
    messageValues?: Record<string, string | number>,
  ) {
    super(message);
    this.name = "WeatherRequestError";
    this.kind = kind;
    this.messageKey = messageKey;
    this.messageValues = messageValues;
  }
}

const parseApiErrorResponse = async (
  response: Response,
): Promise<WeatherApiErrorResponse | null> => {
  try {
    const data = (await response.json()) as WeatherApiErrorResponse;
    return data;
  } catch {
    return null;
  }
};

const mapApiErrorToDomainError = (
  response: Response,
  apiErrorData: WeatherApiErrorResponse | null,
): WeatherRequestError => {
  const apiCode = apiErrorData?.error?.code;

  if (apiCode === CITY_NOT_FOUND_CODE || response.status === 404) {
    return new WeatherRequestError(
      "city_not_found",
      "errors.cityNotFound",
      "No hemos encontrado esa ciudad. Revisa el nombre e intentalo de nuevo.",
    );
  }

  if (apiCode !== undefined && INVALID_API_KEY_CODES.has(apiCode)) {
    return new WeatherRequestError(
      "invalid_api_key",
      "errors.invalidApiKey",
      "La API key no es valida o no esta configurada correctamente.",
    );
  }

  return new WeatherRequestError(
    "unknown",
    apiErrorData?.error?.message ? "errors.apiMessage" : "errors.fetchFailed",
    apiErrorData?.error?.message ??
      `No se pudo obtener el clima (${response.status} ${response.statusText}).`,
    apiErrorData?.error?.message
      ? { message: apiErrorData.error.message }
      : { statusInfo: `${response.status} ${response.statusText}` },
  );
};

export const fetchWeatherByCity = async (city: string): Promise<Weather> => {
  const endpointPath = "/current.json";
  const requestUrl = `${env.apiRootUrl}${endpointPath}?key=${env.apiKey}&q=${encodeURIComponent(city)}&aqi=no`;
  let response: Response;

  try {
    response = await fetch(requestUrl);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new WeatherRequestError(
        "network",
        "errors.network",
        "No hay conexion con el servicio. Comprueba tu red e intentalo otra vez.",
      );
    }

    throw new WeatherRequestError(
      "unknown",
      "errors.unexpectedConnection",
      "Ha ocurrido un error inesperado al conectar con el servicio.",
    );
  }

  if (!response.ok) {
    const apiErrorData = await parseApiErrorResponse(response);
    throw mapApiErrorToDomainError(response, apiErrorData);
  }

  const data: Weather = await response.json();
  return data;
};
