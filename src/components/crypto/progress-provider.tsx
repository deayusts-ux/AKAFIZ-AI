"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "legacy-ai:crypto-progress:v1";

export interface QuizScore {
  best: number;
  total: number;
  at: number;
}

interface CryptoProgressState {
  completed: string[];
  bookmarks: string[];
  quiz: Record<string, QuizScore>;
  simulations: string[];
  gameBestStreak: number;
}

const EMPTY_STATE: CryptoProgressState = {
  completed: [],
  bookmarks: [],
  quiz: {},
  simulations: [],
  gameBestStreak: 0,
};

interface CryptoProgressContextValue extends CryptoProgressState {
  ready: boolean;
  completedCount: number;
  isCompleted: (slug: string) => boolean;
  toggleCompleted: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (slug: string) => void;
  recordQuiz: (slug: string, score: number, total: number) => void;
  isSimulationSolved: (id: string) => boolean;
  markSimulationSolved: (id: string) => void;
  recordGameStreak: (streak: number) => void;
  resetProgress: () => void;
}

const CryptoProgressContext = createContext<CryptoProgressContextValue | null>(null);

function readStorage(): CryptoProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<CryptoProgressState> | null;
    if (!parsed || typeof parsed !== "object") return EMPTY_STATE;
    const quiz =
      parsed.quiz && typeof parsed.quiz === "object" && !Array.isArray(parsed.quiz)
        ? Object.fromEntries(
            Object.entries(parsed.quiz).filter(([, value]) => {
              if (!value || typeof value !== "object") return false;
              const entry = value as Partial<QuizScore>;
              return typeof entry.best === "number" && typeof entry.total === "number";
            }),
          )
        : {};
    return {
      completed: Array.isArray(parsed.completed)
        ? parsed.completed.filter((item): item is string => typeof item === "string")
        : [],
      bookmarks: Array.isArray(parsed.bookmarks)
        ? parsed.bookmarks.filter((item): item is string => typeof item === "string")
        : [],
      quiz: quiz as Record<string, QuizScore>,
      simulations: Array.isArray(parsed.simulations)
        ? parsed.simulations.filter((item): item is string => typeof item === "string")
        : [],
      gameBestStreak:
        typeof parsed.gameBestStreak === "number" && Number.isFinite(parsed.gameBestStreak)
          ? Math.max(0, Math.floor(parsed.gameBestStreak))
          : 0,
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function CryptoProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CryptoProgressState>(EMPTY_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // LocalStorage may be unavailable; progress remains in memory.
    }
  }, [state, ready]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setState(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleCompleted = useCallback((slug: string) => {
    setState((current) => ({
      ...current,
      completed: current.completed.includes(slug)
        ? current.completed.filter((item) => item !== slug)
        : [...current.completed, slug],
    }));
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    setState((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(slug)
        ? current.bookmarks.filter((item) => item !== slug)
        : [...current.bookmarks, slug],
    }));
  }, []);

  const recordQuiz = useCallback((slug: string, score: number, total: number) => {
    setState((current) => {
      const previous = current.quiz[slug];
      const best = previous ? Math.max(previous.best, score) : score;
      return {
        ...current,
        quiz: {
          ...current.quiz,
          [slug]: { best, total, at: Date.now() },
        },
      };
    });
  }, []);

  const markSimulationSolved = useCallback((id: string) => {
    setState((current) =>
      current.simulations.includes(id)
        ? current
        : { ...current, simulations: [...current.simulations, id] },
    );
  }, []);

  const recordGameStreak = useCallback((streak: number) => {
    setState((current) =>
      streak > current.gameBestStreak ? { ...current, gameBestStreak: streak } : current,
    );
  }, []);

  const resetProgress = useCallback(() => {
    setState(EMPTY_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const value = useMemo<CryptoProgressContextValue>(
    () => ({
      ...state,
      ready,
      completedCount: state.completed.length,
      isCompleted: (slug) => state.completed.includes(slug),
      toggleCompleted,
      isBookmarked: (slug) => state.bookmarks.includes(slug),
      toggleBookmark,
      recordQuiz,
      isSimulationSolved: (id) => state.simulations.includes(id),
      markSimulationSolved,
      recordGameStreak,
      resetProgress,
    }),
    [state, ready, toggleCompleted, toggleBookmark, recordQuiz, markSimulationSolved, recordGameStreak, resetProgress],
  );

  return (
    <CryptoProgressContext.Provider value={value}>{children}</CryptoProgressContext.Provider>
  );
}

export function useCryptoProgress(): CryptoProgressContextValue {
  const context = useContext(CryptoProgressContext);
  if (!context) {
    throw new Error("useCryptoProgress must be used inside CryptoProgressProvider");
  }
  return context;
}
