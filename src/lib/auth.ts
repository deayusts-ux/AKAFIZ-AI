const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE = "legacy_ai_session";
export const SESSION_SHORT_SECONDS = 60 * 60 * 12;
export const SESSION_REMEMBER_SECONDS = 60 * 60 * 24 * 7;

const FALLBACK_SECRET = "legacy-ai-portal-dev-secret-change-me";
const FALLBACK_ACCESS_CODE = "LEGACY-2026";

export interface SessionPayload {
  v: 1;
  sub: string;
  iat: number;
  exp: number;
}

function getSigningSecret(): string {
  return process.env.AUTH_SECRET?.trim() || FALLBACK_SECRET;
}

function accessCode(): string {
  return process.env.LEGACY_ACCESS_CODE?.trim() || FALLBACK_ACCESS_CODE;
}

export function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let index = 0; index < length; index += 1) {
    diff |= (a[index] ?? 0) ^ (b[index] ?? 0);
  }
  return diff === 0;
}

async function sha256(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

export async function verifyAccessCode(input: string): Promise<boolean> {
  const candidate = input.trim();
  if (!candidate) return false;
  const [candidateHash, expectedHash] = await Promise.all([
    sha256(candidate),
    sha256(accessCode()),
  ]);
  return constantTimeEqual(candidateHash, expectedHash);
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return toBase64Url(new Uint8Array(signature));
}

export async function createSessionToken(
  email: string,
  durationSeconds: number,
): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 1,
    sub: email,
    iat: issuedAt,
    exp: issuedAt + durationSeconds,
  };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${body}.${await sign(body)}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = await sign(body);
  if (!constantTimeEqual(encoder.encode(signature), encoder.encode(expected))) return null;

  try {
    const payload = JSON.parse(decoder.decode(fromBase64Url(body))) as SessionPayload;
    if (payload.v !== 1 || typeof payload.sub !== "string" || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  if (email.includes("..")) return null;
  return email;
}

export function safeNextPath(value: string | null | undefined): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return "/";
  if (value.startsWith("/login") || value.startsWith("/api/")) return "/";
  return value;
}
