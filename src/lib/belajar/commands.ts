const STOPWORDS = new Set(
  (
    "dan yang di ke dari untuk dengan dalam pada adalah merupakan yaitu yakni ini itu sebagai juga atau tidak bisa dapat akan telah oleh karena jika saat seperti antara terhadap tentang secara lebih paling sangat namun tetapi sehingga karena ketika agar supaya baik itu adalah adalah merupakan"
  ).split(/\s+/),
);

export type CommandKind = "ringkas" | "soal" | "glosarium" | "bebas";

export function interpretCommand(input: string): CommandKind {
  const text = input.toLowerCase();
  if (/(ringk|rangkum|summary|simpulkan|meringkas)/.test(text)) return "ringkas";
  if (/(soal|pertanyaan|kuis|quiz|uji|latihan|multiple choice|pilihan ganda)/.test(text)) return "soal";
  if (/(glosarium|istilah|definisi|kamus)/.test(text)) return "glosarium";
  return "bebas";
}

export function buildCommandPrompt(instruction: string, contextTitle: string, contextText: string): string {
  const clipped = contextText.slice(0, 12000);
  return [
    "Kamu adalah tutor bahasa Indonesia. Jawab HANYA berdasarkan materi berikut, jangan mengarang fakta di luar materi. Tulis dalam Markdown.",
    "",
    `MATERI JUDUL: ${contextTitle}`,
    "MATERI ISI:",
    clipped,
    "",
    `PERINTAH PENGGUNA: ${instruction}`,
    "",
    "Berikan hasil yang lengkap dan siap dipakai belajar.",
  ].join("\n");
}

function cleanText(text: string): string {
  return text
    .replace(/^#+\s+/gm, "")
    .replace(/^\s*[-*•]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const INSTRUCTION_RE =
  /^(jelaskan|sebutkan|buat|tulis|carilah|hubungkan|bedakan|bandingkan|uraikan|hitung|identifikasi|ringkas|latihan|kunci jawaban|soal|catatan|contoh)\b/i;

export function splitSentences(text: string): string[] {
  const normalized = text.replace(/\r/g, "");
  const out: string[] = [];
  for (const line of normalized.split(/\n+/)) {
    const stripped = cleanText(line);
    if (!stripped) continue;
    const parts = stripped.match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g) || [];
    for (const part of parts) {
      const sentence = part.trim();
      if (sentence.length < 25) continue;
      if (sentence.includes("?") || INSTRUCTION_RE.test(sentence)) continue;
      out.push(sentence);
    }
  }
  return out;
}

function tokens(sentence: string): string[] {
  return sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOPWORDS.has(word));
}

function termFrequencies(sentences: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const sentence of sentences) {
    for (const word of tokens(sentence)) tf.set(word, (tf.get(word) ?? 0) + 1);
  }
  return tf;
}

function scoreSentences(sentences: string[], tf: Map<string, number>): number[] {
  return sentences.map((sentence, index) => {
    const words = tokens(sentence);
    if (words.length === 0) return 0;
    const sum = words.reduce((acc, word) => acc + (tf.get(word) ?? 0), 0);
    const lengthBias = Math.sqrt(words.length);
    const positionBonus = index < 3 ? 1.15 : 1;
    return (sum / lengthBias) * positionBonus;
  });
}

interface Definisi {
  term: string;
  definition: string;
  sentence: string;
}

const DEFINISI_RE = /^(.{8,90}?)\s+(?:adalah|merupakan|yaitu|yakni)\s+(.{12,240}?)[.!?]?\s*$/i;

function extractDefinisi(sentences: string[]): Definisi[] {
  const out: Definisi[] = [];
  const seen = new Set<string>();
  for (const sentence of sentences) {
    const match = sentence.match(DEFINISI_RE);
    if (!match) continue;
    const term = match[1].replace(/^(secara|dalam|menurut\s+[^,]+,)\s+/i, "").trim();
    const definition = match[2].trim();
    const key = term.toLowerCase();
    if (term.length < 4 || term.length > 60 || !/^[a-zà-ÿ]/i.test(term) || term.includes(":")) continue;
    if (term.split(/\s+/).length > 8) continue;
    if (definition.length < 8 || seen.has(key)) continue;
    seen.add(key);
    out.push({ term, definition, sentence });
  }
  return out;
}

export function summarizeLocal(text: string): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return "_Materi ini tidak punya teks yang bisa diringkas (misalnya hanya tautan video). Tambahkan transkrip atau gunakan AI eksternal._";

  const tf = termFrequencies(sentences);
  const scores = scoreSentences(sentences, tf);
  const ranked = sentences
    .map((sentence, index) => ({ sentence, index, score: scores[index] }))
    .sort((a, b) => b.score - a.score);
  const wanted = Math.max(3, Math.min(8, Math.round(sentences.length * 0.25)));
  const picked = ranked
    .slice(0, wanted)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence);

  const definisi = extractDefinisi(sentences).slice(0, 5);
  const lines = [
    "## Ringkasan",
    "",
    picked.join(" "),
    "",
    "## Poin penting",
    "",
    ...picked.map((sentence) => `- ${sentence}`),
  ];
  if (definisi.length > 0) {
    lines.push("", "## Istilah kunci", "", ...definisi.map((d) => `- **${d.term}** — ${d.definition}`));
  }
  lines.push(
    "",
    "_Ringkasan ekstraktif lokal: kalimat dipilih berdasarkan frekuensi kata kunci, bukan hasil model AI. Verifikasi selalu ke sumber aslinya._",
  );
  return lines.join("\n");
}

function shuffleDeterministic<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function makeQuestionsLocal(text: string): string {
  const sentences = splitSentences(text);
  const definisi = extractDefinisi(sentences);
  const tf = termFrequencies(sentences);
  const scores = scoreSentences(sentences, tf);

  const questions: string[] = [];
  const answers: string[] = [];
  let number = 1;

  const pgPool = shuffleDeterministic(definisi, sentences.length * 7 + 3).slice(0, 5);
  for (const item of pgPool) {
    const distractors = shuffleDeterministic(
      definisi.filter((d) => d.term !== item.term).map((d) => d.definition),
      number * 13 + 5,
    ).slice(0, 3);
    if (distractors.length < 2) continue;
    const options = shuffleDeterministic([item.definition, ...distractors], number * 17 + 1);
    questions.push(
      `${number}. Apa yang dimaksud dengan **${item.term}**?`,
      ...options.map((option, i) => `   ${String.fromCharCode(65 + i)}. ${option}`),
    );
    answers.push(`${number}. ${String.fromCharCode(65 + options.indexOf(item.definition))} — ${item.term} adalah ${item.definition}`);
    number += 1;
  }

  const trueFalse = shuffleDeterministic(definisi, number * 19 + 2).slice(0, 3);
  for (const item of trueFalse) {
    const swapped = definisi.find((d) => d.term !== item.term);
    if (!swapped) continue;
    questions.push(
      "",
      `${number}. Benar atau Salah: ${item.term} adalah ${swapped.definition}.`,
    );
    answers.push(`${number}. Salah — ${item.term} adalah ${item.definition}.`);
    number += 1;
  }

  const keySentences = sentences
    .map((sentence, index) => ({ sentence, score: scores[index] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  for (const { sentence } of keySentences) {
    const words = tokens(sentence);
    if (words.length === 0) continue;
    const target = words
      .map((word) => ({ word, freq: tf.get(word) ?? 0 }))
      .sort((a, b) => a.freq - b.freq)[0];
    if (!target || target.word.length < 5) continue;
    const blank = sentence.replace(new RegExp(`\\b${target.word}\\b`, "i"), "………");
    questions.push("", `${number}. Lengkapi kalimat berikut: _${blank}_`);
    answers.push(`${number}. ${target.word}`);
    number += 1;
  }

  if (questions.length === 0) {
    return "_Belum bisa dibuatkan soal: materi ini tidak punya cukup kalimat teks (misalnya hanya tautan video). Tempel transkrip atau gunakan AI eksternal._";
  }

  return [
    "## Soal",
    "",
    ...questions,
    "",
    "## Kunci Jawaban",
    "",
    ...answers.map((answer) => `- ${answer}`),
    "",
    "_Soal dibuat mesin lokal secara ekstraktif dari isi materi (pola definisi dan kalimat kunci), bukan hasil model AI._",
  ].join("\n");
}

export function makeGlossaryLocal(text: string): string {
  const sentences = splitSentences(text);
  const definisi = extractDefinisi(sentences);
  if (definisi.length === 0) {
    return "_Tidak ditemukan pola definisi (kata + adalah/merupakan/yaitu) pada materi ini. Coba AI eksternal atau tambahkan uraian istilah._";
  }
  return [
    "## Glosarium",
    "",
    ...definisi.map((d) => `- **${d.term}** — ${d.definition}`),
    "",
    "_Daftar istilah diekstrak lokal dari pola definisi pada materi, bukan hasil model AI._",
  ].join("\n");
}

export interface LocalCommandOutput {
  title: string;
  text: string;
}

export function runLocalCommand(kind: CommandKind, instruction: string, note: { title: string; text: string }): LocalCommandOutput {
  if (kind === "ringkas") return { title: `Ringkasan: ${note.title}`.slice(0, 90), text: summarizeLocal(note.text) };
  if (kind === "soal") return { title: `Soal: ${note.title}`.slice(0, 90), text: makeQuestionsLocal(note.text) };
  if (kind === "glosarium") {
    return { title: `Glosarium: ${note.title}`.slice(0, 90), text: makeGlossaryLocal(note.text) };
  }
  return {
    title: `Ringkasan: ${note.title}`.slice(0, 90),
    text: [
      `Perintah "${instruction.slice(0, 120)}" butuh model AI karena tidak termasuk ringkas/soal/glosarium.`,
      "",
      "Sebagai gantinya, ini ringkasan lokal dari materi:",
      "",
      summarizeLocal(note.text),
    ].join("\n"),
  };
}
