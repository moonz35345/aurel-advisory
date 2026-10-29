import type { Locale } from "./config";
import { coreMessages } from "./core";
import { pageMessages } from "./pages";
import { detailMessages } from "./details";
import { caseMessages } from "./cases";
import { faqMessages } from "./faq";
import { seoMessages } from "./seo";
export const messages: Record<
  string,
  Record<Exclude<Locale, "en">, string>
> = Object.fromEntries(
  [
    ...coreMessages,
    ...pageMessages,
    ...detailMessages,
    ...caseMessages,
    ...faqMessages,
    ...seoMessages,
  ].map(([en, de, nl, tr]) => [en, { de, nl, tr }]),
);
