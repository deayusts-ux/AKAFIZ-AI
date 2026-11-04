import Link from "next/link";
import { ArrowUpRight, Check, Crown, Star } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { PricingBadge } from "@/components/pricing-badge";
import { ToolLogo } from "@/components/tool-logo";
import type { Category, Tool } from "@/lib/types";
import { accentStyle, cn, contrastInk } from "@/lib/utils";

const rankLabel: Record<number, string> = {
  1: "Pilihan Editor",
  2: "Runner-up",
  3: "Favorit Kreator",
};

export function SpotlightCard({
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
  const ink = contrastInk(category.accent);

  return (
    <article
      className={cn("spotlight-card group relative flex flex-col overflow-hidden rounded-3xl p-6", className)}
      style={accentStyle(category.accent)}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: category.accent }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ backgroundColor: `${category.accent}1f`, color: category.accent }}
        >
          <Crown className="h-3 w-3" aria-hidden="true" />
          Top #{rank} · {rankLabel[rank] ?? "Rekomendasi"}
        </span>
        <FavoriteButton slug={tool.slug} name={tool.name} />
      </div>

      <div className="relative mt-5 flex items-center gap-3.5">
        <ToolLogo slug={tool.slug} name={tool.name} accent={category.accent} size="lg" />
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl font-bold tracking-[-0.025em] text-ink">
            <Link href={`/tools/${tool.slug}`} className="link-underline outline-offset-4">
              {tool.name}
            </Link>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="truncate">{tool.company}</span>
            <span className="h-1 w-1 rounded-full bg-line/25" aria-hidden="true" />
            <span className="inline-flex items-center gap-1 font-semibold text-ink/80">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {tool.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <p className="relative mt-4 line-clamp-2 text-[13px] leading-relaxed text-muted">{tool.tagline}</p>

      <ul className="relative mt-4 space-y-2">
        {tool.features.slice(0, 2).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-ink/75">
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${category.accent}1f`, color: category.accent }}
            >
              <Check className="h-2.5 w-2.5" aria-hidden="true" />
            </span>
            <span className="line-clamp-1">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-5">
        <div className="flex items-center justify-between gap-2">
          <PricingBadge tier={tool.pricing} />
          <Link
            href={`/categories/${category.slug}`}
            className="truncate text-[11px] font-medium text-muted transition-colors hover:text-ink"
          >
            {category.name}
          </Link>
        </div>
        <div className="mt-3 flex gap-2">
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-all duration-300 hover:brightness-110"
            style={{
              color: ink,
              backgroundImage: `linear-gradient(115deg, ${category.accent}, ${category.accentAlt})`,
              boxShadow: `0 14px 30px -16px ${category.accent}`,
            }}
          >
            Kunjungi Website
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-line/10 bg-line/[0.04] px-4 text-xs font-semibold text-ink transition-colors hover:bg-line/[0.08]"
          >
            Profil
          </Link>
        </div>
      </div>
    </article>
  );
}
