import type { Translation } from './en';

export const id: Translation = {
  meta: {
    title: 'Hapus SynthID dan metadata dari foto dan video · {site}',
    description:
      '{site} menghapus metadata dan mengacak watermark SynthID pada foto dan video. Hapus tag EXIF, GPS, dan C2PA di server kami atau di perangkat Anda. Plus pengunduh YouTube, X, TikTok, dan Instagram.',
    ogDescription:
      'Hapus watermark SynthID dan metadata tersembunyi dari foto dan video, di server kami atau di perangkat Anda. Plus pengunduh YouTube, X, TikTok, dan Instagram.',
    twitterDescription:
      'Hapus watermark SynthID dan metadata tersembunyi dari foto dan video. Plus pengunduh YouTube, X, TikTok, dan Instagram.',
    ogImageAlt: '{site}: penghapus SynthID dan metadata',
  },
  nav: {
    label: 'Menu utama',
    home: 'Beranda {site}',
    synthid: 'SynthID',
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
    eyebrow: 'Hapus SynthID · hapus metadata · unduh video',
    title: ['Penghapus SynthID', '& Metadata.'],
    lede:
      'Masukkan foto atau video, lalu unduh salinannya tanpa tag EXIF, GPS, dan C2PA serta dengan watermark SynthID yang sudah diacak. Berjalan di server kami atau di browser Anda.',
    ctaStrip: 'Bersihkan file',
    ctaDownload: 'Unduh video',
    toolsLabel: 'Alat',
    chipStrip: 'SynthID & metadata',
  },
  synthid: {
    title: ['Penghapus SynthID', 'tanpa mengubah tampilan.'],
    lede:
      'SynthID adalah watermark tak terlihat yang ditambahkan Google ke piksel gambar dan video buatan AI. {site} sedikit mengubah piksel itu untuk memecah polanya. File tetap terlihat dan diputar sama.',
    sourcesTitle: 'Bersihkan file dari',
    sourcesLabel: 'Generator AI',
    photos: { title: 'Foto', text: 'Resample dan penajaman ringan mengubah setiap piksel, lalu gambar disimpan ulang dengan kualitas tinggi.' },
    videos: { title: 'Video', text: 'Encode ulang berkualitas tinggi (CRF 18) dengan blur ringan, penajaman yang seimbang, dan sedikit noise antar-frame.' },
    caveat: {
      title: 'Tanpa jaminan',
      text: 'SynthID dibuat agar tahan terhadap editan, jadi tidak ada alat yang bisa menjanjikan detektor tidak akan menemukannya. {site} mengacak watermark, tetapi tidak bisa menjamin watermark itu hilang.',
    },
    cta: 'Buka penghapus SynthID',
  },
  metadata: {
    title: ['Penghapus Metadata', 'untuk foto dan video.'],
    lede:
      'Foto dan video menyimpan lokasi pengambilan, perangkat, nomor serinya, dan riwayat editan. Penghapus metadata menghapus semuanya dan menampilkan apa saja yang dihapus.',
    synthidTag: 'Watermark SynthID',
    photosTitle: 'Dihapus dari foto',
    photoTags: ['EXIF', 'Lokasi GPS', 'XMP', 'IPTC', 'Profil ICC', 'C2PA / Content Credentials', 'Catatan produsen', 'Thumbnail', 'Komentar teks'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC dikembalikan sebagai JPEG.',
    videosTitle: 'Dihapus dari video',
    videoTags: ['Tag global & stream', 'Tag bab', 'Track GPS & telemetri', 'Timecode', 'Gambar sampul', 'Kotak C2PA', 'Info encoder'],
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
      text: 'Tempel tautan tiktok.com, termasuk tautan pendek vm. dan vt. Dapatkan videonya sebagai MP4 atau suaranya sebagai M4A.',
      cta: 'Buka pengunduh TikTok',
    },
    instagram: {
      title: ['Pengunduh', 'Instagram'],
      text: 'Tempel tautan Reel atau postingan video. Postingan publik bisa langsung; postingan privat butuh sesi yang sudah login.',
      cta: 'Buka pengunduh Instagram',
    },
  },
  how: {
    title: ['Cara menghapus SynthID', 'dan metadata.'],
    steps: [
      ['Unggah file kamu.', 'Video atau foto AI, sebanyak yang kamu mau. Di server atau di perangkat ini.'],
      ['{site} membersihkannya.', 'Tag EXIF, GPS, dan C2PA dihapus, dan watermark SynthID dilemahkan.'],
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
    title: ['Satu paket.', '{price} per bulan.'],
    perMonth: '/ bulan',
    features: ['Penghapus SynthID dan metadata', 'Pengunduh YouTube, X, TikTok, dan Instagram', 'Foto dan video dalam semua format umum'],
    billing: 'Ditagih bulanan melalui Stripe. Bisa dibatalkan kapan saja.',
    stripeLabel: 'Pembayaran lewat Stripe',
    cta: 'Buka alat',
  },
  faq: {
    title: ['Penghapusan SynthID', 'FAQ.'],
    items: [
      {
        q: 'Apa itu penghapus SynthID?',
        a: 'SynthID adalah watermark tak terlihat yang ditambahkan Google ke gambar dan video yang dibuat dengan model AI-nya. Penghapus SynthID sedikit mengubah piksel untuk memecah pola itu. {site} melakukan resample dan penajaman pada foto, serta encode ulang video dengan kualitas tinggi, sehingga file tetap terlihat sama.',
      },
      {
        q: 'Bagaimana cara menghapus SynthID dari video AI?',
        a: 'Buka penghapus SynthID, tambahkan video, biarkan penghapusan SynthID aktif, lalu pilih Server. {site} menghapus metadata, meng-encode ulang video dalam kualitas tinggi dengan perubahan piksel kecil yang melemahkan watermark, lalu memberimu MP4 bersih untuk diunduh. Video dari Google Veo dan Gemini membawa SynthID; langkah yang sama juga membersihkan metadata dari generator lain.',
      },
      {
        q: 'Generator AI apa saja yang didukung?',
        a: 'Semuanya. Video dan foto dari Google Veo, Gemini, dan Imagen membawa watermark SynthID. File dari Sora, ChatGPT, dan banyak alat lain membawa C2PA Content Credentials di metadatanya. Higgsfield memakai beberapa model, termasuk Veo, jadi filenya bisa membawa salah satunya. {site} menghapus metadata dari semuanya dan mengganggu SynthID jika ada. Watermark atau logo yang terlihat tidak dihapus.',
      },
      {
        q: 'Apakah TikTok atau platform lain tetap akan melabeli videoku sebagai AI?',
        a: 'Bisa jadi. Beberapa platform, termasuk TikTok, membaca C2PA Content Credentials untuk melabeli konten AI, dan {site} menghapusnya. Tetapi platform juga bisa memakai detektor watermark, pengklasifikasi sendiri, dan aturan pengungkapan, dan kami belum menguji bagaimana platform mana pun melabeli hasilnya. {site} tidak menjamin file akan lolos tanpa terdeteksi atau dilabeli. Ikuti aturan setiap platform tentang pengungkapan konten buatan AI.',
      },
      {
        q: 'Apakah penghapus SynthID selalu berhasil?',
        a: 'Tidak. SynthID dibuat agar tahan terhadap editan, dan detektor terus berubah. {site} mengacak watermark, tetapi detektor mungkin masih bisa menemukannya.',
      },
      {
        q: 'Apa saja yang dihapus oleh penghapus metadata?',
        a: 'Dari foto: EXIF (kamera, nomor seri, waktu, GPS), XMP, IPTC, profil ICC, C2PA Content Credentials, catatan produsen, thumbnail tertanam, dan komentar. Dari video: tag global, stream, dan bab, track GPS dan telemetri, timecode, gambar sampul, kotak C2PA, dan info encoder. Setiap file menampilkan daftar apa saja yang dihapus.',
      },
      {
        q: 'Apakah file saya diunggah?',
        a: 'Hanya jika Anda memilih Server. Dalam mode Server, file diunggah, dibersihkan, lalu langsung dihapus. Dalam mode Perangkat ini, file tetap di browser Anda. Di perangkat, foto dibersihkan tanpa kehilangan kualitas dan video di-remux; penghapusan SynthID di perangkat hanya untuk foto.',
      },
      {
        q: 'Format apa saja yang didukung?',
        a: 'Foto: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, dan GIF (HEIC disimpan sebagai JPEG). Video: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, dan FLV.',
      },
      {
        q: 'Apakah membersihkan file menurunkan kualitas?',
        a: 'Penghapusan metadata menyalin stream video tanpa encode ulang dan menyimpan foto dengan kualitas tinggi. Penghapusan SynthID harus mengubah piksel, jadi file tidak identik per byte, tetapi Anda tidak akan melihat perbedaan saat menonton biasa.',
      },
      {
        q: 'Apakah legal menghapus watermark SynthID?',
        a: 'Tergantung di mana Anda tinggal dan bagaimana file itu digunakan. Proses hanya konten milik Anda atau yang Anda punya izin untuk menggunakannya, dan beri label konten buatan AI jika hukum atau platform mewajibkannya.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Pengunduh', 'FAQ.'],
    items: [
      {
        q: 'Bagaimana cara mengunduh video YouTube?',
        a: 'Buka pengunduh YouTube, tempel tautan video atau Shorts, lalu tekan Unduh. Anda mendapat MP4 hingga 1080p, atau pilih Audio saja untuk file M4A. Anda bisa menempel beberapa tautan sekaligus.',
      },
      {
        q: 'Bagaimana cara mengunduh video dari X (Twitter)?',
        a: 'Salin tautan postingan (x.com atau twitter.com) dan tempel ke pengunduh X. Anda mendapat video dari postingan itu sebagai MP4.',
      },
      {
        q: 'Apakah pengunduh TikTok bisa dengan tautan pendek?',
        a: 'Bisa. Tempel tautan tiktok.com atau tautan pendek vm.tiktok.com / vt.tiktok.com dan Anda mendapat videonya sebagai MP4 atau suaranya sebagai M4A.',
      },
      {
        q: 'Kenapa tautan Instagram atau X gagal?',
        a: 'Postingan privat dan beberapa postingan publik butuh sesi yang sudah login. Jika postingan privat atau platform meminta login, unduhan gagal dengan pesan yang menjelaskannya.',
      },
      {
        q: 'Bisakah saya mengunduh audionya saja?',
        a: 'Bisa. Setiap pengunduh punya sakelar Video / Audio saja. Audio saja menghasilkan file M4A.',
      },
      {
        q: 'Apakah video yang saya unduh disimpan?',
        a: 'Tidak. Setiap video diambil di server kami, dikirim ke Anda, lalu langsung dihapus.',
      },
      {
        q: 'Apakah legal mengunduh video?',
        a: 'Unduh hanya video milik Anda atau yang Anda punya izin untuk menggunakannya. Mengunduh bisa melanggar ketentuan layanan platform, dan aturan hak cipta tergantung di mana Anda tinggal.',
      },
    ],
  },
  footer: {
    tagline: 'penghapus SynthID, penghapus metadata, serta pengunduh YouTube, X, TikTok, dan Instagram.',
    open: 'Buka alat',
    disclaimer:
      'Proses dan unduh hanya konten milik Anda atau yang Anda punya izin untuk menggunakannya, dan beri label konten buatan AI jika aturan mewajibkannya. {site} tidak berafiliasi dengan Google, YouTube, TikTok, X, atau Instagram.',
    badges: 'Ditampilkan di',
  },
  jsonLd: {
    name: '{site}: Penghapus SynthID & Metadata',
    alternateName: ['Hapus SynthID', 'Penghapus metadata', 'Pengunduh YouTube', 'Pengunduh video X', 'Pengunduh TikTok', 'Pengunduh Instagram'],
    browserRequirements: 'Membutuhkan browser modern dengan JavaScript.',
    operatingSystem: 'Apa saja (browser web)',
    description:
      'Hapus metadata EXIF, GPS, XMP, IPTC, dan C2PA dari foto dan video serta acak watermark SynthID, di server atau di perangkat Anda. Termasuk pengunduh YouTube, TikTok, X, dan Instagram.',
    featureList: [
      'Penghapusan SynthID untuk foto dan video',
      'Penghapus metadata EXIF, GPS, XMP, IPTC, ICC, dan C2PA',
      'Opsi pemrosesan di perangkat',
      'Pengunduh YouTube (MP4 hingga 1080p atau audio M4A)',
      'Pengunduh TikTok',
      'Pengunduh video X dan Instagram',
    ],
  },
};
