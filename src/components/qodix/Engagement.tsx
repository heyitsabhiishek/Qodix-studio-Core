"use client";

import { motion } from "framer-motion";
import { WHY_POINTS, ENGAGEMENT_MODELS } from "@/lib/content";
import { SectionHeading, Fade, Rise } from "./Reveal";
import { scrollToSection } from "@/lib/smooth-scroll";
import { Magnetic } from "./Magnetic";
import { viewportOnce, fadeChild, staggerParent } from "@/lib/motion-presets";

export function WhyQodix() {
  return (
    <section className="relative py-28 md:py-40" aria-label="Why QODIX">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        {/* statement */}
        <div className="grid gap-10 md:grid-cols-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.92] text-white md:col-span-7"
          >
            GOOD TECHNOLOGY.
            <br />
            <span className="text-outline">MEANINGFUL IMPACT.</span>
          </motion.h2>
          <Fade className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-[15px] leading-relaxed text-mid md:text-base">
              We hold the work to a simple test: does it serve the people who use it and the
              business that owns it? These are the standards every QODIX project answers to.
            </p>
          </Fade>
        </div>

        {/* principles grid — editorial rows, not cards */}
        <motion.ul
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-2 md:gap-x-16"
        >
          {WHY_POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              variants={fadeChild}
              className="group flex gap-6 border-b border-line py-7 transition-colors duration-500 hover:bg-elevated md:py-8"
            >
              <span className="font-display text-sm text-low transition-colors duration-300 group-hover:text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl tracking-[0.05em] text-white md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-low transition-colors duration-300 group-hover:text-mid">
                  {p.text}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function Engagement() {
  return (
    <section id="engage" className="relative py-28 md:py-40" aria-label="Engagement models">
      <div className="pointer-events-none absolute inset-0 bg-ink-2/50" aria-hidden />
      <div className="relative mx-auto max-w-[1680px] px-5 md:px-10">
        <SectionHeading
          index="06"
          label="WORK WITH US"
          title={"FLEXIBLE WAYS\nTO BUILD TOGETHER."}
        />

        <div className="mt-16 grid gap-px border border-line bg-line md:mt-24 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <motion.article
              key={m.index}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col bg-ink p-7 transition-colors duration-500 hover:bg-panel md:p-9 ${
                i === 1 ? "md:-mt-6 md:mb-[-0px]" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl text-outline-faint transition-all duration-500 group-hover:text-white md:text-6xl">
                  {m.index}
                </span>
                <span className="label-micro text-[9px] text-low">
                  {i === 1 ? "MOST COMMON" : i === 0 ? "FOCUSED SCOPE" : "ADVANCED"}
                </span>
              </div>

              <h3 className="mt-8 font-display text-2xl tracking-[0.04em] text-white md:text-3xl">
                {m.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mid">{m.desc}</p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
                {m.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm text-mid">
                    <span className="h-1 w-1 rotate-45 bg-white/60" aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection("contact")}
                className="link-line label-micro mt-8 self-start text-soft transition-colors hover:text-white"
              >
                REQUEST A QUOTE ↗
              </button>

              <span className="label-micro mt-4 text-[8px] text-low">
                PRICING SHARED AFTER SCOPING — TRANSPARENT, WRITTEN, FIRM
              </span>
            </motion.article>
          ))}
        </div>

        <Rise className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="max-w-md text-sm leading-relaxed text-low">
            Not sure which model fits? Tell us what you are imagining — we will recommend the
            simplest way to build it.
          </p>
          <Magnetic>
            <button
              onClick={() => scrollToSection("contact")}
              className="label-micro border border-white/30 px-8 py-4 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              DISCUSS YOUR PROJECT ↗
            </button>
          </Magnetic>
        </Rise>
      </div>
    </section>
  );
}
