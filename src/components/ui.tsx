"use client";
import { useI18n } from "@/components/locale-provider";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Layers3,
  ScanLine,
} from "lucide-react";
import type { ReactNode } from "react";
import { services } from "@/lib/data";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "wordmark-light" : ""}`}>
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        aurel<span className="brand-dot">.</span>
        <small>ADVISORY</small>
      </span>
    </span>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "lime" | "outline";
  className?: string;
}) {
  const { t } = useI18n();

  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {typeof children === "string" ? t(children) : children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const { t } = useI18n();

  return (
    <Link href={href} className="text-link">
      {typeof children === "string" ? t(children) : children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  const { t } = useI18n();

  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span aria-hidden="true" />
      {typeof children === "string" ? t(children) : children}
    </p>
  );
}
export function PageHero({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  const { t } = useI18n();

  return (
    <section className="page-hero container">
      <Eyebrow>{label}</Eyebrow>
      <div className="page-hero-row">
        <h1>
          {t(title)}
          <br />
          <em>{t(accent)}</em>
        </h1>
        <p className="lead">{t(description)}</p>
      </div>
    </section>
  );
}
export function ServiceCards() {
  const { t } = useI18n();

  const icons = [Compass, Layers3, ScanLine];
  return (
    <div className="service-grid">
      {services.map((service, i) => {
        const Icon = icons[i];
        return (
          <Link
            className="service-card group"
            href={service.href}
            key={service.number}
          >
            <div className="service-card-top">
              <Icon size={32} strokeWidth={1.3} aria-hidden="true" />
              <span>{service.number}</span>
            </div>
            <h3>{t(service.title)}</h3>
            <p>{t(service.description)}</p>
            <div className="service-card-bottom">
              <span>{t("Explore service")}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export function CTA() {
  const { t } = useI18n();

  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>{t("YOUR NEXT CHAPTER")}</Eyebrow>
          <h2>
            {t("Big ambitions.")}
            <br />
            <em>{t("Let’s make them happen.")}</em>
          </h2>
        </div>
        <div className="cta-aside">
          <p>
            {t("A fresh perspective can change everything.")}
            <br />
            {t("Let’s start with a conversation.")}
          </p>
          <ButtonLink href="/contact">
            {t("Let’s talk about your business")}
          </ButtonLink>
          <span className="micro">
            {t("A focused conversation. A clearer way forward.")}
          </span>
        </div>
      </div>
    </section>
  );
}
export function SectionHeading({
  label,
  title,
  accent,
  href,
  linkText,
}: {
  label: string;
  title: string;
  accent?: string;
  href?: string;
  linkText?: string;
}) {
  const { t } = useI18n();

  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>
          {t(title)}
          {accent && (
            <>
              <br />
              <em>{t(accent)}</em>
            </>
          )}
        </h2>
      </div>
      {href && <TextLink href={href}>{t(linkText || "Explore more")}</TextLink>}
    </div>
  );
}
export function Process({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  return (
    <div className={`process-grid ${compact ? "process-compact" : ""}`}>
      {[
        {
          title: "Understand",
          text: "Ask the right questions. Get to the real challenge, beyond the brief.",
        },
        {
          title: "Define",
          text: "Build a shared direction. Focus on the choices that matter most.",
        },
        {
          title: "Activate",
          text: "Turn insight into action. Equip your team to move with confidence.",
        },
        {
          title: "Sustain",
          text: "Embed progress. Build the capabilities to keep moving forward.",
        },
      ].map((step, i) => (
        <div className="process-step" key={step.title}>
          <span className="process-number">
            0{i + 1}
            <ArrowRight size={17} aria-hidden="true" />
          </span>
          <h3>{t(step.title)}</h3>
          <p>{t(step.text)}</p>
        </div>
      ))}
    </div>
  );
}
