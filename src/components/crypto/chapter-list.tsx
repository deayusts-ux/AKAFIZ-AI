"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, CheckCircle2, Circle, Clock, Trophy } from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { cryptoChapters } from "@/data/crypto/chapters";
import type { Chapter } from "@/data/crypto/types";
import { cn } from "@/lib/utils";

export function ChapterList({ limit }: { limit?: number }) {
  const { ready, isCompleted, isBookmarked, quiz } = useCryptoProgress();
  const chapters = limit ? cryptoChapters.slice(0, limit) : cryptoChapters;

  return (
    <div className="grid gap-2.5">
      {chapters.map((chapter) => (
        <ChapterRow
          key={chapter.slug}
          chapter={chapter}
          ready={ready}
          completed={ready && isCompleted(chapter.slug)}
          bookmarked={ready && isBookmarked(chapter.slug)}
          best={quiz[chapter.slug]}
        />
      ))}
    </div>
  );
}

function ChapterRow({
  chapter,
  ready,
  completed,
  bookmarked,
  best,
}: {
  chapter: Chapter;
  ready: boolean;
  completed: boolean;
  bookmarked: boolean;
  best?: { best: number; total: number };
}) {
  return (
    <Link
      href={`/crypto/ebook/${chapter.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-line/10 bg-canvas/45 p-3 transition-all hover:border-line/20 hover:bg-line/[0.04] sm:p-4"
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-bold",
          completed
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-line/10 bg-line/[0.03] text-muted",
        )}
        style={completed ? undefined : { color: chapter.accent, borderColor: `${chapter.accent}33`, backgroundColor: `${chapter.accent}12` }}
      >
        {completed ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : String(chapter.order).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="truncate text-xs font-semibold text-ink sm:text-sm">{chapter.title}</p>
          {bookmarked ? <Bookmark className="h-3 w-3 text-amber-300" aria-label="Disimpan" /> : null}
        </div>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-muted sm:text-[11px]">{chapter.subtitle}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[9px] text-muted/80">
          <span className="rounded-full border border-line/10 px-1.5 py-0.5">{chapter.level}</span>
          <span className="inline-flex items-center gap-0.5">
            <Clock className="h-2.5 w-2.5" aria-hidden="true" />
            {chapter.minutes} menit
          </span>
          <span>{chapter.quiz.length} soal</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {ready && best ? (
          <span className="hidden items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-[9px] font-bold text-amber-300 sm:inline-flex">
            <Trophy className="h-3 w-3" aria-hidden="true" />
            {best.best}/{best.total}
          </span>
        ) : null}
        {ready && !completed ? <Circle className="h-3 w-3 text-muted/40" aria-hidden="true" /> : null}
        <ArrowRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}
