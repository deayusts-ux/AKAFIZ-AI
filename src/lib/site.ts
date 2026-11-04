const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "AI FINDER",
  tagline: "Direktori AI Terkurasi",
  description:
    "AI FINDER adalah direktori AI terkurasi: jelajahi 150+ tools AI terbaik untuk chat, coding, desain, video, otomasi, dan bisnis. Bandingkan harga, simpan favorit, dan kunjungi situs resminya.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  locale: "id_ID",
  language: "id",
  author: "AI FINDER",
  keywords: [
    "AI tools",
    "direktori AI",
    "tools AI",
    "AI Indonesia",
    "chatbot AI",
    "AI coding",
    "AI image generator",
    "AI video generator",
    "AI automation",
    "AI marketing",
    "AI Finder",
  ],
};
