import type { PagesUi } from './types';

// English chrome for the guides, the guides index and the legal pages.
export const en: PagesUi = {
  locale: 'en-US',
  kind: { synthid: 'SynthID guide', privacy: 'Privacy guide', download: 'Download guide' },
  stepsTitle: 'Step by step with {site}',
  questions: 'Questions',
  related: 'Related guides',
  contents: 'On this page',
  updated: 'Updated',
  home: 'Home',
  guides: 'Guides',
  pricing: 'Pricing',
  openTools: 'Open tools',
  navLabel: 'Main',
  breadcrumb: 'Breadcrumb',
  language: 'Language',
  footer: {
    tagline: 'Metadata, C2PA and SynthID remover, plus YouTube, TikTok, X and Instagram downloaders.',
    open: 'Open the tools',
    synthidGuides: 'SynthID guides',
    privacyGuides: 'Privacy guides',
    downloadGuides: 'Download guides',
    allGuides: 'All guides',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer:
      'Only process and download content you own or have permission to use, and label AI-generated content where the rules require it. {site} is not affiliated with Google, YouTube, TikTok, X, Instagram or Meta.',
  },
  index: {
    metaTitle: 'Guides: SynthID, Metadata & Video Downloads',
    description:
      'Guides to SynthID and AI watermarks, removing GPS, EXIF and C2PA data from photos and videos, and downloading YouTube, TikTok, X and Instagram videos.',
    title: ['{site}', 'guides.'],
    lede: 'Step-by-step guides for cleaning metadata out of your files and downloading videos, with the built-in options on your phone or computer and the {site} tools.',
    groups: {
      synthid: {
        title: 'SynthID and AI watermarks',
        text: 'What Google’s invisible SynthID watermark is, and how to weaken it and clear the metadata on images and videos from Veo, Gemini and Imagen, so platforms stop flagging them as AI.',
      },
      privacy: {
        title: 'Privacy and metadata',
        text: 'Remove the hidden data in photos and videos: location, device details, dates, editing history and C2PA Content Credentials.',
      },
      download: {
        title: 'Video downloads',
        text: 'Save public videos from YouTube, TikTok, X and Instagram as MP4, or keep only the sound as M4A.',
      },
    },
  },
  promo: {
    eyebrow: 'Plans',
    title: ['Clean every file.', 'Start for $2.'],
    text: 'Your first strips and downloads are free. After that, try 10 SynthID strips for $2, or go unlimited with Basic or Pro.',
    orYearly: 'or {price} / year',
    seePlans: 'Compare all plans',
    download: {
      badge: 'Unlimited downloads',
      title: ['Download without limits.', 'Go Pro.'],
      text: 'Your first video download is free. Downloads run on our server, so after that they need Pro: unlimited downloads from YouTube, X, TikTok and Instagram, plus faster stripping.',
      cardText: 'Unlimited video downloads from YouTube, X, TikTok and Instagram, plus server stripping about 4x faster. Cancel anytime.',
      cta: 'Get unlimited downloads',
    },
  },
};
