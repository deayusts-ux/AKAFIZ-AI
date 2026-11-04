import type { Chapter } from "../types";

export const chapterPengenalan: Chapter = {
  slug: "pengenalan-crypto",
  order: 1,
  title: "Pengenalan Crypto",
  shortTitle: "Pengenalan",
  subtitle: "Apa yang sebenarnya kamu beli, dan mengapa harganya bergerak?",
  description:
    "Fondasi sebelum menyentuh chart: cara kerja blockchain, perbedaan Bitcoin dan altcoin, fungsi wallet, private key, bursa, serta risiko yang harus dipahami sejak hari pertama.",
  level: "Pemula",
  minutes: 35,
  icon: "Bitcoin",
  accent: "#f7931a",
  objectives: [
    "Menjelaskan cryptocurrency dan blockchain dengan bahasa sederhana.",
    "Membedakan Bitcoin, altcoin, token, dan stablecoin.",
    "Memahami peran wallet, private key, dan seed phrase.",
    "Mengenali risiko utama sebelum membeli aset apa pun.",
  ],
  sections: [
    {
      id: "apa-itu-crypto",
      heading: "Apa itu cryptocurrency?",
      paragraphs: [
        "Cryptocurrency adalah aset digital yang dipindahkan dan diverifikasi melalui jaringan komputer dengan kriptografi. Tidak ada bank sentral yang mencatat saldo kamu; catatan kepemilikan disimpan bersama oleh banyak komputer yang menjalankan aturan protokol yang sama.",
        "Istilah crypto berasal dari cryptographic, yaitu teknik matematika untuk mengunci data, membuktikan kepemilikan, dan memastikan catatan tidak bisa diubah diam-diam. Karena itu, memindahkan Bitcoin berarti menandatangani transaksi dengan kunci pribadi, bukan mengirim email kepada admin.",
        "Nilai crypto tidak berasal dari kertas atau gedung bank, melainkan dari kombinasi kelangkaan aturan, kegunaan jaringan, likuiditas pasar, dan kepercayaan peserta. Inilah sebabnya harga bisa naik sangat cepat, tetapi juga turun sangat dalam ketika kepercayaan atau likuiditas berubah.",
      ],
      callout: {
        tone: "info",
        title: "Crypto bukan sekadar harga",
        body: "Di balik setiap chart ada jaringan, aturan supply, pemegang aset, dan likuiditas. Memahami lapisan ini membuatmu tidak mudah panik hanya karena satu candle merah.",
      },
    },
    {
      id: "blockchain",
      heading: "Blockchain: buku besar yang dijaga bersama",
      paragraphs: [
        "Blockchain adalah buku besar digital yang mencatat transaksi dalam blok-blok berurutan. Setiap blok menyimpan sidik jari kriptografi dari blok sebelumnya, sehingga mengubah satu transaksi lama berarti harus mengubah seluruh rantai sesudahnya.",
        "Karena catatan direplikasi ke banyak node, tidak ada satu pihak yang bisa menghapus riwayat dengan seenaknya. Untuk mengubah data, penyerang harus menguasai sebagian besar kekuatan jaringan, yang biayanya sangat besar pada jaringan besar seperti Bitcoin.",
        "Blockchain bukan hanya untuk uang. Jaringan seperti Ethereum menjalankan smart contract, yaitu program yang berjalan otomatis sesuai aturan. Dari sinilah lahir token, aplikasi keuangan terdesentralisasi, dan NFT.",
      ],
      bullets: [
        "Node: komputer yang menyimpan salinan blockchain dan memverifikasi transaksi.",
        "Blok: kumpulan transaksi yang disepakati dan ditambahkan ke rantai.",
        "Konsensus: mekanisme agar node sepakat, misalnya proof of work atau proof of stake.",
        "Smart contract: program on-chain yang mengeksekusi aturan tanpa perantara.",
      ],
    },
    {
      id: "bitcoin-altcoin",
      heading: "Bitcoin, altcoin, token, dan stablecoin",
      paragraphs: [
        "Bitcoin adalah aset crypto pertama dan tetap menjadi acuan pasar. Supply-nya dibatasi 21 juta koin, dan penambahan supply baru menurun setiap sekitar empat tahun melalui halving. Karena itu Bitcoin sering diposisikan sebagai aset moneter digital.",
        "Altcoin adalah istilah untuk aset selain Bitcoin. Ethereum, Solana, dan Chainlink memiliki jaringan serta kegunaan masing-masing. Token biasanya dibangun di atas blockchain lain dan punya aturan supply sendiri, kadang tanpa jaringan mandiri.",
        "Stablecoin berusaha menjaga nilai tetap dekat dengan mata uang fiat, umumnya dolar. Stablecoin memudahkan transaksi dan penyimpanan nilai sementara, tetapi tetap punya risiko penerbit, cadangan, dan regulasi yang harus dibaca, bukan dianggap bebas risiko.",
      ],
      visual: {
        kind: "market-structure",
        caption:
          "Pasar crypto bergerak dalam siklus: akumulasi, tren naik, distribusi, lalu tren turun. Memahami posisi siklus membantu menafsirkan candle, bukan menebak harga.",
      },
    },
    {
      id: "wallet",
      heading: "Wallet, private key, dan seed phrase",
      paragraphs: [
        "Wallet bukan tempat menyimpan koin seperti dompet fisik. Wallet adalah alat yang menyimpan kunci dan menandatangani transaksi. Saldo sebenarnya ada di blockchain; wallet hanya membuktikan bahwa kamu berhak memindahkannya.",
        "Private key adalah rahasia yang memberi kendali penuh atas alamat. Seed phrase, umumnya 12 atau 24 kata, adalah cadangan untuk memulihkan private key. Siapa pun yang mengetahui seed phrase dapat mengambil seluruh aset, tanpa perlu password tambahan.",
        "Karena itu, seed phrase harus ditulis offline, tidak difoto, tidak disimpan di notes cloud, dan tidak pernah dikirim ke siapa pun. Layanan resmi tidak akan meminta seed phrase melalui chat, email, atau telepon.",
      ],
      callout: {
        tone: "warning",
        title: "Aturan yang tidak boleh dilanggar",
        body: "Jangan pernah membagikan seed phrase atau private key. Tidak ada giveaway, verifikasi akun, atau bantuan customer service yang membutuhkannya.",
      },
      bullets: [
        "Hot wallet: terhubung internet, praktis untuk transaksi kecil.",
        "Cold wallet: perangkat offline, lebih aman untuk simpanan jangka panjang.",
        "Custodial: kunci dipegang bursa, kamu bergantung pada mereka.",
        "Non-custodial: kamu memegang kunci, tanggung jawab penuh ada di kamu.",
      ],
    },
    {
      id: "bursa",
      heading: "Bursa, order book, dan cara transaksi terjadi",
      paragraphs: [
        "Bursa terpusat atau centralized exchange (CEX) mempertemukan pembeli dan penjual melalui order book. Kamu menyetor dana, membuat order beli atau jual, lalu bursa mencocokkan order tersebut. Bursa biasanya memegang kunci aset selama dana berada di akun mereka.",
        "Decentralized exchange (DEX) menggunakan smart contract dan liquidity pool. Kamu menukar token langsung dari wallet, tanpa menyerahkan kunci kepada pihak lain. Konsekuensinya, kamu bertanggung jawab penuh atas jaringan, slippage, dan kontrak yang mungkin berisiko.",
        "Order market langsung tereksekusi pada harga terbaik yang tersedia, sedangkan order limit menunggu di harga tertentu. Memahami perbedaan ini penting agar kamu tidak mendapat harga jauh dari yang dibayangkan saat pasar sedang tipis.",
      ],
    },
    {
      id: "risiko",
      heading: "Risiko yang harus diterima sebelum mulai",
      paragraphs: [
        "Crypto adalah aset yang sangat fluktuatif. Penurunan 30 sampai 50 persen pernah terjadi berulang kali, bahkan pada aset besar. Tidak ada jaminan harga naik, dan tidak ada yang bisa memastikan arah pasar berikutnya.",
        "Selain risiko harga, ada risiko kustodi (bursa bangkrut atau diretas), risiko kontrak (bug atau penipuan), risiko likuiditas (sulit keluar tanpa menggeser harga), dan risiko regulasi. Setiap risiko harus diimbangi dengan ukuran posisi yang wajar.",
        "Gunakan hanya dana yang siap kehilangan sebagian atau seluruhnya. Tujuan belajar fundamental dan candlestick bukan untuk menjamin profit, melainkan untuk membuat keputusan lebih terukur dan mengurangi kesalahan yang bisa dihindari.",
      ],
      callout: {
        tone: "warning",
        title: "Bukan nasihat investasi",
        body: "Seluruh materi di Crypto Academy bersifat edukasi. Tidak ada sinyal beli atau jual. Keputusan dan risiko sepenuhnya milikmu.",
      },
    },
  ],
  takeaways: [
    "Crypto adalah aset digital yang diverifikasi jaringan, bukan saldo di bank.",
    "Blockchain mencatat riwayat secara terdistribusi sehingga sulit diubah.",
    "Bitcoin, altcoin, token, dan stablecoin punya karakter serta risiko berbeda.",
    "Seed phrase adalah kunci utama; kebocoran berarti kehilangan aset.",
    "Volatilitas tinggi menuntut ukuran posisi dan ekspektasi yang realistis.",
  ],
  quiz: [
    {
      id: "q1-1",
      chapter: "pengenalan-crypto",
      question: "Apa definisi paling tepat untuk cryptocurrency?",
      options: [
        "Saham perusahaan teknologi yang diperdagangkan secara digital",
        "Aset digital yang diverifikasi melalui kriptografi pada buku besar terdistribusi",
        "Mata uang kertas yang dicetak oleh bank sentral",
        "Program komputer yang selalu menghasilkan keuntungan",
      ],
      answer: 1,
      explanation:
        "Cryptocurrency adalah aset digital yang kepemilikan dan transaksinya diverifikasi dengan kriptografi pada jaringan terdistribusi, bukan saham atau mata uang kertas.",
    },
    {
      id: "q1-2",
      chapter: "pengenalan-crypto",
      question: "Mengapa riwayat transaksi di blockchain sulit diubah?",
      options: [
        "Karena semua transaksi disimpan di satu server rahasia",
        "Karena setiap blok terhubung dengan sidik jari kriptografi blok sebelumnya dan direplikasi ke banyak node",
        "Karena transaksi hanya bisa diubah oleh pemilik wallet",
        "Karena blockchain tidak mencatat transaksi lama",
      ],
      answer: 1,
      explanation:
        "Setiap blok memuat hash blok sebelumnya. Mengubah data lama akan merusak seluruh rantai sesudahnya, dan replikasi ke banyak node membuat perubahan sepihak sangat sulit.",
    },
    {
      id: "q1-3",
      chapter: "pengenalan-crypto",
      question: "Apa fungsi utama private key?",
      options: [
        "Menampilkan grafik harga real-time",
        "Membuktikan kepemilikan dan menandatangani transaksi",
        "Menyimpan saldo koin secara fisik",
        "Menghitung volume perdagangan di bursa",
      ],
      answer: 1,
      explanation:
        "Private key membuktikan kendali atas alamat dan digunakan untuk menandatangani transaksi. Saldo ada di blockchain, bukan di dalam key.",
    },
    {
      id: "q1-4",
      chapter: "pengenalan-crypto",
      question: "Perlakuan yang benar terhadap seed phrase adalah...",
      options: [
        "Disimpan di notes cloud agar mudah diakses",
        "Dikirim ke customer service saat akun bermasalah",
        "Ditulis offline dan tidak dibagikan kepada siapa pun",
        "Difoto lalu dihapus dari galeri",
      ],
      answer: 2,
      explanation:
        "Seed phrase memberi kendali penuh atas aset. Simpan offline, jangan difoto, dan jangan pernah dibagikan. Layanan resmi tidak akan memintanya.",
    },
    {
      id: "q1-5",
      chapter: "pengenalan-crypto",
      question: "Apa perbedaan utama CEX dan DEX?",
      options: [
        "CEX hanya untuk Bitcoin, DEX hanya untuk altcoin",
        "CEX mencocokkan order dan biasanya memegang kunci aset, DEX memakai smart contract dan wallet pengguna",
        "DEX tidak memiliki risiko sama sekali",
        "CEX tidak memiliki order book",
      ],
      answer: 1,
      explanation:
        "CEX umumnya custodial dan memakai order book internal. DEX memakai smart contract serta liquidity pool, sehingga pengguna tetap memegang kunci dan menanggung risiko kontrak.",
    },
    {
      id: "q1-6",
      chapter: "pengenalan-crypto",
      question: "Apa arti pepatah 'not your keys, not your coins'?",
      options: [
        "Koin hanya sah jika dibeli di bursa besar",
        "Jika kunci tidak kamu pegang, kendali aset sebenarnya ada pada pihak lain",
        "Koin harus selalu dipindahkan setiap hari",
        "Wallet hardware tidak diperlukan",
      ],
      answer: 1,
      explanation:
        "Saat aset berada di bursa custodial, kunci dipegang bursa. Kamu memiliki klaim terhadap bursa, bukan kendali langsung atas aset di blockchain.",
    },
    {
      id: "q1-7",
      chapter: "pengenalan-crypto",
      question: "Berapa batas supply Bitcoin?",
      options: ["21 juta koin", "100 juta koin", "Tidak terbatas", "1 miliar koin"],
      answer: 0,
      explanation:
        "Protokol Bitcoin membatasi supply maksimum sekitar 21 juta koin, dengan penambahan baru yang menurun melalui halving.",
    },
    {
      id: "q1-8",
      chapter: "pengenalan-crypto",
      question: "Apa yang dimaksud dengan altcoin?",
      options: [
        "Stablecoin yang dijamin dolar",
        "Aset crypto selain Bitcoin",
        "Token yang hanya ada di testnet",
        "Saham perusahaan crypto",
      ],
      answer: 1,
      explanation:
        "Altcoin adalah sebutan kolektif untuk cryptocurrency selain Bitcoin, termasuk Ethereum, Solana, dan aset lain dengan karakter masing-masing.",
    },
    {
      id: "q1-9",
      chapter: "pengenalan-crypto",
      question: "Tindakan mana yang paling berbahaya?",
      options: [
        "Membaca whitepaper proyek",
        "Membagikan seed phrase kepada orang yang mengaku admin",
        "Mengatur ukuran posisi kecil",
        "Mempelajari candle sebelum membeli",
      ],
      answer: 1,
      explanation:
        "Membagikan seed phrase memberi orang lain kendali penuh atas asetmu. Admin, giveaway, atau verifikasi palsu sering memakai taktik ini.",
    },
    {
      id: "q1-10",
      chapter: "pengenalan-crypto",
      question: "Mengapa harga crypto bisa sangat fluktuatif?",
      options: [
        "Karena tidak ada pembeli dan penjual",
        "Karena likuiditas yang lebih tipis, perdagangan 24/7, leverage, dan pengaruh narasi yang cepat",
        "Karena harga ditetapkan secara acak oleh blockchain",
        "Karena semua crypto memiliki supply tak terbatas",
      ],
      answer: 1,
      explanation:
        "Pasar crypto berjalan 24/7 dengan likuiditas yang berbeda-beda, banyak leverage, dan sentimen cepat berubah. Kombinasi ini memperbesar ayunan harga.",
    },
  ],
};
