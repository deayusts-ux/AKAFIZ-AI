import type { Metadata } from "next";
import { Library, Search } from "lucide-react";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { GlossaryBrowser } from "@/components/crypto/glossary-browser";
import { glossaryLetters, glossaryTerms } from "@/data/crypto/glossary";

export const metadata: Metadata = {
  title: "Glosarium crypto A–Z",
  description:
    "Kamus istilah crypto dan candlestick: ATH, ATL, altcoin, blockchain, bullish, bearish, candle, liquidity, market cap, tokenomics, volatility, whale, volume, support, resistance, dan lainnya.",
  alternates: { canonical: "/crypto/glossary" },
};

export default function GlossaryPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-plasma/25 bg-plasma/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-plasma">
          <Library className="h-3.5 w-3.5" aria-hidden="true" />
          Glosarium
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Istilah crypto, dijelaskan sederhana.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {glossaryTerms.length} istilah dari {glossaryLetters.length} huruf awal. Cari dengan kata kunci,
          filter kategori, atau pilih huruf. Setiap istilah punya definisi singkat dan contoh pemakaian.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            { label: "Istilah", value: String(glossaryTerms.length) },
            { label: "Kategori", value: "6" },
            { label: "A–Z", value: `${glossaryLetters[0]}–${glossaryLetters[glossaryLetters.length - 1]}` },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-line/10 bg-canvas/45 p-3">
              <p className="text-[10px] text-muted">{item.label}</p>
              <p className="mt-0.5 text-lg font-bold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-muted">
          <Search className="h-3 w-3" aria-hidden="true" />
          Tips: cari “volume”, “resistance”, atau “inflasi” untuk melihat istilah terkait.
        </p>
      </section>

      <GlossaryBrowser />

      <CryptoDisclaimer />
    </div>
  );
}
