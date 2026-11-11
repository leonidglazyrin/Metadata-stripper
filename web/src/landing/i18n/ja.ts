import type { Translation } from './en';

export const ja: Translation = {
  meta: {
    title: '写真・動画のSynthIDとメタデータを削除 · {site}',
    description:
      '{site}は写真と動画のメタデータを削除し、SynthID透かしを崩すツールです。EXIF・GPS・C2PAタグをサーバー上またはお使いの端末上で削除できます。YouTube・X・TikTok・Instagramのダウンローダーも搭載。',
    ogDescription:
      '写真や動画からSynthID透かしと隠れたメタデータを削除。サーバー上でも端末上でも処理できます。YouTube・X・TikTok・Instagramのダウンローダーも搭載。',
    twitterDescription:
      '写真や動画からSynthID透かしと隠れたメタデータを削除。YouTube・X・TikTok・Instagramのダウンローダーも搭載。',
    ogImageAlt: '{site}：SynthIDとメタデータの削除ツール',
  },
  nav: {
    label: 'メイン',
    home: '{site} ホーム',
    synthid: 'SynthID',
    metadata: 'メタデータ',
    downloaders: 'ダウンローダー',
    pricing: '料金',
    faq: 'FAQ',
    openTools: 'ツールを開く',
    language: '言語',
    menu: 'メニュー',
    mobileLabel: 'メイン(モバイル)',
  },
  hero: {
    eyebrow: 'SynthID除去 · メタデータ削除 · 動画ダウンロード',
    title: ['SynthIDと', 'メタデータを削除。'],
    lede:
      '写真や動画をドロップすると、EXIF・GPS・C2PAタグを削除し、SynthID透かしを崩したコピーをダウンロードできます。処理はサーバー上でもブラウザ内でも可能です。',
    ctaStrip: 'ファイルを処理',
    ctaDownload: '動画を保存',
    toolsLabel: 'ツール',
    chipStrip: 'SynthIDとメタデータ',
  },
  synthid: {
    title: ['見た目はそのまま、', 'SynthIDを除去。'],
    lede:
      'SynthIDは、GoogleがAIで生成した画像や動画のピクセルに埋め込む見えない透かしです。{site}はピクセルをわずかに変えてそのパターンを崩します。見た目も再生もそのままです。',
    sourcesTitle: '対応する生成元',
    sourcesLabel: 'AI生成ツール',
    photos: { title: '写真', text: 'わずかなリサンプリングとシャープ処理ですべてのピクセルを変え、高画質で保存し直します。' },
    videos: { title: '動画', text: '高画質の再エンコード（CRF 18）に、軽いぼかし、それを打ち消すシャープ処理、フレーム間のわずかなノイズを加えます。' },
    caveat: {
      title: '保証はありません',
      text: 'SynthIDは編集に耐えるよう作られているため、検出されないと約束できるツールはありません。{site}は透かしを崩しますが、完全に消えたとは保証できません。',
    },
    cta: 'SynthID除去ツールを開く',
  },
  metadata: {
    title: ['写真と動画の', 'メタデータを削除。'],
    lede:
      '写真や動画には、撮影場所、端末、シリアル番号、編集履歴が保存されています。メタデータ削除ツールはこれらをすべて消し、何を削除したかを一覧で表示します。',
    synthidTag: 'SynthID透かし',
    photosTitle: '写真から削除するもの',
    photoTags: ['EXIF', 'GPS位置情報', 'XMP', 'IPTC', 'ICCプロファイル', 'C2PA / コンテンツ認証情報', 'メーカーノート', 'サムネイル', 'テキストコメント'],
    photoFormats: 'JPEG、PNG、WebP、HEIC/HEIF、AVIF、TIFF、GIF。HEICはJPEGで返されます。',
    videosTitle: '動画から削除するもの',
    videoTags: ['グローバル・ストリームのタグ', 'チャプタータグ', 'GPS・テレメトリートラック', 'タイムコード', 'カバー画像', 'C2PAボックス', 'エンコーダー情報'],
    videoFormats: 'MP4、MOV、M4V、MKV、WebM、AVI、MTS/M2TS、TS、3GP、WMV、FLV。ストリームは再エンコードせずにコピーします。',
  },
  downloaders: {
    label: '動画ダウンローダー',
    youtube: {
      title: ['YouTube', 'ダウンローダー'],
      text: 'YouTubeの動画やショートのリンクを貼り付けるだけ。最大1080pのMP4、または音声のみのM4Aで保存できます。',
      cta: 'YouTubeダウンローダーを開く',
    },
    x: {
      title: ['X', 'ダウンローダー'],
      text: 'x.comまたはtwitter.comの投稿リンクを貼り付けると、その投稿の動画をMP4で保存できます。',
      cta: 'Xダウンローダーを開く',
    },
    tiktok: {
      title: ['TikTok', 'ダウンローダー'],
      text: 'tiktok.comのリンク（vm.・vt.の短縮リンクも可）を貼り付けて、動画をMP4、サウンドをM4Aで保存できます。',
      cta: 'TikTokダウンローダーを開く',
    },
    instagram: {
      title: ['Instagram', 'ダウンローダー'],
      text: 'リールや動画投稿のリンクを貼り付けてください。公開投稿に対応しています。非公開の投稿にはログイン済みのセッションが必要です。',
      cta: 'Instagramダウンローダーを開く',
    },
  },
  how: {
    title: ['SynthIDとメタデータを', '削除する方法。'],
    steps: [
      ['ファイルをアップロード。', 'AI動画や写真を何件でも。サーバーでもこの端末でも。'],
      ['{site}が除去。', 'EXIF・GPS・C2PAタグを削除し、SynthID透かしを弱めます。'],
      ['クリーンなコピーをダウンロード。', '各ファイルに削除した内容が表示されます。'],
    ],
    flow: {
      uploading: 'アップロード中…',
      stripping: 'メタデータを削除 · SynthIDを弱めています…',
      clean: 'クリーン · 4項目を削除',
      download: 'ダウンロード',
    },
    cta: 'SynthID除去ツールを開く',
  },
  pricing: {
    perMonth: '/ 月',
    billing: 'Stripeで毎月請求。いつでも解約できます。',
    stripeLabel: 'Stripeによる決済',
    cta: 'ツールを開く',
  },
  faq: {
    title: ['SynthID除去の', 'よくある質問。'],
    items: [
      {
        q: 'SynthID除去ツールとは何ですか？',
        a: 'SynthIDは、GoogleのAIモデルで作成された画像や動画に埋め込まれる見えない透かしです。SynthID除去ツールはピクセルをわずかに変えてそのパターンを崩します。{site}は写真をリサンプリングしてシャープ処理し、動画を高画質で再エンコードするため、見た目は変わりません。',
      },
      {
        q: 'AI動画からSynthIDを除去するには?',
        a: 'SynthID除去ツールを開き、動画を追加し、SynthID除去をオンのままサーバーを選びます。{site}がメタデータを削除し、透かしを弱める小さなピクセル変更を加えて動画を高画質で再エンコードし、クリーンなMP4をダウンロードできるようにします。Google VeoやGeminiの動画にはSynthIDが入っています。同じ手順でほかの生成ツールのメタデータも削除できます。',
      },
      {
        q: 'どのAI生成ツールに対応していますか?',
        a: 'すべてに対応します。Google Veo、Gemini、Imagenの動画や写真にはSynthID透かしが入っています。Sora、ChatGPTなど多くのツールのファイルにはメタデータにC2PA Content Credentialsが入っています。HiggsfieldはVeoを含む複数のモデルを使うため、どちらも入っている可能性があります。{site}はすべてのメタデータを削除し、SynthIDがあれば乱します。目に見える透かしやロゴは削除しません。',
      },
      {
        q: 'TikTokなどのプラットフォームで、まだAIと表示されますか?',
        a: '表示される可能性はあります。TikTokなど一部のプラットフォームはC2PA Content Credentialsを読んでAIコンテンツを表示しますが、{site}はそれを削除します。ただしプラットフォームは透かし検出器、独自の分類器、開示ルールも使うことがあり、出力がどう表示されるかは検証していません。{site}は、ファイルが検出や表示を免れることを保証しません。AI生成コンテンツの開示については各プラットフォームのルールに従ってください。',
      },
      {
        q: 'SynthIDは必ず除去できますか？',
        a: 'いいえ。SynthIDは編集に耐えるよう作られており、検出器も日々変わっています。{site}は透かしを崩しますが、検出器に見つかる可能性はあります。',
      },
      {
        q: 'メタデータ削除ツールは何を削除しますか？',
        a: '写真からは、EXIF（カメラ、シリアル番号、日時、GPS）、XMP、IPTC、ICCプロファイル、C2PAコンテンツ認証情報、メーカーノート、埋め込みサムネイル、コメントを削除します。動画からは、グローバル・ストリーム・チャプターのタグ、GPS・テレメトリートラック、タイムコード、カバー画像、C2PAボックス、エンコーダー情報を削除します。各ファイルに削除した内容の一覧が表示されます。',
      },
      {
        q: 'ファイルはアップロードされますか？',
        a: '「サーバー」を選んだ場合のみです。サーバーモードではファイルをアップロードしてクリーンにし、すぐに削除します。「この端末」モードではファイルはブラウザ内に残ります。端末内では写真はロスレスでクリーンにし、動画はリマックスします。端末内でのSynthID除去は写真のみ対応です。',
      },
      {
        q: '対応している形式は？',
        a: '写真：JPEG、PNG、WebP、HEIC/HEIF、AVIF、TIFF、GIF（HEICはJPEGで保存）。動画：MP4、MOV、M4V、MKV、WebM、AVI、MTS/M2TS、TS、3GP、WMV、FLV。',
      },
      {
        q: '画質は落ちますか？',
        a: 'メタデータの削除では動画ストリームを再エンコードせずにコピーし、写真は高画質で保存します。SynthID除去はピクセルを変える必要があるためバイト単位では同一になりませんが、通常の視聴で違いはわかりません。',
      },
      {
        q: 'SynthID透かしを除去するのは合法ですか？',
        a: 'お住まいの地域やファイルの使い方によって異なります。自分が所有する、または使用許可のあるコンテンツだけを処理し、法律やプラットフォームが求める場合はAI生成コンテンツであることを表示してください。',
      },
    ],
  },
  downloaderFaq: {
    title: ['ダウンローダーの', 'よくある質問。'],
    items: [
      {
        q: 'YouTubeの動画をダウンロードするには？',
        a: 'YouTubeダウンローダーを開き、動画またはショートのリンクを貼り付けて「ダウンロード」を押します。最大1080pのMP4で保存でき、「音声のみ」を選べばM4Aファイルになります。複数のリンクをまとめて貼り付けることもできます。',
      },
      {
        q: 'X（Twitter）の動画をダウンロードするには？',
        a: '投稿のリンク（x.comまたはtwitter.com）をコピーしてXダウンローダーに貼り付けます。その投稿の動画がMP4で保存されます。',
      },
      {
        q: 'TikTokダウンローダーは短縮リンクに対応していますか？',
        a: 'はい。tiktok.comのリンク、またはvm.tiktok.com / vt.tiktok.comの短縮リンクを貼り付けると、動画をMP4、サウンドをM4Aで保存できます。',
      },
      {
        q: 'InstagramやXのリンクで失敗するのはなぜですか？',
        a: '非公開の投稿や一部の公開投稿には、ログイン済みのセッションが必要です。投稿が非公開の場合やプラットフォームがログインを求める場合は、その旨のメッセージとともにダウンロードが失敗します。',
      },
      {
        q: '音声だけをダウンロードできますか？',
        a: 'はい。どのダウンローダーにも「動画 / 音声のみ」のスイッチがあります。「音声のみ」ではM4Aファイルになります。',
      },
      {
        q: 'ダウンロードした動画は保存されますか？',
        a: 'いいえ。各動画はサーバーで取得してお届けしたあと、すぐに削除されます。',
      },
      {
        q: '動画をダウンロードするのは合法ですか？',
        a: '自分が所有する、または使用許可のある動画だけをダウンロードしてください。ダウンロードはプラットフォームの利用規約に反する場合があり、著作権のルールはお住まいの地域によって異なります。',
      },
    ],
  },
  footer: {
    tagline: 'SynthID除去、メタデータ削除、YouTube・X・TikTok・Instagramのダウンローダー。',
    open: 'ツールを開く',
    disclaimer:
      '自分が所有する、または使用許可のあるコンテンツだけを処理・ダウンロードし、規則で求められる場合はAI生成コンテンツであることを表示してください。{site}はGoogle、YouTube、TikTok、X、Instagramとは提携していません。',
    badges: '掲載メディア',
  },
  jsonLd: {
    name: '{site}：SynthIDとメタデータの削除ツール',
    alternateName: ['SynthID除去', 'メタデータ削除', 'YouTubeダウンローダー', 'X動画ダウンローダー', 'TikTokダウンローダー', 'Instagramダウンローダー'],
    browserRequirements: 'JavaScriptが有効な最新のブラウザが必要です。',
    operatingSystem: '任意（Webブラウザ）',
    description:
      '写真や動画からEXIF・GPS・XMP・IPTC・C2PAのメタデータを削除し、SynthID透かしを崩します。サーバー上でも端末上でも処理できます。YouTube・TikTok・X・Instagramのダウンローダーも搭載。',
    featureList: [
      '写真と動画のSynthID除去',
      'EXIF・GPS・XMP・IPTC・ICC・C2PAのメタデータ削除',
      '端末内での処理に対応',
      'YouTubeダウンローダー（最大1080pのMP4またはM4A音声）',
      'TikTokダウンローダー',
      'XとInstagramの動画ダウンローダー',
    ],
  },
};
