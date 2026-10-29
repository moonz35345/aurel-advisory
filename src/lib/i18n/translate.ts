import type { Locale } from "./config";
import { messages } from "./messages";
const insensitiveMessages = new Map(
  Object.entries(messages).map(([key, value]) => [key.toLowerCase(), value]),
);
export function createTranslator(locale: Locale) {
  return (source: string, values?: Record<string, string | number>): string => {
    const key = source.replace(/\s+/g, " ").trim();
    const entry = messages[key] ?? insensitiveMessages.get(key.toLowerCase());
    let translated = locale === "en" ? key : (entry?.[locale] ?? key);
    if (locale !== "en" && key === key.toUpperCase())
      translated = translated.toLocaleUpperCase(locale);
    return translated.replace(/\{(\w+)\}/g, (match, name: string) =>
      values?.[name] === undefined ? match : String(values[name]),
    );
  };
}
