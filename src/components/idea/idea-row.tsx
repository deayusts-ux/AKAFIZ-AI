import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/monogram";
import { ideaCategoryBySlug } from "@/data/idea-categories";
import { IDEA_KIND_LABEL, type IdeaCategory, type IdeaSource } from "@/lib/idea-types";
import { cn, contrastInk } from "@/lib/utils";

export function IdeaRow({
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
    <div className={cn("flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:gap-5", className)}>
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="w-5 shrink-0 pt-3 text-right font-display text-[11px] font-bold tabular-nums text-muted/70">
          {typeof rank === "number" ? rank : ""}
        </span>
        <Monogram
          name={idea.name}
          accent={category.accent}
          accentAlt={category.accentAlt}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[15px] font-bold tracking-[-0.01em] text-ink">
              <Link href={`/explore-idea/${idea.slug}`} className="link-underline decoration-line/30">
                {idea.name}
              </Link>
            </h3>
            <span className="rounded-full border border-line/10 bg-line/[0.04] px-2 py-0.5 text-[10px] font-medium text-muted">
              {IDEA_KIND_LABEL[idea.kind]}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-muted">{idea.domain}</p>
          <p className="mt-1.5 line-clamp-1 text-[13px] text-muted">{idea.whatFor}</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 pl-8 sm:pl-0">
        {idea.categories.slice(0, 2).map((slug) => {
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
        <Link
          href={`/explore-idea/${idea.slug}`}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-line/10 bg-line/[0.035] px-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/[0.07]"
        >
          Detail
        </Link>
        <a
          href={idea.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka situs resmi ${idea.name}`}
          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg px-2.5 text-[11px] font-semibold transition-all hover:brightness-110"
          style={{
            color: contrastInk(category.accent),
            backgroundImage: `linear-gradient(115deg, ${category.accent}, ${category.accentAlt})`,
          }}
        >
          Kunjungi
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
