"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "legacy-ai:theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light") document.documentElement.classList.add("light");
    else document.documentElement.classList.remove("light");
    setMounted(true);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const isLight = root.classList.toggle("light");
    try {
      window.localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
    } catch {
      // Theme still applies for this session when storage is blocked.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Ganti tema terang atau gelap"
      title="Ganti tema"
      className={cn("icon-btn", className)}
      data-ready={mounted ? "true" : "false"}
    >
      <Sun className="theme-sun h-[18px] w-[18px]" aria-hidden="true" />
      <Moon className="theme-moon h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  );
}
