import { defaultLocale, type Locale } from '../i18n';

export const normalizeLocalePath = (path: string | null): string =>
  path?.replace(/^\/(vi|en)(?=\/|$)/, '') || '/';

export const getLocaleFromPath = (path: string | null): Locale => {
  const match = path?.match(/^\/(vi|en)(?=\/|$)/);
  return (match?.[1] as Locale | undefined) ?? defaultLocale;
};
