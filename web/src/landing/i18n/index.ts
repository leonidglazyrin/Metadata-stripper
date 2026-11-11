// Languages of the landing page. Each one is a prerendered static page at its
// own path (English at /, the rest at /<code>/) so search engines can index
// them separately; the pages link to each other with hreflang alternates.
//
// To add a language: copy es.ts to <code>.ts, translate the strings, and add
// one line to LANGS below. Any string a dictionary leaves out falls back to
// English, so a new English string never breaks the build (lists such as the
// FAQ are replaced whole, not merged item by item).

import { en, type Dict, type Translation } from './en';
import { es } from './es';
import { pt } from './pt';
import { fr } from './fr';
import { de } from './de';
import { ru } from './ru';
import { ja } from './ja';
import { ko } from './ko';
import { tr } from './tr';
import { id } from './id';

export type { Dict, Translation };

export type Lang = {
  /** Path segment and hreflang code. */
  code: string;
  /** Name shown in the language switcher, in that language. */
  name: string;
  /** og:locale value. */
  ogLocale: string;
  dict: Translation;
};

export const LANGS: Lang[] = [
  { code: 'en', name: 'English', ogLocale: 'en_US', dict: en },
  { code: 'es', name: 'Español', ogLocale: 'es_ES', dict: es },
  { code: 'pt', name: 'Português', ogLocale: 'pt_BR', dict: pt },
  { code: 'fr', name: 'Français', ogLocale: 'fr_FR', dict: fr },
  { code: 'de', name: 'Deutsch', ogLocale: 'de_DE', dict: de },
  { code: 'ru', name: 'Русский', ogLocale: 'ru_RU', dict: ru },
  { code: 'ja', name: '日本語', ogLocale: 'ja_JP', dict: ja },
  { code: 'ko', name: '한국어', ogLocale: 'ko_KR', dict: ko },
  { code: 'tr', name: 'Türkçe', ogLocale: 'tr_TR', dict: tr },
  { code: 'id', name: 'Bahasa Indonesia', ogLocale: 'id_ID', dict: id },
];

export const DEFAULT_LANG = 'en';

/** The page path for a language: "/" for English, "/es/" for Spanish. */
export const langPath = (code: string) => (code === DEFAULT_LANG ? '/' : `/${code}/`);

export function getLang(code: string): Lang {
  const lang = LANGS.find((l) => l.code === code);
  if (!lang) throw new Error(`Unknown landing language: ${code}`);
  return lang;
}

/** The full dictionary for a language, with English filling any gaps. */
export function getDict(code: string): Dict {
  return merge(en, getLang(code).dict) as Dict;
}

function merge(base: unknown, over: unknown): unknown {
  if (over === undefined) return base;
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return over;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
  return out;
}
