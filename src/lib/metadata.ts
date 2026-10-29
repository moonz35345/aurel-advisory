import type { Metadata } from "next";
import { getLocale, getTranslator } from "./i18n/server";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aurel.example";
export async function pageMetadata(
  title: string,
  description: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslator();
  const locale = await getLocale();
  return {
    title: t(title),
    description: t(description),
    alternates: { canonical: path },
    openGraph: {
      title: `${t(title)} | Aurel Advisory`,
      description: t(description),
      locale: { en: "en_GB", de: "de_DE", nl: "nl_NL", tr: "tr_TR" }[locale],
      url: path,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}
