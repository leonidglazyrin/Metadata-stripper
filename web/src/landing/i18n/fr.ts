import type { Translation } from './en';

export const fr: Translation = {
  meta: {
    title: 'Supprimer SynthID et les métadonnées des photos et vidéos · {site}',
    description:
      '{site} supprime les métadonnées et brouille le filigrane SynthID des photos et vidéos. Retirez les balises EXIF, GPS et C2PA sur notre serveur ou sur votre appareil. Avec des téléchargeurs YouTube, X, TikTok et Instagram.',
    ogDescription:
      'Retirez le filigrane SynthID et les métadonnées cachées de vos photos et vidéos, sur notre serveur ou sur votre appareil. Avec des téléchargeurs YouTube, X, TikTok et Instagram.',
    twitterDescription:
      'Retirez le filigrane SynthID et les métadonnées cachées de vos photos et vidéos. Avec des téléchargeurs YouTube, X, TikTok et Instagram.',
    ogImageAlt: '{site} : suppression de SynthID et des métadonnées',
  },
  nav: {
    label: 'Principal',
    home: 'Accueil {site}',
    synthid: 'SynthID',
    metadata: 'Métadonnées',
    downloaders: 'Téléchargeurs',
    pricing: 'Tarif',
    faq: 'FAQ',
    openTools: 'Ouvrir les outils',
    language: 'Langue',
    menu: 'Menu',
    mobileLabel: 'Principal (mobile)',
  },
  hero: {
    eyebrow: 'Retrait de SynthID · suppression des métadonnées · téléchargement de vidéos',
    title: ['Supprimez SynthID', 'et les métadonnées.'],
    lede:
      'Déposez une photo ou une vidéo et téléchargez une copie sans balises EXIF, GPS ni C2PA, avec le filigrane SynthID brouillé. Le traitement se fait sur notre serveur ou dans votre navigateur.',
    ctaStrip: 'Nettoyer un fichier',
    ctaDownload: 'Télécharger une vidéo',
    toolsLabel: 'Outils',
    chipStrip: 'SynthID et métadonnées',
  },
  synthid: {
    title: ['Retirez SynthID', 'sans changer le rendu.'],
    lede:
      'SynthID est un filigrane invisible que Google ajoute aux pixels des images et vidéos générées par IA. {site} modifie légèrement ces pixels pour casser le motif. Le fichier garde le même aspect.',
    sourcesTitle: 'Nettoyez les fichiers de',
    sourcesLabel: 'Générateurs d’IA',
    photos: { title: 'Photos', text: 'Un léger rééchantillonnage suivi d’une accentuation modifie chaque pixel, puis l’image est réenregistrée en haute qualité.' },
    videos: { title: 'Vidéos', text: 'Un réencodage haute qualité (CRF 18) avec un léger flou, une accentuation équivalente et un peu de bruit entre les images.' },
    caveat: {
      title: 'Aucune garantie',
      text: 'SynthID est conçu pour résister aux retouches : aucun outil ne peut promettre qu’un détecteur ne le trouvera pas. {site} brouille le filigrane, sans pouvoir garantir qu’il a disparu.',
    },
    cta: 'Ouvrir l’outil SynthID',
  },
  metadata: {
    title: ['Suppression des métadonnées', 'des photos et vidéos.'],
    lede:
      'Les photos et vidéos enregistrent le lieu de prise de vue, l’appareil, son numéro de série et l’historique des retouches. L’outil supprime tout cela et liste ce qu’il a retiré.',
    synthidTag: 'Filigrane SynthID',
    photosTitle: 'Retiré des photos',
    photoTags: ['EXIF', 'Position GPS', 'XMP', 'IPTC', 'Profils ICC', 'C2PA / Content Credentials', 'Notes du fabricant', 'Miniatures', 'Commentaires'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. Les HEIC sont renvoyés en JPEG.',
    videosTitle: 'Retiré des vidéos',
    videoTags: ['Balises globales et de piste', 'Balises de chapitre', 'Pistes GPS et télémétrie', 'Timecode', 'Pochette', 'Boîtes C2PA', 'Infos de l’encodeur'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Les pistes sont copiées sans réencodage.',
  },
  downloaders: {
    label: 'Téléchargeurs de vidéos',
    youtube: {
      title: ['Téléchargeur', 'YouTube'],
      text: 'Collez des liens de vidéos ou de Shorts YouTube. Récupérez un MP4 jusqu’en 1080p, ou l’audio en M4A.',
      cta: 'Ouvrir le téléchargeur YouTube',
    },
    x: {
      title: ['Téléchargeur', 'X'],
      text: 'Collez le lien d’un post x.com ou twitter.com et récupérez sa vidéo en MP4.',
      cta: 'Ouvrir le téléchargeur X',
    },
    tiktok: {
      title: ['Téléchargeur', 'TikTok'],
      text: 'Collez des liens tiktok.com, y compris les liens courts vm. et vt. Récupérez la vidéo en MP4 ou le son en M4A.',
      cta: 'Ouvrir le téléchargeur TikTok',
    },
    instagram: {
      title: ['Téléchargeur', 'Instagram'],
      text: 'Collez le lien d’un Reel ou d’un post vidéo. Les posts publics fonctionnent ; les privés demandent une session connectée.',
      cta: 'Ouvrir le téléchargeur Instagram',
    },
  },
  how: {
    title: ['Comment retirer SynthID', 'et les métadonnées.'],
    steps: [
      ['Importez votre fichier.', 'Vidéos ou photos d’IA, autant que vous voulez. Sur le serveur ou sur cet appareil.'],
      ['{site} le nettoie.', 'Les balises EXIF, GPS et C2PA sont supprimées et le filigrane SynthID est affaibli.'],
      ['Téléchargez la copie propre.', 'Chaque fichier indique ce qui a été supprimé.'],
    ],
    flow: {
      uploading: 'Import…',
      stripping: 'Suppression des métadonnées · affaiblissement de SynthID…',
      clean: 'Propre · 4 éléments supprimés',
      download: 'Télécharger',
    },
    cta: 'Ouvrir l’outil SynthID',
  },
  pricing: {
    title: ['Une seule offre.', '{price} par mois.'],
    perMonth: '/ mois',
    features: ['Retrait de SynthID et suppression des métadonnées', 'Téléchargeurs YouTube, X, TikTok et Instagram', 'Photos et vidéos dans tous les formats courants'],
    billing: 'Facturation mensuelle via Stripe. Résiliable à tout moment.',
    stripeLabel: 'Paiements par Stripe',
    cta: 'Ouvrir les outils',
  },
  faq: {
    title: ['Retrait de SynthID :', 'FAQ.'],
    items: [
      {
        q: 'Qu’est-ce qu’un outil de retrait de SynthID ?',
        a: 'SynthID est un filigrane invisible que Google ajoute aux images et vidéos créées avec ses modèles d’IA. Un outil de retrait de SynthID modifie légèrement les pixels pour casser ce motif. {site} rééchantillonne et accentue les photos, et réencode les vidéos en haute qualité : le fichier garde le même aspect.',
      },
      {
        q: 'Comment supprimer SynthID des vidéos d’IA ?',
        a: 'Ouvrez le suppresseur de SynthID, ajoutez votre vidéo, laissez l’option SynthID activée et choisissez Serveur. {site} supprime les métadonnées, réencode la vidéo en haute qualité avec de légères modifications de pixels qui affaiblissent le filigrane, et vous donne un MP4 propre à télécharger. Les vidéos de Google Veo et Gemini portent SynthID ; les mêmes étapes effacent aussi les métadonnées des autres générateurs.',
      },
      {
        q: 'Avec quels générateurs d’IA cela fonctionne-t-il ?',
        a: 'Tous. Les vidéos et photos de Google Veo, Gemini et Imagen portent un filigrane SynthID. Les fichiers de Sora, ChatGPT et de nombreux autres outils portent des C2PA Content Credentials dans leurs métadonnées. Higgsfield utilise plusieurs modèles, dont Veo, donc ses fichiers peuvent porter l’un ou l’autre. {site} supprime les métadonnées de tous et perturbe SynthID quand il est présent. Il ne supprime pas les filigranes visibles ni les logos.',
      },
      {
        q: 'TikTok ou d’autres plateformes marqueront-ils encore ma vidéo comme IA ?',
        a: 'C’est possible. Certaines plateformes, dont TikTok, lisent les C2PA Content Credentials pour marquer le contenu IA, et {site} les supprime. Mais les plateformes peuvent aussi utiliser des détecteurs de filigrane, leurs propres classificateurs et des règles de déclaration, et nous n’avons pas testé comment une plateforme marque le résultat. {site} ne garantit pas qu’un fichier passera sans être détecté ni marqué. Respectez les règles de chaque plateforme sur la déclaration du contenu généré par IA.',
      },
      {
        q: 'Le retrait de SynthID fonctionne-t-il à tous les coups ?',
        a: 'Non. SynthID est conçu pour résister aux retouches, et les détecteurs évoluent sans cesse. {site} brouille le filigrane, mais un détecteur peut encore le trouver.',
      },
      {
        q: 'Que retire l’outil de métadonnées ?',
        a: 'Des photos : EXIF (appareil, numéro de série, heure, GPS), XMP, IPTC, profils ICC, C2PA Content Credentials, notes du fabricant, miniatures intégrées et commentaires. Des vidéos : balises globales, de piste et de chapitre, pistes GPS et télémétrie, timecode, pochette, boîtes C2PA et infos de l’encodeur. Chaque fichier affiche la liste de ce qui a été retiré.',
      },
      {
        q: 'Mes fichiers sont-ils envoyés en ligne ?',
        a: 'Seulement si vous choisissez Serveur. En mode Serveur, le fichier est envoyé, nettoyé et supprimé aussitôt. En mode Cet appareil, il reste dans votre navigateur. Sur l’appareil, les photos sont nettoyées sans perte et les vidéos sont remultiplexées ; le retrait de SynthID sur l’appareil ne fonctionne que sur les photos.',
      },
      {
        q: 'Quels formats sont pris en charge ?',
        a: 'Photos : JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF et GIF (les HEIC sont enregistrés en JPEG). Vidéos : MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV et FLV.',
      },
      {
        q: 'Le nettoyage réduit-il la qualité ?',
        a: 'La suppression des métadonnées copie les pistes vidéo sans réencodage et enregistre les photos en haute qualité. Le retrait de SynthID doit modifier des pixels, donc le fichier n’est pas identique octet pour octet, mais vous ne verrez pas de différence en visionnage normal.',
      },
      {
        q: 'Est-il légal de retirer un filigrane SynthID ?',
        a: 'Cela dépend de votre pays et de l’usage du fichier. Ne traitez que des contenus qui vous appartiennent ou que vous avez le droit d’utiliser, et signalez les contenus générés par IA quand la loi ou une plateforme l’exige.',
      },
    ],
  },
  downloaderFaq: {
    title: ['Téléchargeurs :', 'FAQ.'],
    items: [
      {
        q: 'Comment télécharger une vidéo YouTube ?',
        a: 'Ouvrez le téléchargeur YouTube, collez le lien d’une vidéo ou d’un Short et appuyez sur Télécharger. Vous obtenez un MP4 jusqu’en 1080p, ou choisissez Audio seul pour un fichier M4A. Vous pouvez coller plusieurs liens à la fois.',
      },
      {
        q: 'Comment télécharger une vidéo X (Twitter) ?',
        a: 'Copiez le lien du post (x.com ou twitter.com) et collez-le dans le téléchargeur X. Vous obtenez la vidéo de ce post en MP4.',
      },
      {
        q: 'Le téléchargeur TikTok accepte-t-il les liens courts ?',
        a: 'Oui. Collez un lien tiktok.com ou un lien court vm.tiktok.com / vt.tiktok.com et vous obtenez la vidéo en MP4 ou le son en M4A.',
      },
      {
        q: 'Pourquoi un lien Instagram ou X échoue-t-il ?',
        a: 'Les posts privés et certains posts publics demandent une session connectée. Si un post est privé ou si la plateforme demande une connexion, le téléchargement échoue avec un message qui l’indique.',
      },
      {
        q: 'Puis-je télécharger uniquement l’audio ?',
        a: 'Oui. Chaque téléchargeur a un interrupteur Vidéo / Audio seul. Audio seul vous donne un fichier M4A.',
      },
      {
        q: 'Gardez-vous les vidéos que je télécharge ?',
        a: 'Non. Chaque vidéo est récupérée sur notre serveur, vous est envoyée, puis supprimée aussitôt.',
      },
      {
        q: 'Est-il légal de télécharger des vidéos ?',
        a: 'Ne téléchargez que des vidéos qui vous appartiennent ou que vous avez le droit d’utiliser. Télécharger peut enfreindre les conditions d’utilisation d’une plateforme, et le droit d’auteur dépend de votre pays.',
      },
    ],
  },
  footer: {
    tagline: 'retrait de SynthID, suppression des métadonnées et téléchargeurs YouTube, X, TikTok et Instagram.',
    open: 'Ouvrir les outils',
    disclaimer:
      'Ne traitez et ne téléchargez que des contenus qui vous appartiennent ou que vous avez le droit d’utiliser, et signalez les contenus générés par IA quand les règles l’exigent. {site} n’est pas affilié à Google, YouTube, TikTok, X ou Instagram.',
    badges: 'Présenté sur',
  },
  jsonLd: {
    name: '{site} : suppression de SynthID et des métadonnées',
    alternateName: ['Supprimer SynthID', 'Supprimer les métadonnées', 'Téléchargeur YouTube', 'Téléchargeur de vidéos X', 'Téléchargeur TikTok', 'Téléchargeur Instagram'],
    browserRequirements: 'Nécessite un navigateur récent avec JavaScript.',
    operatingSystem: 'Tous (navigateur web)',
    description:
      'Supprimez les métadonnées EXIF, GPS, XMP, IPTC et C2PA des photos et vidéos et brouillez les filigranes SynthID, sur un serveur ou sur votre appareil. Avec des téléchargeurs YouTube, TikTok, X et Instagram.',
    featureList: [
      'Retrait de SynthID sur photos et vidéos',
      'Suppression des métadonnées EXIF, GPS, XMP, IPTC, ICC et C2PA',
      'Option de traitement sur l’appareil',
      'Téléchargeur YouTube (MP4 jusqu’en 1080p ou audio M4A)',
      'Téléchargeur TikTok',
      'Téléchargeurs de vidéos X et Instagram',
    ],
  },
};
