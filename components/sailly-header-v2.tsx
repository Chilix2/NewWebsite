"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SaillyLogoLockup } from "./sailly-signal-logo";
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Building2,
  Stethoscope,
  Utensils,
  Scale,
  Briefcase,
} from "lucide-react";

interface NavProps {
  dict: any;
  locale: string;
}

export default function SaillyHeaderV2({ dict, locale }: NavProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuScrollY, setMenuScrollY] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [heroThreshold, setHeroThreshold] = useState(600);
  const lastScrollRef = useRef(0);

  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    const update = () => setHeroThreshold(window.innerHeight * 0.75);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Soft collapse: hide on scroll down, reappear on scroll up */
  useEffect(() => {
    if (!hasMounted) return;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollRef.current;

      setScrollY(y);
      setScrolled(y > 20);

      if (mobileMenuOpen) {
        lastScrollRef.current = y;
        return;
      }

      if (y < 48) {
        setHeaderVisible(true);
      } else if (delta > 6) {
        setHeaderVisible(false);
      } else if (delta < -6) {
        setHeaderVisible(true);
      }

      lastScrollRef.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMounted, mobileMenuOpen]);

  useEffect(() => {
    if (!hasMounted) return;
    if (mobileMenuOpen) {
      const currentScrollY = window.scrollY;
      setMenuScrollY(currentScrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (menuScrollY > 0) window.scrollTo(0, menuScrollY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, hasMounted, menuScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (openDropdown !== "solutions" && !langOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const el = target instanceof Element ? target : null;
      if (el?.closest("[data-header-dropdown]")) return;
      setOpenDropdown(null);
      setLangOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown, langOpen]);

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${31536000}; samesite=lax`;
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLocale;
      router.push(segments.join("/"), { scroll: false });
    }
  };

  const languages = [
    { code: "de", label: "Deutsch" },
    { code: "en", label: "English" },
    { code: "tr", label: "Türkçe" },
    { code: "es", label: "Español" },
    { code: "ar", label: "العربية" },
    { code: "zh", label: "中文" },
    { code: "ru", label: "Русский" },
    { code: "pl", label: "Polski" },
    { code: "fr", label: "Français" },
    { code: "el", label: "Ελληνικά" },
    { code: "ko", label: "한국어" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "th", label: "ไทย" },
  ];

  const solutionsNav = [
    { key: "hotels", icon: Building2, href: `/${locale}/loesungen/hotels` },
    { key: "medical", icon: Stethoscope, href: `/${locale}/loesungen/medical` },
    { key: "restaurants", icon: Utensils, href: `/${locale}/loesungen/restaurants` },
    { key: "legal", icon: Scale, href: `/${locale}/loesungen/legal` },
    { key: "services", icon: Briefcase, href: `/${locale}/loesungen/services` },
  ];

  const overlayMode =
    hasMounted &&
    isHome &&
    scrollY < heroThreshold &&
    !mobileMenuOpen &&
    !headerHovered &&
    openDropdown !== "solutions";

  const isSolutionsActive = solutionsNav.some((item) => pathname === item.href);

  if (!hasMounted) {
    return (
      <header className="fixed top-0 w-full z-[100] px-4 sm:px-6 py-4 bg-transparent">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <SaillyLogoLockup wordmarkClass="text-lg" animated={false} tone="light" />
          <div className="p-3 text-white/80">
            <Menu size={24} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-[100] px-4 sm:px-6 py-2 safe-area-top",
        "transition-[transform,background-color,box-shadow,border-color,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        headerVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none",
        overlayMode
          ? "bg-transparent border-b border-transparent shadow-none"
          : scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-white border-b border-transparent"
      )}
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => setHeaderHovered(false)}
    >
      {overlayMode && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/15 to-transparent pointer-events-none -z-10"
          aria-hidden="true"
        />
      )}

      <div className="max-w-5xl mx-auto flex items-center justify-between relative">
        <Link
          href={`/${locale}`}
          className="flex items-center relative z-50 group min-h-[44px]"
          data-testid="header-logo"
          aria-label="Sailly – Startseite"
        >
          <SaillyLogoLockup wordmarkClass="text-lg" tone={overlayMode ? "light" : "brand"} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href={`/${locale}/produkt`}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors",
              overlayMode
                ? pathname === `/${locale}/produkt`
                  ? "text-white bg-white/15"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                : pathname === `/${locale}/produkt`
                  ? "text-primary bg-primary/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            {dict.nav?.product?.title ?? "Produkt"}
          </Link>

          <div
            className="relative"
            data-header-dropdown="solutions"
            onMouseEnter={() => {
              setOpenDropdown("solutions");
              setLangOpen(false);
            }}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => {
                setOpenDropdown((prev) => (prev === "solutions" ? null : "solutions"));
                setLangOpen(false);
              }}
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors",
                overlayMode
                  ? isSolutionsActive || openDropdown === "solutions"
                    ? "text-white bg-white/15"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  : isSolutionsActive || openDropdown === "solutions"
                    ? "text-primary bg-primary/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
              aria-expanded={openDropdown === "solutions"}
              aria-haspopup="true"
            >
              {dict.nav?.solutions?.title ?? "Lösungen"}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform",
                  openDropdown === "solutions" && "rotate-180"
                )}
              />
            </button>

            {openDropdown === "solutions" && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50">
                <div className="bg-white border border-slate-100 shadow-xl rounded-xl py-2">
                  {solutionsNav.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      <item.icon className="w-4 h-4 text-primary/70" />
                      {dict.nav?.solutions?.items?.[item.key] ?? item.key}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href={`/${locale}/preise`}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors",
              overlayMode
                ? pathname === `/${locale}/preise`
                  ? "text-white bg-white/15"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                : pathname === `/${locale}/preise`
                  ? "text-primary bg-primary/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            {dict.nav?.pricing ?? "Preise"}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/${locale}/login`}
            className={cn(
              "hidden sm:inline-flex text-sm font-medium transition-colors",
              overlayMode ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-slate-900"
            )}
          >
            Anmelden
          </Link>

          <div className="relative" data-header-dropdown="lang">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setOpenDropdown(null);
              }}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-full transition-all min-h-[44px] min-w-[44px] justify-center",
                overlayMode
                  ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
              )}
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{locale.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 max-h-80 overflow-y-auto bg-white border border-slate-100 shadow-xl rounded-xl z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      switchLocale(lang.code);
                      setLangOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between",
                      locale === lang.code
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span>{lang.label}</span>
                    <span className="text-xs text-slate-400 uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={cn(
              "lg:hidden p-3 transition-colors rounded-lg",
              overlayMode ? "text-white hover:text-white/80" : "text-slate-700 hover:text-primary"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            href={`/${locale}/demo`}
            className="hidden lg:inline-flex items-center justify-center bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            {dict.nav?.demo ?? "Demo anfragen"}
          </Link>
        </div>
      </div>

      <nav
        className={cn(
          "fixed left-0 right-0 bg-white z-[90] p-6 overflow-y-auto lg:hidden border-t border-slate-100 transition-all duration-300 ease-out",
          mobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-[-100%] opacity-0 pointer-events-none"
        )}
        style={{
          top: "72px",
          bottom: 0,
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
        role="navigation"
        aria-label="Mobile Navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              {dict.nav?.solutions?.title ?? "Lösungen"}
            </p>
            <div className="flex flex-col gap-1">
              {solutionsNav.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-3 text-lg font-bold text-slate-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  {dict.nav?.solutions?.items?.[item.key] ?? item.key}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={`/${locale}/produkt`}
            className="text-xl font-bold text-slate-900 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            {dict.nav?.product?.title ?? "Produkt"}
          </Link>

          <Link
            href={`/${locale}/preise`}
            className="text-xl font-bold text-slate-900 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            {dict.nav?.pricing ?? "Preise"}
          </Link>

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href={`/${locale}/login`}
              className="block w-full text-center border border-slate-200 text-slate-700 text-lg font-medium px-6 py-4 rounded-xl hover:bg-slate-50 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Anmelden
            </Link>
            <Link
              href={`/${locale}/demo`}
              className="block w-full text-center bg-primary text-white text-lg font-bold px-6 py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav?.demo ?? "Demo anfragen"}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
