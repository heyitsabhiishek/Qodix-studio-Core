"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS } from "@/lib/content";
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll";
import { useStudioStore } from "@/lib/studio-store";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion-presets";
import { Magnetic } from "./Magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();
  const menuOpen = useStudioStore((s) => s.menuOpen);
  const setMenuOpen = useStudioStore((s) => s.setMenuOpen);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // scroll spy
  useEffect(() => {
    const ids = ["home", ...NAV_LINKS.map((l) => l.id).filter((i) => i !== "home"), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // lock page scroll while menu open
  useEffect(() => {
    if (menuOpen) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // wait for menu exit before scrolling on mobile
    window.setTimeout(() => scrollToSection(id), menuOpen ? 420 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !menuOpen
            ? "border-b border-line bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[68px] max-w-[1680px] items-center justify-between px-5 md:h-[76px] md:px-10"
          aria-label="Primary"
        >
          {/* wordmark */}
          <button
            onClick={() => {
              setMenuOpen(false);
              scrollToTop();
            }}
            className="group flex items-center gap-2.5"
            aria-label="QODIX STUDIO— back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/80 transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
              <span className="font-display text-[13px] leading-none">Q</span>
            </span>
            <span className="font-display text-xl leading-none tracking-[0.14em] text-white">
              QODIX STUDIO'S 
            </span>
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="relative">
                <button
                  onClick={() => go(link.id)}
                  className={`label-micro py-2 transition-colors duration-300 ${
                    active === link.id ? "text-white" : "text-low hover:text-soft"
                  }`}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  {link.label}
                </button>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* desktop CTA */}
            <Magnetic className="hidden lg:block">
              <button
                onClick={() => go("contact")}
                className="label-micro border border-white/25 px-5 py-2.5 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                START A PROJECT ↗
              </button>
            </Magnetic>

            {/* mobile burger */}
            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-white"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-white"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* fullscreen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[75] flex flex-col bg-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE_INOUT }}
          >
            <div className="vignette pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative flex flex-1 flex-col justify-center px-6 pt-20">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.id} className="overflow-hidden">
                    <motion.button
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.08 + i * 0.06 }}
                      onClick={() => go(link.id)}
                      className="group flex items-baseline gap-4 py-1 text-left"
                    >
                      <span className="label-micro text-low">0{i + 1}</span>
                      <span className="font-display text-[17vw] leading-[0.95] text-white transition-colors group-hover:text-soft sm:text-6xl">
                        {link.label}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: EASE_OUT }}
                className="mt-12 space-y-6"
              >
                <button
                  onClick={() => go("contact")}
                  className="label-micro w-full border border-white/25 py-4 text-white transition-all duration-300 hover:bg-white hover:text-ink"
                >
                  START A PROJECT ↗
                </button>
                <div className="flex items-center justify-between border-t border-line pt-6">
                  <span className="label-micro text-low">QODIX STUDIO</span>
                  <span className="label-micro text-low">BUILDING BEYOND DIGITAL.</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
