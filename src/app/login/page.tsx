import type { Metadata } from "next";
import { ArrowDown, Compass, Link2, Mail, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { stats } from "@/data/tools";
import { safeNextPath } from "@/lib/auth";
import { formatNumber } from "@/lib/utils";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk portal",
  description: "Portal akses privat LEGACY AI.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

const highlights = [
  {
    icon: Compass,
    title: `${formatNumber(stats.tools)} tool dalam ${stats.categories} kategori`,
    text: "Kurasi langsung dari satu katalog yang mudah diperbarui.",
  },
  {
    icon: Link2,
    title: "Tautan resmi, tanpa perantara",
    text: "Setiap tombol kunjungan menuju domain resmi produk.",
  },
  {
    icon: Mail,
    title: "Kode lewat email",
    text: "Tekan Minta kode untuk menerima kode akses pribadi di emailmu, lalu masuk dengan kode itu.",
  },
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = safeNextPath(rawNext);
  const resendFrom = process.env.RESEND_FROM?.trim() || "LEGACY AI <onboarding@resend.dev>";
  const emailReady = Boolean(
    process.env.GMAIL_APP_PASSWORD?.trim() ||
      (process.env.RESEND_API_KEY?.trim() && !/@resend\.dev/i.test(resendFrom)),
  );

  return (
    <main id="main" className="relative flex min-h-dvh flex-col overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="ambient-orb -left-32 top-[-12rem] h-[34rem] w-[34rem] bg-iris/25" />
        <div className="ambient-orb right-[-14rem] top-24 h-[30rem] w-[30rem] bg-plasma/25" />
        <div className="ambient-orb bottom-[-18rem] left-1/3 h-[28rem] w-[28rem] bg-aqua/15" />
        <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-30 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_35%,black,transparent)]" />
        <div className="texture absolute inset-0" />
      </div>

      <header className="container-page relative flex h-20 items-center justify-between gap-4">
        <Brand />
        <div className="flex items-center gap-2">
          <a
            href="#login-form"
            className="hidden h-10 items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.035] px-4 text-xs font-semibold text-muted transition-colors hover:border-line/20 hover:text-ink sm:inline-flex"
          >
            Minta kode
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </header>

      <div className="container-page relative flex flex-1 items-center py-10 sm:py-14">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <section className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-iris/25 bg-iris/[0.08] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c4b5fd]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua" />
              </span>
              Portal akses · LEGACY identity
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.4rem]">
              Satu portal untuk{" "}
              <span className="text-gradient">direktori AI yang terkurasi.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              LEGACY AI merangkum {formatNumber(stats.tools)} tool AI dalam {stats.categories}{" "}
              kategori — dengan tautan resmi, harga transparan, dan favorit yang tersimpan lokal di
              perangkatmu.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="glass rounded-2xl p-4">
                    <Icon className="h-4 w-4 text-aqua" aria-hidden="true" />
                    <p className="mt-3 font-display text-[13px] font-bold leading-snug text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">{item.text}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex items-center gap-2 text-[11px] text-muted">
              <Sparkles className="h-3.5 w-3.5 text-plasma" aria-hidden="true" />
              Akses dikelola langsung oleh pemilik portal. Tidak ada akun pihak ketiga.
            </div>
          </section>

          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-iris/20 via-transparent to-aqua/15 blur-2xl"
              aria-hidden="true"
            />
            <LoginForm nextPath={nextPath} emailReady={emailReady} />
          </div>
        </div>
      </div>

      <footer className="container-page relative flex flex-col gap-2 border-t border-line/[0.07] py-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 LEGACY AI · Direktori AI Terkurasi</span>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>Portal akses privat</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted/40" />
          <span>Login diproteksi kode akses</span>
        </span>
      </footer>
    </main>
  );
}
