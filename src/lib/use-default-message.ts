import { useI18n } from "@/lib/use-i18n";
import { getMessagesByLocale } from "@/lib/i18n-store";

/**
 * Devuelve el defaultMessage para una clave de traducción según el idioma activo.
 * Si no existe, retorna el fallback proporcionado.
 */
export function useDefaultMessage(id: string, fallback: string): string {
  const { locale } = useI18n();
  const messages = getMessagesByLocale(locale) as Record<string, string>;
  return (messages && messages[id]) || fallback;
}
