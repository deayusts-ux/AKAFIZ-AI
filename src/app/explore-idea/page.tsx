import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Compass, Layers, Link2, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExploreSwitch } from "@/components/explore-switch";
import { IdeaExploreClient } from "@/components/idea/idea-explore-client";
import { ideaStats } from "@/data/ideas";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Explore Idea — 58 sumber referensi dalam 14 bidang",
  description:
    "Jelajahi sumber referensi untuk arsitektur, akuntansi, informatika, hukum, kesehatan, bisnis, desain, psikologi, pertanian, teknik, pendidikan, komunikasi, matematika, dan sains. Semua tautan menuju situs resmi.",
  alternates: { canonical: "/explore-idea" },
  openGraph: {
    title: "Explore Idea — 58 sumber referensi dalam 14 bidang",
    description:
      "Direktori sumber ide dan referensi untuk belajar, riset, dan kerja kreatif. Filter berdasarkan bidang dan jenis sumber.",
    url: "/explore-idea",
  },
};

function ExploreFallback() {
  return (
    <div aria-hidden="true">
      <div className="card-surface h-[10.5rem] animate-pulse" />
      <div className="mt-6 flex items-center justify-between">
        <div className="h-4 w-48 rounded bg-line/[0.06]" />
        <div className="h-4 w-20 rounded bg-line/[0.06]" />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[19rem] animate-pulse rounded-2xl border border-line/[0.06] bg-cell/40"
          />
        ))}
      </div>
    </div>
  );
}

export default function ExploreIdeaPage() {
  return (
    <div className="container-page pb-16 pt-8">
      <Breadcrumbs items={[{ label: "Explore Idea" }]} />

      <div className="mt-6">
        <ExploreSwitch active="idea" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="section-label">
            <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
            Direktori sumber ide
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
            Explore <span className="text-gradient">Idea</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {formatNumber(ideaStats.sources)} sumber pilihan dalam {ideaStats.categories} bidang —
            dari arsitektur dan hukum sampai sains dan pertanian. Gunakan pencarian dan filter untuk
            menemukan referensi yang tepat; semua tautan menuju situs resmi.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip">
            <Layers className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            {ideaStats.categories} bidang
          </span>
          <span className="chip">
            <Compass className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
            {ideaStats.kinds} jenis sumber
          </span>
          <span className="chip">
            <Link2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
            Tautan resmi
          </span>
        </div>
      </div>

      <div className="mt-8">
        <Suspense fallback={<ExploreFallback />}>
          <IdeaExploreClient />
        </Suspense>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line/[0.08] bg-line/[0.02] p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-ink">Butuh tool, bukan sumber referensi?</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Explore AI berisi 150 tool untuk menulis, mendesain, membuat video, dan menganalisis data.
          </p>
        </div>
        <Link
          href="/explore"
          className="btn-ghost h-10 shrink-0 whitespace-nowrap px-4 text-xs"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Buka Explore AI
        </Link>
      </div>
    </div>
  );
}
