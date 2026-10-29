import { getTranslator } from "@/lib/i18n/server";
import { ArrowUpRight, Globe2, MessagesSquare, Compass } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { Eyebrow, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata() {
  return pageMetadata(
    "Let’s talk",
    "Try the validated project inquiry experience for Aurel Advisory. This portfolio demo processes sample details locally and does not send or store inquiries.",
    "/contact",
  );
}
export default async function Contact() {
  const t = await getTranslator();

  return (
    <>
      <PageHero
        label={t("A CONVERSATION WORTH HAVING")}
        title={t("What’s your next chapter?")}
        accent={t("Let’s find out together.")}
        description={t(
          "A challenge to untangle. An opportunity to explore. A big idea waiting for a clear direction. It starts here.",
        )}
      />
      <section className="container contact-grid">
        <aside className="contact-aside">
          <Eyebrow>{t("START WITH A FRESH PERSPECTIVE")}</Eyebrow>
          <h2>
            {t("Big questions.")}
            <br />
            <em>{t("Open minds.")}</em>
          </h2>
          <p>
            {t(
              "You don’t need a perfect brief. Just a sense of where you are and what you want to change.",
            )}
          </p>
          <div className="contact-points">
            <div>
              <MessagesSquare size={23} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <strong>{t("A focused conversation")}</strong>
                <p>{t("Space to explore the real challenge.")}</p>
              </span>
            </div>
            <div>
              <Compass size={23} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <strong>{t("A considered next step")}</strong>
                <p>{t("A scope shaped around your priorities.")}</p>
              </span>
            </div>
            <div>
              <Globe2 size={23} strokeWidth={1.3} aria-hidden="true" />
              <span>
                <strong>{t("A European perspective")}</strong>
                <p>{t("Built for businesses with broader ambitions.")}</p>
              </span>
            </div>
          </div>
          <div className="contact-demo">
            <ArrowUpRight size={23} aria-hidden="true" />
            <strong>{t("A demonstration, thoughtfully built.")}</strong>
            <p>
              {t(
                "This form is interactive, but no inquiry will be sent. Please enter sample information to explore the experience.",
              )}
            </p>
          </div>
        </aside>
        <InquiryForm />
      </section>
    </>
  );
}
