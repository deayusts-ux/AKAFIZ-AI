"use client";

import { useId } from "react";
import { candleStats, formatPrice, type Candle } from "@/lib/crypto/market";
import { cn } from "@/lib/utils";

export interface ZoneMark {
  from: number;
  to: number;
  label: string;
  tone: "support" | "resistance";
}

export interface Annotation {
  index: number;
  label: string;
  tone?: "bull" | "bear" | "neutral";
}

export function ConceptChart({
  candles,
  height = 230,
  zones = [],
  annotations = [],
  trendline,
  showVolume = false,
  className,
  ariaLabel = "Ilustrasi chart edukasi",
}: {
  candles: Candle[];
  height?: number;
  zones?: ZoneMark[];
  annotations?: Annotation[];
  trendline?: { indices: number[]; tone?: "bull" | "bear" };
  showVolume?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const uid = useId().replace(/:/g, "");
  if (candles.length === 0) return null;

  const width = 640;
  const top = 22;
  const priceBottom = showVolume ? 186 : 238;
  const volumeTop = 198;
  const volumeBottom = 232;
  const plotWidth = width - 4;

  const min = Math.min(...candles.map((candle) => candle.low));
  const max = Math.max(...candles.map((candle) => candle.high));
  const pad = Math.max((max - min) * 0.07, 0.001);
  const low = min - pad;
  const high = max + pad;
  const maxVolume = Math.max(...candles.map((candle) => candle.volume), 1);
  const slot = plotWidth / candles.length;
  const bodyWidth = Math.max(3, Math.min(slot * 0.55, 14));
  const y = (price: number) => top + ((high - price) / (high - low)) * (priceBottom - top);
  const x = (index: number) => index * slot + slot / 2;

  const trendPoints = trendline
    ? trendline.indices
        .filter((index) => index >= 0 && index < candles.length)
        .map((index) => `${x(index)},${y(candles[index].close)}`)
        .join(" ")
    : "";

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} 240`}
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
        className="w-full"
        style={{ height }}
      >
        <defs>
          <linearGradient id={`${uid}-support`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id={`${uid}-resistance`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0.15, 0.4, 0.65, 0.9].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2={plotWidth}
            y1={top + (priceBottom - top) * ratio}
            y2={top + (priceBottom - top) * ratio}
            stroke="rgb(255 255 255 / 0.055)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {zones.map((zone) => {
          const yTop = y(low + (high - low) * zone.to);
          const yBottom = y(low + (high - low) * zone.from);
          return (
            <g key={zone.label}>
              <rect
                x="0"
                y={yTop}
                width={plotWidth}
                height={Math.max(yBottom - yTop, 2)}
                fill={`url(#${uid}-${zone.tone})`}
                stroke={zone.tone === "support" ? "rgb(52 211 153 / 0.28)" : "rgb(251 113 133 / 0.28)"}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="4 4"
              />
              <text
                x="6"
                y={yTop + 11}
                fill={zone.tone === "support" ? "#6ee7b7" : "#fda4af"}
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                {zone.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {candles.map((candle, index) => {
          const stats = candleStats(candle);
          const center = x(index);
          const color = stats.bullish ? "#34d399" : "#fb7185";
          const openY = y(candle.open);
          const closeY = y(candle.close);
          return (
            <g key={`${candle.time}-${index}`}>
              <line
                x1={center}
                x2={center}
                y1={y(candle.high)}
                y2={y(candle.low)}
                stroke={color}
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={center - bodyWidth / 2}
                y={Math.min(openY, closeY)}
                width={bodyWidth}
                height={Math.max(Math.abs(closeY - openY), 1.2)}
                fill={stats.bullish ? "rgb(52 211 153 / 0.82)" : "rgb(251 113 133 / 0.82)"}
                stroke={color}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              {showVolume ? (
                <rect
                  x={center - bodyWidth / 2}
                  y={volumeBottom - (candle.volume / maxVolume) * (volumeBottom - volumeTop)}
                  width={bodyWidth}
                  height={Math.max((candle.volume / maxVolume) * (volumeBottom - volumeTop), 1)}
                  fill={stats.bullish ? "rgb(52 211 153 / 0.28)" : "rgb(251 113 133 / 0.28)"}
                />
              ) : null}
            </g>
          );
        })}

        {trendline && trendPoints ? (
          <polyline
            points={trendPoints}
            fill="none"
            stroke={trendline.tone === "bear" ? "#fb7185" : "#a5b4fc"}
            strokeWidth="2"
            strokeDasharray="6 5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        ) : null}

        {annotations.map((annotation) => {
          const candle = candles[annotation.index];
          if (!candle) return null;
          const tone =
            annotation.tone === "bear" ? "#fda4af" : annotation.tone === "neutral" ? "#fcd34d" : "#6ee7b7";
          const towardTop = annotation.index % 2 === 0;
          return (
            <g key={`${annotation.index}-${annotation.label}`}>
              <line
                x1={x(annotation.index)}
                x2={x(annotation.index)}
                y1={towardTop ? y(candle.high) - 4 : y(candle.low) + 4}
                y2={towardTop ? y(candle.high) - 12 : y(candle.low) + 12}
                stroke={tone}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={Math.min(Math.max(x(annotation.index), 26), plotWidth - 26)}
                y={towardTop ? y(candle.high) - 16 : y(candle.low) + 22}
                textAnchor="middle"
                fill={tone}
                fontSize="9"
                fontWeight="700"
              >
                {annotation.label}
              </text>
            </g>
          );
        })}

        {showVolume ? (
          <line
            x1="0"
            x2={plotWidth}
            y1={volumeBottom}
            y2={volumeBottom}
            stroke="rgb(255 255 255 / 0.08)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
      </svg>

      {zones.length > 0 ? (
        <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-muted">
          {zones.map((zone) => (
            <span key={zone.label} className="inline-flex items-center gap-1.5">
              <span
                className={cn(
                  "h-1.5 w-4 rounded-full",
                  zone.tone === "support" ? "bg-emerald-400/60" : "bg-rose-400/60",
                )}
                aria-hidden="true"
              />
              {zone.label} · {formatPrice(low + (high - low) * zone.from)} -{" "}
              {formatPrice(low + (high - low) * zone.to)}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
