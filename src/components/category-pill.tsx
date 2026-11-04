import Link from "next/link";
import { categoryIcons } from "@/lib/icons";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryPill({
  category,
  count,
  className,
  active = false,
}: {
  category: Category;
  count?: number;
  className?: string;
  active?: boolean;
}) {
  const Icon = categoryIcons[category.icon];

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300",
        active
          ? "border-line/25 bg-ink text-canvas"
          : "border-line/10 bg-line/[0.035] text-muted hover:border-line/20 hover:bg-line/[0.07] hover:text-ink",
        className,
      )}
    >
      <Icon
        className="h-3.5 w-3.5"
        style={{ color: active ? undefined : category.accent }}
        aria-hidden="true"
      />
      <span>{category.shortName}</span>
      {typeof count === "number" ? (
        <span className={cn("text-[10px] tabular-nums", active ? "text-canvas/70" : "text-muted/70")}>
          {count}
        </span>
      ) : null}
    </Link>
  );
}
