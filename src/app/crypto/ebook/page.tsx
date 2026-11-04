import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap, ListChecks, Sparkles } from "lucide-react";
import { ChapterList } from "@/components/crypto/chapter-list";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { HomeProgress } from "@/components/crypto/home-progress";
import { SectionHeading } from "@/components/section-heading";
import { cryptoChapters, totalLearningMinutes, totalQuizCount } from "@/data/crypto/chapters";

export const metadata: Metadata = {
  title: "E-book interaktif",
  description:
    "Baca 10 bab Crypto Academy: pengenalan crypto, fundamental, pasar, candlestick, pola, support-resistance, volume, analisis grafik, manajemen risiko, dan berita fundamental.",
  alternates: { canonical: "/crypto/ebook" },
};

const studySteps = [
  {
    title: "Baca bab secara berurutan",
    body: "Setiap bab dibangun dari konsep sebelumnya. Mulai dari cara kerja blockchain sampai membaca reaksi pasar terhadap berita.",
  },
  {
    title: "Amati ilustrasi dan chart",
    body: "Semua chart memakai data simulasi. Fokus pada bentuk, konteks, dan reaksi harga, bukan pada angka yang terlihat.",
  },
  {
    title: "Kerjakan kuis 10 soal",
    body: "Kuis membantu mengecek pemahaman. Setiap jawaban punya pembahasan, jadi kesalahan menjadi bahan belajar.",
  },
  {
    title: "Tandai selesai dan ulangi",
    body: "Progres tersimpan di perangkatmu. Kamu bisa bookmark bab, melanjutkan dari mana saja, dan mencetak materi.",
  },
];

export default function EbookIndexPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-line/10 bg-canvas/50 p-5 sm:p-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-aqua/20 bg-aqua/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-aqua">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          E-book interaktif
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Satu jalur belajar, <span className="text-gradient">sepuluh bab</span>.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Materi disusun bertahap: mulai dari alasan crypto ada, cara pasar bekerja, membaca candle, sampai
          menyikapi data makro. Tidak perlu latar belakang trading untuk mulai.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Bab", value: String(cryptoChapters.length), icon: BookOpen },
            { label: "Soal kuis", value: String(totalQuizCount), icon: GraduationCap },
            { label: "Total waktu", value: `${Math.round(totalLearningMinutes / 60)} jam`, icon: Clock },
            { label: "Ilustrasi", value: "11+", icon: ListChecks },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
                <Icon className="h-4 w-4 text-aqua" aria-hidden="true" />
                <p className="mt-1.5 text-lg font-bold text-ink">{item.value}</p>
                <p className="text-[10px] text-muted">{item.label}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {cryptoChapters.slice(0, 3).map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/crypto/ebook/${chapter.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.03] px-3 py-1.5 text-[10px] font-semibold text-muted transition-colors hover:text-ink"
            >
              <span className="font-bold" style={{ color: chapter.accent }}>
                {String(chapter.order).padStart(2, "0")}
              </span>
              {chapter.shortTitle}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          ))}
          <Link href="/crypto/ebook/pengenalan-crypto" className="btn-primary h-8 px-3 text-[10px]">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Mulai dari bab 1
          </Link>
        </div>
      </section>

      <HomeProgress />

      <section>
        <SectionHeading
          label="Kurikulum lengkap"
          title="Daftar bab"
          description="Klik bab untuk membuka reader. Progres, bookmark, dan skor kuis tersimpan otomatis di perangkat ini."
        />
        <div className="mt-4">
          <ChapterList />
        </div>
      </section>

      <section>
        <SectionHeading
          label="Cara belajar"
          title="Ritme yang disarankan"
          description="Satu bab bisa selesai dalam 8–15 menit. Lebih baik konsisten daripada mengejar banyak materi sekaligus."
        />
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {studySteps.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-line/10 bg-canvas/45 p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-iris/12 text-[11px] font-bold text-iris">
                {index + 1}
              </span>
              <h3 className="mt-2.5 text-xs font-bold text-ink">{step.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CryptoDisclaimer />
    </div>
  );
}
