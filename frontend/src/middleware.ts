import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n";
import { LAST_LOCALE_COOKIE, LAST_PATH_COOKIE } from "./lib/sessionCookies";

const isLocalePath = (path: string): boolean =>
  locales.some((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`));

const getCookieLocale = (request: NextRequest) => {
  const locale = request.cookies.get(LAST_LOCALE_COOKIE)?.value;
  return locales.includes(locale as (typeof locales)[number])
    ? (locale as (typeof locales)[number])
    : defaultLocale;
};

const getRememberedPath = (request: NextRequest): string | null => {
  const raw = request.cookies.get(LAST_PATH_COOKIE)?.value;
  if (!raw) return null;

  try {
    const path = decodeURIComponent(raw);
    const [pathname] = path.split("?");
    if (!isLocalePath(pathname)) return null;
    if (pathname.includes(".") || pathname.includes("//") || pathname.includes("\\")) return null;
    return path;
  } catch {
    return null;
  }
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!isLocalePath(pathname)) {
    const rememberedPath = pathname === "/" ? getRememberedPath(request) : null;
    if (rememberedPath) {
      return NextResponse.redirect(new URL(rememberedPath, request.url));
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${getCookieLocale(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
