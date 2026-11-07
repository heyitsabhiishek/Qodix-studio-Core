"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/lib/content";
import { SectionHeading, Fade } from "./Reveal";
import { scrollToSection } from "@/lib/smooth-scroll";
import { EASE_INOUT } from "@/lib/motion-presets";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-40" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <SectionHeading index="08" label="QUESTIONS" title={"GOOD QUESTIONS.\nCLEAR ANSWERS."} />
              <Fade className="mt-8 max-w-sm text-sm leading-relaxed text-low">
                Anything unanswered? Ask directly — we reply to every serious inquiry.
              </Fade>
              <Fade>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="link-line label-micro mt-6 inline-block text-soft transition-colors hover:text-white"
                >
                  ASK YOUR QUESTION ↗
                </button>
              </Fade>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="border-t border-line">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="border-b border-line">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center gap-5 py-6 text-left md:gap-8"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                    >
                      <span
                        className={`font-display text-sm transition-colors duration-300 ${
                          isOpen ? "text-white" : "text-low"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-[15px] font-medium leading-snug transition-colors duration-300 md:text-base ${
                          isOpen ? "text-white" : "text-soft group-hover:text-white"
                        }`}
                      >
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE_INOUT }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors duration-300 ${
                          isOpen ? "border-white bg-white text-ink" : "border-line text-mid group-hover:border-white/60"
                        }`}
                        aria-hidden
                      >
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE_INOUT }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pl-[52px] pr-4 text-sm leading-relaxed text-mid md:pl-[68px] md:text-[15px]">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
