"use client";
import { useI18n } from "@/components/locale-provider";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";
export function FAQList({ preview = false }: { preview?: boolean }) {
  const { t } = useI18n();

  const [category, setCategory] = useState("All questions");
  const [open, setOpen] = useState<number | null>(null);
  const visible = preview
    ? faqs.slice(0, 3)
    : faqs.filter(
        (faq) => category === "All questions" || faq.category === category,
      );
  return (
    <div>
      {!preview && (
        <div
          className="case-filters"
          role="group"
          aria-label={t("Filter questions")}
        >
          {[
            "All questions",
            "Working together",
            "Projects & pricing",
            "About this demo",
          ].map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              className={category === item ? "active" : ""}
              onClick={() => {
                setCategory(item);
                setOpen(null);
              }}
            >
              {t(item)}
            </button>
          ))}
        </div>
      )}
      <div className="faq-list">
        {visible.map((faq) => {
          const index = faqs.indexOf(faq);
          const expanded = open === index;
          return (
            <div
              className={`faq-item ${expanded ? "is-open" : ""}`}
              key={faq.question}
            >
              <h3>
                <button
                  aria-expanded={expanded}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="faq-number">0{index + 1}</span>
                  {t(faq.question)}
                  {expanded ? (
                    <Minus size={19} aria-hidden="true" />
                  ) : (
                    <Plus size={19} aria-hidden="true" />
                  )}
                </button>
              </h3>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                hidden={!expanded}
              >
                <p>{t(faq.answer)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
