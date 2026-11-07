"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { HERO_LABELS } from "@/lib/content";
import { scrollToSection } from "@/lib/smooth-scroll";
import { useStudioStore } from "@/lib/studio-store";
import { EASE_OUT } from "@/lib/motion-presets";
import { CharsReveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

const HeroScene = dynamic(() => import("./hero/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** Static monochrome fallback while the 3D scene loads (or if WebGL fails). */
function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="glow-orb absolute h-[70vmin] w-[70vmin] md:left-[58%]" />
      <svg viewBox="0 0 200 200" className="h-[62vmin] w-[62vmin] opacity-70 md:absolute md:left-[58%] md:-translate-x-1/2">
        <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="14" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="4 7" />
        <line x1="138" y1="138" x2="166" y2="166" stroke="rgba(255,255,255,0.5)" strokeWidth="12" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Hero() {
  const introDone = useStudioStore((s) => s.introDone);

  // subtle counter-parallax on the headline (plays against the 3D object)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const hx = useSpring(useTransform(mx, (v) => v * -14), { stiffness: 60, damping: 20 });
  const hy = useSpring(useTransform(my, (v) => v * -10), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const go = (id: string) => scrollToSection(id);

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-label="Introduction">
      {/* 3D layer */}
      <div className="absolute inset-0 md:left-0">
        <HeroScene />
      </div>
      <div className="vignette pointer-events-none absolute inset-0" aria-hidden />

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-center px-5 pb-28 pt-32 md:px-10 md:pb-24">
        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          className="mb-7 flex items-center gap-4 md:mb-9"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" aria-hidden />
          <span className="label-micro text-mid">INDEPENDENT TECHNOLOGY STUDIO</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          style={{ x: hx, y: hy }}
          className="font-display leading-[0.84] tracking-[0.005em]"
          aria-label="Engineering the WEB"
        >
          <span className="block text-white">
            <CharsReveal text="BUILDING" started={introDone} delay={0.18} stagger={0.035} className="display-fluid" />
          </span>
          <span className="block text-outline">
            <CharsReveal text="BEYOND" started={introDone} delay={0.4} stagger={0.035} className="display-fluid" />
          </span>
          <span className="block text-white">
            <CharsReveal text="DIGITAL." started={introDone} delay={0.62} stagger={0.035} className="display-fluid" />
          </span>
        </motion.h1>

        {/* supporting row */}
        <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.95 }}
            className="max-w-md text-[15px] leading-relaxed text-mid md:text-base"
          >
At QODIX, we bring ambitious ideas to life through exceptional web experiences, intelligent software, and purposeful innovation. We don't just build for today — we engineer what comes next.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => go("work")}
                className="label-micro bg-white px-7 py-4 text-ink transition-colors duration-300 hover:bg-soft"
              >
                EXPLORE Project's ↗
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => go("contact")}
                className="label-micro border border-white/30 px-7 py-4 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                START A PROJECT ↗
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* discipline labels */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.3 }}
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 md:mt-16"
        >
          {HERO_LABELS.map((l, i) => (
            <li key={l} className="flex items-center gap-3">
              <span className="label-micro text-low">{l}</span>
              {i < HERO_LABELS.length - 1 && <span className="text-low/60" aria-hidden>/</span>}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* floating technical labels — desktop only */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block" aria-hidden>
        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.45 }}
          className="absolute right-[6%] top-[24%] animate-float-soft"
        >
          <div className="border border-line bg-ink/60 px-3 py-2 backdrop-blur-sm">
            <p className="label-micro text-[9px] text-low">OBJECT</p>
            <p className="font-display text-sm tracking-[0.1em] text-soft">Q-CORE / V.01</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute right-[26%] top-[62%] animate-float-soft"
          style={{ animationDelay: "-2.2s" }}
        >
          <div className="border border-line bg-ink/60 px-3 py-2 backdrop-blur-sm">
            <p className="label-micro text-[9px] text-low">ORIGIN</p>
            <p className="font-display text-sm tracking-[0.1em] text-soft">28.61° N / 77.20° E</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.75 }}
          className="absolute right-[13%] top-[78%] animate-float-soft"
          style={{ animationDelay: "-3.6s" }}
        >
          <div className="border border-line bg-ink/60 px-3 py-2 backdrop-blur-sm">
            <p className="label-micro text-[9px] text-low">MATERIAL</p>
            <p className="font-display text-sm tracking-[0.1em] text-soft">BLACK CHROME</p>
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.7 }}
        onClick={() => go("about")}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Scroll to next section"
      >
        <span className="label-micro text-[9px] text-low">SCROLL</span>
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="animate-scroll-line absolute inset-0 block bg-white" />
        </span>
      </motion.button>
    </section>
  );
}
