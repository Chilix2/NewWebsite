import { NextResponse } from "next/server";
const locales = ["de", "en", "tr", "es", "ar", "zh", "ru", "pl", "fr", "el", "ko", "vi", "th"];
const defaultLocale = "de";
const LOCALE_COOKIE = "NEXT_LOCALE";
function getLocale(request) {
    // 1. Check for existing cookie first
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }
    // 2. Fall back to Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (!acceptLanguage)
        return defaultLocale;
    const lang = acceptLanguage.toLowerCase();
    for (const locale of locales) {
        if (lang.includes(locale))
            return locale;
    }
    return defaultLocale;
}
export function middleware(request) {
    const { pathname } = request.nextUrl;
    // Check if pathname already has locale
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    if (pathnameHasLocale)
        return NextResponse.next();
    // Determine locale (respects cookie preference)
    const locale = getLocale(request);
    // Construct new URL
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    // Preserve query parameters
    newUrl.search = request.nextUrl.search;
    // Create redirect response and set locale cookie
    const response = NextResponse.redirect(newUrl);
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
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|manifest.json|google[a-f0-9]+\\.html|bing[a-f0-9]+\\.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot|otf|mp3|wav|m4a|ico|json)$).*)",
    ],
};
