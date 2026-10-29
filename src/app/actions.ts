"use server";
import { cookies } from "next/headers";
import { isLocale, localeCookie } from "@/lib/i18n/config";
export async function setLanguage(locale: string) {
  if (!isLocale(locale)) throw new Error("Unsupported language");
  (await cookies()).set(localeCookie, locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true,
  });
}
