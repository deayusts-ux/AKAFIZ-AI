"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Eye,
  GraduationCap,
  Info,
  Layers,
  Swords,
  Target,
  TriangleAlert,
} from "lucide-react";
import { CandleChart } from "@/components/crypto/candle-chart";
import { MiniCandleChart } from "@/components/crypto/mini-candle-chart";
import { candlePatterns, getPattern } from "@/data/crypto/patterns";
import {
  TIMEFRAMES,
  candleStats,
  describeCandle,
  formatCompact,
  formatPrice,
  patternCandles,
  timeframeSeries,
  type Timeframe,
} from "@/lib/crypto/market";
import { cn } from "@/lib/utils";

const presetIds = ["doji", "hammer", "bullish-engulfing", "shooting-star"];

export function CandleLab() {
  const [timeframe, setTimeframe] = useState<Timeframe>("H1");
  const [learningMode, setLearningMode] = useState(true);
  const [selected, setSelected] = useState(0);
  const [patternId, setPatternId] = useState("doji");

  const candles = useMemo(() => timeframeSeries(timeframe, 260, 911), [timeframe]);
  const pattern = getPattern(patternId) ?? candlePatterns[0];
  const patternBars = useMemo(() => patternCandles(pattern.bars), [pattern]);

  useEffect(() => {
    setSelected(candles.length - 1);
  }, [candles]);

  const candle = candles[Math.min(selected, candles.length - 1)];
  const stats = candle ? candleStats(candle) : null;
  const change = candle ? ((candle.close - candle.open) / candle.open) * 100 : 0;
  const presets = candlePatterns.filter((item) => presetIds.includes(item.id));

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/12 text-amber-300">
              <span className="text-xs font-bold">₿</span>
            </span>
            <div>
              <p className="text-xs font-bold text-ink">BTC / USDT</p>
              <p className="text-[10px] text-muted">Simulasi · {timeframe} · {candles.length} candle</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {TIMEFRAMES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTimeframe(item.id)}
                aria-pressed={timeframe === item.id}
                title={item.hint}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                  timeframe === item.id
                    ? "bg-iris text-white shadow-glow-sm"
                    : "border border-line/10 bg-line/[0.03] text-muted hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <CandleChart
              candles={candles}
              timeframe={timeframe}
              resetKey={timeframe}
              height={330}
              selectedIndex={selected}
              onSelect={setSelected}
              learningMode={learningMode}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-muted">
              <span className="rounded-full border border-line/10 bg-line/[0.03] px-2 py-1">
                Hover untuk OHLC
              </span>
              <span className="rounded-full border border-line/10 bg-line/[0.03] px-2 py-1">
                Klik candle untuk detail
              </span>
              <span className="rounded-full border border-line/10 bg-line/[0.03] px-2 py-1">
                Geser untuk pan
              </span>
              <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-2 py-1 text-amber-200/90">
                Data simulasi, bukan harga real-time
              </span>
            </div>
          </div>

          <aside className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Candle terpilih</p>
              <span className="text-[10px] text-muted">#{Math.min(selected + 1, candles.length)}</span>
            </div>
            {candle && stats ? (
              <>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-lg font-bold text-ink">{formatPrice(candle.close)}</p>
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                      stats.bullish ? "bg-emerald-500/12 text-emerald-300" : "bg-rose-500/12 text-rose-300",
                    )}
                  >
                    {stats.bullish ? "Bullish" : "Bearish"} {change >= 0 ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                  {[
                    ["Open", candle.open],
                    ["High", candle.high],
                    ["Low", candle.low],
                    ["Close", candle.close],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-2 border-b border-line/[0.06] pb-1">
                      <dt className="text-muted">{label}</dt>
                      <dd className="font-medium tabular-nums text-ink">{formatPrice(Number(value))}</dd>
                    </div>
                  ))}
                  <div className="col-span-2 flex items-center justify-between gap-2">
                    <dt className="text-muted">Volume</dt>
                    <dd className="font-medium tabular-nums text-ink">{formatCompact(candle.volume)}</dd>
                  </div>
                </dl>
                <div className="mt-3 space-y-1.5">
                  <Meter label="Body" value={stats.bodyRatio} />
                  <Meter label="Upper wick" value={stats.upperWick / Math.max(stats.range, 0.0001)} tone="rose" />
                  <Meter label="Lower wick" value={stats.lowerWick / Math.max(stats.range, 0.0001)} tone="emerald" />
                </div>
                <p className="mt-3 rounded-lg border border-line/10 bg-canvas/40 p-2 text-[11px] leading-relaxed text-muted">
                  {describeCandle(candle)}
                </p>
                {learningMode ? (
                  <p className="mt-2 text-[10px] leading-relaxed text-muted/80">
                    {stats.bullish
                      ? "Close di atas open. Pembeli menutup periode lebih tinggi, tetapi tetap periksa konteks tren dan volume."
                      : "Close di bawah open. Penjual menutup periode lebih rendah. Wick panjang bisa menunjukkan penolakan di area tertentu."}
                  </p>
                ) : null}
              </>
            ) : null}
          </aside>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/[0.07] pt-3">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <GraduationCap className="h-4 w-4 text-aqua" aria-hidden="true" />
            Mode belajar
            <span className="text-[10px] text-muted/70">menampilkan penjelasan tambahan</span>
          </div>
          <button
            type="button"
            onClick={() => setLearningMode((value) => !value)}
            aria-pressed={learningMode}
            className={cn(
              "relative h-6 w-11 rounded-full border transition-colors",
              learningMode ? "border-aqua/40 bg-aqua/25" : "border-line/15 bg-line/[0.06]",
            )}
          >
            <span className="sr-only">Aktifkan mode belajar</span>
            <span
              className={cn(
                "absolute top-0.5 rounded-full bg-ink transition-transform",
                learningMode ? "translate-x-[22px]" : "translate-x-0.5",
              )}
              style={{ height: 18, width: 18 }}
            />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-label">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Pustaka pola
            </p>
            <h2 className="mt-1 font-display text-lg font-bold text-ink">Pelajari pola satu per satu</h2>
          </div>
          <Link
            href="/crypto/ebook/pola-candlestick"
            className="inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.03] px-3.5 py-2 text-[11px] font-semibold text-muted transition-colors hover:text-ink"
          >
            Bab lengkap
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPatternId(item.id)}
              aria-pressed={patternId === item.id}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors",
                patternId === item.id
                  ? "bg-iris text-white"
                  : "border border-line/10 bg-line/[0.03] text-muted hover:text-ink",
              )}
            >
              {item.name}
            </button>
          ))}
          <span className="rounded-full border border-dashed border-line/15 px-3 py-1.5 text-[10px] text-muted">
            +7 pola lain di bab 5
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-ink">{pattern.name}</p>
                <p className="text-[10px] text-muted">{pattern.english}</p>
              </div>
              <span
                className={
                  pattern.bias === "Bullish"
                    ? "rounded-full bg-emerald-500/12 px-2 py-1 text-[10px] font-bold text-emerald-300"
                    : pattern.bias === "Bearish"
                      ? "rounded-full bg-rose-500/12 px-2 py-1 text-[10px] font-bold text-rose-300"
                      : "rounded-full bg-amber-500/12 px-2 py-1 text-[10px] font-bold text-amber-300"
                }
              >
                {pattern.bias}
              </span>
            </div>
            <MiniCandleChart
              bars={patternBars}
              highlight={patternBars.length - 1}
              height={190}
              ariaLabel={`Ilustrasi pola ${pattern.name}`}
            />
            <p className="mt-2 text-[11px] leading-relaxed text-muted">{pattern.summary}</p>
          </div>

          <div className="space-y-2.5">
            <PatternField icon={Eye} title="Bentuk" body={pattern.shape} />
            <PatternField icon={Brain} title="Psikologi pasar" body={pattern.psychology} />
            <PatternField icon={Swords} title="Pertarungan beli vs jual" body={pattern.battle} />
            <PatternField icon={Target} title="Contoh konteks" body={pattern.context} />
            <PatternField icon={TriangleAlert} title="Batas dan sinyal palsu" body={pattern.limitation} tone="warning" />
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-line/10 bg-line/[0.02] p-3 text-[10px] leading-relaxed text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden="true" />
          <p>
            Semua harga dan pola di Lab ini adalah data simulasi untuk latihan membaca chart. Tidak ada sinyal
            trading, tidak ada jaminan hasil, dan bukan nasihat investasi.
          </p>
        </div>
      </div>
    </div>
  );
}

function Meter({
  label,
  value,
  tone = "iris",
}: {
  label: string;
  value: number;
  tone?: "iris" | "rose" | "emerald";
}) {
  const width = Math.min(Math.max(value * 100, 0), 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] text-muted">
        <span>{label}</span>
        <span>{Math.round(width)}%</span>
      </div>
      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-line/[0.08]">
        <div
          className={cn(
            "h-full rounded-full",
            tone === "rose" ? "bg-rose-400" : tone === "emerald" ? "bg-emerald-400" : "bg-iris",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function PatternField({
  icon: Icon,
  title,
  body,
  tone,
}: {
  icon: typeof Eye;
  title: string;
  body: string;
  tone?: "warning";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        tone === "warning" ? "border-amber-400/15 bg-amber-400/[0.04]" : "border-line/10 bg-line/[0.02]",
      )}
    >
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
        <Icon className={cn("h-3.5 w-3.5", tone === "warning" ? "text-amber-300" : "text-aqua")} aria-hidden="true" />
        {title}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}
