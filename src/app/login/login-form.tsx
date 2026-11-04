"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";

export function LoginForm({
  nextPath,
  emailReady,
}: {
  nextPath: string;
  emailReady: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [remember, setRemember] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [pending, setPending] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [issuedCode, setIssuedCode] = useState<string | null>(null);
  const [codeEmailed, setCodeEmailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRequestCode() {
    if (requesting) return;
    const target = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(target)) {
      setError("Isi alamat email aktif di kolom Email, lalu tekan Minta kode.");
      document.getElementById("login-email")?.focus();
      return;
    }

    setError(null);
    setRequesting(true);

    try {
      const response = await fetch("/api/access-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; code?: string; emailed?: boolean }
        | null;

      if (!response.ok || !data?.ok || !data.code) {
        setError(data?.error ?? "Kode belum bisa dibuat. Coba lagi sebentar.");
        return;
      }

      setAccessCode(data.code);
      setIssuedCode(data.code);
      setCodeEmailed(Boolean(data.emailed));
      setShowCode(true);
      toast(
        data.emailed ? "Kode siap dan terkirim" : "Kode siap dipakai",
        data.emailed
          ? `Kode sudah terisi otomatis dan salinannya dikirim ke ${target}. Berlaku 7 hari.`
          : "Kode sudah terisi otomatis. Salinan email tidak terkirim, jadi simpan kode ini. Berlaku 7 hari.",
      );
      document.getElementById("login-code")?.focus();
    } catch {
      setError("Koneksi gagal. Periksa jaringan lalu coba lagi.");
    } finally {
      setRequesting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, accessCode, remember }),
      });
      const data = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            error?: string;
            notified?: boolean;
            visitorNotified?: boolean;
          }
        | null;

      if (!response.ok || !data?.ok) {
        setError(data?.error ?? "Tidak bisa masuk saat ini. Coba lagi sebentar.");
        setPending(false);
        return;
      }

      if (data.notified === false) {
        toast(
          "Login berhasil",
          "Notifikasi email belum terkirim. Pemilik portal perlu mengaktifkan kanal email sekali.",
        );
        await new Promise((resolve) => window.setTimeout(resolve, 1600));
      } else if (data.visitorNotified) {
        toast("Login berhasil", "Konfirmasi login juga dikirim ke email Anda.");
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Koneksi gagal. Periksa jaringan lalu coba lagi.");
      setPending(false);
    }
  }

  return (
    <div
      id="login-form"
      className="glass-strong relative scroll-mt-24 overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-iris/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-aqua/20 bg-aqua/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-aqua">
          <LockKeyhole className="h-3 w-3" aria-hidden="true" />
          Akses privat
        </span>
        <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-[28px]">
          Masuk ke portal
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Masukkan email aktif, tekan Minta kode, dan kode langsung muncul di halaman ini.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="mb-2 block text-xs font-semibold text-ink">
              Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="login-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (issuedCode) {
                    setIssuedCode(null);
                    setCodeEmailed(false);
                    setAccessCode("");
                  }
                }}
                placeholder="nama@email.com"
                className="h-12 w-full rounded-xl border border-line/10 bg-canvas/45 pl-10 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/65 hover:border-line/20 focus:border-iris/60 focus:bg-canvas/60"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="login-code" className="block text-xs font-semibold text-ink">
                Kode akses
              </label>
              <button
                type="button"
                onClick={handleRequestCode}
                disabled={requesting}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-aqua transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {requesting ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                    Mengirim kode…
                  </>
                ) : (
                  "Minta kode"
                )}
              </button>
            </div>
            <div className="relative">
              <KeyRound
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="login-code"
                name="accessCode"
                type={showCode ? "text" : "password"}
                autoComplete="current-password"
                required
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder="Masukkan kode akses"
                className="h-12 w-full rounded-xl border border-line/10 bg-canvas/45 pl-10 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-muted/65 hover:border-line/20 focus:border-iris/60 focus:bg-canvas/60"
              />
              <button
                type="button"
                onClick={() => setShowCode((value) => !value)}
                aria-label={showCode ? "Sembunyikan kode akses" : "Tampilkan kode akses"}
                aria-pressed={showCode}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-line/[0.06] hover:text-ink"
              >
                {showCode ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {issuedCode ? (
            <div
              role="status"
              className="rounded-xl border border-aqua/25 bg-aqua/[0.07] px-3.5 py-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-aqua">
                Kode aksesmu
              </p>
              <p className="mt-1 font-mono text-base font-bold tracking-[0.08em] text-ink">
                {issuedCode}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                {codeEmailed
                  ? "Sudah terisi otomatis dan salinannya dikirim ke emailmu. Berlaku 7 hari."
                  : "Sudah terisi otomatis. Salinan email tidak terkirim, jadi simpan kode ini. Berlaku 7 hari."}
              </p>
            </div>
          ) : null}

          <label className="flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-line/20 bg-canvas/50 accent-iris"
            />
            <span>
              Tetap masuk di perangkat ini selama 1 tahun. Tanpa ini, sesi berakhir dalam 12 jam.
            </span>
          </label>

          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-rose-500/20 bg-rose-500/[0.08] px-3.5 py-2.5 text-xs leading-relaxed text-rose-300"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary h-12 w-full rounded-xl text-sm"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Memverifikasi…
              </>
            ) : (
              <>
                Masuk ke LEGACY AI
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-line/[0.08] bg-line/[0.025] p-3.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          <p className="text-[11px] leading-relaxed text-muted">
            {emailReady
              ? "Minta kode langsung menampilkan kode di halaman ini dan mengirim salinannya ke emailmu. Kode berlaku 7 hari."
              : "Minta kode langsung menampilkan kode di halaman ini. Salinan email belum aktif, jadi simpan kodenya baik-baik."}
          </p>
        </div>
      </div>
    </div>
  );
}
