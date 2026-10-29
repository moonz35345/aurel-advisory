import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createTranslator } from "../src/lib/i18n/translate";
import { locales, localeCookie, type Locale } from "../src/lib/i18n/config";
import { messages } from "../src/lib/i18n/messages";
const routes = [
  "/",
  "/about",
  "/services",
  "/services/strategy-growth",
  "/case-studies",
  "/faq",
  "/contact",
];
const headers = [
  "Clarity for today.",
  "Independent by design.",
  "The right perspective.",
  "Ambition, with direction.",
  "New perspectives.",
  "A little less uncertainty.",
  "What’s your next chapter?",
];

for (const locale of locales) {
  test(`${locale}: all pages render translated content, metadata and fit mobile`, async ({
    page,
    context,
    baseURL,
  }) => {
    test.setTimeout(60000);
    await context.addCookies([
      { name: localeCookie, value: locale, url: baseURL! },
    ]);
    const t = createTranslator(locale);
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const [index, route] of routes.entries()) {
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1")).toContainText(t(headers[index]));
        await expect(page.locator(".language-trigger")).toContainText(
          locale.toUpperCase(),
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${route} overflows in ${locale} at ${width}px`,
        ).toBeTruthy();
        if (width === 1440) {
          const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          expect(
            results.violations,
            `${route} accessibility in ${locale}`,
          ).toEqual([]);
        }
      }
    }
    await expect(page).toHaveTitle(new RegExp(t("Let’s talk")));
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      { en: "en_GB", de: "de_DE", nl: "nl_NL", tr: "tr_TR" }[locale],
    );
    await page.getByRole("button", { name: t("Submit demo inquiry") }).click();
    await expect(page.locator(".field-error").first()).toHaveText(
      t("Please enter your full name (at least 2 characters)."),
    );
  });
}

test("language menu uses native names, persists selection and preserves form entries", async ({
  page,
  context,
}) => {
  await page.goto("/contact");
  await page.locator("#name").fill("Sample Visitor");
  await page.locator("#service").selectOption("Business transformation");
  await page.locator(".language-trigger").click();
  await expect(page.locator(".language-popover")).toBeVisible();
  await page.getByRole("button", { name: "DE Deutsch" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("#name")).toHaveValue("Sample Visitor");
  await expect(page.locator("#service")).toHaveValue("Business transformation");
  await expect(page.locator("#service option:checked")).toHaveText(
    "Unternehmenstransformation",
  );
  expect(
    (await context.cookies()).find((c) => c.name === localeCookie)?.value,
  ).toBe("de");
  await page.reload();
  await expect(page.locator("h1")).toContainText(
    "Was ist Ihr nächstes Kapitel?",
  );
  await page.locator(".language-trigger").click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".language-popover")).not.toBeVisible();
  await expect(page.locator(".language-trigger")).toBeFocused();
  for (const [locale, name] of [
    ["nl", "NL Nederlands"],
    ["tr", "TR Türkçe"],
    ["en", "EN English"],
  ] as const) {
    await page.locator(".language-trigger").click();
    await page.getByRole("button", { name }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await page.goto("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  }
});

test("mobile language menu closes outside and allows keyboard selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  await page.locator(".language-trigger").click();
  await page.getByRole("button", { name: "TR Türkçe" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await page.locator(".language-trigger").click();
  await page.mouse.click(10, 400);
  await expect(page.locator(".language-popover")).not.toBeVisible();
  await page.getByRole("button", { name: "Gezinmeyi aç" }).click();
  await page
    .getByRole("navigation", { name: "Mobil gezinme" })
    .getByRole("link", { name: "Uzmanlığımız" })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
});

test("case-study filters and modal translate without changing filter identifiers", async ({
  page,
}) => {
  await page.goto("/case-studies");
  await page
    .getByRole("button", { name: "Digital & innovation", exact: true })
    .click();
  await page.locator(".language-trigger").click();
  await page.getByRole("button", { name: "NL Nederlands" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "nl");
  await expect(page.locator(".case-card")).toHaveCount(1);
  await expect(page.locator(".filter-count")).toContainText(
    "1 portfoliovoorbeeld",
  );
  await page.locator(".case-card").click();
  await expect(page.getByRole("dialog")).toContainText(
    "Hypothetische uitkomst, geen gemeten resultaat.",
  );
});

test("all dictionary entries have complete translations and preserve interpolation", () => {
  for (const [key, translations] of Object.entries(messages)) {
    for (const locale of ["de", "nl", "tr"] as Locale[]) {
      const value = translations[locale as Exclude<Locale, "en">];
      expect(value.trim(), `${key} missing ${locale}`).not.toBe("");
      expect(value.match(/\{\w+\}/g)?.sort() ?? []).toEqual(
        key.match(/\{\w+\}/g)?.sort() ?? [],
      );
    }
  }
});
