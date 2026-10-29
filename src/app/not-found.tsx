import { getTranslator } from "@/lib/i18n/server";
import { ButtonLink, Eyebrow } from "@/components/ui";
export default async function NotFound() {
  const t = await getTranslator();

  return (
    <section className="container not-found">
      <Eyebrow>{t("404 / A DIFFERENT DIRECTION")}</Eyebrow>
      <h1>
        {t("Let’s get you")}
        <br />
        <em>{t("back on track.")}</em>
      </h1>
      <p>
        {t(
          "The page you’re looking for isn’t here. A fresh perspective is just one click away.",
        )}
      </p>
      <ButtonLink href="/">{t("Return to the home page")}</ButtonLink>
    </section>
  );
}
