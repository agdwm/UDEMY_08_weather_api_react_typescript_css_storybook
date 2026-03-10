import { env } from "@/lib/env";
import type { Weather } from "@/types/weather-interface";

export const fetchWeatherByCity = async (city: string): Promise<Weather> => {
  const endpointPath = "/current.json";
  const requestUrl = `${env.apiRootUrl}${endpointPath}?key=${env.apiKey}&q=${encodeURIComponent(city)}&aqi=no`;
  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data: Weather = await response.json();
  return data;
};
