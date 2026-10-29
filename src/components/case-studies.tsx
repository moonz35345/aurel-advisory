"use client";
import { useI18n } from "@/components/locale-provider";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { cases } from "@/lib/data";
import { ButtonLink } from "./ui";
export function CaseStudies({ preview = false }: { preview?: boolean }) {
  const { t } = useI18n();

  const [filter, setFilter] = useState("All projects");
  const [selected, setSelected] = useState<(typeof cases)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  const visible = (preview ? cases.slice(0, 2) : cases).filter(
    (item) => filter === "All projects" || item.category === filter,
  );
  return (
    <>
      {!preview && (
        <div
          className="case-filters"
          role="group"
          aria-label={t("Filter portfolio examples")}
        >
          {[
            "All projects",
            "Strategy & growth",
            "Business transformation",
            "Digital & innovation",
          ].map((item) => (
            <button
              type="button"
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              key={item}
            >
              {t(item)}
              {item === "All projects" && <span>04</span>}
            </button>
          ))}
        </div>
      )}
      <p className={preview ? "sr-only" : "filter-count"} role="status">
        {t(
          visible.length === 1
            ? "{count} portfolio example"
            : "{count} portfolio examples",
          { count: visible.length },
        )}
        {filter !== "All projects" && (
          <> {t("in {category}", { category: t(filter) })}</>
        )}
      </p>
      <div className="cases-grid">
        {visible.map((item) => (
          <button
            key={item.id}
            className="case-card"
            onClick={() => setSelected(item)}
            aria-label={t("Explore {name}, fictional portfolio example", {
              name: item.name,
            })}
          >
            <div className="case-image">
              <Image
                src={item.image}
                alt={t(item.alt)}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className="case-example">{t("PORTFOLIO EXAMPLE")}</span>
              <span className="case-image-arrow">
                <ArrowUpRight size={23} aria-hidden="true" />
              </span>
              <span className="case-brand">{item.name}</span>
            </div>
            <div className="case-info">
              <div>
                <span className="case-category">
                  {t(item.category)} <span> / </span> {t(item.sector)}
                </span>
                <h3>{t(item.title)}</h3>
              </div>
              <ArrowUpRight size={21} aria-hidden="true" />
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="case-dialog"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="case-dialog-title"
      >
        {selected && (
          <div className="dialog-inner">
            <button
              className="dialog-close"
              onClick={() => dialog.current?.close()}
              aria-label={t("Close case study")}
            >
              <X />
            </button>
            <p className="eyebrow">{t("FICTIONAL PORTFOLIO EXAMPLE")}</p>
            <h2 id="case-dialog-title">{selected.name}</h2>
            <span className="case-category">
              {t(selected.category)} · {t(selected.duration)}
            </span>
            <h3>{t(selected.title)}</h3>
            <p>{t(selected.description)}</p>
            <div className="dialog-metric">
              <strong>{selected.metric}</strong>
              <span>
                {t(selected.metricLabel)}
                <small>
                  {t("Hypothetical outcome, not a measured result.")}
                </small>
              </span>
            </div>
            <h4>{t("Example deliverables")}</h4>
            <p>{t(selected.outcome)}</p>
            <ButtonLink href="/contact">
              {t("Discuss a similar challenge")}
            </ButtonLink>
            <p className="micro">
              {t(
                "No real client relationship or performance claim is represented.",
              )}
            </p>
          </div>
        )}
      </dialog>
      {preview && (
        <div className="mobile-case-link">
          <a href="/case-studies">
            {t("Explore all portfolio examples")}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      )}
    </>
  );
}
