# LEGACY AI

Direktori AI terkurasi: **150 tool**, **20 kategori**, tautan resmi, harga transparan, pencarian cepat, dan koleksi favorit yang tersimpan lokal — ditambah **Explore Idea** (58 sumber referensi di 14 bidang), **panduan AI Humanizer dengan Ruang Tulis di dalam situs**, **Crypto Academy**, e-book interaktif 10 bab tentang fundamental crypto dan candlestick, lengkap dengan portal akses privat dan halaman profil kreator.

Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Lucide React. 295 halaman di-prerender statis saat build, ditambah route dinamis untuk login, logout, permintaan kode, dan notifikasi.

## Fitur

- **Beranda** dengan hero, pencarian, kategori populer, spotlight editor, dan daftar tool yang sedang trending.
- **Explore AI** dengan pencarian nama/fungsi/kategori, filter kategori dan harga (Gratis, Freemium, Berbayar), urutan, tampilan grid/list, serta URL yang selalu sinkron dengan filter.
- **Explore Idea** — direktori 58 sumber referensi di 14 bidang (arsitektur, akuntansi, informatika, sipil, hukum, kesehatan, bisnis, desain, psikologi, pertanian, elektro, pendidikan, komunikasi, sains) dengan pencarian, filter kategori dan jenis, urutan, tampilan grid/list, serta halaman detail per sumber (detail di bawah).
- **AI Humanizer** — panduan 10 alat penulisan ulang dan penyuntingan dengan tautan resmi, tiga rekomendasi untuk tugas kuliah, langkah penggunaan yang sehat, dan catatan tegas bahwa tidak ada alat yang menjamin lolos AI detector — plus **Ruang Tulis** yang bisa dipakai tanpa keluar dari LEGACY (detail di bawah).
- **Kategori** — 20 halaman kategori dengan daftar tool, statistik, filter, dan rekomendasi kategori terkait.
- **Halaman detail tool** berisi deskripsi, fitur, harga, rating editorial, alternatif serupa, serta tombol kunjungan ke situs resmi.
- **Trending** dengan peringkat editor dan skor popularitas yang dapat ditelusuri.
- **Favorit** tersimpan di `localStorage`, tersinkron antar-tab, dengan pencarian dan hapus semua.
- **Tentang Saya** — halaman profil kreator dengan cerita, prinsip kurasi, keahlian, dan tautan proyek nyata.
- **Crypto Academy** — e-book interaktif 10 bab, Candlestick Lab, simulasi baca candle, 100 soal kuis, glosarium A–Z, dasbor progres, dan game demo Bitcoin (detail di bawah).
- **Portal akses** — halaman login sebelum masuk ke direktori, tombol **Minta kode** yang langsung menampilkan kode akses pribadi di formulir, sesi HttpOnly bertanda tangan, tombol keluar, serta email login untuk pemilik dan pengunjung.
- **Command palette** (`⌘K` / `Ctrl+K` atau tombol cari) untuk navigasi dan pencarian cepat.
- **Vercel Analytics** — komponen `@vercel/analytics` terpasang di layout; data kunjungan tampil di dashboard Vercel setelah deploy.
- **Dark / light mode** tanpa flash saat halaman dimuat, responsif hingga mobile, animasi yang menghormati `prefers-reduced-motion`.
- **SEO lengkap**: metadata per halaman, canonical, Open Graph image, JSON-LD, sitemap, robots, dan manifest.
- **Tanpa fake link**: setiap tautan eksternal mengarah ke domain resmi produk dan dibuka di tab baru; tombol utama AI Humanizer membuka ruang kerja lokal di dalam LEGACY.

Favorit bersifat lokal di browser — tidak ada akun, server penyimpanan, atau pelacakan pengguna.

## Explore Idea

Direktori sumber ide dan referensi untuk 14 bidang studi dan profesi. Setiap sumber hanya tampil sekali meski relevan di beberapa bidang, dan seluruh tautan menuju situs resmi.

**Bidang & sumber**
1. Arsitektur & Desain Bangunan — ArchDaily, Dezeen, Divisare, Designboom, Behance
2. Akuntansi & Keuangan — AccountingCoach, CFI, Investopedia, IFRS, Khan Academy
3. Teknik Informatika & Komputer — freeCodeCamp, W3Schools, GitHub, Stack Overflow, MDN
4. Teknik Sipil — The Constructor, Civil Engineering Web, Structurae, ASCE
5. Hukum — Hukumonline, Peraturan BPK, JDIHN, Google Scholar
6. Kedokteran & Kesehatan — PubMed, MedlinePlus, WHO, NCBI
7. Manajemen & Bisnis — Harvard Business Review, Strategyzer, HubSpot, Shopify Blog, McKinsey
8. Desain Grafis & DKV — Behance, Dribbble, Awwwards, Freepik, Google Fonts
9. Psikologi — APA, Psychology Today, Google Scholar, Simply Psychology
10. Pertanian & Peternakan — FAO, Kementerian Pertanian, Portal Pertanian, ScienceDirect
11. Teknik Elektro & Mesin — IEEE, All About Circuits, Engineering ToolBox, GrabCAD
12. Pendidikan & Keguruan — Edutopia, Khan Academy, TeacherMade, Coursera
13. Ilmu Komunikasi & Jurnalistik — Poynter, Reuters, AP Stylebook, Canva
14. Matematika & Sains — Wolfram Alpha, Desmos, GeoGebra, Khan Academy, Nature

**Fitur**
- **Halaman utama** `/explore-idea` — pencarian nama/deskripsi/kategori/tag, filter bidang dan jenis sumber (referensi, pembelajaran, alat, portofolio, berita, database), urutan relevansi/nama/kategori, tampilan grid/list, dan tombol muat lebih banyak.
- **Peta bidang** `/explore-idea/kategori` — 14 kartu bidang dengan jumlah sumber dan tautan cepat.
- **Halaman bidang** `/explore-idea/kategori/[slug]` — daftar sumber bidang tersebut, pencarian dan filter jenis, serta tautan ke bidang lain.
- **Halaman sumber** `/explore-idea/[slug]` — deskripsi, kegunaan, sorotan, tag, bidang, jenis, bahasa, domain resmi, catatan lisensi, dan sumber terkait.
- **Sinkron dengan URL** — filter tersimpan di query (`q`, `category`, `kind`, `sort`) sehingga tautan hasil pencarian bisa dibagikan dan dibuka ulang.
- Tombol **Kunjungi** dan **Buka situs resmi** membuka domain resmi di tab baru dengan `rel="noopener noreferrer"`.

LEGACY AI tidak berafiliasi dengan sumber-sumber tersebut. Materi dan lisensi setiap sumber mengikuti ketentuan penyedianya; halaman detail selalu mengingatkan untuk memeriksanya.

## AI Humanizer

Halaman `/ai-humanizer` merangkum 10 alat untuk menulis ulang, merapikan, dan menyunting tulisan. Tombol **Kunjungi di LEGACY** membuka mode kerja alat tersebut di Ruang Tulis; tombol **Situs resmi** tetap tersedia di sampingnya.

| Alat | Keunggulan |
| --- | --- |
| QuillBot | Parafrase dan memperbaiki alur tulisan |
| Grammarly | Memperbaiki gaya bahasa dan tata bahasa |
| Phrasly AI | Menyusun ulang kalimat |
| Undetectable AI | Penulisan ulang teks |
| HIX AI | Membantu penulisan dan parafrase |
| WriteHuman | Mengubah gaya penulisan |
| StealthWriter | Alternatif penulisan ulang |
| Smodin | Parafrase berbagai jenis teks |
| Wordtune | Membuat kalimat lebih mengalir |
| Ryne AI | Membantu proses penulisan akademik |

**Rekomendasi untuk tugas kuliah**
1. **QuillBot** — untuk memperbaiki susunan kalimat.
2. **Grammarly** — untuk memperbaiki tata bahasa.
3. **Wordtune** — untuk membuat tulisan lebih mengalir.

**Catatan penting:** tidak ada AI Humanizer yang bisa menjamin tulisan lolos AI Detector atau Turnitin. Gunakan alat ini untuk memperbaiki keterbacaan, mempertahankan makna, dan memastikan tulisan sesuai pemahaman sendiri; aturan integritas akademik tetap berlaku. Daftar disusun berdasarkan fitur dan perbandingan alat, bukan peringkat hasil pengujian independen.

### Ruang Tulis LEGACY

`/ai-humanizer/studio` adalah editor yang berjalan sepenuhnya di browser. Sepuluh alat punya mode kerja masing-masing (`?tool=quillbot`, `?tool=grammarly`, dst.) dengan alur langkah yang berbeda:

- **Rapikan** — spasi ganda, spasi sebelum tanda baca, kata terulang, huruf awal kalimat.
- **Padatkan** — frasa bertele-tele diganti bentuk ringkas (mis. “pada saat ini” → “saat ini”).
- **Formalkan** — kata percakapan dan singkatan tidak baku diganti padanan baku (mis. “nggak” → “tidak”).
- **Pecah kalimat** — kalimat di atas 28 kata dipecah pada penghubung yang aman.

Fitur pendukung: analisis kata/kalimat/paragraf, perkiraan keterbacaan dari panjang kalimat dan kata, skor kerapian mesin lokal (bukan skor AI detector), riwayat kembali, penyimpanan draf di `localStorage`, salin, dan unduh `.txt`. Tidak ada teks yang dikirim ke server. Ruang Tulis bukan salinan layanan pihak ketiga; untuk fitur berbasis model, situs resmi tetap ditautkan. Halaman detail QuillBot, Grammarly, dan Wordtune di katalog utama juga menampilkan pintasan ke mode tulis ini.

## Crypto Academy

E-book interaktif berbahasa Indonesia dengan nuansa terminal trading. Seluruh chart memakai **data simulasi** dan diberi label jelas; tidak ada klaim harga real-time, sinyal beli/jual, atau janji keuntungan.

**Materi — 10 bab**
1. Pengenalan Crypto
2. Fundamental Crypto
3. Memahami Pasar
4. Memahami Candlestick
5. Pola Candlestick (11 pola: Doji, Hammer, Inverted Hammer, Shooting Star, Hanging Man, Bullish Engulfing, Bearish Engulfing, Morning Star, Evening Star, Pin Bar, Marubozu)
6. Support & Resistance
7. Volume
8. Dasar Analisis Grafik
9. Manajemen Risiko
10. Membaca Berita Fundamental (CPI, PPI, NFP, FOMC, suku bunga Fed, inflasi AS, dan dampaknya ke crypto)

**Fitur**
- **Reader e-book** `/crypto/ebook/[slug]` — penjelasan bertahap, figur chart, callout, daftar isi sticky, bookmark, tandai selesai, mode baca, cetak/PDF, dan navigasi bab sebelumnya/berikutnya.
- **Candlestick Lab** `/crypto/candlestick-lab` — chart SVG interaktif dengan zoom, pan, hover OHLC, pemilihan candle, volume, 6 timeframe (M1–D1), 4 preset pola, dan mode belajar.
- **Simulasi** `/crypto/simulation` — 8 latihan membaca candle dengan umpan balik benar/salah, alasan, dan ilustrasi.
- **Kuis** `/crypto/quiz` — 10 soal per bab (100 soal), skor otomatis, pembahasan tiap jawaban, dan nilai akhir.
- **Glosarium** `/crypto/glossary` — 59 istilah A–Z dengan definisi dan contoh, pencarian, filter huruf dan kategori.
- **Progres** `/crypto/progress` — ringkasan bab selesai, rata-rata kuis, simulasi, bookmark, dan streak game dari `localStorage`.
- **Game demo** `/crypto/game` — saldo virtual $10.000, prediksi naik/turun 5 detik memakai harga API bursa bila tersedia, atau harga simulasi berlabel jelas bila tidak.
- **Tentang** `/crypto/about` — prinsip data, batasan, dan 8 tautan resmi untuk belajar lanjut (bitcoin.org, ethereum.org, Binance Academy, TradingView, BLS, Federal Reserve, SEC, CoinMarketCap).

Progres belajar disimpan di `localStorage` dengan kunci `legacy-ai:crypto-progress:v1`. Tidak ada data yang dikirim ke server.

Disklaimer edukasi ditampilkan di setiap halaman: materi ini bukan saran investasi atau trading.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain:

```bash
npm run typecheck   # TypeScript tanpa emit
npm run build       # build produksi (295 halaman statis)
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

- Login memakai **email pengunjung + kode akses**. Kode bisa berasal dari daftar `LEGACY_ACCESS_CODES`, atau diminta sendiri lewat tombol **Minta kode**. Tidak ada login pihak ketiga.
- **Minta kode** membuat kode unik yang **langsung ditampilkan dan diisikan otomatis** di formulir, jadi pengunjung tidak perlu membuka Gmail. Kode terikat pada email yang diisi, berlaku **7 hari**, dan dibuat dari `AUTH_SECRET` — bukan salah satu kode permanen, sehingga daftar kode utama tidak ikut terekspos.
- Bila Gmail/Resend aktif, salinan kode juga dikirim ke email tersebut (maksimal sekali per 5 menit). Kegagalan email tidak menghalangi login karena kode sudah tampil di halaman.
- Permintaan kode dibatasi 4 kali per 15 menit per IP.
- Karena kode tampil langsung, portal ini adalah gerbang privasi ringan, bukan pembatas akses yang kuat.
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

Untuk menguji alur login secara lokal: jalankan `npm run dev`, buka `/login`, isi email aktif, lalu tekan **Minta kode**. Kode langsung muncul, terisi otomatis, dan bisa dipakai saat itu juga — tidak perlu membuka email. Kode permanen dari `LEGACY_ACCESS_CODES` (atau `LEGACY-2026` bila daftar kosong) tetap bisa dipakai langsung.

## Struktur proyek

```text
src/
  app/                       # route App Router (home, explore, categories, tools, dll.)
    api/login/               # validasi kode akses, set cookie sesi, kirim notifikasi
    api/access-code/         # kirim kode akses pribadi ke email pengunjung
    api/logout/              # hapus cookie sesi
    login/                   # halaman portal akses
    tentang-saya/            # halaman profil kreator
    crypto/                  # Crypto Academy (e-book, lab, simulasi, kuis, glosarium, progres, game, tentang)
    explore-idea/            # Explore Idea: direktori, peta bidang, kategori, detail sumber
    ai-humanizer/             # panduan 10 alat + Ruang Tulis (/ai-humanizer/studio)
    ai-humanizer/studio/      # editor penyuntingan lokal di browser
    categories/[slug]/       # 20 halaman kategori statis
    tools/[slug]/            # 150 halaman detail tool statis
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  components/                # komponen UI reusable (cards, header, filters, command menu, dll.)
    crypto/                  # chart SVG, reader tools, kuis, simulasi, glosarium, game, progres
    idea/                    # kartu, baris, dan panel filter Explore Idea
    humanizer/               # Ruang Tulis: editor, aksi, analisis, pratinjau hasil
    providers/               # favorites + toast context
    monogram.tsx             # monogram inisial berwarna untuk kartu sumber/alat
  data/
    tools.ts                 # katalog utama 150 tool
    categories.ts            # 20 kategori
    logos.ts                 # peta logo lokal per slug
    ideas.ts                 # 58 sumber referensi Explore Idea
    idea-categories.ts       # 14 bidang Explore Idea
    humanizer-tools.ts       # 10 alat AI Humanizer + rekomendasi
    humanizer-studio.ts      # preset langkah per alat untuk Ruang Tulis
    crypto/                  # 10 bab, 11 pola, 100 soal, 8 simulasi, 59 istilah
  lib/
    crypto/market.ts         # generator candle simulasi, timeframe, agregasi, formatter
    writing/analyze.ts       # mesin lokal: rapikan, padatkan, formalkan, pecah, analisis
    idea-types.ts, idea-icons.ts # tipe sumber dan peta ikon bidang
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
- Sumber Explore Idea adalah situs resmi lembaga, penerbit, atau komunitas terkait. Tidak ada peringkat, jumlah pengguna, atau klaim afiliasi yang dibuat-buat; deskripsi ditulis sebagai ringkasan editorial. Beberapa sumber sengaja muncul di lebih dari satu bidang (mis. Behance, Khan Academy, Google Scholar) dan dihitung sekali dalam total 58 sumber.
- Daftar AI Humanizer disusun dari fitur dan perbandingan umum, bukan pengujian independen. Tidak ada klaim bahwa tulisan dijamin lolos AI detector atau Turnitin; halaman menekankan penggunaan untuk keterbacaan dan integritas akademik.

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
6. Setelah deploy, buka tab **Analytics** di project Vercel. Komponen `<Analytics />` dari `@vercel/analytics` sudah terpasang, jadi kunjungan halaman langsung tercatat tanpa environment variable tambahan.

## Lisensi & merek

Kode proyek ini bebas digunakan dan dimodifikasi. Logo serta nama produk adalah merek dagang masing-masing pemiliknya dan hanya digunakan untuk identifikasi produk. Tautan selalu mengarah ke situs resmi.
