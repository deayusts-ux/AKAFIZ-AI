const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE = "legacy_ai_session";
export const SESSION_SHORT_SECONDS = 60 * 60 * 12;
export const SESSION_REMEMBER_SECONDS = 60 * 60 * 24 * 365;

const FALLBACK_SECRET = "legacy-ai-portal-dev-secret-change-me";
const FALLBACK_ACCESS_CODE = "LEGACY-2026";

export const EMAIL_CODE_PREFIX = "LEGACY-";
export const EMAIL_CODE_VALID_DAYS = 7;

const EMAIL_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const DAY_MS = 24 * 60 * 60 * 1000;

export interface SessionPayload {
  v: 1;
  sub: string;
  iat: number;
  exp: number;
}

function getSigningSecret(): string {
  return process.env.AUTH_SECRET?.trim() || FALLBACK_SECRET;
}

function configuredAccessCodes(): string[] {
  const list = process.env.LEGACY_ACCESS_CODES;
  if (list) {
    const parsed = list
      .split(/[\s,;]+/)
      .map((code) => code.trim())
      .filter(Boolean);
    if (parsed.length > 0) return parsed;
  }
  return [process.env.LEGACY_ACCESS_CODE?.trim() || FALLBACK_ACCESS_CODE];
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

let accessHashCache: { key: string; hashes: Uint8Array[] } | null = null;

async function expectedAccessHashes(): Promise<Uint8Array[]> {
  const codes = configuredAccessCodes();
  const key = codes.join("\u0000");
  if (accessHashCache?.key === key) return accessHashCache.hashes;

  const hashes = await Promise.all(codes.map((code) => sha256(code)));
  accessHashCache = { key, hashes };
  return hashes;
}

async function hmac(value: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function encodeBase32(bytes: Uint8Array): string {
  let output = "";
  let buffer = 0;
  let bits = 0;
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += EMAIL_CODE_ALPHABET[(buffer >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += EMAIL_CODE_ALPHABET[(buffer << (5 - bits)) & 31];
  return output;
}

function currentDayIndex(): number {
  return Math.floor(Date.now() / DAY_MS);
}

async function emailCodeForDay(email: string, day: number): Promise<string> {
  const digest = await hmac(`access-code:${email.toLowerCase()}:${day}`);
  return encodeBase32(digest.slice(0, 5));
}

export async function createEmailAccessCode(email: string): Promise<string> {
  const raw = await emailCodeForDay(email, currentDayIndex());
  return `${EMAIL_CODE_PREFIX}${raw.slice(0, 4)}-${raw.slice(4)}`;
}

async function verifyEmailAccessCode(input: string, email: string): Promise<boolean> {
  const normalized = input.trim().toUpperCase();
  if (!normalized.startsWith(EMAIL_CODE_PREFIX)) return false;
  const raw = normalized.slice(EMAIL_CODE_PREFIX.length).replace(/[^A-Z0-9]/g, "");
  if (raw.length !== 8) return false;

  const today = currentDayIndex();
  let matched = false;
  for (let offset = 0; offset < EMAIL_CODE_VALID_DAYS; offset += 1) {
    const expected = await emailCodeForDay(email, today - offset);
    matched = constantTimeEqual(encoder.encode(raw), encoder.encode(expected)) || matched;
  }
  return matched;
}

export async function verifyAccessCode(input: string, email?: string): Promise<boolean> {
  const candidate = input.trim();
  if (!candidate) return false;

  const [candidateHash, expectedHashes] = await Promise.all([
    sha256(candidate),
    expectedAccessHashes(),
  ]);

  let matched = false;
  for (const hash of expectedHashes) {
    matched = constantTimeEqual(candidateHash, hash) || matched;
  }
  if (matched) return true;

  return email ? verifyEmailAccessCode(candidate, email) : false;
}

async function sign(value: string): Promise<string> {
  return toBase64Url(await hmac(value));
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
