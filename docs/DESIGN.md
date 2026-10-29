# Aurel Advisory — design specification

## Direction

Independent thinking, expressed through an open editorial grid. Warm paper rather than bright white; charcoal rather than absolute black; a soft lime accent rather than conventional corporate blue. Architectural stock imagery expresses perspective, structure, and possibility. Manrope creates precision; an italic serif adds a human note. The visual research reference is https://godly.design/.

Figma connectivity was unavailable in this session. This document is the handoff specification, not a claim that a Figma file exists.

An editable SVG board is included at `aurel-design-board.svg`. Import it into Figma to seed the palette, typography, button treatments, and homepage direction. The image is embedded to keep the file portable; text and shapes remain vector elements. Install or enable Manrope in Figma to match its typography. Full desktop and mobile rendered previews are also included in this directory.

## Figma setup

Create pages called Foundations, Components, Desktop, and Mobile. Use 1440px desktop frames and 390px mobile frames. Additional QA widths: 320, 768, and 1024px. Use a 12-column desktop grid with 56px margins, 24px gutters, and a 1320px maximum content width. Mobile frames use 20px margins and a single column; two columns are reserved for counters, process steps, and footer links. Use Auto Layout for every text and content group, fill-container widths, and intrinsic heights.

Create seven frames in Desktop and Mobile: Home, About, Services, Strategy & growth, Selected work, FAQ, and Contact. Maintain the same navigation and footer instances across all frames. Page sections and matching source components are described in README.md.

## Foundations

| Token        | Value   | Use                        |
| ------------ | ------- | -------------------------- |
| Paper        | #F7F7F0 | Main page background       |
| Ink          | #252820 | Headlines, primary buttons |
| Muted        | #6A6D63 | Supporting body text       |
| Lime         | #D9ED9B | Conversion band, accents   |
| Soft surface | #EEEFE6 | Alternate sections         |
| Dark surface | #262C25 | Process section            |
| Line         | #DCDED4 | Dividers, subtle borders   |
| Error        | #9B3525 | Validation errors          |
| Focus        | #648332 | Keyboard focus outlines    |

Use Manrope variable, 200–800, and Georgia Italic. Hero desktop: 85/92px, weight 500, tracking -4.8px; page H1: 73/82px. Section H2: 44–48px with approximately 1.16 line height. Mobile hero: responsive 39–58px, section H2: 32–34px. Body: 12–16px depending on context, line height 1.8. Eyebrows: uppercase, 8–10px with 1.2–1.6px letter spacing. Avoid encoding meaning in small labels alone; every card has a larger descriptive heading.

Base spacing: 4px. Common spacing: 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. Surface corners: 3–5px. Buttons: at least 48–53px high. Mobile text inputs: 16px to avoid browser zoom.

## Component library

- Wordmark: geometric three-stroke symbol, lowercase aurel., small ADVISORY subtitle. Light and dark variants.
- Header: desktop links, outlined contact action; compact mobile header with toggle and dropdown. Active-link underline, hover, focus, expanded, and collapsed states.
- Language selector: quiet globe/locale-code trigger alongside the contact action. A paper dropdown with a subtle border and shadow lists English, Deutsch, Nederlands, and Türkçe by native name. The active option uses the soft lime surface and a check. Options are at least 44px high; Escape and outside clicks close the dropdown. On narrow mobile screens the secondary contact action gives way to the language control and navigation toggle. Longer translated headlines can wrap or hyphenate according to the document language.
- Buttons: dark, lime, outline; text with northeast arrow; visible focus. Hover shifts up 2px unless reduced motion is requested.
- Eyebrow: uppercase label with small circular accent. Light and dark variants.
- Service card: icon/index, heading, description, divided action footer. Entire card is a link. Default, hover, and focus states.
- Portfolio card: 3:2 image, prominent portfolio-example label, brand title, category and sector, descriptive heading. Hover image scale and action circle.
- Filters: multi-line group of toggle buttons. Default, hover, selected, focus states; pressed semantics in code.
- Dialog: native modal, maximum 650px, 45px desktop padding / 23px mobile. Close action, hypothetical metric, scope, conversion action, fictional-content notice.
- FAQ row: heading and disclosure action, index, plus/minus. Closed, open, focus states; expanded answers use linked accessible regions.
- Inquiry form: field label, input, hint, error. Include empty, editing, invalid, acknowledgment, and successful local-demo states. Do not show a sent-email confirmation.
- Comparison table: row headings, three service columns, check/minus icons with accessible labels. Horizontal overflow inside its own region on mobile.
- Counter: four columns desktop / two columns mobile. Always pair values with a visible fictional-data notice.
- CTA band: lime, large headline, clear contact action; stacked on mobile.
- Footer: brand, navigation, contact link, permanent fictional-portfolio notice.

## Motion and prototypes

Use restrained 200–250ms transitions. Counter animation is 1300ms ease-out once in view. No autoplay, parallax, or scroll hijacking. Respect reduced motion by showing counter final values directly and removing transforms. Prototype menu opening/closing, FAQ disclosure, filter selection, portfolio modal, and invalid/valid inquiry states. Navigation links should map to the seven routes in README.md.

## Content guardrails

Every portfolio card says PORTFOLIO EXAMPLE. The portfolio introduction explains that every business, project, and outcome is fictional. Metrics in dialogs say illustrative and hypothetical. Home statistics carry a permanent fictional-data caption. Do not add client logos, testimonials, genuine reviews, or real company claims. Stock photos illustrate the design and are not represented as company premises.
