"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Heart, Info, X } from "lucide-react";

type ToastTone = "default" | "favorite";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  toast: (title: string, description?: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (title: string, description?: string, tone: ToastTone = "default") => {
      const id = Date.now() + Math.random();
      setItems((current) => [...current.slice(-2), { id, title, description, tone }]);
      const timer = setTimeout(() => dismiss(id), 3400);
      timers.current.set(id, timer);
    },
    [dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((timer) => clearTimeout(timer));
      map.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex flex-col items-center gap-2 px-4 lg:bottom-8 lg:items-end lg:pr-8"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line/10 bg-elevated/95 p-3.5 shadow-2xl backdrop-blur-xl animate-fade-up"
          >
            <span
              className={
                item.tone === "favorite"
                  ? "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400"
                  : "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-iris/15 text-aqua"
              }
            >
              {item.tone === "favorite" ? (
                <Heart className="h-4 w-4 fill-current" />
              ) : (
                <Info className="h-4 w-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              {item.description ? (
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              aria-label="Tutup notifikasi"
              className="rounded-md p-1 text-muted transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
