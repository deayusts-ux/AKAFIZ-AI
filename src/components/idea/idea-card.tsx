import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IdeaMonogram } from "@/components/idea/idea-monogram";
import { ideaCategoryBySlug } from "@/data/idea-categories";
import { IDEA_KIND_LABEL, type IdeaCategory, type IdeaSource } from "@/lib/idea-types";
import { accentStyle, cn, contrastInk } from "@/lib/utils";

export function IdeaCard({
  idea,
  category,
  rank,
  className,
}: {
  idea: IdeaSource;
  category: IdeaCategory;
  rank?: number;
  className?: string;
}) {
  return (
    <article
      className={cn("idea-card card-surface group flex h-full flex-col p-5", className)}
      style={accentStyle(category.accent)}
    >
      <span
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-70"
        aria-hidden="true"
      />

      <div className="flex items-start gap-3">
        <IdeaMonogram name={idea.name} accent={category.accent} accentAlt={category.accentAlt} />
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="line-clamp-2 font-display text-[17px] font-bold leading-tight tracking-[-0.02em] text-ink">
            {typeof rank === "number" ? (
              <span className="mr-1.5 text-[11px] font-bold tabular-nums" style={{ color: category.accent }}>
                #{rank}
              </span>
            ) : null}
            <Link
              href={`/explore-idea/${idea.slug}`}
              className="link-underline decoration-line/30 outline-offset-4"
            >
              {idea.name}
            </Link>
          </h3>
          <p className="mt-1 flex min-w-0 items-center gap-1.5">
            <span className="truncate text-xs text-muted">{idea.domain}</span>
            {idea.featured ? (
              <span className="shrink-0 rounded-full border border-aqua/25 bg-aqua/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-aqua">
                Pilihan
              </span>
            ) : null}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-line/10 bg-line/[0.04] px-2 py-0.5 text-[10px] font-medium text-muted">
          {IDEA_KIND_LABEL[idea.kind]}
        </span>
      </div>

      <p className="mt-4 text-[13px] font-medium leading-relaxed text-ink/90">{idea.whatFor}</p>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{idea.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {idea.tags.slice(0, 3).map((tag) => (
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
        <div className="flex flex-wrap items-center gap-1.5">
          {idea.categories.map((slug) => {
            const item = ideaCategoryBySlug.get(slug);
            if (!item) return null;
            return (
              <Link
                key={slug}
                href={`/explore-idea/kategori/${item.slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-line/[0.08] bg-line/[0.03] px-2 py-1 text-[10px] font-medium text-muted transition-colors hover:text-ink"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden="true"
                />
                {item.shortName}
              </Link>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <Link
            href={`/explore-idea/${idea.slug}`}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-line/10 bg-line/[0.035] px-3 text-xs font-semibold text-ink transition-all duration-300 hover:border-line/20 hover:bg-line/[0.07]"
          >
            Detail
          </Link>
          <a
            href={idea.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka situs resmi ${idea.name}`}
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
    </article>
  );
}
