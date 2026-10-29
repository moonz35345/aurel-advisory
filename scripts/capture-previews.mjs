import { chromium } from "playwright";
const origin = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3104";
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(origin);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images).map((image) => {
          image.loading = "eager";
          return image.decode();
        }),
      );
    });
    await page.locator(".stats-section").scrollIntoViewIfNeeded();
    await page
      .locator(".stat-number")
      .first()
      .filter({ hasText: "120+" })
      .waitFor();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `docs/home-${name}.png`, fullPage: true });
    if (name === "desktop")
      await page.screenshot({ path: "docs/home-first-screen.png" });
    console.log(`Captured ${name} preview`);
  }
} finally {
  await browser.close();
}
