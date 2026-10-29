import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  Process,
  SectionHeading,
  ServiceCards,
  TextLink,
} from "@/components/ui";
import { Statistics } from "@/components/statistics";
import { CaseStudies } from "@/components/case-studies";
import { FAQList } from "@/components/faq-list";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "Independent thinking. Lasting progress.",
    "Aurel Advisory is a fictional European consultancy helping illustrate a clearer path through strategy, transformation, and innovation. An agency portfolio demonstration.",
    "/",
  );
}
export default async function Home() {
  const t = await getTranslator();

  return (
    <>
      <section className="home-hero container">
        <div className="hero-topline">
          <Eyebrow>{t("INDEPENDENT THINKING. LASTING PROGRESS.")}</Eyebrow>
          <span className="hero-edition">
            {t("A EUROPEAN PERSPECTIVE")}
            <span>↗</span>
          </span>
        </div>
        <div className="hero-content">
          <div className="hero-heading">
            <h1>
              {t("Clarity for today.")}
              <br />
              {t("Confidence for")} <em>{t("tomorrow.")}</em>
            </h1>
            <span className="hero-asterisk" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="hero-bottom">
            <p>
              {t("We help ambitious businesses turn complex challenges")}
              <br className="desktop-break" />{" "}
              {t("into clear direction — and meaningful, lasting progress.")}
            </p>
            <ButtonLink href="/contact">
              {t("Let’s shape what’s next")}
            </ButtonLink>
          </div>
        </div>
        <div className="hero-photo">
          <Image
            src="/images/hero.jpg"
            alt={t("Angular white-and-glass architecture against an open sky")}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1320px"
          />
          <div className="hero-photo-shade" />
          <span className="photo-caption">
            {t("NEW PERSPECTIVES. REAL POSSIBILITIES.")}
          </span>
          <a
            href="#expertise"
            className="hero-explore"
            aria-label={t("Explore our expertise")}
          >
            <ArrowDown size={19} aria-hidden="true" />
          </a>
          <div className="photo-note">
            <span className="photo-note-line" />
            <span>
              {t("Perspective changes")}
              <br />
              {t("everything.")}
            </span>
            <ArrowUpRight size={24} aria-hidden="true" />
          </div>
          <span className="photo-index">{t("01 / A CLEARER WAY FORWARD")}</span>
        </div>
        <div className="hero-footnote">
          <span>{t("STRATEGY. TRANSFORMATION. INNOVATION.")}</span>
          <span>
            <i />
            {t("Built for a world that doesn’t stand still.")}
          </span>
        </div>
      </section>
      <section className="intro-section container">
        <Eyebrow>{t("THE AUREL PERSPECTIVE")}</Eyebrow>
        <div className="intro-grid">
          <h2>
            {t("Progress starts with")}
            <br />
            <em>{t("a different perspective.")}</em>
          </h2>
          <div>
            <p>
              {t(
                "Good advice sees the bigger picture. Great advice helps you act on it.",
              )}
            </p>
            <p className="muted">
              {t(
                "We bring independent thinking, commercial focus, and a hands-on approach to your most important decisions. Together, we connect where you are with where you want to be.",
              )}
            </p>
            <TextLink href="/about">{t("Meet Aurel")}</TextLink>
          </div>
        </div>
      </section>
      <section className="expertise-section" id="expertise">
        <div className="container">
          <SectionHeading
            label={t("HOW WE HELP")}
            title={t("Big-picture thinking.")}
            accent={t("Practical ways forward.")}
            href="/services"
            linkText={t("Explore our expertise")}
          />
          <ServiceCards />
          <div className="section-endnote">
            <Sparkles size={16} aria-hidden="true" />
            <p>
              {t(
                "Built around your ambition. Never a one-size-fits-all approach.",
              )}
            </p>
          </div>
        </div>
      </section>
      <Statistics />
      <section className="work-section container">
        <SectionHeading
          label={t("PERSPECTIVE IN PRACTICE")}
          title={t("A little clarity.")}
          accent={t("A lot of possibility.")}
          href="/case-studies"
          linkText={t("View selected work")}
        />
        <p className="section-description">
          {t(
            "Imagined challenges. Considered solutions. Explore how our approach could make a difference.",
          )}
        </p>
        <CaseStudies preview />
        <p className="portfolio-note">
          {t(
            "Fictional portfolio examples. All companies, engagements, and outcomes are illustrative.",
          )}
        </p>
      </section>
      <section className="approach-section">
        <div className="container">
          <div className="approach-top">
            <div>
              <Eyebrow light>{t("THE WAY WE WORK")}</Eyebrow>
              <h2>
                {t("Close to your business.")}
                <br />
                <em>{t("Committed to what’s next.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "We believe the best outcomes come from working with you, not around you. Clear thinking, open conversations, and progress you can see.",
              )}
            </p>
          </div>
          <Process />
        </div>
      </section>
      <section className="home-faq container">
        <div>
          <Eyebrow>{t("A LITTLE MORE CLARITY")}</Eyebrow>
          <h2>
            {t("Good questions.")}
            <br />
            <em>{t("Clear answers.")}</em>
          </h2>
          <TextLink href="/faq">{t("More about working together")}</TextLink>
        </div>
        <FAQList preview />
      </section>
      <CTA />
    </>
  );
}
