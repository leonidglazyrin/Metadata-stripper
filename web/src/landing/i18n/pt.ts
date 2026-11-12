import type { Translation } from './en';

export const pt: Translation = {
  meta: {
    title: 'Remover SynthID e C2PA de imagens e vídeos de IA · {site}',
    description:
      'Remova as C2PA Content Credentials e os metadados de imagens e vídeos de IA feitos com Google Veo, Gemini, Sora, ChatGPT ou Higgsfield, e embaralhe a marca d’água SynthID. Também apaga EXIF, GPS e XMP. Além disso, downloaders de YouTube, X, TikTok e Instagram.',
    ogDescription:
      'Remova o SynthID e os metadados ocultos de vídeos e fotos de IA do Veo, Gemini, Sora, ChatGPT e Higgsfield, no nosso servidor ou no seu dispositivo.',
    twitterDescription:
      'Remova o SynthID e os metadados ocultos de vídeos e fotos de IA do Veo, Gemini, Sora, ChatGPT e Higgsfield.',
    ogImageAlt: '{site}: removedor de SynthID e metadados',
  },
  nav: {
    label: 'Principal',
    home: 'Início do {site}',
    synthid: 'SynthID',
    detection: 'Rótulo IA',
    metadata: 'Metadados',
    downloaders: 'Downloads',
    pricing: 'Preços',
    faq: 'FAQ',
    openTools: 'Abrir ferramentas',
    language: 'Idioma',
    menu: 'Menu',
    mobileLabel: 'Principal (celular)',
  },
  hero: {
    eyebrow: 'Removedor de SynthID, C2PA e metadados',
    title: ['Impeça as plataformas de marcar', 'suas imagens e vídeos como IA.'],
    lede:
      'TikTok, Instagram e outras leem as C2PA Content Credentials ocultas e a marca d’água SynthID dos arquivos de IA e colocam um rótulo de “gerado por IA” no seu post. Envie uma foto ou vídeo do Google Veo, Gemini, Sora, ChatGPT ou Higgsfield e baixe uma cópia limpa: C2PA e todas as tags de metadados (EXIF, GPS, XMP) apagadas, e a marca d’água SynthID embaralhada. Funciona no nosso servidor ou no seu navegador.',
    ctaStrip: 'Limpar um arquivo',
    ctaDownload: 'Baixar um vídeo',
    toolsLabel: 'Ferramentas',
    chipStrip: 'SynthID e metadados',
  },
  detection: {
    title: ['Evite o rótulo automático', 'de “gerado por IA”.'],
    lede:
      'As plataformas verificam cada envio em busca de C2PA Content Credentials e marcas d’água. Se encontram, ativam um rótulo de IA que você não consegue desligar. Remova-os antes e informar continua sendo escolha sua.',
    beforeTitle: 'Com os metadados',
    beforeText:
      'O TikTok leu as Content Credentials e ativou o rótulo de IA por você: acinzentado, sem como desligar.',
    afterTitle: 'Limpo com o {site}',
    afterText:
      'Não sobra nada para a plataforma encontrar, então o rótulo volta a ser opcional. Você decide se vai informar.',
    detectedTag: 'Rótulo automático',
    cleanTag: 'Você decide',
    note:
      'As plataformas também usam classificadores próprios e ainda podem rotular um arquivo. O {site} remove os sinais que consegue; não pode prometer que uma plataforma não vai rotular seu post. Siga as regras de cada plataforma sobre conteúdo de IA.',
    shotDetectedAlt:
      'O botão “Conteúdo gerado por IA” do TikTok ligado e bloqueado, com o texto “Adicionamos este rótulo porque o TikTok detectou o uso de IA para editar ou gerar conteúdo no seu post.”',
    shotOptionalAlt:
      'O botão “Conteúdo gerado por IA” do TikTok desligado e opcional, com o texto “Adicione este rótulo para informar aos espectadores que seu conteúdo foi gerado ou editado com IA.”',
  },
  synthid: {
    title: ['Remova o SynthID de vídeos de IA', 'sem mudar a aparência.'],
    lede:
      'SynthID é uma marca d’água invisível que o Google adiciona aos pixels de imagens e vídeos feitos com Veo, Gemini e Imagen. O {site} altera levemente esses pixels para enfraquecer o padrão, e o arquivo continua com a mesma aparência e reprodução.',
    sourcesTitle: 'Limpe arquivos de',
    sourcesLabel: 'Geradores de IA',
    reencode: {
      caption: 'Uma reamostragem quase sem perdas, um traço de ruído e uma nova codificação movem cada pixel. A imagem fica igual; a grade invisível da marca d’água não sobrevive.',
      before: 'Quadro de IA · marca d’água embutida',
      after: 'Recodificado · marca d’água quebrada',
    },
    photos: { title: 'Fotos', text: 'Uma leve reamostragem, um traço de ruído e uma nitidez alteram cada pixel, e a imagem é salva de novo em alta qualidade.' },
    videos: { title: 'Vídeos', text: 'Uma recodificação de alta qualidade (CRF 18) com um leve desfoque, uma nitidez equivalente e um pouco de ruído entre os quadros.' },
    caveat: {
      title: 'Sem garantias',
      text: 'O SynthID foi feito para resistir a edições, então nenhuma ferramenta pode prometer que um detector não vai encontrá-lo. O {site} enfraquece a marca d’água; não pode garantir que ela sumiu nem que uma plataforma não vai rotular o arquivo como IA.',
    },
    cta: 'Abrir o removedor de SynthID',
    learnMore: 'O que é SynthID?',
  },
  metadata: {
    title: ['Removedor de metadados', 'para fotos e vídeos.'],
    lede:
      'Fotos e vídeos guardam onde foram feitos, o dispositivo, o número de série e o histórico de edição. O removedor de metadados apaga tudo isso, remove a marca d’água SynthID e mostra o que foi removido.',
    synthidTag: 'Marca d’água SynthID',
    photosTitle: 'Removido das fotos',
    photoTags: ['EXIF', 'Localização GPS', 'XMP', 'IPTC', 'Perfis ICC', 'C2PA / Content Credentials', 'Notas do fabricante', 'Miniaturas', 'Comentários de texto'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC volta como JPEG.',
    videosTitle: 'Removido dos vídeos',
    videoTags: ['Tags globais e de faixa', 'Tags de capítulos', 'Faixas de GPS e telemetria', 'Timecode', 'Capa', 'Caixas C2PA', 'Dados do codificador'],
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
      title: ['Downloader', 'de X'],
      text: 'Cole o link de um post do x.com ou twitter.com e receba o vídeo desse post em MP4.',
      cta: 'Abrir o downloader de X',
    },
    tiktok: {
      title: ['Downloader', 'de TikTok'],
      text: 'Cole links do tiktok.com, incluindo os curtos vm. e vt. Receba o vídeo em MP4 ou o som em M4A.',
      cta: 'Abrir o downloader de TikTok',
    },
    instagram: {
      title: ['Downloader', 'de Instagram'],
      text: 'Cole o link de um Reel ou post de vídeo público. Vídeos privados não estão disponíveis.',
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
    title: ['Dois planos.', 'Comece grátis.'],
    perMonth: '/ mês',
    perYear: '/ ano',
    monthly: 'Mensal',
    yearly: 'Anual',
    yearlySave: '2 meses grátis',
    free: 'Toda conta tem 1 limpeza grátis no dispositivo, 1 limpeza grátis no servidor e 1 download de vídeo grátis. As limpezas no servidor e os downloads grátis têm limite diário para todos.',
    basic: {
      name: 'Basic',
      features: [
        'Limpezas ilimitadas no dispositivo',
        'Seus arquivos nunca saem do seu dispositivo',
        'Metadados e C2PA removidos',
        'Acesso à limpeza de SynthID (lenta, pois depende do que o navegador permite; nós não a deixamos mais lenta)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: 'O mais rápido',
      features: [
        'Tudo do Basic',
        'Limpezas ilimitadas no servidor, cerca de 4x mais rápidas',
        'Downloads ilimitados de vídeos do YouTube, X, TikTok e Instagram',
      ],
    },
    pack: {
      name: 'Pacote de limpezas',
      badge: 'Experimente por $2',
      once: 'pagamento único',
      text: '10 limpezas de SynthID por $2, no seu dispositivo, com os metadados removidos também. Sem assinatura: pague uma vez e compre de novo quando quiser; as limpezas se somam.',
      cta: 'Experimente por $2',
    },
    billing: 'Os planos são cobrados mensal ou anualmente. Cancele ou mude de plano quando quiser. Os pacotes de limpezas são um pagamento único.',
    stripeLabel: 'Pagamentos seguros pela Stripe',
    cta: 'Abrir as ferramentas',
  },
  faq: {
    title: ['Remover SynthID:', 'perguntas frequentes.'],
    items: [
      {
        q: 'O que é um removedor de SynthID?',
        a: 'SynthID é uma marca d’água invisível que o Google adiciona a imagens e vídeos feitos com seus modelos de IA. Um removedor de SynthID altera levemente os pixels para quebrar esse padrão. O {site} reamostra e aplica nitidez nas fotos e recodifica os vídeos em alta qualidade, então o arquivo continua com a mesma aparência.',
      },
      {
        q: 'Como remover o SynthID de vídeos de IA?',
        a: 'Abra o removedor de SynthID, adicione seu vídeo, deixe a limpeza de SynthID ligada (ela vem ligada) e escolha Servidor. O {site} remove os metadados, recodifica o vídeo em alta qualidade com pequenas mudanças de pixels que enfraquecem a marca d’água e entrega um MP4 limpo para baixar. Vídeos do Google Veo e do Gemini têm SynthID; os mesmos passos também apagam os metadados de outros geradores.',
      },
      {
        q: 'Com quais geradores de IA funciona?',
        a: 'Com todos. Vídeos e fotos do Google Veo, Gemini e Imagen têm a marca d’água SynthID. Arquivos do Sora, ChatGPT e muitas outras ferramentas têm C2PA Content Credentials nos metadados. O Higgsfield usa vários modelos, incluindo o Veo, então seus arquivos podem ter qualquer um dos dois. O {site} remove os metadados de todos e embaralha o SynthID quando ele está presente. Não remove marcas d’água visíveis nem logotipos.',
      },
      {
        q: 'O TikTok ou outras plataformas ainda vão rotular meu vídeo como IA?',
        a: 'Podem rotular. Algumas plataformas, incluindo o TikTok, leem as C2PA Content Credentials para rotular conteúdo de IA, e o {site} as remove. Mas as plataformas também podem usar detectores de marca d’água, classificadores próprios e regras de divulgação, e não testamos como nenhuma plataforma rotula o resultado. O {site} não garante que um arquivo passe sem ser detectado ou rotulado. Siga as regras de cada plataforma sobre como informar conteúdo gerado por IA.',
      },
      {
        q: 'O removedor de SynthID sempre funciona?',
        a: 'Não. O SynthID foi feito para resistir a edições, e os detectores mudam o tempo todo. O {site} embaralha a marca d’água, mas um detector ainda pode encontrá-la.',
      },
      {
        q: 'Por que minha imagem ainda é detectada como IA depois da limpeza?',
        a: 'O SynthID para imagens é uma marca d’água em nível de pixel feita para resistir a redimensionamento e novos salvamentos, então um caso difícil ainda pode acionar um detector. O {site} reamostra a imagem, adiciona um traço de ruído e a recodifica para enfraquecer o padrão o máximo possível sem mudar a imagem visivelmente. Se um arquivo continuar marcado, é a marca d’água resistindo, não os metadados: EXIF, XMP e as C2PA Content Credentials continuam totalmente removidos. Não garantimos passar em nenhum detector.',
      },
      {
        q: 'O que o removedor de metadados tira?',
        a: 'Das fotos: EXIF (câmera, número de série, hora, GPS), XMP, IPTC, perfis ICC, C2PA Content Credentials, notas do fabricante, miniaturas embutidas e comentários. Dos vídeos: tags globais, de faixa e de capítulos, faixas de GPS e telemetria, timecode, capa, caixas C2PA e dados do codificador. Cada arquivo mostra uma lista do que foi removido.',
      },
      {
        q: 'Meus arquivos são enviados?',
        a: 'Só se você escolher Servidor. No modo Servidor o arquivo é enviado, limpo e apagado na hora. No modo Este dispositivo ele fica no seu navegador e nada é enviado para nós. Os metadados sempre são removidos; a limpeza de SynthID é um botão que vem ligado, e no seu dispositivo a recodificação roda no navegador, então os vídeos demoram mais do que no servidor.',
      },
      {
        q: 'Quais formatos são aceitos?',
        a: 'Fotos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF e GIF (HEIC é salvo como JPEG). Vídeos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV e FLV.',
      },
      {
        q: 'Limpar o arquivo reduz a qualidade?',
        a: 'Remover os metadados copia as faixas de vídeo sem recodificar e salva as fotos em alta qualidade. Remover o SynthID precisa mudar pixels, então o arquivo não fica idêntico byte a byte, mas você não vai notar diferença ao assistir normalmente.',
      },
      {
        q: 'É legal remover uma marca d’água SynthID?',
        a: 'Depende de onde você mora e de como usa o arquivo. Processe só conteúdo que é seu ou que você tem permissão para usar, e rotule conteúdo gerado por IA quando a lei ou uma plataforma exigir.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Downloaders:', 'perguntas frequentes.'],
    items: [
      {
        q: 'Como baixar um vídeo do YouTube?',
        a: 'Abra o downloader de YouTube, cole o link de um vídeo ou Short e toque em Baixar. Você recebe um MP4 de até 1080p, ou escolha Só áudio para um arquivo M4A. Dá para colar vários links de uma vez.',
      },
      {
        q: 'Como baixar um vídeo do X (Twitter)?',
        a: 'Copie o link do post (x.com ou twitter.com) e cole no downloader de X. Você recebe o vídeo desse post em MP4.',
      },
      {
        q: 'O downloader de TikTok funciona com links curtos?',
        a: 'Sim. Cole um link do tiktok.com ou um link curto vm.tiktok.com / vt.tiktok.com e receba o vídeo em MP4 ou o som em M4A.',
      },
      {
        q: 'Por que um link do Instagram ou do X falha?',
        a: 'Só vídeos públicos podem ser baixados. Vídeos privados não estão disponíveis na ferramenta de download, e se uma plataforma pedir login, o download falha com uma mensagem avisando.',
      },
      {
        q: 'Posso baixar só o áudio?',
        a: 'Sim. Todo downloader tem um botão Vídeo / Só áudio. Só áudio entrega um arquivo M4A.',
      },
      {
        q: 'Vocês guardam os vídeos que eu baixo?',
        a: 'Não. Cada vídeo é buscado no nosso servidor, enviado para você e apagado logo depois.',
      },
      {
        q: 'É legal baixar vídeos?',
        a: 'Baixe só vídeos que são seus ou que você tem permissão para usar. Baixar pode violar os termos de serviço de uma plataforma, e as regras de direitos autorais dependem de onde você mora.',
      },
    ],
  },
  footer: {
    tagline: 'Removedor de SynthID e de metadados, e downloaders de YouTube, X, TikTok e Instagram.',
    open: 'Abrir as ferramentas',
    disclaimer:
      'Processe e baixe só conteúdo que é seu ou que você tem permissão para usar, e rotule conteúdo gerado por IA quando as regras exigirem. O {site} não tem afiliação com Google, YouTube, TikTok, X ou Instagram.',
    badges: 'Destaque em',
  },
  jsonLd: {
    name: '{site}: removedor de SynthID e metadados',
    alternateName: ['Remover SynthID', 'Remover SynthID de vídeos de IA', 'Removedor de metadados', 'Downloader de YouTube', 'Downloader de vídeos do X', 'Downloader de TikTok', 'Downloader de Instagram'],
    browserRequirements: 'Requer um navegador moderno com JavaScript.',
    operatingSystem: 'Qualquer (navegador web)',
    description:
      'Remova metadados EXIF, GPS, XMP, IPTC e C2PA de vídeos e fotos de IA (Google Veo, Gemini, Sora, ChatGPT, Higgsfield e outros) e embaralhe marcas d’água SynthID, num servidor ou no seu dispositivo. Os resultados não são garantidos. Inclui downloaders de YouTube, TikTok, X e Instagram.',
    keywords:
      'remover SynthID, removedor de SynthID, remover SynthID de vídeos de IA, tirar marca d’água de IA, remover C2PA, remover metadados, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      'Remoção de SynthID em fotos e vídeos',
      'Removedor de metadados EXIF, GPS, XMP, IPTC, ICC e C2PA',
      'Opção de processamento no dispositivo',
      'Downloader de YouTube (MP4 até 1080p ou áudio M4A)',
      'Downloader de TikTok',
      'Downloaders de vídeos do X e do Instagram',
    ],
  },
};
