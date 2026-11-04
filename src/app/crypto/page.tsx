import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChartCandlestick,
  Clock,
  Gamepad2,
  GraduationCap,
  Library,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { CandleChart } from "@/components/crypto/candle-chart";
import { ChapterList } from "@/components/crypto/chapter-list";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { HomeProgress } from "@/components/crypto/home-progress";
import { SectionHeading } from "@/components/section-heading";
import { cryptoChapters } from "@/data/crypto/chapters";
import { candlePatterns } from "@/data/crypto/patterns";
import { simulationExercises } from "@/data/crypto/simulation";
import { formatPrice, timeframeSeries } from "@/lib/crypto/market";

export const metadata: Metadata = {
  title: { absolute: "Crypto Academy — Belajar Fundamental Crypto & Candlestick dari Nol" },
  description:
    "Kelas crypto interaktif berbahasa Indonesia: 10 bab, 11 pola candlestick, Candle Lab, simulasi, 100 soal, dan glosarium. Mulai dari nol tanpa jargon berlebihan.",
};

const heroCandles = timeframeSeries("H1", 120, 8);
const heroPrice = heroCandles[heroCandles.length - 1]?.close ?? 0;

const features = [
  {
    href: "/crypto/candlestick-lab",
    icon: ChartCandlestick,
    title: "Candle Lab",
    body: "Zoom, pan, hover OHLC, ganti timeframe, dan pelajari 11 pola dengan penjelasan psikologi pasar.",
    tone: "text-emerald-300",
  },
  {
    href: "/crypto/simulation",
    icon: Target,
    title: "Simulasi baca candle",
    body: "8 latihan kontekstual: tentukan arti pola, lihat umpan balik, dan baca alasan di balik jawaban.",
    tone: "text-aqua",
  },
  {
    href: "/crypto/quiz",
    icon: GraduationCap,
    title: "100 soal kuis",
    body: "10 soal per bab dengan skor otomatis, pembahasan tiap jawaban, dan skor terbaik tersimpan.",
    tone: "text-amber-300",
  },
  {
    href: "/crypto/glossary",
    icon: Library,
    title: "Glosarium A–Z",
    body: "Istilah penting dari ATH sampai yield, lengkap dengan definisi sederhana dan contoh.",
    tone: "text-plasma",
  },
  {
    href: "/crypto/game",
    icon: Gamepad2,
    title: "Bitcoin demo game",
    body: "Tebak naik atau turun dalam 5 detik memakai akun demo dan uang virtual, bukan uang nyata.",
    tone: "text-rose-300",
  },
  {
    href: "/crypto/progress",
    icon: TrendingUp,
    title: "Progres belajar",
    body: "Pantau bab selesai, skor kuis, bookmark, dan simulasi yang sudah dijawab benar.",
    tone: "text-iris",
  },
];

const popularSlugs = ["candlestick-dasar", "pola-candlestick", "support-resistance", "manajemen-risiko"];

export default function CryptoHomePage() {
  const popular = popularSlugs
    .map((slug) => cryptoChapters.find((chapter) => chapter.slug === slug))
    .filter((chapter): chapter is (typeof cryptoChapters)[number] => Boolean(chapter));

  return (
    <div className="space-y-10">
      <section className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-aqua/20 bg-aqua/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-aqua">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Crypto Academy · E-book interaktif
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
            Belajar crypto dan <span className="text-gradient">candlestick</span> dari nol.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
            Pahami cara kerja pasar, membaca satu candle, mengenali pola, mengukur risiko, dan menyikapi
            berita makro. Semua dijelaskan bertahap dalam bahasa Indonesia, dengan chart simulasi yang bisa
            kamu eksplor sendiri.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/crypto/ebook/pengenalan-crypto" className="btn-primary h-11 px-5 text-xs">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Mulai Belajar
            </Link>
            <Link href="/crypto/candlestick-lab" className="btn-ghost h-11 px-4 text-xs">
              <ChartCandlestick className="h-4 w-4" aria-hidden="true" />
              Buka Candle Lab
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: "Bab materi", value: String(cryptoChapters.length), icon: BookOpen },
              { label: "Soal kuis", value: "100", icon: GraduationCap },
              { label: "Pola candle", value: String(candlePatterns.length), icon: ChartCandlestick },
              { label: "Simulasi", value: String(simulationExercises.length), icon: Target },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-xl border border-line/10 bg-canvas/45 p-2.5">
                  <Icon className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
                  <dd className="mt-1 text-lg font-bold text-ink">{item.value}</dd>
                  <dt className="text-[9px] text-muted">{item.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="rounded-2xl border border-line/10 bg-canvas/55 p-3 shadow-card sm:p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/12 text-xs font-bold text-amber-300">
                ₿
              </span>
              <div>
                <p className="text-[11px] font-bold text-ink">BTC / USDT</p>
                <p className="text-[9px] text-muted">Chart simulasi edukasi</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-ink">{formatPrice(heroPrice)}</p>
              <p className="text-[9px] text-muted">H1 · {heroCandles.length} candle</p>
            </div>
          </div>
          <CandleChart
            candles={heroCandles}
            timeframe="H1"
            height={240}
            initialVisible={70}
            showVolume
            resetKey="hero"
          />
          <p className="mt-2 text-[9px] leading-relaxed text-muted">
            Data dibangkitkan untuk latihan, bukan harga pasar nyata. Coba zoom, geser, dan klik candle.
          </p>
        </div>
      </section>

      <HomeProgress />

      <section>
        <SectionHeading
          label="Mulai dari sini"
          title="Semua yang kamu butuhkan untuk membaca pasar"
          description="Materi tersusun dari konsep dasar sampai kebiasaan risiko. Tidak ada sinyal beli atau jual."
        />
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-xl border border-line/10 bg-canvas/45 p-4 transition-all hover:-translate-y-0.5 hover:border-line/20 hover:bg-line/[0.03]"
              >
                <Icon className={`h-5 w-5 ${feature.tone}`} aria-hidden="true" />
                <h3 className="mt-3 text-sm font-bold text-ink">{feature.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{feature.body}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-muted transition-colors group-hover:text-ink">
                  Buka
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading
          label="Kurikulum"
          title="10 bab, dari fundamental sampai berita makro"
          description="Setiap bab punya penjelasan, ilustrasi, contoh, ringkasan, dan kuis 10 soal."
          href="/crypto/ebook"
          linkLabel="Buka e-book"
        />
        <div className="mt-4">
          <ChapterList />
        </div>
      </section>

      <section>
        <SectionHeading
          label="Paling banyak dibuka"
          title="Materi populer untuk pemula"
          description="Empat bab yang paling sering menjadi titik mulai sebelum masuk ke analisis yang lebih dalam."
        />
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {popular.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/crypto/ebook/${chapter.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-line/10 bg-canvas/45 p-4 transition-colors hover:border-line/20"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                style={{ color: chapter.accent, backgroundColor: `${chapter.accent}14` }}
              >
                {String(chapter.order).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-ink">{chapter.title}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted">{chapter.subtitle}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-[9px] text-muted">
                  <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                  {chapter.minutes} menit
                  <Trophy className="h-2.5 w-2.5" aria-hidden="true" />
                  {chapter.quiz.length} soal
                </span>
              </div>
              <ArrowRight
                className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <CryptoDisclaimer />
    </div>
  );
}
