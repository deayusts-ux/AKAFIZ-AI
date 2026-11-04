"use client";

import { useEffect, useState } from "react";
import { getLogo } from "@/data/logos";
import { cn, initials } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<LogoSize, string> = {
  xs: "h-7 w-7 rounded-lg p-1",
  sm: "h-9 w-9 rounded-lg p-1.5",
  md: "h-11 w-11 rounded-xl p-2",
  lg: "h-14 w-14 rounded-2xl p-2.5",
  xl: "h-[4.5rem] w-[4.5rem] rounded-[1.35rem] p-3.5",
};

const textMap: Record<LogoSize, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-2xl",
};

export function ToolLogo({
  slug,
  name,
  accent,
  size = "md",
  className,
}: {
  slug: string;
  name: string;
  accent: string;
  size?: LogoSize;
  className?: string;
}) {
  const logo = getLogo(slug);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [slug]);

  const showImage = Boolean(logo) && !failed;

  return (
    <span
      className={cn(
        "tool-logo-frame relative inline-flex shrink-0 items-center justify-center overflow-hidden border shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
        sizeMap[size],
        className,
      )}
      style={showImage ? undefined : { background: `${accent}22`, borderColor: `${accent}3d` }}
    >
      {showImage && logo ? (
        <img
          src={logo.src}
          alt={`Logo ${name}`}
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-contain",
            logo.invertOnLight && "logo-invert-on-light",
            logo.invertOnDark && "logo-invert-on-dark",
          )}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={cn("font-display font-bold tracking-tight", textMap[size])}
          style={{ color: accent }}
          aria-hidden="true"
        >
          {initials(name)}
        </span>
      )}
    </span>
  );
}
