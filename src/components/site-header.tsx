"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Heart, Menu, Search, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { CommandTrigger } from "@/components/command-trigger";
import { LogoutButton } from "@/components/logout-button";
import { useFavorites } from "@/components/providers/favorites-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/explore", label: "Explore AI" },
  { href: "/explore-idea", label: "Explore Idea" },
  { href: "/crypto", label: "Crypto Academy" },
  { href: "/ai-humanizer", label: "AI Humanizer" },
  { href: "/categories", label: "Kategori" },
  { href: "/trending", label: "Trending" },
  { href: "/tentang-saya", label: "Tentang Saya" },
];

const mobileNavLinks = [
  ...navLinks.slice(0, 7),
  { href: "/favorites", label: "Favorit" },
  ...navLinks.slice(7),
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/explore") return pathname === "/explore" || pathname.startsWith("/tools");
  if (href === "/explore-idea") return pathname.startsWith("/explore-idea");
  if (href === "/categories") return pathname.startsWith("/categories");
  if (href === "/crypto") return pathname === "/crypto" || pathname.startsWith("/crypto/");
  if (href === "/ai-humanizer") return pathname === "/ai-humanizer" || pathname.startsWith("/ai-humanizer/");
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, ready } = useFavorites();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header sticky top-0 z-50 border-b border-line/[0.06] bg-canvas/75 backdrop-blur-2xl">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Brand />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(pathname, link.href)}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <CommandTrigger className="hidden h-9 items-center gap-2 rounded-full border border-line/10 bg-line/[0.035] pl-3 pr-2 text-xs text-muted transition-all duration-300 hover:border-line/20 hover:bg-line/[0.07] hover:text-ink sm:inline-flex">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden whitespace-nowrap 2xl:inline">Cari AI…</span>
            <kbd className="ml-2 hidden rounded-md border border-line/10 bg-canvas/60 px-1.5 py-0.5 font-sans text-[9px] font-semibold text-muted 2xl:inline">
              ⌘K
            </kbd>
          </CommandTrigger>

          <CommandTrigger className="icon-btn sm:hidden">
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </CommandTrigger>

          <ThemeToggle />

          <Link
            href="/favorites"
            aria-label={`Favorit${ready && count > 0 ? ` (${count} tool)` : ""}`}
            className="icon-btn relative hidden sm:inline-flex"
          >
            <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
            {ready && count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>

          <Link href="/explore" className="btn-primary ml-1 hidden h-9 px-4 text-xs md:inline-flex">
            Jelajahi AI
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <LogoutButton className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="icon-btn xl:hidden"
          >
            {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

        {menuOpen ? (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 border-b border-line/10 bg-canvas shadow-[0_30px_60px_-30px_rgba(0,0,0,0.65)] xl:hidden"
          >
            <nav aria-label="Navigasi mobile" className="container-page grid grid-cols-2 gap-2 py-5">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                    isActive(pathname, link.href)
                      ? "border-iris/30 bg-iris/10 text-ink"
                      : "border-line/[0.08] bg-line/[0.02] text-muted hover:text-ink",
                  )}
                >
                  {link.label}
                  {link.href === "/favorites" && ready && count > 0 ? (
                    <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                      {count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>
            <div className="container-page pb-5">
              <Link
                href="/explore"
                onClick={() => setMenuOpen(false)}
                className="btn-primary h-11 w-full text-sm"
              >
                Jelajahi seluruh tool
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <LogoutButton variant="menu" className="mt-2" />
            </div>
          </div>
        ) : null}
      </header>

      {menuOpen ? (
        <button
          type="button"
          aria-label="Tutup menu"
          className="fixed inset-0 top-16 z-[45] cursor-default bg-canvas/70 backdrop-blur-sm xl:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </>
  );
}
