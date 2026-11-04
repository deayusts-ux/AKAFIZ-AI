import type { Metadata } from "next";
import { Suspense } from "react";
import { Compass, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExploreClient } from "@/components/explore-client";
import { ExploreSwitch } from "@/components/explore-switch";
import { stats } from "@/data/tools";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Explore AI — Cari & filter 150 tool",
  description:
    "Jelajahi seluruh direktori LEGACY AI. Cari berdasarkan nama atau fungsi, filter kategori dan harga (gratis, freemium, berbayar), lalu urutkan sesuai kebutuhanmu.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore AI — Cari & filter 150 tool",
    description:
      "Cari tool AI berdasarkan nama, fungsi, kategori, dan harga. Semua tautan menuju situs resmi.",
    url: "/explore",
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

export default function ExplorePage() {
  return (
    <div className="container-page pb-16 pt-8">
      <Breadcrumbs items={[{ label: "Explore AI" }]} />

      <div className="mt-6">
        <ExploreSwitch active="ai" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="section-label">
            <span className="h-px w-5 bg-gradient-to-r from-iris to-aqua" aria-hidden="true" />
            Direktori lengkap
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
            Explore <span className="text-gradient">AI</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {formatNumber(stats.tools)} tool dalam {stats.categories} kategori. Gunakan pencarian
            dan filter untuk mempersempit pilihan — semua tautan langsung ke situs resmi.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip">
            <Compass className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
            {stats.categories} kategori
          </span>
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
            {stats.free} gratis / freemium
          </span>
        </div>
      </div>

      <div className="mt-8">
        <Suspense fallback={<ExploreFallback />}>
          <ExploreClient />
        </Suspense>
      </div>
    </div>
  );
}
