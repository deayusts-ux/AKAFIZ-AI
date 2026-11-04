import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface PriceResult {
  ok: boolean;
  price: number;
  source: string;
  simulated: boolean;
  at: number;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function simulatedPrice(): number {
  const now = Date.now();
  const base = 64250;
  const slow = Math.sin(now / 60000) * 340;
  const fast = Math.sin(now / 17000) * 120;
  const micro = Math.sin(now / 3100) * 45;
  return round(base + slow + fast + micro);
}

async function fromBinance(): Promise<number | null> {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT", {
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { price?: string };
    const price = Number(data.price);
    return Number.isFinite(price) && price > 0 ? price : null;
  } catch {
    return null;
  }
}

async function fromCoinbase(): Promise<number | null> {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot", {
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { data?: { amount?: string } };
    const price = Number(data.data?.amount);
    return Number.isFinite(price) && price > 0 ? price : null;
  } catch {
    return null;
  }
}

async function fromKraken(): Promise<number | null> {
  try {
    const response = await fetch("https://api.kraken.com/0/public/Ticker?pair=XBTUSD", {
      cache: "no-store",
      signal: AbortSignal.timeout(3500),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { result?: Record<string, { c?: string[] }> };
    const entry = data.result ? Object.values(data.result)[0] : undefined;
    const price = Number(entry?.c?.[0]);
    return Number.isFinite(price) && price > 0 ? price : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const binance = await fromBinance();
  if (binance) {
    return NextResponse.json<PriceResult>(
      { ok: true, price: round(binance), source: "Binance", simulated: false, at: Date.now() },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const coinbase = await fromCoinbase();
  if (coinbase) {
    return NextResponse.json<PriceResult>(
      { ok: true, price: round(coinbase), source: "Coinbase", simulated: false, at: Date.now() },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const kraken = await fromKraken();
  if (kraken) {
    return NextResponse.json<PriceResult>(
      { ok: true, price: round(kraken), source: "Kraken", simulated: false, at: Date.now() },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json<PriceResult>(
    { ok: false, price: simulatedPrice(), source: "Simulasi", simulated: true, at: Date.now() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
