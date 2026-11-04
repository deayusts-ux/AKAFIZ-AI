import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryIcons } from "@/lib/icons";
import type { Category } from "@/lib/types";
import { accentStyle, cn } from "@/lib/utils";

export function CategoryCard({
  category,
  count,
  className,
  compact = false,
}: {
  category: Category;
  count: number;
  className?: string;
  compact?: boolean;
}) {
  const Icon = categoryIcons[category.icon];

  return (
    <Link
      href={`/categories/${category.slug}`}
      style={accentStyle(category.accent)}
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-line/[0.08] bg-cell/50 p-4 backdrop-blur-xl transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:bg-cell/70",
        compact ? "items-center gap-3" : "flex-col gap-4",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: category.accent }}
        aria-hidden="true"
      />

      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-xl border",
          compact ? "h-10 w-10" : "h-11 w-11",
        )}
        style={{
          backgroundColor: `${category.accent}16`,
          borderColor: `${category.accent}2e`,
          color: category.accent,
        }}
      >
        <Icon className={compact ? "h-5 w-5" : "h-[22px] w-[22px]"} aria-hidden="true" />
      </span>

      <div className="relative min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-2 font-display text-[15px] font-bold leading-snug tracking-[-0.015em] text-ink">
            {category.name}
          </h3>
          {!compact ? (
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              aria-hidden="true"
            />
          ) : null}
        </div>
        {!compact ? (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{category.tagline}</p>
        ) : null}
        <p className="mt-1.5 text-[11px] font-medium text-muted">
          <span style={{ color: category.accent }}>{count} tool</span>
          <span className="text-muted/60"> terkurasi</span>
        </p>
      </div>
    </Link>
  );
}
