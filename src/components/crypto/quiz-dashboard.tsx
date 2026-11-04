"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { cryptoChapters } from "@/data/crypto/chapters";
import { cn } from "@/lib/utils";

export function QuizDashboard() {
  const { ready, quiz } = useCryptoProgress();
  const attempted = cryptoChapters.filter((chapter) => quiz[chapter.slug]);
  const totalQuestions = cryptoChapters.reduce((sum, chapter) => sum + chapter.quiz.length, 0);
  const average =
    attempted.length > 0
      ? Math.round(
          (attempted.reduce(
            (sum, chapter) => sum + quiz[chapter.slug].best / Math.max(quiz[chapter.slug].total, 1),
            0,
          ) /
            attempted.length) *
            100,
        )
      : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-2.5 sm:grid-cols-3">
        <div className="rounded-xl border border-line/10 bg-canvas/50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Kuis dicoba</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {ready ? attempted.length : 0}
            <span className="text-sm font-medium text-muted">/{cryptoChapters.length}</span>
          </p>
          <p className="mt-0.5 text-[10px] text-muted">{totalQuestions} soal total</p>
        </div>
        <div className="rounded-xl border border-line/10 bg-canvas/50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Rata-rata skor</p>
          <p className="mt-1 text-2xl font-bold text-ink">{ready ? average : 0}%</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-iris to-aqua"
              style={{ width: `${ready ? average : 0}%` }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-line/10 bg-canvas/50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Target</p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
            Selesaikan 10 kuis dengan skor minimal 75%.
          </p>
          <p className="mt-1 text-[10px] text-muted">Skor terbaik disimpan otomatis.</p>
        </div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {cryptoChapters.map((chapter) => {
          const best = quiz[chapter.slug];
          const percent = best ? Math.round((best.best / Math.max(best.total, 1)) * 100) : 0;
          return (
            <div
              key={chapter.slug}
              className="flex flex-col justify-between rounded-xl border border-line/10 bg-canvas/45 p-4 transition-colors hover:border-line/20"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  style={{ color: chapter.accent, backgroundColor: `${chapter.accent}14` }}
                >
                  {String(chapter.order).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">{chapter.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted">
                    {chapter.quiz.length} soal · {chapter.level}
                  </p>
                </div>
                {best ? (
                  <span
                    className={cn(
                      "ml-auto shrink-0 rounded-full px-2 py-1 text-[9px] font-bold",
                      percent >= 75
                        ? "bg-emerald-400/10 text-emerald-300"
                        : percent >= 50
                          ? "bg-amber-400/10 text-amber-300"
                          : "bg-rose-400/10 text-rose-300",
                    )}
                  >
                    {best.best}/{best.total}
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="h-1 overflow-hidden rounded-full bg-line/[0.08]">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        percent >= 75 ? "bg-emerald-400" : percent >= 50 ? "bg-amber-400" : "bg-rose-400",
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[9px] text-muted">
                    {best ? (percent >= 75 ? "Lulus target" : "Perlu diulang") : "Belum dikerjakan"}
                  </p>
                </div>
                <Link
                  href={`/crypto/quiz/${chapter.slug}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-line/10 bg-line/[0.03] px-2.5 py-1.5 text-[10px] font-semibold text-muted transition-colors hover:text-ink"
                >
                  {best ? "Ulangi" : "Kerjakan"}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {ready && attempted.length === cryptoChapters.length ? (
        <p className="flex items-center gap-1.5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-[11px] text-emerald-200">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Semua kuis sudah dicoba. Ulangi kuis dengan skor di bawah 75% untuk memperkuat pemahaman.
          <Trophy className="ml-auto h-4 w-4 text-amber-300" aria-hidden="true" />
        </p>
      ) : null}
    </div>
  );
}
