export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = "M1" | "M5" | "M15" | "H1" | "H4" | "D1";

export const TIMEFRAMES: { id: Timeframe; label: string; minutes: number; hint: string }[] = [
  { id: "M1", label: "M1", minutes: 1, hint: "1 menit per candle" },
  { id: "M5", label: "M5", minutes: 5, hint: "5 menit per candle" },
  { id: "M15", label: "M15", minutes: 15, hint: "15 menit per candle" },
  { id: "H1", label: "H1", minutes: 60, hint: "1 jam per candle" },
  { id: "H4", label: "H4", minutes: 240, hint: "4 jam per candle" },
  { id: "D1", label: "D1", minutes: 1440, hint: "1 hari per candle" },
];

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface SeriesOptions {
  count?: number;
  seed?: number;
  startPrice?: number;
  volatility?: number;
  drift?: number;
  startTime?: number;
  stepMinutes?: number;
}

export function generateCandles({
  count = 240,
  seed = 2026,
  startPrice = 64000,
  volatility = 0.011,
  drift = 0.00035,
  startTime = Date.UTC(2026, 9, 1, 0, 0, 0),
  stepMinutes = 60,
}: SeriesOptions = {}): Candle[] {
  const random = mulberry32(seed);
  const candles: Candle[] = [];
  let price = startPrice;
  let time = startTime;

  for (let index = 0; index < count; index += 1) {
    const open = price;
    const shock = (random() - 0.5) * 2 * volatility;
    const close = Math.max(1, open * (1 + drift + shock));
    const bodyHigh = Math.max(open, close);
    const bodyLow = Math.min(open, close);
    const wick = Math.abs(close - open) * (0.35 + random() * 1.4) + open * 0.0016;
    const high = bodyHigh + wick * random();
    const low = bodyLow - wick * random();
    const volume = 400 + random() * 900 + Math.abs(close - open) * 18;

    candles.push({
      time,
      open: round(open),
      high: round(high),
      low: round(Math.max(1, low)),
      close: round(close),
      volume: Math.round(volume),
    });

    price = close;
    time += stepMinutes * 60 * 1000;
  }

  return candles;
}

export function timeframeSeries(timeframe: Timeframe, count = 260, seed = 911): Candle[] {
  const config = TIMEFRAMES.find((item) => item.id === timeframe) ?? TIMEFRAMES[3];
  const scale = Math.sqrt(config.minutes / 60);
  return generateCandles({
    count,
    seed: seed + config.minutes,
    startPrice: 64250,
    volatility: 0.006 * Math.max(0.55, Math.min(scale, 3.2)),
    drift: 0.0003,
    stepMinutes: config.minutes,
  });
}

export function patternCandles(
  bars: { open: number; high: number; low: number; close: number }[],
  startTime = Date.UTC(2026, 9, 1),
): Candle[] {
  return bars.map((bar, index) => ({
    time: startTime + index * 60 * 60 * 1000,
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
    volume: 700 + index * 55,
  }));
}

export function aggregateCandles(candles: Candle[], factor: number): Candle[] {
  if (factor <= 1) return candles;
  const result: Candle[] = [];
  for (let index = 0; index < candles.length; index += factor) {
    const chunk = candles.slice(index, index + factor);
    if (chunk.length === 0) continue;
    result.push({
      time: chunk[0].time,
      open: chunk[0].open,
      high: Math.max(...chunk.map((candle) => candle.high)),
      low: Math.min(...chunk.map((candle) => candle.low)),
      close: chunk[chunk.length - 1].close,
      volume: chunk.reduce((total, candle) => total + candle.volume, 0),
    });
  }
  return result;
}

export function isBullish(candle: Candle): boolean {
  return candle.close >= candle.open;
}

export function candleStats(candle: Candle) {
  const range = Math.max(candle.high - candle.low, 0.000001);
  const bodyHigh = Math.max(candle.open, candle.close);
  const bodyLow = Math.min(candle.open, candle.close);
  return {
    bullish: isBullish(candle),
    body: Math.abs(candle.close - candle.open),
    bodyRatio: Math.abs(candle.close - candle.open) / range,
    upperWick: candle.high - bodyHigh,
    lowerWick: bodyLow - candle.low,
    range,
  };
}

export function describeCandle(candle: Candle): string {
  const stats = candleStats(candle);
  const direction = stats.bullish ? "bullish" : "bearish";
  const body = stats.bodyRatio < 0.1 ? "body sangat tipis" : `body ${Math.round(stats.bodyRatio * 100)}%`;
  const wick =
    stats.upperWick > stats.lowerWick * 1.8
      ? "upper wick dominan"
      : stats.lowerWick > stats.upperWick * 1.8
        ? "lower wick dominan"
        : "wick seimbang";
  return `Candle ${direction} dengan ${body} dan ${wick}.`;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value >= 1000 ? 0 : 2,
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatChartTime(time: number, timeframe: Timeframe): string {
  const date = new Date(time);
  if (timeframe === "D1") {
    return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" }).format(date);
  }
  if (timeframe === "H4" || timeframe === "H1") {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function round(value: number): number {
  return Math.round(value * 100) / 100;
}
