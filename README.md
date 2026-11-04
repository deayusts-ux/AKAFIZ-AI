# LEGACY AI

Direktori AI terkurasi: **150 tool**, **20 kategori**, tautan resmi, harga transparan, pencarian cepat, dan koleksi favorit yang tersimpan lokal — dengan portal akses privat dan halaman profil kreator.

Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Lucide React. 189 halaman di-prerender statis saat build, ditambah route dinamis untuk login, logout, dan notifikasi.

## Fitur

- **Beranda** dengan hero, pencarian, kategori populer, spotlight editor, dan daftar tool yang sedang trending.
- **Explore AI** dengan pencarian nama/fungsi/kategori, filter kategori dan harga (Gratis, Freemium, Berbayar), urutan, tampilan grid/list, serta URL yang selalu sinkron dengan filter.
- **Kategori** — 20 halaman kategori dengan daftar tool, statistik, filter, dan rekomendasi kategori terkait.
- **Halaman detail tool** berisi deskripsi, fitur, harga, rating editorial, alternatif serupa, serta tombol kunjungan ke situs resmi.
- **Trending** dengan peringkat editor dan skor popularitas yang dapat ditelusuri.
- **Favorit** tersimpan di `localStorage`, tersinkron antar-tab, dengan pencarian dan hapus semua.
- **Tentang Saya** — halaman profil kreator dengan cerita, prinsip kurasi, keahlian, dan tautan proyek nyata.
- **Portal akses** — halaman login sebelum masuk ke direktori, sesi HttpOnly bertanda tangan, tombol keluar, serta email login untuk pemilik dan pengunjung.
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
npm run build       # build produksi (189 halaman statis)
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
| `LEGACY_ACCESS_CODES` | Disarankan | Daftar kode akses, dipisahkan koma, spasi, atau baris baru. Jika diisi, menggantikan `LEGACY_ACCESS_CODE`. |
| `LEGACY_ACCESS_CODE` | Tidak | Satu kode akses. Dipakai bila `LEGACY_ACCESS_CODES` kosong. Default di source: `LEGACY-2026`. |
| `AUTH_SECRET` | Disarankan | Kunci HMAC untuk cookie sesi. Gunakan string acak panjang (min. 32 karakter). |
| `LEGACY_OWNER_EMAIL` | Tidak | Penerima riwayat login. Default: `deayusts@gmail.com`. |
| `GMAIL_USER` | Tidak | Alamat Gmail pengirim, default mengikuti `LEGACY_OWNER_EMAIL`. |
| `GMAIL_APP_PASSWORD` | Tidak | App Password Gmail 16 karakter. Bila diisi, email dikirim lewat Gmail SMTP atas nama `LEGACY AI` ke pemilik dan pengunjung. |
| `RESEND_API_KEY` | Tidak | Alternatif pengiriman lewat Resend. Tanpa domain terverifikasi, Resend hanya bisa mengirim ke pemilik. |
| `RESEND_FROM` | Tidak | Pengirim Resend, default `LEGACY AI <onboarding@resend.dev>`. |

Saat deploy di Vercel, `VERCEL_PROJECT_PRODUCTION_URL` terdeteksi otomatis sehingga sitemap dan metadata memakai domain produksi tanpa konfigurasi tambahan. Tetap disarankan mengisi `NEXT_PUBLIC_SITE_URL` bila memakai domain kustom.

## Portal akses & notifikasi login

Semua halaman direktori dilindungi `src/middleware.ts`. Pengunjung tanpa sesi diarahkan ke `/login`, lalu kembali ke halaman tujuan setelah berhasil masuk.

- Login memakai **email pengunjung + kode akses** yang dibagikan pemilik portal. Tidak ada login pihak ketiga.
- Sesi disimpan dalam cookie `HttpOnly` bertanda tangan HMAC: 12 jam, atau **1 tahun** bila "Tetap masuk di perangkat ini" dicentang (aktif secara default).
- `LEGACY_ACCESS_CODES` menerima banyak kode sekaligus. Setiap kode dalam daftar berlaku untuk semua pengunjung, dan pengunjung yang sudah berhasil masuk tidak perlu memasukkan kode lagi sampai sesi berakhir atau mereka keluar.
- Setiap login berhasil mengirim **dua email** (saat kanal email aktif) dengan nama pengirim `LEGACY AI`:
  - **Pemilik portal** menerima riwayat lengkap: waktu (WIB), email pengguna, perangkat, browser, IP, dan perkiraan lokasi.
  - **Pengunjung** menerima konfirmasi berisi **kode akses yang dipakai**, waktu, perangkat, dan browser, plus arahan untuk menghubungi pemilik bila tidak merasa login.
- Email konfirmasi pengunjung dan email riwayat pemilik via **Gmail/Resend** mencantumkan kode akses yang dipakai. Fallback **ShipMyForm** tidak mencantumkannya. Jangan teruskan email tersebut ke orang lain.
- Urutan kanal: **Gmail SMTP** (`GMAIL_APP_PASSWORD`) → **Resend** (`RESEND_API_KEY`) → **ShipMyForm** (fallback tanpa registrasi, hanya mengirim ke pemilik).

### Mengaktifkan notifikasi Gmail

Cara paling mudah adalah memakai Gmail pemilik portal:

1. Aktifkan **2-Step Verification** di akun Google `deayusts@gmail.com`.
2. Buka **Google Account → Security → App passwords**, buat password baru bernama `LEGACY AI`.
3. Salin 16 karakter yang muncul (boleh dengan atau tanpa spasi).
4. Isi environment:

   ```bash
   GMAIL_USER=deayusts@gmail.com
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```

5. Restart server lokal atau redeploy. Setelah itu login akan mengirim riwayat ke pemilik dan konfirmasi ke email pengunjung.

Alternatif **Resend**: isi `RESEND_API_KEY` dan `RESEND_FROM`. Untuk mengirim ke pengunjung, gunakan domain pengirim yang sudah terverifikasi; pengirim bawaan `onboarding@resend.dev` hanya dapat menjangkau email pemilik akun.

Fallback **ShipMyForm** mengirim email aktivasi pada pengiriman pertama. Buka kotak masuk pemilik, klik tautan aktivasi (berlaku 14 hari), lalu login sekali lagi. ShipMyForm tidak dapat mengirim konfirmasi ke pengunjung.

Portal ini adalah gerbang privasi ringan, bukan sistem akun multi-pengguna. Untuk keamanan lebih kuat, ganti kode akses, set `AUTH_SECRET`, dan gunakan App Password khusus yang bisa dicabut kapan saja.

Untuk menguji alur login secara lokal: jalankan `npm run dev`, buka `/login`, gunakan salah satu kode dari `LEGACY_ACCESS_CODES` (atau `LEGACY-2026` bila daftar kosong), lalu periksa inbox pemilik dan pengunjung.

## Struktur proyek

```text
src/
  app/                       # route App Router (home, explore, categories, tools, dll.)
    api/login/               # validasi kode akses, set cookie sesi, kirim notifikasi
    api/logout/              # hapus cookie sesi
    login/                   # halaman portal akses
    tentang-saya/            # halaman profil kreator
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
  lib/                       # tipe, util, auth sesi, notifikasi login, konfigurasi situs
  middleware.ts              # gerbang akses untuk seluruh halaman & API
public/logos/                # 150 logo brand lokal
public/profile/              # avatar halaman Tentang Saya
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
3. Tambahkan environment variable berikut di **Settings → Environment Variables**, lalu deploy:
   - `NEXT_PUBLIC_SITE_URL` — domain final (opsional bila memakai domain Vercel).
   - `LEGACY_ACCESS_CODES` — daftar kode akses, mis. `729418,583027,916482`. Alternatifnya `LEGACY_ACCESS_CODE` untuk satu kode.
   - `AUTH_SECRET` — string acak panjang untuk menandatangani cookie sesi.
   - `LEGACY_OWNER_EMAIL` — email penerima notifikasi login.
   - `RESEND_API_KEY` — opsional; tanpa ini notifikasi memakai ShipMyForm.
4. Aktifkan ShipMyForm dengan membuka email aktivasi dari login pertama (bila tidak memakai Resend).
5. Tambahkan domain kustom melalui **Settings → Domains** bila diperlukan.

## Lisensi & merek

Kode proyek ini bebas digunakan dan dimodifikasi. Logo serta nama produk adalah merek dagang masing-masing pemiliknya dan hanya digunakan untuk identifikasi produk. Tautan selalu mengarah ke situs resmi.
