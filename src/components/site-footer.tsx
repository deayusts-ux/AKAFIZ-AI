import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { categories } from "@/data/categories";
import { stats } from "@/data/tools";

const directoryLinks = [
  { href: "/explore", label: "Explore semua tool" },
  { href: "/categories", label: "20 kategori AI" },
  { href: "/trending", label: "Trending minggu ini" },
  { href: "/favorites", label: "Koleksi favoritmu" },
  { href: "/tentang-saya", label: "Tentang saya" },
  { href: "/about", label: "Tentang & metodologi" },
];

export function SiteFooter() {
  const popular = categories.filter((category) => category.popular).slice(0, 5);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line/[0.07] pb-28 pt-14 lg:pb-10">
      <div
        className="ambient-orb -bottom-56 left-1/3 h-[26rem] w-[26rem] bg-iris/15"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Direktori AI terkurasi untuk kreator, developer, dan tim bisnis. Semua tautan
              mengarah langsung ke situs resmi — tanpa perantara, tanpa link palsu.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/explore" className="btn-primary h-10 px-4 text-xs">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Mulai jelajahi
              </Link>
              <Link href="/about" className="btn-ghost h-10 px-4 text-xs">
                Cara kami mengurasi
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Direktori
            </h3>
            <ul className="mt-4 space-y-2.5">
              {directoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Kategori populer
            </h3>
            <ul className="mt-4 space-y-2.5">
              {popular.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="link-underline text-sm text-muted transition-colors hover:text-ink"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Status direktori
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li className="flex items-center justify-between gap-2">
                <span>Tool terkurasi</span>
                <span className="font-semibold text-ink">{stats.tools}</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Kategori</span>
                <span className="font-semibold text-ink">{stats.categories}</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Gratis / freemium</span>
                <span className="font-semibold text-ink">{stats.free}</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Tautan resmi</span>
                <span className="font-semibold text-emerald-400">{stats.officialLinks}</span>
              </li>
            </ul>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
            >
              Dibangun dengan Next.js
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © 2026 LEGACY AI. Harga dan fitur dapat berubah — selalu verifikasi di situs resmi
            masing-masing tool.
          </p>
          <ScrollTopButton />
        </div>
      </div>
    </footer>
  );
}
