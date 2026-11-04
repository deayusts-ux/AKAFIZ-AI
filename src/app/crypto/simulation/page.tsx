import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, Target } from "lucide-react";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { SimulationRunner } from "@/components/crypto/simulation-runner";
import { simulationExercises } from "@/data/crypto/simulation";

export const metadata: Metadata = {
  title: "Simulasi baca candle",
  description:
    "Latihan membaca candle dengan 8 studi kasus: doji, hammer, engulfing, shooting star, morning star, fakeout, dan struktur pasar. Ada pembahasan dan alasan tiap jawaban.",
  alternates: { canonical: "/crypto/simulation" },
};

const tips = [
  "Lihat konteks sebelum menilai satu candle: tren, level, dan posisi candle di rentang.",
  "Bandingkan body dengan wick. Body kecil berarti pertarungan belum selesai.",
  "Pola pembalikan butuh konfirmasi. Satu candle saja jarang cukup.",
  "Volume membantu menilai apakah pergerakan didukung partisipasi pasar.",
];

export default function SimulationPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-aqua/20 bg-aqua/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-aqua">
          <Target className="h-3.5 w-3.5" aria-hidden="true" />
          Simulasi
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Latih cara membaca candle.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {simulationExercises.length} latihan dengan chart simulasi. Pilih jawaban, periksa, lalu baca
          pembahasan dan alasan di baliknya. Tidak ada sinyal beli atau jual di sini.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-muted">
          <span className="rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold">
            {simulationExercises.length} latihan
          </span>
          <span className="rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold">
            Mudah · Sedang · Sulit
          </span>
          <Link
            href="/crypto/candlestick-lab"
            className="inline-flex items-center gap-1 rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold transition-colors hover:text-ink"
          >
            Buka Candle Lab
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <SimulationRunner />

      <section className="rounded-2xl border border-line/10 bg-canvas/45 p-4">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          <Lightbulb className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
          Kebiasaan yang ingin dilatih
        </p>
        <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
          {tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-[11px] leading-relaxed text-muted">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-aqua" aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <CryptoDisclaimer />
    </div>
  );
}
