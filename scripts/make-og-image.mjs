// Renders the default social share image (1200x630) to
// public/assets/images/og-default.png. Run manually after changing the
// branding: `node scripts/make-og-image.mjs`
//
// Drawn as SVG and rasterized with sharp, so the text uses a real font instead
// of a hand-placed bitmap. Inter is installed system-wide and picked up by fontconfig.
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/assets/images/og-default.png");

const W = 1200;
const H = 630;
const BG = "#1e2030";
const FG = "#cad3f5";
const MUTED = "#a5adce";
const ACCENT = "#c6a0f6";

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${ACCENT}"/>
  <text x="80" y="290" fill="${FG}" font-family="Inter" font-size="92" font-weight="700">Technorage</text>
  <text x="80" y="368" fill="${ACCENT}" font-family="Inter" font-size="40" font-weight="500">Deepu K Sasidharan</text>
  <text x="80" y="436" fill="${MUTED}" font-family="Inter" font-size="32" font-weight="400">Local LLMs · Rust · Java · Kubernetes · Linux · OAuth</text>
  <text x="80" y="540" fill="${MUTED}" font-family="Inter" font-size="28" font-weight="400">deepu.tech</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
