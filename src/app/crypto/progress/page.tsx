import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { ProgressDashboard } from "@/components/crypto/progress-dashboard";
import { cryptoChapters } from "@/data/crypto/chapters";

export const metadata: Metadata = {
  title: "Progres belajar",
  description:
    "Pantau bab yang selesai, skor kuis, bookmark, dan simulasi yang sudah dijawab benar. Progres disimpan di perangkat ini.",
  alternates: { canonical: "/crypto/progress" },
};

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-iris/25 bg-iris/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-iris">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          Progres
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Perjalanan belajarmu.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {cryptoChapters.length} bab, kuis, dan simulasi tercatat di sini. Data hanya tersimpan di browser ini
          melalui LocalStorage, tidak dikirim ke server.
        </p>
      </section>

      <ProgressDashboard />

      <CryptoDisclaimer />
    </div>
  );
}
