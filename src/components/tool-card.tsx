import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { PricingBadge } from "@/components/pricing-badge";
import { ToolLogo } from "@/components/tool-logo";
import { categoryIcons } from "@/lib/icons";
import type { Category, Tool } from "@/lib/types";
import { accentStyle, cn, contrastInk } from "@/lib/utils";

export function ToolCard({
  tool,
  category,
  rank,
  className,
}: {
  tool: Tool;
  category: Category;
  rank?: number;
  className?: string;
}) {
  const Icon = categoryIcons[category.icon];

  return (
    <article
      className={cn("tool-card card-surface group flex h-full flex-col p-5", className)}
      style={accentStyle(category.accent)}
    >
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-70"
        aria-hidden="true"
      />

      <div className="flex items-start gap-3">
        <ToolLogo slug={tool.slug} name={tool.name} accent={category.accent} size="md" />
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-2">
            {typeof rank === "number" ? (
              <span
                className="font-display text-[11px] font-bold tabular-nums"
                style={{ color: category.accent }}
              >
                #{rank}
              </span>
            ) : null}
            <h3 className="truncate font-display text-[17px] font-bold leading-tight tracking-[-0.02em] text-ink">
              <Link
                href={`/tools/${tool.slug}`}
                className="link-underline decoration-line/30 outline-offset-4"
              >
                {tool.name}
              </Link>
            </h3>
            {tool.isNew ? (
              <span className="rounded-full border border-aqua/25 bg-aqua/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-aqua">
                Baru
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-xs text-muted">{tool.company}</p>
        </div>
        <FavoriteButton slug={tool.slug} name={tool.name} />
      </div>

      <p className="mt-4 line-clamp-2 text-[13px] leading-relaxed text-muted">{tool.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-line/[0.08] bg-line/[0.03] px-2 py-1 text-[10px] font-medium leading-none text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex-1" />

      <div className="mt-5 border-t border-line/[0.07] pt-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/categories/${category.slug}`}
            className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-ink"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: category.accent }} aria-hidden="true" />
            <span className="truncate">{category.shortName}</span>
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            {tool.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <PricingBadge tier={tool.pricing} />
          <div className="flex items-center gap-2">
            <Link
              href={`/tools/${tool.slug}`}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-line/10 bg-line/[0.035] px-3 text-xs font-semibold text-ink transition-all duration-300 hover:border-line/20 hover:bg-line/[0.07]"
            >
              Detail
            </Link>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Kunjungi situs resmi ${tool.name}`}
              className="group/link inline-flex h-9 items-center justify-center gap-1 rounded-lg px-3 text-xs font-semibold transition-all duration-300 hover:brightness-110"
              style={{
                color: contrastInk(category.accent),
                backgroundImage: `linear-gradient(115deg, ${category.accent}, ${category.accentAlt})`,
                boxShadow: `0 10px 24px -14px ${category.accent}`,
              }}
            >
              Kunjungi
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
