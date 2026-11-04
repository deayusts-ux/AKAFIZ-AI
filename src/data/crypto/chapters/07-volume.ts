import type { Chapter } from "../types";

export const chapterVolume: Chapter = {
  slug: "volume",
  order: 7,
  title: "Volume",
  shortTitle: "Volume",
  subtitle: "Mengukur partisipasi, bukan sekadar jumlah transaksi",
  description:
    "Cara membaca volume pada breakout, pullback, klimaks, dan divergensi. Ditambah dasar OBV, VWAP, volume profile, serta perbedaan volume spot dan futures.",
  level: "Menengah",
  minutes: 36,
  icon: "BarChart3",
  accent: "#fbbf24",
  objectives: [
    "Menjelaskan fungsi volume dalam konfirmasi harga.",
    "Membedakan volume breakout, pullback, dan klimaks.",
    "Mengenali divergensi volume.",
    "Memahami OBV, VWAP, dan volume profile secara dasar.",
  ],
  sections: [
    {
      id: "apa-itu-volume",
      heading: "Volume adalah jumlah partisipasi",
      paragraphs: [
        "Volume mengukur jumlah aset yang diperdagangkan dalam satu periode. Volume tinggi berarti banyak transaksi terjadi, bukan otomatis berarti harga akan naik. Volume menunjukkan seberapa besar minat dan konviksi peserta pada periode itu.",
        "Harga bisa naik dengan volume rendah jika likuiditas tipis dan sedikit order sudah cukup menggerakkan pasar. Sebaliknya, volume tinggi di area tertentu bisa menandakan pertempuran besar antara pembeli dan penjual.",
        "Selalu bandingkan volume dengan rata-rata beberapa candle sebelumnya. Angka 10.000 bisa sangat besar di satu pasar dan biasa saja di pasar lain. Konteks relatif lebih penting daripada angka mentah.",
      ],
      visual: {
        kind: "volume",
        caption:
          "Volume biasanya ditampilkan sebagai batang di bawah harga. Batang tinggi menunjukkan partisipasi besar pada periode tersebut.",
      },
    },
    {
      id: "konfirmasi",
      heading: "Volume sebagai konfirmasi gerakan",
      paragraphs: [
        "Breakout yang disertai volume jauh di atas rata-rata lebih meyakinkan karena menunjukkan partisipasi luas, bukan hanya pergerakan tipis. Namun, volume tinggi juga bisa berasal dari likuidasi atau panic selling yang cepat berbalik.",
        "Pullback sehat pada tren naik sering terjadi dengan volume lebih rendah dibanding gelombang kenaikan. Artinya, penjual tidak agresif. Jika pullback datang dengan volume besar dan candle bearish panjang, struktur tren mungkin sedang berubah.",
        "Volume tidak memberi arah. Volume tinggi pada candle merah bisa berarti penjualan panik atau pembelian besar yang menyerap semua jualan. Candle close dan lokasi harga membantu menafsirkan siapa yang menang.",
      ],
      callout: {
        tone: "info",
        title: "Pertanyaan yang benar",
        body: "Jangan bertanya 'volume tinggi itu bagus atau buruk?'. Tanyakan 'volume ini muncul di mana, setelah apa, dan bagaimana candle ditutup?'",
      },
    },
    {
      id: "klimaks",
      heading: "Volume klimaks dan kelelahan tren",
      paragraphs: [
        "Volume klimaks adalah lonjakan sangat besar setelah tren panjang. Ini bisa menandakan panic selling di dasar atau euforia pembelian di puncak. Sering kali menjadi tanda kelelahan, tetapi tidak selalu langsung membalikkan harga.",
        "Setelah klimaks, perhatikan reaksi harga. Jika volume besar di area rendah tetapi harga berhasil pulih dan menutup jauh dari low, ada kemungkinan penyerapan. Jika harga terus turun dengan volume tinggi, tekanan jual masih dominan.",
        "Klimaks lebih berguna sebagai peringatan daripada sinyal entry. Menebak titik balik hanya dari satu lonjakan volume berisiko. Tunggu struktur harga dan candle konfirmasi.",
      ],
    },
    {
      id: "divergensi",
      heading: "Divergensi volume",
      paragraphs: [
        "Divergensi terjadi ketika harga dan volume bergerak tidak searah. Contohnya harga membuat higher high, tetapi volume pada puncak baru lebih rendah dibanding puncak sebelumnya. Ini menunjukkan kenaikan kurang didukung partisipasi.",
        "Divergensi bukan sinyal jual otomatis. Pasar bisa tetap naik lama dengan volume menurun. Gunakan divergensi sebagai tanda untuk lebih waspada, bukan sebagai alasan melawan tren tanpa rencana.",
        "Divergensi pada indikator seperti RSI juga sering dibahas, tetapi prinsipnya sama: perbedaan antara momentum dan harga perlu konfirmasi struktur sebelum ditindaklanjuti.",
      ],
    },
    {
      id: "obv-vwap",
      heading: "OBV, VWAP, dan volume profile",
      paragraphs: [
        "On-Balance Volume atau OBV menambahkan volume pada hari naik dan menguranginya pada hari turun. Garis OBV membantu melihat apakah tekanan beli atau jual secara kumulatif lebih dominan.",
        "VWAP adalah harga rata-rata yang dibobot volume. Banyak trader institusional memakainya sebagai acuan harga wajar dalam satu sesi. Harga di atas VWAP sering dianggap lebih kuat, tetapi VWAP tetap bergantung pada periode yang dipilih.",
        "Volume profile menampilkan volume pada level harga, bukan waktu. Area dengan volume besar sering menjadi magnet atau support/resistance karena banyak posisi terbentuk di sana. Ini alat konteks, bukan prediksi pasti.",
      ],
      bullets: [
        "OBV: akumulasi volume berdasarkan arah close.",
        "VWAP: harga rata-rata berbobot volume, biasanya per sesi.",
        "Volume profile: distribusi volume pada level harga.",
        "Semua indikator volume adalah turunan, bukan data masa depan.",
      ],
    },
    {
      id: "spot-perp",
      heading: "Volume spot dan volume futures",
      paragraphs: [
        "Volume futures bisa jauh lebih besar daripada spot karena leverage dan perdagangan berulang. Lonjakan volume futures mungkin hanya berasal dari posisi spekulatif yang cepat ditutup, bukan permintaan nyata terhadap aset.",
        "Volume spot lebih dekat dengan pertukaran aset nyata. Untuk menilai minat jangka panjang, bandingkan keduanya. Jika harga naik terutama karena futures dan funding ekstrem, risiko squeeze meningkat.",
        "Di DEX, volume bisa dipengaruhi bot, MEV, dan wash trading. Periksa jumlah transaksi unik dan kedalaman pool agar tidak salah menilai likuiditas.",
      ],
      callout: {
        tone: "warning",
        title: "Volume tidak selalu bersih",
        body: "Wash trading dan bot dapat menggelembungkan volume. Gunakan beberapa sumber data dan bandingkan dengan kedalaman pasar.",
      },
    },
  ],
  takeaways: [
    "Volume mengukur partisipasi, bukan arah harga.",
    "Breakout lebih meyakinkan jika volume relatif tinggi.",
    "Volume klimaks menandakan kelelahan, tetapi butuh konfirmasi.",
    "Divergensi volume adalah peringatan, bukan sinyal otomatis.",
    "Volume futures tidak sama dengan permintaan spot.",
  ],
  quiz: [
    {
      id: "q7-1",
      chapter: "volume",
      question: "Volume menunjukkan...",
      options: [
        "Jumlah aset yang diperdagangkan dalam satu periode",
        "Arah harga pasti",
        "Jumlah token yang dibakar",
        "Harga tertinggi sepanjang masa",
      ],
      answer: 0,
      explanation:
        "Volume mengukur banyaknya aset yang ditransaksikan. Volume tidak menentukan arah, hanya menunjukkan tingkat partisipasi.",
    },
    {
      id: "q7-2",
      chapter: "volume",
      question: "Breakout dengan volume tinggi umumnya...",
      options: [
        "Lebih meyakinkan karena partisipasi lebih luas",
        "Pasti gagal",
        "Tidak ada artinya",
        "Selalu terjadi di pasar tutup",
      ],
      answer: 0,
      explanation:
        "Volume tinggi menambah keyakinan bahwa pergerakan didukung banyak peserta, meski tetap perlu konfirmasi close.",
    },
    {
      id: "q7-3",
      chapter: "volume",
      question: "Pullback sehat pada tren naik sering disertai...",
      options: [
        "Volume lebih rendah dibanding gelombang kenaikan",
        "Volume yang selalu nol",
        "Volume lebih tinggi dari setiap candle hijau",
        "Tidak ada candle",
      ],
      answer: 0,
      explanation:
        "Volume rendah pada pullback menunjukkan penjual tidak agresif, sehingga tren masih mungkin berlanjut.",
    },
    {
      id: "q7-4",
      chapter: "volume",
      question: "Volume klimaks biasanya muncul...",
      options: [
        "Setelah tren panjang dan bisa menandakan kelelahan",
        "Hanya saat pasar sideways",
        "Saat volume nol",
        "Sebelum pasar buka",
      ],
      answer: 0,
      explanation:
        "Lonjakan volume ekstrem setelah tren panjang sering menandakan panic selling atau euforia yang berpotensi menguras tenaga.",
    },
    {
      id: "q7-5",
      chapter: "volume",
      question: "Divergensi volume terjadi ketika...",
      options: [
        "Harga dan volume bergerak tidak searah",
        "Volume selalu naik",
        "Harga tidak berubah",
        "Volume sama dengan harga",
      ],
      answer: 0,
      explanation:
        "Contohnya harga membuat puncak lebih tinggi, tetapi volume justru lebih rendah. Ini tanda partisipasi melemah.",
    },
    {
      id: "q7-6",
      chapter: "volume",
      question: "Volume tinggi pada candle merah bisa berarti...",
      options: [
        "Penjualan panik atau penyerapan oleh pembeli besar",
        "Pasti harga akan naik",
        "Tidak ada transaksi",
        "Volume tidak bisa tinggi pada candle merah",
      ],
      answer: 0,
      explanation:
        "Volume tinggi hanya menunjukkan banyak transaksi. Arah dan close candle diperlukan untuk menafsirkan siapa yang menang.",
    },
    {
      id: "q7-7",
      chapter: "volume",
      question: "OBV menghitung...",
      options: [
        "Volume kumulatif berdasarkan arah close",
        "Harga rata-rata saham",
        "Jumlah holder",
        "Market cap masa depan",
      ],
      answer: 0,
      explanation:
        "OBV menambah volume saat harga naik dan menguranginya saat harga turun, sehingga membentuk garis akumulasi tekanan.",
    },
    {
      id: "q7-8",
      chapter: "volume",
      question: "VWAP adalah...",
      options: [
        "Harga rata-rata berbobot volume",
        "Volume tertinggi harian",
        "Jumlah token beredar",
        "Nilai funding rate",
      ],
      answer: 0,
      explanation:
        "VWAP menghitung harga rata-rata dengan bobot volume, sering dipakai sebagai acuan harga wajar dalam satu sesi.",
    },
    {
      id: "q7-9",
      chapter: "volume",
      question: "Volume futures bisa lebih besar dari spot karena...",
      options: [
        "Leverage dan perdagangan berulang tanpa pertukaran aset fisik",
        "Futures tidak memiliki volume",
        "Spot tidak diperdagangkan",
        "Futures hanya untuk stablecoin",
      ],
      answer: 0,
      explanation:
        "Futures memungkinkan posisi besar dengan margin kecil dan sering ditutup-buka, sehingga volume bisa jauh lebih besar dari spot.",
    },
    {
      id: "q7-10",
      chapter: "volume",
      question: "Mengapa volume tinggi belum tentu bersih?",
      options: [
        "Karena bisa digelembungkan wash trading atau bot",
        "Karena volume selalu salah",
        "Karena hanya dihitung sekali sehari",
        "Karena volume tidak pernah ditampilkan",
      ],
      answer: 0,
      explanation:
        "Wash trading dan bot dapat menciptakan volume palsu. Periksa transaksi unik, kedalaman pool, dan sumber data.",
    },
  ],
};
