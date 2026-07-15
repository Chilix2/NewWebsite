import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const locales = ["de", "en", "tr", "es", "ar", "zh", "ru", "pl", "fr", "el", "ko", "vi", "th"];
const defaultLocale = "de";
const LOCALE_COOKIE = "NEXT_LOCALE";

function getLocale(request: NextRequest) {
  // 1. Check for existing cookie first
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // 2. Fall back to Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;
  
  const lang = acceptLanguage.toLowerCase();
  for (const locale of locales) {
    if (lang.includes(locale)) return locale;
  }
  
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  // Keep the Supabase auth session fresh (no-op when Supabase env is absent).
  const { supabaseResponse } = await updateSession(request);

  const { pathname } = request.nextUrl;
  
  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return supabaseResponse;

  // Determine locale (respects cookie preference)
  const locale = getLocale(request);
  
  // Construct new URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Preserve query parameters
  newUrl.search = request.nextUrl.search;
  
  // Create redirect response, carry over refreshed auth cookies, set locale cookie
  const response = NextResponse.redirect(newUrl);
  supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: "/",
    sameSite: "lax",
  });
  
  return response;
}

export const config = {
  matcher: [
    // Skip internal Next.js paths, static assets, media files, and root-level special routes
    // Also skip search engine verification files (google*.html, bing*.html, etc)
    "/((?!api|auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|manifest.json|google[a-f0-9]+\\.html|bing[a-f0-9]+\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot|otf|mp3|wav|m4a|mp4|webm|ico|json)$).*)",
  ],
};
