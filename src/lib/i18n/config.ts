export const locales = ["en", "de", "nl", "tr"] as const;
export type Locale = (typeof locales)[number];
export type TranslationEntry = [string, string, string, string];
export const localeCookie = "aurel-language";
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}
export const languageNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
  tr: "Türkçe",
};
