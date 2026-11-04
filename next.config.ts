import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ["nodemailer"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    const cryptoPaths = [
      "ebook",
      "ebook/:slug",
      "candlestick-lab",
      "simulation",
      "quiz",
      "quiz/:slug",
      "glossary",
      "progress",
      "game",
    ];
    return cryptoPaths.map((path) => ({
      source: `/${path}`,
      destination: `/crypto/${path}`,
      permanent: false,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
