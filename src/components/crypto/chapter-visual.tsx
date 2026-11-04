import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  BarChart3,
  Calculator,
  CircleDollarSign,
  RefreshCw,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { ConceptChart } from "@/components/crypto/concept-chart";
import { MiniCandleChart } from "@/components/crypto/mini-candle-chart";
import { getPattern } from "@/data/crypto/patterns";
import type { ChapterVisual } from "@/data/crypto/types";
import { aggregateCandles, generateCandles, patternCandles, timeframeSeries } from "@/lib/crypto/market";

const supportCandles = generateCandles({
  count: 46,
  seed: 77,
  startPrice: 105,
  volatility: 0.013,
  drift: 0.0001,
  stepMinutes: 240,
});

const trendCandles = generateCandles({
  count: 50,
  seed: 31,
  startPrice: 100,
  volatility: 0.011,
  drift: 0.0032,
  stepMinutes: 240,
});

const volumeCandles = generateCandles({
  count: 44,
  seed: 12,
  startPrice: 100,
  volatility: 0.014,
  drift: 0.002,
  stepMinutes: 240,
});

const hourly = timeframeSeries("H1", 96, 44);
const daily = aggregateCandles(hourly, 24);

function CandleAnatomy() {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Anatomi candle: open, high, low, close, body, dan wick"
      className="h-auto w-full"
    >
      <line x1="40" y1="70" x2="600" y2="70" stroke="rgb(255 255 255 / 0.07)" strokeDasharray="4 5" />
      <line x1="40" y1="118" x2="600" y2="118" stroke="rgb(255 255 255 / 0.07)" strokeDasharray="4 5" />
      <line x1="40" y1="198" x2="600" y2="198" stroke="rgb(255 255 255 / 0.07)" strokeDasharray="4 5" />
      <line x1="40" y1="246" x2="600" y2="246" stroke="rgb(255 255 255 / 0.07)" strokeDasharray="4 5" />

      <line x1="250" y1="38" x2="250" y2="72" stroke="#34d399" strokeWidth="3" />
      <rect x="228" y="72" width="44" height="126" rx="3" fill="rgb(52 211 153 / 0.24)" stroke="#34d399" strokeWidth="2" />
      <line x1="250" y1="198" x2="250" y2="264" stroke="#34d399" strokeWidth="3" />

      <line x1="272" y1="70" x2="380" y2="70" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
      <text x="390" y="74" fill="#e5e7eb" fontSize="12" fontWeight="600">High</text>
      <text x="430" y="74" fill="#94a3b8" fontSize="10">harga tertinggi</text>

      <line x1="272" y1="118" x2="380" y2="118" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
      <text x="390" y="122" fill="#e5e7eb" fontSize="12" fontWeight="600">Close</text>
      <text x="438" y="122" fill="#94a3b8" fontSize="10">harga penutupan</text>

      <line x1="272" y1="198" x2="380" y2="198" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
      <text x="390" y="202" fill="#e5e7eb" fontSize="12" fontWeight="600">Open</text>
      <text x="438" y="202" fill="#94a3b8" fontSize="10">harga pembukaan</text>

      <line x1="272" y1="246" x2="380" y2="246" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
      <text x="390" y="250" fill="#e5e7eb" fontSize="12" fontWeight="600">Low</text>
      <text x="430" y="250" fill="#94a3b8" fontSize="10">harga terendah</text>

      <line x1="176" y1="72" x2="176" y2="198" stroke="#a5b4fc" strokeWidth="1.5" />
      <line x1="170" y1="72" x2="182" y2="72" stroke="#a5b4fc" strokeWidth="1.5" />
      <line x1="170" y1="198" x2="182" y2="198" stroke="#a5b4fc" strokeWidth="1.5" />
      <text x="164" y="140" textAnchor="end" fill="#c7d2fe" fontSize="11" fontWeight="600">Body</text>

      <line x1="300" y1="40" x2="300" y2="70" stroke="#a5b4fc" strokeWidth="1.5" />
      <text x="308" y="56" fill="#c7d2fe" fontSize="10">upper wick</text>
      <line x1="300" y1="200" x2="300" y2="262" stroke="#a5b4fc" strokeWidth="1.5" />
      <text x="308" y="238" fill="#c7d2fe" fontSize="10">lower wick</text>

      <text x="40" y="24" fill="#94a3b8" fontSize="11" fontWeight="700" letterSpacing="1">CANDLE BULLISH</text>
      <text x="40" y="288" fill="#64748b" fontSize="10">Close di atas open = pembeli menutup periode lebih tinggi.</text>
    </svg>
  );
}

function TimeframeFigure() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">D1 · 1 hari / candle</p>
        <MiniCandleChart bars={daily} highlight={daily.length - 1} height={150} ariaLabel="Ilustrasi candle harian" />
        <p className="mt-1 text-[10px] text-muted">{daily.length} candle harian dari data simulasi.</p>
      </div>
      <div className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">H1 · 1 jam / candle</p>
        <MiniCandleChart bars={hourly} highlight={hourly.length - 1} height={150} ariaLabel="Ilustrasi candle per jam" />
        <p className="mt-1 text-[10px] text-muted">Periode yang sama dipecah menjadi candle yang lebih kecil.</p>
      </div>
    </div>
  );
}

function RiskFigure() {
  const drawdowns = [
    { drop: "10%", recover: "+11%" },
    { drop: "25%", recover: "+33%" },
    { drop: "50%", recover: "+100%" },
  ];
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-line/[0.02] p-3 text-xs">
          <Wallet className="h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
          <span className="text-muted">Modal</span>
          <span className="ml-auto font-semibold text-ink">$1.000</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-line/[0.02] p-3 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          <span className="text-muted">Risiko 1%</span>
          <span className="ml-auto font-semibold text-ink">$10</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-line/[0.02] p-3 text-xs">
          <Calculator className="h-4 w-4 shrink-0 text-iris" aria-hidden="true" />
          <span className="text-muted">Jarak stop</span>
          <span className="ml-auto font-semibold text-ink">$1.500</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-line/[0.02] p-3 text-xs">
          <BadgePercent className="h-4 w-4 shrink-0 text-plasma" aria-hidden="true" />
          <span className="text-muted">Ukuran posisi</span>
          <span className="ml-auto font-semibold text-ink">0,0067 BTC</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {drawdowns.map((item) => (
          <div key={item.drop} className="rounded-lg border border-line/10 bg-rose-500/[0.04] p-2 text-center">
            <p className="text-[10px] text-muted">Drawdown</p>
            <p className="text-sm font-bold text-rose-300">{item.drop}</p>
            <p className="mt-1 text-[10px] text-muted">Butuh naik</p>
            <p className="text-xs font-semibold text-emerald-300">{item.recover}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] leading-relaxed text-muted">
        Ilustrasi perhitungan, bukan rekomendasi ukuran posisi atau jaminan hasil.
      </p>
    </div>
  );
}

const macroSteps = [
  { icon: BarChart3, title: "Data inflasi & tenaga kerja", body: "CPI, PPI, NFP" },
  { icon: Banknote, title: "Ekspektasi kebijakan", body: "FOMC dan Fed" },
  { icon: CircleDollarSign, title: "Dolar & imbal hasil", body: "DXY, obligasi" },
  { icon: TrendingUp, title: "Aset berisiko", body: "Crypto, saham" },
];

function MacroFigure() {
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {macroSteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.title} className="relative rounded-xl border border-line/10 bg-line/[0.02] p-3">
            <Icon className="h-4 w-4 text-aqua" aria-hidden="true" />
            <p className="mt-2 text-[11px] font-semibold leading-snug text-ink">{step.title}</p>
            <p className="mt-0.5 text-[10px] text-muted">{step.body}</p>
            {index < macroSteps.length - 1 ? (
              <ArrowRight
                className="absolute -right-2.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted/50 sm:block"
                aria-hidden="true"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

const tokenSlices = [
  { label: "Komunitas", value: 40, color: "#6366f1" },
  { label: "Treasury", value: 20, color: "#22d3ee" },
  { label: "Tim", value: 15, color: "#a855f7" },
  { label: "Investor awal", value: 15, color: "#f59e0b" },
  { label: "Likuiditas", value: 10, color: "#34d399" },
];

function TokenomicsFigure() {
  let cursor = 0;
  const gradient = tokenSlices
    .map((slice) => {
      const start = cursor;
      cursor += slice.value;
      return `${slice.color} ${start}% ${cursor}%`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-36 w-36 shrink-0">
        <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${gradient})` }} />
        <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-canvas">
          <span className="text-[10px] text-muted">Supply</span>
          <span className="text-sm font-bold text-ink">100%</span>
        </div>
      </div>
      <ul className="grid flex-1 gap-1.5 text-[11px]">
        {tokenSlices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slice.color }} aria-hidden="true" />
            <span className="text-muted">{slice.label}</span>
            <span className="ml-auto font-semibold text-ink">{slice.value}%</span>
          </li>
        ))}
        <li className="pt-1 text-[10px] text-muted">Ilustrasi distribusi, bukan data proyek nyata.</li>
      </ul>
    </div>
  );
}

const cycle = [
  { icon: RefreshCw, title: "Akumulasi", body: "Harga sideways, volume tenang.", tone: "text-aqua" },
  { icon: TrendingUp, title: "Markup", body: "HH dan HL, partisipasi naik.", tone: "text-emerald-400" },
  { icon: Users, title: "Distribusi", body: "Harga melambat di puncak.", tone: "text-amber-400" },
  { icon: TrendingDown, title: "Markdown", body: "LH dan LL, tekanan jual.", tone: "text-rose-400" },
];

function MarketStructureFigure() {
  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {cycle.map((phase) => {
        const Icon = phase.icon;
        return (
          <div key={phase.title} className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
            <Icon className={`h-4 w-4 ${phase.tone}`} aria-hidden="true" />
            <p className="mt-2 text-[11px] font-semibold text-ink">{phase.title}</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{phase.body}</p>
          </div>
        );
      })}
    </div>
  );
}

function PatternFigure({ patternId, caption }: { patternId?: string; caption: string }) {
  const pattern = patternId ? getPattern(patternId) : undefined;
  if (!pattern) return null;
  const bars = patternCandles(pattern.bars);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold text-ink">{pattern.name}</p>
          <p className="text-[10px] text-muted">{pattern.english}</p>
        </div>
        <span
          className={
            pattern.bias === "Bullish"
              ? "rounded-full bg-emerald-500/12 px-2.5 py-1 text-[10px] font-bold text-emerald-300"
              : pattern.bias === "Bearish"
                ? "rounded-full bg-rose-500/12 px-2.5 py-1 text-[10px] font-bold text-rose-300"
                : "rounded-full bg-amber-500/12 px-2.5 py-1 text-[10px] font-bold text-amber-300"
          }
        >
          {pattern.bias}
        </span>
      </div>
      <MiniCandleChart
        bars={bars}
        highlight={bars.length - 1}
        height={170}
        ariaLabel={`Ilustrasi pola ${pattern.name}`}
      />
      <p className="mt-2 text-[11px] leading-relaxed text-muted">{caption}</p>
    </div>
  );
}

export function ChapterVisualFigure({ visual }: { visual: ChapterVisual }) {
  let content: ReactNode = null;

  switch (visual.kind) {
    case "candle-anatomy":
      content = <CandleAnatomy />;
      break;
    case "candle-pattern":
      content = <PatternFigure patternId={visual.patternId} caption={visual.caption} />;
      break;
    case "support-resistance":
      content = (
        <ConceptChart
          candles={supportCandles}
          zones={[
            { from: 0.2, to: 0.33, label: "Support", tone: "support" },
            { from: 0.68, to: 0.8, label: "Resistance", tone: "resistance" },
          ]}
          annotations={[
            { index: 10, label: "Rejection", tone: "bear" },
            { index: 34, label: "Retest", tone: "bull" },
          ]}
          height={220}
          ariaLabel="Ilustrasi zona support dan resistance"
        />
      );
      break;
    case "trend":
      content = (
        <ConceptChart
          candles={trendCandles}
          trendline={{ indices: [3, 9, 16, 24, 33, 41, 47], tone: "bull" }}
          annotations={[
            { index: 16, label: "HH", tone: "bull" },
            { index: 24, label: "HL", tone: "bull" },
            { index: 41, label: "HH", tone: "bull" },
          ]}
          height={220}
          ariaLabel="Ilustrasi struktur tren higher high dan higher low"
        />
      );
      break;
    case "volume":
      content = (
        <ConceptChart
          candles={volumeCandles}
          showVolume
          annotations={[
            { index: 26, label: "Volume naik", tone: "bull" },
            { index: 37, label: "Volume turun", tone: "neutral" },
          ]}
          height={230}
          ariaLabel="Ilustrasi volume pada chart"
        />
      );
      break;
    case "timeframe":
      content = <TimeframeFigure />;
      break;
    case "risk":
      content = <RiskFigure />;
      break;
    case "macro":
      content = <MacroFigure />;
      break;
    case "tokenomics":
      content = <TokenomicsFigure />;
      break;
    case "market-structure":
      content = <MarketStructureFigure />;
      break;
    default:
      content = null;
  }

  if (!content) return null;

  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-line/10 bg-canvas/45 p-4 sm:p-5">
      {content}
      {visual.kind !== "candle-pattern" ? (
        <figcaption className="mt-3 border-t border-line/[0.07] pt-3 text-[11px] leading-relaxed text-muted">
          {visual.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
