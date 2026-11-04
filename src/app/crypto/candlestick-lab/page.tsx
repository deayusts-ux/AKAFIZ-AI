import type { Metadata } from "next";
import { ChartCandlestick, Info, Sparkles, TriangleAlert } from "lucide-react";
import { CandleLab } from "@/components/crypto/candle-lab";
import { CryptoDisclaimer } from "@/components/crypto/crypto-disclaimer";
import { MiniCandleChart } from "@/components/crypto/mini-candle-chart";
import { SectionHeading } from "@/components/section-heading";
import { candlePatterns } from "@/data/crypto/patterns";
import { patternCandles } from "@/lib/crypto/market";

export const metadata: Metadata = {
  title: "Candlestick Lab",
  description:
    "Lab candlestick interaktif: ganti timeframe M1 sampai D1, zoom, pan, hover OHLC, pilih candle, aktifkan mode belajar, dan eksplorasi 11 pola candlestick.",
  alternates: { canonical: "/crypto/candlestick-lab" },
};

const biasStyles: Record<string, string> = {
  Bullish: "bg-emerald-500/12 text-emerald-300",
  Bearish: "bg-rose-500/12 text-rose-300",
  Netral: "bg-amber-500/12 text-amber-300",
};

const patternDetails = [
  { key: "shape", label: "Bentuk" },
  { key: "psychology", label: "Psikologi pasar" },
  { key: "battle", label: "Pertarungan beli vs jual" },
  { key: "context", label: "Konteks yang mendukung" },
  { key: "limitation", label: "Batasan dan jebakan" },
] as const;

export default function CandlestickLabPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
          <ChartCandlestick className="h-3.5 w-3.5" aria-hidden="true" />
          Candlestick Lab
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          Baca candle, bukan menebak arah.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Pilih timeframe, zoom, geser chart, dan klik candle mana pun untuk melihat open, high, low, close,
          ukuran body, serta panjang wick. Aktifkan mode belajar untuk mendapatkan penjelasan otomatis.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
          {[
            "6 timeframe",
            "Zoom & pan",
            "Hover OHLC",
            "Mode belajar",
            "4 preset pola",
            "11 pola lengkap",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-line/10 bg-line/[0.03] px-2.5 py-1 font-semibold text-muted"
            >
              <Sparkles className="h-2.5 w-2.5 text-aqua" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <CandleLab />

      <section>
        <SectionHeading
          label="Referensi pola"
          title="11 pola candlestick dan psikologinya"
          description="Setiap pola ditampilkan dengan data simulasi. Buka detail untuk melihat bentuk, psikologi, konteks, dan batasannya."
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {candlePatterns.map((pattern) => {
            const bars = patternCandles(pattern.bars);
            return (
              <article
                key={pattern.id}
                className="flex flex-col rounded-2xl border border-line/10 bg-canvas/45 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-ink">{pattern.name}</h3>
                    <p className="text-[10px] text-muted">{pattern.english}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${biasStyles[pattern.bias]}`}>
                    {pattern.bias}
                  </span>
                </div>
                <div className="mt-3">
                  <MiniCandleChart
                    bars={bars}
                    highlight={bars.length - 1}
                    height={140}
                    ariaLabel={`Ilustrasi pola ${pattern.name}`}
                  />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">{pattern.summary}</p>
                <details className="group mt-3 rounded-xl border border-line/10 bg-line/[0.02] p-3">
                  <summary className="cursor-pointer list-none text-[10px] font-bold text-muted transition-colors hover:text-ink">
                    <span className="inline-flex items-center gap-1">
                      <Info className="h-3 w-3" aria-hidden="true" />
                      Detail pola
                    </span>
                  </summary>
                  <dl className="mt-2.5 space-y-2">
                    {patternDetails.map((detail) => (
                      <div key={detail.key}>
                        <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted/70">
                          {detail.label}
                        </dt>
                        <dd className="mt-0.5 text-[11px] leading-relaxed text-muted">
                          {pattern[detail.key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </article>
            );
          })}
        </div>
      </section>

      <p className="flex items-start gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-3 text-[11px] leading-relaxed text-muted">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
        Pola candlestick bukan sinyal pasti. Konteks tren, level penting, volume, dan manajemen risiko tetap
        menentukan. Semua data di lab ini dibangkitkan untuk latihan, bukan harga pasar nyata.
      </p>

      <CryptoDisclaimer />
    </div>
  );
}
