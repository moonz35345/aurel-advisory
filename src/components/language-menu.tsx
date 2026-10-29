"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { setLanguage } from "@/app/actions";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useI18n } from "./locale-provider";
import { languageNames, locales, type Locale } from "@/lib/i18n/config";

export function LanguageMenu({ onOpen }: { onOpen?: () => void }) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    root.current?.addEventListener("keydown", escape);
    const current = root.current;
    return () => {
      document.removeEventListener("pointerdown", outside);
      current?.removeEventListener("keydown", escape);
    };
  }, [open]);
  function select(next: Locale) {
    setOpen(false);
    trigger.current?.focus();
    if (next === locale) return;
    startTransition(async () => {
      await setLanguage(next);
    });
  }
  return (
    <div
      className="language-switcher"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="language-trigger"
        aria-expanded={open}
        aria-controls="language-options"
        aria-label={`${t("Choose language")}: ${languageNames[locale]}`}
        aria-busy={pending}
        disabled={pending}
        onClick={() => {
          if (!open) onOpen?.();
          setOpen(!open);
        }}
      >
        <Globe2 size={15} strokeWidth={1.5} aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={open ? "is-expanded" : ""}
          size={12}
          aria-hidden="true"
        />
      </button>
      <div id="language-options" className="language-popover" hidden={!open}>
        <p>{t("Choose language")}</p>
        <div role="group" aria-label={t("Available languages")}>
          {locales.map((code) => (
            <button
              type="button"
              key={code}
              lang={code}
              aria-pressed={locale === code}
              onClick={() => select(code)}
            >
              <span className="language-code">{code.toUpperCase()}</span>
              <span>{languageNames[code]}</span>
              {locale === code && <Check size={15} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">
        {pending ? t("Changing language…") : ""}
      </span>
    </div>
  );
}
