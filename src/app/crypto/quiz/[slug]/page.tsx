import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { QuizRunner } from "@/components/crypto/quiz-runner";
import { cryptoChapters, getChapter, getChapterByOrder } from "@/data/crypto/chapters";

export const dynamicParams = false;

export function generateStaticParams() {
  return cryptoChapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return {
    title: `Kuis Bab ${chapter.order} — ${chapter.title}`,
    description: `Kerjakan ${chapter.quiz.length} soal kuis untuk bab ${chapter.title}. Ada pembahasan tiap jawaban dan skor otomatis.`,
    alternates: { canonical: `/crypto/quiz/${chapter.slug}` },
  };
}

export default async function ChapterQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const previous = getChapterByOrder(chapter.order - 1);
  const next = getChapterByOrder(chapter.order + 1);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        href="/crypto/quiz"
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Semua kuis
      </Link>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ color: chapter.accent, backgroundColor: `${chapter.accent}16` }}
          >
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Kuis bab {String(chapter.order).padStart(2, "0")}
          </p>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
          {chapter.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            {chapter.quiz.length} soal
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            ± {Math.max(3, Math.round(chapter.minutes / 2))} menit
          </span>
          <Link href={`/crypto/ebook/${chapter.slug}`} className="text-aqua hover:underline">
            Baca ulang bab
          </Link>
        </div>
      </header>

      <QuizRunner chapter={chapter} />

      <nav aria-label="Navigasi kuis" className="grid gap-2 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/crypto/quiz/${previous.slug}`}
            className="flex items-center gap-2 rounded-xl border border-line/10 bg-canvas/45 p-3 transition-colors hover:border-line/20"
          >
            <ArrowLeft className="h-4 w-4 text-muted" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
                Kuis sebelumnya
              </span>
              <span className="block truncate text-[11px] font-semibold text-ink">{previous.shortTitle}</span>
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        {next ? (
          <Link
            href={`/crypto/quiz/${next.slug}`}
            className="flex items-center gap-2 rounded-xl border border-line/10 bg-canvas/45 p-3 text-right transition-colors hover:border-line/20"
          >
            <span className="ml-auto min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
                Kuis berikutnya
              </span>
              <span className="block truncate text-[11px] font-semibold text-ink">{next.shortTitle}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            href="/crypto/progress"
            className="flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-right"
          >
            <span className="ml-auto min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                Kuis terakhir
              </span>
              <span className="block truncate text-[11px] font-semibold text-ink">Lihat rekap progres</span>
            </span>
            <ArrowRight className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          </Link>
        )}
      </nav>

      <CryptoDisclaimer />
    </div>
  );
}
