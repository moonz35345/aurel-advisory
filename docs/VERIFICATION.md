# Verification

Verified locally on Windows with Node.js 24 and a production Next.js 16.4.3 build.

- ESLint: passed with zero warnings.
- TypeScript: strict type check passed.
- Next.js production build: passed; all seven content pages render on demand in the selected language. Metadata assets remain static.
- Chromium end-to-end suite: 18 tests passed, including original functionality and multilingual regression coverage.
- Routes, metadata, canonical URLs, primary landmarks, and all page images checked.
- All seven pages checked for horizontal page overflow at 320, 390, 768, and 1440px.
- Case-study filtering, native dialog opening, Escape, and focus return checked.
- FAQ filters and keyboard disclosure controls checked.
- Invalid form fields, first-error focus, successful local confirmation, reset, and absence of data-submission requests checked.
- Mobile navigation focus cycling, Escape, and close after navigation checked.
- Reduced-motion statistics, fictional-data labeling, sitemap, robots file, social image, icon, and 404 checked.
- Automated axe WCAG A/AA checks passed on all pages at 1440px and 390px, plus the open case-study dialog and invalid inquiry form.
- Desktop and mobile homepage previews captured from the production build for visual review.
- English, German, Dutch, and Turkish content checked on all seven pages at 320, 390, and 1440px, including automated desktop accessibility checks in each language.
- Language selection checked for persistence across reloads and navigation, keyboard selection, Escape and outside-click dismissal, preservation of form entries, stable service values, and preservation of portfolio filters.
- Form errors and page metadata checked in each language; all dictionary entries checked for complete translations and matching interpolation placeholders.
- The open language dropdown was also checked with axe; no automated WCAG A/AA violations were found.

The browser suite uses Chromium. Safari and Firefox were not tested. Automated accessibility scans do not replace comprehensive assistive-technology testing. The inquiry intentionally remains a local demonstration and was not connected to a delivery service. Figma was not connected; an importable SVG board, tokens, and frame specification are provided instead of a live Figma file. No deployment was performed.
