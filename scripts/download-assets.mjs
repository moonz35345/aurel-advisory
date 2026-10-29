import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
await mkdir("public/fonts", { recursive: true });
const photos = {
  hero: ["photo-1487958449943-2429e8be8625", 2200],
  wind: ["photo-1532601224476-15c79f2f7a51", 1400],
  building: ["photo-1486406146926-c627a92ad1ab", 1400],
  interior: ["photo-1600210492486-724fe5c67fb0", 1400],
  city: ["photo-1511818966892-d7d671e672a2", 1800],
  about: ["photo-1497366811353-6870744d04b2", 1800],
};
await Promise.all(
  Object.entries(photos).map(async ([name, [id, width]]) => {
    const response = await fetch(
      `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`,
    );
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    await writeFile(
      `public/images/${name}.jpg`,
      Buffer.from(await response.arrayBuffer()),
    );
    console.log(`Downloaded ${name}`);
  }),
);
const css = await fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
  {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    },
  },
).then((r) => r.text());
const latin = css.split("/* latin */").at(-1);
const fontUrl = latin?.match(/url\(([^)]+)\)/)?.[1];
if (!fontUrl) throw new Error("Latin font URL missing");
const font = await fetch(fontUrl);
if (!font.ok) throw new Error("Font download failed");
await writeFile(
  "public/fonts/manrope-latin.woff2",
  Buffer.from(await font.arrayBuffer()),
);
const license = await fetch(
  "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt",
);
if (!license.ok) throw new Error("Font license download failed");
await writeFile("public/fonts/OFL.txt", await license.text());
console.log("Downloaded Manrope font and SIL Open Font License");
