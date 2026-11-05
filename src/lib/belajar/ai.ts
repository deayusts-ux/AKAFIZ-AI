import { buildLessonPrompt, generateLocalLesson } from "./lesson-engine";

export interface AiKeys {
  gemini: string;
  openrouter: string;
}

export interface AiLessonResult {
  text: string;
  provider: string;
  local: boolean;
  failures: string[];
}

export interface KeyTestResults {
  gemini?: string;
  openrouter?: string;
}

const REQUEST_TIMEOUT_MS = 90_000;
const TEST_TIMEOUT_MS = 30_000;

const GEMINI_MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
const OPENROUTER_MODELS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
];

function withTimeout(ms: number, signal?: AbortSignal): AbortSignal {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", () => controller.abort(), { once: true });
  }
  controller.signal.addEventListener("abort", () => clearTimeout(timer), { once: true });
  return controller.signal;
}

async function fetchGemini(model: string, key: string, prompt: string, signal: AbortSignal): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}${detail ? `: ${detail.slice(0, 120)}` : ""}`);
  }
  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
  if (!text) throw new Error("jawaban kosong");
  return text;
}

async function fetchOpenRouter(model: string, key: string, prompt: string, signal: AbortSignal): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      "HTTP-Referer": "https://akafiz-ai.vercel.app",
      "X-Title": "MalBelajarYuk",
    },
    signal,
    body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }] }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}${detail ? `: ${detail.slice(0, 120)}` : ""}`);
  }
  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("jawaban kosong");
  return text;
}

export async function runAiChain(
  prompt: string,
  keys: AiKeys,
  onStatus?: (message: string) => void,
  externalSignal?: AbortSignal,
): Promise<{ text: string; provider: string; failures: string[] } | null> {
  const attempts: Array<{ name: string; run: () => Promise<string> }> = [];

  if (keys.gemini.trim()) {
    for (const model of GEMINI_MODELS) {
      attempts.push({
        name: `Gemini (${model})`,
        run: () => fetchGemini(model, keys.gemini.trim(), prompt, withTimeout(REQUEST_TIMEOUT_MS, externalSignal)),
      });
    }
  }
  if (keys.openrouter.trim()) {
    for (const model of OPENROUTER_MODELS) {
      attempts.push({
        name: `OpenRouter (${model})`,
        run: () => fetchOpenRouter(model, keys.openrouter.trim(), prompt, withTimeout(REQUEST_TIMEOUT_MS, externalSignal)),
      });
    }
  }

  const failures: string[] = [];
  for (const attempt of attempts) {
    onStatus?.(`Mencoba ${attempt.name}…`);
    try {
      const text = await attempt.run();
      return { text, provider: attempt.name, failures };
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      failures.push(`${attempt.name}: ${reason}`);
      onStatus?.(`${attempt.name} gagal. Mencoba cadangan…`);
    }
  }
  return failures.length > 0 || attempts.length > 0 ? { text: "", provider: "", failures } : null;
}

export async function generateLesson(
  topic: string,
  keys: AiKeys,
  onStatus?: (message: string) => void,
  externalSignal?: AbortSignal,
): Promise<AiLessonResult> {
  const chain = await runAiChain(buildLessonPrompt(topic), keys, onStatus, externalSignal);
  if (chain && chain.text) return { text: chain.text, provider: chain.provider, local: false, failures: chain.failures };

  onStatus?.("Tidak ada AI eksternal yang bisa dipakai — menyusun dengan mesin lokal LEGACY.");
  await new Promise((resolve) => setTimeout(resolve, 350));
  return {
    text: generateLocalLesson(topic),
    provider: "Mesin lokal LEGACY",
    local: true,
    failures: chain?.failures ?? [],
  };
}

function summarizeError(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "AbortError") return "waktu habis — koneksi lambat atau penyedia sibuk";
    return error.message.slice(0, 140);
  }
  return String(error);
}

export async function testAiKeys(keys: AiKeys): Promise<KeyTestResults> {
  const results: KeyTestResults = {};
  const probe = "Balas dengan satu kata: halo";
  if (keys.gemini.trim()) {
    try {
      await fetchGemini(GEMINI_MODELS[0], keys.gemini.trim(), probe, withTimeout(TEST_TIMEOUT_MS));
      results.gemini = "Terhubung — kunci Gemini aktif.";
    } catch (error) {
      results.gemini = `Gagal: ${summarizeError(error)}`;
    }
  }
  if (keys.openrouter.trim()) {
    try {
      await fetchOpenRouter(OPENROUTER_MODELS[0], keys.openrouter.trim(), probe, withTimeout(TEST_TIMEOUT_MS));
      results.openrouter = "Terhubung — kunci OpenRouter aktif.";
    } catch (error) {
      results.openrouter = `Gagal: ${summarizeError(error)}`;
    }
  }
  return results;
}
