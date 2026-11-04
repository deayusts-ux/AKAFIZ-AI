"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export interface MiniBar {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export function MiniCandleChart({
  bars,
  highlight,
  height = 190,
  showVolume = false,
  className,
  ariaLabel = "Ilustrasi candlestick",
}: {
  bars: MiniBar[];
  highlight?: number;
  height?: number;
  showVolume?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const uid = useId().replace(/:/g, "");
  if (bars.length === 0) return null;

  const width = 640;
  const top = 14;
  const priceBottom = showVolume ? 178 : 218;
  const volumeTop = 188;
  const volumeBottom = 224;
  const plotWidth = width - 12;
  const min = Math.min(...bars.map((bar) => bar.low));
  const max = Math.max(...bars.map((bar) => bar.high));
  const pad = Math.max((max - min) * 0.08, 0.001);
  const low = min - pad;
  const high = max + pad;
  const maxVolume = Math.max(...bars.map((bar) => bar.volume ?? 0), 1);
  const slot = plotWidth / bars.length;
  const bodyWidth = Math.max(5, Math.min(slot * 0.58, 34));

  const y = (price: number) => top + ((high - price) / (high - low)) * (priceBottom - top);

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} 232`}
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
        className="w-full"
        style={{ height }}
      >
        <defs>
          <linearGradient id={`${uid}-glow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.2, 0.5, 0.8].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2={plotWidth}
            y1={top + (priceBottom - top) * ratio}
            y2={top + (priceBottom - top) * ratio}
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {highlight !== undefined && highlight >= 0 && highlight < bars.length ? (
          <g>
            <rect
              x={highlight * slot + 1}
              y={top - 4}
              width={slot - 2}
              height={priceBottom - top + 8}
              rx="4"
              fill={`url(#${uid}-glow)`}
              stroke="rgb(129 140 248 / 0.25)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={highlight * slot + slot / 2}
              cy={top + 2}
              r="2.5"
              fill="#a5b4fc"
            />
          </g>
        ) : null}

        {bars.map((bar, index) => {
          const center = index * slot + slot / 2;
          const bullish = bar.close >= bar.open;
          const color = bullish ? "#34d399" : "#fb7185";
          const openY = y(bar.open);
          const closeY = y(bar.close);
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.max(Math.abs(closeY - openY), 1.4);
          return (
            <g key={`${index}-${bar.open}-${bar.close}`}>
              <line
                x1={center}
                x2={center}
                y1={y(bar.high)}
                y2={y(bar.low)}
                stroke={color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={center - bodyWidth / 2}
                y={bodyTop}
                width={bodyWidth}
                height={bodyHeight}
                fill={bullish ? "rgb(52 211 153 / 0.88)" : "rgb(251 113 133 / 0.88)"}
                stroke={color}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                rx={bodyWidth > 8 ? 1.5 : 0}
              />
              {showVolume ? (
                <rect
                  x={center - bodyWidth / 2}
                  y={volumeBottom - ((bar.volume ?? maxVolume * 0.25) / maxVolume) * (volumeBottom - volumeTop)}
                  width={bodyWidth}
                  height={Math.max(((bar.volume ?? maxVolume * 0.25) / maxVolume) * (volumeBottom - volumeTop), 2)}
                  fill={bullish ? "rgb(52 211 153 / 0.28)" : "rgb(251 113 133 / 0.28)"}
                />
              ) : null}
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
    </div>
  );
}
