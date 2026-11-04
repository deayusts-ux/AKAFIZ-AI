import { createTransport } from "nodemailer";
import { site } from "@/lib/site";

export interface LoginEvent {
  email: string;
  accessCode: string;
  ip: string;
  userAgent: string;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  occurredAt?: Date;
}

export interface NotifyResult {
  delivered: boolean;
  visitorDelivered: boolean;
  channel: "gmail" | "resend" | "shipmyform" | "none";
}

interface DeliveryResult {
  owner: boolean;
  visitor: boolean;
}

interface EmailContent {
  eyebrow: string;
  title: string;
  intro: string;
  badge: string;
  rows: { label: string; value: string }[];
  note: string;
  footnote?: string;
}

const OWNER_EMAIL = process.env.LEGACY_OWNER_EMAIL?.trim() || "deayusts@gmail.com";
const GMAIL_USER = process.env.GMAIL_USER?.trim() || OWNER_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "").trim() || "";
const VISITOR_COOLDOWN_MS = 10 * 60 * 1000;
const visitorNotifiedAt = new Map<string, number>();

function isVisitorOnCooldown(email: string): boolean {
  const key = email.toLowerCase();
  const now = Date.now();
  for (const [entry, sentAt] of visitorNotifiedAt) {
    if (now - sentAt > VISITOR_COOLDOWN_MS) visitorNotifiedAt.delete(entry);
  }
  const last = visitorNotifiedAt.get(key);
  return Boolean(last && now - last < VISITOR_COOLDOWN_MS);
}

function markVisitorNotified(email: string): void {
  visitorNotifiedAt.set(email.toLowerCase(), Date.now());
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function describeClient(userAgent: string): { device: string; browser: string } {
  const ua = userAgent.toLowerCase();

  let device = "Perangkat tidak dikenal";
  if (/iphone|ipod/.test(ua)) device = "iPhone";
  else if (/ipad/.test(ua)) device = "iPad";
  else if (/android/.test(ua)) device = "Android";
  else if (/windows/.test(ua)) device = "Windows";
  else if (/macintosh|mac os x/.test(ua)) device = "macOS";
  else if (/linux/.test(ua)) device = "Linux";

  let browser = "Browser tidak dikenal";
  if (/edg\//.test(ua)) browser = "Microsoft Edge";
  else if (/opr\/|opera/.test(ua)) browser = "Opera";
  else if (/chrome\/|crios/.test(ua)) browser = "Chrome";
  else if (/firefox|fxios/.test(ua)) browser = "Firefox";
  else if (/safari/.test(ua)) browser = "Safari";

  return { device, browser };
}

function formatLocation(event: LoginEvent): string {
  const parts = [event.city, event.region, event.country]
    .filter((part): part is string => Boolean(part && part.trim()))
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    });
  return parts.length > 0 ? parts.join(", ") : "Tidak tersedia";
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

function renderEmail(content: EmailContent): string {
  const footnote = content.footnote
    ? `<p style="margin:18px 0 0;font-size:11px;line-height:1.6;color:#8695ba;word-break:break-word;">${escapeHtml(content.footnote)}</p>`
    : "";

  return `<!doctype html>
<html lang="id">
  <body style="margin:0;padding:0;background:#070a14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e9edfb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070a14;padding:28px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#101728;border:1px solid #263049;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:24px 26px;background:linear-gradient(135deg,#1b1d4d 0%,#241a47 55%,#0d3a48 100%);">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9fe8f7;font-weight:700;">${escapeHtml(content.eyebrow)}</p>
                <h1 style="margin:0;font-size:22px;line-height:1.25;color:#ffffff;">${escapeHtml(content.title)}</h1>
                <p style="margin:8px 0 0;font-size:13px;color:#c7d2f0;">${escapeHtml(content.intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 26px;">
                <span style="display:inline-block;padding:5px 10px;border-radius:999px;background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.35);color:#6ee7b7;font-size:11px;font-weight:700;letter-spacing:1px;">${escapeHtml(content.badge)}</span>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;border-collapse:collapse;">
                  ${content.rows
                    .map(
                      (row) => `<tr>
                    <td style="padding:10px 0;border-bottom:1px solid #202a41;font-size:12px;color:#93a0c2;width:42%;vertical-align:top;">${escapeHtml(row.label)}</td>
                    <td style="padding:10px 0;border-bottom:1px solid #202a41;font-size:13px;color:#eef2ff;font-weight:600;vertical-align:top;">${escapeHtml(row.value)}</td>
                  </tr>`,
                    )
                    .join("")}
                </table>
                ${footnote}
                <div style="margin-top:22px;padding:14px 16px;border-radius:12px;background:#0b1220;border:1px solid #222d47;">
                  <p style="margin:0;font-size:12px;line-height:1.65;color:#a9b6d8;">${escapeHtml(content.note)}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 26px;border-top:1px solid #202a41;background:#0b1220;">
                <p style="margin:0;font-size:11px;color:#6f7ea3;">Email otomatis dari ${escapeHtml(site.name)} · ${escapeHtml(site.url)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildOwnerMessage(event: LoginEvent) {
  const occurredAt = event.occurredAt ?? new Date();
  const { device, browser } = describeClient(event.userAgent);
  const location = formatLocation(event);
  const time = `${formatTime(occurredAt)} WIB`;
  const ip = event.ip || "Tidak diketahui";
  const userAgent = event.userAgent || "Tidak diketahui";

  const rows = [
    { label: "Email pengguna", value: event.email },
    { label: "Kode akses", value: event.accessCode },
    { label: "Waktu", value: time },
    { label: "Perangkat", value: device },
    { label: "Browser", value: browser },
    { label: "Alamat IP", value: ip },
    { label: "Perkiraan lokasi", value: location },
    { label: "Metode", value: "Kode akses portal" },
    { label: "Status", value: "Berhasil masuk" },
  ];

  const text = [
    "PEMBERITAHUAN LOGIN — LEGACY AI",
    "",
    "Ada login baru ke portal LEGACY AI.",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    `User agent: ${userAgent}`,
    "",
    "Jika ini bukan kamu, segera ganti kode akses (LEGACY_ACCESS_CODES) dan AUTH_SECRET di pengaturan deployment.",
    "Kode akses yang dipakai tercatat di email ini. Jangan teruskan email ini ke orang lain.",
    site.url,
  ].join("\n");

  const html = renderEmail({
    eyebrow: "LEGACY AI · Portal Access",
    title: "Pemberitahuan login baru",
    intro: "Sebuah sesi baru berhasil dibuka di portal direktori.",
    badge: "LOGIN BERHASIL",
    rows,
    footnote: `User agent: ${userAgent}`,
    note: "Jika ini bukan kamu, segera ganti kode akses (LEGACY_ACCESS_CODES) dan AUTH_SECRET di pengaturan deployment. Kode akses yang dipakai tercatat di email ini. Jangan teruskan email ini ke orang lain.",
  });

  return { text, html, time };
}

function buildVisitorMessage(event: LoginEvent) {
  const occurredAt = event.occurredAt ?? new Date();
  const { device, browser } = describeClient(event.userAgent);
  const time = `${formatTime(occurredAt)} WIB`;

  const rows = [
    { label: "Email", value: event.email },
    { label: "Kode akses", value: event.accessCode },
    { label: "Waktu", value: time },
    { label: "Perangkat", value: device },
    { label: "Browser", value: browser },
  ];

  const text = [
    "KONFIRMASI LOGIN — LEGACY AI",
    "",
    "Login ke portal LEGACY AI berhasil.",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Simpan kode akses ini untuk masuk lagi. Jangan teruskan email ini ke orang lain.",
    "Jika kamu tidak merasa melakukan login ini, hubungi pemilik portal.",
    site.url,
  ].join("\n");

  const html = renderEmail({
    eyebrow: "LEGACY AI · Konfirmasi Login",
    title: "Login berhasil ke LEGACY AI",
    intro: "Email ini dikirim sebagai konfirmasi bahwa sesi baru dibuka dengan alamat ini.",
    badge: "KONFIRMASI KEAMANAN",
    rows,
    note: "Simpan kode akses ini untuk masuk lagi. Jangan teruskan email ini ke orang lain. Jika kamu tidak merasa melakukan login ini, hubungi pemilik portal.",
  });

  return { text, html };
}

async function sendWithGmail(
  event: LoginEvent,
  ownerMessage: ReturnType<typeof buildOwnerMessage>,
  visitorMessage: ReturnType<typeof buildVisitorMessage>,
): Promise<DeliveryResult> {
  if (!GMAIL_APP_PASSWORD) return { owner: false, visitor: false };

  const transporter = createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });
  const from = `"LEGACY AI" <${GMAIL_USER}>`;

  try {
    try {
      await transporter.sendMail({
        from,
        to: OWNER_EMAIL,
        replyTo: event.email,
        subject: `Pemberitahuan login LEGACY AI — ${ownerMessage.time}`,
        html: ownerMessage.html,
        text: ownerMessage.text,
      });
    } catch (error) {
      console.warn("[login-notify] Gmail owner send failed", error);
      return { owner: false, visitor: false };
    }

    if (event.email.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
      return { owner: true, visitor: false };
    }

    if (isVisitorOnCooldown(event.email)) {
      return { owner: true, visitor: false };
    }

    try {
      await transporter.sendMail({
        from,
        to: event.email,
        replyTo: GMAIL_USER,
        subject: "Login berhasil ke LEGACY AI",
        html: visitorMessage.html,
        text: visitorMessage.text,
      });
      markVisitorNotified(event.email);
      return { owner: true, visitor: true };
    } catch (error) {
      console.warn("[login-notify] Gmail visitor send failed", error);
      return { owner: true, visitor: false };
    }
  } finally {
    transporter.close();
  }
}

async function sendWithResend(
  event: LoginEvent,
  ownerMessage: ReturnType<typeof buildOwnerMessage>,
  visitorMessage: ReturnType<typeof buildVisitorMessage>,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { owner: false, visitor: false };

  const from = process.env.RESEND_FROM?.trim() || "LEGACY AI <onboarding@resend.dev>";

  async function deliver(to: string, subject: string, message: { html: string; text: string }) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html: message.html,
        text: message.text,
        reply_to: event.email,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn("[login-notify] Resend failed", response.status, detail.slice(0, 300));
      return false;
    }
    return true;
  }

  if (!(await deliver(OWNER_EMAIL, `Pemberitahuan login LEGACY AI — ${ownerMessage.time}`, ownerMessage))) {
    return { owner: false, visitor: false };
  }

  if (event.email.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
    return { owner: true, visitor: false };
  }

  // Resend's shared onboarding sender can only reach the account owner.
  if (/@resend\.dev/i.test(from) || isVisitorOnCooldown(event.email)) {
    return { owner: true, visitor: false };
  }

  const visitorOk = await deliver(event.email, "Login berhasil ke LEGACY AI", visitorMessage);
  if (visitorOk) markVisitorNotified(event.email);
  return { owner: true, visitor: visitorOk };
}

async function sendWithShipMyForm(
  event: LoginEvent,
  message: ReturnType<typeof buildOwnerMessage>,
): Promise<boolean> {
  const origin = site.url.replace(/\/$/, "");
  const client = describeClient(event.userAgent);

  const form = new FormData();
  form.set("email", event.email);
  form.set("_replyto", event.email);
  form.set("_subject", `Pemberitahuan login LEGACY AI — ${message.time}`);
  form.set("Jenis", "Pemberitahuan login");
  form.set("Email pengguna", event.email);
  form.set("Waktu", message.time);
  form.set("Perangkat", client.device);
  form.set("Browser", client.browser);
  form.set("Alamat IP", event.ip || "Tidak diketahui");
  form.set("Perkiraan lokasi", formatLocation(event));
  form.set("Metode", "Kode akses portal");
  form.set("Status", "Berhasil masuk");
  form.set(
    "Catatan",
    "Kode akses tidak disertakan pada kanal fallback ini. Jika ini bukan kamu, ganti LEGACY_ACCESS_CODES dan AUTH_SECRET.",
  );

  const response = await fetch(`https://shipmyform.com/to/${encodeURIComponent(OWNER_EMAIL)}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/login`,
    },
    body: form,
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.warn(
      "[login-notify] ShipMyForm failed",
      response.status,
      detail.slice(0, 300),
    );
    return false;
  }

  const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  return !data || data.ok !== false;
}

export async function sendLoginNotification(event: LoginEvent): Promise<NotifyResult> {
  const ownerMessage = buildOwnerMessage(event);
  const visitorMessage = buildVisitorMessage(event);

  if (GMAIL_APP_PASSWORD) {
    try {
      const result = await sendWithGmail(event, ownerMessage, visitorMessage);
      if (result.owner) {
        return { delivered: true, visitorDelivered: result.visitor, channel: "gmail" };
      }
    } catch (error) {
      console.warn("[login-notify] Gmail error", error);
    }
  }

  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      const result = await sendWithResend(event, ownerMessage, visitorMessage);
      if (result.owner) {
        return { delivered: true, visitorDelivered: result.visitor, channel: "resend" };
      }
    } catch (error) {
      console.warn("[login-notify] Resend error", error);
    }
  }

  try {
    if (await sendWithShipMyForm(event, ownerMessage)) {
      return { delivered: true, visitorDelivered: false, channel: "shipmyform" };
    }
  } catch (error) {
    console.warn("[login-notify] ShipMyForm error", error);
  }

  return { delivered: false, visitorDelivered: false, channel: "none" };
}
