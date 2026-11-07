"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/content";
import { SectionHeading, Fade } from "./Reveal";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion-presets";

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="relative py-28 md:py-40" aria-label="Services">
      {/* faint surface shift to break the page rhythm */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-2/60 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="02"
            label="WHAT WE DO"
            title={"DIGITAL SOLUTIONS.\nBUILT WITH INTENTION."}
          />
          <Fade className="max-w-xs pb-2 text-sm leading-relaxed text-low">
            Six disciplines, one standard: everything we ship is designed to be used,
            measured, and remembered.
          </Fade>
        </div>

        <div className="mt-16 border-t border-line md:mt-20">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.index} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left md:grid-cols-[90px_1fr_auto_auto] md:gap-10 md:py-9"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${s.index}`}
                >
                  {/* number */}
                  <span
                    className={`font-display text-3xl leading-none transition-all duration-500 md:text-5xl ${
                      isOpen ? "text-white" : "text-outline-faint group-hover:text-white"
                    }`}
                  >
                    {s.index}
                  </span>

                  {/* title */}
                  <span className="min-w-0">
                    <span
                      className={`block font-display text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[0.95] tracking-[0.01em] transition-all duration-500 ${
                        isOpen ? "text-white" : "text-soft group-hover:translate-x-2 group-hover:text-white"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-2 hidden max-w-xl text-sm leading-relaxed text-low md:block">
                      {s.summary}
                    </span>
                  </span>

                  {/* status */}
                  <span className="label-micro hidden text-[9px] text-low md:block">
                    {isOpen ? "CLOSE" : "OPEN"}
                  </span>

                  {/* indicator */}
                  <span
                    className={`flex h-10 w-10 items-center justify-center border transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 border-white bg-white text-ink"
                        : "border-line text-soft group-hover:border-white"
                    }`}
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-panel-${s.index}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE_INOUT }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[90px_1fr_1fr] md:gap-10 md:pl-0">
                        <span className="hidden md:block" aria-hidden />
                        <p className="max-w-xl text-[15px] leading-relaxed text-mid md:text-base">
                          {s.detail}
                        </p>
                        <ul className="flex flex-wrap content-start gap-2.5 md:justify-end">
                          {s.tags.map((t) => (
                            <li
                              key={t}
                              className="label-micro border border-line px-3.5 py-2 text-[9px] text-mid transition-colors duration-300 hover:border-white/60 hover:text-white"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Fade className="mt-10 flex items-center justify-between">
          <span className="label-micro text-low">SIX DISCIPLINES / ONE STUDIO</span>
          <motion.span
            className="label-micro hidden text-low md:block"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: EASE_OUT }}
          >
            SELECT A DISCIPLINE TO EXPAND
          </motion.span>
        </Fade>
      </div>
    </section>
  );
}
