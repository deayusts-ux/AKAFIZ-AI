"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Heart, Search, Sparkles, Trash2, X } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { ToolCard } from "@/components/tool-card";
import { useFavorites } from "@/components/providers/favorites-provider";
import { useToast } from "@/components/providers/toast-provider";
import { getCategory } from "@/data/categories";
import { featuredTools, tools } from "@/data/tools";

export function FavoritesClient() {
  const { favorites, ready, clearFavorites } = useFavorites();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [confirming, setConfirming] = useState(false);

  const savedTools = useMemo(() => {
    const map = new Map(tools.map((tool) => [tool.slug, tool]));
    return favorites
      .map((slug) => map.get(slug))
      .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  }, [favorites]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return savedTools;
    return savedTools.filter((tool) => {
      const category = getCategory(tool.category);
      return [tool.name, tool.tagline, tool.company, category?.name ?? "", ...tool.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [savedTools, query]);

  const suggestions = useMemo(
    () => featuredTools.filter((tool) => !favorites.includes(tool.slug)).slice(0, 3),
    [favorites],
  );

  if (!ready) {
    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[19rem] animate-pulse rounded-2xl border border-line/[0.06] bg-cell/40"
          />
        ))}
      </div>
    );
  }

  if (savedTools.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={<Heart className="h-7 w-7" aria-hidden="true" />}
          title="Koleksi favoritmu masih kosong"
          description="Tekan ikon hati pada tool mana pun untuk menyimpannya di sini. Favorit tersimpan di browser ini, tanpa perlu akun."
          action={
            <>
              <Link href="/explore" className="btn-primary h-11 px-5 text-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Jelajahi tool AI
              </Link>
              <Link href="/trending" className="btn-ghost h-11 px-5 text-sm">
                Lihat yang sedang trending
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </>
          }
        />
        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-ink">Mulai dari rekomendasi editor</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredTools.slice(0, 3).map((tool) => {
              const category = getCategory(tool.category);
              if (!category) return null;
              return <ToolCard key={tool.slug} tool={tool} category={category} />;
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="card-surface flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line/[0.08] bg-canvas/45 px-3 focus-within:border-iris/45">
          <Search className="h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
          <label htmlFor="favorites-search" className="sr-only">
            Cari di favorit
          </label>
          <input
            id="favorites-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari di favoritmu…"
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="rounded-md p-1 text-muted hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Hapus semua {savedTools.length} favorit?</span>
            <button
              type="button"
              onClick={() => {
                clearFavorites();
                setConfirming(false);
                toast("Favorit dibersihkan", "Kamu bisa menyimpan tool baru kapan saja.");
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rose-400/30 bg-rose-500/15 px-3 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/25"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Ya, hapus
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="h-9 rounded-lg border border-line/10 px-3 text-xs font-semibold text-muted transition-colors hover:text-ink"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-line/10 px-3 text-xs font-semibold text-muted transition-colors hover:border-rose-400/30 hover:text-rose-300"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Hapus semua
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        <span className="font-semibold text-ink">{filtered.length}</span> dari {savedTools.length} tool
        tersimpan
        {query.trim() ? (
          <span>
            {" "}
            untuk <span className="font-medium text-ink">“{query.trim()}”</span>
          </span>
        ) : null}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-5"
          icon={<Search className="h-7 w-7" aria-hidden="true" />}
          title="Tidak ada favorit yang cocok"
          description={`Tidak ada tool tersimpan yang cocok dengan “${query.trim()}”. Coba kata kunci lain.`}
          action={
            <button type="button" onClick={() => setQuery("")} className="btn-ghost h-10 px-4 text-xs">
              Hapus pencarian
            </button>
          }
        />
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tool) => {
            const category = getCategory(tool.category);
            if (!category) return null;
            return <ToolCard key={tool.slug} tool={tool} category={category} />;
          })}
        </div>
      )}

      {suggestions.length > 0 ? (
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-label mb-2">
                <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
                Rekomendasi
              </p>
              <h2 className="font-display text-lg font-bold text-ink">Tambahkan dari pilihan editor</h2>
            </div>
            <Link
              href="/explore"
              className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-ink sm:inline-flex"
            >
              Lihat semua
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {suggestions.map((tool) => {
              const category = getCategory(tool.category);
              if (!category) return null;
              return <ToolCard key={tool.slug} tool={tool} category={category} />;
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
