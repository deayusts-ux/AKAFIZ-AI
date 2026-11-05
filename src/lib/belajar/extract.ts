const MAX_CHARS = 200_000;

export interface ExtractedText {
  text: string;
  truncated: boolean;
}

function pack(raw: string): ExtractedText {
  const text = raw.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return { text: text.slice(0, MAX_CHARS), truncated: text.length > MAX_CHARS };
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function isPdf(name: string, type: string) {
  return type === "application/pdf" || /\.pdf$/i.test(name);
}

function isDocx(name: string, type: string) {
  return type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || /\.docx$/i.test(name);
}

function isPptx(name: string, type: string) {
  return type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || /\.pptx$/i.test(name);
}

export function isTextExtractable(file: File): boolean {
  const name = file.name;
  const type = file.type;
  return (
    isPdf(name, type) ||
    isDocx(name, type) ||
    isPptx(name, type) ||
    type.startsWith("text/") ||
    /\.(txt|md|markdown|csv|tsv|json|xml|log|html|htm)$/i.test(name)
  );
}

async function extractPdf(file: File): Promise<ExtractedText> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false, useSystemFonts: true }).promise;
  const pages: string[] = [];
  for (let page = 1; page <= doc.numPages; page += 1) {
    const content = await (await doc.getPage(page)).getTextContent();
    let line = "";
    let lastY: number | null = null;
    const lines: string[] = [];
    for (const item of content.items) {
      if (!("str" in item) || !item.str) continue;
      const y = item.transform[5];
      if (lastY !== null && Math.abs(y - lastY) > 2.5) {
        lines.push(line.trim());
        line = "";
      }
      line += item.str;
      lastY = y;
    }
    lines.push(line.trim());
    const body = lines.filter((entry) => entry.length > 0).join("\n");
    if (body) pages.push(body);
  }
  await doc.destroy();
  return pack(pages.join("\n\n"));
}

async function readZipEntry(file: File, matcher: (path: string) => boolean): Promise<string[]> {
  const { unzipSync } = await import("fflate");
  const entries = unzipSync(new Uint8Array(await file.arrayBuffer()), { filter: (entry) => matcher(entry.name) });
  const decoder = new TextDecoder("utf-8");
  return Object.keys(entries)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((key) => decoder.decode(entries[key]));
}

async function extractDocx(file: File): Promise<ExtractedText> {
  const [document] = await readZipEntry(file, (path) => path === "word/document.xml");
  if (!document) return pack("");
  const paragraphs = decodeEntities(
    document
      .replace(/<(w:tab|w:br)\b[^/]*\/>/g, " ")
      .replace(/<\/w:p>/g, "\n")
      .replace(/<w:instrText\b[\s\S]*?<\/w:instrText>/g, "")
      .replace(/<[^>]+>/g, ""),
  );
  return pack(paragraphs);
}

async function extractPptx(file: File): Promise<ExtractedText> {
  const slides = await readZipEntry(file, (path) => /^ppt\/slides\/slide\d+\.xml$/.test(path));
  const bodies = slides.map((xml) => {
    const runs = xml.match(/<a:t[^>]*>[\s\S]*?<\/a:t>/g) || [];
    return decodeEntities(runs.map((run) => run.replace(/<[^>]+>/g, "")).join(" "));
  });
  return pack(bodies.filter((body) => body.trim().length > 0).join("\n\n"));
}

export async function extractFileText(file: File): Promise<ExtractedText | null> {
  const name = file.name;
  const type = file.type;
  if (isPdf(name, type)) return extractPdf(file);
  if (isDocx(name, type)) return extractDocx(file);
  if (isPptx(name, type)) return extractPptx(file);
  if (type.startsWith("text/") || /\.(txt|md|markdown|csv|tsv|json|xml|log|html|htm)$/i.test(name)) {
    return pack(await file.text());
  }
  return null;
}
