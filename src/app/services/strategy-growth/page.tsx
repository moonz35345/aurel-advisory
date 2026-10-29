import { getTranslator } from "@/lib/i18n/server";
import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  PageHero,
  Process,
  TextLink,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "Strategy & growth",
    "Explore an illustrative strategy and growth engagement: market opportunities, strategic choices, and a practical roadmap. A fictional Aurel Advisory service concept.",
    "/services/strategy-growth",
  );
}
export default async function ServiceDetail() {
  const t = await getTranslator();

  return (
    <>
      <PageHero
        label={t("01 / STRATEGY & GROWTH")}
        title={t("Ambition, with direction.")}
        accent={t("Growth, with purpose.")}
        description={t(
          "Make the choices that move your business forward. We connect market insight with commercial focus to build a strategy you can act on.",
        )}
      />
      <section className="container service-hero-image">
        <Image
          src="/images/city.jpg"
          alt={t("Bold geometric architecture reaching toward an open sky")}
          fill
          priority
          sizes="100vw"
        />
        <div>
          <span>
            {t("SEE THE OPPORTUNITY.")}
            <br />
            {t("SHAPE THE WAY FORWARD.")}
          </span>
          <ArrowUpRight size={40} aria-hidden="true" />
        </div>
      </section>
      <section className="container service-content section-space">
        <div>
          <Eyebrow>{t("CLARITY BEFORE THE NEXT MOVE")}</Eyebrow>
          <h2>
            {t("The future won’t")}
            <br />
            <em>{t("wait for certainty.")}</em>
          </h2>
          <p>
            {t(
              "New markets. Shifting expectations. A business ready for its next chapter. The opportunity is there — but knowing where to focus makes all the difference.",
            )}
          </p>
          <p className="muted">
            {t(
              "Our strategy concept helps leadership teams examine the evidence, challenge assumptions, and make deliberate choices. The result: a focused direction and a practical roadmap for moving forward.",
            )}
          </p>
        </div>
        <aside className="engagement-card">
          <span className="eyebrow">{t("AN EXAMPLE ENGAGEMENT")}</span>
          <h3>
            {t("A clearer direction,")}
            <br />
            {t("from the first conversation.")}
          </h3>
          <dl>
            <div>
              <dt>{t("Typical duration")}</dt>
              <dd>{t("8–12 weeks")}</dd>
            </div>
            <div>
              <dt>{t("Best suited to")}</dt>
              <dd>{t("Leadership & growth teams")}</dd>
            </div>
            <div>
              <dt>{t("Working model")}</dt>
              <dd>{t("Collaborative, hybrid")}</dd>
            </div>
            <div>
              <dt>{t("Core outcome")}</dt>
              <dd>{t("A prioritised growth roadmap")}</dd>
            </div>
          </dl>
          <ButtonLink href="/contact" variant="lime">
            {t("Discuss your ambition")}
          </ButtonLink>
          <p className="micro">
            {t("Illustrative scope. A fictional service concept.")}
          </p>
        </aside>
      </section>
      <section className="capabilities-section" id="capabilities">
        <div className="container">
          <Eyebrow>{t("WHAT WE COULD HELP YOU SOLVE")}</Eyebrow>
          <h2>
            {t("From big questions")}
            <br />
            <em>{t("to clear choices.")}</em>
          </h2>
          <div className="capabilities-grid">
            {[
              {
                title: "Where should we play?",
                text: "Assess market attractiveness, customer needs, and competitive dynamics to identify the opportunities worth pursuing.",
                items: [
                  "Market & competitor assessment",
                  "Customer opportunity mapping",
                  "Market-entry options",
                ],
              },
              {
                title: "How will we win?",
                text: "Translate your strengths into a distinctive proposition and a business model that makes commercial sense.",
                items: [
                  "Strategic positioning",
                  "Value proposition development",
                  "Growth scenario modelling",
                ],
              },
              {
                title: "What happens next?",
                text: "Turn strategic choices into practical priorities, clear ownership, and a rhythm for measuring progress.",
                items: [
                  "Implementation roadmap",
                  "Milestones & decision gates",
                  "Leadership alignment",
                ],
              },
            ].map((cap) => (
              <div key={cap.title}>
                <h3>{t(cap.title)}</h3>
                <p>{t(cap.text)}</p>
                <ul>
                  {cap.items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="capability-note">
            {t(
              "Looking at transformation or digital innovation? We would apply the same discovery-to-delivery approach, with a scope tailored to operations or technology.",
            )}{" "}
            <TextLink href="/contact">{t("Discuss the right scope")}</TextLink>
          </p>
        </div>
      </section>
      <section className="container section-space">
        <Eyebrow>{t("FROM QUESTION TO ACTION")}</Eyebrow>
        <h2>
          {t("A structured process.")}
          <br />
          <em>{t("Room for fresh thinking.")}</em>
        </h2>
        <Process />
      </section>
      <section className="container related-case">
        <Image
          src="/images/wind.jpg"
          alt={t("Wind turbines in a green countryside")}
          width={1000}
          height={700}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div>
          <Eyebrow>{t("FICTIONAL PORTFOLIO EXAMPLE")}</Eyebrow>
          <h2>
            {t("A clearer path to")}
            <br />
            <em>{t("a greener future.")}</em>
          </h2>
          <p>
            {t(
              "Explore an imagined market-entry strategy for Nordhaven, a fictional renewable energy company.",
            )}
          </p>
          <TextLink href="/case-studies">
            {t("Explore the portfolio examples")}
          </TextLink>
        </div>
      </section>
      <CTA />
    </>
  );
}
