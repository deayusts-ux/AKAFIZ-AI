"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Flame, Heart, Home, Search } from "lucide-react";
import { CommandTrigger } from "@/components/command-trigger";
import { useFavorites } from "@/components/providers/favorites-provider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/trending", label: "Trending", icon: Flame },
  { href: "/favorites", label: "Favorit", icon: Heart },
];

export function MobileDock() {
  const pathname = usePathname();
  const { count, ready } = useFavorites();

  return (
    <div className="mobile-dock fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
      <nav
        aria-label="Navigasi cepat"
        className="glass-strong grid w-full max-w-[26rem] grid-cols-5 items-center gap-0.5 rounded-2xl px-1.5 py-1.5"
      >
        {items.slice(0, 2).map((item) => (
          <DockLink key={item.href} item={item} pathname={pathname} />
        ))}

        <CommandTrigger
          label="Buka pencarian AI"
          className="group flex flex-col items-center justify-center"
        >
          <span className="relative -mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-iris via-plasma to-aqua text-white shadow-glow transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            <span className="absolute inset-0 rounded-full border border-white/25" aria-hidden="true" />
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="mt-0.5 text-[9px] font-semibold text-muted">Cari</span>
        </CommandTrigger>

        {items.slice(2).map((item) => (
          <DockLink
            key={item.href}
            item={item}
            pathname={pathname}
            badge={
              item.href === "/favorites" && ready && count > 0
                ? count > 99
                  ? "99+"
                  : String(count)
                : undefined
            }
          />
        ))}
      </nav>
    </div>
  );
}

function DockLink({
  item,
  pathname,
  badge,
}: {
  item: (typeof items)[number];
  pathname: string;
  badge?: string;
}) {
  const active =
    item.href === "/"
      ? pathname === "/"
      : item.href === "/explore"
        ? pathname === "/explore" || pathname.startsWith("/tools")
        : pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors",
        active ? "text-ink" : "text-muted hover:text-ink",
      )}
    >
      <span className="relative">
        <Icon
          className={cn("h-[18px] w-[18px] transition-transform", active && "scale-105")}
          aria-hidden="true"
        />
        {badge ? (
          <span className="absolute -right-2 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[8px] font-bold text-white">
            {badge}
          </span>
        ) : null}
      </span>
      <span className={cn("text-[9px] font-semibold", active && "text-ink")}>{item.label}</span>
      {active ? (
        <span
          className="absolute -bottom-0.5 h-0.5 w-4 rounded-full bg-gradient-to-r from-plasma to-aqua"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}
