"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollTopButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn("chip", className)}
      aria-label="Kembali ke atas halaman"
    >
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
      Kembali ke atas
    </button>
  );
}
