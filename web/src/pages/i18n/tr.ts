import type { PagesTranslation } from './types';
import type { Section } from '../guides';

const LEGAL_DL: Section = {
  h: 'Yasal mı?',
  blocks: [
    {
      p: 'Yalnızca kendi çektiğin, yeniden kullanım lisansı olan (örneğin Creative Commons) ya da sahibinin kullanmana izin verdiği videoları indir. Çoğu platformun hizmet şartları indirmeyi sınırlar ve telif hakkı yasaları ülkeden ülkeye değişir. Bir videoyu kaydetmek sana onu yeniden yükleme hakkı vermez ve {site} bu platformların hiçbiriyle bağlantılı değildir.',
    },
  ],
};

export const tr: PagesTranslation = {
  ui: {
    locale: 'tr-TR',
    kind: { synthid: 'SynthID rehberi', privacy: 'Gizlilik rehberi', download: 'İndirme rehberi' },
    stepsTitle: '{site} ile adım adım',
    questions: 'Sık sorulan sorular',
    related: 'İlgili rehberler',
    contents: 'Bu sayfada',
    updated: 'Güncellendi',
    home: 'Ana sayfa',
    guides: 'Rehberler',
    pricing: 'Fiyatlar',
    openTools: 'Araçları aç',
    navLabel: 'Ana menü',
    breadcrumb: 'İçerik yolu',
    language: 'Dil',
    footer: {
      tagline: 'Meta veri, C2PA ve SynthID temizleyici; ayrıca YouTube, TikTok, X ve Instagram indiricileri.',
      open: 'Araçları aç',
      synthidGuides: 'SynthID rehberleri',
      privacyGuides: 'Gizlilik rehberleri',
      downloadGuides: 'İndirme rehberleri',
      allGuides: 'Tüm rehberler',
      privacyPolicy: 'Gizlilik Politikası (İngilizce)',
      terms: 'Hizmet Şartları (İngilizce)',
      disclaimer:
        'Yalnızca sana ait ya da kullanma iznin olan içerikleri işle ve indir; kurallar gerektirdiğinde yapay zekâyla üretilmiş içeriği etiketle. {site}; Google, YouTube, TikTok, X, Instagram veya Meta ile bağlantılı değildir.',
    },
    index: {
      metaTitle: 'Rehberler: SynthID, meta veri ve video indirme',
      description:
        'SynthID ve yapay zekâ filigranları, fotoğraf ve videolardan GPS, EXIF ve C2PA verilerini kaldırma, YouTube, TikTok, X ve Instagram videolarını indirme rehberleri.',
      title: ['{site}', 'rehberleri.'],
      lede: 'Dosyalarındaki meta verileri temizlemek ve video indirmek için telefonunun ya da bilgisayarının yerleşik seçenekleriyle ve {site} araçlarıyla adım adım rehberler.',
      groups: {
        synthid: {
          title: 'SynthID ve yapay zekâ filigranları',
          text: 'Google’ın görünmez filigranı SynthID nedir; Veo, Gemini ve Imagen görsel ve videolarında filigranı zayıflatıp meta verileri temizleyerek platformların onları yapay zekâ olarak işaretlemesini nasıl önlersin.',
        },
        privacy: {
          title: 'Gizlilik ve meta veri',
          text: 'Fotoğraf ve videolardaki gizli verileri kaldır: konum, cihaz bilgileri, tarihler, düzenleme geçmişi ve C2PA Content Credentials.',
        },
        download: {
          title: 'Video indirme',
          text: 'YouTube, TikTok, X ve Instagram’daki herkese açık videoları MP4 olarak kaydet ya da yalnızca sesi M4A olarak al.',
        },
      },
    },
    promo: {
      eyebrow: 'Planlar',
      title: ['Her dosyayı temizle.', '$2 ile başla.'],
      text: 'İlk temizleme ve indirmelerin ücretsiz. Sonrasında 10 SynthID temizlemeyi $2’ye dene ya da Basic veya Pro ile sınırsız kullan.',
      orYearly: 'ya da yıllık {price}',
      seePlans: 'Tüm planları karşılaştır',
      download: {
        badge: 'Sınırsız indirme',
        title: ['Sınırsız indir.', 'Pro’ya geç.'],
        text: 'İlk video indirmen ücretsiz. İndirmeler sunucumuzda çalıştığı için sonrasında Pro gerekir: YouTube, X, TikTok ve Instagram’dan sınırsız indirme ve daha hızlı temizleme.',
        cardText: 'YouTube, X, TikTok ve Instagram’dan sınırsız video indirme, ayrıca yaklaşık 4 kat daha hızlı sunucu temizleme. İstediğin zaman iptal et.',
        billing: 'Aylık ya da yıllık faturalandırılır. İstediğin zaman iptal et ya da planını değiştir.',
        cta: 'Sınırsız indir',
      },
    },
  },
  guides: {
    'what-is-synthid': {
      title: 'SynthID nedir? Google’ın görünmez yapay zekâ filigranı açıklandı',
      metaTitle: 'SynthID nedir? Google’ın yapay zekâ filigranı',
      description:
        'SynthID, Google DeepMind’ın yapay zekâ görsellerine, videolarına, seslerine ve metinlerine eklediği görünmez filigrandır. Nasıl çalışır, nasıl tespit edilir, C2PA’dan farkı ne, kaldırılabilir mi?',
      short: 'SynthID nedir?',
      cta: 'Bir dosyadan SynthID’yi kaldır',
      stepsTitle: '{site} ile SynthID nasıl kaldırılır',
      intro: [
        '**SynthID, Google DeepMind’ın Google yapay zekâ modellerinin ürettiği içeriğe gömdüğü görünmez bir filigrandır.** Görsellerin ve video karelerinin piksellerine, sesin dalga formuna ve metnin kelime seçimine işlenir; bu yüzden ne görülür ne duyulur ve meta veriler silinse bile dosyada kalır. Daha sonra bir dedektör bunu okuyup dosyanın Google yapay zekâsıyla yapılıp yapılmadığını söyleyebilir.',
        'Gemini (Nano Banana modelleri dahil) ve Imagen görselleri, Veo videoları, Lyria müzikleri ve Gemini metinleri SynthID taşıyabilir. Bu rehber filigranın nasıl çalıştığını, bir dosyada olup olmadığını nasıl kontrol edeceğini, C2PA Content Credentials’tan farkını, yapay zekâ içeriği paylaşanlar için ne anlama geldiğini ve [SynthID’yi kaldırmak](/app/#strip) için neyi yapıp neyi yapamayacağını anlatır.',
      ],
      steps: [
        { name: 'SynthID temizleyiciyi aç', text: '{site} içindeki [Strip sekmesine](/app/#strip) git ve Google ile giriş yap.' },
        { name: 'Görselini veya videonu ekle', text: 'Gemini, Imagen, Veo ya da başka bir üreticiden gelen dosyaları bırak. JPEG, PNG, WebP, HEIC, MP4, MOV ve daha fazlası desteklenir.' },
        { name: 'Sunucu veya Bu cihaz’ı seç', text: 'Sunucu büyük videoları yaklaşık 4 kat daha hızlı yeniden kodlar ve hemen ardından siler. Bu cihaz dosyayı hiç yüklemez.' },
        { name: 'Temiz kopyayı indir', text: 'C2PA dahil meta veriler silinir ve SynthID filigranı zayıflatılır. Her dosya neyin kaldırıldığını gösterir.' },
      ],
      sections: [
        {
          h: 'Kısaca SynthID',
          blocks: [
            {
              ul: [
                '**Geliştiren:** Google DeepMind. Ağustos 2023’te Imagen görselleri için başlatıldı, sonra video, ses ve metne genişletildi.',
                '**Neyi işaretler:** Gemini, Nano Banana, Imagen, Veo ve Lyria gibi Google yapay zekâ modellerinin ürettiği içeriği. Google 10 milyardan fazla içeriği filigranladığını söylüyor.',
                '**Nerede durur:** Meta verilerde değil, içeriğin kendisinde (pikseller, kareler, ses veya kelime seçimi).',
                '**Görünür mü?** Hayır. Değişiklikler görülemeyecek ya da duyulamayacak kadar küçüktür.',
                '**Kim okuyabilir:** Google’ın SynthID Detector aracı ve Gemini uygulaması gibi Google ürünlerindeki kontrol özellikleri.',
                '**Kaldırılabilir mi?** Yaygın düzenlemelere dayanacak şekilde tasarlandığı için bir meta veri etiketi gibi silinemez. Yeniden kodlama onu zayıflatabilir, ama garantisi yoktur.',
              ],
            },
          ],
        },
        {
          h: 'SynthID nasıl çalışır',
          blocks: [
            {
              p: 'SynthID, bitmiş bir dosyanın üstüne basılan bir damga değildir. İçerik üretilirken, birlikte eğitilmiş iki sinir ağıyla uygulanır: biri bir deseni kodlayan çok küçük değişiklikler yapar, diğeri dosya değiştirildikten sonra bile o deseni yeniden bulmayı öğrenir.',
            },
            {
              ul: [
                '**Görseller:** Birçok pikselin değeri hafifçe ayarlanarak tüm görsele yayılan bir desen oluşturulur. Hiçbir bölge desenin tamamını taşımadığı için bir kısmı kırpmak onu silmez.',
                '**Video:** Her kare bir görsel gibi filigranlanır; bu yüzden filigran klibi kırpmaya veya kare hızını değiştirmeye dayanır. Veo videolarında her karede filigran vardır.',
                '**Ses:** Desen sese kulağın fark etmeyeceği şekilde eklenir ve MP3 sıkıştırmasına, eklenen gürültüye ve hız değişikliklerine dayanacak şekilde tasarlanmıştır.',
                '**Metin:** Gemini yazarken SynthID bir sonraki kelimenin olasılığını biraz değiştirir. Uzun bir metinde bu seçimler istatistiksel bir sinyal oluşturur. Google metin sürümünü diğer geliştiriciler de kullanabilsin diye açık kaynak olarak yayımladı.',
              ],
            },
            {
              p: 'Filigran içeriğin bir parçası olduğu için dosya biçimine bağlı değildir. Bir PNG’yi JPEG olarak kaydetmek, videoyu yeniden sıkıştıran bir platforma yüklemek ya da ekran görüntüsü almak çoğu zaman onu okunabilir bırakır.',
            },
          ],
        },
        {
          h: 'SynthID, C2PA Content Credentials ve meta veriler arasındaki fark',
          blocks: [
            { p: 'Yapay zekâ dosyaları genellikle aynı anda birkaç etiket taşır ve her biri farklı şekilde kaldırılır:' },
            {
              ul: [
                '**SynthID**, piksellerin veya sesin içindeki görünmez bir filigrandır. Meta verileri silmek ona dokunmaz. Yalnızca içeriğin kendisi değiştirilerek zayıflatılabilir.',
                '**C2PA Content Credentials**, dosyanın meta verilerinde yer alan ve onu hangi aracın oluşturduğunu ve nasıl düzenlendiğini söyleyen imzalı bir kayıttır. TikTok gibi platformlar bunu okuyarak otomatik bir “yapay zekâ ile üretildi” etiketi ekler. Meta veri temizliği onu tamamen kaldırır. [C2PA nedir ve nasıl kaldırılır](/guides/remove-c2pa-content-credentials/) rehberine bak.',
                '**IPTC ve XMP etiketleri**, örneğin “Digital Source Type” alanı, bazı üreticilerin bir görselin yapay zekâ ürünü olduğunu belirtmek için eklediği sıradan meta verilerdir. [EXIF ve meta veriler nasıl kaldırılır](/guides/remove-exif-data-from-photos/) rehberine bak.',
                '**Görünür filigranlar**, örneğin köşedeki parıltı logosu, görselin üstüne çizilmiştir ve ayrı bir şeydir.',
              ],
            },
            { p: 'Google bazı ürünlerde SynthID ile C2PA’yı birlikte kullanır: meta veriler hızlı kontrol edilir ama kolayca kaybolur; filigranı kaldırmak daha zordur ama okumak için bir dedektör gerekir.' },
          ],
        },
        {
          h: 'Bir görselde veya videoda SynthID olup olmadığı nasıl anlaşılır',
          blocks: [
            {
              ul: [
                '**SynthID Detector:** Google’ın doğrulama portalı. Bir görsel, video veya ses yüklersin; bir SynthID filigranı bulup bulmadığını söyler ve görsellerde filigranın en olası olduğu bölgeleri vurgulayabilir.',
                '**Gemini uygulaması:** Bir görsel ya da video yükleyip Google yapay zekâsıyla yapılıp yapılmadığını sor. Gemini SynthID’yi kontrol eder ve sohbette yanıt verir.',
                '**Content Credentials Verify:** [contentcredentials.org/verify](https://contentcredentials.org/verify) SynthID’yi değil, C2PA meta verilerini gösterir. Bir dosya bir kontrolden geçip diğerinden geçmeyebilir.',
              ],
            },
            {
              note: '“Bulunamadı” sonucu bir dosyanın insan tarafından yapıldığını kanıtlamaz. SynthID yalnızca onu kullanan modellerin içeriğini işaretler ve çok düzenlenmiş bir dosya okunabilir sinyalini kaybedebilir. Aynı şekilde bir dedektör yalnızca bir filigranın muhtemelen var olduğunu söyleyebilir; dosyayı kimin oluşturduğunu kanıtlamaz.',
            },
          ],
        },
        {
          h: 'SynthID neye dayanır, ne onu zayıflatır',
          blocks: [
            { p: 'Google, SynthID’yi bir dosyanın paylaşılırken maruz kaldığı olağan düzenlemelere dayanacak şekilde tasarladı: sıkıştırma, yeniden boyutlandırma, hafif kırpma, renk ve parlaklık değişiklikleri, filtreler, biçim dönüşümleri ve videoda kare hızı değişiklikleri. Birçok uygulama dosyayı yeniden kaydeder kaydetmez kaybolan meta verilerden farkı budur.' },
            { p: 'Kırılmaz değildir. Google da bir görseldeki büyük değişikliklerin veya bir metindeki çok sayıda düzenlemenin sinyali dedektörün emin olamayacağı kadar zayıflatabileceğini kabul ediyor. Araştırmacılar da benzer filigran sistemlerine yönelik saldırılar yayımladı. Pikseller ne kadar çok değişirse filigran o kadar zayıflar ama görsel de o kadar zarar görebilir; bu yüzden iyi bir SynthID temizleyicinin hedefi, görseli farklı göstermeden her pikseli değiştirmektir.' },
          ],
        },
        {
          h: 'SynthID içerik üreticileri için neden önemli',
          blocks: [
            { p: 'Yapay zekâ görselleri veya videoları paylaşıyorsan, platformların ve izleyicilerin bunu öğrenme yolu SynthID ve C2PA’dır. TikTok, Instagram, YouTube ve diğerleri her yüklemeyi Content Credentials ve filigranlar için tarar ve bulursa kapatamayacağın bir yapay zekâ etiketi ekleyebilir. Kurallar da sıkılaşıyor: AB’de Yapay Zekâ Yasası’nın Ağustos 2026’dan itibaren uygulanan şeffaflık yükümlülükleri (Madde 50), yapay zekâ sağlayıcılarının üretilen içeriği makinece okunabilir şekilde işaretlemesini istiyor ve SynthID Google’ın bunu yapma yollarından biri.' },
            { p: 'Bu sinyalleri kaldırmak, bir platform veya yasa gerektirdiğinde yapay zekâ içeriğini açıklama yükümlülüğünü ortadan kaldırmaz. Sana geri verdiği şey, her gönderiye otomatik bir etiket yerine çalışmanı ne zaman ve nasıl etiketleyeceğine kendin karar vermendir.' },
          ],
        },
        {
          h: 'SynthID kaldırılabilir mi?',
          blocks: [
            { p: 'Kesip atılacak ayrı bir blok olmadığı için SynthID bir meta veri etiketi gibi silinemez. Yapılabilecek şey, görseli aynı gösterirken her pikseli ya da örneği desenin artık tutmayacağı kadar değiştirmektir. [{site} SynthID temizleyici](/app/#strip) tam olarak bunu yapar:' },
            {
              ul: [
                '**Görseller:** Neredeyse birebir yeniden örnekleme, çok hafif bir gürültü ve yumuşak bir keskinleştirme her pikseli kaydırır; görsel yüksek kalitede yeniden kaydedilir.',
                '**Videolar:** Hafif bir bulanıklık, onu dengeleyen bir keskinleştirme ve kareden kareye değişen biraz gürültüyle yüksek kaliteli yeniden kodlama (CRF 18); ses de hafifçe yeniden örneklenir.',
                '**Meta veriler:** EXIF, GPS, XMP, IPTC ve C2PA Content Credentials her dosyadan tamamen silinir.',
              ],
            },
            { note: 'SynthID düzenlemelere dayanacak şekilde yapıldığı için hiçbir araç bir dedektörün onu bulamayacağına söz veremez. {site} filigranı, dosyayı gözle görülür şekilde değiştirmeden mümkün olduğunca zayıflatır. C2PA dahil meta veriler her zaman tamamen silinir.' },
            { p: 'Her üretici için adım adım rehberler: [Google Veo videoları](/guides/remove-synthid-from-google-veo/), [Gemini ve Nano Banana görselleri](/guides/remove-synthid-from-gemini-images/), [Imagen görselleri](/guides/remove-synthid-from-imagen-images/) ve [Higgsfield dosyaları](/guides/remove-synthid-from-higgsfield/).' },
          ],
        },
      ],
      faq: [
        { q: 'Basitçe SynthID nedir?', a: 'SynthID, Google’ın yapay zekâsının oluşturduğu görsellerin, videoların, seslerin ve metinlerin içine koyduğu gizli bir filigrandır. Görülemez, ama Google’ın dedektörü onu okuyarak içeriğin Google yapay zekâsından çıktığını anlayabilir.' },
        { q: 'SynthID görünür mü?', a: 'Hayır. Piksellerdeki veya sesteki değişiklikler görülemeyecek ya da duyulamayacak kadar küçüktür. Bazı Gemini görsellerindeki parıltı logosu ayrı, görünür bir filigrandır.' },
        { q: 'Hangi yapay zekâ araçları SynthID kullanır?', a: 'Google’ın modelleri: Gemini ve Nano Banana görsel modelleri, Imagen, Veo, Lyria ve Gemini metinleri. Google SynthID’yi iş ortaklarına da sunuyor, bu yüzden başka şirketlerin içeriğinde de bulunabilir. Midjourney veya Sora gibi diğer üreticilerin çoğu C2PA meta verisi ya da kendi filigranlarını kullanır.' },
        { q: 'Meta verileri silmek SynthID’yi de siler mi?', a: 'Hayır. SynthID meta verilerde değil piksellerde olduğu için EXIF veya C2PA’yı silmek onu olduğu gibi bırakır. Zayıflatmak için piksellerin değişmesi gerekir; {site} SynthID temizliği de bunu yapar.' },
        { q: 'Ekran görüntüsü almak veya yeniden kaydetmek SynthID’yi siler mi?', a: 'Genellikle hayır. Ekran görüntüleri, biçim dönüşümleri ve sıkıştırma piksel desenini büyük ölçüde korur; SynthID bunlara dayanacak şekilde tasarlandı. Sildikleri şey meta verilerin çoğudur.' },
        { q: 'Bir görselde SynthID olup olmadığını nasıl anlarım?', a: 'Google’ın SynthID Detector aracına yükle ya da Gemini uygulamasına görselin Google yapay zekâsıyla yapılıp yapılmadığını sor. İkisi de bir dosyanın yapay zekâyla yapılmadığını kanıtlayamaz.' },
        { q: 'SynthID ile C2PA aynı şey mi?', a: 'Hayır. C2PA Content Credentials dosyadan silinebilen imzalı meta verilerdir. SynthID ise içeriğin kendisindeki bir filigrandır. Birçok Google dosyası ikisini de taşır. [{site}](/app/#strip) C2PA’yı tamamen siler ve SynthID’yi zayıflatır.' },
        { q: 'SynthID tamamen kaldırılabilir mi?', a: 'Kesin olarak hayır. Düzenlemelere dayanacak şekilde yapıldı ve dedektörler sürekli gelişiyor. {site}’nın yaptığı gibi küçük piksel değişiklikleriyle yeniden kodlamak, dosyanın görünüşünü değiştirmeden onu zayıflatır; ama hiçbir araç bir dedektörün onu bulamayacağını garanti edemez.' },
        { q: 'SynthID’yi kaldırmak yasal mı?', a: 'Nerede yaşadığına ve dosyayı nasıl kullandığına bağlıdır. Yalnızca sana ait ya da kullanma iznin olan içerikleri işle ve yasa veya bir platform gerektirdiğinde yapay zekâyla üretilmiş içeriği etiketle.' },
      ],
    },
    'remove-synthid-from-google-veo': {
      title: 'Google Veo videolarından SynthID nasıl kaldırılır',
      metaTitle: 'Google Veo videolarından SynthID kaldırma',
      description:
        'Her Google Veo videosunda görünmez bir SynthID filigranı ve C2PA Content Credentials bulunur. Platformlar işaretlemesin diye SynthID’yi zayıflatıp meta verileri silmenin yolu.',
      short: 'Veo videolarından SynthID kaldır',
      cta: 'Veo videosunu şimdi temizle',
      intro: [
        'Google Veo ürettiği her videonun piksellerine görünmez bir [SynthID filigranı](/guides/what-is-synthid/) yazar ve dosyanın meta verilerine C2PA Content Credentials ekler. TikTok gibi platformların otomatik “yapay zekâ ile üretildi” etiketi için okuduğu şey Content Credentials’tır; SynthID filigranı ise Google’ın dedektörünün aradığı şeydir.',
        '{site}, C2PA manifestosu dahil meta verileri siler ve görüntüyle sesi aynı tutarak videoyu SynthID filigranını bozacak şekilde yeniden kodlar. Düzenlemelere dayanacak şekilde yapılmış bir filigranı bir dedektörün bulamayacağına hiçbir araç söz veremez, bu yüzden sonuç garanti değildir.',
      ],
      steps: [
        { name: 'SynthID temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Veo videonu ekle', text: 'MP4’ü bırak. Meta veriler ve SynthID her zaman kaldırılır, açman gereken bir şey yok.' },
        { name: 'Hız için Sunucu’yu seç', text: 'Sunucu büyük videoları yaklaşık 4 kat daha hızlı yeniden kodlar ve hemen ardından siler. Bu cihaz dosyayı tarayıcında tutar ama daha yavaştır.' },
        { name: 'Temiz kopyayı indir', text: 'Her dosya neyin kaldırıldığını gösterir. Orijinal yerine temiz kopyayı paylaş.' },
      ],
      sections: [
        {
          h: 'Veo dosyaya ne koyar',
          blocks: [
            {
              ul: [
                'SynthID: videonun tamamında, yeniden boyutlandırmaya, kırpmaya ve yeniden sıkıştırmaya dayanacak şekilde tasarlanmış görünmez, piksel düzeyinde bir filigran.',
                'C2PA Content Credentials: meta verilerde, dosyanın Google yapay zekâsıyla yapıldığını kaydeden imzalı bir manifesto.',
                'Kapsayıcı ve kodlayıcı etiketleri, oluşturma tarihi ve diğer standart meta veriler.',
              ],
            },
            { p: 'Manifesto hakkında daha fazlası için [C2PA Content Credentials nedir](/guides/remove-c2pa-content-credentials/), geri kalanı için [videolardan meta veri nasıl kaldırılır](/guides/remove-metadata-from-videos/) rehberini oku.' },
          ],
        },
        {
          h: '{site} filigranı nasıl zayıflatır',
          blocks: [
            { p: 'Video, görsel olarak fark edilmeyen bir kalitede (CRF 18) yeniden kodlanır; çok hafif bir bulanıklık, onu dengeleyen bir keskinleştirme ve kareden kareye değişen çok az gürültü eklenir. Bu her pikseli yeniden örnekler ve filigran ızgarasını kaydırır; C2PA dahil meta veriler ise tamamen atılır. Ses de herhangi bir ses filigranını bozmak için hafifçe yeniden örneklenir.' },
          ],
        },
        {
          h: 'Neyi yapabilir, neyi yapamaz',
          blocks: [
            { note: 'SynthID düzenlemelere dayanacak şekilde yapılmıştır. {site} onu zayıflatır ama Google’ın dedektörünün veya bir platformun sınıflandırıcısının onu bulamayacağını garanti edemez. C2PA meta verileri ise tamamen silinir.' },
            { p: 'Bu sinyalleri kaldırmak, yapay zekâ içeriğini etiketleme konusundaki yasal ya da platform yükümlülüklerini ortadan kaldırmaz. Her platformun açıklama kurallarına uy.' },
          ],
        },
      ],
      faq: [
        { q: 'Veo her zaman SynthID ekler mi?', a: 'Evet. Google, Veo dahil kendi modellerinin ürettiği görsel ve videolara SynthID uygular. Filigran görünmezdir ve görüntüde belirmez.' },
        { q: 'Veo videosunun kalitesi düşer mi?', a: 'SynthID’yi kaldırmak videoyu yeniden kodlar, bu yüzden bayt bayt aynı değildir; ama yüksek kalitede kaydedilir ve normal izlerken aynı görünür.' },
        { q: 'TikTok Veo videomu yine de yapay zekâ olarak etiketler mi?', a: 'Etiketleyebilir. {site} platformların okuduğu C2PA Content Credentials’ı siler, ama platformlar kendi sınıflandırıcılarını ve filigran dedektörlerini de kullanır. Bir dosyanın etiketsiz kalacağını garanti etmiyoruz.' },
      ],
    },
    'remove-synthid-from-gemini-images': {
      title: 'Gemini (Nano Banana) görsellerinden SynthID nasıl kaldırılır',
      metaTitle: 'Gemini yapay zekâ görsellerinden SynthID kaldırma',
      description:
        'Gemini ve Nano Banana modelinin görselleri görünmez bir SynthID filigranı ve meta veri taşır. SynthID’yi bozup meta verileri tek adımda silmenin yolu.',
      short: 'Gemini görsellerinden SynthID kaldır',
      cta: 'Gemini görselini şimdi temizle',
      intro: [
        'Nano Banana görsel modeli dahil Gemini ile oluşturulan görseller, piksellerinde Google’ın görünmez [SynthID filigranını](/guides/what-is-synthid/) ve genellikle onları yapay zekâ ile üretilmiş olarak işaretleyen bir IPTC “Digital Source Type” etiketi ile başka meta verileri taşır.',
        '{site} görseli SynthID filigranını bozacak şekilde yeniden örnekler ve kodlar, onu etiketleyen meta verileri de siler. Görsel aynı görünür. Görseller için SynthID yeniden boyutlandırmaya ve yeniden kaydetmeye dayanacak şekilde yapıldığından bir dedektör onu yine bulabilir; bu yüzden sonuç garanti değildir.',
      ],
      steps: [
        { name: 'SynthID temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Gemini görselini ekle', text: 'JPEG, PNG veya WebP dosyasını bırak. Meta veriler ve SynthID her zaman kaldırılır.' },
        { name: 'Bu cihaz veya Sunucu’yu seç', text: 'Bu cihaz görseli yüklemeden tarayıcında temizler. Büyük gruplarda Sunucu daha hızlıdır.' },
        { name: 'Temiz kopyayı indir', text: 'Dosya EXIF, XMP, IPTC ve C2PA olmadan ve filigranı zayıflatılmış olarak geri gelir.' },
      ],
      sections: [
        {
          h: 'Bir Gemini görselinde neler var',
          blocks: [
            {
              ul: [
                'SynthID: piksellere yayılmış görünmez bir filigran.',
                'Görseli yapay zekâ ile üretilmiş olarak işaretleyen IPTC “Digital Source Type” ve XMP etiketleri.',
                'Bazen C2PA Content Credentials, ayrıca olağan EXIF ve ICC verileri.',
              ],
            },
          ],
        },
        {
          h: '{site} filigranı nasıl bozar',
          blocks: [
            { p: 'Görsel neredeyse birebir bir küçültme ve büyütmeyle yeniden örneklenir, yumuşak bir keskinleştirme ve çok hafif bir gürültü eklenir ve yüksek kalitede yeniden kaydedilir. Bu her pikseli kaydırıp filigran ızgarasını karıştırır; EXIF, XMP, IPTC ve C2PA gibi tüm meta veri blokları da silinir.' },
          ],
        },
        {
          h: 'Neden hâlâ tespit edilebilir',
          blocks: [
            { note: 'Görseller için SynthID yeniden boyutlandırmaya ve yeniden sıkıştırmaya dayanacak şekilde tasarlandığından, zor bir örnek temizlikten sonra da Google’ın dedektörünü tetikleyebilir. {site} filigranı görseli gözle görülür şekilde değiştirmeden mümkün olduğunca zayıflatır; meta veriler her durumda silinir.' },
          ],
        },
      ],
      faq: [
        { q: 'Bu konuda Nano Banana ile Gemini aynı mı?', a: 'Evet. Nano Banana bir Gemini görsel modelidir ve görselleri aynı şekilde SynthID taşır. Adımlar da aynıdır.' },
        { q: 'SynthID’yi kaldırmak görselin görünüşünü değiştirir mi?', a: 'Gözle görülür şekilde değil. Yeniden örnekleme, gürültü ve yeniden kodlama neredeyse kayıpsızdır; görsel normal bakıldığında aynı görünür.' },
        { q: 'Görsel hâlâ yapay zekâ olarak işaretlenirse?', a: 'Bu meta veriler değil, piksel filigranının direnmesidir. EXIF, XMP, IPTC ve C2PA etiketleri tamamen silinir; filigran ise yalnızca zayıflatılır, garantisi yoktur.' },
      ],
    },
    'remove-synthid-from-imagen-images': {
      title: 'Google Imagen görsellerinden SynthID nasıl kaldırılır',
      metaTitle: 'Google Imagen görsellerinden SynthID kaldırma',
      description:
        'Google Imagen her görseli görünmez bir SynthID filigranı ve yapay zekâ meta verileriyle işaretler. Görselin işaretlenmemesi için filigranı zayıflatıp meta verileri silmenin yolu.',
      short: 'Imagen görsellerinden SynthID kaldır',
      cta: 'Imagen görselini şimdi temizle',
      intro: [
        'Imagen, Google’ın Gemini, ImageFX ve diğer Google uygulamalarında kullanılan metinden görsele modelidir. Oluşturduğu her görsel, piksellerinde görünmez bir [SynthID filigranı](/guides/what-is-synthid/) ve onu yapay zekâ ile üretilmiş olarak işaretleyen meta veriler (genellikle bir IPTC “Digital Source Type” etiketi ve C2PA Content Credentials) taşır.',
        '{site} görseli SynthID’yi bozacak şekilde yeniden örnekler ve kodlar, tüm meta verileri de siler. Sonuç aynı görünür. SynthID düzenlemelere dayanacak şekilde yapıldığından bir dedektör onu yine bulabilir; meta veriler ise güvenilir şekilde silinir.',
      ],
      steps: [
        { name: 'SynthID temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Imagen görselini ekle', text: 'Dosyayı bırak. Meta veriler ve SynthID her zaman kaldırılır.' },
        { name: 'Bu cihaz veya Sunucu’yu seç', text: 'Bu cihaz dosyayı hiç yüklemez; Sunucu gruplarda daha hızlıdır ve dosyaları hemen ardından siler.' },
        { name: 'Temiz kopyayı indir', text: 'Orijinal yerine, neyin kaldırıldığını gösteren temiz kopyayı paylaş.' },
      ],
      sections: [
        {
          h: 'Imagen neleri gömer',
          blocks: [
            {
              ul: [
                'SynthID: üretilen her görselde görünmez, piksel düzeyinde bir filigran.',
                'Onu yapay zekâ ile üretilmiş olarak tanımlayan bir “Digital Source Type” alanı dahil IPTC / XMP etiketleri.',
                'Bazı hizmetlerde C2PA Content Credentials, ayrıca standart EXIF ve ICC verileri.',
              ],
            },
            { p: 'Fotoğraf meta verilerinin ortaya koyabileceği her şey için [EXIF ve meta veriler nasıl kaldırılır](/guides/remove-exif-data-from-photos/) rehberini oku.' },
          ],
        },
        {
          h: 'Temizlik nasıl çalışır',
          blocks: [
            { p: 'Neredeyse birebir bir yeniden örnekleme her pikseli kaydırır, yumuşak bir keskinleştirme netliği geri kazandırır ve çok hafif bir gürültü filigran ızgarasını karıştırır. Görsel ardından hiçbir meta veri olmadan yüksek kalitede yeniden kodlanır; EXIF, XMP, IPTC ve C2PA tamamen gider.' },
          ],
        },
        {
          h: 'Sınırlar',
          blocks: [
            { note: 'Düzenlemelere dayanacak şekilde tasarlanmış bir filigranı bir SynthID dedektörünün bulamayacağını hiçbir araç garanti edemez. {site} onu zayıflatır; meta veriler ise kesin olarak silinir. Yapay zekâ içeriğini açıklama kuralları geçerliliğini korur.' },
          ],
        },
      ],
      faq: [
        { q: 'Imagen nerede kullanılıyor?', a: 'Imagen, Gemini, ImageFX ve diğer Google araçlarının görsellerini üretir. Bunların herhangi birinden gelen görseller SynthID taşır ve aynı şekilde temizlenir.' },
        { q: 'Bu görünür bir filigranı da kaldırır mı?', a: 'Hayır. {site} görünmez SynthID filigranını bozar ve meta verileri siler. Görsele çizilmiş logoları veya görünür işaretleri kaldırmaz.' },
        { q: 'Renkler değişir mi?', a: 'Hayır. Imagen sRGB olarak çıktı verdiği için renk profilini kaldırmak renkleri değiştirmez.' },
      ],
    },
    'remove-synthid-from-higgsfield': {
      title: 'Higgsfield video ve görsellerinden SynthID ve C2PA nasıl kaldırılır',
      metaTitle: 'Higgsfield dosyalarından SynthID ve C2PA kaldırma',
      description:
        'Higgsfield birkaç yapay zekâ modeli kullanır, bu yüzden dosyaları bir SynthID filigranı, C2PA Content Credentials ya da ikisini birden taşıyabilir. Platformlar işaretlemesin diye nasıl temizlenir.',
      short: 'Higgsfield’dan SynthID kaldır',
      cta: 'Higgsfield dosyasını şimdi temizle',
      intro: [
        'Higgsfield, Google Veo dahil birkaç yapay zekâ modelini bir araya getiren bir platformdur. Dosyana ne gireceği, onu oluşturan modele bağlıdır: Veo ile yapılan bir video Google’ın görünmez [SynthID filigranını](/guides/what-is-synthid/) taşır ve çoğu üretici dosyayı yapay zekâ ile üretilmiş olarak işaretleyen C2PA Content Credentials’ı da meta verilere ekler.',
        '{site}, C2PA dahil meta verileri siler ve görüntüyle sesi aynı tutarak, varsa SynthID filigranını bozmak için dosyayı yeniden kodlar. SynthID düzenlemelere dayanacak şekilde yapıldığı için hiçbir araç bir dedektörün onu bulamayacağına söz veremez; sonuç garanti değildir.',
      ],
      steps: [
        { name: 'SynthID temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Higgsfield dosyanı ekle', text: 'Videoyu veya görseli bırak. Veo ile yapılmış bir dosya da yeniden kodlansın diye SynthID temizliğini açık bırak (varsayılan olarak açık).' },
        { name: 'Hız için Sunucu’yu seç', text: 'Sunucu büyük videoları yaklaşık 4 kat daha hızlı yeniden kodlar ve hemen ardından siler. Bu cihaz dosyayı tarayıcında tutar ama daha yavaştır.' },
        { name: 'Temiz kopyayı indir', text: 'Her dosya neyin kaldırıldığını gösterir. Orijinal yerine temiz kopyayı paylaş.' },
      ],
      sections: [
        {
          h: 'Bir Higgsfield dosyası neler taşıyabilir',
          blocks: [
            {
              ul: [
                'SynthID: dosya Veo gibi bir Google modeliyle yapıldığında bulunur. Görünmez, piksel düzeyinde bir filigrandır.',
                'C2PA Content Credentials: meta verilerde, dosyanın yapay zekâyla üretildiğini kaydeden imzalı bir manifesto. [C2PA nasıl kaldırılır](/guides/remove-c2pa-content-credentials/) rehberine bak.',
                'Olağan kapsayıcı, kodlayıcı, EXIF ve zaman meta verileri.',
              ],
            },
            { p: 'Higgsfield modelleri karıştırdığı için bir dosyanın hangi işareti taşıdığını bilmeyebilirsin. SynthID temizliğini açık bırakmak iki durumu da kapsar: meta veriler her zaman silinir ve SynthID varsa diye yeniden kodlama uygulanır.' },
          ],
        },
        {
          h: '{site} nasıl temizler',
          blocks: [
            { p: 'Videolar görsel olarak fark edilmeyen bir kalitede (CRF 18) yeniden kodlanır; çok hafif bir bulanıklık, onu dengeleyen bir keskinleştirme ve kareler arasında çok az gürültü eklenir. Görseller yeniden örneklenir, gürültü eklenir, keskinleştirilir ve yüksek kalitede yeniden kaydedilir. Her iki durumda da C2PA dahil tüm meta veri blokları atılır. Sonuç aynı görünür ve aynı oynatılır.' },
          ],
        },
        {
          h: 'Neyi yapabilir, neyi yapamaz',
          blocks: [
            { note: 'SynthID düzenlemelere dayanacak şekilde yapılmıştır. {site} onu zayıflatır ama bir dedektörün veya bir platformun sınıflandırıcısının onu bulamayacağını garanti edemez. C2PA meta verileri ise tamamen silinir.' },
            { p: 'Bu sinyalleri kaldırmak, yapay zekâ içeriğini etiketleme konusundaki yasal ya da platform yükümlülüklerini ortadan kaldırmaz. Her platformun açıklama kurallarına uy.' },
          ],
        },
      ],
      faq: [
        { q: 'Her Higgsfield dosyasında SynthID var mı?', a: 'Hayır. Yalnızca Veo gibi bir Google modeliyle yapılan dosyalar SynthID taşır. Higgsfield’ın diğer modellerinden gelen dosyalar genellikle C2PA Content Credentials taşır. {site} ikisini de kapsar: meta veriler her zaman silinir ve SynthID temizliği açıkken yeniden kodlama uygulanır.' },
        { q: 'Higgsfield videomun kalitesi düşer mi?', a: 'SynthID’yi kaldırmak videoyu yeniden kodlar, bu yüzden bayt bayt aynı değildir; ama yüksek kalitede kaydedilir ve normal izlerken aynı görünür.' },
        { q: 'TikTok Higgsfield videomu yine de yapay zekâ olarak etiketler mi?', a: 'Etiketleyebilir. {site} platformların okuduğu C2PA Content Credentials’ı siler, ama platformlar kendi sınıflandırıcılarını ve filigran dedektörlerini de kullanır. Bir dosyanın etiketsiz kalacağını garanti etmiyoruz.' },
      ],
    },
    'download-youtube-videos': {
      title: 'YouTube videoları ve Shorts MP4 olarak nasıl indirilir',
      metaTitle: 'YouTube videoları ve Shorts indir (MP4, 1080p)',
      description:
        'Bağlantısını yapıştırarak bir YouTube videosunu ya da Short’u 1080p’ye kadar MP4, sesi ise M4A olarak kaydet. youtube.com, youtu.be ve Shorts bağlantılarıyla çalışır. Kurulum gerekmez.',
      short: 'YouTube videoları ve Shorts indir',
      cta: 'YouTube indiricisini aç',
      intro: [
        'Bir YouTube videosunu kaydetmenin en hızlı yolu, bağlantısını kopyalayıp işi sunucuda yapan bir indiriciye yapıştırmaktır. {site} 1080p’ye kadar en iyi sürümü alır, görüntüyle sesi her telefonda ya da bilgisayarda oynatılan tek bir MP4’te birleştirir ve sana gönderir. İstersen yalnızca sesi M4A dosyası olarak da alabilirsin.',
      ],
      steps: [
        { name: 'Bağlantıyı kopyala', text: 'Bilgisayarda tarayıcının adres çubuğundaki adresi kopyala. YouTube uygulamasında videonun altındaki (ya da bir Short’ta) Paylaş’a dokun ve Bağlantıyı kopyala’yı seç.' },
        { name: 'YouTube indiricisini aç', text: '{site} içindeki YouTube sekmesine git ve Google ile giriş yap.' },
        { name: 'Yapıştır ve biçim seç', text: 'Her satıra bir tane olmak üzere bir veya birkaç bağlantı yapıştır. MP4 için anahtarı Video’da bırak, M4A için Yalnızca ses’i seç.' },
        { name: 'İndir', text: 'İndir’e bas. Her bağlantı başlığını ve ilerlemesini gösterir, dosya hazır olunca bir Kaydet düğmesi çıkar.' },
      ],
      sections: [
        {
          h: 'Hangi bağlantılar çalışır',
          blocks: [
            {
              ul: [
                'Normal videolar: `youtube.com/watch?v=…`',
                'Kısa bağlantılar: `youtu.be/…`',
                'Shorts: `youtube.com/shorts/…`',
                'Gömülü oynatıcılar: `youtube-nocookie.com/embed/…`',
                'Mobil bağlantılar: `m.youtube.com/…`',
              ],
            },
            { p: 'Zaman damgası (`&t=42`) ya da oynatma listesi (`&list=…`) gibi ek parametreler içeren bağlantılar çalışır; bağlantıdaki videoyu alırsın. Tüm oynatma listeleri tek seferde indirilmez; her videonun bağlantısını ayrı yapıştır.' },
          ],
        },
        {
          h: 'Kalite ve biçim',
          blocks: [
            { p: 'YouTube, 360p’nin üstündeki çoğu videoda görüntü ile sesi ayrı saklar. İndirici 1080p’ye kadar en iyi H.264 görüntüyü ve AAC sesi seçip tek bir MP4’te birleştirir. H.264 ve AAC her yerde oynatılır: iPhone, Android, Windows, Mac, düzenleme uygulamaları ve sosyal medya.' },
            { p: 'Bir videonun 1080p H.264 sürümü yoksa, YouTube’un 1080p’ye kadar sunduğu en iyi sürümü alırsın. Daha düşük çözünürlükte yüklenen videolar o çözünürlükte iner; bir indirici hiç yüklenmemiş ayrıntıyı ekleyemez.' },
          ],
        },
        {
          h: 'İndirme başarısız olduğunda',
          blocks: [
            {
              ul: [
                'Gizli ve yalnızca kanal üyelerine açık videolar indirilemez.',
                'Yaş sınırlı videolar ve bölge kısıtlamalı bazı videolar oturum açılmış bir YouTube hesabı gerektirir, bu yüzden başarısız olabilir.',
                'Canlı yayınlar ancak bittikten ve YouTube işledikten sonra kaydedilebilir.',
                'Henüz başlamamış galalarda indirilecek bir şey yoktur.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'YouTube Shorts indirebilir miyim?', a: 'Evet. Bir youtube.com/shorts/ bağlantısını normal bir video gibi yapıştır; dikey bir MP4 alırsın.' },
        { q: 'Yalnızca sesi indirebilir miyim?', a: 'Evet. Anahtarı Yalnızca ses’e getir; sesi bir M4A dosyası olarak alırsın. Platform AAC ses sakladığında yeniden kodlanmadan kopyalanır.' },
        { q: 'Video neden 4K değil de 1080p?', a: 'Dosyalar küçük kalsın ve her yerde oynatılsın diye indirici videoları 1080p ile sınırlar. Çoğu telefon ve sosyal ağ videoyu 1080p veya daha düşük gösterir.' },
        { q: 'Bir şey yüklemem gerekiyor mu?', a: 'Hayır. Her şey tarayıcıda ve {site} sunucusunda çalışır; her telefonda ve bilgisayarda kullanılabilir.' },
      ],
    },
    'download-tiktok-videos': {
      title: 'TikTok videoları MP4 olarak nasıl indirilir',
      metaTitle: 'TikTok videoları indir (MP4 veya M4A ses)',
      description:
        'Herkese açık bir TikTok videosunu MP4, sesini M4A olarak tiktok.com, vm.tiktok.com veya vt.tiktok.com bağlantısından kaydet. Telefonda veya bilgisayarda adım adım.',
      short: 'TikTok videoları indir',
      cta: 'TikTok indiricisini aç',
      intro: [
        'TikTok, Videoyu kaydet düğmesini yalnızca içerik üreticisi izin verirse sunar ve kaydedilen kopyada hareket eden bir filigran olur. Bağlantıyı {site} içine yapıştırırsan herhangi bir herkese açık videoyu MP4 dosyası olarak, ya da yalnızca sesini M4A olarak alırsın.',
      ],
      steps: [
        { name: 'Bağlantıyı kopyala', text: 'TikTok uygulamasında Paylaş’a (sağdaki ok) dokun ve Bağlantıyı kopyala’yı seç. Bilgisayarda video sayfasının adresini kopyala.' },
        { name: 'TikTok indiricisini aç', text: '{site} içindeki TikTok sekmesine git ve Google ile giriş yap.' },
        { name: 'Bağlantıyı yapıştır', text: 'Bir bağlantı ya da ayrı satırlarda birkaç bağlantı yapıştır. MP4 için Video’yu, M4A ses için Yalnızca ses’i seç.' },
        { name: 'Dosyayı kaydet', text: 'İndir’e bas ve her dosyayı hazır olduğunda kaydet. iPhone’da dosyayı aç, Paylaş’a ve ardından Videoyu Kaydet’e dokunarak Fotoğraflar’a ekle.' },
      ],
      sections: [
        {
          h: 'Hangi bağlantılar çalışır',
          blocks: [
            {
              ul: [
                'Tam bağlantılar: `tiktok.com/@hesap/video/…`',
                'Uygulama paylaşım bağlantıları: `vm.tiktok.com/…` ve `vt.tiktok.com/…`',
                'Mobil web bağlantıları: `m.tiktok.com/…`',
              ],
            },
            { p: 'Kısa bağlantılar işaret ettikleri videoya kadar takip edilir, bu yüzden uygulamanın kopyaladığını olduğu gibi yapıştırabilirsin.' },
          ],
        },
        {
          h: 'Ne alırsın',
          blocks: [
            { p: 'Video, TikTok’un sunduğu kalitede MP4 olarak gelir; her yerde oynatılsın diye H.264 tercih edilir.' },
            { p: 'Yalnızca ses, videonun ses kaydını bir M4A dosyası olarak saklar. Birçok videoda kullanılan popüler bir ses için onu kullanan herhangi bir video işe yarar.' },
          ],
        },
        {
          h: 'Neler çalışmaz',
          blocks: [
            {
              ul: [
                'Gizli hesaplardaki videolar ve yalnızca arkadaşlarla paylaşılan videolar.',
                'Silinmiş ya da sunucunun bulunduğu bölgede erişilemeyen videolar.',
                'Canlı yayınlar ve fotoğraf slayt gösterileri (sabit görsel karuselleri).',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'vm.tiktok.com kısa bağlantıları çalışıyor mu?', a: 'Evet. vm.tiktok.com veya vt.tiktok.com bağlantılarını uygulamanın Bağlantıyı kopyala düğmesinden geldiği gibi yapıştır.' },
        { q: 'Yalnızca sesi indirebilir miyim?', a: 'Evet. Ses kaydını M4A olarak almak için anahtarı Yalnızca ses’e getir.' },
        { q: 'Gizli TikTok videolarını indirebilir miyim?', a: 'Hayır. Yalnızca herkese açık videolar desteklenir.' },
        { q: 'İçerik üreticisine bildirim gider mi?', a: 'Hayır. {site} herkese açık video sayfasını bir tarayıcı gibi okur; TikTok’a hiçbir şey gönderilmez.' },
      ],
    },
    'download-twitter-x-videos': {
      title: 'X (Twitter) videoları nasıl indirilir',
      metaTitle: 'X (Twitter) videolarını MP4 olarak indir',
      description:
        'Gönderi bağlantısını yapıştırarak bir X (Twitter) gönderisindeki videoyu MP4 olarak kaydet. x.com ve twitter.com bağlantılarıyla, telefonda veya bilgisayarda çalışır.',
      short: 'X (Twitter) videoları indir',
      cta: 'X indiricisini aç',
      intro: [
        'X’te videolar için bir indirme düğmesi yok. Birini kaydetmek için gönderinin bağlantısını kopyala ve {site} içine yapıştır: o gönderideki videoyu X’in sunduğu en iyi kalitede MP4 olarak alırsın.',
      ],
      steps: [
        { name: 'Gönderi bağlantısını kopyala', text: 'Gönderinin altındaki paylaş simgesine dokun ve Bağlantıyı kopyala’yı seç. Bilgisayarda sayfanın adresini de kopyalayabilirsin.' },
        { name: 'X indiricisini aç', text: '{site} içindeki X sekmesine git ve Google ile giriş yap.' },
        { name: 'Bağlantıyı yapıştır', text: 'Bir veya daha fazla bağlantı yapıştır. MP4 için Video’yu, M4A için Yalnızca ses’i seç.' },
        { name: 'Dosyayı kaydet', text: 'İndir’e bas ve dosya hazır olunca kaydet.' },
      ],
      sections: [
        {
          h: 'Hangi bağlantılar çalışır',
          blocks: [
            {
              ul: [
                'İki alan adındaki gönderi bağlantıları: `x.com/hesap/status/…` veya `twitter.com/hesap/status/…`',
                'Gömme düzeltme hizmetlerinin bağlantıları: `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
              ],
            },
            { p: 'Videoyu içeren gönderinin bağlantısını yapıştır. Bir yanıta ya da alıntıya bakıyorsan önce asıl gönderiyi aç ve onun bağlantısını kopyala. X’teki hareketli GIF’ler kısa video olarak saklandığı için onlar da MP4 olarak iner.' },
          ],
        },
        {
          h: 'İndirme başarısız olduğunda',
          blocks: [
            {
              ul: [
                'Korumalı (gizli) hesapların gönderileri indirilemez.',
                'Hassas olarak işaretlenmiş, yaş sınırlı ya da X’in yalnızca giriş yapmış kullanıcılara gösterdiği gönderiler başarısız olabilir.',
                'Silinmiş gönderilerde ve askıya alınmış hesaplarda indirilecek bir şey yoktur.',
                'Yalnızca bir YouTube videosuna bağlantı veren bir gönderide X videosu yoktur; [YouTube indiricisini](/guides/download-youtube-videos/) kullan.',
              ],
            },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'twitter.com bağlantıları hâlâ çalışıyor mu?', a: 'Evet. Hem x.com hem de twitter.com bağlantıları çalışır.' },
        { q: 'Hangi kaliteyi alırım?', a: 'X’in o video için sunduğu en yüksek kaliteyi, mümkün olduğunda H.264 görüntülü MP4 olarak.' },
        { q: 'Gizli hesaplardaki videoları indirebilir miyim?', a: 'Hayır. Yalnızca herkese açık gönderiler desteklenir.' },
      ],
    },
    'download-instagram-reels': {
      title: 'Instagram Reels ve videoları nasıl indirilir',
      metaTitle: 'Instagram Reels ve videoları indir (MP4)',
      description:
        'Herkese açık bir Instagram Reel’ini ya da video gönderisini bağlantısını yapıştırarak MP4 olarak kaydet. iPhone, Android ve bilgisayar için adım adım. Gizli hesaplar desteklenmez.',
      short: 'Instagram Reels indir',
      cta: 'Instagram indiricisini aç',
      intro: [
        'Instagram gönderileri uygulama içinde kaydetmene izin verir, ama saklayabileceğin ya da düzenleyebileceğin dosyalar olarak değil. Bir Reel’i veya video gönderisini MP4 olarak almak için bağlantısını kopyala ve {site} içine yapıştır. Yalnızca herkese açık gönderilerle çalışır.',
      ],
      steps: [
        { name: 'Bağlantıyı kopyala', text: 'Instagram uygulamasında Reel’in ya da gönderinin kâğıt uçak simgesine, ardından Bağlantıyı kopyala’ya dokun. Bilgisayarda sayfanın adresini kopyala.' },
        { name: 'Instagram indiricisini aç', text: '{site} içindeki Instagram sekmesine git ve Google ile giriş yap.' },
        { name: 'Bağlantıyı yapıştır', text: 'Bir veya daha fazla bağlantı yapıştır. MP4 için Video’yu, M4A için Yalnızca ses’i seç.' },
        { name: 'Dosyayı kaydet', text: 'İndir’e bas ve dosyayı kaydet. iPhone’da dosyayı aç, Paylaş’a ve ardından Videoyu Kaydet’e dokunarak Fotoğraflar’a ekle.' },
      ],
      sections: [
        {
          h: 'Hangi bağlantılar çalışır',
          blocks: [
            {
              ul: [
                'Reels: `instagram.com/reel/…`',
                'Video gönderileri: `instagram.com/p/…`',
                'Kısa bağlantılar: `instagr.am/…`',
              ],
            },
          ],
        },
        {
          h: 'Gizli videolar kullanılamaz',
          blocks: [
            { p: 'İndirici yalnızca Instagram’ın giriş yapmamış birine gösterdiklerini okur. Bu şunları dışarıda bırakır:' },
            {
              ul: [
                'Gizli hesaplardaki gönderiler ve Reels.',
                'Hikâyeler, Öne Çıkanlar ve Yakın Arkadaşlar içeriği.',
                'Instagram’ın yalnızca giriş yaptıktan sonra gösterdiği bazı herkese açık gönderiler, örneğin yaş sınırlı olanlar.',
              ],
            },
            { p: 'Bir bağlantı gizli gönderi ya da giriş hakkında bir mesajla başarısız olursa, o video indirici için kullanılamaz.' },
          ],
        },
        {
          h: 'Birden fazla video içeren karuseller',
          blocks: [{ p: 'Birden fazla slayttan oluşan bir gönderide indirici, gönderide bulduğu videoyu kaydeder. Yalnızca fotoğraf içeren gönderilerde indirilecek video yoktur.' }],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Instagram Hikâyelerini indirebilir miyim?', a: 'Hayır. Hikâyeler oturum açılmış bir Instagram hesabı gerektirir ve indirici hiçbir hesap kullanmaz.' },
        { q: 'Gizli bir hesaptan indirebilir miyim?', a: 'Hayır. Yalnızca herkese açık Reels ve video gönderileri desteklenir.' },
        { q: 'Bir Reel’in yalnızca müziğini alabilir miyim?', a: 'Evet. Ses kaydını M4A olarak almak için anahtarı Yalnızca ses’e getir.' },
      ],
    },
    'download-audio-from-videos': {
      title: 'YouTube, TikTok, X ve Instagram’dan ses nasıl indirilir',
      metaTitle: 'YouTube, TikTok ve Instagram’dan ses indir (M4A)',
      description:
        'Bir YouTube, TikTok, X veya Instagram videosunun yalnızca sesini M4A dosyası olarak al. Bağlantıyı yapıştır, Yalnızca ses’e geç ve indir. Uygulama gerekmez.',
      short: 'Yalnızca sesi indir (M4A)',
      cta: 'İndiricileri aç',
      intro: [
        '{site} içindeki her indiricide Video / Yalnızca ses anahtarı vardır. Yalnızca ses, videonun orijinal ses kaydını bir M4A dosyası olarak verir: genellikle platformun zaten sakladığı AAC ses, yeniden kodlanmadan kopyalanır, böylece kalite kaybı olmaz. Bir platform başka bir codec sunuyorsa yüksek kalitede AAC’ye dönüştürülür.',
      ],
      steps: [
        { name: 'Video bağlantısını kopyala', text: 'YouTube, TikTok, X veya Instagram uygulamasında Paylaş ve Bağlantıyı kopyala’yı kullan ya da bilgisayarda sayfanın adresini kopyala.' },
        { name: 'İlgili indiriciyi aç', text: '{site} içinde o platformun sekmesini seç.' },
        { name: 'Yalnızca ses’e geç', text: 'Bağlantı kutusunun üstündeki anahtarı Yalnızca ses’e getir ve bağlantıyı yapıştır.' },
        { name: 'M4A’yı indir', text: 'İndir’e bas ve dosyayı kaydet. M4A; Apple Music, VLC, Windows Media Player ve çoğu düzenleme uygulamasında oynatılır.' },
      ],
      sections: [
        {
          h: 'Neden MP3 değil de M4A',
          blocks: [
            { p: 'Bu platformlar sesi neredeyse her zaman AAC olarak saklar. M4A, MP4 türü bir dosyanın içindeki AAC’den ibarettir, bu yüzden olduğu gibi kaydedilebilir. MP3’e dönüştürmek onu çözüp yeniden sıkıştırmayı gerektirir; bu da hiçbir kazanç sağlamadan biraz kalite kaybettirir. Günümüzün tüm telefonları, bilgisayarları ve düzenleme uygulamaları M4A oynatır.' },
            { p: 'Eski bir cihaz için MP3 gerekiyorsa M4A’yı VLC (Medya → Dönüştür / Kaydet) ya da ffmpeg gibi ücretsiz bir araçla dönüştür:' },
            { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
          ],
        },
        {
          h: 'Videoya zaten sahip misin?',
          blocks: [
            { p: '{site} içindeki her tamamlanmış video indirmesinde bir Sesi al düğmesi de vardır; az önce indirdiğin MP4’ten ses kaydını çıkarır.' },
          ],
        },
        LEGAL_DL,
      ],
      faq: [
        { q: 'Ses yeniden kodlanıyor mu?', a: 'Platform AAC sunduğunda, ki genellikle öyledir, hayır: parça olduğu gibi bir M4A dosyasına kopyalanır. Diğer codec’ler AAC’ye dönüştürülür.' },
        { q: 'Tüm bir oynatma listesini ses olarak indirebilir miyim?', a: 'Tek seferde değil. Her videonun bağlantısını, her satıra bir tane olacak şekilde yapıştır.' },
      ],
    },
    'remove-gps-location-from-photos': {
      title: 'Fotoğraflardan GPS konumu nasıl kaldırılır',
      metaTitle: 'Fotoğraflardan GPS konumunu kaldır (iPhone, Android, PC)',
      description:
        'Fotoğraflar çekildikleri tam yeri saklayabilir. Bir fotoğrafta GPS verisi olup olmadığını kontrol etmeyi ve iPhone, Android, Windows ve Mac’te ya da her fotoğraf için tek adımda kaldırmayı öğren.',
      short: 'Fotoğraflardan GPS konumunu kaldır',
      cta: 'Konum verisini şimdi kaldır',
      intro: [
        'Çoğu telefon her fotoğrafa tam enlem ve boylamı, çoğu zaman birkaç metre hassasiyetle kaydeder. Orijinal dosyayı alan herkes bunu okuyup bir haritaya iğne koyabilir: evin, okulun, işyerin. Bazı uygulamalar paylaşırken bunu siler, ama e-posta, “orijinal kalitede” gönderen mesajlaşma uygulamaları, bulut paylaşım bağlantıları ve ikinci el siteleri çoğu zaman korur.',
        'Bu rehber bir fotoğrafta konum verisi olup olmadığını nasıl kontrol edeceğini ve onu telefonunun ya da bilgisayarının yerleşik ayarlarıyla veya {site} meta veri temizleyicisiyle tek adımda nasıl kaldıracağını anlatır.',
      ],
      steps: [
        { name: 'Meta veri temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Fotoğraflarını ekle', text: 'Bir veya çok sayıda fotoğraf bırak: JPEG, PNG, WebP, HEIC, AVIF, TIFF veya GIF.' },
        { name: 'Nerede işleneceğini seç', text: 'Dosyaları yüklemeden tarayıcında temizlemek için Bu cihaz’ı, {site} üzerinde işlenip hemen ardından silinmesi için Sunucu’yu seç.' },
        { name: 'Temiz kopyaları indir', text: 'GPS bloğu dahil tüm meta veriler her dosyadan kaldırılır. Orijinal yerine temiz kopyayı indir ve paylaş.' },
      ],
      sections: [
        {
          h: 'Konum nerede saklanır',
          blocks: [
            { p: 'JPEG, HEIC ve TIFF fotoğraflarda konum EXIF GPS bloğunda bulunur: enlem, boylam, rakım, kameranın baktığı yön ve bir GPS zaman damgası. Düzenleme uygulamaları onu XMP meta verilerine de kopyalayabilir ve bazı telefonlar gömülü küçük resmin meta verilerine yazar. Bunlardan yalnızca birini kaldırmak diğerlerini bırakabilir; bu yüzden tam bir temizlik tek bir alanı silmekten daha güvenlidir.' },
          ],
        },
        {
          h: 'Bir fotoğrafta konum olup olmadığı nasıl anlaşılır',
          blocks: [
            {
              ul: [
                'iPhone: Fotoğraflar’da fotoğrafı aç ve yukarı kaydır. Bir harita görünüyorsa fotoğrafta konum vardır.',
                'Android (Google Fotoğraflar): fotoğrafı aç, yukarı kaydır ve bir harita ya da yer adı ara.',
                'Windows: dosyaya sağ tıkla, Özellikler’de Ayrıntılar sekmesini aç ve GPS altına bak.',
                'Mac: Önizleme’de aç, Araçlar’dan Denetçiyi Göster’i seç ve bir GPS sekmesi ara.',
              ],
            },
          ],
        },
        {
          h: 'Telefonunun veya bilgisayarının ayarlarıyla kaldır',
          blocks: [
            {
              ul: [
                'iPhone, paylaşırken: fotoğrafları seç, Paylaş’a dokun, üstteki Seçenekler’e dokun ve Konum’u kapat. Yalnızca o paylaşım için geçerlidir.',
                'iPhone, gelecekteki fotoğraflar için: Ayarlar, Gizlilik ve Güvenlik, Konum Servisleri, Kamera, ardından Asla’yı seç.',
                'Android: Kamera uygulamasının ayarlarını aç ve konum ya da coğrafi etiket seçeneğini kapat (adı telefona göre değişir). Google Fotoğraflar’da Ayarlar ve Paylaşım altında bağlantıyla paylaştıklarından konumu kaldırma seçeneği var.',
                'Windows: dosyaya sağ tıkla, Özellikler, Ayrıntılar, ardından Özellikleri ve Kişisel Bilgileri Kaldır. Tüm olası özellikleri kaldırılmış bir kopya oluşturmayı seç.',
                'Mac: Önizleme’de Araçlar, Denetçiyi Göster, GPS sekmesi, ardından Konum Bilgisini Sil.',
              ],
            },
            { note: 'Bu yerleşik seçenekler genellikle yalnızca GPS alanlarını kaldırır. Kamera modeli, seri numarası, tarihler ve düzenleme geçmişi çoğunlukla dosyada kalır.' },
          ],
        },
        {
          h: 'exiftool ile kaldır (komut satırı)',
          blocks: [
            { p: 'Terminal kullanmayı biliyorsan ücretsiz exiftool programı GPS bloğunu ya da her şeyi doğrudan dosyadan kaldırır. Sonu `_original` ile biten bir yedek tutar.' },
            { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # yalnızca konum\nexiftool -all= photo.jpg                     # tüm meta veriler' },
          ],
        },
        {
          h: 'Bir fotoğraf başka neleri ortaya koyabilir',
          blocks: [
            { p: 'Konum en hassas veridir, ama aynı dosya telefon ya da kamera modelini ve seri numarasını, tam tarih ve saati, düzenlemede kullanılan yazılımı, adını veya telif satırını, fotoğraf uygulamalarının yüz etiketleme bölgelerini ve kırpılmamış orijinalin küçük bir önizlemesini de taşıyabilir. Tam liste için [EXIF verileri nasıl kaldırılır](/guides/remove-exif-data-from-photos/) rehberine bak.' },
          ],
        },
      ],
      faq: [
        { q: 'Instagram ve Facebook fotoğraflardaki konumu kaldırır mı?', a: 'Büyük sosyal ağlar genellikle başkalarının gördüğü kopyadan GPS dahil EXIF verilerini kaldırır. E-postayla, bulut bağlantısıyla, orijinal kalitede gönderen bazı sohbet uygulamalarıyla ve birçok forum ve ikinci el sitesiyle gönderilen dosyalar bunları koruyabilir; bu yüzden göndermeden önce dosyayı temizlemek daha güvenlidir.' },
        { q: 'Ekran görüntüsünde konum verisi olur mu?', a: 'Genellikle hayır, çünkü ekran görüntüsü yeni bir görseldir. Ama görüntünün kendisinde bir sokak tabelası ya da harita gibi bir konum görünebilir.' },
        { q: 'Fotoğraf sonrasında farklı görünür mü?', a: 'Hayır. Temiz kopya yüksek kalitede kaydedilir ve normal bakıldığında aynı görünür; yalnızca gizli veriler gider.' },
      ],
    },
    'remove-exif-data-from-photos': {
      title: 'Fotoğraflardan EXIF verileri ve diğer meta veriler nasıl kaldırılır',
      metaTitle: 'Fotoğraflardan EXIF verilerini ve meta verileri kaldır',
      description:
        'EXIF, XMP, IPTC ve ICC meta verilerinin senin hakkında neleri ortaya koyduğu, onları nasıl göreceğin ve JPEG, PNG, HEIC, WebP ve diğer fotoğraflardan hepsini nasıl kaldıracağın.',
      short: 'Fotoğraflardan EXIF verilerini kaldır',
      cta: 'Bir fotoğrafın meta verilerini şimdi kaldır',
      intro: [
        'EXIF, bir kameranın ya da telefonun her fotoğrafa yazdığı bilgi bloğudur: cihaz, ayarlar, tarih ve çoğu zaman yer. Düzenleme uygulamaları kendi katmanlarını (XMP ve IPTC) ekler ve bazı dosyalar düzenleme geçmişiyle birlikte C2PA Content Credentials taşır. Bunların hiçbiri görselde görünmez, ama dosyaya sahip olan herkes okuyabilir.',
      ],
      steps: [
        { name: 'Meta veri temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Fotoğrafları ekle', text: 'Dosyalarını bırak. Toplu ekleyebilirsin.' },
        { name: 'Bu cihaz veya Sunucu’yu seç', text: 'Bu cihaz fotoğrafları tarayıcında temizler ve hiç yüklemez. Sunucu onları {site} üzerinde işler ve hemen ardından siler.' },
        { name: 'Temiz kopyayı indir', text: 'Her dosya EXIF, GPS, XMP, IPTC, ICC, C2PA, üretici notları, küçük resimler ve yorumlar olmadan geri gelir.' },
      ],
      sections: [
        {
          h: 'Fotoğraf meta verileri neler içerir',
          blocks: [
            {
              ul: [
                'EXIF: kameranın ya da telefonun markası ve modeli, objektif, seri numaraları, pozlama ayarları, çekim ve düzenleme tarih ve saati ve GPS konumu.',
                'Üretici notları: her markaya özel bir EXIF alanı; dahili seri numarası veya deklanşör sayısı gibi ek tanımlayıcılar saklayabilir.',
                'XMP: Lightroom ve Photoshop gibi düzenleme uygulamaları yazar. Adını, düzenleme geçmişini, puanları, anahtar kelimeleri ve GPS verilerinin bir kopyasını içerebilir.',
                'IPTC: açıklamalar, künyeler, telif hakkı, fotoğrafçının adı ve iletişim bilgileri ve bazı araçların yapay zekâ ile üretilmiş görselleri işaretlemek için kullandığı Digital Source Type alanı.',
                'ICC profili: renkleri tanımlar. Çoğunlukla zararsızdır, ama bazı profiller onları oluşturan cihazın veya yazılımın adını içerir.',
                'Gömülü küçük resim: dosyanın içinde saklanan küçük bir önizleme. Fotoğrafı kırpılmadan ya da düzenlenmeden önceki hâliyle gösterebilir.',
                'C2PA Content Credentials: görselin nereden geldiğinin ve nasıl düzenlendiğinin imzalı kaydı. [C2PA nasıl kaldırılır](/guides/remove-c2pa-content-credentials/) rehberine bak.',
                'Yorumlar ve metin blokları: özellikle PNG’ler, bir yapay zekâ görsel üreticisinin istemi ve ayarları gibi serbest metin taşıyabilir.',
              ],
            },
          ],
        },
        {
          h: '{site} hangi biçimleri temizler',
          blocks: [{ p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF ve GIF. HEIC fotoğraflar her yerde açılsın diye JPEG olarak geri gelir.' }],
        },
        {
          h: 'EXIF’i kaldırmanın diğer yolları',
          blocks: [
            {
              ul: [
                'Windows: Özellikler, Ayrıntılar, Özellikleri ve Kişisel Bilgileri Kaldır ve temiz bir kopya oluştur. Her biçimde her alanı kaldırmaz.',
                'Mac: Önizleme konumu kaldırabilir (Araçlar, Denetçiyi Göster, GPS, Konum Bilgisini Sil) ama gerisini kaldıramaz. Fotoğraflar’dan Konum işareti kaldırılmış olarak dışa aktarmak da GPS’i siler.',
                'exiftool: `exiftool -all= photo.jpg` yazabildiği her şeyi kaldırır; bütün bir klasör için `-r folder/` ekle.',
                'Yeniden kaydetmek veya ekran görüntüsü almak: meta verilerin çoğunu siler, ama kaliteyi düşürür ve uygulamaya göre bazı alanları koruyabilir.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'EXIF’i kaldırmak kaliteyi düşürür mü?', a: 'Gözle görülür şekilde değil. {site} temiz kopyayı yüksek kalitede kaydeder, bu yüzden normal bakıldığında aynı görünür.' },
        { q: 'ICC profili kaldırılırsa renkler değişir mi?', a: 'Telefonlardan ve çoğu kameradan gelen fotoğraflar standart sRGB veya Display P3 renkleri kullanır ve aynı görünür. Alışılmadık bir renk uzayındaki dosyalar biraz farklı görünebilir.' },
        { q: 'Kaldırılan meta veriler geri getirilebilir mi?', a: 'Temiz kopyadan hayır. O dosyadan tamamen gitmiştir; orijinalinde hâlâ duruyor, bu yüzden temiz kopyayı paylaş.' },
      ],
    },
    'remove-metadata-from-iphone-photos': {
      title: 'iPhone fotoğraflarından meta veriler nasıl kaldırılır (HEIC ve JPEG)',
      metaTitle: 'iPhone fotoğraflarından meta verileri kaldır (HEIC)',
      description:
        'iPhone fotoğrafları konum, cihaz, tarih ve düzenleme verilerini saklar. Bunu iPhone’da nasıl kapatacağın, paylaşırken nasıl sileceğin ve HEIC ile JPEG dosyalarından nasıl tamamen kaldıracağın.',
      short: 'iPhone fotoğraflarından meta verileri kaldır',
      cta: 'iPhone fotoğraflarını şimdi temizle',
      intro: [
        'Bir iPhone fotoğrafı genellikle tüm meta verileriyle bir HEIC dosyasıdır: iPhone modeli, objektif, tam saat, Kamera için Konum Servisleri açıksa konum ve düzenledikten sonra kullanılan uygulamalar. iOS paylaşırken konumu kaldırabilir, ama gerisini kaldıramaz. İkisini birden şöyle halledersin.',
      ],
      steps: [
        { name: 'Fotoğrafları Dosyalar’a kaydet', text: 'Fotoğraflar’da fotoğrafları seç, Paylaş’a ve ardından Dosyalar’a Kaydet’e dokun. (Ya da AirDrop ile gönder veya bir bilgisayara kopyala.)' },
        { name: '{site} sitesini Safari’de aç', text: 'Strip sekmesine git ve Dosyalar’dan ya da fotoğraf arşivinden dosya eklemek için dokun.' },
        { name: 'Temizle', text: 'iPhone’unda kalmaları için Bu cihaz’ı, hız için Sunucu’yu seç. HEIC fotoğraflar JPEG olarak geri gelir.' },
        { name: 'Temiz kopyaları kaydet', text: 'İndir, her birini aç ve temiz kopyayı Fotoğraflar’a koymak için Paylaş, Görüntüyü Kaydet’e dokun.' },
      ],
      sections: [
        {
          h: 'Paylaşırken konumu kaldır',
          blocks: [
            { p: 'Fotoğrafları seç, Paylaş’a dokun, sayfanın üstündeki Seçenekler’e dokun ve Konum’u kapat. iOS yalnızca o paylaşım için GPS verisi olmayan kopyalar gönderir. Tüm Fotoğraf Verileri’ni açmak tersini yapar ve her şeyi dahil eder.' },
            { note: 'Bir web sitesinin içinde fotoğraf arşivinden seçim yapmak orijinal dosyayı meta verileriyle birlikte göndermeye devam edebilir. Seçenekler anahtarını kullan ya da dosyayı önce temizle.' },
          ],
        },
        {
          h: 'Konumu kaydetmeyi durdur',
          blocks: [{ p: 'Ayarlar, Gizlilik ve Güvenlik, Konum Servisleri, Kamera, ardından Asla. Yeni fotoğraflarda GPS verisi olmaz. Zaten çektiğin fotoğraflar kendi verilerini korur.' }],
        },
        {
          h: 'HEIC neden JPEG oluyor',
          blocks: [
            { p: 'HEIC, Apple’ın varsayılan biçimidir. Birçok web sitesi, Windows uygulaması ve eski Android telefon onu açamaz, bu yüzden {site} temizlenmiş HEIC fotoğrafları yüksek kaliteli JPEG olarak kaydeder. iPhone’unun baştan JPEG çekmesini istiyorsan Ayarlar, Kamera, Biçimler, En Uyumlu’yu seç.' },
          ],
        },
        {
          h: 'Live Photos, Portre modu ve düzenlemeler',
          blocks: [
            { p: 'Live Photo, sabit bir görsel ile kısa bir MOV videodan oluşur ve her birinin kendi meta verileri vardır. Görseli temizlemek videoyu temizlemez; onu sabit fotoğraf olarak paylaş ya da videoyu [video meta veri temizleyiciyle](/guides/remove-metadata-from-videos/) ayrıca temizle. Portre modunun derinlik verileri ve düzenleme geçmişi temiz kopyadan çıkarılır.' },
          ],
        },
      ],
      faq: [
        { q: 'AirDrop meta verileri korur mu?', a: 'Evet. Önce Seçenekler’de Konum’u kapatmazsan AirDrop, konum dahil tam orijinali gönderir.' },
        { q: 'iMessage konumu kaldırır mı?', a: 'Güvenilir şekilde değil. Paylaşırken Seçenekler’de Konum’u kapat ya da fotoğrafı göndermeden önce temizle.' },
      ],
    },
    'remove-metadata-from-videos': {
      title: 'Videolardan meta veriler nasıl kaldırılır (MP4, MOV ve daha fazlası)',
      metaTitle: 'Videolardan meta verileri kaldır (MP4, MOV, MKV)',
      description:
        'Videolar GPS, cihaz, tarih, zaman kodu ve kodlayıcı etiketlerini saklar. Bunları nasıl göreceğin ve MP4, MOV, MKV, WebM ve diğer videolardan hepsini nasıl kaldıracağın.',
      short: 'Videolardan meta verileri kaldır',
      cta: 'Bir videonun meta verilerini şimdi kaldır',
      intro: [
        'Telefon ve kamera videoları fotoğraflar kadar, bazen daha fazla meta veri taşır: bir konum, cihaz modeli, oluşturma tarihleri, zaman kodu, kullanılan kodlayıcı ve dronlarla aksiyon kameralarında görüntüyle birlikte kaydedilen tam bir GPS ya da telemetri izi. Düzenleme uygulamaları bunun üstüne proje ve yazılım etiketleri ekler.',
      ],
      steps: [
        { name: 'Meta veri temizleyiciyi aç', text: '{site} içindeki Strip sekmesine git.' },
        { name: 'Videoları ekle', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV veya FLV.' },
        { name: 'Bu cihaz veya Sunucu’yu seç', text: 'Bu cihaz hiçbir şey yüklemeden tarayıcında çalışır. Büyük dosyalarda Sunucu daha hızlıdır ve dosyalar hemen ardından silinir.' },
        { name: 'Temiz kopyayı indir', text: 'Tüm etiketler, veri izleri ve C2PA kutuları kaldırılır; görüntü ve ses korunur.' },
      ],
      sections: [
        {
          h: 'Video meta verileri neler içerir',
          blocks: [
            {
              ul: [
                'Genel etiketler: başlık, oluşturma tarihi, cihaz markası ve modeli, yazılım ve konum (örneğin iPhone videolarındaki `©xyz` etiketi ve `com.apple.quicktime.location.ISO6709`).',
                'İz etiketleri: her izin adı, dili, işleyici adı ve kodlayıcı bilgileri.',
                'Veri izleri: dronlardan, araç kameralarından ve aksiyon kameralarından gelen GPS ve sensör telemetrisi; görüntü ve sesin yanında ayrı izler olarak saklanır.',
                'Zaman kodu izleri ve bölüm başlıkları.',
                'Dosyaya eklenmiş kapak görselleri ve küçük resimler.',
                'C2PA kutuları: kameraların, düzenleme uygulamalarının ve yapay zekâ video araçlarının giderek daha sık eklediği imzalı Content Credentials.',
              ],
            },
          ],
        },
        {
          h: 'Video farklı görünür mü?',
          blocks: [
            { p: 'Hayır. Meta veriler görüntüde değil, görüntüyü ve sesi saran kapsayıcıdadır. {site} temiz kopyayı yüksek kalitede kaydeder, bu yüzden normal oynatıldığında aynı görünür ve aynı duyulur. Dosyanın orijinalle bayt bayt aynı olmaması normaldir.' },
          ],
        },
        {
          h: 'ffmpeg ile kendin yap',
          blocks: [
            { p: 'Ücretsiz ffmpeg programıyla şu komut yalnızca görüntüyü ve sesi kopyalar; genel etiketleri, bölümleri ve veri izlerini atar:' },
            { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
            { p: 'Sonucu `ffprobe -hide_banner out.mp4` veya `exiftool out.mp4` ile kontrol et. İşleyici adları gibi bazı iz etiketleri kalabilir; {site} bunları da siler.' },
          ],
        },
      ],
      faq: [
        { q: 'YouTube veya TikTok video meta verilerini kaldırır mı?', a: 'Yüklediğin videoyu yeniden kodlarlar, bu da izleyicilerin indirdiklerinden çoğunu kaldırır. E-postayla, bulut bağlantısıyla veya sohbetle gönderdiğin orijinal dosya bunları hâlâ taşır.' },
        { q: 'Video kalite kaybeder mi?', a: 'Gözle görülür şekilde değil. Temiz kopya yüksek kalitede kaydedilir.' },
      ],
    },
    'remove-c2pa-content-credentials': {
      title: 'C2PA Content Credentials nedir ve nasıl kaldırılır',
      metaTitle: 'C2PA Content Credentials nedir, nasıl kaldırılır',
      description:
        'C2PA Content Credentials bir fotoğrafı veya videoyu kimin, hangi araç ve düzenlemelerle yaptığını kaydeder. Bir dosyada olup olmadığını nasıl kontrol edeceğin, neleri ortaya koyduğu ve nasıl kaldıracağın.',
      short: 'C2PA Content Credentials kaldır',
      cta: 'Bir dosyayı kontrol et ve temizle',
      intro: [
        'C2PA (Coalition for Content Provenance and Authenticity), bir fotoğrafa, videoya veya sese manifesto ya da Content Credentials denen imzalı bir kayıt eklemek için kullanılan bir standarttır. Bazı kameralar ve telefonlar, Photoshop ve Lightroom gibi düzenleme uygulamaları ve Adobe Firefly, OpenAI’ın görsel ve video araçları ve Microsoft’un görsel üreticileri gibi yapay zekâ araçları bunu ekler.',
        'Manifesto bir dosyanın nereden geldiğini göstermek içindir, ama yayımlamak istemeyebileceğin kişisel bilgiler de taşıyabilir. Bu rehber içinde neler olduğunu, bir dosyayı nasıl kontrol edeceğini ve gömülü manifestoyu nasıl kaldıracağını anlatır.',
      ],
      steps: [
        { name: 'Dosyayı kontrol et', text: 'Manifesto olup olmadığını ve ne dediğini görmek için Content Credentials Verify sitesine (contentcredentials.org/verify) yükle.' },
        { name: '{site} meta veri temizleyiciyi aç', text: 'Strip sekmesine git ve dosyayı ekle.' },
        { name: 'Temizle', text: 'Bu cihaz veya Sunucu’yu seç. C2PA manifestosu EXIF, XMP ve diğer meta verilerle birlikte kaldırılır.' },
        { name: 'Yeniden kontrol et', text: 'Temiz kopyayı Verify sitesine yükle. Gömülü Content Credentials bulmaması gerekir.' },
      ],
      sections: [
        {
          h: 'Bir C2PA manifestosu neler içerebilir',
          blocks: [
            {
              ul: [
                'İmzalayan kişinin ya da kuruluşun adı veya hesabı, eklemeyi seçtiyse.',
                'Dosyayı oluşturan cihaz, uygulama veya yapay zekâ hizmeti ve düzenlemede kullanılan yazılım.',
                'Kırpma, renk değişiklikleri veya “üretken yapay zekâ aracıyla oluşturuldu” gibi düzenlemelerin (eylemlerin) listesi.',
                'Tarihler ve saatler, bazen de bir konum.',
                'Önceki sürümlerin küçük resimleri ve “bileşenler”: birleştirilen kaynak dosyalara referanslar.',
                'Dosyanın imzalandığından beri değişip değişmediğini gösteren kriptografik bir imza.',
              ],
            },
          ],
        },
        {
          h: 'Dosyada nerede saklanır',
          blocks: [
            { p: 'JPEG dosyalarda manifesto APP11 segmentlerinde (JUMBF kutuları) bulunur. PNG’de bir `caBX` parçası, MP4 ve MOV’da bir `uuid` kutusu, HEIC, WebP ve AVIF’te ise kendi meta veri kutusudur. Ayrı bir blok olduğu için kaldırmak görsele dokunmaz.' },
          ],
        },
        {
          h: 'Kaldırmak neyi yapar, neyi yapmaz',
          blocks: [
            { p: 'Temizlik dosyaya gömülü manifestoyu kaldırır. Şunları kaldırmaz:' },
            {
              ul: [
                'Görsele çizilmiş görünür filigranlar veya logolar.',
                'Dosyayı oluşturan aracın çevrimiçi sakladığı manifesto kopyaları. Bazı hizmetler Content Credentials’ı bulutta saklar ve görselin kendisinden yeniden bulabilir.',
                'Google’ın [SynthID](/guides/what-is-synthid/) filigranı gibi piksellerdeki görünmez filigranlar. {site} SynthID’yi ayrıca bozar, ama hiçbir araç bir dedektörün onu bulamayacağını garanti edemez.',
                'Herhangi bir açıklama yükümlülüğü. Yapay zekâ ile üretilmiş veya düzenlenmiş içeriğin etiketlenmesine ilişkin yasalar ve platform kuralları dosya için geçerliliğini korur.',
              ],
            },
            { note: 'Content Credentials’ı kaldırmak bir platformun dosyayı yapay zekâ ile üretilmiş olarak etiketlemesini engellemez. Platformlar kendi sınıflandırıcılarını, filigran dedektörlerini ve yükleme sırasındaki soruları da kullanır.' },
          ],
        },
        {
          h: 'C2PA’yı kaldırmanın diğer yolları',
          blocks: [
            {
              ul: [
                'exiftool: `exiftool -jumbf:all= -c2pa:all= photo.jpg` (yeni sürümler) JPEG’lerden C2PA’yı kaldırır; diğer biçimler için `exiftool -all= file` daha basittir.',
                'C2PA’yı desteklemeyen bir uygulamada yeniden kaydetmek genellikle onu siler, ama Photoshop gibi bazı uygulamalar yeni bir manifesto ekler.',
                'Ekran görüntüleri orijinal manifesto olmadan yeni bir dosya oluşturur, daha düşük kalitede.',
              ],
            },
          ],
        },
      ],
      faq: [
        { q: 'C2PA verilerini kaldırmak yasal mı?', a: 'Kendi dosyalarından meta verileri kaldırmana genellikle izin verilir, ama bazı yasalar ve platform kuralları yapay zekâ ile üretilmiş içeriğin etiketlenmesini ister. Content Credentials’ı kaldırmak bu yükümlülükleri değiştirmez.' },
        { q: 'C2PA’yı kaldırmak görselin görünüşünü değiştirir mi?', a: 'Hayır. Manifesto dosyada ayrı bir bloktur; görsel aynı kalır.' },
        { q: 'Verify sitesi neden hâlâ Content Credentials buluyor?', a: 'Bazı görselleri, onları oluşturan hizmetin çevrimiçi sakladığı kimlik bilgileriyle eşleştirebilir. O kaydı dosyan değil, hizmet tutar.' },
      ],
    },
  },
};
