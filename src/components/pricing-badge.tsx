import { PRICING_LABEL, type PricingTier } from "@/lib/types";
import { cn } from "@/lib/utils";

const tone: Record<PricingTier, string> = {
  free: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  freemium: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  paid: "border-amber-400/20 bg-amber-400/10 text-amber-300",
};

const dot: Record<PricingTier, string> = {
  free: "bg-emerald-400",
  freemium: "bg-cyan-400",
  paid: "bg-amber-400",
};

export function PricingBadge({
  tier,
  className,
  showDot = true,
}: {
  tier: PricingTier;
  className?: string;
  showDot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none",
        tone[tier],
        `pricing-${tier}`,
        className,
      )}
    >
      {showDot ? (
        <span className={cn("h-1.5 w-1.5 rounded-full", dot[tier])} aria-hidden="true" />
      ) : null}
      {PRICING_LABEL[tier]}
    </span>
  );
}
