import { getTranslator } from "@/lib/i18n/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/data";
import { Wordmark } from "./ui";
export async function Footer() {
  const t = await getTranslator();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link href="/" aria-label={t("Aurel Advisory home")}>
              <Wordmark light />
            </Link>
            <p>
              {t("Independent thinking.")}
              <br />
              {t("Lasting progress.")}
            </p>
            <span className="footer-location">
              <span />
              {t("A European perspective. A broader ambition.")}
            </span>
          </div>
          <div className="footer-links">
            <span>{t("EXPLORE")}</span>
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {t(item.label)}
              </Link>
            ))}
          </div>
          <div className="footer-connect">
            <span>{t("START A CONVERSATION")}</span>
            <Link href="/contact">
              {t("A clearer way forward")}
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <p>
              {t("Strategy. Transformation. Innovation.")}
              <br />
              {t("Built around your next chapter.")}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()}{" "}
            {t("Aurel Advisory. A fictional brand.")}
          </p>
          <p>
            {t(
              "Agency portfolio demonstration · All case studies and results are illustrative.",
            )}
          </p>
          <Link href="/faq#demo">
            {t("About this demo")}
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
