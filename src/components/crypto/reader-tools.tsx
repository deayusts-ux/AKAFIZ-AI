"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Check, CheckCircle2, Maximize2, Minimize2, Printer } from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { cn } from "@/lib/utils";

export function ReaderTools({ slug, title }: { slug: string; title: string }) {
  const { ready, isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useCryptoProgress();
  const [reading, setReading] = useState(false);
  const bookmarked = ready && isBookmarked(slug);
  const completed = ready && isCompleted(slug);

  useEffect(() => {
    document.documentElement.classList.toggle("crypto-reading", reading);
    return () => document.documentElement.classList.remove("crypto-reading");
  }, [reading]);

  return (
    <div className="reader-tools sticky top-16 z-30 -mx-1 mb-5 flex flex-wrap items-center gap-1.5 rounded-xl border border-line/10 bg-canvas/85 p-1.5 backdrop-blur-xl">
      <button
        type="button"
        onClick={() => toggleBookmark(slug)}
        aria-pressed={bookmarked}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold transition-colors",
          bookmarked
            ? "bg-amber-400/12 text-amber-300"
            : "text-muted hover:bg-line/[0.05] hover:text-ink",
        )}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {bookmarked ? "Disimpan" : "Simpan"}
      </button>

      <button
        type="button"
        onClick={() => toggleCompleted(slug)}
        aria-pressed={completed}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold transition-colors",
          completed
            ? "bg-emerald-400/12 text-emerald-300"
            : "text-muted hover:bg-line/[0.05] hover:text-ink",
        )}
      >
        {completed ? (
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {completed ? "Selesai" : "Tandai selesai"}
      </button>

      <button
        type="button"
        onClick={() => setReading((value) => !value)}
        aria-pressed={reading}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold text-muted transition-colors hover:bg-line/[0.05] hover:text-ink"
      >
        {reading ? (
          <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {reading ? "Keluar mode baca" : "Mode baca"}
      </button>

      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold text-muted transition-colors hover:bg-line/[0.05] hover:text-ink"
      >
        <Printer className="h-3.5 w-3.5" aria-hidden="true" />
        Cetak / PDF
      </button>

      <span className="ml-auto hidden pr-1 text-[10px] text-muted sm:block">
        {completed ? "Bab selesai" : "Tandai selesai untuk melacak progres"}
      </span>
      <span className="sr-only">{title}</span>
    </div>
  );
}
