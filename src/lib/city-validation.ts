const CITY_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

export interface CityValidationResult {
  normalizedCity: string;
  error: string | null;
}

export const validateCity = (rawCity: string): CityValidationResult => {
  const normalizedCity = rawCity.trim().replace(/\s+/g, " ");

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

  return { normalizedCity, error: null };
};
