# Aurel Advisory

A complete seven-page corporate website for a fictional European consulting company. Built as a high-end agency portfolio demonstration with Next.js App Router, TypeScript, Tailwind CSS 4, and reusable React components.

## Run locally

Requires Node.js 20.9+ (Node 24 recommended) and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`. This workspace uses the Next.js project directly; no external hosting account is needed.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

The production build supports all seven pages, sitemap, robots file, favicon, social image, and 404 page. Content pages render on the server using the selected language. No database or secrets are required. Assets and the Manrope font are stored locally; normal browsing makes no font or photo requests to third parties.

## Pages

| Route                       | Purpose                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------- |
| `/`                         | Editorial landing page, services, animated statistics, selected work, process, and FAQs |
| `/about`                    | Brand perspective, values, and approach                                                 |
| `/services`                 | Service overview, capability breakdowns, and comparison table                           |
| `/services/strategy-growth` | Detailed example service, scope, process, and related portfolio work                    |
| `/case-studies`             | Filterable fictional portfolio and keyboard-accessible case-study dialogs               |
| `/faq`                      | Filterable questions with accessible disclosure controls                                |
| `/contact`                  | Validated project inquiry demonstration                                                 |

Strategy & growth is the dedicated service-detail page. The other two service cards link to the shared engagement approach within that page; their overview capabilities are listed on `/services`. This keeps the requested seven-page structure without inventing extra service-detail pages.

## Fictional content and form behaviour

Aurel Advisory is not a real consulting business. All companies, engagements, statistics, and outcomes are explicitly fictional or illustrative. No real client relationships, testimonials, reviews, or endorsements are claimed. Photographs are editorial stock imagery, not claimed client properties or team portraits.

The inquiry form validates name, email format, company, service interest, a minimum 20-character description, and demo acknowledgment. Budget is optional. Errors are associated with their inputs, and the first invalid input receives focus. Successful validation moves focus to a confirmation. No inquiry is sent or stored on a server. No local storage or analytics are used. A functional cookie stores only the selected interface language. Use sample details. This is intentionally a complete demo interaction, not a functioning consulting lead inbox.

Before adapting to a real business, replace the fictional content, connect a server-side validated submission handler, supply privacy and retention terms for that handler, and add actual company and legal details. Do not turn illustrative metrics into real claims.

## Architecture

```text
src/app/              App Router pages, global styles, metadata routes
src/components/       Shared UI, navigation, forms, filters, statistics, FAQs
src/lib/data.ts       Editable navigation, service, case-study, and FAQ content
src/lib/metadata.ts   Canonical URL helper and public site origin
public/images/        Local optimised-source stock photography
public/fonts/         Self-hosted Manrope variable font and its OFL license
docs/                 Design system and Figma handoff specification
tests/                Playwright end-to-end regression coverage
scripts/              Optional asset refresh script
```

Pages are server components with request-aware translations; shared presentation and interactive components use a locale context and are also server-rendered initially. Images use Next.js Image for responsive sizing and optimisation. Primary page images are prioritised and secondary images lazy load. The design uses Tailwind CSS 4 with semantic component classes for the visual system.

## Languages

English is the default. The header language menu adds Deutsch (German), Nederlands (Dutch), and Türkçe (Turkish), using native language names and a compact globe control that matches the site. It supports keyboard navigation, Escape, outside-click dismissal, and mobile layouts.

All seven pages, navigation, service comparison, case studies and dialogs, FAQs, form labels, validation errors, confirmation, image alternatives, metadata, and fictional-content notices are translated. Brand names and reserved example contact details remain unchanged. The same routes are retained; this is a language preference, not a separate set of language-prefixed URLs.

Translations live in `src/lib/i18n/`, grouped by subject. `getTranslator()` is used in server components and metadata; `useI18n()` exposes the same dictionary through `LocaleProvider` for client components. `setLanguage()` validates the supported language and saves an HTTP-only, SameSite=Lax preference cookie for one year. Server rendering reads that cookie and sets the document language and Open Graph locale. The selection survives navigation and reloads. Form values and case-study filters retain stable English identifiers internally, preserving in-progress state when the display language changes.

## Design and Figma

The original visual direction combines warm ivory, charcoal, restrained lime, large Manrope typography, Georgia italic accents, and architectural imagery. [godly.design](https://godly.design/) was reviewed for visual inspiration; no template or site was copied.

Figma was not connected in the build environment, so no live Figma file was created or claimed. See [the design specification](docs/DESIGN.md) and [design tokens](docs/tokens.json) for a Figma-ready handoff with frame sizes, layout grids, typography, components, and interaction states.

Import [the editable SVG design board](docs/aurel-design-board.svg) into Figma for the palette, type styles, component direction, and homepage composition. Text and shapes are editable; the photograph is embedded raster imagery. Use Manrope in Figma to match the implementation. Regenerate the board with `node scripts/create-design-board.mjs`.

Rendered previews: [desktop](docs/home-desktop.png), [mobile](docs/home-mobile.png), and [first screen](docs/home-first-screen.png). Capture fresh previews against a running production server with `PLAYWRIGHT_BASE_URL` set to its origin and `node scripts/capture-previews.mjs`.

## Accessibility and responsive behaviour

- Semantic landmarks, a skip link, one H1 per page, visible focus indicators, and descriptive image alternatives.
- Mobile menu supports Escape, focus cycling, current-page labels, and automatic close on navigation.
- Native modal dialogs provide keyboard focus containment, Escape-to-close, and focus return.
- FAQ controls expose expanded state and label their answer regions; filters expose pressed state.
- The comparison is a semantic table within a keyboard-scrollable region.
- Counters honour reduced motion, expose final values to assistive technology, and cancel observers/animation frames when unmounted.
- Form inputs have explicit labels, autocomplete hints, linked errors, and mobile-friendly input sizes.

## End-to-end checks

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts an isolated production server automatically on port 3103 and stops it when finished. It refuses to reuse an unrelated existing server. Coverage includes all seven routes, unique metadata, image loading, filtering and dialogs, FAQ keyboard controls, invalid and valid form submissions, mobile navigation, narrow viewport overflow, reduced-motion counters, SEO endpoints, and 404 handling. The suite does not contact a real submission service.

You can also set `PLAYWRIGHT_BASE_URL` to an explicitly started local production server; in this mode Playwright manages no server lifecycle. Automated axe checks cover WCAG 2 A/AA and 2.1 AA rules on desktop and mobile, plus the open modal and form error state. Automated checks complement keyboard and visual review and do not establish a complete accessibility certification.

For Windows certificate-managed environments, `NODE_USE_SYSTEM_CA=1` may be needed for dependency installation. The optional asset downloader can run with `node --use-system-ca scripts/download-assets.mjs`; it is not required to build or run the project.

## SEO and deployment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final origin before building. The default `https://aurel.example` deliberately uses a reserved example domain. Each page has a unique title, description, canonical URL, and Open Graph metadata. A generated social image, sitemap, and robots file are included. The project is compatible with standard Next.js hosting and `npm run build && npm start`; no deployment was performed.

## Asset credits

Photography is downloaded from Unsplash and used as stock visual content, without implying endorsement or relationships. Original image references are retained in [docs/ASSETS.md](docs/ASSETS.md). Manrope is by the Manrope Project Authors and distributed under the SIL Open Font License, included in `public/fonts/OFL.txt`. Icons are from Lucide (ISC license, included with the installed package). The Aurel wordmark and visual composition are original for this demonstration.
