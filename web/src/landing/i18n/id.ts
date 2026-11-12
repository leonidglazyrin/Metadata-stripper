import type { Translation } from './en';

export const id: Translation = {
  meta: {
    title: 'Hapus SynthID & C2PA dari gambar dan video AI · {site}',
    description:
      'Hapus C2PA Content Credentials dan metadata dari gambar dan video AI buatan Google Veo, Gemini, Sora, ChatGPT, atau Higgsfield, dan acak watermark SynthID. Juga menghapus EXIF, GPS, dan XMP. Plus pengunduh YouTube, X, TikTok, dan Instagram.',
    ogDescription:
      'Hapus SynthID dan metadata tersembunyi dari video dan foto AI dari Veo, Gemini, Sora, ChatGPT, dan Higgsfield, di server kami atau di perangkatmu.',
    twitterDescription:
      'Hapus SynthID dan metadata tersembunyi dari video dan foto AI dari Veo, Gemini, Sora, ChatGPT, dan Higgsfield.',
    ogImageAlt: '{site}: penghapus SynthID dan metadata',
  },
  nav: {
    label: 'Menu utama',
    home: 'Beranda {site}',
    synthid: 'SynthID',
    detection: 'Label AI',
    metadata: 'Metadata',
    downloaders: 'Pengunduh',
    pricing: 'Harga',
    faq: 'FAQ',
    openTools: 'Buka alat',
    language: 'Bahasa',
    menu: 'Menu',
    mobileLabel: 'Utama (seluler)',
  },
  hero: {
    eyebrow: 'Penghapus SynthID, C2PA & metadata',
    title: ['Hentikan platform menandai', 'gambar & videomu sebagai AI.'],
    lede:
      'TikTok, Instagram, dan lainnya membaca C2PA Content Credentials tersembunyi dan watermark SynthID di file AI, lalu menambahkan label “dibuat dengan AI” ke postinganmu. Masukkan foto atau video dari Google Veo, Gemini, Sora, ChatGPT, atau Higgsfield dan unduh salinan bersih: C2PA dan semua tag metadata (EXIF, GPS, XMP) dihapus, dan watermark SynthID diacak. Berjalan di server kami atau di browsermu.',
    ctaStrip: 'Bersihkan file',
    ctaDownload: 'Unduh video',
    toolsLabel: 'Alat',
    chipStrip: 'SynthID & metadata',
  },
  detection: {
    title: ['Hentikan label otomatis', '“dibuat dengan AI”.'],
    lede:
      'Platform memindai setiap unggahan untuk mencari C2PA Content Credentials dan watermark. Jika ditemukan, mereka menyalakan label AI yang tidak bisa kamu matikan. Hapus dulu, dan mengungkapkannya tetap jadi pilihanmu.',
    beforeTitle: 'Metadata masih ada',
    beforeText:
      'TikTok membaca Content Credentials dan menyalakan label AI untukmu: berwarna abu-abu, tanpa cara untuk mematikannya.',
    afterTitle: 'Dibersihkan dengan {site}',
    afterText:
      'Tidak ada lagi yang bisa ditemukan platform, jadi label kembali opsional. Kamu yang memutuskan apakah akan mengungkapkannya.',
    detectedTag: 'Label otomatis',
    cleanTag: 'Pilihanmu',
    note:
      'Platform juga menjalankan pengklasifikasi sendiri dan masih bisa memberi label pada file. {site} menghapus sinyal yang bisa dihapusnya; ia tidak bisa menjanjikan platform tidak akan memberi label pada postinganmu. Ikuti aturan pengungkapan AI di setiap platform.',
    shotDetectedAlt:
      'Sakelar “Konten buatan AI” di TikTok menyala dan terkunci, bertuliskan “Kami menambahkan label ini karena TikTok mendeteksi penggunaan AI untuk mengedit atau membuat konten di postinganmu.”',
    shotOptionalAlt:
      'Sakelar “Konten buatan AI” di TikTok mati dan opsional, bertuliskan “Tambahkan label ini untuk memberi tahu penonton bahwa kontenmu dibuat atau diedit dengan AI.”',
  },
  synthid: {
    title: ['Hapus SynthID dari video AI', 'tanpa mengubah tampilan.'],
    lede:
      'SynthID adalah watermark tak terlihat yang ditambahkan Google ke piksel gambar dan video buatan Veo, Gemini, dan Imagen. {site} mengubah piksel itu sedikit untuk melemahkan polanya, dan file tetap terlihat dan diputar sama.',
    sourcesTitle: 'Bersihkan file dari',
    sourcesLabel: 'Generator AI',
    reencode: {
      caption: 'Resampling hampir tanpa kehilangan kualitas, sedikit noise, dan encode ulang menggeser setiap piksel. Gambarnya terlihat sama; grid watermark yang tak terlihat tidak bertahan.',
      before: 'Frame AI · watermark tertanam',
      after: 'Di-encode ulang · watermark rusak',
    },
    photos: { title: 'Foto', text: 'Sedikit resampling, noise tipis, dan penajaman mengubah setiap piksel, lalu gambar disimpan ulang dengan kualitas tinggi.' },
    videos: { title: 'Video', text: 'Encode ulang berkualitas tinggi (CRF 18) dengan blur ringan, penajaman penyeimbang, dan sedikit noise antar-frame.' },
    caveat: {
      title: 'Tanpa jaminan',
      text: 'SynthID dibuat agar tahan terhadap edit, jadi tidak ada alat yang bisa menjanjikan detektor akan melewatkannya. {site} melemahkan watermark; ia tidak bisa menjamin watermark hilang, atau bahwa platform tidak akan memberi label AI pada file.',
    },
    cta: 'Buka penghapus SynthID',
    learnMore: 'Apa itu SynthID?',
  },
  metadata: {
    title: ['Penghapus Metadata', 'untuk foto dan video.'],
    lede:
      'Foto dan video menyimpan lokasi pengambilan, perangkat, nomor seri, dan riwayat edit. Penghapus metadata menghapus semuanya, menghilangkan watermark SynthID, dan menampilkan apa saja yang dihapus.',
    synthidTag: 'Watermark SynthID',
    photosTitle: 'Dihapus dari foto',
    photoTags: ['EXIF', 'Lokasi GPS', 'XMP', 'IPTC', 'Profil ICC', 'C2PA / Content Credentials', 'Catatan pabrikan', 'Thumbnail', 'Komentar teks'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC dikembalikan sebagai JPEG.',
    videosTitle: 'Dihapus dari video',
    videoTags: ['Tag global & stream', 'Tag bab', 'Trek GPS & telemetri', 'Timecode', 'Gambar sampul', 'Box C2PA', 'Info encoder'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Stream disalin tanpa encode ulang.',
  },
  downloaders: {
    label: 'Pengunduh video',
    youtube: {
      title: ['Pengunduh', 'YouTube'],
      text: 'Tempel tautan video atau Shorts YouTube. Dapatkan MP4 hingga 1080p, atau audionya sebagai M4A.',
      cta: 'Buka pengunduh YouTube',
    },
    x: {
      title: ['Pengunduh', 'X'],
      text: 'Tempel tautan postingan x.com atau twitter.com dan dapatkan video dari postingan itu sebagai MP4.',
      cta: 'Buka pengunduh X',
    },
    tiktok: {
      title: ['Pengunduh', 'TikTok'],
      text: 'Tempel tautan tiktok.com, termasuk tautan pendek vm. dan vt. Dapatkan video sebagai MP4 atau suaranya sebagai M4A.',
      cta: 'Buka pengunduh TikTok',
    },
    instagram: {
      title: ['Pengunduh', 'Instagram'],
      text: 'Tempel tautan Reel atau postingan video publik. Video pribadi tidak tersedia.',
      cta: 'Buka pengunduh Instagram',
    },
  },
  how: {
    title: ['Cara menghapus SynthID', 'dan metadata.'],
    steps: [
      ['Unggah file-mu.', 'Video atau foto AI, sebanyak yang kamu mau. Di server atau di perangkat ini.'],
      ['{site} membersihkannya.', 'Tag EXIF, GPS, dan C2PA dihapus dan watermark SynthID dilemahkan.'],
      ['Unduh salinan bersih.', 'Setiap file menampilkan apa saja yang dihapus.'],
    ],
    flow: {
      uploading: 'Mengunggah…',
      stripping: 'Menghapus metadata · melemahkan SynthID…',
      clean: 'Bersih · 4 item dihapus',
      download: 'Unduh',
    },
    cta: 'Buka penghapus SynthID',
  },
  pricing: {
    title: ['Dua paket.', 'Mulai gratis.'],
    perMonth: '/ bulan',
    perYear: '/ tahun',
    monthly: 'Bulanan',
    yearly: 'Tahunan',
    yearlySave: 'Gratis 2 bulan',
    free: 'Setiap akun mendapat 1 pembersihan gratis di perangkat, 1 pembersihan gratis di server, dan 1 unduhan video gratis. Pembersihan server dan unduhan gratis dibatasi per hari untuk semua orang.',
    basic: {
      name: 'Basic',
      /** Shown with a yellow minus: Basic has no downloads. */
      missing: 'Tanpa unduhan video dari YouTube, X, TikTok, atau Instagram (khusus Pro)',
      features: [
        'Pembersihan tanpa batas di perangkat',
        'File tidak pernah keluar dari perangkatmu',
        'Metadata dan C2PA dihapus',
        'Akses ke pembersihan SynthID (lambat, karena dibatasi kemampuan browser; kami tidak memperlambatnya)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: 'Paling cepat',
      features: [
        'Semua fitur Basic',
        'Pembersihan tanpa batas di server, sekitar 4x lebih cepat',
        'Unduhan video tanpa batas dari YouTube, X, TikTok, dan Instagram',
      ],
    },
    pack: {
      name: 'Paket pembersihan',
      badge: 'Coba seharga $2',
      once: 'sekali bayar',
      text: '10 pembersihan SynthID seharga $2, di perangkatmu, dengan metadata ikut dihapus. Tanpa langganan: bayar sekali, beli lagi kapan saja, pembersihannya bertambah.',
      cta: 'Coba seharga $2',
    },
    billing: 'Paket ditagih bulanan atau tahunan. Batalkan atau ganti paket kapan saja. Paket pembersihan adalah pembayaran sekali.',
    stripeLabel: 'Pembayaran aman oleh Stripe',
    cta: 'Buka alat',
  },
  faq: {
    title: ['FAQ', 'penghapusan SynthID.'],
    items: [
      {
        q: 'Apa itu penghapus SynthID?',
        a: 'SynthID adalah watermark tak terlihat yang ditambahkan Google ke gambar dan video buatan model AI-nya. Penghapus SynthID mengubah piksel sedikit untuk merusak pola itu. {site} me-resample dan mempertajam foto, dan meng-encode ulang video dengan kualitas tinggi, jadi file tetap terlihat sama.',
      },
      {
        q: 'Bagaimana cara menghapus SynthID dari video AI?',
        a: 'Buka penghapus SynthID, tambahkan videomu, biarkan pembersihan SynthID aktif (aktif secara default), dan pilih Server. {site} menghapus metadata, meng-encode ulang video dengan kualitas tinggi dengan perubahan piksel kecil yang melemahkan watermark, dan memberimu MP4 bersih untuk diunduh. Video dari Google Veo dan Gemini membawa SynthID; langkah yang sama juga membersihkan metadata dari generator lain.',
      },
      {
        q: 'Generator AI apa saja yang didukung?',
        a: 'Semuanya. Video dan foto dari Google Veo, Gemini, dan Imagen membawa watermark SynthID. File dari Sora, ChatGPT, dan banyak alat lain membawa C2PA Content Credentials di metadatanya. Higgsfield menjalankan beberapa model, termasuk Veo, jadi file-nya bisa membawa salah satunya. {site} menghapus metadata dari semuanya dan mengacak SynthID jika ada. Ia tidak menghapus watermark yang terlihat atau logo.',
      },
      {
        q: 'Apakah TikTok atau platform lain tetap akan memberi label AI pada videoku?',
        a: 'Mungkin. Beberapa platform, termasuk TikTok, membaca C2PA Content Credentials untuk memberi label pada konten AI, dan {site} menghapusnya. Tetapi platform juga bisa memakai detektor watermark, pengklasifikasi sendiri, dan aturan pengungkapan, dan kami belum menguji bagaimana platform mana pun memberi label pada hasilnya. {site} tidak menjamin file akan lolos tanpa terdeteksi atau tanpa label. Ikuti aturan setiap platform tentang pengungkapan konten buatan AI.',
      },
      {
        q: 'Apakah penghapus SynthID selalu berhasil?',
        a: 'Tidak. SynthID dibuat agar tahan terhadap edit, dan detektor terus berubah. {site} mengacak watermark, tetapi detektor masih mungkin menemukannya.',
      },
      {
        q: 'Kenapa gambarku masih terdeteksi sebagai AI setelah dibersihkan?',
        a: 'SynthID untuk gambar adalah watermark tingkat piksel yang dirancang agar tahan terhadap perubahan ukuran dan simpan ulang, jadi kasus yang sulit masih bisa memicu detektor. {site} me-resample gambar, menambahkan sedikit noise, dan meng-encode ulang untuk melemahkan pola sejauh mungkin tanpa mengubah tampilan gambar. Jika file masih ditandai, itu karena watermark-nya bertahan, bukan metadatanya: EXIF, XMP, dan C2PA Content Credentials tetap dihapus sepenuhnya. Kami tidak menjamin lolos dari detektor mana pun.',
      },
      {
        q: 'Apa saja yang dihapus penghapus metadata?',
        a: 'Dari foto: EXIF (kamera, nomor seri, waktu, GPS), XMP, IPTC, profil ICC, C2PA Content Credentials, catatan pabrikan, thumbnail tersemat, dan komentar. Dari video: tag global, stream, dan bab, trek GPS dan telemetri, timecode, gambar sampul, box C2PA, dan info encoder. Setiap file menampilkan daftar apa saja yang dihapus.',
      },
      {
        q: 'Apakah file-ku diunggah?',
        a: 'Hanya jika kamu memilih Server. Dalam mode Server, file diunggah, dibersihkan, dan langsung dihapus. Dalam mode Perangkat ini, file tetap di browsermu dan tidak ada yang dikirim ke kami. Metadata selalu dihapus; pembersihan SynthID adalah sakelar yang aktif secara default, dan di perangkatmu encode ulangnya berjalan di browser, jadi video butuh waktu lebih lama daripada di server.',
      },
      {
        q: 'Format apa saja yang didukung?',
        a: 'Foto: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, dan GIF (HEIC disimpan sebagai JPEG). Video: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, dan FLV.',
      },
      {
        q: 'Apakah pembersihan menurunkan kualitas?',
        a: 'Menghapus metadata menyalin stream video tanpa encode ulang dan menyimpan foto dengan kualitas tinggi. Pembersihan SynthID harus mengubah piksel, jadi file tidak identik byte demi byte, tetapi kamu tidak akan melihat perbedaan saat menonton biasa.',
      },
      {
        q: 'Apakah menghapus watermark SynthID legal?',
        a: 'Tergantung di mana kamu tinggal dan bagaimana kamu memakai file itu. Proses hanya konten milikmu atau yang kamu punya izin untuk memakainya, dan beri label pada konten buatan AI jika hukum atau platform mewajibkannya.',
      },
    ],
  },
  downloaderFaq: {
    title: ['FAQ', 'pengunduh.'],
    items: [
      {
        q: 'Bagaimana cara mengunduh video YouTube?',
        a: 'Buka pengunduh YouTube, tempel tautan video atau Shorts, lalu tekan Unduh. Kamu mendapatkan MP4 hingga 1080p, atau pilih Hanya audio untuk file M4A. Kamu bisa menempel beberapa tautan sekaligus.',
      },
      {
        q: 'Bagaimana cara mengunduh video dari X (Twitter)?',
        a: 'Salin tautan postingan (x.com atau twitter.com) dan tempel ke pengunduh X. Kamu mendapatkan video dari postingan itu sebagai MP4.',
      },
      {
        q: 'Apakah pengunduh TikTok bisa memakai tautan pendek?',
        a: 'Bisa. Tempel tautan tiktok.com atau tautan pendek vm.tiktok.com / vt.tiktok.com dan kamu mendapatkan video sebagai MP4, atau suaranya sebagai M4A.',
      },
      {
        q: 'Kenapa tautan Instagram atau X gagal?',
        a: 'Hanya video publik yang bisa diunduh. Video pribadi tidak tersedia di alat unduhan, dan jika platform meminta login, unduhan gagal dengan pesan yang menjelaskannya.',
      },
      {
        q: 'Bisakah aku mengunduh audionya saja?',
        a: 'Bisa. Setiap pengunduh punya sakelar Video / Hanya audio. Hanya audio memberimu file M4A.',
      },
      {
        q: 'Apakah kalian menyimpan video yang aku unduh?',
        a: 'Tidak. Setiap video diambil di server kami, dikirim kepadamu, lalu langsung dihapus.',
      },
      {
        q: 'Apakah mengunduh video itu legal?',
        a: 'Unduh hanya video milikmu atau yang kamu punya izin untuk memakainya. Mengunduh bisa melanggar ketentuan layanan platform, dan aturan hak cipta tergantung tempat tinggalmu.',
      },
    ],
  },
  footer: {
    tagline: 'Penghapus SynthID, penghapus metadata, dan pengunduh YouTube, X, TikTok, dan Instagram.',
    open: 'Buka alat',
    disclaimer:
      'Proses dan unduh hanya konten milikmu atau yang kamu punya izin untuk memakainya, dan beri label pada konten buatan AI jika aturan mewajibkannya. {site} tidak berafiliasi dengan Google, YouTube, TikTok, X, atau Instagram.',
    badges: 'Diulas di',
  },
  jsonLd: {
    name: '{site}: Penghapus SynthID & Metadata',
    alternateName: ['Penghapus SynthID', 'Hapus SynthID dari video AI', 'Penghapus metadata', 'Pengunduh YouTube', 'Pengunduh video X', 'Pengunduh TikTok', 'Pengunduh Instagram'],
    browserRequirements: 'Butuh browser modern dengan JavaScript.',
    operatingSystem: 'Apa saja (browser web)',
    description:
      'Hapus metadata EXIF, GPS, XMP, IPTC, dan C2PA dari video dan foto AI (Google Veo, Gemini, Sora, ChatGPT, Higgsfield, dan lainnya) dan acak watermark SynthID, di server atau di perangkatmu. Hasil tidak dijamin. Termasuk pengunduh YouTube, TikTok, X, dan Instagram.',
    keywords:
      'hapus SynthID, penghapus SynthID, hapus SynthID dari video AI, hapus watermark AI, hapus C2PA, hapus metadata, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      'Pembersihan SynthID untuk foto dan video',
      'Penghapus metadata EXIF, GPS, XMP, IPTC, ICC, dan C2PA',
      'Opsi pemrosesan di perangkat',
      'Pengunduh YouTube (MP4 hingga 1080p atau audio M4A)',
      'Pengunduh TikTok',
      'Pengunduh video X dan Instagram',
    ],
  },
};
