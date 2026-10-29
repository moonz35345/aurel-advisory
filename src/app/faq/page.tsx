import { getTranslator } from "@/lib/i18n/server";
import { FAQList } from "@/components/faq-list";
import { CTA, PageHero, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "Frequently asked questions",
    "Clear answers about the Aurel service concept, illustrative engagements, and how this fictional consulting portfolio demonstration works.",
    "/faq",
  );
}
export default async function FAQPage() {
  const t = await getTranslator();

  return (
    <>
      <PageHero
        label={t("FREQUENTLY ASKED QUESTIONS")}
        title={t("A little less uncertainty.")}
        accent={t("A little more clarity.")}
        description={t(
          "From the first conversation to the way we would work together. Here are answers to the questions that matter.",
        )}
      />
      <section className="container faq-page-grid">
        <aside>
          <span className="eyebrow">{t("LET’S MAKE IT CLEAR")}</span>
          <h3>{t("Still curious?")}</h3>
          <p>{t("Every business has its own questions. Start with yours.")}</p>
          <TextLink href="/contact">{t("Start a conversation")}</TextLink>
          <div id="demo" className="faq-demo-note">
            <strong>{t("About this demonstration")}</strong>
            <p>
              {t(
                "Aurel is a fictional consulting brand. Choose “About this demo” to learn about the content and form behaviour.",
              )}
            </p>
          </div>
        </aside>
        <FAQList />
      </section>
      <CTA />
    </>
  );
}
