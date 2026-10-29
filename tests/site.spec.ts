import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/services",
  "/services/strategy-growth",
  "/case-studies",
  "/faq",
  "/contact",
];
test("all seven pages have a unique title, canonical URL, landmark, and no broken images", async ({
  page,
}) => {
  const titles = new Set<string>();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://aurel.example${route === "/" ? "" : route}`,
    );
    titles.add(await page.title());
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((image) => {
          image.loading = "eager";
          return image.decode().catch(() => undefined);
        }),
      );
    });
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
        ),
    ).toBeTruthy();
  }
  expect(titles.size).toBe(7);
  expect(errors).toEqual([]);
});
test("case study filters and accessible modal work", async ({ page }) => {
  await page.goto("/case-studies");
  await expect(page.locator(".case-card")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Digital & innovation", exact: true })
    .click();
  await expect(page.locator(".case-card")).toHaveCount(1);
  await expect(page.locator(".filter-count")).toContainText(
    "1 portfolio example",
  );
  await page.locator(".case-card").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Hypothetical outcome");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".case-card")).toBeFocused();
  await page.getByRole("button", { name: "All projects" }).click();
  await expect(page.locator(".case-card")).toHaveCount(4);
});
test("inquiry validation focuses errors and confirms locally without a submission", async ({
  page,
}) => {
  await page.goto("/contact");
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (["POST", "PUT", "PATCH"].includes(request.method()))
      mutations.push(request.url());
  });
  await page.getByRole("button", { name: "Submit demo inquiry" }).click();
  await expect(page.getByLabel("Full name *")).toBeFocused();
  await expect(page.locator(".field-error")).toHaveCount(6);
  await page.getByLabel("Full name *").fill("Demo Visitor");
  await page.getByLabel("Work email *").fill("invalid");
  await page.getByRole("button", { name: "Submit demo inquiry" }).click();
  await expect(page.getByLabel("Work email *")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByLabel("Work email *").fill("demo@example.com");
  await page.getByLabel("Company *").fill("Example Company");
  await page
    .getByLabel("How can we help? *")
    .selectOption({ label: "Strategy & growth" });
  await page
    .getByLabel("A little about your challenge *")
    .fill("This is a sample inquiry about a fictional market-entry strategy.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit demo inquiry" }).click();
  await expect(page.locator(".form-success")).toBeVisible();
  await expect(page.locator(".form-success")).toBeFocused();
  await expect(page.locator(".form-success")).toContainText(
    "nothing has been sent",
  );
  expect(mutations).toEqual([]);
  await page.getByRole("button", { name: "Try another inquiry" }).click();
  await expect(page.getByLabel("Full name *")).toHaveValue("");
});
test("FAQ filters, disclosure states, and keyboard controls work", async ({
  page,
}) => {
  await page.goto("/faq");
  await page
    .getByRole("button", { name: "About this demo", exact: true })
    .click();
  const question = page.getByRole("button", {
    name: /Are the company, case studies/,
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: /Are the company/ }),
  ).toContainText("No genuine client relationships");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
});
test("mobile navigation traps focus and closes on Escape and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  const last = page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Let’s talk" });
  await last.focus();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Our expertise" })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeVisible();
});
test("all routes fit narrow mobile and desktop viewports", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} overflows at ${width}px`,
      ).toBeTruthy();
    }
  }
});
test("reduced motion statistics settle at the labeled fictional values", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".stats-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".stat-number").first()).toHaveText("120+");
  await expect(page.locator(".stats-disclaimer")).toContainText(
    "FICTIONAL DATA",
  );
});
test("metadata assets and 404 are available", async ({ request }) => {
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/opengraph-image",
    "/icon.svg",
  ])
    expect((await request.get(path)).status()).toBe(200);
  expect((await request.get("/a-page-that-does-not-exist")).status()).toBe(404);
});
test("all pages pass automated WCAG A and AA checks on desktop and mobile", async ({
  page,
}) => {
  test.setTimeout(60000);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations,
        `Accessibility issues on ${route} at ${width}px`,
      ).toEqual([]);
    }
  }
});
test("open case-study dialog and invalid form pass automated accessibility checks", async ({
  page,
}) => {
  await page.goto("/case-studies");
  await page.locator(".case-card").first().click();
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await page.goto("/contact");
  await page.getByRole("button", { name: "Submit demo inquiry" }).click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
