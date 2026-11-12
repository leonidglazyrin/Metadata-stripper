// Shapes of the content-page translations (guides, guides index, shared page
// chrome and the plans promo). English guide text lives in ../guides.ts; the
// page chrome in ./en.ts. Each other language has one file here.

import type { Guide } from '../guides';

/** The translatable part of a guide. Everything else (slug, tool, related…) comes from guides.ts. */
export type GuideText = Pick<Guide, 'title' | 'metaTitle' | 'description' | 'short' | 'cta' | 'intro' | 'steps' | 'sections' | 'faq'> & {
  stepsTitle?: string;
};

type Pair = [string, string];

export type PagesUi = {
  /** BCP 47 locale for dates, e.g. "es-ES". */
  locale: string;
  kind: Record<Guide['kind'], string>;
  /** "Step by step with {site}". */
  stepsTitle: string;
  questions: string;
  related: string;
  contents: string;
  /** "Updated" before the date. */
  updated: string;
  home: string;
  guides: string;
  pricing: string;
  openTools: string;
  navLabel: string;
  breadcrumb: string;
  language: string;
  footer: {
    tagline: string;
    open: string;
    synthidGuides: string;
    privacyGuides: string;
    downloadGuides: string;
    allGuides: string;
    privacyPolicy: string;
    terms: string;
    disclaimer: string;
  };
  index: {
    metaTitle: string;
    description: string;
    title: Pair;
    lede: string;
    groups: Record<Guide['kind'], { title: string; text: string }>;
  };
  /** The plans promo shown on every content page. */
  promo: {
    eyebrow: string;
    title: Pair;
    text: string;
    /** "or {price} / year" under a monthly price. */
    orYearly: string;
    seePlans: string;
  };
};

export type PagesTranslation = {
  ui: PagesUi;
  guides: Record<string, GuideText>;
};
