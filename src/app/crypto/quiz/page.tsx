import type { Metadata } from "next";
import { GraduationCap, ShieldCheck, Trophy } from "lucide-react";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { QuizDashboard } from "@/components/crypto/quiz-dashboard";
import { cryptoChapters, totalQuizCount } from "@/data/crypto/chapters";

export const metadata: Metadata = {
  title: "Kuis",
  description:
    "100 soal pilihan ganda dari 10 bab Crypto Academy. Skor otomatis, pembahasan tiap jawaban, skor terbaik tersimpan, dan target minimal 75%.",
  alternates: { canonical: "/crypto/quiz" },
};

export default function QuizPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          Kuis
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Uji pemahaman, bukan hafalan.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {totalQuizCount} soal dari {cryptoChapters.length} bab. Setiap jawaban langsung diberi umpan balik dan
          pembahasan. Skor terbaik disimpan otomatis di perangkat ini.
        </p>
      </section>

      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          {
            icon: GraduationCap,
            title: `${totalQuizCount} soal`,
            body: "10 soal per bab, mencakup konsep, pola, dan konteks.",
            tone: "text-amber-300",
          },
          {
            icon: Trophy,
            title: "Skor otomatis",
            body: "Nilai akhir dengan grade, plus rekap jawaban benar dan salah.",
            tone: "text-emerald-300",
          },
          {
            icon: ShieldCheck,
            title: "Tanpa tekanan",
            body: "Bisa diulang kapan saja. Skor terbaik yang dipertahankan.",
            tone: "text-aqua",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-xl border border-line/10 bg-canvas/45 p-4">
              <Icon className={`h-4 w-4 ${item.tone}`} aria-hidden="true" />
              <p className="mt-2 text-xs font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{item.body}</p>
            </div>
          );
        })}
      </div>

      <QuizDashboard />

      <CryptoDisclaimer />
    </div>
  );
}
