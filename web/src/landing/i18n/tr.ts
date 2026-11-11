import type { Translation } from './en';

export const tr: Translation = {
  meta: {
    title: 'Fotoğraf ve videolardan SynthID ve meta veri kaldırma · {site}',
    description:
      '{site}, fotoğraf ve videolardaki meta verileri siler ve SynthID filigranını bozar. EXIF, GPS ve C2PA etiketlerini sunucumuzda ya da kendi cihazınızda kaldırın. Ayrıca YouTube, X, TikTok ve Instagram indiricileri.',
    ogDescription:
      'Fotoğraf ve videolardan SynthID filigranını ve gizli meta verileri sunucumuzda ya da kendi cihazınızda kaldırın. Ayrıca YouTube, X, TikTok ve Instagram indiricileri.',
    twitterDescription:
      'Fotoğraf ve videolardan SynthID filigranını ve gizli meta verileri kaldırın. Ayrıca YouTube, X, TikTok ve Instagram indiricileri.',
    ogImageAlt: '{site}: SynthID ve meta veri temizleyici',
  },
  nav: {
    label: 'Ana menü',
    home: '{site} ana sayfa',
    synthid: 'SynthID',
    metadata: 'Meta veri',
    downloaders: 'İndiriciler',
    pricing: 'Fiyat',
    faq: 'SSS',
    openTools: 'Araçları aç',
    language: 'Dil',
    menu: 'Menü',
    mobileLabel: 'Ana menü (mobil)',
  },
  hero: {
    eyebrow: 'SynthID kaldırma · meta veri silme · video indirme',
    title: ['SynthID Kaldırıcı', 've Meta Veri Temizleyici.'],
    lede:
      'Bir fotoğraf ya da video bırakın; EXIF, GPS ve C2PA etiketleri silinmiş ve SynthID filigranı bozulmuş bir kopyasını indirin. Sunucumuzda ya da tarayıcınızda çalışır.',
    ctaStrip: 'Dosya temizle',
    ctaDownload: 'Video indir',
    toolsLabel: 'Araçlar',
    chipStrip: 'SynthID ve meta veri',
  },
  synthid: {
    title: ['SynthID kaldırın,', 'görüntü aynı kalsın.'],
    lede:
      'SynthID, Google’ın yapay zekâ ile üretilen görsel ve videoların piksellerine eklediği görünmez bir filigrandır. {site} bu pikselleri hafifçe değiştirerek deseni bozar. Dosya aynı görünür, aynı oynar.',
    sourcesTitle: 'Şu araçların dosyalarını temizler',
    sourcesLabel: 'Yapay zekâ üreticileri',
    photos: { title: 'Fotoğraflar', text: 'Hafif bir yeniden örnekleme ve keskinleştirme her pikseli değiştirir, ardından görsel yüksek kalitede yeniden kaydedilir.' },
    videos: { title: 'Videolar', text: 'Hafif bir bulanıklık, ona denk bir keskinleştirme ve kareler arasında biraz gürültüyle yüksek kaliteli yeniden kodlama (CRF 18).' },
    caveat: {
      title: 'Garanti yok',
      text: 'SynthID düzenlemelere dayanacak şekilde tasarlandı; hiçbir araç bir algılayıcının onu bulamayacağını vaat edemez. {site} filigranı bozar, ama tamamen yok olduğunu garanti edemez.',
    },
    cta: 'SynthID kaldırıcıyı aç',
  },
  metadata: {
    title: ['Meta Veri Temizleyici', 'fotoğraf ve videolar için.'],
    lede:
      'Fotoğraf ve videolar çekildikleri yeri, cihazı, seri numarasını ve düzenleme geçmişini saklar. Meta veri temizleyici bunların hepsini siler ve neyi kaldırdığını listeler.',
    synthidTag: 'SynthID filigranı',
    photosTitle: 'Fotoğraflardan kaldırılanlar',
    photoTags: ['EXIF', 'GPS konumu', 'XMP', 'IPTC', 'ICC profilleri', 'C2PA / Content Credentials', 'Üretici notları', 'Küçük resimler', 'Metin yorumları'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC dosyaları JPEG olarak döner.',
    videosTitle: 'Videolardan kaldırılanlar',
    videoTags: ['Genel ve akış etiketleri', 'Bölüm etiketleri', 'GPS ve telemetri izleri', 'Zaman kodu', 'Kapak görseli', 'C2PA kutuları', 'Kodlayıcı bilgileri'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Akışlar yeniden kodlanmadan kopyalanır.',
  },
  downloaders: {
    label: 'Video indiriciler',
    youtube: {
      title: ['YouTube', 'İndirici'],
      text: 'YouTube video veya Shorts bağlantılarını yapıştırın. 1080p’ye kadar MP4 ya da M4A ses dosyası alın.',
      cta: 'YouTube İndiriciyi aç',
    },
    x: {
      title: ['X', 'İndirici'],
      text: 'Bir x.com veya twitter.com gönderi bağlantısı yapıştırın, o gönderideki videoyu MP4 olarak alın.',
      cta: 'X İndiriciyi aç',
    },
    tiktok: {
      title: ['TikTok', 'İndirici'],
      text: 'vm. ve vt. kısa bağlantıları dahil tiktok.com bağlantılarını yapıştırın. Videoyu MP4, sesi M4A olarak alın.',
      cta: 'TikTok İndiriciyi aç',
    },
    instagram: {
      title: ['Instagram', 'İndirici'],
      text: 'Bir Reel ya da video gönderisinin bağlantısını yapıştırın. Herkese açık gönderiler çalışır; gizli olanlar oturum açılmış bir hesap ister.',
      cta: 'Instagram İndiriciyi aç',
    },
  },
  how: {
    title: ['SynthID ve meta veriler', 'nasıl kaldırılır.'],
    steps: [
      ['Dosyanı yükle.', 'Yapay zekâ videoları veya fotoğrafları, istediğin kadar. Sunucuda ya da bu cihazda.'],
      ['{site} temizler.', 'EXIF, GPS ve C2PA etiketleri silinir, SynthID filigranı zayıflatılır.'],
      ['Temiz kopyayı indir.', 'Her dosya neyin silindiğini gösterir.'],
    ],
    flow: {
      uploading: 'Yükleniyor…',
      stripping: 'Meta veriler siliniyor · SynthID zayıflatılıyor…',
      clean: 'Temiz · 4 öğe silindi',
      download: 'İndir',
    },
    cta: 'SynthID kaldırıcıyı aç',
  },
  pricing: {
    title: ['Tek plan.', 'Aylık {price}.'],
    perMonth: '/ ay',
    features: ['SynthID kaldırıcı ve meta veri temizleyici', 'YouTube, X, TikTok ve Instagram indiricileri', 'Tüm yaygın biçimlerde fotoğraf ve video'],
    billing: 'Stripe üzerinden aylık faturalandırılır. İstediğiniz zaman iptal edin.',
    stripeLabel: 'Stripe ile ödeme',
    cta: 'Araçları aç',
  },
  faq: {
    title: ['SynthID kaldırma', 'SSS.'],
    items: [
      {
        q: 'SynthID kaldırıcı nedir?',
        a: 'SynthID, Google’ın yapay zekâ modelleriyle üretilen görsel ve videolara eklediği görünmez bir filigrandır. SynthID kaldırıcı, bu deseni bozmak için pikselleri hafifçe değiştirir. {site} fotoğrafları yeniden örnekleyip keskinleştirir, videoları yüksek kalitede yeniden kodlar; böylece dosya aynı görünür.',
      },
      {
        q: 'Yapay zekâ videolarından SynthID nasıl kaldırılır?',
        a: 'SynthID kaldırıcıyı aç, videonu ekle, SynthID kaldırmayı açık bırak ve Sunucu\'yu seç. {site} meta verileri siler, videoyu filigranı zayıflatan küçük piksel değişiklikleriyle yüksek kalitede yeniden kodlar ve indirmen için temiz bir MP4 verir. Google Veo ve Gemini videolarında SynthID bulunur; aynı adımlar diğer üreticilerin meta verilerini de temizler.',
      },
      {
        q: 'Hangi yapay zekâ üreticileriyle çalışır?',
        a: 'Hepsiyle. Google Veo, Gemini ve Imagen video ve fotoğraflarında SynthID filigranı bulunur. Sora, ChatGPT ve diğer pek çok aracın dosyalarının meta verilerinde C2PA Content Credentials bulunur. Higgsfield, Veo dahil birkaç model kullandığı için dosyalarında ikisinden biri olabilir. {site} hepsinden meta verileri siler ve varsa SynthID\'yi bozar. Görünür filigranları veya logoları kaldırmaz.',
      },
      {
        q: 'TikTok veya diğer platformlar videomu yine de yapay zekâ olarak etiketler mi?',
        a: 'Etiketleyebilir. TikTok dahil bazı platformlar yapay zekâ içeriğini etiketlemek için C2PA Content Credentials\'ı okur ve {site} bunları siler. Ancak platformlar filigran dedektörleri, kendi sınıflandırıcıları ve beyan kuralları da kullanabilir; çıktının herhangi bir platformda nasıl etiketlendiğini test etmedik. {site} bir dosyanın tespit edilmeyeceğini veya etiketlenmeyeceğini garanti etmez. Yapay zekâ ile üretilmiş içeriğin beyanı konusunda her platformun kurallarına uy.',
      },
      {
        q: 'SynthID kaldırma her zaman işe yarar mı?',
        a: 'Hayır. SynthID düzenlemelere dayanacak şekilde tasarlandı ve algılayıcılar sürekli değişiyor. {site} filigranı bozar, ama bir algılayıcı onu yine de bulabilir.',
      },
      {
        q: 'Meta veri temizleyici neleri kaldırır?',
        a: 'Fotoğraflardan: EXIF (kamera, seri numarası, saat, GPS), XMP, IPTC, ICC profilleri, C2PA Content Credentials, üretici notları, gömülü küçük resimler ve yorumlar. Videolardan: genel, akış ve bölüm etiketleri, GPS ve telemetri izleri, zaman kodu, kapak görseli, C2PA kutuları ve kodlayıcı bilgileri. Her dosya kaldırılanların listesini gösterir.',
      },
      {
        q: 'Dosyalarım yükleniyor mu?',
        a: 'Yalnızca Sunucu’yu seçerseniz. Sunucu modunda dosya yüklenir, temizlenir ve hemen silinir. Bu cihaz modunda tarayıcınızda kalır. Cihazda fotoğraflar kayıpsız temizlenir, videolar yeniden paketlenir; cihazda SynthID kaldırma yalnızca fotoğraflarda çalışır.',
      },
      {
        q: 'Hangi formatlar destekleniyor?',
        a: 'Fotoğraflar: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF ve GIF (HEIC, JPEG olarak kaydedilir). Videolar: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV ve FLV.',
      },
      {
        q: 'Temizleme kaliteyi düşürür mü?',
        a: 'Meta veri kaldırma, video akışlarını yeniden kodlamadan kopyalar ve fotoğrafları yüksek kalitede kaydeder. SynthID kaldırma pikselleri değiştirmek zorunda olduğundan dosya bayt bayt aynı olmaz, ama normal izlemede fark görmezsiniz.',
      },
      {
        q: 'SynthID filigranını kaldırmak yasal mı?',
        a: 'Yaşadığınız yere ve dosyayı nasıl kullandığınıza bağlıdır. Yalnızca size ait ya da kullanma izniniz olan içerikleri işleyin ve yasa veya platform gerektiriyorsa yapay zekâ ile üretilen içeriği etiketleyin.',
      },
    ],
  },
  downloaderFaq: {
    title: ['İndiriciler', 'SSS.'],
    items: [
      {
        q: 'YouTube videosu nasıl indirilir?',
        a: 'YouTube İndirici’yi açın, bir video veya Shorts bağlantısı yapıştırın ve İndir’e basın. 1080p’ye kadar MP4 alırsınız ya da M4A dosyası için Yalnızca ses’i seçin. Birden çok bağlantıyı aynı anda yapıştırabilirsiniz.',
      },
      {
        q: 'X (Twitter) videosu nasıl indirilir?',
        a: 'Gönderinin bağlantısını (x.com veya twitter.com) kopyalayıp X İndirici’ye yapıştırın. O gönderideki videoyu MP4 olarak alırsınız.',
      },
      {
        q: 'TikTok İndirici kısa bağlantılarla çalışır mı?',
        a: 'Evet. Bir tiktok.com bağlantısı ya da vm.tiktok.com / vt.tiktok.com kısa bağlantısı yapıştırın; videoyu MP4, sesi M4A olarak alın.',
      },
      {
        q: 'Instagram veya X bağlantısı neden başarısız oluyor?',
        a: 'Gizli gönderiler ve bazı herkese açık gönderiler oturum açılmış bir hesap ister. Gönderi gizliyse ya da platform giriş isterse, indirme bunu belirten bir mesajla başarısız olur.',
      },
      {
        q: 'Yalnızca sesi indirebilir miyim?',
        a: 'Evet. Her indiricide Video / Yalnızca ses anahtarı vardır. Yalnızca ses size bir M4A dosyası verir.',
      },
      {
        q: 'İndirdiğim videoları saklıyor musunuz?',
        a: 'Hayır. Her video sunucumuzda alınır, size gönderilir ve hemen ardından silinir.',
      },
      {
        q: 'Video indirmek yasal mı?',
        a: 'Yalnızca size ait ya da kullanma izniniz olan videoları indirin. İndirmek bir platformun kullanım koşullarını ihlal edebilir ve telif hakkı kuralları yaşadığınız yere göre değişir.',
      },
    ],
  },
  footer: {
    tagline: 'SynthID kaldırıcı, meta veri temizleyici ve YouTube, X, TikTok ve Instagram indiricileri.',
    open: 'Araçları aç',
    disclaimer:
      'Yalnızca size ait ya da kullanma izniniz olan içerikleri işleyin ve indirin; kurallar gerektiriyorsa yapay zekâ ile üretilen içeriği etiketleyin. {site}, Google, YouTube, TikTok, X veya Instagram ile bağlantılı değildir.',
    badges: 'Yer aldığımız yerler',
  },
  jsonLd: {
    name: '{site}: SynthID Kaldırıcı ve Meta Veri Temizleyici',
    alternateName: ['SynthID kaldırma', 'Meta veri temizleyici', 'YouTube video indirici', 'X video indirici', 'TikTok video indirici', 'Instagram video indirici'],
    browserRequirements: 'JavaScript destekli güncel bir tarayıcı gerekir.',
    operatingSystem: 'Hepsi (web tarayıcısı)',
    description:
      'Fotoğraf ve videolardan EXIF, GPS, XMP, IPTC ve C2PA meta verilerini kaldırın ve SynthID filigranlarını bozun; sunucuda ya da kendi cihazınızda. YouTube, TikTok, X ve Instagram indiricileri dahil.',
    featureList: [
      'Fotoğraf ve videolarda SynthID kaldırma',
      'EXIF, GPS, XMP, IPTC, ICC ve C2PA meta veri temizleyici',
      'Cihazda işleme seçeneği',
      'YouTube indirici (1080p’ye kadar MP4 veya M4A ses)',
      'TikTok indirici',
      'X ve Instagram video indiricileri',
    ],
  },
};
