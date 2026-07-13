"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HelixItem {
  id: string | number;
  image: string;
  title: string;
  description?: string;
  category?: string;
}

interface HelixCarouselProps {
  items: HelixItem[];
  className?: string;
  onItemClick?: (item: HelixItem) => void;
}

interface HelixCardProps {
  item: HelixItem;
  index: number;
  progress: MotionValue<number>;
  totalItems: number;
  isReducedMotion: boolean;
  onItemClick?: (item: HelixItem) => void;
}

// Define the horizontal path keyframes
// Horizontal layout for website viewing - cards positioned side by side
const PATH_CONFIG = {
  left: { x: 0, y: 0, scale: 0.8, opacity: 0.6, zIndex: 0 },
  center: { x: 0, y: 0, scale: 1.1, opacity: 1, zIndex: 50 },
  right: { x: 0, y: 0, scale: 0.8, opacity: 0.6, zIndex: 0 }
};

function HelixCard({
  item,
  index,
  progress,
  totalItems,
  isReducedMotion,
  onItemClick,
}: HelixCardProps) {
  const cardProgress = useTransform(progress, (current) => {
    const itemProgress = current * totalItems;
    const diff = itemProgress - index;
    return diff;
  });

  const x = useTransform(
    cardProgress,
    [-1, 0, 1],
    [PATH_CONFIG.left.x, PATH_CONFIG.center.x, PATH_CONFIG.right.x]
  );

  const y = useTransform(
    cardProgress,
    [-1, 0, 1],
    [PATH_CONFIG.left.y, PATH_CONFIG.center.y, PATH_CONFIG.right.y]
  );

  const scale = useTransform(
    cardProgress,
    [-1, 0, 1],
    [PATH_CONFIG.left.scale, PATH_CONFIG.center.scale, PATH_CONFIG.right.scale]
  );

  const opacity = useTransform(
    cardProgress,
    [-1.5, -0.8, 0, 0.8, 1.5], // Extended range to handle smooth fade in/out
    [0, 1, 1, 1, 0]
  );

  const zIndex = useTransform(cardProgress, (val) => {
    const absVal = Math.abs(val);
    if (absVal < 0.5) return 20; // Center
    if (absVal < 1.5) return 10; // Near edges
    return 0; // Far edges
  });

  const rotateY = useTransform(cardProgress, [-1, 0, 1], [15, 0, -15]);
  const rotateX = useTransform(cardProgress, [-1, 0, 1], [10, 0, -10]);

  return (
    <motion.div
      className="relative w-80 h-[480px] cursor-pointer will-change-transform flex-shrink-0"
      style={{
        x,
        y,
        scale: isReducedMotion ? 1 : scale,
        opacity: isReducedMotion ? (index === 0 ? 1 : 0) : opacity,
        zIndex,
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      onClick={() => onItemClick?.(item)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/20 group">
        {/* Full Image Background */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority={index < 2}
          sizes="(max-width: 768px) 100vw, 320px"
        />

        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {item.category && (
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3">
              {item.category}
            </span>
          )}
          <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-white/70 font-medium max-w-[240px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {item.description}
            </p>
          )}
        </div>

        {/* Glass Effect Border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function HelixCarousel({
  items,
  className,
  onItemClick,
}: HelixCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Scroll management
  const lockStartY = useRef<number>(0);
  const accumulatedScroll = useRef<number>(0);

  const animationProgress = useMotionValue(0);
  const smoothProgress = useSpring(animationProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Constants
  const scrollSensitivity = 200; // Pixels per item transition
  const totalScrollNeeded = scrollSensitivity * items.length;

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Intersection Observer to activate
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isActive) {
            setIsActive(true);
            setIsLocked(true);
            lockStartY.current = window.scrollY;
            accumulatedScroll.current = 0;
            animationProgress.set(0);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [isActive, animationProgress]);

  // Scroll Jacking Logic
  useEffect(() => {
    if (!isLocked || isReducedMotion) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isPaused) return;

      accumulatedScroll.current += e.deltaY;

      // Allow scrolling slightly past bounds for elastic feel, but clamp for logic
      const boundedScroll = Math.max(0, Math.min(accumulatedScroll.current, totalScrollNeeded));

      const progress = boundedScroll / totalScrollNeeded;
      animationProgress.set(progress);

      // Keep page locked in place
      window.scrollTo({ top: lockStartY.current, behavior: 'auto' });

      // Exit condition: Scrolled past end
      if (accumulatedScroll.current > totalScrollNeeded && e.deltaY > 0) {
        setIsLocked(false);
        setIsActive(false);
        // Let natural scroll resume
        window.scrollTo({ top: lockStartY.current + 10, behavior: 'auto' });
      }

      // Exit condition: Scrolled past start (back up)
      if (accumulatedScroll.current < 0 && e.deltaY < 0) {
         setIsLocked(false);
         setIsActive(false);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLocked && !isPaused) e.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLocked, isPaused, isReducedMotion, totalScrollNeeded, animationProgress]);

  if (!isMounted) return <div className="h-[600px]" />;

  return (
    <div
      className={cn("relative w-full h-[600px] flex items-center justify-center overflow-hidden", className)}
      ref={containerRef}
    >
      {/* Desktop: Horizontal Carousel */}
      <div
        className="relative w-full h-full max-w-7xl mx-auto hidden md:flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Horizontal card container */}
        <div className="flex items-center justify-center gap-8 w-full h-full overflow-hidden">
          {items.map((item, index) => (
            <HelixCard
              key={item.id}
              item={item}
              index={index}
              progress={smoothProgress}
              totalItems={items.length}
              isReducedMotion={isReducedMotion}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Standard Vertical Stack/Grid */}
      <div className="md:hidden w-full px-4 pb-20 pt-10 flex flex-col gap-8">
        {items.map((item) => (
           <div
             key={item.id}
             className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg"
             onClick={() => onItemClick?.(item)}
           >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-6">
                {item.category && (
                  <div className="text-xs font-bold text-cyan-400 mb-1 uppercase tracking-wider">{item.category}</div>
                )}
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
