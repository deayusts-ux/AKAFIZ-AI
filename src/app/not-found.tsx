import Link from "next/link";
import { ArrowRight, Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <div
          className="ambient-orb left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-plasma/25"
          aria-hidden="true"
        />
        <p className="relative font-display text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-gradient sm:text-[10rem]">
          404
        </p>
      </div>
      <h1 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Tautan mungkin sudah berubah atau tool yang kamu cari belum ada di direktori. Coba cari
        lewat Explore.
      </p>

      <form
        action="/explore"
        method="get"
        role="search"
        className="mt-7 flex w-full max-w-md items-center gap-2 rounded-xl border border-line/10 bg-cell/60 p-1.5 focus-within:border-iris/45"
      >
        <Search className="ml-2.5 h-4 w-4 shrink-0 text-aqua" aria-hidden="true" />
        <label htmlFor="notfound-search" className="sr-only">
          Cari tool AI
        </label>
        <input
          id="notfound-search"
          name="q"
          type="search"
          placeholder="Cari tool AI…"
          className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted/80"
        />
        <button type="submit" className="btn-primary h-10 px-4 text-xs">
          Cari
        </button>
      </form>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Link href="/" className="btn-ghost h-10 px-4 text-xs">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          Beranda
        </Link>
        <Link href="/explore" className="btn-ghost h-10 px-4 text-xs">
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          Explore AI
        </Link>
        <Link href="/categories" className="btn-ghost h-10 px-4 text-xs">
          Kategori
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
