// Permite "Ciudad" o "Ciudad, País" / "Ciudad,PaísOCódigo" (ej: "Salamanca, Spain" o "Salamanca,ES")
const CITY_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+(,\s*[A-Za-zÀ-ÖØ-öø-ÿ' -]+)?$/;

export interface CityValidationResult {
  normalizedCity: string;
  errorKey: string | null;
}

export const validateCity = (rawCity: string): CityValidationResult => {
  const normalizedCity = rawCity.trim().replace(/\s+/g, " ");

  if (!normalizedCity) {
    return { normalizedCity, errorKey: "validation.empty" };
  }

  if (normalizedCity.length < 2) {
    return {
      normalizedCity,
      errorKey: "validation.minLength",
    };
  }

  if (normalizedCity.length > 85) {
    return { normalizedCity, errorKey: "validation.tooLong" };
  }

  if (!CITY_PATTERN.test(normalizedCity)) {
    return {
      normalizedCity,
      errorKey: "validation.invalidCharacters",
    };
  }

  return { normalizedCity, errorKey: null };
};
