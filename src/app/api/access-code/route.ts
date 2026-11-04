import { NextResponse, type NextRequest } from "next/server";
import { createEmailAccessCode, normalizeEmail } from "@/lib/auth";
import { sendAccessCodeEmail, visitorEmailEnabled } from "@/lib/login-notify";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 4;
const EMAIL_COOLDOWN_MS = 5 * 60 * 1000;

type RequestRecord = { count: number; resetAt: number };
const requestsByIp = new Map<string, RequestRecord>();
const lastSentAt = new Map<string, number>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "Tidak diketahui"
  );
}

function isRateLimited(ip: string): boolean {
  const record = requestsByIp.get(ip);
  if (!record) return false;
  if (Date.now() > record.resetAt) {
    requestsByIp.delete(ip);
    return false;
  }
  return record.count >= MAX_REQUESTS;
}

function registerRequest(ip: string): void {
  const now = Date.now();
  for (const [key, record] of requestsByIp) {
    if (now > record.resetAt) requestsByIp.delete(key);
  }
  const record = requestsByIp.get(ip);
  if (!record || now > record.resetAt) {
    requestsByIp.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  record.count += 1;
}

function isEmailOnCooldown(email: string): boolean {
  const now = Date.now();
  for (const [key, sentAt] of lastSentAt) {
    if (now - sentAt > EMAIL_COOLDOWN_MS) lastSentAt.delete(key);
  }
  const sentAt = lastSentAt.get(email);
  return Boolean(sentAt && now - sentAt < EMAIL_COOLDOWN_MS);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan kode. Coba lagi dalam 15 menit." },
      { status: 429, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const email = normalizeEmail((body as { email?: unknown } | null)?.email);
  if (!email) {
    return NextResponse.json(
      { error: "Masukkan alamat email yang valid." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!visitorEmailEnabled()) {
    return NextResponse.json(
      {
        error:
          "Email otomatis belum aktif. Pemilik portal perlu mengisi Gmail App Password atau Resend dengan domain terverifikasi.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (isEmailOnCooldown(email)) {
    return NextResponse.json(
      {
        error:
          "Kode sudah dikirim ke email ini beberapa menit lalu. Cek inbox dan folder spam sebelum meminta lagi.",
      },
      { status: 429, headers: { "Cache-Control": "no-store" } },
    );
  }

  const code = await createEmailAccessCode(email);
  const delivery = await sendAccessCodeEmail({ email, code });

  if (!delivery.delivered) {
    return NextResponse.json(
      { error: "Email gagal dikirim. Coba lagi sebentar atau hubungi pemilik portal." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  lastSentAt.set(email, Date.now());
  registerRequest(ip);

  return NextResponse.json(
    { ok: true, channel: delivery.channel },
    { headers: { "Cache-Control": "no-store" } },
  );
}
