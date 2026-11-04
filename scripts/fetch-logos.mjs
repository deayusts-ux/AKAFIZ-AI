/**
 * Downloads official brand marks for every tool.
 * 1. Prefer Simple Icons SVGs (brand glyphs in official colors).
 * 2. Fall back to the site's official favicon.
 * Results are written locally so the site has zero third-party image requests.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import * as simpleIcons from "simple-icons";

const root = process.cwd();
const dataFile = path.join(root, "src", "data", "tools.ts");
const outDir = path.join(root, "public", "logos");

const alias = {
  claude: "anthropic",
  gemini: "googlegemini",
  deepseek: "deepseek",
  perplexity: "perplexity",
  qwen: "qwen",
  "meta-ai": "metaai",
  "microsoft-copilot": "githubcopilot",
  cursor: "cursor",
  "github-copilot": "githubcopilot",
  windsurf: "windsurf",
  replit: "replit",
  cline: "cline",
  "adobe-firefly": "adobe",
  elevenlabs: "elevenlabs",
  suno: "suno",
  grammarly: "grammarly",
  "notion-ai": "notion",
  "semantic-scholar": "semanticscholar",
  figma: "figma",
  zapier: "zapier",
  make: "make",
  n8n: "n8n",
  hubspot: "hubspot",
  mailchimp: "mailchimp",
  buffer: "buffer",
  deepl: "deepl",
  "google-translate": "googletranslate",
  languagetool: "languagetool",
  quickbooks: "quickbooks",
  xero: "xero",
  "zoho-books": "zoho",
  khanmigo: "khanacademy",
  "duolingo-max": "duolingo",
  quizlet: "quizlet",
  framer: "framer",
  wix: "wix",
  hostinger: "hostinger",
  glide: "glide",
  semrush: "semrush",
  "intercom-fin": "intercom",
  zendesk: "zendesk",
  "hostinger-ai-builder": "hostinger",
  "figma-ai": "figma",
  "canva-ai": null,
  "bolt-new": null,
};

const upgradeCandidates = {
  "adobe-podcast": ["https://podcast.adobe.com/adobe-podcast-favicon.svg"],
  ideogram: ["https://ideogram.ai/favicon.svg"],
  rytr: ["https://rytr.me/apple-touch-icon.png"],
  neuronwriter: ["https://neuronwriter.com/wp-content/uploads/2025/01/pobrane.png"],
  "surfer-seo": ["https://surferseo.com/favicon/icon.svg"],
  "elsa-speak": ["https://id.elsaspeak.com/wp-content/themes/elsawebsite/assets/images/favicon.png"],
};

const iconBySlug = new Map();
for (const value of Object.values(simpleIcons)) {
  if (value && typeof value === "object" && value.slug && value.path && value.hex) {
    iconBySlug.set(value.slug, value);
  }
}

function luminance(hex) {
  const n = parseInt(hex, 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function svgFor(icon) {
  const dark = luminance(icon.hex) < 0.32;
  const fill = dark ? "#F2F4FF" : `#${icon.hex}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${icon.title.replace(/"/g, "&quot;")}"><path fill="${fill}" d="${icon.path}"/></svg>\n`;
  return { svg, invertOnLight: dark };
}

async function download(url, timeout = 15000) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/png,image/svg+xml,image/*,*/*",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(timeout),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { buffer: Buffer.from(await response.arrayBuffer()), type: response.headers.get("content-type") ?? "" };
}

const source = await fs.readFile(dataFile, "utf8");
const entries = [...source.matchAll(/slug: "([^"]+)",[\s\S]*?name: "([^"]+)",[\s\S]*?website: "([^"]+)"/g)].map(
  ([, slug, name, website]) => ({ slug, name, website }),
);

if (entries.length === 0) throw new Error("No tools parsed from tools.ts");

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const manifest = {};
const failed = [];
let iconCount = 0;
let faviconCount = 0;

for (const entry of entries) {
  const iconSlug = Object.prototype.hasOwnProperty.call(alias, entry.slug) ? alias[entry.slug] : entry.slug;
  const icon = iconSlug ? iconBySlug.get(iconSlug) : undefined;

  if (icon) {
    const { svg, invertOnLight } = svgFor(icon);
    const file = `${entry.slug}.svg`;
    await fs.writeFile(path.join(outDir, file), svg, "utf8");
    manifest[entry.slug] = { src: `/logos/${file}`, kind: "icon", ...(invertOnLight ? { invertOnLight: true } : {}) };
    iconCount += 1;
    continue;
  }

  try {
    const domain = new URL(entry.website).hostname.replace(/^www\./, "");
    const { buffer, type } = await download(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    if (!type.includes("image") || buffer.length < 250) throw new Error(`invalid image (${type}, ${buffer.length}b)`);
    const file = `${entry.slug}.png`;
    await fs.writeFile(path.join(outDir, file), buffer);
    manifest[entry.slug] = { src: `/logos/${file}`, kind: "favicon" };
    faviconCount += 1;
  } catch (error) {
    failed.push({ slug: entry.slug, name: entry.name, reason: String(error) });
  }
}

async function upgrade(entry) {
  const base = new URL(entry.website).origin;
  const candidates = [
    ...(upgradeCandidates[entry.slug] ?? []),
    "/apple-touch-icon.png",
    "/apple-touch-icon-precomposed.png",
    "/favicon-192x192.png",
    "/android-chrome-192x192.png",
    "/favicon.png",
  ].map((candidate) => (candidate.startsWith("http") ? candidate : `${base}${candidate}`));

  let best = null;

  for (const url of candidates) {
    try {
      const { buffer, type } = await download(url, 10000);
      if (buffer.length < 250) continue;
      if (type.includes("svg") || url.endsWith(".svg")) {
        const text = buffer.toString("utf8");
        if (!text.includes("<svg")) continue;
        best = { buffer, ext: "svg", width: 512 };
        break;
      }
      const meta = await sharp(buffer).metadata();
      const width = meta.width ?? 0;
      if (width < 96) continue;
      if (!best || width > best.width) best = { buffer, ext: "png", width };
      if (width >= 180) break;
    } catch {
      // try the next candidate
    }
  }

  if (!best) return null;
  const file = `${entry.slug}.${best.ext}`;
  await fs.writeFile(path.join(outDir, file), best.buffer);
  return { src: `/logos/${file}`, kind: "favicon" };
}

// Replace low-resolution or missing favicons with the best official mark we can find.
for (const entry of entries) {
  const current = manifest[entry.slug];
  let needsUpgrade = false;

  if (!current) {
    needsUpgrade = true;
  } else if (current.kind === "favicon" && current.src.endsWith(".png")) {
    const filePath = path.join(root, "public", current.src.replace(/^\//, ""));
    try {
      const meta = await sharp(filePath).metadata();
      needsUpgrade = (meta.width ?? 0) < 96;
    } catch {
      needsUpgrade = true;
    }
  }

  if (!needsUpgrade) continue;

  const upgraded = await upgrade(entry);
  if (upgraded) {
    // Remove the previous low-res file so it does not ship in the build.
    if (current?.src && current.src !== upgraded.src) {
      await fs.rm(path.join(root, "public", current.src.replace(/^\//, "")), { force: true });
    }
    manifest[entry.slug] = upgraded;
    const failedIndex = failed.findIndex((item) => item.slug === entry.slug);
    if (failedIndex >= 0) failed.splice(failedIndex, 1);
    console.log(`↑ upgraded ${entry.slug}`);
  }
}

const manifestSource = `import type { LogoAsset } from "@/lib/types";

/**
 * Local brand assets generated by scripts/fetch-logos.mjs.
 * Every image is served from /public/logos to keep the site fast and offline-safe.
 */
export const logos: Record<string, LogoAsset> = ${JSON.stringify(manifest, null, 2)};

export function getLogo(slug: string): LogoAsset | undefined {
  return logos[slug];
}
`;

await fs.writeFile(path.join(root, "src", "data", "logos.ts"), manifestSource, "utf8");

console.log(`Parsed ${entries.length} tools`);
console.log(`  ${iconCount} brand SVGs`);
console.log(`  ${faviconCount} official favicons`);
console.log(`  ${failed.length} fall back to monograms`);
for (const item of failed) console.log(`  - ${item.slug} (${item.name}): ${item.reason}`);
