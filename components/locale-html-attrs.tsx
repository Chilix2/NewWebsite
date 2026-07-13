"use client";

import { useEffect } from "react";

export function LocaleHtmlAttrs({ locale, dir }: { locale: string; dir?: "ltr" | "rtl" }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir || "ltr";
  }, [locale, dir]);

  return null;
}
