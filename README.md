# LEGACY AI

Direktori AI terkurasi: **150 tool**, **20 kategori**, tautan resmi, harga transparan, pencarian cepat, dan koleksi favorit yang tersimpan lokal.

Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Lucide React. Seluruh halaman di-prerender menjadi 185 halaman statis saat build.

## Fitur

- **Beranda** dengan hero, pencarian, kategori populer, spotlight editor, dan daftar tool yang sedang trending.
- **Explore AI** dengan pencarian nama/fungsi/kategori, filter kategori dan harga (Gratis, Freemium, Berbayar), urutan, tampilan grid/list, serta URL yang selalu sinkron dengan filter.
- **Kategori** — 20 halaman kategori dengan daftar tool, statistik, filter, dan rekomendasi kategori terkait.
- **Halaman detail tool** berisi deskripsi, fitur, harga, rating editorial, alternatif serupa, serta tombol kunjungan ke situs resmi.
- **Trending** dengan peringkat editor dan skor popularitas yang dapat ditelusuri.
- **Favorit** tersimpan di `localStorage`, tersinkron antar-tab, dengan pencarian dan hapus semua.
- **Command palette** (`⌘K` / `Ctrl+K` atau tombol cari) untuk navigasi dan pencarian cepat.
- **Dark / light mode** tanpa flash saat halaman dimuat, responsif hingga mobile, animasi yang menghormati `prefers-reduced-motion`.
- **SEO lengkap**: metadata per halaman, canonical, Open Graph image, JSON-LD, sitemap, robots, dan manifest.
- **Tanpa fake link**: setiap tombol kunjungan mengarah ke domain resmi produk dan dibuka di tab baru.

Favorit bersifat lokal di browser — tidak ada akun, server penyimpanan, atau pelacakan pengguna.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain:

```bash
npm run typecheck   # TypeScript tanpa emit
npm run build       # build produksi (185 halaman statis)
npm start           # menjalankan hasil build
```

## Environment

Salin contoh environment:

```bash
cp .env.example .env.local
```

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Tidak | URL kanonik produksi, mis. `https://legacyai.example.com`. Dipakai untuk metadata, sitemap, dan JSON-LD. |

Saat deploy di Vercel, `VERCEL_PROJECT_PRODUCTION_URL` terdeteksi otomatis sehingga sitemap dan metadata memakai domain produksi tanpa konfigurasi tambahan. Tetap disarankan mengisi `NEXT_PUBLIC_SITE_URL` bila memakai domain kustom.

## Struktur proyek

```text
src/
  app/                       # route App Router (home, explore, categories, tools, dll.)
    categories/[slug]/       # 20 halaman kategori statis
    tools/[slug]/            # 150 halaman detail tool statis
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  components/                # komponen UI reusable (cards, header, filters, command menu, dll.)
    providers/               # favorites + toast context
  data/
    tools.ts                 # katalog utama 150 tool
    categories.ts            # 20 kategori
    logos.ts                 # peta logo lokal per slug
  fonts/                     # font variabel lokal (Inter, Plus Jakarta Sans)
  lib/                       # tipe, util, konfigurasi situs
public/logos/                # 150 logo brand lokal
scripts/fetch-logos.mjs      # utilitas untuk mengambil ulang logo resmi
```

### Menambah atau memperbarui tool

1. Tambahkan objek baru ke `tools` di `src/data/tools.ts`:

   ```ts
   {
     slug: "nama-tool",
     name: "Nama Tool",
     tagline: "Satu kalimat singkat.",
     description: "Deskripsi 1–2 kalimat.",
     category: "ai-voice-audio", // slug dari categories.ts
     website: "https://situs-resmi.com",
     company: "Perusahaan",
     pricing: "freemium", // "free" | "freemium" | "paid"
     priceNote: "Gratis · Pro $10/bln",
     tags: ["TTS", "API"],
     features: ["Fitur 1", "Fitur 2"],
     bestFor: "Cocok untuk ...",
     rating: 4.5,
     popularity: 82,
     isNew: true, // opsional
   }
   ```

2. Tambahkan logo ke `public/logos/` dan daftarkan di `src/data/logos.ts`:

   ```ts
   "nama-tool": {
     src: "/logos/nama-tool.png",
     kind: "favicon",
     // invertOnLight: true, // untuk logo putih/transparan
     // invertOnDark: true,  // untuk logo hitam/transparan
   }
   ```

3. Jalankan `npm run build`. Halaman tool, kategori, sitemap, pencarian, dan navigasi diperbarui otomatis.

Catatan: `scripts/fetch-logos.mjs` mengambil ulang **semua** logo dan menulis ulang `logos.ts`. Jalankan hanya jika memang ingin menyegarkan seluruh aset, lalu periksa kembali flag inversi dan logo yang diganti secara manual.

## Kualitas data

- Katalog diperbarui November 2026.
- Harga adalah titik mulai editorial dan dapat berubah; halaman detail selalu mengarahkan pengguna untuk mengonfirmasi di situs resmi.
- Rating adalah penilaian editorial LEGACY AI, bukan ulasan pengguna atau jumlah ulasan palsu.
- PlayHT resmi ditutup setelah akuisisi dan berhenti beroperasi pada akhir 2025. Entri tersebut diganti dengan **Resemble AI**, tool suara real-time yang masih aktif, agar tidak ada tautan mati.

## Deploy ke GitHub + Vercel

Repositori: [github.com/deayusts-ux/AKAFIZ-AI](https://github.com/deayusts-ux/AKAFIZ-AI)

Deploy satu klik (login Vercel diperlukan sekali):

[Deploy dengan Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdeayusts-ux%2FAKAFIZ-AI&project-name=akafiz-ai)

Atau impor manual:

1. Buat repositori baru di GitHub, lalu dari folder proyek:

   ```bash
   git init
   git add .
   git commit -m "feat: LEGACY AI directory"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

2. Buka [vercel.com/new](https://vercel.com/new), import repositori, dan biarkan pengaturan default:
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Output: `.next`
3. Tambahkan environment variable `NEXT_PUBLIC_SITE_URL` dengan domain final (opsional jika memakai domain Vercel), lalu deploy.
4. Tambahkan domain kustom melalui **Settings → Domains** bila diperlukan.

## Lisensi & merek

Kode proyek ini bebas digunakan dan dimodifikasi. Logo serta nama produk adalah merek dagang masing-masing pemiliknya dan hanya digunakan untuk identifikasi produk. Tautan selalu mengarah ke situs resmi.
