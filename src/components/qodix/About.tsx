"use client";

import { motion } from "framer-motion";
import { SectionHeading, Fade, Rise } from "./Reveal";
import { staggerParent, fadeChild, viewportOnce } from "@/lib/motion-presets";

const PRINCIPLES = [
  {
    index: "01",
    title: "THINK BEYOND",
    text: "We approach problems with curiosity and creative thinking.",
  },
  {
    index: "02",
    title: "BUILD WITH PURPOSE",
    text: "We develop useful, reliable, and scalable Websites & Solutions",
  },
  {
    index: "03",
    title: "EVOLVE CONSTANTLY",
    text: "We explore emerging technologies and new possibilities.",
  },
];

/** Abstract monochrome brand visual — concentric Q geometry, pure SVG. */
function AbstractVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      aria-hidden
    >
      <div className="glow-orb absolute inset-[-18%]" />
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx="92" cy="92" r="58" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="10" />
        <circle cx="92" cy="92" r="78" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <circle cx="92" cy="92" r="40" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="122" y1="122" x2="158" y2="158" stroke="rgba(255,255,255,0.9)" strokeWidth="9" strokeLinecap="round" />
        <circle cx="92" cy="92" r="3" fill="#ffffff" />
        <line x1="0" y1="92" x2="34" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="150" y1="92" x2="200" y2="92" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="92" y1="0" x2="92" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="92" y1="170" x2="92" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </svg>
      <span className="label-micro absolute -right-1 top-2 text-[9px] text-low">FIG. 01 — THE Q MARK</span>
      <span className="label-micro absolute bottom-2 left-0 text-[9px] text-low">SCALE 1:1 / MONO</span>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40" aria-label="About QODIX">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <SectionHeading
          index="01"
          label="WHO WE ARE"
          title={"WE BUILD WHAT\nCOMES NEXT."}
        />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          {/* visual */}
          <div className="order-2 md:order-1 md:col-span-5">
            <AbstractVisual />
          </div>

          {/* copy */}
          <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
            <Fade className="space-y-6 text-[15px] leading-relaxed text-mid md:text-lg">
              <p>
                QODIX is an independent digital technology studio focused on Business, Startups, Person's To Build an Online Presence through Web!
              </p>
              <p>
                We combine creative thinking, modern engineering, and technology to build
               Website & solutions that create real value.
              </p>
            </Fade>

            <div className="mt-12 md:mt-16">
              <motion.ul
                variants={staggerParent(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="border-t border-line"
              >
                {PRINCIPLES.map((p) => (
                  <motion.li
                    key={p.index}
                    variants={fadeChild}
                    className="group flex items-baseline gap-6 border-b border-line py-6 transition-colors duration-500 hover:bg-elevated md:gap-10"
                  >
                    <span className="font-display text-2xl text-low transition-colors duration-300 group-hover:text-white md:text-3xl">
                      {p.index}
                    </span>
                    <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                      <h3 className="font-display text-xl tracking-[0.06em] text-white md:text-2xl">
                        {p.title}
                      </h3>
                      <p className="max-w-xs text-sm leading-relaxed text-low transition-colors duration-300 group-hover:text-mid">
                        {p.text}
                      </p>
                    </div>
                    <span
                      className="hidden text-low transition-all duration-300 group-hover:translate-x-1 group-hover:text-white md:block"
                      aria-hidden
                    >
                      ↗
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>

        {/* micro metadata strip */}
        <Rise className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 md:mt-28">
          <span className="label-micro text-low">FOUNDED BY ABHIISHEK</span>
          <span className="label-micro text-low">BASED IN INDIA — WORKING WORLDWIDE</span>
          <span className="label-micro text-low">DIGITAL TECHNOLOGY & SOFTWARE</span>
        </Rise>
      </div>
    </section>
  );
}
