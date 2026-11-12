// Content pages in every language of the landing page. English lives at
// /guides/…, other languages at /<code>/guides/… (same slugs), and every
// version lists the others as hreflang alternates.
//
// To translate a new guide, add its slug to each language file's `guides`.
// A guide a language leaves out simply has no page in that language (no
// half-English pages), and the alternates only list the versions that exist.

import { DEFAULT_LANG, LANGS } from '../../landing/i18n';
import { GUIDES, type Guide } from '../guides';
import { en } from './en';
import type { GuideText, PagesTranslation, PagesUi } from './types';
import { es } from './es';
import { pt } from './pt';
import { fr } from './fr';
import { de } from './de';
import { ru } from './ru';
import { ja } from './ja';
import { ko } from './ko';
import { tr } from './tr';
import { id } from './id';

export type { GuideText, PagesUi };

const TRANSLATIONS: Record<string, PagesTranslation> = { es, pt, fr, de, ru, ja, ko, tr, id };

/** Path prefix for a language: "" for English, "/es" for Spanish. */
export const langPrefix = (lang: string) => (lang === DEFAULT_LANG ? '' : `/${lang}`);

export function pagesUi(lang: string): PagesUi {
  return lang === DEFAULT_LANG ? en : TRANSLATIONS[lang]?.ui ?? en;
}

/** A guide in one language, or undefined when it has not been translated. */
export function localGuide(g: Guide, lang: string): Guide | undefined {
  if (lang === DEFAULT_LANG) return g;
  const t: GuideText | undefined = TRANSLATIONS[lang]?.guides[g.slug];
  return t ? { ...g, ...t } : undefined;
}

/** The guides that exist in a language, in site order. */
export const guidesIn = (lang: string) => GUIDES.map((g) => localGuide(g, lang)).filter((g): g is Guide => Boolean(g));

/** Languages that have a version of this guide. */
export const guideLangs = (g: Guide) => LANGS.map((l) => l.code).filter((code) => localGuide(g, code));

/** Languages with translated content pages (the guides index exists in these). */
export const PAGE_LANGS = LANGS.map((l) => l.code).filter((code) => code === DEFAULT_LANG || TRANSLATIONS[code]);
