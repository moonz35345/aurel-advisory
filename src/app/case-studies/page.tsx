import { getTranslator } from "@/lib/i18n/server";
import { CaseStudies } from "@/components/case-studies";
import { CTA, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "Selected work — Portfolio examples",
    "Explore clearly labeled fictional consulting case studies across strategy, transformation, and digital innovation. Filter examples and discover the thinking behind each.",
    "/case-studies",
  );
}
export default async function CaseStudiesPage() {
  const t = await getTranslator();

  return (
    <>
      <PageHero
        label={t("SELECTED WORK / PORTFOLIO EXAMPLES")}
        title={t("New perspectives.")}
        accent={t("Possible futures.")}
        description={t(
          "A collection of imagined challenges and considered responses. Explore what clearer thinking could make possible for a business.",
        )}
      />
      <section className="container portfolio-section">
        <div className="portfolio-disclosure">
          <span className="disclosure-mark">{t("i")}</span>
          <p>
            <strong>{t("A portfolio of possibilities.")}</strong>{" "}
            {t(
              "All businesses, projects, and outcomes on this page are fictional examples created to demonstrate our approach. No client relationships or measured results are claimed.",
            )}
          </p>
        </div>
        <CaseStudies />
      </section>
      <CTA />
    </>
  );
}
