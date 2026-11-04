import type { Metadata } from "next";
import { HardDrive, Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FavoritesClient } from "@/components/favorites-client";

export const metadata: Metadata = {
  title: "Favorit — koleksi tool AI pribadimu",
  description:
    "Koleksi tool AI yang kamu simpan. Favorit tersimpan di browser ini tanpa perlu akun, dan bisa diakses kapan saja.",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <div className="container-page pb-16 pt-8">
      <Breadcrumbs items={[{ label: "Favorit" }]} />

      <div className="mt-7 max-w-2xl">
        <p className="section-label">
          <span className="h-px w-5 bg-gradient-to-r from-rose-400 to-plasma" aria-hidden="true" />
          Koleksi pribadi
        </p>
        <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-500/10 text-rose-400">
            <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
          </span>
          Favoritmu
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
          Semua tool yang kamu simpan, dalam satu tempat. Tambahkan atau hapus kapan saja lewat
          ikon hati pada setiap kartu.
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.03] px-3 py-1.5 text-[11px] font-medium text-muted">
          <HardDrive className="h-3.5 w-3.5 text-aqua" aria-hidden="true" />
          Tersimpan lokal di browser ini — tanpa akun, tanpa server.
        </p>
      </div>

      <FavoritesClient />
    </div>
  );
}
