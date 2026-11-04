import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.85rem] bg-gradient-to-br from-iris via-plasma to-aqua text-white shadow-glow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_45%)]" />
      <svg viewBox="0 0 40 40" fill="none" className="relative h-[66%] w-[66%]">
        <path
          d="M20 4.5 23.9 16.1 35.5 20 23.9 23.9 20 35.5 16.1 23.9 4.5 20 16.1 16.1Z"
          fill="currentColor"
        />
        <circle cx="30.5" cy="9.5" r="2.1" fill="currentColor" opacity="0.7" />
      </svg>
    </span>
  );
}

export function Brand({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="AI FINDER — beranda"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl outline-offset-4",
        className,
      )}
    >
      <BrandMark className="h-9 w-9 transition-transform duration-500 ease-expo group-hover:rotate-[-6deg] group-hover:scale-105" />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">
            AI <span className="text-gradient">FINDER</span>
          </span>
          <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-muted sm:block">
            Direktori AI Terkurasi
          </span>
        </span>
      ) : null}
    </Link>
  );
}
