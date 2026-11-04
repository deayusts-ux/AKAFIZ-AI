import type { Chapter } from "../types";

export const chapterFundamental: Chapter = {
  slug: "fundamental-crypto",
  order: 2,
  title: "Fundamental Crypto",
  shortTitle: "Fundamental",
  subtitle: "Menilai proyek dari supply, kegunaan, dan kualitas ekosistem",
  description:
    "Cara membaca market cap, FDV, tokenomics, utilitas token, likuiditas, aktivitas on-chain, tim, dan komunitas tanpa tertipu angka permukaan.",
  level: "Pemula",
  minutes: 42,
  icon: "Layers",
  accent: "#38bdf8",
  objectives: [
    "Menghitung dan menafsirkan market cap serta FDV.",
    "Membaca distribusi supply dan jadwal unlock.",
    "Membedakan hype dengan utilitas yang nyata.",
    "Memeriksa likuiditas, aktivitas on-chain, tim, dan komunitas.",
  ],
  sections: [
    {
      id: "market-cap",
      heading: "Market cap bukan harga, dan harga bukan valuasi",
      paragraphs: [
        "Market cap dihitung dari harga dikali circulating supply. Angka ini memberi gambaran kasar ukuran aset di pasar, tetapi bukan jumlah uang yang masuk ke proyek. Kenaikan market cap bisa terjadi hanya karena supply yang beredar bertambah.",
        "Harga satu koin tidak bisa dibandingkan langsung antarproyek. Koin seharga 0,01 dolar bisa memiliki market cap lebih besar daripada koin seharga 100 dolar jika supply-nya jauh lebih banyak. Karena itu, selalu lihat market cap dan supply, bukan nominal harga saja.",
        "FDV atau fully diluted valuation dihitung dengan harga dikali total supply maksimum. FDV penting untuk melihat tekanan potensial dari token yang belum beredar. Proyek dengan FDV sangat tinggi tetapi circulating supply kecil sering disebut low float, high FDV.",
      ],
      callout: {
        tone: "tip",
        title: "Rumus cepat",
        body: "Market cap = harga × circulating supply. FDV = harga × total supply. Bandingkan keduanya untuk melihat seberapa besar supply yang belum masuk pasar.",
      },
      visual: {
        kind: "tokenomics",
        caption:
          "Distribusi supply menentukan siapa yang memegang kendali dan kapan tekanan jual bisa muncul. Angka di atas adalah ilustrasi edukasi, bukan data proyek nyata.",
      },
    },
    {
      id: "supply",
      heading: "Circulating, total, dan max supply",
      paragraphs: [
        "Circulating supply adalah jumlah token yang benar-benar beredar dan dapat diperdagangkan. Total supply mencakup token yang sudah dibuat tetapi mungkin masih dikunci. Max supply adalah batas maksimum jika protokol menetapkannya.",
        "Selisih antara circulating dan total supply menunjukkan potensi dilusi. Jika 70 persen supply dikunci dan akan dibuka dalam dua tahun, harga bisa tertekan ketika penerima unlock menjual token mereka.",
        "Jadwal unlock biasanya tersedia di dashboard tokenomics atau dokumentasi resmi. Perhatikan tanggal besar, persentase supply yang dilepas, dan siapa penerimanya: tim, investor awal, treasury, atau komunitas.",
      ],
      bullets: [
        "Inflationary: supply bertambah terus, misalnya melalui reward block.",
        "Deflationary: supply berkurang melalui burn, tetapi belum tentu menaikkan harga.",
        "Vesting: token dikunci dan dilepas bertahap sesuai jadwal.",
        "Cliff: periode awal tanpa pelepasan, lalu unlock besar sekaligus.",
      ],
    },
    {
      id: "utility",
      heading: "Utilitas token: apa gunanya selain diperdagangkan?",
      paragraphs: [
        "Token yang baik memiliki alasan untuk dimiliki. Utilitas bisa berupa biaya jaringan, jaminan validator, akses layanan, hak tata kelola, atau insentif likuiditas. Tanpa utilitas yang jelas, harga hanya bergantung pada narasi dan aliran pembeli baru.",
        "Namun, utilitas saja tidak cukup. Token bisa dipakai untuk membayar gas tetapi supply-nya bertambah sangat cepat, sehingga nilainya tergerus. Sebaliknya, supply ketat tanpa permintaan nyata juga tidak menjamin harga naik.",
        "Pertanyaan yang perlu diajukan: siapa yang butuh token ini, mengapa mereka membelinya, bagaimana token ditangkap nilainya, dan apakah permintaan itu tumbuh bersama penggunaan produk?",
      ],
      callout: {
        tone: "info",
        title: "Uji tiga pertanyaan",
        body: "Jika token ini dihapus, apakah produk tetap berjalan? Jika ya, mungkin token tidak punya keterkaitan nilai yang kuat. Jika tidak, periksa apakah penggunaan itu benar-benar terjadi di luar insentif sementara.",
      },
    },
    {
      id: "likuiditas",
      heading: "Likuiditas: kemampuan pasar menyerap order",
      paragraphs: [
        "Likuiditas menunjukkan seberapa mudah aset dibeli atau dijual tanpa mengubah harga terlalu banyak. Pasar dengan order book tebal memiliki spread sempit dan slippage kecil. Pasar tipis membuat order biasa pun bisa menggerakkan harga.",
        "Di DEX, likuiditas terkonsentrasi di pool. Jika nilai pool kecil dibanding market cap, harga mudah digerakkan dan risiko manipulasi meningkat. Periksa total value locked, kedalaman pool, dan apakah likuiditas dikunci.",
        "Volume tinggi tidak otomatis berarti likuid. Volume bisa berasal dari wash trading atau bot. Bandingkan volume dengan kedalaman order book dan jumlah transaksi unik untuk mendapatkan gambaran lebih jujur.",
      ],
    },
    {
      id: "onchain",
      heading: "Aktivitas on-chain dan kualitas komunitas",
      paragraphs: [
        "Metrik on-chain memberi bukti penggunaan yang tidak bisa diklaim begitu saja. Alamat aktif, jumlah transaksi, biaya yang dibayarkan, total value locked, dan pertumbuhan pengguna baru membantu melihat apakah jaringan benar-benar dipakai.",
        "Hati-hati dengan metrik yang bisa digelembungkan. Airdrop farming, bot, dan transaksi kecil dapat menaikkan jumlah alamat tanpa memberi nilai ekonomi. Lihat juga retensi pengguna dan nilai transaksi rata-rata.",
        "Untuk tim dan komunitas, periksa identitas, rekam jejak, transparansi treasury, serta kualitas diskusi. Komunitas yang hanya berisi ajakan beli dan janji harga adalah tanda bahaya, bukan tanda kekuatan.",
      ],
      bullets: [
        "Developer aktif: commit dan pembaruan produk yang konsisten.",
        "Treasury transparan: alamat publik dan laporan penggunaan dana.",
        "Audit: laporan pihak independen, bukan sekadar logo di website.",
        "Komunitas: diskusi teknis dan kritik yang sehat, bukan hanya hype.",
      ],
    },
    {
      id: "narrative",
      heading: "Narasi, sektor, dan siklus",
      paragraphs: [
        "Pasar crypto bergerak dalam narasi: layer 1, DeFi, AI, real world assets, dan lain-lain. Narasi dapat mendorong aliran dana besar dalam waktu singkat, tetapi juga cepat ditinggalkan ketika cerita baru muncul.",
        "Fundamental membantu membedakan proyek yang punya fondasi dari proyek yang hanya menumpang tren. Sebuah proyek di sektor panas tetap bisa gagal jika produknya tidak dipakai dan supply-nya terus bertambah.",
        "Gabungkan analisis fundamental dengan pemahaman pasar. Fundamental menjawab apa yang dibangun, sedangkan analisis grafik dan volume menjawab bagaimana pasar meresponsnya saat ini.",
      ],
      callout: {
        tone: "warning",
        title: "Waspada janji pasti",
        body: "Proyek yang menjanjikan keuntungan tetap, APY tidak wajar, atau harga pasti naik adalah tanda risiko sangat tinggi. Tidak ada imbal hasil tinggi tanpa risiko yang sepadan.",
      },
    },
  ],
  takeaways: [
    "Market cap dan FDV memberi konteks ukuran; harga nominal tidak.",
    "Selisih circulating dan total supply menunjukkan potensi dilusi.",
    "Utilitas token harus terhubung dengan permintaan nyata.",
    "Likuiditas memengaruhi slippage dan risiko manipulasi.",
    "Metrik on-chain dan kualitas tim lebih penting daripada hype.",
  ],
  quiz: [
    {
      id: "q2-1",
      chapter: "fundamental-crypto",
      question: "Bagaimana cara menghitung market cap?",
      options: [
        "Harga × total supply maksimum",
        "Harga × circulating supply",
        "Volume 24 jam ÷ harga",
        "Jumlah holder × harga",
      ],
      answer: 1,
      explanation:
        "Market cap menggunakan supply yang beredar: harga dikali circulating supply. FDV yang menggunakan total atau max supply.",
    },
    {
      id: "q2-2",
      chapter: "fundamental-crypto",
      question: "Apa yang ditunjukkan FDV?",
      options: [
        "Nilai proyek jika seluruh supply maksimum beredar pada harga saat ini",
        "Jumlah uang yang sudah masuk ke proyek",
        "Volume perdagangan harian",
        "Jumlah token yang dibakar hari ini",
      ],
      answer: 0,
      explanation:
        "FDV adalah harga dikali total atau max supply. Angka ini membantu memperkirakan valuasi penuh setelah semua token beredar.",
    },
    {
      id: "q2-3",
      chapter: "fundamental-crypto",
      question: "Mengapa proyek low float high FDV berisiko?",
      options: [
        "Karena harganya selalu turun setiap hari",
        "Karena supply yang belum beredar dapat menimbulkan tekanan jual saat unlock",
        "Karena tidak bisa diperdagangkan",
        "Karena tidak memiliki smart contract",
      ],
      answer: 1,
      explanation:
        "Circulating supply kecil membuat harga mudah bergerak, sementara FDV besar berarti masih banyak token yang bisa masuk pasar dan menekan harga saat unlock.",
    },
    {
      id: "q2-4",
      chapter: "fundamental-crypto",
      question: "Apa itu vesting?",
      options: [
        "Proses menukar token ke dolar",
        "Pelepasan token secara bertahap sesuai jadwal yang ditentukan",
        "Penyimpanan token di cold wallet",
        "Penghapusan token dari blockchain",
      ],
      answer: 1,
      explanation:
        "Vesting mengunci token dan melepaskannya bertahap. Jadwal dan penerimanya penting untuk menilai potensi tekanan jual.",
    },
    {
      id: "q2-5",
      chapter: "fundamental-crypto",
      question: "Contoh utilitas token yang sehat adalah...",
      options: [
        "Hanya digunakan untuk giveaway",
        "Membayar biaya jaringan dan memberikan hak tata kelola yang nyata",
        "Dijual kembali ke tim dengan harga tetap",
        "Tidak memiliki fungsi apa pun",
      ],
      answer: 1,
      explanation:
        "Utilitas yang sehat menghubungkan token dengan penggunaan produk, seperti biaya jaringan, jaminan, akses, atau tata kelola.",
    },
    {
      id: "q2-6",
      chapter: "fundamental-crypto",
      question: "Apa yang dimaksud likuiditas pasar?",
      options: [
        "Jumlah token yang dibakar",
        "Kemampuan pasar menyerap order tanpa menggeser harga terlalu besar",
        "Jumlah follower di media sosial",
        "Kecepatan pembuatan blok",
      ],
      answer: 1,
      explanation:
        "Likuiditas menggambarkan kedalaman pasar. Semakin likuid, semakin kecil slippage dan semakin mudah transaksi besar dilakukan.",
    },
    {
      id: "q2-7",
      chapter: "fundamental-crypto",
      question: "Mengapa volume tinggi belum tentu likuid?",
      options: [
        "Karena volume tidak pernah dicatat",
        "Karena volume bisa digelembungkan oleh wash trading atau bot",
        "Karena volume hanya dihitung di DEX",
        "Karena volume selalu sama dengan market cap",
      ],
      answer: 1,
      explanation:
        "Volume bisa dimanipulasi. Kedalaman order book, spread, dan jumlah transaksi unik perlu diperiksa untuk menilai likuiditas sebenarnya.",
    },
    {
      id: "q2-8",
      chapter: "fundamental-crypto",
      question: "Metrik on-chain mana yang paling langsung menunjukkan penggunaan jaringan?",
      options: [
        "Jumlah postingan di media sosial",
        "Alamat aktif dan transaksi yang membayar biaya jaringan",
        "Harga token di bursa",
        "Jumlah logo partner di website",
      ],
      answer: 1,
      explanation:
        "Alamat aktif dan transaksi nyata yang membayar biaya menunjukkan aktivitas penggunaan, meski tetap perlu waspada terhadap bot dan insentif sementara.",
    },
    {
      id: "q2-9",
      chapter: "fundamental-crypto",
      question: "Apa tanda bahaya dalam distribusi token?",
      options: [
        "Sebagian besar supply dipegang tim dan investor dengan unlock besar dalam waktu dekat",
        "Supply beredar tersebar luas dan jadwal vesting transparan",
        "Treasury memiliki alamat publik",
        "Laporan tokenomics diperbarui berkala",
      ],
      answer: 0,
      explanation:
        "Konsentrasi supply pada pihak internal dengan unlock besar meningkatkan risiko tekanan jual dan kendali terpusat.",
    },
    {
      id: "q2-10",
      chapter: "fundamental-crypto",
      question: "Mengapa narasi saja tidak cukup untuk menilai proyek?",
      options: [
        "Karena narasi tidak pernah memengaruhi harga",
        "Karena tanpa produk, pengguna, dan tokenomics yang sehat, narasi bisa hilang dan meninggalkan harga tanpa dukungan",
        "Karena narasi hanya ada di pasar saham",
        "Karena narasi selalu dibuat oleh regulator",
      ],
      answer: 1,
      explanation:
        "Narasi dapat mendorong perhatian, tetapi fondasi produk, penggunaan, dan supply menentukan apakah perhatian itu berubah menjadi nilai yang bertahan.",
    },
  ],
};
