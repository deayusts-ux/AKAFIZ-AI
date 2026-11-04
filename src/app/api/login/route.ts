import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_REMEMBER_SECONDS,
  SESSION_SHORT_SECONDS,
  createSessionToken,
  normalizeEmail,
  verifyAccessCode,
} from "@/lib/auth";
import { sendLoginNotification } from "@/lib/login-notify";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 6;

type Attempt = { failures: number; resetAt: number };
const attempts = new Map<string, Attempt>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "Tidak diketahui"
  );
}

function isRateLimited(key: string): boolean {
  const record = attempts.get(key);
  if (!record) return false;
  if (Date.now() > record.resetAt) {
    attempts.delete(key);
    return false;
  }
  return record.failures >= MAX_FAILURES;
}

function registerFailure(key: string): void {
  const now = Date.now();
  for (const [existingKey, record] of attempts) {
    if (now > record.resetAt) attempts.delete(existingKey);
  }
  const record = attempts.get(key);
  if (!record || now > record.resetAt) {
    attempts.set(key, { failures: 1, resetAt: now + WINDOW_MS });
    return;
  }
  record.failures += 1;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi dalam 10 menit." },
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
  const accessCode = (body as { accessCode?: unknown } | null)?.accessCode;
  const remember = Boolean((body as { remember?: unknown } | null)?.remember);

  if (!email) {
    return NextResponse.json(
      { error: "Masukkan alamat email yang valid." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (typeof accessCode !== "string" || !(await verifyAccessCode(accessCode, email))) {
    registerFailure(ip);
    return NextResponse.json(
      { error: "Kode akses tidak cocok. Periksa kembali atau hubungi pemilik portal." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  attempts.delete(ip);

  const duration = remember ? SESSION_REMEMBER_SECONDS : SESSION_SHORT_SECONDS;
  const token = await createSessionToken(email, duration);

  const notification = await sendLoginNotification({
    email,
    accessCode: accessCode.trim(),
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    city: request.headers.get("x-vercel-ip-city"),
    region: request.headers.get("x-vercel-ip-country-region"),
    country: request.headers.get("x-vercel-ip-country"),
  });

  const response = NextResponse.json(
    {
      ok: true,
      notified: notification.delivered,
      visitorNotified: notification.visitorDelivered,
    },
    { headers: { "Cache-Control": "no-store" } },
  );

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(remember ? { maxAge: SESSION_REMEMBER_SECONDS } : {}),
  });

  return response;
}
