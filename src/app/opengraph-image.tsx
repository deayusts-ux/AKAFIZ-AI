import { ImageResponse } from "next/og";
import { stats } from "@/data/tools";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 76px",
          backgroundColor: "#05070f",
          backgroundImage:
            "radial-gradient(circle at 78% 8%, rgba(168,85,247,0.45), transparent 45%), radial-gradient(circle at 12% 88%, rgba(34,211,238,0.28), transparent 45%)",
          color: "#edf1ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "linear-gradient(135deg, #6366f1, #a855f7 55%, #22d3ee)",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            AI
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>AI FINDER</span>
            <span style={{ fontSize: 14, color: "#97a1c1", letterSpacing: 4, textTransform: "uppercase" }}>
              Direktori AI Terkurasi
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2.5, maxWidth: 960 }}>
            150+ AI tools. 20 kategori. Satu direktori.
          </div>
          <div style={{ fontSize: 26, color: "#c7c4d7", maxWidth: 900, lineHeight: 1.4 }}>
            Bandingkan harga, simpan favorit, dan kunjungi situs resmi setiap tool.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {["ChatGPT", "Cursor", "Midjourney", "Runway", "n8n"].map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 19,
                color: "#dae2fd",
              }}
            >
              {name}
            </div>
          ))}
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 19, color: "#4cd7f6" }}>
            {stats.officialLinks} tautan resmi
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
