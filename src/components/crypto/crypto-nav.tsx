"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChartCandlestick,
  CircleHelp,
  Gamepad2,
  GraduationCap,
  Home,
  Info,
  Library,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/crypto", label: "Beranda", icon: Home, exact: true },
  { href: "/crypto/ebook", label: "E-book", icon: BookOpen, exact: false },
  { href: "/crypto/candlestick-lab", label: "Candle Lab", icon: ChartCandlestick, exact: false },
  { href: "/crypto/simulation", label: "Simulasi", icon: Target, exact: false },
  { href: "/crypto/quiz", label: "Kuis", icon: GraduationCap, exact: false },
  { href: "/crypto/glossary", label: "Glosarium", icon: Library, exact: false },
  { href: "/crypto/progress", label: "Progres", icon: TrendingUp, exact: false },
  { href: "/crypto/game", label: "Game", icon: Gamepad2, exact: false },
  { href: "/crypto/about", label: "Tentang", icon: Info, exact: false },
];

export function CryptoNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi Crypto Academy" className="crypto-nav border-b border-line/[0.07]">
      <div className="container-page">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
          <Link
            href="/crypto"
            className="mr-1 hidden shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-iris/15 to-aqua/10 px-2.5 py-1.5 text-[10px] font-bold text-ink sm:inline-flex"
          >
            <CircleHelp className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            Crypto Academy
          </Link>
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                  active
                    ? "bg-line/[0.07] text-ink"
                    : "text-muted hover:bg-line/[0.03] hover:text-ink",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
