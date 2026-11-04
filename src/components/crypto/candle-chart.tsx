"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  candleStats,
  describeCandle,
  formatChartTime,
  formatCompact,
  formatPrice,
  type Candle,
  type Timeframe,
} from "@/lib/crypto/market";
import { cn } from "@/lib/utils";

const VIEW_W = 1000;
const VIEW_H = 420;
const LABEL_W = 72;
const PLOT_W = VIEW_W - LABEL_W;

export interface CandleChartProps {
  candles: Candle[];
  timeframe?: Timeframe;
  height?: number;
  showVolume?: boolean;
  interactive?: boolean;
  initialVisible?: number;
  resetKey?: string;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  learningMode?: boolean;
  className?: string;
}

export function CandleChart({
  candles,
  timeframe = "H1",
  height = 320,
  showVolume = true,
  interactive = true,
  initialVisible = 90,
  resetKey,
  selectedIndex,
  onSelect,
  learningMode = false,
  className,
}: CandleChartProps) {
  const [zoom, setZoom] = useState(1);
  const [end, setEnd] = useState(candles.length);
  const [hovered, setHovered] = useState<number | null>(null);
  const [internalSelected, setInternalSelected] = useState(candles.length - 1);
  const dragRef = useRef<{ startX: number; startEnd: number; moved: boolean; width: number } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    setEnd(candles.length);
    setZoom(1);
    setHovered(null);
    setInternalSelected(candles.length - 1);
  }, [resetKey, candles.length]);

  const total = candles.length;
  const visible = Math.min(
    total,
    Math.max(12, Math.round((initialVisible / Math.max(zoom, 0.5)) || initialVisible)),
  );
  const safeEnd = Math.min(Math.max(end, visible), total);
  const start = Math.max(0, safeEnd - visible);
  const slice = useMemo(() => candles.slice(start, safeEnd), [candles, start, safeEnd]);

  const bounds = useMemo(() => {
    if (slice.length === 0) return { min: 0, max: 1, maxVolume: 1 };
    const min = Math.min(...slice.map((candle) => candle.low));
    const max = Math.max(...slice.map((candle) => candle.high));
    const maxVolume = Math.max(...slice.map((candle) => candle.volume), 1);
    const pad = Math.max((max - min) * 0.08, max * 0.0015);
    return { min: min - pad, max: max + pad, maxVolume };
  }, [slice]);

  const plotTop = 18;
  const plotBottom = showVolume ? 318 : 390;
  const plotHeight = plotBottom - plotTop;
  const slot = PLOT_W / Math.max(slice.length, 1);
  const bodyWidth = Math.max(1.5, Math.min(slot * 0.62, 18));

  const y = useCallback(
    (price: number) => plotTop + ((bounds.max - price) / Math.max(bounds.max - bounds.min, 0.000001)) * plotHeight,
    [bounds, plotTop, plotHeight],
  );

  const selected =
    selectedIndex !== undefined
      ? Math.min(Math.max(selectedIndex, 0), Math.max(total - 1, 0))
      : internalSelected;
  const inspected = hovered !== null && hovered >= 0 && hovered < total ? hovered : selected;
  const inspectedCandle = candles[inspected];

  const select = (index: number) => {
    if (!interactive) return;
    setInternalSelected(index);
    onSelect?.(index);
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!interactive || total <= visible) return;
    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = { startX: event.clientX, startEnd: safeEnd, moved: false, width: rect.width };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    if (!drag.moved) return;
    const shift = Math.round((delta / Math.max(drag.width, 1)) * visible);
    const nextEnd = Math.min(Math.max(drag.startEnd - shift, visible), total);
    setEnd(nextEnd);
  };

  const handlePointerUp = () => {
    if (dragRef.current?.moved) {
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 60);
    }
    dragRef.current = null;
  };

  const priceTicks = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const ratio = index / 4;
      return {
        value: bounds.max - (bounds.max - bounds.min) * ratio,
        top: ((plotTop + plotHeight * ratio) / VIEW_H) * 100,
      };
    });
  }, [bounds, plotTop, plotHeight]);

  const timeTicks = useMemo(() => {
    if (slice.length === 0) return [];
    return Array.from({ length: 4 }, (_, index) => {
      const position = Math.round((index / 3) * (slice.length - 1));
      return {
        label: formatChartTime(slice[position].time, timeframe),
        left: ((position + 0.5) / slice.length) * 100,
      };
    });
  }, [slice, timeframe]);

  const hoveredPosition =
    hovered !== null && hovered >= start && hovered < safeEnd
      ? ((hovered - start + 0.5) / Math.max(slice.length, 1)) * 100
      : null;

  const canZoomOut = zoom > 0.5;
  const canZoomIn = visible > 14;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-3 text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-emerald-400" aria-hidden="true" />
            Bullish
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-rose-400" aria-hidden="true" />
            Bearish
          </span>
          <span className="hidden sm:inline">Simulasi edukasi</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(8, Number((value * 1.5).toFixed(2))))}
            disabled={!canZoomIn || !interactive}
            aria-label="Perbesar chart"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-line/10 bg-line/[0.04] text-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(0.5, Number((value / 1.5).toFixed(2))))}
            disabled={!canZoomOut || !interactive}
            aria-label="Perkecil chart"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-line/10 bg-line/[0.04] text-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setEnd(candles.length);
              setHovered(null);
            }}
            disabled={!interactive}
            aria-label="Reset tampilan chart"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-line/10 bg-line/[0.04] text-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Chart candlestick simulasi edukasi"
          className={cn(
            "w-full touch-pan-y select-none rounded-xl border border-line/[0.08] bg-canvas/50",
            interactive && total > visible ? "cursor-grab active:cursor-grabbing" : "",
          )}
          style={{ height }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={() => {
            setHovered(null);
            handlePointerUp();
          }}
        >
          <title>Chart candlestick dengan data simulasi</title>
          <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="transparent" />

          {priceTicks.map((tick, index) => (
            <line
              key={`grid-${index}`}
              x1="0"
              x2={PLOT_W}
              y1={(tick.top / 100) * VIEW_H}
              y2={(tick.top / 100) * VIEW_H}
              stroke="rgb(255 255 255 / 0.055)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {timeTicks.map((tick, index) => (
            <line
              key={`vgrid-${index}`}
              x1={(tick.left / 100) * PLOT_W}
              x2={(tick.left / 100) * PLOT_W}
              y1={plotTop}
              y2={plotBottom}
              stroke="rgb(255 255 255 / 0.04)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {slice.map((candle, index) => {
            const center = (index + 0.5) * slot;
            const stats = candleStats(candle);
            const color = stats.bullish ? "#34d399" : "#fb7185";
            const openY = y(candle.open);
            const closeY = y(candle.close);
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(Math.abs(closeY - openY), 1.2);
            const isHovered = hovered === start + index;
            const isSelected = inspected === start + index;
            return (
              <g key={`candle-${candle.time}-${index}`}>
                {isSelected ? (
                  <rect
                    x={center - slot / 2}
                    y={plotTop}
                    width={slot}
                    height={plotHeight}
                    fill="rgb(129 140 248 / 0.08)"
                  />
                ) : null}
                <line
                  x1={center}
                  x2={center}
                  y1={y(candle.high)}
                  y2={y(candle.low)}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1.4}
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  x={center - bodyWidth / 2}
                  y={bodyTop}
                  width={bodyWidth}
                  height={bodyHeight}
                  fill={stats.bullish ? "rgb(52 211 153 / 0.85)" : "rgb(251 113 133 / 0.85)"}
                  stroke={color}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  rx={bodyWidth > 4 ? 1 : 0}
                />
                {interactive ? (
                  <rect
                    x={center - slot / 2}
                    y={plotTop}
                    width={slot}
                    height={plotBottom - plotTop}
                    fill="transparent"
                    onPointerEnter={() => setHovered(start + index)}
                    onClick={() => {
                      if (!suppressClick.current) select(start + index);
                    }}
                  />
                ) : null}
              </g>
            );
          })}

          {showVolume
            ? slice.map((candle, index) => {
                const center = (index + 0.5) * slot;
                const barHeight = (candle.volume / bounds.maxVolume) * 54;
                return (
                  <rect
                    key={`vol-${candle.time}-${index}`}
                    x={center - bodyWidth / 2}
                    y={402 - barHeight}
                    width={bodyWidth}
                    height={Math.max(barHeight, 1)}
                    fill={candle.close >= candle.open ? "rgb(52 211 153 / 0.32)" : "rgb(251 113 133 / 0.32)"}
                  />
                );
              })
            : null}
          {showVolume ? (
            <line
              x1="0"
              x2={PLOT_W}
              y1={402}
              y2={402}
              stroke="rgb(255 255 255 / 0.06)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[68px] flex-col justify-between py-3 text-right text-[10px] font-medium text-muted">
          {priceTicks.map((tick, index) => (
            <span key={`price-${index}`} className="pr-1 tabular-nums">
              {formatPrice(tick.value)}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-[74%] w-[68px] pr-1 text-right text-[9px] text-muted/70">
          Vol
        </div>

        {hoveredPosition !== null && inspectedCandle ? (
          <div
            className="pointer-events-none absolute top-2 z-10 w-[168px] rounded-xl border border-line/15 bg-canvas/95 p-2.5 text-[10px] shadow-xl backdrop-blur-md"
            style={{
              left: `clamp(6px, calc(${hoveredPosition}% - 84px), calc(100% - 174px))`,
            }}
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="font-semibold text-ink">
                {formatChartTime(inspectedCandle.time, timeframe)}
              </span>
              <span
                className={cn(
                  "rounded px-1 py-0.5 text-[9px] font-bold",
                  inspectedCandle.close >= inspectedCandle.open
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-rose-500/15 text-rose-300",
                )}
              >
                {inspectedCandle.close >= inspectedCandle.open ? "BULL" : "BEAR"}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-muted">
              <dt>O</dt>
              <dd className="text-right tabular-nums text-ink">{formatPrice(inspectedCandle.open)}</dd>
              <dt>H</dt>
              <dd className="text-right tabular-nums text-ink">{formatPrice(inspectedCandle.high)}</dd>
              <dt>L</dt>
              <dd className="text-right tabular-nums text-ink">{formatPrice(inspectedCandle.low)}</dd>
              <dt>C</dt>
              <dd className="text-right tabular-nums text-ink">{formatPrice(inspectedCandle.close)}</dd>
              <dt>Vol</dt>
              <dd className="text-right tabular-nums text-ink">{formatCompact(inspectedCandle.volume)}</dd>
            </dl>
          </div>
        ) : null}
      </div>

      <div className="relative mt-1 h-4 text-[9px] text-muted">
        {timeTicks.map((tick, index) => (
          <span
            key={`time-${index}`}
            className="absolute -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${tick.left * 0.928}%` }}
          >
            {tick.label}
          </span>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
        <span>
          {learningMode && inspectedCandle
            ? describeCandle(inspectedCandle)
            : "Data simulasi, bukan harga pasar nyata."}
        </span>
        {interactive ? (
          <span className="inline-flex items-center gap-1.5">
            {total > visible ? "Geser untuk pan" : "Zoom untuk detail"} · Klik candle
          </span>
        ) : null}
      </div>
    </div>
  );
}
