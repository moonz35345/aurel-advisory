import { getTranslator } from "@/lib/i18n/server";
import { getLocale } from "@/lib/i18n/server";
import { LocaleProvider } from "@/components/locale-provider";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/metadata";
import "./globals.css";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  const locale = await getLocale();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("Aurel Advisory — Independent thinking. Lasting progress."),
      template: "%s | Aurel Advisory",
    },
    description: t(
      "A fictional European business consultancy. Explore a portfolio demonstration of strategy, transformation, and innovation, thoughtfully brought together.",
    ),
    openGraph: {
      siteName: t("Aurel Advisory — Portfolio Demonstration"),
      locale: { en: "en_GB", de: "de_DE", nl: "nl_NL", tr: "tr_TR" }[locale],
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}
export const viewport: Viewport = { themeColor: "#f7f7f0" };
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslator();
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <LocaleProvider locale={locale}>
          <a href="#main-content" className="skip-link">
            {t("Skip to content")}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
