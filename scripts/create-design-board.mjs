import { readFile, writeFile } from "node:fs/promises";
const hero = (await readFile("public/images/hero.jpg")).toString("base64");
const colors = [
  ["Paper", "#f7f7f0"],
  ["Ink", "#252820"],
  ["Lime", "#d9ed9b"],
  ["Surface", "#eeefe6"],
  ["Muted", "#6a6d63"],
];
const swatches = colors
  .map(
    ([name, color], i) =>
      `<g transform="translate(${64 + i * 211},214)"><rect width="185" height="64" rx="3" fill="${color}" stroke="#dcded4"/><text y="87" font-size="13">${name}</text><text y="107" font-size="11" fill="#606b53">${color.toUpperCase()}</text></g>`,
  )
  .join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1440" height="1680" viewBox="0 0 1440 1680">
<title>Aurel Advisory — editable design board and homepage direction</title>
<desc>Original visual design handoff. Import this SVG into Figma for editable text and shapes. The photograph remains a raster image. All brand content is fictional.</desc>
<defs><clipPath id="photo"><rect x="64" y="895" width="1312" height="380" rx="4"/></clipPath></defs>
<rect width="1440" height="1680" fill="#f7f7f0"/>
<g font-family="Manrope,Arial,sans-serif" fill="#252820">
<text x="64" y="83" font-size="44" font-weight="600" letter-spacing="-2">aurel.</text>
<text x="66" y="105" font-size="8" letter-spacing="4">ADVISORY</text>
<text x="1080" y="83" font-size="11" letter-spacing="1.2">DESIGN SYSTEM / 01</text>
<path d="M64 145H1376" stroke="#dcded4"/>
<text x="64" y="185" font-size="10" letter-spacing="2">01 / PALETTE</text>${swatches}
<text x="64" y="390" font-size="10" letter-spacing="2">02 / TYPE &amp; COMPONENTS</text>
<text x="64" y="458" font-size="52" letter-spacing="-2.8">Independent thinking.</text>
<text x="64" y="518" font-family="Georgia,serif" font-style="italic" font-size="54" letter-spacing="-2">Lasting progress.</text>
<text x="830" y="430" font-size="14">Manrope / 200–800</text><text x="830" y="460" font-size="14" font-family="Georgia,serif" font-style="italic">Georgia Italic / editorial accent</text>
<rect x="830" y="488" width="232" height="54" rx="3" fill="#252820"/><text x="850" y="520" font-size="12" fill="#f7f7f0">Let’s shape what’s next</text><path d="M1028 509h10v10m-10 0 10-10" fill="none" stroke="#f7f7f0"/>
<rect x="1080" y="488" width="230" height="54" rx="3" fill="#d9ed9b"/><text x="1100" y="520" font-size="12">A considered next step</text>
<path d="M64 590H1376" stroke="#dcded4"/>
<text x="64" y="636" font-size="10" letter-spacing="2">03 / HOMEPAGE DIRECTION</text>
<circle cx="68" cy="689" r="3" fill="#768757"/><text x="82" y="693" font-size="9" letter-spacing="1.4">INDEPENDENT THINKING. LASTING PROGRESS.</text>
<text x="64" y="778" font-size="78" letter-spacing="-4">Clarity for today.</text>
<text x="64" y="862" font-size="78" letter-spacing="-4">Confidence for <tspan font-family="Georgia,serif" font-style="italic">tomorrow.</tspan></text>
<image x="64" y="635" width="1312" height="880" preserveAspectRatio="xMidYMid slice" clip-path="url(#photo)" xlink:href="data:image/jpeg;base64,${hero}"/>
<rect x="88" y="1170" width="2" height="53" fill="#d9ed9b"/><rect x="101" y="1165" width="282" height="67" rx="2" fill="#252820" opacity=".76"/>
<text x="115" y="1193" fill="#f7f7f0" font-size="21">Perspective changes</text><text x="115" y="1220" fill="#f7f7f0" font-size="21">everything.</text>
<text x="64" y="1332" font-size="10" letter-spacing="1.4">STRATEGY. TRANSFORMATION. INNOVATION.</text>
<path d="M64 1360H1376" stroke="#dcded4"/>
<text x="64" y="1410" font-size="10" letter-spacing="2">04 / RESPONSIVE FRAMES &amp; CONTENT</text>
<text x="64" y="1450" font-size="14">Desktop 1440px / 56px margins / 12 columns / 24px gutters</text>
<text x="64" y="1482" font-size="14">Mobile 390px / 20px margins / single-column content / 48px+ primary actions</text>
<text x="64" y="1530" font-size="12" fill="#606b53">Home · About · Services · Strategy &amp; growth · Selected work · FAQ · Contact</text>
<text x="64" y="1595" font-size="11" fill="#606b53">FICTIONAL AGENCY PORTFOLIO DEMONSTRATION / All case studies and statistics are illustrative.</text>
<text x="64" y="1622" font-size="11" fill="#606b53">See DESIGN.md for component states, motion, accessibility, and the complete Figma frame specification.</text>
</g></svg>`;
await writeFile("docs/aurel-design-board.svg", svg);
console.log("Created editable SVG design board for Figma import");
