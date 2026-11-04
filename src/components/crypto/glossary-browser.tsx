"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { glossaryLetters, glossaryTerms } from "@/data/crypto/glossary";
import type { GlossaryTerm } from "@/data/crypto/types";
import { cn } from "@/lib/utils";

const categories: Array<GlossaryTerm["category"] | "Semua"> = [
  "Semua",
  "Dasar",
  "Market",
  "Candlestick",
  "Analisis",
  "Fundamental",
  "Risiko",
];

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("Semua");
  const [category, setCategory] = useState<(typeof categories)[number]>("Semua");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return glossaryTerms
      .filter((item) => {
        if (letter !== "Semua" && item.term.charAt(0).toUpperCase() !== letter) return false;
        if (category !== "Semua" && item.category !== category) return false;
        if (!needle) return true;
        return (
          item.term.toLowerCase().includes(needle) ||
          item.definition.toLowerCase().includes(needle) ||
          item.example.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, letter, category]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line/10 bg-canvas/50 p-3.5 sm:p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari istilah, misalnya: support, volume, FDV…"
            aria-label="Cari istilah crypto"
            className="h-10 w-full rounded-xl border border-line/10 bg-line/[0.03] pl-9 pr-9 text-xs text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-iris/60"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors",
                category === item
                  ? "bg-iris text-white"
                  : "border border-line/10 bg-line/[0.03] text-muted hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setLetter("Semua")}
            aria-pressed={letter === "Semua"}
            className={cn(
              "rounded-md px-2 py-1 text-[10px] font-bold transition-colors",
              letter === "Semua" ? "bg-aqua/15 text-aqua" : "text-muted hover:text-ink",
            )}
          >
            Semua
          </button>
          {glossaryLetters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLetter(item)}
              aria-pressed={letter === item}
              className={cn(
                "rounded-md px-2 py-1 text-[10px] font-bold transition-colors",
                letter === item ? "bg-aqua/15 text-aqua" : "text-muted hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted">
        <span>{filtered.length} istilah ditemukan</span>
        <span>Definisi disederhanakan untuk pemula</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line/15 p-8 text-center">
          <p className="text-sm font-semibold text-ink">Istilah tidak ditemukan</p>
          <p className="mt-1 text-xs text-muted">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLetter("Semua");
              setCategory("Semua");
            }}
            className="btn-ghost mt-3 h-9 px-3 text-[11px]"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {filtered.map((item) => (
            <article
              key={item.term}
              className="rounded-xl border border-line/10 bg-canvas/45 p-3.5 transition-colors hover:border-line/20"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xs font-bold text-ink">{item.term}</h2>
                <span className="shrink-0 rounded-full border border-line/10 bg-line/[0.03] px-2 py-0.5 text-[9px] font-semibold text-muted">
                  {item.category}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{item.definition}</p>
              <p className="mt-2 rounded-lg border border-line/[0.07] bg-canvas/40 px-2.5 py-2 text-[10px] leading-relaxed text-muted/85">
                <span className="font-semibold text-aqua">Contoh: </span>
                {item.example}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
