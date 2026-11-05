import { buildLessonPrompt, generateLocalLesson } from "./lesson-engine";

export interface AiKeys {
  gemini: string;
  openrouter: string;
}

export interface AiLessonResult {
  text: string;
  provider: string;
  local: boolean;
}

const GEMINI_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash"];
const OPENROUTER_MODEL = "meta-llama/llama-3.3-70b-instruct:free";
const REQUEST_TIMEOUT_MS = 45_000;

function withTimeout(signal: AbortSignal | undefined): AbortSignal {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", () => controller.abort(), { once: true });
  }
  controller.signal.addEventListener("abort", () => clearTimeout(timer), { once: true });
  return controller.signal;
}

async function fetchGemini(model: string, key: string, topic: string, signal: AbortSignal): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildLessonPrompt(topic) }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Gemini ${model} HTTP ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`);
  }
  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
  if (!text) throw new Error(`Gemini ${model} mengembalikan jawaban kosong`);
  return text;
}

async function fetchOpenRouter(key: string, topic: string, signal: AbortSignal): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": "https://akafiz-ai.vercel.app",
      "X-Title": "MalBelajarYuk",
    },
    signal,
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: buildLessonPrompt(topic) }],
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`OpenRouter HTTP ${response.status}${detail ? `: ${detail.slice(0, 160)}` : ""}`);
  }
  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("OpenRouter mengembalikan jawaban kosong");
  return text;
}

export async function generateLesson(
  topic: string,
  keys: AiKeys,
  onStatus?: (message: string) => void,
  externalSignal?: AbortSignal,
): Promise<AiLessonResult> {
  const attempts: Array<{ name: string; run: () => Promise<string> }> = [];

  if (keys.gemini.trim()) {
    for (const model of GEMINI_MODELS) {
      attempts.push({
        name: `Gemini (${model})`,
        run: () => fetchGemini(model, keys.gemini.trim(), topic, withTimeout(externalSignal)),
      });
    }
  }
  if (keys.openrouter.trim()) {
    attempts.push({
      name: `OpenRouter (${OPENROUTER_MODEL})`,
      run: () => fetchOpenRouter(keys.openrouter.trim(), topic, withTimeout(externalSignal)),
    });
  }

  for (const attempt of attempts) {
    onStatus?.(`Mencoba ${attempt.name}…`);
    try {
      const text = await attempt.run();
      return { text, provider: attempt.name, local: false };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      onStatus?.(`${attempt.name} gagal (${reason.slice(0, 90)}). Mencoba cadangan…`);
    }
  }

  onStatus?.("Semua AI eksternal habis/tidak tersedia — memakai mesin lokal LEGACY.");
  await new Promise((resolve) => setTimeout(resolve, 350));
  return { text: generateLocalLesson(topic), provider: "Mesin lokal LEGACY", local: true };
}
