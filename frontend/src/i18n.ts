export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale =
  (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale) || "vi";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
