import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CTA, Eyebrow, PageHero, Process } from "@/components/ui";
import { Statistics } from "@/components/statistics";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "About us",
    "Meet the thinking behind Aurel Advisory, a fictional independent European consultancy created for a premium agency portfolio demonstration.",
    "/about",
  );
}
export default async function About() {
  const t = await getTranslator();

  return (
    <>
      <PageHero
        label={t("THE AUREL PERSPECTIVE")}
        title={t("Independent by design.")}
        accent={t("Human by nature.")}
        description={t(
          "A fresh perspective on business consulting. Built on clear thinking, honest conversations, and a shared ambition to move forward.",
        )}
      />
      <section className="container">
        <div className="about-image">
          <Image
            src="/images/about.jpg"
            alt={t(
              "Sunlit contemporary workspace with open, natural architecture",
            )}
            fill
            priority
            sizes="100vw"
          />
          <span>{t("SPACE TO THINK. ROOM TO GROW.")}</span>
        </div>
      </section>
      <section className="story-section container">
        <Eyebrow>{t("WHY AUREL")}</Eyebrow>
        <div className="intro-grid">
          <h2>
            {t("Complexity is inevitable.")}
            <br />
            <em>{t("Confusion doesn’t have to be.")}</em>
          </h2>
          <div>
            <p>
              {t(
                "Businesses don’t need another hundred-page answer. They need a clear understanding of what matters — and the confidence to act.",
              )}
            </p>
            <p className="muted">
              {t(
                "That idea is at the heart of Aurel. Our fictional consultancy concept combines the rigour of strategic thinking with the care of a close working partnership. European in perspective. Curious about what comes next.",
              )}
            </p>
            <p className="muted">
              {t(
                "From the first question to the next milestone, the ambition is simple: make good decisions easier, and meaningful progress possible.",
              )}
            </p>
            <p className="demo-inline">
              {t(
                "Aurel is a fictional company. This website demonstrates a consulting brand and experience; it does not represent an operating firm.",
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="values-section">
        <div className="container">
          <Eyebrow>{t("WHAT GUIDES US")}</Eyebrow>
          <h2>
            {t("A clear point of view.")}
            <br />
            <em>{t("A considered way of working.")}</em>
          </h2>
          <div className="values-grid">
            {[
              {
                title: "Clarity over complexity",
                text: "We make room for the essential. Clear questions, useful insight, and a direction everyone can understand.",
              },
              {
                title: "Partnership over distance",
                text: "We work closely with the people behind the business. Listening first. Building shared ownership from day one.",
              },
              {
                title: "Progress with purpose",
                text: "We connect every recommendation to a practical next step, a clear responsibility, and a meaningful outcome.",
              },
            ].map((v, i) => (
              <div key={v.title}>
                <div className="value-top">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={24} aria-hidden="true" />
                </div>
                <h3>{t(v.title)}</h3>
                <p>{t(v.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Statistics />
      <section className="container section-space">
        <Eyebrow>{t("OUR APPROACH")}</Eyebrow>
        <h2>
          {t("Thoughtful at every step.")}
          <br />
          <em>{t("Practical at every turn.")}</em>
        </h2>
        <Process />
      </section>
      <CTA />
    </>
  );
}
