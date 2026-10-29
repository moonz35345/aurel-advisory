"use client";
import { useI18n } from "@/components/locale-provider";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/lib/data";
import { Wordmark } from "./ui";
import { LanguageMenu } from "./language-menu";

export function Header() {
  const { t } = useI18n();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle.current) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 1101px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", handleKey);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          aria-label={t("Aurel Advisory home")}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label={t("Main navigation")}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageMenu onOpen={() => setOpen(false)} />
          <Link href="/contact" className="header-contact">
            {t("Let’s talk")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={t(open ? "Close navigation" : "Open navigation")}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        ref={menu}
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!open}
      >
        <nav aria-label={t("Mobile navigation")}>
          {[...navigation, { href: "/contact", label: "Let’s talk" }].map(
            (item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
                aria-current={
                  pathname.startsWith(item.href) ? "page" : undefined
                }
              >
                {t(item.label)}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ),
          )}
        </nav>
        <p>{t("Independent thinking. Lasting progress.")}</p>
      </div>
    </header>
  );
}
