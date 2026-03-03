/**
 * Environment Variables Validator
 * ================================
 * Valida que las variables de entorno requeridas estén configuradas
 * Lanza un error descriptivo si faltan variables críticas
 */

interface EnvVariables {
  apiKey: string;
  env: "development" | "production" | "test";
}

const PLACEHOLDER_VALUES = new Set([
  "tu_api_key_aqui",
  "your_api_key_here",
  "api_key",
  "changeme",
  "example",
]);

const WEATHER_API_KEY_PATTERN = /^[a-zA-Z0-9_-]{10,}$/;

const createMissingApiKeyError = (): Error => {
  return new Error(`
❌ VITE_WEATHER_API_KEY no está configurado

Por favor sigue estos pasos:

1. Crea un archivo .env en la raíz del proyecto
2. Copia el contenido de .env.example
3. Obtén tu API Key en: https://www.weatherapi.com/
4. Reemplaza "tu_api_key_aqui" con tu clave real
5. Reinicia el servidor (pnpm run dev)

Ejemplo .env:
VITE_WEATHER_API_KEY=abc123def456...
`);
};

const normalizeMode = (mode: string | undefined): EnvVariables["env"] => {
  if (mode === "production" || mode === "test") {
    return mode;
  }

  return "development";
};

/**
 * Validar y obtener las variables de entorno
 * @throws Error si falta VITE_WEATHER_API_KEY
 */
export const validateEnv = (): EnvVariables => {
  const rawApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const env = normalizeMode(import.meta.env.MODE);
  const apiKey = (rawApiKey ?? "").trim();

  // Validar API Key
  if (!apiKey) {
    throw createMissingApiKeyError();
  }

  if (PLACEHOLDER_VALUES.has(apiKey.toLowerCase())) {
    throw new Error(
      "❌ VITE_WEATHER_API_KEY contiene un valor de ejemplo. Usa tu clave real de WeatherAPI.",
    );
  }

  // Validar formato básico de API Key
  if (!WEATHER_API_KEY_PATTERN.test(apiKey)) {
    throw new Error(
      "❌ VITE_WEATHER_API_KEY parece inválida. Debe tener al menos 10 caracteres y usar solo letras, números, guion o guion bajo.",
    );
  }

  return { apiKey, env };
};

// Exportar variables validadas
export const env = (() => {
  try {
    return validateEnv();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    // Política fail-fast en todos los entornos
    throw error;
  }
})();
