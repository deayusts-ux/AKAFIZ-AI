"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CircleDot, RotateCcw, Timer, Trophy, Wifi, WifiOff } from "lucide-react";
import { useCryptoProgress } from "@/components/crypto/progress-provider";
import { formatPrice } from "@/lib/crypto/market";
import { cn } from "@/lib/utils";

type Direction = "up" | "down";
type RoundResult = {
  start: number;
  end: number;
  prediction: Direction;
  win: boolean;
  draw: boolean;
  pl: number;
  simulated: boolean;
};

interface PriceMeta {
  source: string;
  simulated: boolean;
}

const START_BALANCE = 10000;
const STAKE = 100;
const ROUND_SECONDS = 5;

export function BtcGame() {
  const { recordGameStreak, gameBestStreak } = useCryptoProgress();
  const [price, setPrice] = useState<number | null>(null);
  const [meta, setMeta] = useState<PriceMeta | null>(null);
  const [balance, setBalance] = useState(START_BALANCE);
  const [streak, setStreak] = useState(0);
  const [prediction, setPrediction] = useState<Direction | null>(null);
  const [roundActive, setRoundActive] = useState(false);
  const [countdown, setCountdown] = useState(ROUND_SECONDS);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [ticks, setTicks] = useState<number[]>([]);

  const priceRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const predictionRef = useRef<Direction | null>(null);
  const activeRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPrice = useCallback(async (): Promise<{ price: number; simulated: boolean } | null> => {
    try {
      const response = await fetch("/api/crypto/price", { cache: "no-store" });
      if (!response.ok) return null;
      const data = (await response.json()) as { price?: number; source?: string; simulated?: boolean };
      if (typeof data.price !== "number" || !Number.isFinite(data.price)) return null;
      priceRef.current = data.price;
      setPrice(data.price);
      setMeta({ source: data.source ?? "Simulasi", simulated: Boolean(data.simulated) });
      setTicks((current) => [...current.slice(-39), data.price as number]);
      return { price: data.price, simulated: Boolean(data.simulated) };
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    void fetchPrice();
    const interval = setInterval(() => {
      void fetchPrice();
    }, 4000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    recordGameStreak(streak);
  }, [streak, recordGameStreak]);

  const clearTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resolve = useCallback(async () => {
    clearTimers();
    const start = startRef.current;
    const direction = predictionRef.current;
    activeRef.current = false;
    setRoundActive(false);
    setCountdown(ROUND_SECONDS);

    if (start === null || direction === null) {
      setPrediction(null);
      startRef.current = null;
      predictionRef.current = null;
      return;
    }

    const fresh = await fetchPrice();
    const end = fresh?.price ?? priceRef.current ?? start;
    const moved = end - start;
    const draw = Math.abs(moved) < 0.005;
    const win = !draw && (moved > 0 ? direction === "up" : direction === "down");
    const pl = draw ? 0 : win ? STAKE : -STAKE;

    setBalance((value) => Math.max(0, value + pl));
    setStreak((value) => (win ? value + 1 : 0));

    const roundResult: RoundResult = {
      start,
      end,
      prediction: direction,
      win,
      draw,
      pl,
      simulated: fresh?.simulated ?? meta?.simulated ?? true,
    };
    setResult(roundResult);
    setHistory((current) => [roundResult, ...current].slice(0, 6));
    setPrediction(null);
    startRef.current = null;
    predictionRef.current = null;
  }, [fetchPrice, meta?.simulated, recordGameStreak]);

  const startRound = async (direction: Direction) => {
    if (balance < STAKE) {
      setMessage("Saldo demo tidak cukup. Reset akun demo untuk melanjutkan.");
      return;
    }

    if (activeRef.current) {
      setPrediction(direction);
      predictionRef.current = direction;
      return;
    }

    setMessage(null);
    setResult(null);
    const current = priceRef.current ?? (await fetchPrice())?.price ?? null;
    if (current === null) {
      setMessage("Harga belum tersedia. Coba lagi sebentar.");
      return;
    }

    startRef.current = current;
    predictionRef.current = direction;
    activeRef.current = true;
    setPrediction(direction);
    setRoundActive(true);
    setCountdown(ROUND_SECONDS);

    const startedAt = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      setCountdown(Math.max(0, Math.ceil(ROUND_SECONDS - elapsed)));
    }, 150);
    timeoutRef.current = setTimeout(() => {
      void resolve();
    }, ROUND_SECONDS * 1000);
  };

  const resetAccount = () => {
    clearTimers();
    activeRef.current = false;
    startRef.current = null;
    predictionRef.current = null;
    setBalance(START_BALANCE);
    setStreak(0);
    setPrediction(null);
    setRoundActive(false);
    setCountdown(ROUND_SECONDS);
    setResult(null);
    setHistory([]);
    setMessage(null);
  };

  const delta = result ? result.end - result.start : 0;
  const progress = ((ROUND_SECONDS - countdown) / ROUND_SECONDS) * 100;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="section-label">
              <CircleDot className="h-3 w-3 text-amber-300" aria-hidden="true" />
              Bitcoin Demo Game
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-ink">
                {price !== null ? formatPrice(price) : "Memuat…"}
              </span>
              <span className="text-[10px] text-muted">BTC / USD</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
              {meta ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
                    meta.simulated
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-emerald-400/10 text-emerald-300",
                  )}
                >
                  {meta.simulated ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
                  {meta.simulated ? "Harga simulasi" : `Live · ${meta.source}`}
                </span>
              ) : (
                <span className="text-muted">Menghubungkan harga…</span>
              )}
              <span className="text-muted">· diperbarui tiap 4 detik</span>
            </div>
          </div>
          <div className="rounded-xl border border-line/10 bg-line/[0.02] px-3 py-2 text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted">Saldo virtual</p>
            <p className="text-sm font-bold text-ink">{formatPrice(balance)}</p>
            <p className="text-[9px] text-muted">Taruhan {formatPrice(STAKE)} / ronde</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-line/10 bg-line/[0.02] p-3">
          <Sparkline ticks={ticks} />
          <div className="mt-1 flex items-center justify-between text-[9px] text-muted">
            <span>Jejak harga terakhir</span>
            <span>{ticks.length > 1 ? `${ticks.length} sampel` : "menunggu data"}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5" aria-hidden="true" />
              {roundActive ? `Prediksi terbuka · ${countdown} detik` : "Pilih arah untuk memulai ronde"}
            </span>
            <span>{roundActive ? "5 detik" : "siap"}</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-aqua transition-[width] duration-150"
              style={{ width: `${roundActive ? progress : 0}%` }}
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => void startRound("up")}
            disabled={balance < STAKE || price === null}
            className={cn(
              "group flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-bold transition-all disabled:opacity-40",
              prediction === "up"
                ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-200"
                : "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-400/10",
            )}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            NAIK
          </button>
          <button
            type="button"
            onClick={() => void startRound("down")}
            disabled={balance < STAKE || price === null}
            className={cn(
              "group flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-bold transition-all disabled:opacity-40",
              prediction === "down"
                ? "border-rose-400/50 bg-rose-400/15 text-rose-200"
                : "border-rose-400/20 bg-rose-400/[0.06] text-rose-300 hover:border-rose-400/40 hover:bg-rose-400/10",
            )}
          >
            <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            TURUN
          </button>
        </div>

        <p className="mt-2 text-center text-[10px] text-muted">
          {roundActive
            ? "Prediksi masih bisa diubah sebelum waktu habis. Harga awal ronde tidak berubah."
            : "Tekan NAIK atau TURUN. Ronde berjalan 5 detik dengan uang virtual."}
        </p>

        {message ? (
          <p className="mt-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-[11px] text-amber-200">
            {message}
          </p>
        ) : null}

        {result ? (
          <div
            className={cn(
              "mt-3 rounded-xl border p-3",
              result.draw
                ? "border-amber-400/20 bg-amber-400/[0.05]"
                : result.win
                  ? "border-emerald-400/20 bg-emerald-400/[0.05]"
                  : "border-rose-400/20 bg-rose-400/[0.05]",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p
                className={cn(
                  "text-xs font-bold",
                  result.draw ? "text-amber-300" : result.win ? "text-emerald-300" : "text-rose-300",
                )}
              >
                {result.draw
                  ? "Harga tidak berubah · seri"
                  : result.win
                    ? "Prediksi tepat!"
                    : "Prediksi belum tepat"}
              </p>
              <p
                className={cn(
                  "text-xs font-bold tabular-nums",
                  result.pl > 0 ? "text-emerald-300" : result.pl < 0 ? "text-rose-300" : "text-muted",
                )}
              >
                {result.pl > 0 ? "+" : ""}
                {formatPrice(result.pl)}
              </p>
            </div>
            <p className="mt-1 text-[10px] text-muted">
              {formatPrice(result.start)} → {formatPrice(result.end)} ·{" "}
              <span className={delta >= 0 ? "text-emerald-300" : "text-rose-300"}>
                {delta >= 0 ? "+" : ""}
                {formatPrice(delta)}
              </span>{" "}
              · {result.prediction === "up" ? "Naik" : "Turun"}
            </p>
            {result.simulated ? (
              <p className="mt-1 text-[9px] text-amber-300/80">
                Ronde ini memakai harga simulasi karena sumber live tidak tersedia.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/[0.07] pt-2 text-[10px] text-muted">
          <span>Demo edukasi. Tidak ada uang nyata dan bukan sinyal trading.</span>
          <button
            type="button"
            onClick={resetAccount}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold text-muted transition-colors hover:text-ink"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Reset demo
          </button>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="rounded-2xl border border-line/10 bg-canvas/50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Statistik demo</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
              <p className="text-[10px] text-muted">Streak saat ini</p>
              <p className="mt-1 text-xl font-bold text-ink">{streak}</p>
            </div>
            <div className="rounded-xl border border-line/10 bg-line/[0.02] p-3">
              <p className="text-[10px] text-muted">Streak terbaik</p>
              <p className="mt-1 flex items-center gap-1 text-xl font-bold text-amber-300">
                <Trophy className="h-4 w-4" aria-hidden="true" />
                {gameBestStreak}
              </p>
            </div>
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Riwayat ronde</p>
          {history.length === 0 ? (
            <p className="mt-2 text-[11px] text-muted">Belum ada ronde. Pilih NAIK atau TURUN untuk mulai.</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {history.map((item, index) => (
                <li
                  key={`${item.start}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-lg border border-line/10 bg-line/[0.02] px-2.5 py-2 text-[10px]"
                >
                  <span className={item.win ? "text-emerald-300" : item.draw ? "text-amber-300" : "text-rose-300"}>
                    {item.draw ? "Seri" : item.win ? "Tepat" : "Meleset"} · {item.prediction === "up" ? "Naik" : "Turun"}
                  </span>
                  <span className="tabular-nums text-muted">
                    {item.end > item.start ? "↑" : item.end < item.start ? "↓" : "→"}{" "}
                    {formatPrice(Math.abs(item.end - item.start))}
                  </span>
                  <span className={cn("w-14 text-right font-semibold tabular-nums", item.pl > 0 ? "text-emerald-300" : item.pl < 0 ? "text-rose-300" : "text-muted")}>
                    {item.pl > 0 ? "+" : ""}
                    {formatPrice(item.pl)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4 text-[11px] leading-relaxed text-muted">
          <p className="font-bold text-amber-200">Cara kerja</p>
          <p className="mt-1">
            Harga diambil dari API publik bursa saat tersedia. Jika jaringan atau sumber data tidak dapat diakses,
            game memakai harga simulasi dan menampilkannya secara jelas. Tidak ada deposit, penarikan, atau uang nyata.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Sparkline({ ticks }: { ticks: number[] }) {
  if (ticks.length < 2) {
    return <div className="h-20 animate-pulse rounded-lg bg-line/[0.04]" aria-hidden="true" />;
  }
  const width = 420;
  const height = 90;
  const min = Math.min(...ticks);
  const max = Math.max(...ticks);
  const range = Math.max(max - min, 0.001);
  const points = ticks
    .map((value, index) => {
      const x = (index / (ticks.length - 1)) * width;
      const y = 8 + ((max - value) / range) * (height - 16);
      return `${x},${y}`;
    })
    .join(" ");
  const last = ticks[ticks.length - 1];
  const first = ticks[0];
  const rising = last >= first;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-20 w-full" role="img" aria-label="Jejak harga Bitcoin terbaru">
      <polyline
        points={points}
        fill="none"
        stroke={rising ? "#34d399" : "#fb7185"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width}
        cy={8 + ((max - last) / range) * (height - 16)}
        r="3"
        fill={rising ? "#34d399" : "#fb7185"}
      />
    </svg>
  );
}
