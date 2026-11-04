"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { cryptoChapters } from "@/data/crypto/chapters";
import { simulationExercises } from "@/data/crypto/simulation";
import { cn } from "@/lib/utils";

export function ProgressDashboard() {
  const {
    ready,
    completed,
    bookmarks,
    quiz,
    simulations,
    gameBestStreak,
    resetProgress,
  } = useCryptoProgress();
  const [confirming, setConfirming] = useState(false);
  const total = cryptoChapters.length;
  const percent = Math.round(((ready ? completed.length : 0) / total) * 100);
  const quizEntries = Object.values(quiz);
  const quizAverage =
    quizEntries.length > 0
      ? Math.round(
          (quizEntries.reduce((sum, entry) => sum + entry.best / Math.max(entry.total, 1), 0) /
            quizEntries.length) *
            100,
        )
      : 0;
  const nextChapter = cryptoChapters.find((chapter) => !completed.includes(chapter.slug)) ?? cryptoChapters[0];
  const minutes = cryptoChapters
    .filter((chapter) => completed.includes(chapter.slug))
    .reduce((sum, chapter) => sum + chapter.minutes, 0);
  const bookmarkedChapters = cryptoChapters.filter((chapter) => bookmarks.includes(chapter.slug));

  return (
    <div className="space-y-4">
      <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="section-label">
                <Target className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                Ringkasan progres
              </p>
              <p className="mt-1 text-xs text-muted">
                {ready ? `${completed.length} dari ${total} bab selesai` : "Memuat…"}
              </p>
            </div>
            <Link href={`/crypto/ebook/${nextChapter.slug}`} className="btn-primary h-9 px-3.5 text-[11px]">
              {completed.length === 0 ? "Mulai" : "Lanjut"}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] text-muted">
              <span>Kemajuan e-book</span>
              <span>{percent}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-line/[0.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-iris via-plasma to-aqua transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Bab selesai" value={`${completed.length}/${total}`} />
            <Stat label="Waktu materi" value={`${minutes} mnt`} />
            <Stat label="Rata-rata kuis" value={`${quizAverage}%`} />
            <Stat label="Simulasi benar" value={`${simulations.length}/${simulationExercises.length}`} />
          </div>
        </div>

        <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Catatan</p>
          <ul className="mt-2 space-y-2 text-[11px] text-muted">
            <li className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                Kuis dicoba
              </span>
              <span className="font-semibold text-ink">{quizEntries.length}/10</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5">
                <Bookmark className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
                Bab disimpan
              </span>
              <span className="font-semibold text-ink">{bookmarks.length}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                Streak game
              </span>
              <span className="font-semibold text-ink">{gameBestStreak}</span>
            </li>
          </ul>
          <p className="mt-3 rounded-lg border border-line/10 bg-line/[0.02] p-2 text-[10px] leading-relaxed text-muted">
            Progres hanya tersimpan di browser ini. Menghapus data situs akan menghapus progres.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-ink">Status per bab</h2>
          <span className="text-[10px] text-muted">Klik untuk membuka materi</span>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[11px]">
            <thead>
              <tr className="border-b border-line/10 text-[9px] uppercase tracking-[0.14em] text-muted">
                <th className="pb-2 font-semibold">Bab</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold">Kuis</th>
                <th className="pb-2 font-semibold">Simpan</th>
                <th className="pb-2 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cryptoChapters.map((chapter) => {
                const done = completed.includes(chapter.slug);
                const best = quiz[chapter.slug];
                return (
                  <tr key={chapter.slug} className="border-b border-line/[0.06] last:border-0">
                    <td className="py-2.5">
                      <span className="flex items-center gap-2">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-bold"
                          style={{ color: chapter.accent, backgroundColor: `${chapter.accent}14` }}
                        >
                          {chapter.order}
                        </span>
                        <span className="font-medium text-ink">{chapter.title}</span>
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold",
                          done ? "bg-emerald-400/10 text-emerald-300" : "bg-line/[0.05] text-muted",
                        )}
                      >
                        {done ? <CheckCircle2 className="h-3 w-3" /> : null}
                        {done ? "Selesai" : "Belum"}
                      </span>
                    </td>
                    <td className="py-2.5 text-muted">
                      {best ? `${best.best}/${best.total}` : "—"}
                    </td>
                    <td className="py-2.5">
                      {bookmarks.includes(chapter.slug) ? (
                        <Bookmark className="h-3.5 w-3.5 text-amber-300" aria-label="Disimpan" />
                      ) : (
                        <span className="text-muted/40">—</span>
                      )}
                    </td>
                    <td className="py-2.5 text-right">
                      <Link
                        href={`/crypto/ebook/${chapter.slug}`}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted transition-colors hover:text-ink"
                      >
                        Buka
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {bookmarkedChapters.length > 0 ? (
        <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
          <h2 className="text-sm font-bold text-ink">Bab yang disimpan</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {bookmarkedChapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/crypto/ebook/${chapter.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.03] px-3 py-1.5 text-[10px] font-medium text-muted transition-colors hover:text-ink"
              >
                <Bookmark className="h-3 w-3 text-amber-300" aria-hidden="true" />
                {chapter.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-ink">Reset progres</h2>
            <p className="mt-0.5 text-[11px] text-muted">
              Menghapus status bab, skor kuis, simulasi, dan bookmark dari perangkat ini.
            </p>
          </div>
          {confirming ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setConfirming(false);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 text-[11px] font-semibold text-rose-300"
              >
                Ya, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="inline-flex h-9 items-center rounded-lg border border-line/10 px-3 text-[11px] font-semibold text-muted"
              >
                Batal
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line/10 bg-line/[0.03] px-3 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset progres
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line/10 bg-line/[0.02] p-2.5">
      <p className="text-[9px] text-muted">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
