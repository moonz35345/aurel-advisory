import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { isLocale, localeCookie } from "./config";
import { createTranslator } from "./translate";
export const getLocale = cache(async () => {
  const value = (await cookies()).get(localeCookie)?.value;
  return isLocale(value) ? value : "en";
});
export async function getTranslator() {
  return createTranslator(await getLocale());
}
