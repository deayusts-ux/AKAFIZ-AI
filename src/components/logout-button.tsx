"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

export function LogoutButton({
  variant = "icon",
  className,
}: {
  variant?: "icon" | "menu";
  className?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    if (pending) return;
    setPending(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      toast("Sesi diakhiri", "Kamu perlu memasukkan kode akses lagi untuk masuk.");
      router.replace("/login");
      router.refresh();
    }
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={pending}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] text-sm font-semibold text-rose-300 transition-colors hover:bg-rose-500/[0.12] disabled:opacity-60",
          className,
        )}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogOut className="h-4 w-4" aria-hidden="true" />
        )}
        {pending ? "Mengakhiri sesi…" : "Keluar dari portal"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      aria-label="Keluar dari portal"
      title="Keluar dari portal"
      className={cn("icon-btn", className)}
    >
      {pending ? (
        <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden="true" />
      ) : (
        <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
