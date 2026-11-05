"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRightLeft,
  ArrowUpRight,
  Check,
  ClipboardCopy,
  Download,
  Eraser,
  Gauge,
  Info,
  Layers,
  LockKeyhole,
  Play,
  RotateCcw,
  ScanText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import { Monogram } from "@/components/monogram";
import { useToast } from "@/components/providers/toast-provider";
import { humanizerTools } from "@/data/humanizer-tools";
import { getStudioPreset } from "@/data/humanizer-studio";
import {
  STUDIO_STEPS,
  analyzeText,
  runStep,
  stepLabel,
  type StepId,
} from "@/lib/writing/analyze";
import { accentStyle, cn, formatNumber } from "@/lib/utils";

const STORAGE_KEY = "legacy-writing-draft-v1";
const MAX_CHARS = 20000;

const SAMPLE =
  "Pada saat ini, banyak mahasiswa yang sangat bergantung pada teknologi AI untuk mengerjakan tugas, dan hal ini dikarenakan oleh kemudahan akses yang diberikan, sehingga mereka sering kali tidak membaca kembali hasilnya.  sebenarnya, penggunaan alat bantu itu nggak salah, akan tetapi kita harus tetap memahami isi tulisan sendiri , serta memeriksa sumber referensi yang dipakai dan memastikan bahwa setiap argumen bisa dipertanggungjawabkan dengan baik oleh penulisnya.";

const STEP_ICONS = {
  rapikan: Eraser,
  padatkan: Layers,
  formalkan: Type,
  pecah: ArrowRightLeft,
} as const;

type StudioOutput = {
  text: string;
  source: string;
  toolSlug: string | null;
  steps: Array<{ id: StepId; label: string; changes: number }>;
};

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Clipboard API can be blocked; fall back to a manual selection copy.
  }

  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  } catch {
    return false;
  }
}

function downloadText(value: string) {
  const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "legacy-tulisan.txt";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function WritingStudio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const toolSlug = searchParams.get("tool");
  const selectedTool = humanizerTools.find((tool) => tool.slug === toolSlug) ?? null;
  const preset = getStudioPreset(selectedTool?.slug);

  const [text, setText] = useState("");
  const [output, setOutput] = useState<StudioOutput | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastTool = useRef(toolSlug);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved.slice(0, MAX_CHARS));
    } catch {
      setSavedLocally(false);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
      try {
        if (text) {
          window.localStorage.setItem(STORAGE_KEY, text);
          setSavedLocally(true);
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
          setSavedLocally(true);
        }
      } catch {
        setSavedLocally(false);
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [text, ready]);

  useEffect(() => {
    if (lastTool.current === toolSlug) return;
    lastTool.current = toolSlug;
    setOutput(null);
  }, [toolSlug]);

  const analysis = useMemo(() => analyzeText(text), [text]);
  const outputAnalysis = useMemo(() => (output ? analyzeText(output.text) : null), [output]);
  const sourceAnalysis = useMemo(() => (output ? analyzeText(output.source) : null), [output]);
  const shownAnalysis = outputAnalysis ?? analysis;
  const totalChanges = output
    ? output.steps.reduce((total, step) => total + step.changes, 0)
    : 0;

  function remember(value: string) {
    setHistory((current) =>
      current[current.length - 1] === value ? current : [...current.slice(-9), value],
    );
  }

  function selectTool(slug: string | null) {
    router.replace(slug ? `/ai-humanizer/studio?tool=${slug}` : "/ai-humanizer/studio", {
      scroll: false,
    });
  }

  function buildOutput(steps: StepId[]) {
    if (!text.trim()) {
      toast("Belum ada teks", "Tulis atau tempel draf dulu di editor.");
      return;
    }
    const results: StudioOutput["steps"] = [];
    let current = text;
    for (const id of steps) {
      const result = runStep(id, current);
      current = result.text;
      results.push({ id, label: stepLabel(id), changes: result.changes });
    }
    remember(text);
    setOutput({
      text: current,
      source: text,
      toolSlug: selectedTool?.slug ?? null,
      steps: results,
    });
    const changes = results.reduce((total, step) => total + step.changes, 0);
    if (changes === 0) {
      toast("Tidak ada perubahan", "Menurut pemeriksaan mesin lokal, teksmu sudah rapi.");
    } else {
      toast(`${changes} penyesuaian selesai`, "Periksa hasilnya sebelum dipakai sebagai draf.");
    }
  }

  function handleUseResult() {
    if (!output) return;
    remember(text);
    setText(output.text);
    setOutput(null);
    toast("Hasil dipakai", "Editor diperbarui. Klik Kembalikan untuk memulihkan draf sebelumnya.");
  }

  function handleUndo() {
    const previous = history[history.length - 1];
    if (previous === undefined) {
      toast("Belum ada riwayat", "Belum ada draf sebelumnya yang bisa dikembalikan.");
      return;
    }
    setHistory((current) => current.slice(0, -1));
    setText(previous);
    setOutput(null);
    toast("Draf dikembalikan", "Versi sebelumnya dimuat kembali ke editor.");
  }

  function handleClear() {
    if (!text) return;
    remember(text);
    setText("");
    setOutput(null);
    toast("Editor dikosongkan", "Klik Kembalikan untuk memuat lagi draf sebelumnya.");
  }

  function handleSample() {
    if (text.trim()) remember(text);
    setText(SAMPLE);
    setOutput(null);
    toast("Contoh dimuat", "Klik Proses di LEGACY untuk melihat alurnya bekerja.");
  }

  async function handleCopy(value: string) {
    const copiedNow = await copyToClipboard(value);
    if (!copiedNow) {
      toast("Gagal menyalin", "Pilih teks secara manual lalu salin dari editor.");
      return;
    }
    setCopied(true);
    toast("Teks disalin", "Hasil sudah ada di clipboard.");
    window.setTimeout(() => setCopied(false), 2200);
  }

  function handleDownload() {
    const value = output?.text ?? text;
    if (!value.trim()) {
      toast("Belum ada teks", "Tulis atau proses teks terlebih dahulu.");
      return;
    }
    downloadText(value);
    toast("Berkas diunduh", "Tersimpan sebagai legacy-tulisan.txt.");
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Info className="h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden="true" />
        <p className="text-[11px] leading-relaxed text-muted">
          Mode kerja mengikuti kekuatan alat yang kamu pilih. LEGACY menjalankan mesin lokalnya
          sendiri, bukan menyalin situs aslinya.
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Pilih mode alat">
        <button
          type="button"
          onClick={() => selectTool(null)}
          aria-pressed={!selectedTool}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
            !selectedTool
              ? "border-line/25 bg-line/[0.08] text-ink"
              : "border-line/[0.08] bg-cell/40 text-muted hover:border-line/20 hover:text-ink",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-aqua" aria-hidden="true" />
          Umum
        </button>
        {humanizerTools.map((tool) => {
          const active = selectedTool?.slug === tool.slug;
          return (
            <button
              key={tool.slug}
              type="button"
              onClick={() => selectTool(tool.slug)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-line/25 bg-line/[0.08] text-ink"
                  : "border-line/[0.08] bg-cell/40 text-muted hover:border-line/20 hover:text-ink",
              )}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: tool.accent }}
                aria-hidden="true"
              />
              {tool.name}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-4">
          <section className="card-surface p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-display text-sm font-bold text-ink">Teks draf</h2>
                <p className="mt-0.5 text-[11px] text-muted">
                  Tempel draf atau tulis langsung. Maksimal 20.000 karakter.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line/[0.08] px-2.5 py-1 text-[10px] font-medium text-muted">
                <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                {savedLocally ? "Draf disimpan di perangkat" : "Diproses di browser"}
              </span>
            </div>

            <label htmlFor="writing-draft" className="sr-only">
              Teks yang akan dirapikan
            </label>
            <textarea
              id="writing-draft"
              value={text}
              onChange={(event) => {
                setText(event.target.value.slice(0, MAX_CHARS));
                if (output) setOutput(null);
              }}
              maxLength={MAX_CHARS}
              spellCheck={false}
              placeholder="Tempel paragraf tugas, esai, atau catatanmu di sini…"
              className="mt-3 min-h-[300px] w-full resize-y rounded-xl border border-line/10 bg-canvas/50 p-4 text-[13.5px] leading-relaxed text-ink placeholder:text-muted/60 focus:border-iris/40 focus:outline-none"
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
              <span>
                {formatNumber(analysis.metrics.words)} kata · {formatNumber(text.length)}/
                {formatNumber(MAX_CHARS)} karakter
              </span>
              <span className="inline-flex items-center gap-1">
                <Gauge className="h-3 w-3" aria-hidden="true" />
                Mode: {preset.focus}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => buildOutput(preset.steps)}
                disabled={!text.trim()}
                className="btn-primary h-10 px-4 text-xs"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Proses di LEGACY
              </button>
              <button
                type="button"
                onClick={handleSample}
                className="btn-ghost h-10 px-3 text-xs"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Contoh
              </button>
              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="btn-ghost h-10 px-3 text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Kembalikan
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!text}
                className="btn-ghost h-10 px-3 text-xs"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Kosongkan
              </button>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {STUDIO_STEPS.map((step) => {
                const Icon = STEP_ICONS[step.id];
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => buildOutput([step.id])}
                    disabled={!text.trim()}
                    className="flex items-start gap-2 rounded-xl border border-line/10 bg-line/[0.02] px-3 py-2.5 text-left transition-colors hover:border-line/25 hover:bg-line/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-ink">{step.label}</span>
                      <span className="mt-0.5 block text-[10px] leading-snug text-muted">
                        {step.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-muted/80">
              Proses mengikuti mode {selectedTool ? selectedTool.name : "umum"}:{" "}
              {preset.steps.map((id) => stepLabel(id).toLowerCase()).join(" → ")}.
            </p>
          </section>

          {output ? (
            <section
              className="card-surface p-4 sm:p-5"
              aria-live="polite"
              style={accentStyle(selectedTool?.accent ?? "#22d3ee")}
            >
              <span
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-sm font-bold text-ink">Hasil di LEGACY</h2>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {output.toolSlug ? `Mode ${selectedTool?.name ?? "alat"}` : "Mode umum"} ·{" "}
                    {totalChanges > 0
                      ? `${totalChanges} penyesuaian`
                      : "tidak ada perubahan yang perlu diterapkan"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOutput(null)}
                  aria-label="Tutup hasil"
                  className="rounded-md p-1.5 text-muted transition-colors hover:text-ink"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {output.steps.map((step) => (
                  <span
                    key={step.id}
                    className="rounded-md border border-line/[0.08] bg-line/[0.03] px-2 py-1 text-[10px] font-medium text-muted"
                  >
                    {step.label}{" "}
                    <span className={step.changes > 0 ? "text-aqua" : "text-muted/60"}>
                      {step.changes > 0 ? `+${step.changes}` : "0"}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mt-3 max-h-[420px] overflow-auto rounded-xl border border-line/10 bg-canvas/50 p-4">
                <p className="whitespace-pre-wrap break-words text-[13.5px] leading-relaxed text-ink/90">
                  {output.text}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
                <span>
                  {formatNumber(sourceAnalysis?.metrics.words ?? 0)} →{" "}
                  {formatNumber(outputAnalysis?.metrics.words ?? 0)} kata · catatan mesin{" "}
                  {sourceAnalysis?.issues.reduce((total, issue) => total + issue.count, 0) ?? 0} →{" "}
                  {outputAnalysis?.issues.reduce((total, issue) => total + issue.count, 0) ?? 0}
                </span>
                <span className="text-muted/70">Periksa istilah khusus sebelum dipakai.</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleUseResult}
                  className="btn-primary h-10 px-4 text-xs"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Gunakan hasil
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(output.text)}
                  className="btn-ghost h-10 px-3 text-xs"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <ClipboardCopy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {copied ? "Tersalin" : "Salin"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn-ghost h-10 px-3 text-xs"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Unduh .txt
                </button>
              </div>

              <details className="mt-3 rounded-xl border border-line/[0.08] bg-line/[0.02] px-3 py-2">
                <summary className="cursor-pointer text-[11px] font-medium text-muted">
                  Lihat draf sumber
                </summary>
                <p className="mt-2 whitespace-pre-wrap break-words text-[12px] leading-relaxed text-muted">
                  {output.source}
                </p>
              </details>
            </section>
          ) : (
            <section className="rounded-2xl border border-dashed border-line/12 bg-line/[0.02] p-6 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-iris/20 bg-iris/10 text-aqua">
                <ScanText className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 font-display text-sm font-bold text-ink">
                Hasil akan muncul di sini
              </h2>
              <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted">
                {preset.summary}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {preset.steps.map((id) => (
                  <span
                    key={id}
                    className="rounded-md border border-line/[0.08] bg-line/[0.03] px-2 py-1 text-[10px] font-medium text-muted"
                  >
                    {stepLabel(id)}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <section
            className="card-surface p-4"
            style={accentStyle(selectedTool?.accent ?? "#22d3ee")}
          >
            <div className="flex items-center gap-3">
              <Monogram
                name={selectedTool?.name ?? "LEGACY"}
                accent={selectedTool?.accent ?? "#22d3ee"}
                accentAlt={selectedTool?.accentAlt ?? "#6366f1"}
                size="sm"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  {selectedTool ? "Mode alat" : "Mode umum"}
                </p>
                <h2 className="truncate font-display text-sm font-bold text-ink">
                  {selectedTool?.name ?? "Mesin tulis LEGACY"}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {selectedTool ? selectedTool.strength : preset.summary}
            </p>
            <p className="mt-2 rounded-lg border border-line/[0.07] bg-line/[0.02] px-2.5 py-2 text-[11px] leading-relaxed text-muted">
              {preset.guidance}
            </p>
            {selectedTool ? (
              <a
                href={selectedTool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-3 h-9 w-full text-[11px]"
              >
                Situs resmi {selectedTool.domain}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : null}
          </section>

          <section className="card-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-sm font-bold text-ink">
                {output ? "Analisis hasil" : "Analisis draf"}
              </h2>
              <span className="text-[10px] font-medium text-muted">
                {output ? "setelah diproses" : "langsung diperbarui"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Metric label="Kata" value={formatNumber(shownAnalysis.metrics.words)} />
              <Metric label="Kalimat" value={formatNumber(shownAnalysis.metrics.sentences)} />
              <Metric label="Paragraf" value={formatNumber(shownAnalysis.metrics.paragraphs)} />
              <Metric
                label="Kata/kalimat"
                value={formatNumber(shownAnalysis.metrics.avgSentenceLength)}
              />
              <Metric
                label="Waktu baca"
                value={
                  shownAnalysis.metrics.readingMinutes
                    ? `${shownAnalysis.metrics.readingMinutes} mnt`
                    : "—"
                }
              />
              <Metric
                label="Keterbacaan"
                value={
                  shownAnalysis.metrics.words
                    ? `${shownAnalysis.metrics.readability} · ${shownAnalysis.metrics.readabilityLabel}`
                    : "—"
                }
                wideValue
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-muted">Skor kerapian</span>
                <span className="font-display font-bold tabular-nums text-ink">
                  {shownAnalysis.metrics.words ? `${shownAnalysis.metrics.score}/100` : "—"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line/10">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-iris to-aqua transition-[width] duration-500"
                  style={{ width: `${shownAnalysis.metrics.words ? shownAnalysis.metrics.score : 0}%` }}
                />
              </div>
              <p className="mt-1.5 text-[10px] leading-relaxed text-muted/80">
                Skor kerapian mesin lokal, bukan skor AI detector. Keterbacaan diperkirakan dari
                panjang kalimat dan kata.
              </p>
            </div>
          </section>

          <section className="card-surface p-4">
            <h2 className="font-display text-sm font-bold text-ink">
              Catatan mesin{output ? " pada hasil" : ""}
            </h2>
            {shownAnalysis.issues.length === 0 ? (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] p-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <p className="text-[11px] leading-relaxed text-muted">
                  {shownAnalysis.metrics.words
                    ? "Tidak ada catatan mekanik. Tetap baca ulang isi dan sumbernya."
                    : "Mulai menulis untuk melihat catatan otomatis di sini."}
                </p>
              </div>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {shownAnalysis.issues.map((issue) => (
                  <li
                    key={issue.id}
                    className="rounded-xl border border-line/[0.07] bg-line/[0.02] p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-ink">{issue.title}</p>
                      <span className="rounded-full bg-line/[0.06] px-2 py-0.5 text-[10px] font-bold tabular-nums text-muted">
                        {issue.count}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted">{issue.hint}</p>
                    {issue.examples[0] ? (
                      <p className="mt-1.5 line-clamp-2 break-words text-[10px] leading-relaxed text-muted/80">
                        “{issue.examples[0]}”
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/12 text-amber-300">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            </span>
            <h2 className="mt-2 font-display text-xs font-bold text-ink">Batas mesin lokal</h2>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
              Alat ini tidak menilai orisinalitas, tidak memeriksa fakta, dan tidak menjamin lolos
              AI detector atau Turnitin. Teks tidak dikirim ke server LEGACY, tetapi hasilnya tetap
              perlu kamu baca dan pertanggungjawabkan.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  wideValue = false,
}: {
  label: string;
  value: string;
  wideValue?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line/[0.07] bg-line/[0.02] px-2.5 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted/80">{label}</p>
      <p
        className={cn(
          "mt-0.5 font-display font-bold tabular-nums leading-snug text-ink",
          wideValue ? "text-[11px]" : "text-sm",
        )}
      >
        {value}
      </p>
    </div>
  );
}
