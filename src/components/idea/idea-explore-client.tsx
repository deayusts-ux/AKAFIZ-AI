"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  ChevronDown,
  LayoutGrid,
  List,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { IdeaCard } from "@/components/idea/idea-card";
import { IdeaRow } from "@/components/idea/idea-row";
import { ideaCategories, getIdeaCategory } from "@/data/idea-categories";
import { ideas } from "@/data/ideas";
import {
  IDEA_KIND_LABEL,
  type IdeaCategory,
  type IdeaKind,
  type IdeaSortKey,
  type IdeaSource,
} from "@/lib/idea-types";
import { cn, contrastInk, formatNumber } from "@/lib/utils";

const PAGE_SIZE = 24;

const sortOptions: { value: IdeaSortKey; label: string }[] = [
  { value: "relevance", label: "Paling relevan" },
  { value: "name", label: "Nama A–Z" },
  { value: "category", label: "Kategori" },
];

const kindOptions: { value: "all" | IdeaKind; label: string }[] = [
  { value: "all", label: "Semua jenis" },
  { value: "reference", label: IDEA_KIND_LABEL.reference },
  { value: "learning", label: IDEA_KIND_LABEL.learning },
  { value: "tool", label: IDEA_KIND_LABEL.tool },
  { value: "portfolio", label: IDEA_KIND_LABEL.portfolio },
  { value: "news", label: IDEA_KIND_LABEL.news },
  { value: "database", label: IDEA_KIND_LABEL.database },
];

function normalizeSort(value: string | null): IdeaSortKey {
  return sortOptions.some((option) => option.value === value) ? (value as IdeaSortKey) : "relevance";
}

function normalizeKind(value: string | null): "all" | IdeaKind {
  return kindOptions.some((option) => option.value === value)
    ? (value as "all" | IdeaKind)
    : "all";
}

function searchIdea(idea: IdeaSource, tokens: string[]): boolean {
  if (tokens.length === 0) return true;
  const categoryNames = idea.categories
    .map((slug) => {
      const category = getIdeaCategory(slug);
      return category ? `${category.name} ${category.shortName}` : "";
    })
    .join(" ");
  const haystack = [
    idea.name,
    idea.whatFor,
    idea.description,
    idea.domain,
    idea.bestFor,
    IDEA_KIND_LABEL[idea.kind],
    categoryNames,
    ...idea.tags,
    ...idea.highlights,
  ]
    .join(" ")
    .toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

export function IdeaExploreClient({ fixedCategory }: { fixedCategory?: IdeaCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [categoryFilter, setCategoryFilter] = useState(
    fixedCategory ? "" : (searchParams.get("category") ?? ""),
  );
  const [kind, setKind] = useState<"all" | IdeaKind>(normalizeKind(searchParams.get("kind")));
  const [sort, setSort] = useState<IdeaSortKey>(normalizeSort(searchParams.get("sort")));
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const activeCategory = fixedCategory?.slug || categoryFilter;

  const countByCategory = useMemo(() => {
    const map = new Map<string, number>();
    ideas.forEach((idea) => {
      idea.categories.forEach((slug) => {
        map.set(slug, (map.get(slug) ?? 0) + 1);
      });
    });
    return map;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (!fixedCategory && categoryFilter) params.set("category", categoryFilter);
      if (kind !== "all") params.set("kind", kind);
      if (sort !== "relevance") params.set("sort", sort);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 320);
    return () => window.clearTimeout(timer);
  }, [query, categoryFilter, kind, sort, fixedCategory, pathname, router]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, categoryFilter, kind, sort, fixedCategory]);

  const results = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = ideas.filter((idea) => {
      if (activeCategory && !idea.categories.includes(activeCategory)) return false;
      if (kind !== "all" && idea.kind !== kind) return false;
      return searchIdea(idea, tokens);
    });

    return filtered.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "id");
      if (sort === "category") {
        const categoryA = getIdeaCategory(a.categories[0])?.name ?? "";
        const categoryB = getIdeaCategory(b.categories[0])?.name ?? "";
        return categoryA.localeCompare(categoryB, "id") || a.name.localeCompare(b.name, "id");
      }
      const featureDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      return featureDelta || a.name.localeCompare(b.name, "id");
    });
  }, [activeCategory, kind, query, sort]);

  const shown = results.slice(0, visible);
  const hasFilters = Boolean(query.trim() || categoryFilter || kind !== "all" || sort !== "relevance");
  const activeCategoryData = activeCategory ? getIdeaCategory(activeCategory) : undefined;

  function resetFilters() {
    setQuery("");
    setCategoryFilter("");
    setKind("all");
    setSort("relevance");
  }

  return (
    <div>
      <div className="card-surface p-3 sm:p-4">
        <div className="flex items-center gap-2 rounded-xl border border-line/[0.08] bg-canvas/45 px-3 transition-colors focus-within:border-iris/45">
          <Search className="h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
          <label htmlFor="idea-search" className="sr-only">
            Cari sumber ide
          </label>
          <input
            id="idea-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari sumber, bidang, atau kata kunci…"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus kata kunci"
              className="rounded-md p-1 text-muted transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <span className="hidden items-center gap-1.5 pl-1 pr-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted sm:inline-flex">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Filter
          </span>

          {!fixedCategory ? (
            <SelectField
              label="Kategori"
              value={categoryFilter}
              onChange={setCategoryFilter}
              className="col-span-2 sm:col-auto"
              icon={<SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              <option value="">Semua kategori</option>
              {ideaCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name} ({countByCategory.get(category.slug) ?? 0})
                </option>
              ))}
            </SelectField>
          ) : null}

          <SelectField
            label="Jenis"
            value={kind}
            onChange={(value) => setKind(value as "all" | IdeaKind)}
            icon={<span className="text-[10px] font-bold">Aa</span>}
          >
            {kindOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Urutkan"
            value={sort}
            onChange={(value) => setSort(normalizeSort(value))}
            icon={<ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>
        </div>

        {!fixedCategory ? (
          <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto border-t border-line/[0.07] pt-3">
            <button
              type="button"
              onClick={() => setCategoryFilter("")}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                categoryFilter === ""
                  ? "border-ink/20 bg-ink text-canvas"
                  : "border-line/[0.08] bg-line/[0.03] text-muted hover:text-ink",
              )}
            >
              Semua
            </button>
            {ideaCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() =>
                  setCategoryFilter((current) => (current === category.slug ? "" : category.slug))
                }
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                  categoryFilter === category.slug
                    ? "border-transparent"
                    : "border-line/[0.08] bg-line/[0.03] text-muted hover:text-ink",
                )}
                style={
                  categoryFilter === category.slug
                    ? { backgroundColor: category.accent, color: contrastInk(category.accent) }
                    : undefined
                }
              >
                {category.shortName}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-ink">{formatNumber(results.length)}</span> sumber ditemukan
          {activeCategoryData ? (
            <span>
              {" "}
              di <span className="font-medium text-ink">{activeCategoryData.name}</span>
            </span>
          ) : null}
          {query.trim() ? (
            <span>
              {" "}
              untuk <span className="font-medium text-ink">“{query.trim()}”</span>
            </span>
          ) : null}
        </p>

        <div className="ml-auto flex items-center justify-end gap-3">
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Hapus semua filter
            </button>
          ) : null}
          <span className="hidden text-xs text-muted/70 sm:inline">
            {shown.length} dari {results.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              aria-label="Tampilan grid"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                view === "grid"
                  ? "border-iris/40 bg-iris/15 text-ink"
                  : "border-line/10 bg-line/[0.03] text-muted hover:text-ink",
              )}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="Tampilan daftar"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                view === "list"
                  ? "border-iris/40 bg-iris/15 text-ink"
                  : "border-line/10 bg-line/[0.03] text-muted hover:text-ink",
              )}
            >
              <List className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="card-surface mt-5 flex flex-col items-center px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line/10 bg-line/[0.04] text-muted">
            <SearchX className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-xl font-bold text-ink">Belum ada sumber yang cocok</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            Coba kata kunci yang lebih umum, longgarkan filter jenis, atau jelajahi kategori lain.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={resetFilters} className="btn-primary h-10 px-4 text-xs">
              Reset filter
            </button>
            <button
              type="button"
              onClick={() => setKind("all")}
              className="btn-ghost h-10 px-4 text-xs"
            >
              Tampilkan semua jenis
            </button>
          </div>
        </div>
      ) : view === "grid" ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((idea) => {
            const category = getIdeaCategory(idea.categories[0]);
            if (!category) return null;
            return <IdeaCard key={idea.slug} idea={idea} category={category} />;
          })}
        </div>
      ) : (
        <div className="card-surface mt-5 divide-y divide-line/[0.05] p-2 sm:p-3">
          {shown.map((idea, index) => {
            const category = getIdeaCategory(idea.categories[0]);
            if (!category) return null;
            return (
              <IdeaRow
                key={idea.slug}
                idea={idea}
                category={category}
                rank={index + 1}
                className="rounded-xl"
              />
            );
          })}
        </div>
      )}

      {shown.length < results.length ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs text-muted">
            Menampilkan {shown.length} dari {formatNumber(results.length)} sumber
          </p>
          <button
            type="button"
            onClick={() => setVisible((current) => current + PAGE_SIZE)}
            className="btn-ghost h-11 px-6"
          >
            Tampilkan {Math.min(PAGE_SIZE, results.length - shown.length)} sumber lagi
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  icon,
  children,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const id = `idea-filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={cn("relative min-w-0", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        {icon}
      </span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="filter-select w-full sm:w-auto sm:max-w-[16rem]"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
