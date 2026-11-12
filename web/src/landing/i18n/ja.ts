import type { Translation } from './en';

export const ja: Translation = {
  meta: {
    title: 'AI画像・動画からSynthIDとC2PAを削除 · {site}',
    description:
      'Google Veo、Gemini、Sora、ChatGPT、Higgsfieldで作ったAI画像や動画から、C2PA Content Credentialsとメタデータを削除し、SynthID透かしを崩します。EXIF・GPS・XMPも削除。YouTube・X・TikTok・Instagramのダウンローダーも。',
    ogDescription:
      'Veo、Gemini、Sora、ChatGPT、HiggsfieldのAI動画や写真から、SynthIDと隠れたメタデータを削除。サーバーでも端末内でも処理できます。',
    twitterDescription:
      'Veo、Gemini、Sora、ChatGPT、HiggsfieldのAI動画や写真から、SynthIDと隠れたメタデータを削除。',
    ogImageAlt: '{site}：SynthIDとメタデータの除去ツール',
  },
  nav: {
    label: 'メイン',
    home: '{site} ホーム',
    synthid: 'SynthID',
    detection: 'AIラベル',
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
    eyebrow: 'SynthID・C2PA・メタデータ除去',
    title: ['画像や動画が', 'AI判定されるのを防ぐ。'],
    lede:
      'TikTokやInstagramなどは、AIファイルに隠れたC2PA Content CredentialsとSynthID透かしを読み取り、投稿に「AI生成」ラベルを付けます。Google Veo、Gemini、Sora、ChatGPT、Higgsfieldの写真や動画をドロップすれば、C2PAとすべてのメタデータタグ（EXIF・GPS・XMP）を削除し、SynthID透かしを崩したきれいなコピーをダウンロードできます。処理はサーバー上でもブラウザ内でも可能です。',
    ctaStrip: 'ファイルを処理',
    ctaDownload: '動画を保存',
    toolsLabel: 'ツール',
    chipStrip: 'SynthIDとメタデータ',
  },
  detection: {
    title: ['自動の「AI生成」ラベルを', '付けさせない。'],
    lede:
      'プラットフォームはアップロードのたびにC2PA Content Credentialsと透かしを調べます。見つかると、オフにできないAIラベルが付きます。先に削除しておけば、表示するかどうかは自分で決められます。',
    beforeTitle: 'メタデータが残ったまま',
    beforeText:
      'TikTokがContent Credentialsを読み取り、AIラベルを自動でオンにしました。グレー表示で、オフにはできません。',
    afterTitle: '{site}でクリーンにした後',
    afterText:
      'プラットフォームが見つけるものがないので、ラベルは任意に戻ります。表示するかどうかはあなた次第です。',
    detectedTag: '自動でラベル付け',
    cleanTag: 'あなたが選べる',
    note:
      'プラットフォームは独自の分類器も使っているため、それでもラベルが付くことがあります。{site}は削除できるシグナルを削除しますが、ラベルが付かないとは約束できません。各プラットフォームのAI開示ルールに従ってください。',
    shotDetectedAlt:
      'TikTokの「AI生成コンテンツ」スイッチがオンでロックされ、「TikTokが投稿内のコンテンツの編集または生成にAIが使われたことを検出したため、このラベルを追加しました」と表示されている画面',
    shotOptionalAlt:
      'TikTokの「AI生成コンテンツ」スイッチがオフで任意になり、「コンテンツがAIで生成または編集されたことを視聴者に伝えるには、このラベルを追加してください」と表示されている画面',
  },
  synthid: {
    title: ['見た目はそのまま、', 'AI動画からSynthIDを除去。'],
    lede:
      'SynthIDは、GoogleがVeo、Gemini、Imagenで作った画像や動画のピクセルに埋め込む見えない透かしです。{site}はピクセルをわずかに変えてパターンを弱めます。見た目も再生もそのままです。',
    sourcesTitle: '対応する生成元',
    sourcesLabel: 'AI生成ツール',
    reencode: {
      caption: 'ほぼ劣化のないリサンプリング、わずかなノイズ、新しい再エンコードで、すべてのピクセルが動きます。見た目は同じでも、見えない透かしの格子は残りません。',
      before: 'AIのフレーム・透かし入り',
      after: '再エンコード後・透かしが崩れる',
    },
    photos: { title: '写真', text: 'わずかなリサンプリング、ごく少量のノイズ、シャープ処理ですべてのピクセルを変え、高画質で保存し直します。' },
    videos: { title: '動画', text: '高画質の再エンコード（CRF 18）に、軽いぼかし、それを打ち消すシャープ処理、フレーム間のわずかなノイズを加えます。' },
    caveat: {
      title: '保証はありません',
      text: 'SynthIDは編集に耐えるよう作られているため、検出されないと約束できるツールはありません。{site}は透かしを弱めますが、完全に消えたことも、プラットフォームがAIとラベル付けしないことも保証できません。',
    },
    cta: 'SynthID除去ツールを開く',
    learnMore: 'SynthIDとは？',
  },
  metadata: {
    title: ['写真と動画の', 'メタデータ除去。'],
    lede:
      '写真や動画には、撮影場所、端末、シリアル番号、編集履歴が記録されています。メタデータ除去ツールはそれをすべて削除し、SynthID透かしも除去して、削除した内容を一覧表示します。',
    synthidTag: 'SynthID透かし',
    photosTitle: '写真から削除',
    photoTags: ['EXIF', 'GPS位置情報', 'XMP', 'IPTC', 'ICCプロファイル', 'C2PA / Content Credentials', 'メーカーノート', 'サムネイル', 'テキストコメント'],
    photoFormats: 'JPEG、PNG、WebP、HEIC/HEIF、AVIF、TIFF、GIF。HEICはJPEGで返します。',
    videosTitle: '動画から削除',
    videoTags: ['グローバル・ストリームタグ', 'チャプタータグ', 'GPS・テレメトリートラック', 'タイムコード', 'カバー画像', 'C2PAボックス', 'エンコーダー情報'],
    videoFormats: 'MP4、MOV、M4V、MKV、WebM、AVI、MTS/M2TS、TS、3GP、WMV、FLV。ストリームは再エンコードせずにコピーします。',
  },
  downloaders: {
    label: '動画ダウンローダー',
    youtube: {
      title: ['YouTube', 'ダウンローダー'],
      text: 'YouTubeの動画やショートのリンクを貼り付けてください。最大1080pのMP4、または音声をM4Aで取得できます。',
      cta: 'YouTubeダウンローダーを開く',
    },
    x: {
      title: ['X', 'ダウンローダー'],
      text: 'x.comまたはtwitter.comのポストのリンクを貼り付けると、そのポストの動画をMP4で取得できます。',
      cta: 'Xダウンローダーを開く',
    },
    tiktok: {
      title: ['TikTok', 'ダウンローダー'],
      text: 'vm.やvt.の短縮リンクを含むtiktok.comのリンクを貼り付けてください。動画はMP4、音声はM4Aで取得できます。',
      cta: 'TikTokダウンローダーを開く',
    },
    instagram: {
      title: ['Instagram', 'ダウンローダー'],
      text: '公開されているリールや動画投稿のリンクを貼り付けてください。非公開の動画は取得できません。',
      cta: 'Instagramダウンローダーを開く',
    },
  },
  how: {
    title: ['SynthIDとメタデータを', '削除する方法。'],
    steps: [
      ['ファイルをアップロード。', 'AIの動画や写真をいくつでも。サーバーでもこのデバイスでも。'],
      ['{site}が処理。', 'EXIF・GPS・C2PAタグを削除し、SynthID透かしを弱めます。'],
      ['きれいなコピーをダウンロード。', 'ファイルごとに削除した内容が表示されます。'],
    ],
    flow: {
      uploading: 'アップロード中…',
      stripping: 'メタデータを削除中 · SynthIDを弱めています…',
      clean: '完了 · 4項目を削除',
      download: 'ダウンロード',
    },
    cta: 'SynthID除去ツールを開く',
  },
  pricing: {
    title: ['2つのプラン。', '無料で始めよう。'],
    perMonth: '/ 月',
    perYear: '/ 年',
    monthly: '月払い',
    yearly: '年払い',
    yearlySave: '2か月分お得',
    free: 'すべてのアカウントに、端末での除去1回、サーバーでの除去1回、動画ダウンロード1回が無料で付きます。無料のサーバー除去とダウンロードには、全員共通で1日あたりの上限があります。',
    basic: {
      name: 'Basic',
      /** Shown with a yellow minus: Basic has no downloads. */
      missing: 'YouTube、X、TikTok、Instagramの動画ダウンロードは含まれません(Proのみ)',
      features: [
        '端末での除去が無制限',
        'ファイルは端末の外に出ません',
        'メタデータとC2PAを削除',
        'SynthID除去を利用可能（ブラウザの性能に左右されるため低速です。こちらで遅くしているわけではありません）',
      ],
    },
    pro: {
      name: 'Pro',
      badge: '最速',
      features: [
        'Basicのすべて',
        'サーバーでの除去が無制限、約4倍高速',
        'YouTube・X・TikTok・Instagramの動画ダウンロードが無制限',
      ],
    },
    pack: {
      name: '除去パック',
      badge: '$2でお試し',
      once: '買い切り',
      text: 'SynthID除去10回が$2。端末上で処理し、メタデータも削除します。サブスクリプションなし：一度払えば、いつでも買い足せて回数は加算されます。',
      cta: '$2でお試し',
    },
    billing: 'プランは月払いまたは年払いです。いつでも解約・プラン変更できます。除去パックは1回限りの支払いです。',
    stripeLabel: 'Stripeによる安全な決済',
    cta: 'ツールを開く',
  },
  faq: {
    title: ['SynthID除去の', 'よくある質問。'],
    items: [
      {
        q: 'SynthID除去ツールとは？',
        a: 'SynthIDは、GoogleがAIモデルで作った画像や動画に入れる見えない透かしです。SynthID除去ツールはピクセルをわずかに変えてそのパターンを崩します。{site}は写真をリサンプリングしてシャープ処理し、動画を高画質で再エンコードするので、見た目は変わりません。',
      },
      {
        q: 'AI動画からSynthIDを除去するには？',
        a: 'SynthID除去ツールを開いて動画を追加し、SynthID除去をオンのまま（初期設定でオン）にして「サーバー」を選びます。{site}はメタデータを削除し、透かしを弱める小さなピクセル変更を加えて高画質で再エンコードし、きれいなMP4を返します。Google VeoとGeminiの動画にはSynthIDが入っています。同じ手順で他の生成ツールのメタデータも消せます。',
      },
      {
        q: 'どのAI生成ツールに対応していますか？',
        a: 'すべてに対応しています。Google Veo、Gemini、Imagenの動画や写真にはSynthID透かしが入っています。Sora、ChatGPTなど多くのツールのファイルには、メタデータにC2PA Content Credentialsが入っています。HiggsfieldはVeoを含む複数のモデルを使うため、どちらも入りえます。{site}はすべてのメタデータを削除し、SynthIDがあれば崩します。目に見える透かしやロゴは消しません。',
      },
      {
        q: 'TikTokなどはまだ私の動画にAIラベルを付けますか？',
        a: '付く可能性はあります。TikTokなど一部のプラットフォームはC2PA Content Credentialsを読んでAIコンテンツにラベルを付けており、{site}はそれを削除します。ただしプラットフォームは透かし検出器、独自の分類器、開示ルールも使うことがあり、出力にどうラベルが付くかは検証していません。{site}は、ファイルが検出されない、またはラベルが付かないことを保証しません。AI生成コンテンツの開示に関する各プラットフォームのルールに従ってください。',
      },
      {
        q: 'SynthID除去は必ず成功しますか？',
        a: 'いいえ。SynthIDは編集に耐えるよう作られており、検出器も変わり続けています。{site}は透かしを崩しますが、それでも検出器に見つかることがあります。',
      },
      {
        q: '処理後も画像がAIと判定されるのはなぜ？',
        a: '画像用のSynthIDは、サイズ変更や保存し直しに耐えるよう作られたピクセル単位の透かしなので、難しいケースでは検出器が反応することがあります。{site}は画像をリサンプリングし、わずかなノイズを加えて再エンコードし、見た目を変えない範囲でできる限りパターンを弱めます。それでも判定されるのは透かしが粘っているためで、メタデータのせいではありません。EXIF、XMP、C2PA Content Credentialsは完全に削除されています。どの検出器もすり抜けられるとは保証しません。',
      },
      {
        q: 'メタデータ除去ツールは何を削除しますか？',
        a: '写真からは、EXIF（カメラ、シリアル番号、時刻、GPS）、XMP、IPTC、ICCプロファイル、C2PA Content Credentials、メーカーノート、埋め込みサムネイル、コメント。動画からは、グローバル・ストリーム・チャプタータグ、GPS・テレメトリートラック、タイムコード、カバー画像、C2PAボックス、エンコーダー情報。ファイルごとに削除した内容が一覧表示されます。',
      },
      {
        q: 'ファイルはアップロードされますか？',
        a: '「サーバー」を選んだ場合だけです。サーバーモードではファイルをアップロードし、処理後すぐに削除します。「このデバイス」モードではファイルはブラウザ内に留まり、こちらには何も送られません。メタデータは常に削除されます。SynthID除去は初期設定でオンのスイッチで、端末では再エンコードをブラウザ内で行うため、動画はサーバーより時間がかかります。',
      },
      {
        q: '対応形式は？',
        a: '写真：JPEG、PNG、WebP、HEIC/HEIF、AVIF、TIFF、GIF（HEICはJPEGで保存）。動画：MP4、MOV、M4V、MKV、WebM、AVI、MTS/M2TS、TS、3GP、WMV、FLV。',
      },
      {
        q: '処理すると画質は落ちますか？',
        a: 'メタデータの削除では動画ストリームを再エンコードせずにコピーし、写真は高画質で保存します。SynthID除去はピクセルを変える必要があるためバイト単位では同一になりませんが、普通に見る限り違いは分かりません。',
      },
      {
        q: 'SynthID透かしを除去するのは合法ですか？',
        a: 'お住まいの地域とファイルの使い方によります。処理するのは自分のコンテンツか使用許可を得たコンテンツだけにし、法律やプラットフォームが求める場合はAI生成コンテンツであることを表示してください。',
      },
    ],
  },
  downloaderFaq: {
    title: ['ダウンローダーの', 'よくある質問。'],
    items: [
      {
        q: 'YouTubeの動画をダウンロードするには？',
        a: 'YouTubeダウンローダーを開き、動画やショートのリンクを貼り付けて「ダウンロード」を押します。最大1080pのMP4、または「音声のみ」でM4Aファイルを取得できます。複数のリンクをまとめて貼ることもできます。',
      },
      {
        q: 'X（Twitter）の動画をダウンロードするには？',
        a: 'ポストのリンク（x.comまたはtwitter.com）をコピーしてXダウンローダーに貼り付けます。そのポストの動画をMP4で取得できます。',
      },
      {
        q: 'TikTokダウンローダーは短縮リンクに対応していますか？',
        a: 'はい。tiktok.comのリンク、またはvm.tiktok.com / vt.tiktok.comの短縮リンクを貼り付ければ、動画をMP4で、音声をM4Aで取得できます。',
      },
      {
        q: 'InstagramやXのリンクが失敗するのはなぜ？',
        a: 'ダウンロードできるのは公開動画だけです。非公開の動画はダウンロードツールでは取得できず、プラットフォームがログインを求める場合は、その旨のメッセージとともに失敗します。',
      },
      {
        q: '音声だけをダウンロードできますか？',
        a: 'はい。どのダウンローダーにも「動画 / 音声のみ」のスイッチがあります。「音声のみ」ではM4Aファイルを取得できます。',
      },
      {
        q: 'ダウンロードした動画は保存されますか？',
        a: 'いいえ。動画はサーバーで取得してお届けし、その直後に削除します。',
      },
      {
        q: '動画のダウンロードは合法ですか？',
        a: 'ダウンロードするのは、自分の動画か使用許可を得た動画だけにしてください。ダウンロードはプラットフォームの利用規約に反することがあり、著作権のルールは国によって異なります。',
      },
    ],
  },
  footer: {
    tagline: 'SynthID除去、メタデータ除去、YouTube・X・TikTok・Instagramのダウンローダー。',
    open: 'ツールを開く',
    disclaimer:
      '処理やダウンロードは、自分のコンテンツか使用許可を得たコンテンツだけにしてください。規則で求められる場合はAI生成コンテンツであることを表示してください。{site}はGoogle、YouTube、TikTok、X、Instagramと提携していません。',
    badges: '掲載メディア',
  },
  jsonLd: {
    name: '{site}：SynthID・メタデータ除去ツール',
    alternateName: ['SynthID除去', 'AI動画のSynthID除去', 'メタデータ除去', 'YouTubeダウンローダー', 'X動画ダウンローダー', 'TikTokダウンローダー', 'Instagramダウンローダー'],
    browserRequirements: 'JavaScriptが使える最新のブラウザが必要です。',
    operatingSystem: '任意（ウェブブラウザ）',
    description:
      'AI動画や写真（Google Veo、Gemini、Sora、ChatGPT、Higgsfieldなど）からEXIF・GPS・XMP・IPTC・C2PAメタデータを削除し、SynthID透かしを崩します。サーバーでも端末内でも処理できます。結果は保証されません。YouTube・TikTok・X・Instagramのダウンローダー付き。',
    keywords:
      'SynthID 削除, SynthID 除去, AI動画 SynthID 削除, AI 透かし 削除, C2PA 削除, メタデータ 削除, Veo, Gemini, Sora, ChatGPT, Higgsfield',
    featureList: [
      '写真と動画のSynthID除去',
      'EXIF・GPS・XMP・IPTC・ICC・C2PAのメタデータ除去',
      '端末内での処理に対応',
      'YouTubeダウンローダー（最大1080pのMP4またはM4A音声）',
      'TikTokダウンローダー',
      'X・Instagramの動画ダウンローダー',
    ],
  },
};
