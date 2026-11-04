import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Info,
  Lightbulb,
  ListChecks,
  TriangleAlert,
} from "lucide-react";
import { ChapterVisualFigure } from "@/components/crypto/chapter-visual";
import { chapterIcon } from "@/components/crypto/chapter-icon";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { ReaderTools } from "@/components/crypto/reader-tools";
import { cryptoChapters, getChapter, getChapterByOrder } from "@/data/crypto/chapters";
import type { ChapterCallout } from "@/data/crypto/types";
import { cn } from "@/lib/utils";

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
    title: `Bab ${chapter.order} — ${chapter.title}`,
    description: chapter.description,
    alternates: { canonical: `/crypto/ebook/${chapter.slug}` },
    openGraph: {
      title: `Bab ${chapter.order} — ${chapter.title}`,
      description: chapter.subtitle,
      url: `/crypto/ebook/${chapter.slug}`,
    },
  };
}

const calloutStyles: Record<NonNullable<ChapterCallout["tone"]>, { wrap: string; title: string; icon: typeof Info }> = {
  info: { wrap: "border-aqua/15 bg-aqua/[0.04] text-muted", title: "text-aqua", icon: Info },
  warning: { wrap: "border-amber-400/20 bg-amber-400/[0.05] text-muted", title: "text-amber-200", icon: TriangleAlert },
  tip: { wrap: "border-emerald-400/15 bg-emerald-400/[0.04] text-muted", title: "text-emerald-200", icon: Lightbulb },
};

function Callout({ callout }: { callout: ChapterCallout }) {
  const tone = calloutStyles[callout.tone ?? "info"];
  const Icon = tone.icon;
  return (
    <div className={cn("my-4 rounded-xl border p-3.5", tone.wrap)}>
      <p className={cn("flex items-center gap-1.5 text-[11px] font-bold", tone.title)}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {callout.title}
      </p>
      <p className="mt-1 text-[12px] leading-relaxed">{callout.body}</p>
    </div>
  );
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const Icon = chapterIcon(chapter.icon);
  const previous = getChapterByOrder(chapter.order - 1);
  const next = getChapterByOrder(chapter.order + 1);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="crypto-article min-w-0">
        <Link
          href="/crypto/ebook"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Semua bab
        </Link>

        <header className="mt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ color: chapter.accent, backgroundColor: `${chapter.accent}16` }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                Bab {String(chapter.order).padStart(2, "0")} dari {cryptoChapters.length}
              </p>
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10px] text-muted">
                <span className="rounded-full border border-line/10 px-2 py-0.5">{chapter.level}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {chapter.minutes} menit
                </span>
                <span className="inline-flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" aria-hidden="true" />
                  {chapter.quiz.length} soal
                </span>
              </div>
            </div>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
            {chapter.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{chapter.subtitle}</p>
          <p className="mt-3 text-[12px] leading-relaxed text-muted/90">{chapter.description}</p>
        </header>

        <div className="mt-5">
          <ReaderTools slug={chapter.slug} title={chapter.title} />
        </div>

        <div className="rounded-2xl border border-line/10 bg-canvas/45 p-4 sm:p-5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            <ListChecks className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            Setelah bab ini kamu bisa
          </p>
          <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
            {chapter.objectives.map((objective) => (
              <li key={objective} className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                {objective}
              </li>
            ))}
          </ul>
        </div>

        <article className="mt-6 space-y-7">
          {chapter.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">
                <span className="mr-1.5 text-sm font-bold text-muted/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <div className="mt-2 space-y-2.5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-[13px] leading-[1.85] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-3 space-y-1.5 rounded-xl border border-line/10 bg-line/[0.02] p-3.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-aqua" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.visual ? <ChapterVisualFigure visual={section.visual} /> : null}
              {section.callout ? <Callout callout={section.callout} /> : null}
            </section>
          ))}
        </article>

        <section className="mt-8 rounded-2xl border border-iris/15 bg-iris/[0.04] p-4 sm:p-5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-iris">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Ringkasan bab
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {chapter.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                {takeaway}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4 flex flex-col gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold text-amber-200">Uji pemahaman bab {chapter.order}</p>
            <p className="mt-0.5 text-[11px] text-muted">
              {chapter.quiz.length} soal pilihan ganda dengan pembahasan tiap jawaban.
            </p>
          </div>
          <Link href={`/crypto/quiz/${chapter.slug}`} className="btn-primary h-9 shrink-0 px-4 text-[11px]">
            Kerjakan kuis
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>

        <nav aria-label="Navigasi bab" className="mt-4 grid gap-2 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/crypto/ebook/${previous.slug}`}
              className="group flex items-start gap-2 rounded-xl border border-line/10 bg-canvas/45 p-3 transition-colors hover:border-line/20"
            >
              <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
                  Sebelumnya · Bab {previous.order}
                </span>
                <span className="mt-0.5 block truncate text-[11px] font-semibold text-ink">{previous.title}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={`/crypto/ebook/${next.slug}`}
              className="group flex items-start gap-2 rounded-xl border border-line/10 bg-canvas/45 p-3 text-right transition-colors hover:border-line/20"
            >
              <span className="ml-auto min-w-0">
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
                  Berikutnya · Bab {next.order}
                </span>
                <span className="mt-0.5 block truncate text-[11px] font-semibold text-ink">{next.title}</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/crypto/progress"
              className="group flex items-start gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-right"
            >
              <span className="ml-auto min-w-0">
                <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  Selesai · Bab terakhir
                </span>
                <span className="mt-0.5 block truncate text-[11px] font-semibold text-ink">Lihat progres belajarmu</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </nav>

        <div className="mt-5">
          <CryptoDisclaimer compact />
        </div>
      </div>

      <aside className="crypto-reader-sidebar hidden lg:block">
        <div className="sticky top-20 rounded-2xl border border-line/10 bg-canvas/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Daftar isi</p>
          <nav aria-label="Daftar isi bab" className="mt-2 space-y-0.5 border-l border-line/10">
            {chapter.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block rounded-r-md border-l border-transparent py-1 pl-2.5 pr-1 text-[11px] leading-snug text-muted transition-colors hover:border-aqua hover:text-ink"
              >
                {section.heading}
              </a>
            ))}
          </nav>
          <div className="mt-3 border-t border-line/[0.07] pt-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Bab lain</p>
            <div className="mt-2 grid gap-1">
              {cryptoChapters.map((item) => (
                <Link
                  key={item.slug}
                  href={`/crypto/ebook/${item.slug}`}
                  aria-current={item.slug === chapter.slug ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px] transition-colors",
                    item.slug === chapter.slug
                      ? "bg-line/[0.06] font-semibold text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  <span className="w-4 shrink-0 text-right font-bold text-muted/70">{item.order}</span>
                  <span className="truncate">{item.shortTitle}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
