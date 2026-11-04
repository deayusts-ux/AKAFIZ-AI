import { site } from "@/lib/site";

export interface LoginEvent {
  email: string;
  ip: string;
  userAgent: string;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  occurredAt?: Date;
}

export interface NotifyResult {
  delivered: boolean;
  channel: "resend" | "shipmyform" | "none";
}

const OWNER_EMAIL = process.env.LEGACY_OWNER_EMAIL?.trim() || "deayusts@gmail.com";

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

function buildMessage(event: LoginEvent) {
  const occurredAt = event.occurredAt ?? new Date();
  const { device, browser } = describeClient(event.userAgent);
  const location = formatLocation(event);
  const time = `${formatTime(occurredAt)} WIB`;
  const ip = event.ip || "Tidak diketahui";
  const userAgent = event.userAgent || "Tidak diketahui";

  const rows: { label: string; value: string }[] = [
    { label: "Email pengguna", value: event.email },
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
    "Jika ini bukan kamu, segera ganti LEGACY_ACCESS_CODE dan AUTH_SECRET di pengaturan deployment.",
    "Kode akses tidak pernah disertakan dalam email ini.",
    site.url,
  ].join("\n");

  const html = `<!doctype html>
<html lang="id">
  <body style="margin:0;padding:0;background:#070a14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e9edfb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#070a14;padding:28px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#101728;border:1px solid #263049;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:24px 26px;background:linear-gradient(135deg,#1b1d4d 0%,#241a47 55%,#0d3a48 100%);">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9fe8f7;font-weight:700;">LEGACY AI · Portal Access</p>
                <h1 style="margin:0;font-size:22px;line-height:1.25;color:#ffffff;">Pemberitahuan login baru</h1>
                <p style="margin:8px 0 0;font-size:13px;color:#c7d2f0;">Sebuah sesi baru berhasil dibuka di portal direktori.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 26px;">
                <span style="display:inline-block;padding:5px 10px;border-radius:999px;background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.35);color:#6ee7b7;font-size:11px;font-weight:700;letter-spacing:1px;">LOGIN BERHASIL</span>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;border-collapse:collapse;">
                  ${rows
                    .map(
                      (row) => `<tr>
                    <td style="padding:10px 0;border-bottom:1px solid #202a41;font-size:12px;color:#93a0c2;width:42%;vertical-align:top;">${escapeHtml(row.label)}</td>
                    <td style="padding:10px 0;border-bottom:1px solid #202a41;font-size:13px;color:#eef2ff;font-weight:600;vertical-align:top;">${escapeHtml(row.value)}</td>
                  </tr>`,
                    )
                    .join("")}
                </table>
                <p style="margin:18px 0 0;font-size:11px;line-height:1.6;color:#8695ba;word-break:break-word;">User agent: ${escapeHtml(userAgent)}</p>
                <div style="margin-top:22px;padding:14px 16px;border-radius:12px;background:#0b1220;border:1px solid #222d47;">
                  <p style="margin:0;font-size:12px;line-height:1.65;color:#a9b6d8;">Jika ini bukan kamu, segera ganti <strong style="color:#eef2ff;">LEGACY_ACCESS_CODE</strong> dan <strong style="color:#eef2ff;">AUTH_SECRET</strong> di pengaturan deployment. Kode akses tidak pernah disertakan dalam email ini.</p>
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

  return { text, html, time };
}

async function sendWithResend(event: LoginEvent, message: ReturnType<typeof buildMessage>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM?.trim() || "LEGACY AI <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      subject: `Pemberitahuan login LEGACY AI — ${message.time}`,
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

async function sendWithShipMyForm(event: LoginEvent, message: ReturnType<typeof buildMessage>) {
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
    "Kode akses tidak disertakan. Jika ini bukan kamu, ganti LEGACY_ACCESS_CODE dan AUTH_SECRET.",
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
  const message = buildMessage(event);

  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      if (await sendWithResend(event, message)) {
        return { delivered: true, channel: "resend" };
      }
    } catch (error) {
      console.warn("[login-notify] Resend error", error);
    }
  }

  try {
    if (await sendWithShipMyForm(event, message)) {
      return { delivered: true, channel: "shipmyform" };
    }
  } catch (error) {
    console.warn("[login-notify] ShipMyForm error", error);
  }

  return { delivered: false, channel: "none" };
}
