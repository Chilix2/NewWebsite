"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  Menu, 
  X,
  Phone,
  Calendar,
  MessageSquare,
  Building2,
  Stethoscope,
  Utensils,
  Briefcase,
  Scale,
  BookOpen,
  FileText,
  HelpCircle,
  Users,
  Plug,
  BarChart3,
  Shield,
  Globe,
  Handshake
} from "lucide-react";

interface NavProps {
  dict: any;
  locale: string;
}

export default function SaillyHeader({ dict, locale }: NavProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const pathname = usePathname();
  const router = useRouter();

  // Mount effect - runs once
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Scroll listener - independent from menu state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu scroll lock - separate from mount
  useEffect(() => {
    if (!hasMounted) return;
    
    if (mobileMenuOpen) {
      // Store current scroll position
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // iOS Safari: use position fixed on body to prevent scroll-through
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore scroll position on iOS
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, hasMounted, scrollY]);

  // Auto-close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!hasMounted) {
    return (
      <header className="fixed top-0 w-full z-[100] px-4 sm:px-6 py-4 bg-transparent border-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-3xl sm:text-4xl md:text-5xl font-logo text-[#f97e70] pb-2 inline-block">Sailly</span>
          <div className="flex items-center gap-4">
            <div className="p-3 text-slate-700"><Menu size={24} /></div>
          </div>
        </div>
      </header>
    );
  }

  const switchLocale = (newLocale: string) => {
    // Write the NEXT_LOCALE cookie so middleware persists the choice
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
    
    // Navigate to same page in new locale, preserving scroll position
    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = newLocale;
      router.push(segments.join("/"), { scroll: false });
    }
  };

  const navConfig = {
    product: [
      { key: "voice_agent", href: `/${locale}/produkt`, icon: Phone },
      { key: "integrations", href: `/${locale}/produkt/integrationen`, icon: Plug },
      { key: "data_insights", href: `/${locale}/produkt/data-insights`, icon: BarChart3 },
      { key: "security", href: `/${locale}/produkt/security-compliance`, icon: Shield },
      { key: "languages", href: `/${locale}/produkt/languages`, icon: Globe },
      { key: "partners", href: `/${locale}/produkt/strategic-partners`, icon: Handshake },
    ],
    solutions: [
      { key: "hotels", href: `/${locale}/loesungen/hotels`, icon: Building2 },
      { key: "medical", href: `/${locale}/loesungen/medical`, icon: Stethoscope },
      { key: "restaurants", href: `/${locale}/loesungen/restaurants`, icon: Utensils },
      { key: "legal", href: `/${locale}/loesungen/legal`, icon: Scale },
      { key: "services", href: `/${locale}/loesungen/services`, icon: Briefcase },
    ],
    resources: [
      { key: "blog", href: `/${locale}/ressourcen/blog`, icon: BookOpen },
      { key: "case_studies", href: `/${locale}/ressourcen/case-studies`, icon: Users },
      { key: "faq", href: `/${locale}/ressourcen/faq`, icon: HelpCircle },
    ]
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 px-4 sm:px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm" : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 relative z-50 group">
          <div className="relative">
            <span className="text-3xl sm:text-4xl md:text-5xl font-logo text-[#f97e70] pb-2 inline-block">
              Sailly
            </span>
            <div className="absolute -top-3 -right-8 sm:-right-10 md:-right-12 flex items-center gap-[3px] h-10">
              <div className="w-[5px] h-2 sm:h-3 bg-gradient-to-t from-[#f97e70] to-[#fcd34d] rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
              <div className="w-[5px] h-4 sm:h-6 bg-gradient-to-t from-[#f97e70] to-[#fcd34d] rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '150ms' }} />
              <div className="w-[5px] h-6 sm:h-10 bg-gradient-to-t from-[#f97e70] to-[#fcd34d] rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }} />
              <div className="w-[5px] h-4 sm:h-6 bg-gradient-to-t from-[#f97e70] to-[#fcd34d] rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '150ms' }} />
              <div className="w-[5px] h-2 sm:h-3 bg-gradient-to-t from-[#f97e70] to-[#fcd34d] rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
            </div>
          </div>
        </Link>

        {/* Desktop Nav — Order: Solutions > Pricing > Product */}
        <nav className="hidden xl:flex items-center gap-8 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-sm">
          {/* Solutions */}
          <div 
            className="relative group"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-primary transition-colors py-2">
              {dict.nav.solutions?.title}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
            {openDropdown === "solutions" && (
                <div className="absolute top-full left-0 pt-4 w-64">
                    <div className="bg-white p-2 border border-slate-100 shadow-xl rounded-2xl overflow-hidden">
                        {navConfig.solutions.map(item => (
                            <Link key={item.key} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="p-2 rounded-md bg-primary/10 text-primary">
                                    {(() => { const IC = item.icon; return <IC className="w-4 h-4" />; })()}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{dict.nav.solutions?.items?.[item.key]}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Pricing */}
          <Link href={`/${locale}/preise`} className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
            {dict.nav?.pricing}
          </Link>

          {/* Product */}
          <div 
            className="relative group"
            onMouseEnter={() => setOpenDropdown("product")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-primary transition-colors py-2">
              {dict.nav.product?.title}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
            {openDropdown === "product" && (
                <div className="absolute top-full left-0 pt-4 w-64">
                    <div className="bg-white p-2 border border-slate-100 shadow-xl rounded-2xl overflow-hidden">
                        {navConfig.product.map(item => (
                            <Link key={item.key} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="p-2 rounded-md bg-primary/10 text-primary">
                                    {(() => { const IC = item.icon; return <IC className="w-4 h-4" />; })()}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{dict.nav.product?.items?.[item.key]}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
            {/* Anmelden link — desktop only */}
            <Link
              href={`/${locale}/login`}
              className="hidden md:inline-flex text-sm font-medium text-slate-700 hover:text-primary transition-colors"
            >
              Anmelden
            </Link>

            {/* Language Selector — always visible, dropdown for 13 languages */}
            <div data-testid="language-switcher" className="relative">
                <button
                    onClick={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#f97e70]/20 to-[#fcd34d]/20 border border-[#f97e70]/30 text-slate-700 hover:text-slate-900 transition-all min-h-[44px] min-w-[44px] justify-center"
                    aria-label="Select language"
                >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{locale.toUpperCase()}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
                {openDropdown === "lang" && (
                    <div className="absolute top-full right-0 mt-2 w-40 max-h-80 overflow-y-auto bg-white border border-slate-100 shadow-xl rounded-xl z-50">
                        {[
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
                        ].map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => { switchLocale(lang.code); setOpenDropdown(null); setMobileMenuOpen(false); }}
                                className={cn(
                                    "w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between",
                                    locale === lang.code ? "bg-[#f97e70]/10 text-[#f97e70] font-bold" : "text-slate-700 hover:bg-slate-50"
                                )}
                            >
                                <span>{lang.label}</span>
                                <span className="text-xs text-slate-400 uppercase">{lang.code}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                data-testid="menu-button"
                className="xl:hidden p-3 text-slate-700 hover:text-primary transition-colors rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href={`/${locale}/login?tab=register`} className="hidden md:inline-flex items-center justify-center bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Kostenlos starten
            </Link>
        </div>
      </div>

      {/* Mobile Menu — CSS transform animation instead of conditional rendering */}
      <nav
        className={cn(
          "fixed left-0 right-0 bg-white z-[90] p-6 overflow-y-auto xl:hidden border-t border-slate-100 transition-all duration-300 ease-out",
          mobileMenuOpen 
            ? "translate-y-0 opacity-100 pointer-events-auto" 
            : "translate-y-[-100%] opacity-0 pointer-events-none"
        )}
        style={{ top: "80px", bottom: 0, WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
        role="navigation"
        aria-label="Mobile Navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-8">
            {/* Solutions first */}
            <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{dict.nav.solutions?.title}</h3>
                <div className="flex flex-col gap-3 ps-2">
                    {navConfig.solutions.map(item => (
                        <Link key={item.key} href={item.href} className="text-slate-600 hover:text-primary text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                            {dict.nav.solutions?.items?.[item.key]}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Pricing second */}
            <Link href={`/${locale}/preise`} className="text-xl font-bold text-slate-900 py-2" onClick={() => setMobileMenuOpen(false)}>
                {dict.nav?.pricing}
            </Link>

            {/* Product third */}
            <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{dict.nav.product?.title}</h3>
                <div className="flex flex-col gap-3 ps-2">
                    {navConfig.product.map(item => (
                        <Link key={item.key} href={item.href} className="text-slate-600 hover:text-primary text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                            {dict.nav.product?.items?.[item.key]}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link href={`/${locale}/login`} className="block w-full text-center border border-slate-200 text-slate-700 text-lg font-medium px-6 py-4 rounded-xl hover:bg-slate-50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    Anmelden
                </Link>
                <Link href={`/${locale}/login?tab=register`} className="block w-full text-center bg-primary text-white text-lg font-bold px-6 py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    Kostenlos starten
                </Link>
            </div>
        </div>
      </nav>
    </header>
  );
}
