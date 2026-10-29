import { getTranslator } from "@/lib/i18n/server";
import { Check, Minus } from "lucide-react";
import {
  ButtonLink,
  CTA,
  Eyebrow,
  PageHero,
  ServiceCards,
} from "@/components/ui";
import { services } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "Our expertise",
    "Explore strategy and growth, business transformation, and digital innovation. Compare illustrative advisory engagements from fictional European consultancy Aurel.",
    "/services",
  );
}
const rows = [
  { label: "Strategic diagnostic", values: [true, true, true] },
  { label: "Market & opportunity assessment", values: [true, false, true] },
  { label: "Operating model design", values: [false, true, false] },
  { label: "Digital roadmap", values: [false, false, true] },
  { label: "Implementation planning", values: [true, true, true] },
  { label: "Capability transfer", values: [true, true, true] },
];
export default async function Services() {
  const t = await getTranslator();

  return (
    <>
      <PageHero
        label={t("OUR EXPERTISE")}
        title={t("The right perspective.")}
        accent={t("Where it matters most.")}
        description={t(
          "Three connected areas of expertise. One shared purpose: helping your business make its next move with clarity and confidence.",
        )}
      />
      <section className="container services-overview">
        <ServiceCards />
        <p className="section-endnote">
          {t(
            "A flexible service concept. Each engagement would be shaped around your business.",
          )}
        </p>
      </section>
      <section className="service-detail-list container">
        {services.map((service) => (
          <div className="service-detail-row" key={service.number}>
            <span className="large-index">{service.number}</span>
            <div>
              <Eyebrow>{t(service.title)}</Eyebrow>
              <h2>
                {t(
                  service.number === "01"
                    ? "Know where to go."
                    : service.number === "02"
                      ? "Make change work."
                      : "Create what comes next.",
                )}
              </h2>
              <p>{t(service.description)}</p>
              <ButtonLink href={service.href} variant="outline">
                {t(
                  service.number === "01"
                    ? "Explore strategy & growth"
                    : "Explore the engagement approach",
                )}
              </ButtonLink>
            </div>
            <ul>
              {service.points.map((point) => (
                <li key={point}>
                  <Check size={17} aria-hidden="true" />
                  {t(point)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="comparison-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{t("FIND YOUR STARTING POINT")}</Eyebrow>
              <h2>
                {t("Different challenges.")}
                <br />
                <em>{t("The same commitment.")}</em>
              </h2>
            </div>
            <p className="comparison-intro">
              {t("Compare the typical focus of each service.")}
              <br />
              {t("The right combination starts with your priorities.")}
            </p>
          </div>
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label={t(
              "Service comparison table; scroll horizontally on small screens",
            )}
          >
            <table>
              <caption className="sr-only">
                {t(
                  "Illustrative service comparison. Included indicates a typical focus, not a contractual commitment.",
                )}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{t("A considered approach")}</th>
                  {services.map((s) => (
                    <th scope="col" key={s.number}>
                      {t(s.title)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{t(row.label)}</th>
                    {row.values.map((value, i) => (
                      <td key={i}>
                        {value ? (
                          <Check size={19} aria-label={t("Typical focus")} />
                        ) : (
                          <Minus
                            size={16}
                            aria-label={t("Not a primary focus")}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="comparison-timing">
                  <th scope="row">{t("Illustrative duration")}</th>
                  <td>{t("8–12 weeks")}</td>
                  <td>{t("12–16 weeks")}</td>
                  <td>{t("8–14 weeks")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="micro comparison-note">
            {t(
              "Indicative service concepts and timelines for this fictional portfolio demonstration. Scroll the table to compare on mobile.",
            )}
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}
