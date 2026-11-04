import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExploreSwitch } from "@/components/explore-switch";
import { ideaCategories } from "@/data/idea-categories";
import { getIdeasByCategory } from "@/data/ideas";
import { ideaIcons } from "@/lib/idea-icons";
import { accentStyle, contrastInk } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kategori Explore Idea — 14 bidang referensi",
  description:
    "Daftar 14 bidang di Explore Idea: arsitektur, akuntansi, informatika, teknik sipil, hukum, kesehatan, bisnis, desain, psikologi, pertanian, elektro, pendidikan, komunikasi, dan sains.",
  alternates: { canonical: "/explore-idea/kategori" },
};

export default function IdeaCategoriesPage() {
  return (
    <div className="container-page pb-16 pt-8">
      <Breadcrumbs items={[{ label: "Explore Idea", href: "/explore-idea" }, { label: "Kategori" }]} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <ExploreSwitch active="idea" />
        <span className="chip">
          <Layers className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
          {ideaCategories.length} bidang
        </span>
      </div>

      <div className="mt-6 max-w-2xl">
        <p className="section-label">
          <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
          Peta bidang
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
          Empat belas bidang, <span className="text-gradient">satu direktori</span>.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
          Setiap bidang berisi sumber referensi, materi belajar, alat bantu, dan database resmi.
          Pilih bidang untuk melihat daftar lengkapnya.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ideaCategories.map((category) => {
          const Icon = ideaIcons[category.icon];
          const count = getIdeasByCategory(category.slug).length;
          return (
            <Link
              key={category.slug}
              href={`/explore-idea/kategori/${category.slug}`}
              className="card-surface group flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
              style={accentStyle(category.accent)}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    color: contrastInk(category.accent),
                    backgroundImage: `linear-gradient(135deg, ${category.accent}, ${category.accentAlt})`,
                    boxShadow: `0 12px 26px -18px ${category.accent}`,
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-line/10 bg-line/[0.04] px-2 py-1 text-[10px] font-medium text-muted">
                  {count} sumber
                </span>
              </div>

              <h2 className="mt-4 font-display text-[17px] font-bold leading-tight tracking-[-0.02em] text-ink">
                {category.name}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{category.tagline}</p>

              <div className="flex-1" />

              <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold text-muted transition-colors group-hover:text-ink">
                Lihat sumber
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
