import type { Chapter } from "../types";

export const chapterPola: Chapter = {
  slug: "pola-candlestick",
  order: 5,
  title: "Pola Candlestick",
  shortTitle: "Pola Candle",
  subtitle: "Sebelas pola penting, psikologi pasar, dan batas keandalannya",
  description:
    "Membaca pola satu, dua, dan tiga candle: doji, hammer, inverted hammer, shooting star, hanging man, engulfing, morning star, evening star, pin bar, dan marubozu, lengkap dengan konteks dan jebakan sinyal palsu.",
  level: "Menengah",
  minutes: 55,
  icon: "CandlestickChart",
  accent: "#a78bfa",
  objectives: [
    "Mengenali bentuk dan konteks sebelas pola candlestick utama.",
    "Menjelaskan psikologi pembeli dan penjual di balik setiap pola.",
    "Membedakan pola di area penting dan pola di tengah noise.",
    "Menunggu konfirmasi sebelum mengambil keputusan.",
  ],
  sections: [
    {
      id: "cara-membaca",
      heading: "Pola bukan ramalan, melainkan jejak perilaku",
      paragraphs: [
        "Pola candlestick merangkum bagaimana pembeli dan penjual bereaksi dalam satu sampai tiga periode. Pola yang sama bisa memiliki arti berbeda tergantung tren, area support atau resistance, dan volume di sekitarnya.",
        "Kesalahan paling umum adalah menghafal bentuk lalu menganggapnya sinyal beli atau jual. Tanpa konteks, pola hanyalah gambar. Gunakan pola sebagai petunjuk bahwa keseimbangan sedang berubah, lalu cari bukti tambahan.",
        "Di halaman Candle Lab, kamu bisa memilih setiap pola, melihat OHLC, memperbesar chart, dan membaca penjelasan lengkapnya. Bab ini merangkum inti dari setiap pola agar kamu punya peta sebelum berlatih.",
      ],
      callout: {
        tone: "warning",
        title: "Tiga syarat sebelum percaya pola",
        body: "Lokasi yang penting, konteks tren yang jelas, dan konfirmasi setelah pola. Jika salah satu tidak ada, kurangi keyakinan atau lewati setup.",
      },
    },
    {
      id: "doji",
      heading: "Doji: keseimbangan yang rapuh",
      paragraphs: [
        "Doji muncul ketika open dan close hampir sama, sehingga body menjadi sangat tipis. Harga sempat bergerak ke dua arah, tetapi tidak ada pihak yang menutup periode dengan kemenangan jelas.",
        "Doji paling bermakna setelah tren yang memanjang atau di area support dan resistance. Di tengah pasar sideways, doji sangat umum dan sering hanya noise. Tunggu candle berikutnya untuk melihat ke mana harga benar-benar pergi.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "doji",
        caption: "Doji setelah tren turun: tekanan jual melambat, tetapi arah belum berubah sampai ada konfirmasi.",
      },
    },
    {
      id: "hammer",
      heading: "Hammer: pembeli menolak harga murah",
      paragraphs: [
        "Hammer memiliki body kecil di bagian atas dan lower wick panjang, minimal dua kali body. Harga turun dalam selama periode, lalu pembeli mendorongnya kembali ke dekat open.",
        "Pola ini lebih kuat ketika muncul setelah tren turun dan di area support yang sudah diuji. Konfirmasi berupa candle bullish berikutnya yang menutup di atas high hammer meningkatkan validitas.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "hammer",
        caption: "Hammer di ujung penurunan: lower wick panjang menunjukkan penolakan terhadap harga rendah.",
      },
    },
    {
      id: "inverted-hammer",
      heading: "Inverted Hammer: percobaan pembalikan yang belum selesai",
      paragraphs: [
        "Inverted hammer berbentuk body kecil di bagian bawah dengan upper wick panjang. Pembeli sempat mendorong harga naik, tetapi penjual masih mampu menekannya kembali.",
        "Berbeda dari shooting star yang muncul setelah tren naik, inverted hammer muncul setelah tren turun. Pola ini menunjukkan potensi pembalikan, tetapi butuh konfirmasi karena penjual belum sepenuhnya kalah.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "inverted-hammer",
        caption: "Inverted hammer setelah penurunan: pembeli mulai muncul, tetapi belum menguasai penutupan.",
      },
    },
    {
      id: "shooting-star",
      heading: "Shooting Star: kenaikan yang ditolak",
      paragraphs: [
        "Shooting star memiliki body kecil di bagian bawah dan upper wick panjang, muncul setelah tren naik. Harga sempat melesat, lalu penjual menekannya kembali mendekati open.",
        "Upper wick panjang menunjukkan bahwa pembeli kehabisan tenaga di area atas. Semakin jelas resistance di ujung wick dan semakin tinggi volume penolakan, semakin bermakna pola ini.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "shooting-star",
        caption: "Shooting star di puncak: harga mencoba naik, tetapi penjual mengembalikannya dengan kuat.",
      },
    },
    {
      id: "hanging-man",
      heading: "Hanging Man: bentuk sama, konteks berbeda",
      paragraphs: [
        "Hanging man memiliki bentuk seperti hammer, yaitu body kecil di atas dan lower wick panjang. Perbedaannya adalah lokasi: hanging man muncul setelah tren naik, bukan setelah penurunan.",
        "Lower wick panjang di puncak menunjukkan bahwa penjual sempat menekan harga cukup dalam. Jika candle berikutnya bearish dan volume meningkat, tekanan jual mulai mengambil alih.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "hanging-man",
        caption: "Hanging man setelah kenaikan: pembeli sempat kehilangan kendali sebelum menutup dekat open.",
      },
    },
    {
      id: "bullish-engulfing",
      heading: "Bullish Engulfing: pembeli mengambil alih",
      paragraphs: [
        "Bullish engulfing terdiri dari candle bearish kecil diikuti candle bullish yang body-nya menutupi seluruh body candle sebelumnya. Harga dibuka lebih rendah, lalu dibeli dengan kuat sampai close di atas open sebelumnya.",
        "Pola ini lebih kuat di area support setelah tren turun. Volume yang lebih tinggi pada candle kedua dan close yang tegas di atas body sebelumnya menambah keyakinan.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "bullish-engulfing",
        caption: "Bullish engulfing: candle hijau menelan body merah sebelumnya, menunjukkan peralihan kendali.",
      },
    },
    {
      id: "bearish-engulfing",
      heading: "Bearish Engulfing: penjual membalikkan tekanan",
      paragraphs: [
        "Bearish engulfing adalah kebalikan dari bullish engulfing: candle bullish kecil diikuti candle bearish besar yang menutupi seluruh body sebelumnya. Harga sempat naik, lalu dijual hingga close di bawah open sebelumnya.",
        "Pola ini bermakna di resistance setelah tren naik. Konfirmasi berupa close di bawah low candle pertama atau candle bearish lanjutan memperkuat sinyal.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "bearish-engulfing",
        caption: "Bearish engulfing di resistance: penjual menelan seluruh kemajuan pembeli pada periode sebelumnya.",
      },
    },
    {
      id: "morning-star",
      heading: "Morning Star: tiga langkah menuju pembalikan naik",
      paragraphs: [
        "Morning star terdiri dari candle bearish panjang, candle kecil yang menunjukkan keraguan, lalu candle bullish panjang yang menutup jauh di dalam body candle pertama. Pola ini menggambarkan peralihan bertahap dari penjual ke pembeli.",
        "Semakin dalam candle ketiga menutup ke dalam body pertama, semakin kuat sinyalnya. Volume yang meningkat pada candle ketiga dan lokasi di support menambah validitas.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "morning-star",
        caption: "Morning star setelah penurunan: tekanan jual melemah, lalu pembeli mengambil alih.",
      },
    },
    {
      id: "evening-star",
      heading: "Evening Star: tiga langkah menuju pembalikan turun",
      paragraphs: [
        "Evening star adalah kebalikan morning star: candle bullish panjang, candle kecil di atas, lalu candle bearish panjang yang menutup jauh di dalam body pertama. Pola ini muncul setelah tren naik.",
        "Pola ini menunjukkan pembeli masih kuat di awal, tetapi kehilangan tenaga, lalu penjual mengambil kendali. Konfirmasi berupa candle bearish lanjutan atau penurunan volume pada pantulan berikutnya memperkuat sinyal.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "evening-star",
        caption: "Evening star di puncak: kenaikan melambat, lalu berbalik dengan candle bearish besar.",
      },
    },
    {
      id: "pin-bar",
      heading: "Pin Bar: penolakan harga yang tegas",
      paragraphs: [
        "Pin bar memiliki satu wick sangat panjang dan body kecil di ujung lainnya. Istilah ini lebih umum daripada hammer atau shooting star karena mencakup penolakan di kedua arah.",
        "Pin bar bullish memiliki lower wick panjang dan body di atas, sedangkan pin bar bearish memiliki upper wick panjang. Semakin panjang wick dibanding body dan semakin jelas level yang ditolak, semakin kuat pesannya.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "pin-bar",
        caption: "Pin bar: wick panjang menunjukkan harga ditolak dengan cepat dari level tertentu.",
      },
    },
    {
      id: "marubozu",
      heading: "Marubozu: dominasi tanpa keraguan",
      paragraphs: [
        "Marubozu memiliki body panjang dengan wick sangat pendek atau hampir tidak ada. Harga bergerak tegas dari open ke close tanpa banyak perlawanan.",
        "Marubozu bullish menunjukkan pembeli menguasai seluruh periode, sedangkan marubozu bearish menunjukkan penjual mendominasi. Pola ini sering menjadi awal momentum, tetapi juga bisa menjadi akhir pergerakan jika muncul setelah tren panjang yang sudah terlalu ramai.",
      ],
      visual: {
        kind: "candle-pattern",
        patternId: "marubozu",
        caption: "Marubozu: body panjang dengan wick minimal, tanda dominasi kuat pada periode tersebut.",
      },
    },
    {
      id: "konfirmasi",
      heading: "Konfirmasi dan sinyal palsu",
      paragraphs: [
        "Pola reversal paling rentan gagal ketika muncul melawan tren besar atau di tengah rentang. Selalu periksa apakah pola berada di area yang secara historis penting, apakah volume mendukung, dan apakah candle berikutnya mengonfirmasi.",
        "Cara paling sederhana menunggu konfirmasi adalah melihat close candle setelah pola. Untuk hammer, tunggu candle bullish yang menutup di atas high hammer. Untuk shooting star, tunggu candle bearish yang menutup di bawah low-nya.",
        "Tidak semua pola harus ditradingkan. Menolak setup yang lemah adalah bagian dari proses. Dalam jangka panjang, kualitas keputusan lebih penting daripada jumlah transaksi.",
      ],
      callout: {
        tone: "tip",
        title: "Latihan terarah",
        body: "Buka Candle Lab, pilih mode belajar, lalu tebak psikologi di balik setiap pola sebelum membaca penjelasannya. Ulangi hingga kamu bisa menjelaskan alasannya, bukan hanya bentuknya.",
      },
    },
  ],
  takeaways: [
    "Pola adalah jejak perilaku, bukan jaminan arah.",
    "Lokasi, tren, dan volume menentukan bobot sebuah pola.",
    "Hammer dan hanging man memiliki bentuk sama dengan konteks berbeda.",
    "Engulfing dan star menunjukkan peralihan kendali bertahap.",
    "Tunggu konfirmasi dan siap menolak setup yang lemah.",
  ],
  quiz: [
    {
      id: "q5-1",
      chapter: "pola-candlestick",
      question: "Hammer paling bermakna ketika muncul...",
      options: [
        "Setelah tren naik panjang",
        "Setelah tren turun dan di area support",
        "Di tengah pasar sideways tanpa level",
        "Setelah candle doji di timeframe M1",
      ],
      answer: 1,
      explanation:
        "Hammer menunjukkan pembeli menolak harga rendah. Konteks tren turun dan support yang diuji membuat pola ini lebih bermakna.",
    },
    {
      id: "q5-2",
      chapter: "pola-candlestick",
      question: "Shooting star memiliki ciri...",
      options: [
        "Body kecil di bawah dan upper wick panjang setelah tren naik",
        "Body besar dengan wick minimal",
        "Dua candle hijau berturut-turut",
        "Lower wick panjang setelah tren turun",
      ],
      answer: 0,
      explanation:
        "Shooting star menunjukkan kenaikan yang ditolak. Body kecil berada di bawah dengan upper wick panjang.",
    },
    {
      id: "q5-3",
      chapter: "pola-candlestick",
      question: "Bullish engulfing terjadi ketika...",
      options: [
        "Candle bullish menutupi seluruh body candle bearish sebelumnya",
        "Candle bearish menutupi candle bullish sebelumnya",
        "Dua doji muncul berurutan",
        "Harga tidak bergerak",
      ],
      answer: 0,
      explanation:
        "Bullish engulfing berarti body candle hijau lebih besar dan menutupi body candle merah sebelumnya, menunjukkan pembeli mengambil alih.",
    },
    {
      id: "q5-4",
      chapter: "pola-candlestick",
      question: "Urutan candle morning star adalah...",
      options: [
        "Bearish panjang, candle kecil, bullish panjang",
        "Bullish panjang, candle kecil, bearish panjang",
        "Tiga candle doji",
        "Tiga candle bearish panjang",
      ],
      answer: 0,
      explanation:
        "Morning star menggambarkan peralihan dari tekanan jual ke keraguan, lalu pembeli mengambil alih.",
    },
    {
      id: "q5-5",
      chapter: "pola-candlestick",
      question: "Mengapa doji membutuhkan konfirmasi?",
      options: [
        "Karena doji hanya menunjukkan keseimbangan, bukan arah",
        "Karena doji selalu bullish",
        "Karena doji tidak pernah muncul di chart",
        "Karena doji hanya ada di pasar saham",
      ],
      answer: 0,
      explanation:
        "Doji menunjukkan keraguan tanpa pemenang jelas. Arah berikutnya baru terlihat dari candle konfirmasi.",
    },
    {
      id: "q5-6",
      chapter: "pola-candlestick",
      question: "Hanging man berbeda dari hammer terutama karena...",
      options: [
        "Bentuknya berbeda jauh",
        "Konteksnya: hanging man muncul setelah tren naik",
        "Hanging man selalu memiliki volume nol",
        "Hammer hanya ada di timeframe D1",
      ],
      answer: 1,
      explanation:
        "Bentuk keduanya mirip. Perbedaan utamanya adalah lokasi: hammer setelah penurunan, hanging man setelah kenaikan.",
    },
    {
      id: "q5-7",
      chapter: "pola-candlestick",
      question: "Pin bar menunjukkan...",
      options: [
        "Penolakan harga yang tegas melalui wick panjang",
        "Volume yang selalu rendah",
        "Kepastian pembalikan tanpa konfirmasi",
        "Tidak adanya wick",
      ],
      answer: 0,
      explanation:
        "Pin bar memiliki wick panjang sebagai tanda harga ditolak dari suatu level, dengan body kecil di ujung lainnya.",
    },
    {
      id: "q5-8",
      chapter: "pola-candlestick",
      question: "Evening star adalah pola...",
      options: [
        "Bullish reversal setelah tren turun",
        "Bearish reversal setelah tren naik",
        "Netral yang tidak pernah gagal",
        "Kontinuasi pada tren turun",
      ],
      answer: 1,
      explanation:
        "Evening star menunjukkan pembalikan turun setelah tren naik: bullish panjang, candle kecil, lalu bearish panjang.",
    },
    {
      id: "q5-9",
      chapter: "pola-candlestick",
      question: "Kapan sebuah pola reversal paling rentan gagal?",
      options: [
        "Saat muncul di area penting dengan volume mendukung",
        "Saat muncul melawan tren besar tanpa konfirmasi",
        "Saat candle berikutnya mengonfirmasi",
        "Saat berada di support yang sudah diuji",
      ],
      answer: 1,
      explanation:
        "Pola yang melawan tren besar dan tanpa konfirmasi lebih mudah gagal. Konteks dan bukti tambahan sangat penting.",
    },
    {
      id: "q5-10",
      chapter: "pola-candlestick",
      question: "Marubozu menunjukkan...",
      options: [
        "Dominasi kuat karena body panjang dengan wick minimal",
        "Keraguan ekstrem",
        "Volume pasti nol",
        "Pasar tutup",
      ],
      answer: 0,
      explanation:
        "Marubozu berarti harga bergerak tegas dari open ke close dengan sedikit perlawanan, menunjukkan dominasi satu pihak.",
    },
  ],
};
