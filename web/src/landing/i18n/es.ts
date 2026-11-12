import type { Translation } from './en';

export const es: Translation = {
  meta: {
    title: 'Quitar SynthID y C2PA de imágenes y videos de IA · {site}',
    description:
      'Quita las C2PA Content Credentials y los metadatos de imágenes y videos de IA hechos con Google Veo, Gemini, Sora, ChatGPT o Higgsfield, y altera la marca de agua SynthID. También borra EXIF, GPS y XMP. Además, descargadores de YouTube, X, TikTok e Instagram.',
    ogDescription:
      'Quita SynthID y los metadatos ocultos de videos y fotos de IA de Veo, Gemini, Sora, ChatGPT y Higgsfield, en nuestro servidor o en tu dispositivo.',
    twitterDescription:
      'Quita SynthID y los metadatos ocultos de videos y fotos de IA de Veo, Gemini, Sora, ChatGPT y Higgsfield.',
    ogImageAlt: '{site}: eliminador de SynthID y metadatos',
  },
  nav: {
    label: 'Principal',
    home: 'Inicio de {site}',
    synthid: 'SynthID',
    detection: 'Etiqueta IA',
    metadata: 'Metadatos',
    downloaders: 'Descargas',
    pricing: 'Precios',
    faq: 'FAQ',
    openTools: 'Abrir herramientas',
    language: 'Idioma',
    menu: 'Menú',
    mobileLabel: 'Principal (móvil)',
  },
  hero: {
    eyebrow: 'Eliminador de SynthID, C2PA y metadatos',
    title: ['Evita que las plataformas marquen', 'tus imágenes y videos como IA.'],
    lede:
      'TikTok, Instagram y otras leen las C2PA Content Credentials ocultas y la marca de agua SynthID de los archivos de IA y añaden una etiqueta de «generado con IA» a tu publicación. Sube una foto o un video de Google Veo, Gemini, Sora, ChatGPT o Higgsfield y descarga una copia limpia: C2PA y todas las etiquetas de metadatos (EXIF, GPS, XMP) borradas, y la marca de agua SynthID alterada. Funciona en nuestro servidor o en tu navegador.',
    ctaStrip: 'Limpiar un archivo',
    ctaDownload: 'Descargar un video',
    toolsLabel: 'Herramientas',
    chipStrip: 'SynthID y metadatos',
  },
  detection: {
    title: ['Evita la etiqueta automática', 'de «generado con IA».'],
    lede:
      'Las plataformas analizan cada subida en busca de C2PA Content Credentials y marcas de agua. Si las encuentran, activan una etiqueta de IA que no puedes quitar. Bórralas antes y declararlo sigue siendo decisión tuya.',
    beforeTitle: 'Con los metadatos',
    beforeText:
      'TikTok leyó las Content Credentials y activó la etiqueta de IA por ti: en gris y sin forma de desactivarla.',
    afterTitle: 'Limpiado con {site}',
    afterText:
      'La plataforma ya no encuentra nada, así que la etiqueta vuelve a ser opcional. Tú decides si lo declaras.',
    detectedTag: 'Etiqueta automática',
    cleanTag: 'Tú decides',
    note:
      'Las plataformas también usan sus propios clasificadores y aun así podrían etiquetar un archivo. {site} quita las señales que puede; no puede prometer que una plataforma no etiquete tu publicación. Sigue las normas de cada plataforma sobre cómo declarar contenido de IA.',
    shotDetectedAlt:
      'El interruptor «Contenido generado por IA» de TikTok activado y bloqueado, con el texto «Hemos añadido esta etiqueta porque TikTok detectó el uso de IA para editar o generar contenido en tu publicación.»',
    shotOptionalAlt:
      'El interruptor «Contenido generado por IA» de TikTok desactivado y opcional, con el texto «Añade esta etiqueta para indicar a los espectadores que tu contenido se generó o editó con IA.»',
  },
  synthid: {
    title: ['Quita SynthID de videos de IA', 'sin cambiar el aspecto.'],
    lede:
      'SynthID es una marca de agua invisible que Google añade a los píxeles de las imágenes y videos creados con Veo, Gemini e Imagen. {site} cambia esos píxeles ligeramente para debilitar el patrón, y el archivo se ve y se reproduce igual.',
    sourcesTitle: 'Limpia archivos de',
    sourcesLabel: 'Generadores de IA',
    reencode: {
      caption: 'Un remuestreo casi sin pérdida, un rastro de ruido y una nueva codificación mueven cada píxel. La imagen se ve igual; la red invisible de la marca de agua no sobrevive.',
      before: 'Fotograma de IA · marca de agua incrustada',
      after: 'Recodificado · marca de agua rota',
    },
    photos: { title: 'Fotos', text: 'Un leve remuestreo, un rastro de ruido y un enfoque cambian cada píxel, y la imagen se vuelve a guardar en alta calidad.' },
    videos: { title: 'Videos', text: 'Una recodificación de alta calidad (CRF 18) con un ligero desenfoque, un enfoque equivalente y un poco de ruido entre fotogramas.' },
    caveat: {
      title: 'Sin garantías',
      text: 'SynthID está diseñado para resistir ediciones, así que ninguna herramienta puede prometer que un detector no lo encuentre. {site} debilita la marca de agua; no puede garantizar que desaparezca ni que una plataforma no etiquete el archivo como IA.',
    },
    cta: 'Abrir el eliminador de SynthID',
    learnMore: '¿Qué es SynthID?',
  },
  metadata: {
    title: ['Eliminador de metadatos', 'para fotos y videos.'],
    lede:
      'Las fotos y los videos guardan dónde se tomaron, el dispositivo, su número de serie y el historial de edición. El eliminador de metadatos lo borra todo, quita la marca de agua SynthID y te muestra qué quitó.',
    synthidTag: 'Marca de agua SynthID',
    photosTitle: 'Se quita de las fotos',
    photoTags: ['EXIF', 'Ubicación GPS', 'XMP', 'IPTC', 'Perfiles ICC', 'C2PA / Content Credentials', 'Notas del fabricante', 'Miniaturas', 'Comentarios de texto'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC se devuelve como JPEG.',
    videosTitle: 'Se quita de los videos',
    videoTags: ['Etiquetas globales y de pista', 'Etiquetas de capítulos', 'Pistas GPS y de telemetría', 'Código de tiempo', 'Portada', 'Cajas C2PA', 'Datos del codificador'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Las pistas se copian sin recodificar.',
  },
  downloaders: {
    label: 'Descargadores de videos',
    youtube: {
      title: ['Descargador', 'de YouTube'],
      text: 'Pega enlaces de videos o Shorts de YouTube. Obtén un MP4 de hasta 1080p o el audio en M4A.',
      cta: 'Abrir el descargador de YouTube',
    },
    x: {
      title: ['Descargador', 'de X'],
      text: 'Pega el enlace de una publicación de x.com o twitter.com y obtén su video en MP4.',
      cta: 'Abrir el descargador de X',
    },
    tiktok: {
      title: ['Descargador', 'de TikTok'],
      text: 'Pega enlaces de tiktok.com, incluidos los cortos vm. y vt. Obtén el video en MP4 o el sonido en M4A.',
      cta: 'Abrir el descargador de TikTok',
    },
    instagram: {
      title: ['Descargador', 'de Instagram'],
      text: 'Pega el enlace de un Reel o de una publicación de video pública. Los videos privados no están disponibles.',
      cta: 'Abrir el descargador de Instagram',
    },
  },
  how: {
    title: ['Cómo quitar SynthID', 'y los metadatos.'],
    steps: [
      ['Sube tu archivo.', 'Videos o fotos de IA, tantos como quieras. En el servidor o en este dispositivo.'],
      ['{site} lo limpia.', 'Se quitan las etiquetas EXIF, GPS y C2PA y se debilita la marca de agua SynthID.'],
      ['Descarga la copia limpia.', 'Cada archivo muestra qué se quitó.'],
    ],
    flow: {
      uploading: 'Subiendo…',
      stripping: 'Quitando metadatos · debilitando SynthID…',
      clean: 'Limpio · 4 elementos quitados',
      download: 'Descargar',
    },
    cta: 'Abrir el eliminador de SynthID',
  },
  pricing: {
    title: ['Dos planes.', 'Empieza gratis.'],
    perMonth: '/ mes',
    perYear: '/ año',
    monthly: 'Mensual',
    yearly: 'Anual',
    yearlySave: '2 meses gratis',
    free: 'Cada cuenta tiene 1 limpieza gratis en el dispositivo, 1 limpieza gratis en el servidor y 1 descarga de video gratis. Las limpiezas en el servidor y las descargas gratuitas tienen un límite diario para todos.',
    basic: {
      name: 'Basic',
      /** Shown with a yellow minus: Basic has no downloads. */
      missing: 'Sin descargas de vídeo de YouTube, X, TikTok ni Instagram (solo Pro)',
      features: [
        'Limpiezas ilimitadas en el dispositivo',
        'Tus archivos nunca salen de tu dispositivo',
        'Se quitan los metadatos y C2PA',
        'Acceso a la limpieza de SynthID (lenta, porque depende de lo que permite el navegador; no la ralentizamos)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: 'El más rápido',
      features: [
        'Todo lo de Basic',
        'Limpiezas ilimitadas en el servidor, unas 4 veces más rápidas',
        'Descargas ilimitadas de videos de YouTube, X, TikTok e Instagram',
      ],
    },
    pack: {
      name: 'Pack de limpiezas',
      badge: 'Pruébalo por $2',
      once: 'pago único',
      text: '10 limpiezas de SynthID por $2, en tu dispositivo, con los metadatos borrados también. Sin suscripción: pagas una vez y puedes volver a comprar cuando quieras; las limpiezas se suman.',
      cta: 'Pruébalo por $2',
    },
    billing: 'Los planes se cobran cada mes o cada año. Cancela o cambia de plan cuando quieras. Los packs de limpiezas son un pago único.',
    stripeLabel: 'Pagos seguros con Stripe',
    cta: 'Abrir las herramientas',
  },
  faq: {
    title: ['Quitar SynthID:', 'preguntas frecuentes.'],
    items: [
      {
        q: '¿Qué es un eliminador de SynthID?',
        a: 'SynthID es una marca de agua invisible que Google añade a las imágenes y videos creados con sus modelos de IA. Un eliminador de SynthID cambia ligeramente los píxeles para romper ese patrón. {site} remuestrea y enfoca las fotos, y recodifica los videos en alta calidad, así que el archivo se ve igual.',
      },
      {
        q: '¿Cómo quito SynthID de videos de IA?',
        a: 'Abre el eliminador de SynthID, añade tu video, deja activada la limpieza de SynthID (viene activada) y elige Servidor. {site} quita los metadatos, recodifica el video en alta calidad con pequeños cambios de píxeles que debilitan la marca de agua y te da un MP4 limpio para descargar. Los videos de Google Veo y Gemini llevan SynthID; los mismos pasos también borran los metadatos de otros generadores.',
      },
      {
        q: '¿Con qué generadores de IA funciona?',
        a: 'Con todos. Los videos y fotos de Google Veo, Gemini e Imagen llevan la marca de agua SynthID. Los archivos de Sora, ChatGPT y muchas otras herramientas llevan C2PA Content Credentials en los metadatos. Higgsfield usa varios modelos, incluido Veo, así que sus archivos pueden llevar cualquiera de las dos. {site} quita los metadatos de todos y altera SynthID cuando está presente. No quita marcas de agua visibles ni logotipos.',
      },
      {
        q: '¿TikTok u otras plataformas seguirán etiquetando mi video como IA?',
        a: 'Puede que sí. Algunas plataformas, como TikTok, leen las C2PA Content Credentials para etiquetar contenido de IA, y {site} las quita. Pero las plataformas también pueden usar detectores de marcas de agua, sus propios clasificadores y reglas de declaración, y no hemos probado cómo etiqueta el resultado ninguna plataforma. {site} no garantiza que un archivo pase sin ser detectado ni etiquetado. Sigue las reglas de cada plataforma sobre cómo declarar contenido generado con IA.',
      },
      {
        q: '¿El eliminador de SynthID siempre funciona?',
        a: 'No. SynthID está diseñado para resistir ediciones, y los detectores cambian constantemente. {site} altera la marca de agua, pero un detector aún podría encontrarla.',
      },
      {
        q: '¿Por qué mi imagen sigue detectándose como IA después de limpiarla?',
        a: 'SynthID para imágenes es una marca de agua a nivel de píxel diseñada para resistir cambios de tamaño y nuevos guardados, así que un caso difícil todavía puede activar un detector. {site} remuestrea la imagen, añade un rastro de ruido y la recodifica para debilitar el patrón todo lo posible sin cambiar visiblemente la imagen. Si un archivo sigue marcado, es la marca de agua resistiéndose, no los metadatos: EXIF, XMP y las C2PA Content Credentials se quitan por completo de todos modos. No garantizamos superar ningún detector.',
      },
      {
        q: '¿Qué quita el eliminador de metadatos?',
        a: 'De las fotos: EXIF (cámara, número de serie, hora, GPS), XMP, IPTC, perfiles ICC, C2PA Content Credentials, notas del fabricante, miniaturas incrustadas y comentarios. De los videos: etiquetas globales, de pista y de capítulos, pistas GPS y de telemetría, código de tiempo, portada, cajas C2PA y datos del codificador. Cada archivo muestra una lista de lo que se quitó.',
      },
      {
        q: '¿Se suben mis archivos?',
        a: 'Solo si eliges Servidor. En el modo Servidor el archivo se sube, se limpia y se borra al momento. En el modo Este dispositivo se queda en tu navegador y no se nos envía nada. Los metadatos siempre se quitan; la limpieza de SynthID es un interruptor que viene activado, y en tu dispositivo su recodificación se hace en el navegador, así que los videos tardan más que en el servidor.',
      },
      {
        q: '¿Qué formatos se admiten?',
        a: 'Fotos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF y GIF (HEIC se guarda como JPEG). Videos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV y FLV.',
      },
      {
        q: '¿Limpiar el archivo reduce la calidad?',
        a: 'Quitar los metadatos copia las pistas de video sin recodificar y guarda las fotos en alta calidad. Quitar SynthID tiene que cambiar píxeles, así que el archivo no es idéntico byte a byte, pero no notarás la diferencia al verlo normalmente.',
      },
      {
        q: '¿Es legal quitar una marca de agua SynthID?',
        a: 'Depende de dónde vivas y de cómo uses el archivo. Procesa solo contenido que sea tuyo o que tengas permiso para usar, y etiqueta el contenido generado con IA cuando la ley o una plataforma lo exijan.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Descargadores:', 'preguntas frecuentes.'],
    items: [
      {
        q: '¿Cómo descargo un video de YouTube?',
        a: 'Abre el descargador de YouTube, pega el enlace de un video o de un Short y pulsa Descargar. Obtienes un MP4 de hasta 1080p, o elige Solo audio para un archivo M4A. Puedes pegar varios enlaces a la vez.',
      },
      {
        q: '¿Cómo descargo un video de X (Twitter)?',
        a: 'Copia el enlace de la publicación (x.com o twitter.com) y pégalo en el descargador de X. Obtienes el video de esa publicación en MP4.',
      },
      {
        q: '¿El descargador de TikTok funciona con enlaces cortos?',
        a: 'Sí. Pega un enlace de tiktok.com o un enlace corto vm.tiktok.com / vt.tiktok.com y obtienes el video en MP4 o el sonido en M4A.',
      },
      {
        q: '¿Por qué falla un enlace de Instagram o X?',
        a: 'Solo se pueden descargar videos públicos. Los videos privados no están disponibles en la herramienta de descarga, y si una plataforma pide iniciar sesión, la descarga falla con un mensaje que lo indica.',
      },
      {
        q: '¿Puedo descargar solo el audio?',
        a: 'Sí. Cada descargador tiene un interruptor Video / Solo audio. Solo audio te da un archivo M4A.',
      },
      {
        q: '¿Guardan los videos que descargo?',
        a: 'No. Cada video se obtiene en nuestro servidor, se te envía y se borra justo después.',
      },
      {
        q: '¿Es legal descargar videos?',
        a: 'Descarga solo videos que sean tuyos o que tengas permiso para usar. Descargar puede infringir los términos de servicio de una plataforma, y las normas de derechos de autor dependen de dónde vivas.',
      },
    ],
  },
  footer: {
    tagline: 'Eliminador de SynthID y de metadatos, y descargadores de YouTube, X, TikTok e Instagram.',
    open: 'Abrir las herramientas',
    disclaimer:
      'Procesa y descarga solo contenido que sea tuyo o que tengas permiso para usar, y etiqueta el contenido generado con IA cuando las normas lo exijan. {site} no está afiliado a Google, YouTube, TikTok, X ni Instagram.',
    badges: 'Destacado en',
  },
  jsonLd: {
    name: '{site}: eliminador de SynthID y metadatos',
    alternateName: ['Eliminar SynthID', 'Quitar SynthID de videos de IA', 'Eliminador de metadatos', 'Descargador de YouTube', 'Descargador de videos de X', 'Descargador de TikTok', 'Descargador de Instagram'],
    browserRequirements: 'Requiere un navegador moderno con JavaScript.',
    operatingSystem: 'Cualquiera (navegador web)',
    description:
      'Quita metadatos EXIF, GPS, XMP, IPTC y C2PA de videos y fotos de IA (Google Veo, Gemini, Sora, ChatGPT, Higgsfield y más) y altera las marcas de agua SynthID, en un servidor o en tu dispositivo. Los resultados no están garantizados. Incluye descargadores de YouTube, TikTok, X e Instagram.',
    keywords:
      'quitar SynthID, eliminar SynthID, eliminador de SynthID, quitar SynthID de videos de IA, quitar C2PA, eliminar metadatos, marca de agua IA, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      'Eliminación de SynthID en fotos y videos',
      'Eliminador de metadatos EXIF, GPS, XMP, IPTC, ICC y C2PA',
      'Opción de procesamiento en el dispositivo',
      'Descargador de YouTube (MP4 hasta 1080p o audio M4A)',
      'Descargador de TikTok',
      'Descargadores de videos de X e Instagram',
    ],
  },
};
