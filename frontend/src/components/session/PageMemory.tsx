"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { type Locale, isValidLocale, locales } from "../../i18n";
import { setBrowserCookie } from "../../lib/browserCookies";
import { LAST_LOCALE_COOKIE, LAST_PATH_COOKIE } from "../../lib/sessionCookies";

interface PageMemoryProps {
  locale: Locale;
}

const isRememberablePath = (path: string): boolean =>
  locales.some((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)) &&
  !path.startsWith("/api") &&
  !path.includes("/_next") &&
  !path.includes(".");

export function PageMemory({ locale }: PageMemoryProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isValidLocale(locale) || !pathname || !isRememberablePath(pathname)) return;

    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    setBrowserCookie(LAST_LOCALE_COOKIE, locale);
    setBrowserCookie(LAST_PATH_COOKIE, path);
  }, [locale, pathname, searchParams]);

  return null;
}
