import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, ShieldCheck, Star } from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { ToolLogo } from "@/components/tool-logo";
import { getCategory } from "@/data/categories";
import { spotlightTools, stats } from "@/data/tools";
import { formatNumber } from "@/lib/utils";

const statItems = [
  { value: formatNumber(stats.tools), label: "Tool terkurasi" },
  { value: formatNumber(stats.categories), label: "Kategori" },
  { value: `${formatNumber(stats.free)}+`, label: "Gratis / freemium" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
      <div
        className="ambient-orb -left-40 -top-48 h-[34rem] w-[34rem] animate-aurora bg-iris/30"
        aria-hidden="true"
      />
      <div
        className="ambient-orb -right-32 top-10 h-[28rem] w-[28rem] animate-float-slow bg-plasma/25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-grid bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,black,transparent)] opacity-60"
        aria-hidden="true"
      />
      <div className="texture pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-aqua/20 bg-aqua/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-aqua">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua" />
            </span>
            {stats.tools} tool · {stats.categories} kategori · kurasi independen
          </span>

          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.15rem]">
            Temukan <span className="text-gradient">AI terbaik</span> untuk setiap pekerjaan.
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            Direktori AI terkurasi dengan tautan resmi, harga transparan, dan pencarian
            yang cepat. Dari chat hingga otomasi — semuanya ada di satu tempat.
          </p>

          <HeroSearch className="mt-7 max-w-xl" />

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {statItems.map((item, index) => (
              <div key={item.label} className="flex items-center gap-8">
                {index > 0 ? (
                  <span className="hidden h-8 w-px bg-line/10 sm:block" aria-hidden="true" />
                ) : null}
                <div>
                  <p className="font-display text-xl font-bold tracking-tight text-ink">{item.value}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden animate-fade-up [animation-delay:180ms] lg:block">
          <div
            className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line/[0.08] animate-spin-slow"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-iris/20 via-plasma/10 to-aqua/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[27rem]">
            <div className="glass-strong overflow-hidden rounded-[1.75rem]">
              <div className="flex items-center justify-between border-b border-line/[0.07] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-400/80" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/80" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Link resmi terverifikasi
                </span>
              </div>

              <div className="px-5 pb-3 pt-5">
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold text-ink">Spotlight minggu ini</p>
                  <Link
                    href="/trending"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-aqua transition-colors hover:text-ink"
                  >
                    Lihat tren
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-1 text-[11px] text-muted">Tiga tool paling sering direkomendasikan.</p>
              </div>

              <div className="space-y-1 px-3 pb-4">
                {spotlightTools.map((tool, index) => {
                  const category = getCategory(tool.category);
                  if (!category) return null;
                  return (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-line/[0.05]"
                    >
                      <span className="w-4 font-display text-[11px] font-bold tabular-nums text-muted/70">
                        {index + 1}
                      </span>
                      <ToolLogo
                        slug={tool.slug}
                        name={tool.name}
                        accent={category.accent}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-ink">{tool.name}</p>
                        <p className="truncate text-[11px] text-muted">{category.shortName}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                        {tool.rating.toFixed(1)}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-muted/50 transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-line/[0.07] px-5 py-3.5">
                <Link
                  href="/explore"
                  className="flex items-center justify-between text-[11px] font-semibold text-muted transition-colors hover:text-ink"
                >
                  Jelajahi seluruh direktori
                  <span className="inline-flex items-center gap-1 text-aqua">
                    {stats.tools} tool <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-elevated/90 px-3 py-2 shadow-xl backdrop-blur-xl">
                <BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-ink">Tanpa link palsu</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-line/10 bg-elevated/90 px-3 py-2 shadow-xl backdrop-blur-xl">
                <CalendarCheck className="h-4 w-4 text-aqua" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-ink">Diperbarui Nov 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
