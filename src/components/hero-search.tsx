import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const quickSearches = ["ChatGPT", "Cursor", "Midjourney", "n8n", "Gamma"];

export function HeroSearch({ className }: { className?: string }) {
  const popular = categories.filter((category) => category.popular).slice(0, 6);

  return (
    <div className={cn("w-full", className)}>
      <form
        action="/explore"
        method="get"
        role="search"
        className="group relative flex items-center gap-2 rounded-2xl border border-line/10 bg-cell/70 p-1.5 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 focus-within:border-iris/45 focus-within:shadow-glow-sm"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center text-aqua">
          <Search className="h-5 w-5" aria-hidden="true" />
        </span>
        <label htmlFor="hero-search" className="sr-only">
          Cari tool AI
        </label>
        <input
          id="hero-search"
          name="q"
          type="search"
          autoComplete="off"
          placeholder="Cari AI, tool, atau fungsi…"
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
        />
        <button type="submit" className="btn-primary h-11 shrink-0 px-4 sm:px-6">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Temukan AI</span>
          <span className="sm:hidden">Cari</span>
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-muted/70">Populer:</span>
        {quickSearches.map((term) => (
          <Link
            key={term}
            href={`/explore?q=${encodeURIComponent(term)}`}
            className="rounded-full border border-line/[0.08] bg-line/[0.03] px-2.5 py-1 text-[11px] font-medium text-muted transition-colors hover:border-line/20 hover:text-ink"
          >
            {term}
          </Link>
        ))}
        <span className="hidden h-3 w-px bg-line/15 sm:block" aria-hidden="true" />
        {popular.slice(0, 3).map((category) => (
          <Link
            key={category.slug}
            href={`/explore?category=${category.slug}`}
            className="hidden rounded-full px-2 py-1 text-[11px] font-medium text-muted/70 transition-colors hover:text-ink sm:inline"
          >
            {category.shortName}
          </Link>
        ))}
      </div>
    </div>
  );
}
