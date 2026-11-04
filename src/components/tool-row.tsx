import Link from "next/link";
import { ArrowUpRight, ChevronRight, Star } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { PricingBadge } from "@/components/pricing-badge";
import { ToolLogo } from "@/components/tool-logo";
import type { Category, Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ToolRow({
  tool,
  category,
  rank,
  className,
}: {
  tool: Tool;
  category: Category;
  rank: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-line/[0.08] hover:bg-line/[0.035] sm:gap-4 sm:px-4",
        className,
      )}
    >
      <span
        className="w-6 shrink-0 text-center font-display text-sm font-bold tabular-nums text-muted/60 transition-colors group-hover:text-ink sm:w-8"
        aria-label={`Peringkat ${rank}`}
      >
        {String(rank).padStart(2, "0")}
      </span>

      <ToolLogo slug={tool.slug} name={tool.name} accent={category.accent} size="sm" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-sm font-bold tracking-[-0.01em] text-ink sm:text-[15px]">
            <Link href={`/tools/${tool.slug}`} className="link-underline outline-offset-4">
              {tool.name}
            </Link>
          </h3>
          {tool.isNew ? (
            <span className="hidden rounded-full border border-aqua/25 bg-aqua/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-aqua sm:inline">
              Baru
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 truncate text-xs text-muted">{tool.tagline}</p>
      </div>

      <Link
        href={`/categories/${category.slug}`}
        className="hidden w-32 shrink-0 truncate text-right text-[11px] font-medium text-muted transition-colors hover:text-ink lg:block"
      >
        {category.shortName}
      </Link>

      <span className="hidden w-12 shrink-0 items-center justify-end gap-1 text-[11px] font-semibold text-muted sm:inline-flex">
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
        {tool.rating.toFixed(1)}
      </span>

      <div className="hidden w-[86px] shrink-0 justify-end sm:flex">
        <PricingBadge tier={tool.pricing} />
      </div>

      <FavoriteButton slug={tool.slug} name={tool.name} className="hidden sm:flex" />

      <a
        href={tool.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kunjungi situs resmi ${tool.name}`}
        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-all hover:bg-line/[0.07] hover:text-ink sm:flex"
      >
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>

      <Link
        href={`/tools/${tool.slug}`}
        aria-label={`Lihat profil ${tool.name}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-all hover:bg-line/[0.07] hover:text-ink"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
