"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "legacy-ai:favorites:v1";

interface FavoritesContextValue {
  favorites: string[];
  count: number;
  ready: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => boolean;
  removeFavorite: (slug: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readStorage(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setFavorites(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage may be unavailable (private mode); favorites stay in memory.
    }
  }, []);

  const toggleFavorite = useCallback(
    (slug: string) => {
      const exists = favorites.includes(slug);
      const next = exists ? favorites.filter((item) => item !== slug) : [slug, ...favorites];
      persist(next);
      return !exists;
    },
    [favorites, persist],
  );

  const removeFavorite = useCallback(
    (slug: string) => {
      persist(favorites.filter((item) => item !== slug));
    },
    [favorites, persist],
  );

  const clearFavorites = useCallback(() => persist([]), [persist]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      count: favorites.length,
      ready,
      isFavorite: (slug: string) => favorites.includes(slug),
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [favorites, ready, toggleFavorite, removeFavorite, clearFavorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
