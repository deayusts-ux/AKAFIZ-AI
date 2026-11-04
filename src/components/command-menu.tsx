"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Command,
  Compass,
  CornerDownLeft,
  Flame,
  GraduationCap,
  Heart,
  Info,
  LayoutGrid,
  Search,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { ToolLogo } from "@/components/tool-logo";
import { getCategory } from "@/data/categories";
import { tools, trendingTools } from "@/data/tools";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/explore", label: "Explore semua AI", description: "Cari & filter 150 tool", icon: Compass },
  { href: "/crypto", label: "Crypto Academy", description: "E-book, Candle Lab & kuis", icon: GraduationCap },
  { href: "/categories", label: "Semua kategori", description: "20 kategori terkurasi", icon: LayoutGrid },
  { href: "/trending", label: "Trending", description: "Tool paling populer minggu ini", icon: Flame },
  { href: "/favorites", label: "Favorit", description: "Koleksi pribadimu", icon: Heart },
  { href: "/tentang-saya", label: "Tentang saya", description: "Profil & cerita kreator", icon: UserRound },
  { href: "/about", label: "Tentang LEGACY AI", description: "Metodologi & kurasi", icon: Info },
];

type Entry =
  | { kind: "link"; href: string; label: string; description: string; icon: LucideIcon }
  | { kind: "tool"; tool: Tool };

function matches(tool: Tool, query: string): boolean {
  const category = getCategory(tool.category);
  const haystack = [
    tool.name,
    tool.tagline,
    tool.company,
    tool.bestFor,
    tool.description,
    category?.name ?? "",
    category?.shortName ?? "",
    ...tool.tags,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const openMenu = useCallback(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    restoreFocusRef.current?.focus?.();
  }, []);

  useEffect(() => {
    const onOpen = () => openMenu();
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openMenu();
        return;
      }
      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) {
          return;
        }
        event.preventDefault();
        openMenu();
      }
    };
    window.addEventListener("legacy-ai:open-command", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("legacy-ai:open-command", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return tools
      .filter((tool) => matches(tool, query.trim()))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query.trim().toLowerCase()) ? 1 : 0;
        const bStarts = b.name.toLowerCase().startsWith(query.trim().toLowerCase()) ? 1 : 0;
        if (aStarts !== bStarts) return bStarts - aStarts;
        return b.popularity - a.popularity;
      })
      .slice(0, 9);
  }, [query]);

  const entries = useMemo<Entry[]>(() => {
    if (query.trim()) return searchResults.map((tool) => ({ kind: "tool", tool }));
    return [
      ...quickLinks.map((link) => ({ kind: "link" as const, ...link })),
      ...trendingTools.slice(0, 5).map((tool) => ({ kind: "tool" as const, tool })),
    ];
  }, [query, searchResults]);

  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(entries.length - 1, 0)));
  }, [entries.length]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`command-item-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function go(entry: Entry) {
    const href = entry.kind === "link" ? entry.href : `/tools/${entry.tool.slug}`;
    setOpen(false);
    router.push(href);
  }

  function onInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % Math.max(entries.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (current - 1 + Math.max(entries.length, 1)) % Math.max(entries.length, 1));
    } else if (event.key === "Enter" && entries[active]) {
      event.preventDefault();
      go(entries[active]);
    }
  }

  if (!open) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh]">
      <button
        type="button"
        aria-label="Tutup pencarian"
        onClick={closeMenu}
        className="absolute inset-0 cursor-default bg-canvas/75 backdrop-blur-md animate-fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        className="glass-strong relative flex max-h-[78vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl animate-fade-up"
      >
        <h2 id="command-title" className="sr-only">
          Pencarian cepat LEGACY AI
        </h2>

        <div className="flex items-center gap-2.5 border-b border-line/[0.08] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-autocomplete="list"
            aria-activedescendant={entries[active] ? `command-item-${active}` : undefined}
            placeholder="Cari tool, kategori, atau fungsi…"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Tutup pencarian cepat"
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-line/[0.06] hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div id="command-list" role="listbox" className="flex-1 overflow-y-auto p-2">
          {hasQuery && entries.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-semibold text-ink">Tidak ada hasil untuk “{query.trim()}”</p>
              <p className="mt-1 text-xs text-muted">Coba kata kunci lain atau jelajahi semua kategori.</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
                }}
                className="btn-primary mt-4 h-9 px-4 text-xs"
              >
                Buka di Explore
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : null}

          {!hasQuery ? (
            <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted/70">
              Pintasan
            </p>
          ) : null}

          <div className="space-y-0.5">
            {entries.map((entry, index) => {
              if (!hasQuery && index === quickLinks.length) {
                return (
                  <p
                    key="trending-label"
                    className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted/70"
                  >
                    Trending sekarang
                  </p>
                );
              }

              const isActive = index === active;

              if (entry.kind === "link") {
                const Icon = entry.icon;
                return (
                  <button
                    key={entry.href}
                    id={`command-item-${index}`}
                    role="option"
                    aria-selected={isActive}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(entry)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      isActive ? "bg-line/[0.08]" : "hover:bg-line/[0.05]",
                    )}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/10 bg-line/[0.04] text-aqua">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-ink">{entry.label}</span>
                      <span className="block truncate text-[11px] text-muted">{entry.description}</span>
                    </span>
                    <CornerDownLeft
                      className={cn("h-3.5 w-3.5 text-muted/60", isActive ? "opacity-100" : "opacity-0")}
                      aria-hidden="true"
                    />
                  </button>
                );
              }

              const category = getCategory(entry.tool.category);
              if (!category) return null;
              return (
                <button
                  key={entry.tool.slug}
                  id={`command-item-${index}`}
                  role="option"
                  aria-selected={isActive}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(entry)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    isActive ? "bg-line/[0.08]" : "hover:bg-line/[0.05]",
                  )}
                >
                  <ToolLogo
                    slug={entry.tool.slug}
                    name={entry.tool.name}
                    accent={category.accent}
                    size="xs"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-ink">
                      {entry.tool.name}
                    </span>
                    <span className="block truncate text-[11px] text-muted">
                      {category.shortName} · {entry.tool.tagline}
                    </span>
                  </span>
                  <CornerDownLeft
                    className={cn("h-3.5 w-3.5 text-muted/60", isActive ? "opacity-100" : "opacity-0")}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-line/[0.08] px-4 py-2.5 text-[10px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Command className="h-3 w-3" aria-hidden="true" />K untuk membuka di mana saja
          </span>
          <span className="hidden items-center gap-3 sm:flex">
            <span>
              <kbd className="rounded border border-line/10 bg-line/[0.05] px-1 py-0.5">↑↓</kbd>{" "}
              navigasi
            </span>
            <span>
              <kbd className="rounded border border-line/10 bg-line/[0.05] px-1 py-0.5">↵</kbd>{" "}
              buka
            </span>
            <span>
              <kbd className="rounded border border-line/10 bg-line/[0.05] px-1 py-0.5">esc</kbd>{" "}
              tutup
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
