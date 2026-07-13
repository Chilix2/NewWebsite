"use client";

import { useEffect } from "react";
import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

export function WebVitalsReporter() {
  useEffect(() => {
    const handleMetric = (metric: any) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric.name, {
          event_category: "Web Vitals",
          value: Math.round(metric.value),
          event_label: metric.id,
        });
      }

      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
        delta: metric.delta,
        navigationType: metric.navigationType,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/vitals", body);
      }
    };

    onCLS(handleMetric);
    onINP(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  }, []);

  return null;
}
