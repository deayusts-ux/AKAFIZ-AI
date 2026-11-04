"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CommandTrigger({
  children,
  className,
  label = "Buka pencarian cepat",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.dispatchEvent(new CustomEvent("aifinder:open-command"))}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
