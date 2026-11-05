export type StepId = "rapikan" | "padatkan" | "formalkan" | "pecah";

export type TransformResult = {
  text: string;
  changes: number;
};

export type IssueGroup = {
  id: string;
  title: string;
  count: number;
  hint: string;
  examples: string[];
};

export type WritingMetrics = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  avgSentenceLength: number;
  readingMinutes: number;
  readability: number;
  readabilityLabel: string;
  score: number;
  longSentences: number;
};

export type WritingAnalysis = {
  metrics: WritingMetrics;
  issues: IssueGroup[];
};

type PhraseEntry = { from: string; to: string };

const WORDY_PHRASES: PhraseEntry[] = [
  { from: "dalam rangka untuk", to: "untuk" },
  { from: "dalam rangka", to: "untuk" },
  { from: "dikarenakan oleh", to: "karena" },
  { from: "dikarenakan", to: "karena" },
  { from: "disebabkan karena", to: "disebabkan oleh" },
  { from: "pada saat ini", to: "saat ini" },
  { from: "pada masa sekarang", to: "saat ini" },
  { from: "berbagai macam", to: "berbagai" },
  { from: "beraneka ragam", to: "beragam" },
  { from: "agar supaya", to: "agar" },
  { from: "namun akan tetapi", to: "tetapi" },
  { from: "akan tetapi", to: "tetapi" },
  { from: "meskipun demikian", to: "namun" },
  { from: "sehingga dengan demikian", to: "sehingga" },
  { from: "adalah merupakan", to: "adalah" },
  { from: "yang mana", to: "yang" },
  { from: "perlu untuk diketahui", to: "perlu diketahui" },
  { from: "dapat dilihat bahwa", to: "terlihat bahwa" },
  { from: "seperti contohnya", to: "misalnya" },
  { from: "contohnya seperti", to: "misalnya" },
  { from: "dan lain sebagainya", to: "dan sebagainya" },
  { from: "secara umumnya", to: "umumnya" },
  { from: "saling berkaitan satu sama lain", to: "saling berkaitan" },
  { from: "sangat amat", to: "sangat" },
  { from: "sangat penting sekali", to: "sangat penting" },
  { from: "paling maksimal", to: "maksimal" },
  { from: "terdiri dari", to: "terdiri atas" },
  { from: "bertujuan untuk", to: "bertujuan" },
  { from: "berfungsi untuk", to: "berfungsi" },
  { from: "melakukan analisis", to: "menganalisis" },
  { from: "melakukan penelitian", to: "meneliti" },
  { from: "memberikan penjelasan", to: "menjelaskan" },
  { from: "memberikan bantuan", to: "membantu" },
  { from: "mengambil keputusan", to: "memutuskan" },
  { from: "mempunyai", to: "memiliki" },
  { from: "para hadirin", to: "hadirin" },
];

const INFORMAL_WORDS: PhraseEntry[] = [
  { from: "gimana", to: "bagaimana" },
  { from: "gmn", to: "bagaimana" },
  { from: "nggak", to: "tidak" },
  { from: "ngga", to: "tidak" },
  { from: "gak", to: "tidak" },
  { from: "udah", to: "sudah" },
  { from: "udh", to: "sudah" },
  { from: "sdh", to: "sudah" },
  { from: "banget", to: "sekali" },
  { from: "bgt", to: "sekali" },
  { from: "bikin", to: "membuat" },
  { from: "tapi", to: "tetapi" },
  { from: "aja", to: "saja" },
  { from: "kalo", to: "kalau" },
  { from: "gitu", to: "begitu" },
  { from: "gini", to: "begini" },
  { from: "dll", to: "dan lain-lain" },
  { from: "dsb", to: "dan sebagainya" },
  { from: "dkk", to: "dan kawan-kawan" },
  { from: "krn", to: "karena" },
  { from: "yg", to: "yang" },
  { from: "tdk", to: "tidak" },
  { from: "spt", to: "seperti" },
  { from: "utk", to: "untuk" },
  { from: "jd", to: "jadi" },
  { from: "tp", to: "tetapi" },
  { from: "bkn", to: "bukan" },
  { from: "blm", to: "belum" },
  { from: "jg", to: "juga" },
  { from: "dg", to: "dengan" },
  { from: "org", to: "orang" },
];

const ABBREVIATIONS = new Set([
  "dll",
  "dsb",
  "dkk",
  "hlm",
  "hal",
  "no",
  "vol",
  "ed",
  "prof",
  "dr",
  "ir",
  "pd",
  "et",
  "al",
  "vs",
]);

const CONNECTORS = "dan|serta|tetapi|tapi|namun|sedangkan|sementara";

const STEP_META: Record<StepId, { label: string; short: string; description: string }> = {
  rapikan: {
    label: "Rapikan",
    short: "Spasi, tanda baca, huruf awal",
    description:
      "Merapikan spasi ganda, spasi sebelum tanda baca, kata yang terulang, dan huruf awal kalimat.",
  },
  padatkan: {
    label: "Padatkan",
    short: "Frasa bertele-tele",
    description:
      "Mengganti frasa bertele-tele dengan bentuk yang lebih ringkas tanpa mengubah maksud kalimat.",
  },
  formalkan: {
    label: "Formalkan",
    short: "Kata tidak baku",
    description:
      "Mengganti kata percakapan dan singkatan tidak baku dengan padanan yang lebih formal.",
  },
  pecah: {
    label: "Pecah kalimat",
    short: "Kalimat terlalu panjang",
    description:
      "Memecah kalimat yang terlalu panjang pada penghubung yang aman agar lebih mudah dibaca.",
  },
};

export const STUDIO_STEPS = (Object.keys(STEP_META) as StepId[]).map((id) => ({
  id,
  ...STEP_META[id],
}));

export function stepLabel(id: StepId): string {
  return STEP_META[id].label;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function phraseRegex(phrase: string): RegExp {
  return new RegExp(`\\b${escapeRegExp(phrase).replace(/ /g, "\\s+")}\\b`, "gi");
}

function matchCase(source: string, target: string): string {
  const letters = source.replace(/[^A-Za-z]/g, "");
  if (!letters) return target;
  if (letters.length > 1 && letters === letters.toUpperCase()) return target.toUpperCase();
  if (source.charAt(0) === source.charAt(0).toUpperCase()) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }
  return target;
}

function applyEntries(text: string, entries: PhraseEntry[]): TransformResult {
  let result = text;
  let changes = 0;
  const sorted = [...entries].sort((a, b) => b.from.length - a.from.length);
  for (const entry of sorted) {
    result = result.replace(phraseRegex(entry.from), (match: string) => {
      changes += 1;
      return matchCase(match, entry.to);
    });
  }
  return { text: result, changes };
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function splitSentences(text: string): string[] {
  const cleaned = text
    .replace(/(\d)\.(\d)/g, "$1,$2")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return [];
  return (cleaned.match(/[^.!?]+[.!?]*/g) ?? [])
    .map((part) => part.trim())
    .filter((part) => /[A-Za-z]/.test(part));
}

function upperFirst(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function capitalizeSentenceStarts(text: string): string {
  let result = text.replace(
    /(^|\n)([ \t]*)([a-z])/g,
    (_match: string, lead: string, space: string, letter: string) =>
      `${lead}${space}${letter.toUpperCase()}`,
  );

  result = result.replace(
    /([A-Za-z][.!?])([ \t]+)([a-z][A-Za-z]*)(\.?)/g,
    (
      match: string,
      punct: string,
      space: string,
      letter: string,
      nextDot: string,
      offset: number,
      full: string,
    ) => {
      if (punct.endsWith(".")) {
        const before = full.slice(0, offset + punct.length);
        const word = before.match(/([A-Za-z]+)\.$/);
        if (word && ABBREVIATIONS.has(word[1].toLowerCase())) return match;
      }
      if (nextDot && ABBREVIATIONS.has(letter.toLowerCase())) return match;
      return `${punct}${space}${letter.charAt(0).toUpperCase()}${letter.slice(1)}${nextDot}`;
    },
  );

  return result;
}

export function tidyText(input: string): TransformResult {
  let text = input.replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n");
  let changes = 0;

  text = text.replace(/[ \t]{2,}/g, () => {
    changes += 1;
    return " ";
  });

  text = text.replace(/[ \t]+([,.;:!?])/g, (_match: string, mark: string) => {
    changes += 1;
    return mark;
  });

  text = text
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n");

  text = text.replace(/\b([A-Za-z]+)([ \t]+\1)\b/gi, (_match: string, word: string) => {
    changes += 1;
    return word;
  });

  text = text.replace(/([,;:])(?=[A-Za-z])/g, (_match: string, mark: string) => {
    changes += 1;
    return `${mark} `;
  });

  text = text.replace(/\n{3,}/g, () => {
    changes += 1;
    return "\n\n";
  });

  const capitalized = capitalizeSentenceStarts(text);
  if (capitalized !== text) changes += 1;
  return { text: capitalized.trim(), changes };
}

export function compactText(input: string): TransformResult {
  return applyEntries(input, WORDY_PHRASES);
}

export function formalizeText(input: string): TransformResult {
  return applyEntries(input, INFORMAL_WORDS);
}

function findSplit(text: string): { index: number; length: number; connector: string } | null {
  const pattern = new RegExp(`,\\s+(${CONNECTORS})\\s+`, "gi");
  const candidates: Array<{ index: number; length: number; connector: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    candidates.push({ index: match.index, length: match[0].length, connector: match[1] });
  }
  if (!candidates.length) return null;
  const midpoint = text.length / 2;
  return candidates.reduce((best, current) =>
    Math.abs(current.index - midpoint) < Math.abs(best.index - midpoint) ? current : best,
  );
}

function splitOne(segment: string, maxWords: number): { text: string; changes: number } {
  const queue = [segment.trim()];
  const done: string[] = [];
  let changes = 0;
  let guard = 0;

  while (queue.length > 0 && guard < 12) {
    guard += 1;
    const current = queue.shift() ?? "";
    if (!current) continue;
    if (countWords(current) <= maxWords) {
      done.push(current);
      continue;
    }
    const split = findSplit(current);
    if (!split) {
      done.push(current);
      continue;
    }
    const before = current.slice(0, split.index).replace(/[ \t]+$/g, "");
    let after = current.slice(split.index + split.length).replace(/^[ \t]+/g, "");
    if (!after) {
      done.push(current);
      continue;
    }
    const lower = split.connector.toLowerCase();
    let prefix = "";
    if (lower === "sementara") {
      prefix = /^itu\s/i.test(after) ? "Sementara " : "Sementara itu ";
    } else if (lower !== "dan" && lower !== "serta") {
      prefix = `${upperFirst(split.connector)} `;
    }
    after = upperFirst(`${prefix}${after}`);
    done.push(/[.!?]$/.test(before) ? before : `${before}.`);
    queue.unshift(after);
    changes += 1;
  }

  done.push(...queue);
  let result = done.join(" ").trim();
  if (result && !/[.!?]$/.test(result)) result = `${result}.`;
  return { text: result, changes };
}

export function splitLongSentences(input: string, maxWords = 28): TransformResult {
  let changes = 0;
  const text = input
    .split(/(\n{2,})/)
    .map((chunk) => {
      if (/^\n+$/.test(chunk)) return chunk;
      const guarded = chunk.replace(/(\d)\.(\d)/g, "$1\u0001$2");
      const parts = guarded.match(/[^.!?]+[.!?]*/g) ?? [guarded];
      const rebuilt = parts
        .map((part) => {
          const result = splitOne(part, maxWords);
          changes += result.changes;
          return result.text;
        })
        .filter(Boolean)
        .join(" ");
      return ` ${rebuilt} `;
    })
    .join("");
  return { text: text.replace(/\u0001/g, ".").replace(/[ \t]+\n/g, "\n").trim(), changes };
}

export function runStep(id: StepId, text: string): TransformResult {
  switch (id) {
    case "rapikan":
      return tidyText(text);
    case "padatkan":
      return compactText(text);
    case "formalkan":
      return formalizeText(text);
    case "pecah":
      return splitLongSentences(text);
    default:
      return { text, changes: 0 };
  }
}

function collect(text: string, pattern: RegExp): Array<{ index: number; value: string }> {
  const results: Array<{ index: number; value: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    results.push({ index: match.index, value: match[0] });
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  return results;
}

function snippetAround(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 28);
  const end = Math.min(text.length, index + length + 28);
  let snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) snippet = `…${snippet}`;
  if (end < text.length) snippet = `${snippet}…`;
  return snippet;
}

function readabilityLabel(score: number): string {
  if (score >= 80) return "Mudah dibaca";
  if (score >= 65) return "Cukup mudah";
  if (score >= 45) return "Agak sulit";
  return "Sulit dibaca";
}

function collectPhraseHits(text: string, entries: PhraseEntry[]) {
  const hits: Array<{ index: number; length: number; phrase: string; replacement: string }> = [];
  for (const entry of entries) {
    const pattern = phraseRegex(entry.from);
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      hits.push({
        index: match.index,
        length: match[0].length,
        phrase: match[0].replace(/\s+/g, " "),
        replacement: entry.to,
      });
    }
  }
  hits.sort((a, b) => a.index - b.index || b.length - a.length);
  const accepted: typeof hits = [];
  let lastEnd = -1;
  for (const hit of hits) {
    if (hit.index < lastEnd) continue;
    accepted.push(hit);
    lastEnd = hit.index + hit.length;
  }
  return accepted;
}

export function analyzeText(input: string): WritingAnalysis {
  const text = input;
  const words = countWords(text);
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  if (words === 0) {
    return {
      metrics: {
        words: 0,
        characters,
        charactersNoSpaces,
        sentences: 0,
        paragraphs: 0,
        avgSentenceLength: 0,
        readingMinutes: 0,
        readability: 0,
        readabilityLabel: "Belum ada teks",
        score: 0,
        longSentences: 0,
      },
      issues: [],
    };
  }
  const paragraphs = text.split(/\n+/).filter((line) => line.trim().length > 0).length;
  const sentenceList = splitSentences(text);
  const sentenceCount = sentenceList.length;
  const longSentences = sentenceList.filter((sentence) => countWords(sentence) > 30).length;
  const avgSentenceLength = sentenceCount ? words / sentenceCount : 0;
  const readingMinutes = words ? Math.max(1, Math.ceil(words / 200)) : 0;

  const wordList = text.trim() ? text.trim().split(/\s+/) : [];
  const longWords = wordList.filter(
    (word) => word.replace(/[^A-Za-z]/g, "").length > 8,
  ).length;
  const longWordShare = words ? longWords / words : 0;
  const rawReadability =
    100 -
    Math.min(55, Math.max(0, (avgSentenceLength - 12) * 3.2)) -
    Math.min(35, longWordShare * 70);
  const readability = words ? clamp(Math.round(rawReadability), 0, 100) : 0;
  const readabilityText = words ? readabilityLabel(readability) : "Belum ada teks";

  const doubleSpaces = collect(text, /[ \t]{2,}/g);
  const spaceBefore = collect(text, /[ \t]+[,.;:!?]/g);
  const spaceAfter = collect(text, /[,;:](?=[A-Za-z])/g);
  const repeated = collect(text, /\b([A-Za-z]+)([ \t]+\1)\b/gi);
  const lowercaseParagraph = collect(text, /(^|\n)([ \t]*)([a-z])/g);
  const lowercaseAfterPunct = collect(text, /([A-Za-z][.!?])([ \t]+)([a-z])/g);
  const fillerHits = collectPhraseHits(text, WORDY_PHRASES);
  const informalHits = collectPhraseHits(text, INFORMAL_WORDS);

  const issues: IssueGroup[] = [];

  const spacingCount = doubleSpaces.length + spaceBefore.length + spaceAfter.length;
  if (spacingCount > 0) {
    const examples = [...doubleSpaces, ...spaceBefore, ...spaceAfter]
      .slice(0, 3)
      .map((hit) => snippetAround(text, hit.index, hit.value.length));
    issues.push({
      id: "spasi",
      title: "Spasi dan tanda baca",
      count: spacingCount,
      hint: "Gunakan “Rapikan” untuk membetulkan spasi ganda dan spasi sebelum tanda baca.",
      examples,
    });
  }

  if (repeated.length > 0) {
    issues.push({
      id: "kata-berulang",
      title: "Kata terulang",
      count: repeated.length,
      hint: "Kata yang sama muncul dua kali berturut-turut dan bisa dihapus salah satunya.",
      examples: repeated.slice(0, 3).map((hit) => snippetAround(text, hit.index, hit.value.length)),
    });
  }

  if (longSentences > 0) {
    const examples = sentenceList
      .filter((sentence) => countWords(sentence) > 30)
      .slice(0, 3)
      .map((sentence) => {
        const trimmed = sentence.trim();
        return `${countWords(trimmed)} kata — ${trimmed.length > 90 ? `${trimmed.slice(0, 90)}…` : trimmed}`;
      });
    issues.push({
      id: "kalimat-panjang",
      title: "Kalimat terlalu panjang",
      count: longSentences,
      hint: "Pecah kalimat di atas 30 kata agar lebih mudah diikuti.",
      examples,
    });
  }

  if (fillerHits.length > 0) {
    issues.push({
      id: "frasa-bertele-tele",
      title: "Frasa bertele-tele",
      count: fillerHits.length,
      hint: "Gunakan “Padatkan” untuk mengganti frasa ini dengan versi yang lebih ringkas.",
      examples: fillerHits
        .slice(0, 3)
        .map((hit) => `${hit.phrase} → ${hit.replacement}`),
    });
  }

  if (informalHits.length > 0) {
    issues.push({
      id: "kata-informal",
      title: "Kata tidak baku",
      count: informalHits.length,
      hint: "Gunakan “Formalkan” untuk mengganti kata percakapan dengan padanan baku.",
      examples: informalHits
        .slice(0, 3)
        .map((hit) => `${hit.phrase} → ${hit.replacement}`),
    });
  }

  const lowercaseCount = lowercaseParagraph.length + lowercaseAfterPunct.length;
  if (lowercaseCount > 0) {
    const examples = [...lowercaseParagraph, ...lowercaseAfterPunct]
      .slice(0, 3)
      .map((hit) => snippetAround(text, hit.index, hit.value.length));
    issues.push({
      id: "huruf-awal",
      title: "Huruf awal kalimat",
      count: lowercaseCount,
      hint: "Kalimat atau paragraf dimulai dengan huruf kecil.",
      examples,
    });
  }

  let score = 100;
  score -= Math.min(15, spacingCount * 2);
  score -= Math.min(12, repeated.length * 4);
  score -= Math.min(18, longSentences * 3);
  score -= Math.min(12, fillerHits.length * 2);
  score -= Math.min(10, informalHits.length * 2);
  score -= Math.min(8, lowercaseCount * 2);

  const metrics: WritingMetrics = {
    words,
    characters,
    charactersNoSpaces,
    sentences: sentenceCount,
    paragraphs,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    readingMinutes,
    readability,
    readabilityLabel: readabilityText,
    score: words ? clamp(Math.round(score), 0, 100) : 0,
    longSentences,
  };

  return { metrics, issues };
}
