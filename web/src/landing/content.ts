// Values shared by every language of the landing page. The translated copy
// lives in ./i18n (one dictionary per language); {site} and {price} in those
// strings are filled in from here.

export const SITE_NAME = 'Sharona';

/** Monthly prices of the two plans and the strip pack, shown in the pricing section of every language. */
export const PRICES = { basic: '$10', pro: '$20', pack: '$2' } as const;

/** Yearly prices of the two plans (two months free). */
export const YEARLY_PRICES = { basic: '$100', pro: '$200' } as const;

/** The top plan's price ({price} in the dictionaries). */
export const PRICE = PRICES.pro;

/** AI generators people commonly bring files from. Shown as tags on the page. */
export const AI_SOURCES = ['Google Veo', 'Gemini', 'Imagen', 'Sora', 'ChatGPT', 'Higgsfield', 'Kling', 'Runway', 'Midjourney'];
