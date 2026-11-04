"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/providers/favorites-provider";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  slug: string;
  name: string;
  variant?: "icon" | "pill" | "full";
  className?: string;
  showLabel?: boolean;
}

export function FavoriteButton({
  slug,
  name,
  variant = "icon",
  className,
  showLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, ready } = useFavorites();
  const { toast } = useToast();
  const [pop, setPop] = useState(false);
  const active = ready && isFavorite(slug);

  function handleClick() {
    if (!ready) return;
    const added = toggleFavorite(slug);
    setPop(true);
    window.setTimeout(() => setPop(false), 460);
    if (added) {
      toast(`${name} disimpan`, "Buka halaman Favorit untuk melihat koleksimu.", "favorite");
    } else {
      toast(`${name} dihapus`, "Tool ini tidak lagi ada di favoritmu.");
    }
  }

  const label = active ? `Hapus ${name} dari favorit` : `Tambahkan ${name} ke favorit`;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={label}
        className={cn(
          "btn h-12 w-full gap-2 border px-5 transition-all",
          active
            ? "border-rose-400/30 bg-rose-500/12 text-rose-300 hover:bg-rose-500/18"
            : "border-line/12 bg-line/[0.04] text-ink hover:border-line/25 hover:bg-line/[0.08]",
          className,
        )}
      >
        <Heart
          className={cn("h-[18px] w-[18px] transition-transform", active && "fill-current", pop && "animate-heart-pop")}
          aria-hidden="true"
        />
        <span>{active ? "Tersimpan di Favorit" : "Simpan ke Favorit"}</span>
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={label}
        className={cn(
          "chip gap-2 px-3",
          active
            ? "border-rose-400/30 bg-rose-500/12 text-rose-300 hover:border-rose-400/40 hover:text-rose-300"
            : "hover:text-ink",
          className,
        )}
      >
        <Heart
          className={cn("h-4 w-4", active && "fill-current", pop && "animate-heart-pop")}
          aria-hidden="true"
        />
        {showLabel ? <span>{active ? "Tersimpan" : "Simpan"}</span> : null}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 active:scale-90",
        active
          ? "border-rose-400/40 bg-rose-500/15 text-rose-400"
          : "border-line/10 bg-canvas/50 text-muted hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4", active && "fill-current", pop && "animate-heart-pop")}
        aria-hidden="true"
      />
    </button>
  );
}
