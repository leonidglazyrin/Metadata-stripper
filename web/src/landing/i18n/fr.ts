import type { Translation } from './en';

export const fr: Translation = {
  meta: {
    title: 'Supprimer SynthID et C2PA des images et vidéos IA · {site}',
    description:
      'Supprimez les C2PA Content Credentials et les métadonnées des images et vidéos IA créées avec Google Veo, Gemini, Sora, ChatGPT ou Higgsfield, et brouillez le filigrane SynthID. Retire aussi EXIF, GPS et XMP. Avec en plus des téléchargeurs YouTube, X, TikTok et Instagram.',
    ogDescription:
      'Supprimez SynthID et les métadonnées cachées des vidéos et photos IA de Veo, Gemini, Sora, ChatGPT et Higgsfield, sur notre serveur ou sur votre appareil.',
    twitterDescription:
      'Supprimez SynthID et les métadonnées cachées des vidéos et photos IA de Veo, Gemini, Sora, ChatGPT et Higgsfield.',
    ogImageAlt: '{site} : suppression de SynthID et des métadonnées',
  },
  nav: {
    label: 'Principal',
    home: 'Accueil {site}',
    synthid: 'SynthID',
    detection: 'Label IA',
    metadata: 'Métadonnées',
    downloaders: 'Téléchargeurs',
    pricing: 'Tarifs',
    faq: 'FAQ',
    openTools: 'Ouvrir les outils',
    language: 'Langue',
    menu: 'Menu',
    mobileLabel: 'Principal (mobile)',
  },
  hero: {
    eyebrow: 'Suppression de SynthID, C2PA et métadonnées',
    title: ['Empêchez les plateformes de marquer', 'vos images et vidéos comme IA.'],
    lede:
      'TikTok, Instagram et d’autres lisent les C2PA Content Credentials cachées et le filigrane SynthID des fichiers IA, puis ajoutent une étiquette « généré par IA » à votre publication. Déposez une photo ou une vidéo de Google Veo, Gemini, Sora, ChatGPT ou Higgsfield et téléchargez une copie propre : C2PA et toutes les balises de métadonnées (EXIF, GPS, XMP) supprimées, et le filigrane SynthID brouillé. Fonctionne sur notre serveur ou dans votre navigateur.',
    ctaStrip: 'Nettoyer un fichier',
    ctaDownload: 'Télécharger une vidéo',
    toolsLabel: 'Outils',
    chipStrip: 'SynthID et métadonnées',
  },
  detection: {
    title: ['Évitez l’étiquette automatique', '« généré par IA ».'],
    lede:
      'Les plateformes analysent chaque envoi à la recherche de C2PA Content Credentials et de filigranes. S’ils en trouvent, elles activent une étiquette IA que vous ne pouvez pas retirer. Supprimez-les avant, et le choix de le signaler reste le vôtre.',
    beforeTitle: 'Métadonnées conservées',
    beforeText:
      'TikTok a lu les Content Credentials et activé l’étiquette IA à votre place : grisée, impossible à désactiver.',
    afterTitle: 'Nettoyé avec {site}',
    afterText:
      'La plateforme ne trouve plus rien, donc l’étiquette redevient facultative. C’est vous qui décidez de le signaler.',
    detectedTag: 'Étiquette automatique',
    cleanTag: 'À vous de choisir',
    note:
      'Les plateformes utilisent aussi leurs propres classificateurs et peuvent quand même étiqueter un fichier. {site} supprime les signaux qu’il peut ; il ne peut pas promettre qu’une plateforme n’étiquettera pas votre publication. Respectez les règles de chaque plateforme sur le contenu IA.',
    shotDetectedAlt:
      'L’interrupteur « Contenu généré par IA » de TikTok activé et verrouillé, avec le texte « Nous avons ajouté cette étiquette car TikTok a détecté l’utilisation de l’IA pour modifier ou générer du contenu dans votre publication. »',
    shotOptionalAlt:
      'L’interrupteur « Contenu généré par IA » de TikTok désactivé et facultatif, avec le texte « Ajoutez cette étiquette pour indiquer aux spectateurs que votre contenu a été généré ou modifié avec l’IA. »',
  },
  synthid: {
    title: ['Retirez SynthID des vidéos IA', 'sans changer le rendu.'],
    lede:
      'SynthID est un filigrane invisible que Google ajoute aux pixels des images et vidéos créées avec Veo, Gemini et Imagen. {site} modifie légèrement ces pixels pour affaiblir le motif, et le fichier garde le même rendu à l’écran comme à la lecture.',
    sourcesTitle: 'Nettoyez les fichiers de',
    sourcesLabel: 'Générateurs IA',
    reencode: {
      caption: 'Un rééchantillonnage quasi sans perte, une trace de bruit et un nouvel encodage déplacent chaque pixel. L’image reste identique ; la grille invisible du filigrane ne survit pas.',
      before: 'Image IA · filigrane intégré',
      after: 'Réencodée · filigrane brisé',
    },
    photos: { title: 'Photos', text: 'Un léger rééchantillonnage, une trace de bruit et une accentuation modifient chaque pixel, puis l’image est réenregistrée en haute qualité.' },
    videos: { title: 'Vidéos', text: 'Un réencodage haute qualité (CRF 18) avec un léger flou, une accentuation équivalente et un peu de bruit entre les images.' },
    caveat: {
      title: 'Aucune garantie',
      text: 'SynthID est conçu pour résister aux retouches, donc aucun outil ne peut promettre qu’un détecteur le manquera. {site} affaiblit le filigrane ; il ne peut garantir ni sa disparition, ni qu’une plateforme n’étiquettera pas le fichier comme IA.',
    },
    cta: 'Ouvrir l’outil SynthID',
    learnMore: 'Qu’est-ce que SynthID ?',
  },
  metadata: {
    title: ['Suppression des métadonnées', 'des photos et vidéos.'],
    lede:
      'Les photos et vidéos enregistrent le lieu de prise de vue, l’appareil, son numéro de série et l’historique des retouches. L’outil supprime tout, retire le filigrane SynthID et liste ce qu’il a enlevé.',
    synthidTag: 'Filigrane SynthID',
    photosTitle: 'Retiré des photos',
    photoTags: ['EXIF', 'Position GPS', 'XMP', 'IPTC', 'Profils ICC', 'C2PA / Content Credentials', 'Notes du fabricant', 'Miniatures', 'Commentaires texte'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. Les HEIC reviennent en JPEG.',
    videosTitle: 'Retiré des vidéos',
    videoTags: ['Balises globales et de flux', 'Balises de chapitres', 'Pistes GPS et télémétrie', 'Timecode', 'Pochette', 'Boîtes C2PA', 'Infos d’encodeur'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Les flux sont copiés sans réencodage.',
  },
  downloaders: {
    label: 'Téléchargeurs de vidéos',
    youtube: {
      title: ['Téléchargeur', 'YouTube'],
      text: 'Collez des liens de vidéos ou de Shorts YouTube. Obtenez un MP4 jusqu’en 1080p, ou l’audio en M4A.',
      cta: 'Ouvrir le téléchargeur YouTube',
    },
    x: {
      title: ['Téléchargeur', 'X'],
      text: 'Collez le lien d’une publication x.com ou twitter.com et récupérez sa vidéo en MP4.',
      cta: 'Ouvrir le téléchargeur X',
    },
    tiktok: {
      title: ['Téléchargeur', 'TikTok'],
      text: 'Collez des liens tiktok.com, y compris les liens courts vm. et vt. Obtenez la vidéo en MP4 ou le son en M4A.',
      cta: 'Ouvrir le téléchargeur TikTok',
    },
    instagram: {
      title: ['Téléchargeur', 'Instagram'],
      text: 'Collez le lien d’un Reel ou d’une publication vidéo publique. Les vidéos privées ne sont pas disponibles.',
      cta: 'Ouvrir le téléchargeur Instagram',
    },
  },
  how: {
    title: ['Comment retirer SynthID', 'et les métadonnées.'],
    steps: [
      ['Envoyez votre fichier.', 'Vidéos ou photos IA, autant que vous voulez. Sur le serveur ou sur cet appareil.'],
      ['{site} le nettoie.', 'Les balises EXIF, GPS et C2PA sont supprimées et le filigrane SynthID est affaibli.'],
      ['Téléchargez la copie propre.', 'Chaque fichier indique ce qui a été retiré.'],
    ],
    flow: {
      uploading: 'Envoi…',
      stripping: 'Suppression des métadonnées · affaiblissement de SynthID…',
      clean: 'Propre · 4 éléments retirés',
      download: 'Télécharger',
    },
    cta: 'Ouvrir l’outil SynthID',
  },
  pricing: {
    title: ['Deux formules.', 'Commencez gratuitement.'],
    perMonth: '/ mois',
    perYear: '/ an',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    yearlySave: '2 mois offerts',
    free: 'Chaque compte a droit à 1 nettoyage gratuit sur l’appareil, 1 nettoyage gratuit sur le serveur et 1 téléchargement vidéo gratuit. Les nettoyages serveur et téléchargements gratuits sont limités par jour pour tout le monde.',
    basic: {
      name: 'Basic',
      features: [
        'Nettoyages illimités sur l’appareil',
        'Vos fichiers ne quittent jamais votre appareil',
        'Métadonnées et C2PA supprimés',
        'Accès au retrait de SynthID (lent, car limité par les capacités des navigateurs ; nous ne le ralentissons pas)',
      ],
    },
    pro: {
      name: 'Pro',
      badge: 'Le plus rapide',
      features: [
        'Tout ce qu’offre Basic',
        'Nettoyages illimités sur le serveur, environ 4 fois plus rapides',
        'Téléchargements illimités de vidéos YouTube, X, TikTok et Instagram',
      ],
    },
    pack: {
      name: 'Pack de nettoyages',
      badge: 'Essayez pour 2 $',
      once: 'paiement unique',
      text: '10 retraits de SynthID pour 2 $, sur votre appareil, métadonnées supprimées en plus. Sans abonnement : payez une fois et rachetez quand vous voulez, les nettoyages s’additionnent.',
      cta: 'Essayez pour 2 $',
    },
    billing: 'Les formules sont facturées au mois ou à l’année. Résiliez ou changez de formule à tout moment. Les packs de nettoyages sont un paiement unique.',
    stripeLabel: 'Paiements sécurisés par Stripe',
    cta: 'Ouvrir les outils',
  },
  faq: {
    title: ['Retrait de SynthID :', 'FAQ.'],
    items: [
      {
        q: 'Qu’est-ce qu’un outil de retrait de SynthID ?',
        a: 'SynthID est un filigrane invisible que Google ajoute aux images et vidéos créées avec ses modèles d’IA. Un outil de retrait de SynthID modifie légèrement les pixels pour casser ce motif. {site} rééchantillonne et accentue les photos, et réencode les vidéos en haute qualité, si bien que le fichier garde le même rendu.',
      },
      {
        q: 'Comment retirer SynthID d’une vidéo IA ?',
        a: 'Ouvrez l’outil SynthID, ajoutez votre vidéo, laissez le retrait de SynthID activé (il l’est par défaut) et choisissez Serveur. {site} supprime les métadonnées, réencode la vidéo en haute qualité avec de petites modifications de pixels qui affaiblissent le filigrane, et vous donne un MP4 propre à télécharger. Les vidéos Google Veo et Gemini portent SynthID ; les mêmes étapes effacent aussi les métadonnées des autres générateurs.',
      },
      {
        q: 'Avec quels générateurs IA cela fonctionne-t-il ?',
        a: 'Tous. Les vidéos et photos de Google Veo, Gemini et Imagen portent un filigrane SynthID. Les fichiers de Sora, ChatGPT et de nombreux autres outils portent des C2PA Content Credentials dans leurs métadonnées. Higgsfield utilise plusieurs modèles, dont Veo, donc ses fichiers peuvent porter l’un ou l’autre. {site} supprime les métadonnées de tous et brouille SynthID quand il est présent. Il ne retire pas les filigranes visibles ni les logos.',
      },
      {
        q: 'TikTok ou d’autres plateformes vont-elles encore étiqueter ma vidéo comme IA ?',
        a: 'C’est possible. Certaines plateformes, dont TikTok, lisent les C2PA Content Credentials pour étiqueter le contenu IA, et {site} les supprime. Mais les plateformes peuvent aussi utiliser des détecteurs de filigranes, leurs propres classificateurs et des règles de divulgation, et nous n’avons pas testé comment une plateforme étiquette le résultat. {site} ne garantit pas qu’un fichier passera inaperçu ou sans étiquette. Respectez les règles de chaque plateforme sur le contenu généré par IA.',
      },
      {
        q: 'Le retrait de SynthID fonctionne-t-il toujours ?',
        a: 'Non. SynthID est conçu pour résister aux retouches, et les détecteurs évoluent sans cesse. {site} brouille le filigrane, mais un détecteur peut encore le trouver.',
      },
      {
        q: 'Pourquoi mon image est-elle encore détectée comme IA après nettoyage ?',
        a: 'Pour les images, SynthID est un filigrane au niveau des pixels conçu pour résister au redimensionnement et au réenregistrement, donc un cas difficile peut encore déclencher un détecteur. {site} rééchantillonne l’image, ajoute une trace de bruit et la réencode pour affaiblir le motif autant que possible sans changer visiblement l’image. Si un fichier reste signalé, c’est le filigrane qui résiste, pas les métadonnées : EXIF, XMP et C2PA Content Credentials sont de toute façon entièrement supprimés. Nous ne garantissons de passer aucun détecteur.',
      },
      {
        q: 'Que retire l’outil de métadonnées ?',
        a: 'Sur les photos : EXIF (appareil, numéro de série, heure, GPS), XMP, IPTC, profils ICC, C2PA Content Credentials, notes du fabricant, miniatures intégrées et commentaires. Sur les vidéos : balises globales, de flux et de chapitres, pistes GPS et télémétrie, timecode, pochette, boîtes C2PA et infos d’encodeur. Chaque fichier affiche la liste de ce qui a été retiré.',
      },
      {
        q: 'Mes fichiers sont-ils envoyés ?',
        a: 'Seulement si vous choisissez Serveur. En mode Serveur, le fichier est envoyé, nettoyé et supprimé aussitôt. En mode Cet appareil, il reste dans votre navigateur et rien ne nous est envoyé. Les métadonnées sont toujours supprimées ; le retrait de SynthID est un interrupteur activé par défaut, et sur votre appareil son réencodage tourne dans le navigateur, donc les vidéos prennent plus de temps que sur le serveur.',
      },
      {
        q: 'Quels formats sont pris en charge ?',
        a: 'Photos : JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF et GIF (les HEIC sont enregistrés en JPEG). Vidéos : MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV et FLV.',
      },
      {
        q: 'Le nettoyage réduit-il la qualité ?',
        a: 'Supprimer les métadonnées copie les flux vidéo sans réencodage et enregistre les photos en haute qualité. Retirer SynthID oblige à modifier des pixels, donc le fichier n’est pas identique octet pour octet, mais vous ne verrez aucune différence en visionnage normal.',
      },
      {
        q: 'Est-il légal de retirer un filigrane SynthID ?',
        a: 'Cela dépend de votre lieu de résidence et de l’usage du fichier. Ne traitez que du contenu qui vous appartient ou que vous avez le droit d’utiliser, et signalez le contenu généré par IA quand la loi ou une plateforme l’exige.',
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
        q: 'Comment télécharger une vidéo de X (Twitter) ?',
        a: 'Copiez le lien de la publication (x.com ou twitter.com) et collez-le dans le téléchargeur X. Vous obtenez la vidéo de cette publication en MP4.',
      },
      {
        q: 'Le téléchargeur TikTok accepte-t-il les liens courts ?',
        a: 'Oui. Collez un lien tiktok.com ou un lien court vm.tiktok.com / vt.tiktok.com et obtenez la vidéo en MP4, ou le son en M4A.',
      },
      {
        q: 'Pourquoi un lien Instagram ou X échoue-t-il ?',
        a: 'Seules les vidéos publiques peuvent être téléchargées. Les vidéos privées ne sont pas disponibles dans l’outil, et si une plateforme demande une connexion, le téléchargement échoue avec un message l’indiquant.',
      },
      {
        q: 'Puis-je télécharger seulement l’audio ?',
        a: 'Oui. Chaque téléchargeur a un interrupteur Vidéo / Audio seul. Audio seul vous donne un fichier M4A.',
      },
      {
        q: 'Gardez-vous les vidéos que je télécharge ?',
        a: 'Non. Chaque vidéo est récupérée sur notre serveur, vous est envoyée, puis supprimée juste après.',
      },
      {
        q: 'Est-il légal de télécharger des vidéos ?',
        a: 'Ne téléchargez que des vidéos qui vous appartiennent ou que vous avez le droit d’utiliser. Télécharger peut enfreindre les conditions d’utilisation d’une plateforme, et le droit d’auteur dépend de votre pays.',
      },
    ],
  },
  footer: {
    tagline: 'Retrait de SynthID, suppression des métadonnées et téléchargeurs YouTube, X, TikTok et Instagram.',
    open: 'Ouvrir les outils',
    disclaimer:
      'Ne traitez et ne téléchargez que du contenu qui vous appartient ou que vous avez le droit d’utiliser, et signalez le contenu généré par IA quand les règles l’exigent. {site} n’est affilié ni à Google, ni à YouTube, TikTok, X ou Instagram.',
    badges: 'Présenté sur',
  },
  jsonLd: {
    name: '{site} : retrait de SynthID et suppression des métadonnées',
    alternateName: ['Supprimer SynthID', 'Retirer SynthID des vidéos IA', 'Suppression des métadonnées', 'Téléchargeur YouTube', 'Téléchargeur de vidéos X', 'Téléchargeur TikTok', 'Téléchargeur Instagram'],
    browserRequirements: 'Nécessite un navigateur récent avec JavaScript.',
    operatingSystem: 'Tous (navigateur web)',
    description:
      'Supprimez les métadonnées EXIF, GPS, XMP, IPTC et C2PA des vidéos et photos IA (Google Veo, Gemini, Sora, ChatGPT, Higgsfield et autres) et brouillez les filigranes SynthID, sur un serveur ou sur votre appareil. Résultats non garantis. Inclut des téléchargeurs YouTube, TikTok, X et Instagram.',
    keywords:
      'supprimer SynthID, retirer SynthID, enlever filigrane IA, supprimer SynthID vidéo IA, supprimer C2PA, supprimer métadonnées, Veo, Gemini, Sora, ChatGPT, Higgsfield',
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
