import { contrastInk } from "@/lib/utils";

const sizeClasses = {
  sm: "h-9 w-9 text-[11px]",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
} as const;

function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9 &]/g, " ").replace(/\s+/g, " ").trim();
  const words = cleaned.split(" ").filter(Boolean);
  if (words.length === 0) return "ID";
  if (words.length === 1) {
    return words[0].length <= 4 ? words[0].toUpperCase() : words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export function Monogram({
  name,
  accent,
  accentAlt,
  size = "md",
}: {
  name: string;
  accent: string;
  accentAlt: string;
  size?: keyof typeof sizeClasses;
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-xl font-display font-bold tracking-[-0.02em] shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] ${sizeClasses[size]}`}
      style={{
        color: contrastInk(accent),
        backgroundImage: `linear-gradient(135deg, ${accent}, ${accentAlt})`,
        boxShadow: `0 12px 26px -18px ${accent}`,
      }}
    >
      {monogram(name)}
    </span>
  );
}
