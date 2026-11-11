import type { Translation } from './en';

export const pt: Translation = {
  meta: {
    title: 'Remover SynthID e metadados de fotos e vídeos · {site}',
    description:
      '{site} remove metadados e embaralha a marca d’água SynthID em fotos e vídeos. Tire EXIF, GPS e tags C2PA no nosso servidor ou no seu dispositivo. Além disso, downloaders de YouTube, X, TikTok e Instagram.',
    ogDescription:
      'Remova a marca d’água SynthID e os metadados ocultos de fotos e vídeos, no nosso servidor ou no seu dispositivo. Além disso, downloaders de YouTube, X, TikTok e Instagram.',
    twitterDescription:
      'Remova a marca d’água SynthID e os metadados ocultos de fotos e vídeos. Além disso, downloaders de YouTube, X, TikTok e Instagram.',
    ogImageAlt: '{site}: removedor de SynthID e metadados',
  },
  nav: {
    label: 'Principal',
    home: 'Início do {site}',
    synthid: 'SynthID',
    metadata: 'Metadados',
    downloaders: 'Downloaders',
    pricing: 'Preço',
    faq: 'Perguntas',
    openTools: 'Abrir ferramentas',
    language: 'Idioma',
    menu: 'Menu',
    mobileLabel: 'Principal (celular)',
  },
  hero: {
    eyebrow: 'Remover SynthID · apagar metadados · baixar vídeos',
    title: ['Removedor de SynthID', 'e metadados.'],
    lede:
      'Envie uma foto ou vídeo e baixe uma cópia sem tags EXIF, GPS e C2PA e com a marca d’água SynthID embaralhada. Funciona no nosso servidor ou no seu navegador.',
    ctaStrip: 'Limpar um arquivo',
    ctaDownload: 'Baixar um vídeo',
    toolsLabel: 'Ferramentas',
    chipStrip: 'SynthID e metadados',
  },
  synthid: {
    title: ['Remova o SynthID', 'sem mudar a aparência.'],
    lede:
      'SynthID é uma marca d’água invisível que o Google adiciona aos pixels de imagens e vídeos feitos com IA. O {site} altera levemente esses pixels para quebrar o padrão. O arquivo continua com a mesma aparência.',
    sourcesTitle: 'Limpe arquivos de',
    sourcesLabel: 'Geradores de IA',
    photos: { title: 'Fotos', text: 'Um leve redimensionamento e nitidez muda cada pixel, e a imagem é salva de novo em alta qualidade.' },
    videos: { title: 'Vídeos', text: 'Uma recodificação de alta qualidade (CRF 18) com um leve desfoque, nitidez equivalente e um pouco de ruído entre os quadros.' },
    caveat: {
      title: 'Sem garantias',
      text: 'O SynthID foi feito para resistir a edições, então nenhuma ferramenta pode prometer que um detector não vai encontrá-lo. O {site} embaralha a marca d’água; não pode garantir que ela sumiu.',
    },
    cta: 'Abrir o removedor de SynthID',
  },
  metadata: {
    title: ['Removedor de metadados', 'para fotos e vídeos.'],
    lede:
      'Fotos e vídeos guardam onde foram feitos, o aparelho, o número de série e o histórico de edição. O removedor de metadados apaga tudo isso e mostra o que foi removido.',
    synthidTag: 'Marca d’água SynthID',
    photosTitle: 'Removido das fotos',
    photoTags: ['EXIF', 'Localização GPS', 'XMP', 'IPTC', 'Perfis ICC', 'C2PA / Content Credentials', 'Notas do fabricante', 'Miniaturas', 'Comentários de texto'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC volta como JPEG.',
    videosTitle: 'Removido dos vídeos',
    videoTags: ['Tags globais e de faixa', 'Tags de capítulo', 'Faixas de GPS e telemetria', 'Timecode', 'Capa', 'Caixas C2PA', 'Dados do codificador'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. As faixas são copiadas sem recodificar.',
  },
  downloaders: {
    label: 'Downloaders de vídeo',
    youtube: {
      title: ['Downloader', 'de YouTube'],
      text: 'Cole links de vídeos ou Shorts do YouTube. Receba um MP4 de até 1080p ou o áudio em M4A.',
      cta: 'Abrir o downloader de YouTube',
    },
    x: {
      title: ['Downloader', 'do X'],
      text: 'Cole o link de um post do x.com ou twitter.com e receba o vídeo desse post em MP4.',
      cta: 'Abrir o downloader do X',
    },
    tiktok: {
      title: ['Downloader', 'de TikTok'],
      text: 'Cole links do tiktok.com, incluindo os curtos vm. e vt. Receba o vídeo em MP4 ou o som em M4A.',
      cta: 'Abrir o downloader de TikTok',
    },
    instagram: {
      title: ['Downloader', 'de Instagram'],
      text: 'Cole o link de um Reel ou de um post com vídeo. Posts públicos funcionam; os privados precisam de uma sessão conectada.',
      cta: 'Abrir o downloader de Instagram',
    },
  },
  how: {
    title: ['Como remover o SynthID', 'e os metadados.'],
    steps: [
      ['Envie seu arquivo.', 'Vídeos ou fotos de IA, quantos quiser. No servidor ou neste dispositivo.'],
      ['O {site} limpa.', 'As tags EXIF, GPS e C2PA são removidas e a marca d’água SynthID é enfraquecida.'],
      ['Baixe a cópia limpa.', 'Cada arquivo mostra o que foi removido.'],
    ],
    flow: {
      uploading: 'Enviando…',
      stripping: 'Removendo metadados · enfraquecendo o SynthID…',
      clean: 'Limpo · 4 itens removidos',
      download: 'Baixar',
    },
    cta: 'Abrir o removedor de SynthID',
  },
  pricing: {
    title: ['Um só plano.', '{price} por mês.'],
    perMonth: '/ mês',
    features: ['Removedor de SynthID e de metadados', 'Downloaders de YouTube, X, TikTok e Instagram', 'Fotos e vídeos em todos os formatos comuns'],
    billing: 'Cobrança mensal pelo Stripe. Cancele quando quiser.',
    stripeLabel: 'Pagamentos pela Stripe',
    cta: 'Abrir as ferramentas',
  },
  faq: {
    title: ['Remoção do SynthID:', 'perguntas frequentes.'],
    items: [
      {
        q: 'O que é um removedor de SynthID?',
        a: 'SynthID é uma marca d’água invisível que o Google adiciona a imagens e vídeos feitos com seus modelos de IA. Um removedor de SynthID altera levemente os pixels para quebrar esse padrão. O {site} redimensiona e aplica nitidez nas fotos e recodifica os vídeos em alta qualidade, então o arquivo continua com a mesma aparência.',
      },
      {
        q: 'Como removo o SynthID de vídeos de IA?',
        a: 'Abra o removedor de SynthID, adicione seu vídeo, deixe a remoção de SynthID ligada e escolha Servidor. O {site} remove os metadados, recodifica o vídeo em alta qualidade com pequenas mudanças de pixels que enfraquecem a marca d’água e entrega um MP4 limpo para baixar. Vídeos do Google Veo e do Gemini têm SynthID; os mesmos passos também limpam os metadados de outros geradores.',
      },
      {
        q: 'Com quais geradores de IA funciona?',
        a: 'Com todos. Vídeos e fotos do Google Veo, Gemini e Imagen têm a marca d’água SynthID. Arquivos do Sora, ChatGPT e de muitas outras ferramentas têm C2PA Content Credentials nos metadados. O Higgsfield usa vários modelos, incluindo o Veo, então seus arquivos podem ter qualquer um dos dois. O {site} remove os metadados de todos e altera o SynthID quando ele existe. Ele não remove marcas d’água visíveis nem logotipos.',
      },
      {
        q: 'O TikTok ou outras plataformas ainda vão marcar meu vídeo como IA?',
        a: 'Talvez. Algumas plataformas, incluindo o TikTok, leem as C2PA Content Credentials para marcar conteúdo de IA, e o {site} remove essas informações. Mas as plataformas também podem usar detectores de marca d’água, seus próprios classificadores e regras de divulgação, e não testamos como nenhuma plataforma marca o resultado. O {site} não garante que um arquivo passe sem ser detectado ou marcado. Siga as regras de cada plataforma sobre a divulgação de conteúdo gerado por IA.',
      },
      {
        q: 'O removedor de SynthID sempre funciona?',
        a: 'Não. O SynthID foi feito para resistir a edições, e os detectores mudam o tempo todo. O {site} embaralha a marca d’água, mas um detector ainda pode encontrá-la.',
      },
      {
        q: 'O que o removedor de metadados tira?',
        a: 'Das fotos: EXIF (câmera, número de série, horário, GPS), XMP, IPTC, perfis ICC, C2PA Content Credentials, notas do fabricante, miniaturas incorporadas e comentários. Dos vídeos: tags globais, de faixa e de capítulo, faixas de GPS e telemetria, timecode, capa, caixas C2PA e dados do codificador. Cada arquivo mostra uma lista do que foi removido.',
      },
      {
        q: 'Meus arquivos são enviados?',
        a: 'Só se você escolher Servidor. No modo Servidor o arquivo é enviado, limpo e apagado na hora. No modo Este dispositivo ele fica no seu navegador. No seu dispositivo, as fotos são limpas sem perda e os vídeos são remuxados; a remoção do SynthID no dispositivo funciona só com fotos.',
      },
      {
        q: 'Quais formatos são aceitos?',
        a: 'Fotos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF e GIF (HEIC é salvo como JPEG). Vídeos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV e FLV.',
      },
      {
        q: 'Limpar o arquivo reduz a qualidade?',
        a: 'Remover metadados copia as faixas de vídeo sem recodificar e salva as fotos em alta qualidade. Remover o SynthID precisa mudar pixels, então o arquivo não fica idêntico byte a byte, mas você não vai notar diferença ao assistir normalmente.',
      },
      {
        q: 'É legal remover a marca d’água SynthID?',
        a: 'Depende de onde você mora e de como usa o arquivo. Processe apenas conteúdo que é seu ou que você tem permissão para usar, e identifique conteúdo gerado por IA quando a lei ou uma plataforma exigir.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Downloaders:', 'perguntas frequentes.'],
    items: [
      {
        q: 'Como baixo um vídeo do YouTube?',
        a: 'Abra o downloader de YouTube, cole o link de um vídeo ou Short e toque em Baixar. Você recebe um MP4 de até 1080p, ou escolha Só áudio para um arquivo M4A. Dá para colar vários links de uma vez.',
      },
      {
        q: 'Como baixo um vídeo do X (Twitter)?',
        a: 'Copie o link do post (x.com ou twitter.com) e cole no downloader do X. Você recebe o vídeo desse post em MP4.',
      },
      {
        q: 'O downloader de TikTok funciona com links curtos?',
        a: 'Sim. Cole um link do tiktok.com ou um link curto vm.tiktok.com / vt.tiktok.com e receba o vídeo em MP4 ou o som em M4A.',
      },
      {
        q: 'Por que um link do Instagram ou do X falha?',
        a: 'Posts privados e alguns públicos precisam de uma sessão conectada. Se o post for privado ou a plataforma pedir login, o download falha com uma mensagem avisando.',
      },
      {
        q: 'Posso baixar só o áudio?',
        a: 'Sim. Todo downloader tem um botão Vídeo / Só áudio. Só áudio gera um arquivo M4A.',
      },
      {
        q: 'Vocês guardam os vídeos que eu baixo?',
        a: 'Não. Cada vídeo é buscado no nosso servidor, enviado para você e apagado logo depois.',
      },
      {
        q: 'É legal baixar vídeos?',
        a: 'Baixe apenas vídeos que são seus ou que você tem permissão para usar. Baixar pode violar os termos de uso de uma plataforma, e as regras de direitos autorais dependem de onde você mora.',
      },
    ],
  },
  footer: {
    tagline: 'removedor de SynthID e de metadados, e downloaders de YouTube, X, TikTok e Instagram.',
    open: 'Abrir as ferramentas',
    disclaimer:
      'Processe e baixe apenas conteúdo que é seu ou que você tem permissão para usar, e identifique conteúdo gerado por IA quando as regras exigirem. O {site} não é afiliado ao Google, YouTube, TikTok, X ou Instagram.',
    badges: 'Destaque em',
  },
  jsonLd: {
    name: '{site}: removedor de SynthID e metadados',
    alternateName: ['Remover SynthID', 'Removedor de metadados', 'Baixar vídeos do YouTube', 'Baixar vídeos do X', 'Baixar vídeos do TikTok', 'Baixar vídeos do Instagram'],
    browserRequirements: 'Requer um navegador moderno com JavaScript.',
    operatingSystem: 'Qualquer um (navegador web)',
    description:
      'Remova metadados EXIF, GPS, XMP, IPTC e C2PA de fotos e vídeos e embaralhe marcas d’água SynthID, em um servidor ou no seu dispositivo. Inclui downloaders de YouTube, TikTok, X e Instagram.',
    featureList: [
      'Remoção de SynthID em fotos e vídeos',
      'Removedor de metadados EXIF, GPS, XMP, IPTC, ICC e C2PA',
      'Opção de processamento no dispositivo',
      'Downloader de YouTube (MP4 até 1080p ou áudio M4A)',
      'Downloader de TikTok',
      'Downloaders de vídeo do X e do Instagram',
    ],
  },
};
