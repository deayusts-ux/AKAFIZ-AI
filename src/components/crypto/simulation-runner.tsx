"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Lightbulb, RotateCcw, Target, X, XCircle } from "lucide-react";
import { MiniCandleChart } from "@/components/crypto/mini-candle-chart";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { simulationExercises } from "@/data/crypto/simulation";
import { cn } from "@/lib/utils";

export function SimulationRunner() {
  const { markSimulationSolved, simulations } = useCryptoProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const exercise = simulationExercises[index];
  const total = simulationExercises.length;
  const correctCount = results.filter(Boolean).length;
  const isCorrect = selected !== null && exercise.options[selected]?.correct === true;

  const check = () => {
    if (selected === null || checked) return;
    setChecked(true);
    setResults((current) => {
      const next = [...current];
      next[index] = exercise.options[selected]?.correct === true;
      return next;
    });
    if (exercise.options[selected]?.correct) markSimulationSolved(exercise.id);
  };

  const next = () => {
    if (index < total - 1) {
      setIndex((value) => value + 1);
      setSelected(null);
      setChecked(false);
      return;
    }
    setFinished(true);
  };

  const retry = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setResults([]);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((correctCount / total) * 100);
    return (
      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-5 sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aqua to-iris text-white shadow-glow">
            <Target className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Hasil simulasi</p>
          <p className="mt-2 font-display text-5xl font-bold text-gradient">
            {correctCount}/{total}
          </p>
          <p className="mt-1 text-sm text-muted">{percent}% jawaban tepat</p>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-muted">
            {percent >= 80
              ? "Kamu sudah bisa membaca konteks candle dengan baik. Lanjutkan ke latihan chart dan kuis bab."
              : percent >= 50
                ? "Sebagian besar konsep sudah terbaca. Tinjau penjelasan pada latihan yang salah, lalu ulangi."
                : "Baca ulang bab Candlestick dan Pola Candlestick, lalu coba lagi. Latihan berulang akan membantu."}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={retry} className="btn-ghost h-10 px-4 text-xs">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Ulangi simulasi
            </button>
            <Link href="/crypto/candlestick-lab" className="btn-primary h-10 px-4 text-xs">
              Buka Candle Lab
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-2">
          {simulationExercises.map((item, exerciseIndex) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-lg border border-line/10 bg-line/[0.02] px-3 py-2 text-[11px]"
            >
              {results[exerciseIndex] ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
              ) : (
                <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" aria-hidden="true" />
              )}
              <span className="text-muted">{item.title}</span>
              <span className="ml-auto text-muted/70">{item.level}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
        <span>
          Latihan {index + 1} / {total}
        </span>
        <span>{simulations.length} latihan sudah dijawab benar sebelumnya</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-aqua to-iris transition-[width] duration-500"
          style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{exercise.level}</p>
            <h2 className="mt-1 font-display text-lg font-bold text-ink">{exercise.title}</h2>
          </div>
          <span className="rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 text-[10px] text-muted">
            Simulasi candle
          </span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-muted">{exercise.context}</p>

        <div className="mt-3 rounded-xl border border-line/10 bg-line/[0.02] p-2 sm:p-3">
          <MiniCandleChart
            bars={exercise.bars}
            highlight={exercise.highlight}
            height={190}
            ariaLabel={`Chart simulasi: ${exercise.title}`}
          />
          <p className="mt-1 text-[10px] text-muted">Data simulasi edukasi, bukan harga pasar nyata.</p>
        </div>

        <p className="mt-4 text-sm font-semibold leading-relaxed text-ink">{exercise.question}</p>

        <div className="mt-3 space-y-2">
          {exercise.options.map((option, optionIndex) => {
            const chosen = selected === optionIndex;
            const showCorrect = checked && option.correct;
            const showWrong = checked && chosen && !option.correct;
            return (
              <button
                key={option.label}
                type="button"
                disabled={checked}
                onClick={() => setSelected(optionIndex)}
                aria-pressed={chosen}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-xs transition-colors",
                  showCorrect
                    ? "border-emerald-400/40 bg-emerald-400/[0.08]"
                    : showWrong
                      ? "border-rose-400/40 bg-rose-400/[0.08]"
                      : chosen
                        ? "border-iris/50 bg-iris/[0.08]"
                        : "border-line/10 bg-line/[0.02] hover:border-line/20",
                  checked ? "cursor-default" : "",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                    showCorrect
                      ? "border-emerald-400/40 text-emerald-300"
                      : showWrong
                        ? "border-rose-400/40 text-rose-300"
                        : chosen
                          ? "border-iris/40 text-iris"
                          : "border-line/15 text-muted",
                  )}
                >
                  {showCorrect ? <Check className="h-3 w-3" /> : showWrong ? <X className="h-3 w-3" /> : null}
                </span>
                <span className="leading-relaxed text-ink">{option.label}</span>
              </button>
            );
          })}
        </div>

        {checked ? (
          <div
            className={cn(
              "mt-4 rounded-xl border p-3.5",
              isCorrect ? "border-emerald-400/20 bg-emerald-400/[0.05]" : "border-rose-400/20 bg-rose-400/[0.05]",
            )}
          >
            <p
              className={cn(
                "text-xs font-bold",
                isCorrect ? "text-emerald-300" : "text-rose-300",
              )}
            >
              {isCorrect ? "Tepat" : "Belum tepat"}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">{exercise.explanation}</p>
            <p className="mt-2 flex items-start gap-1.5 rounded-lg border border-line/10 bg-canvas/40 p-2 text-[10px] leading-relaxed text-muted">
              <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-300" aria-hidden="true" />
              {exercise.takeaway}
            </p>
          </div>
        ) : null}

        <div className="mt-4 flex justify-end">
          {checked ? (
            <button type="button" onClick={next} className="btn-primary h-10 px-5 text-xs">
              {index < total - 1 ? "Latihan berikutnya" : "Lihat hasil"}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={check}
              disabled={selected === null}
              className="btn-primary h-10 px-5 text-xs"
            >
              Periksa jawaban
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
