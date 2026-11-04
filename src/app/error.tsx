"use client";

import Link from "next/link";
import { Home, RefreshCw, TriangleAlert } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-500/10 text-rose-400">
        <TriangleAlert className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
        Ada yang tidak berjalan semestinya
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Halaman ini gagal dimuat. Coba muat ulang, atau kembali ke beranda jika masalah berlanjut.
      </p>
      {error.digest ? (
        <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-muted/60">
          Kode error: {error.digest}
        </p>
      ) : null}
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => reset()} className="btn-primary h-10 px-4 text-xs">
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Coba lagi
        </button>
        <Link href="/" className="btn-ghost h-10 px-4 text-xs">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          Beranda
        </Link>
      </div>
    </div>
  );
}
