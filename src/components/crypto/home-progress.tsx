"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Bookmark, CheckCircle2, Sparkles, Target, Trophy } from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { cryptoChapters } from "@/data/crypto/chapters";

export function HomeProgress() {
  const { ready, completed, quiz, simulations, bookmarks, gameBestStreak } = useCryptoProgress();
  const total = cryptoChapters.length;
  const done = ready ? completed.length : 0;
  const percent = Math.round((done / total) * 100);
  const quizEntries = Object.values(quiz);
  const quizAverage =
    quizEntries.length > 0
      ? Math.round(
          (quizEntries.reduce((sum, entry) => sum + entry.best / Math.max(entry.total, 1), 0) /
            quizEntries.length) *
            100,
        )
      : 0;
  const nextChapter = cryptoChapters.find((chapter) => !completed.includes(chapter.slug)) ?? cryptoChapters[total - 1];
  const nextHref = nextChapter ? `/crypto/ebook/${nextChapter.slug}` : "/crypto/ebook";

  return (
    <div className="rounded-2xl border border-line/10 bg-canvas/55 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-label">
            <Sparkles className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            Progres belajarmu
          </p>
          <p className="mt-1 text-xs text-muted">
            {ready
              ? done > 0
                ? `Kamu sudah menyelesaikan ${done} dari ${total} bab.`
                : "Belum ada bab yang diselesaikan. Mulai dari bab pertama."
              : "Memuat progres dari perangkat ini…"}
          </p>
        </div>
        <Link href={nextHref} className="btn-primary h-10 px-4 text-xs">
          {done === 0 ? "Mulai Belajar" : done >= total ? "Buka e-book" : "Lanjut belajar"}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div className="relative mx-auto h-24 w-24">
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `conic-gradient(#6366f1 0%, #22d3ee ${Math.max(percent, 1)}%, rgb(255 255 255 / 0.06) ${Math.max(percent, 1)}% 100%)`,
            }}
          />
          <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-canvas">
            <span className="text-lg font-bold text-ink">{percent}%</span>
            <span className="text-[9px] text-muted">selesai</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MiniStat icon={CheckCircle2} label="Bab selesai" value={`${done}/${total}`} tone="text-emerald-300" />
          <MiniStat icon={Trophy} label="Rata-rata kuis" value={`${quizAverage}%`} tone="text-amber-300" />
          <MiniStat icon={Target} label="Simulasi" value={`${simulations.length}/8`} tone="text-aqua" />
          <MiniStat icon={Bookmark} label="Disimpan" value={`${bookmarks.length}`} tone="text-plasma" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
        <span>Progres disimpan di perangkat ini (LocalStorage).</span>
        <span className="inline-flex items-center gap-1">
          <BookOpen className="h-3 w-3" aria-hidden="true" />
          Streak game terbaik: {ready ? gameBestStreak : 0}
        </span>
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-line/10 bg-line/[0.02] p-2.5">
      <Icon className={`h-3.5 w-3.5 ${tone}`} aria-hidden="true" />
      <p className="mt-1 text-[9px] text-muted">{label}</p>
      <p className="text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
