"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/content";
import { SectionHeading, Fade } from "./Reveal";
import { viewportOnce, fadeChild, staggerParent } from "@/lib/motion-presets";

export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // scroll-scrubbed progress line
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (lineRef.current && wrapRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 62%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      }
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-28 md:py-40" aria-label="How we work">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="05" label="HOW WE WORK" title={"FROM FIRST IDEA\nTO FINAL PRODUCT."} />
          <Fade className="max-w-xs pb-2 text-sm leading-relaxed text-low">
            A process refined to remove friction — four stages, clear checkpoints, no
            black boxes.
          </Fade>
        </div>

        <div ref={wrapRef} className="relative mt-16 md:mt-24">
          {/* rail */}
          <div className="absolute bottom-0 left-[10px] top-0 w-px bg-line md:left-1/2" aria-hidden>
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-white"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <motion.ol
            variants={staggerParent(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="space-y-14 md:space-y-24"
          >
            {PROCESS_STEPS.map((step, i) => {
              const leftSide = i % 2 === 0;
              return (
                <motion.li
                  key={step.index}
                  variants={fadeChild}
                  className={`relative grid gap-6 pl-10 md:grid-cols-2 md:gap-0 md:pl-0 ${
                    leftSide ? "" : ""
                  }`}
                >
                  {/* node */}
                  <span
                    className="absolute left-[10px] top-2 h-px w-6 bg-white md:left-1/2 md:top-1/2 md:w-10 md:-translate-x-1/2 md:translate-y-[-50%] max-md:-translate-y-1/2"
                    aria-hidden
                  />
                  <span
                    className="absolute left-[10px] top-2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white md:left-1/2 md:top-1/2 md:h-2.5 md:w-2.5"
                    aria-hidden
                  />

                  <div
                    className={`md:py-2 ${
                      leftSide ? "md:col-start-1 md:pr-20 md:text-right" : "md:col-start-2 md:pl-20"
                    }`}
                  >
                    <span className="font-display text-outline-faint block text-6xl leading-none md:text-8xl">
                      {step.index}
                    </span>
                    <h3 className="mt-4 font-display text-3xl tracking-[0.04em] text-white md:text-5xl">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-sm text-sm leading-relaxed text-mid md:text-base ${
                        leftSide ? "md:ml-auto" : ""
                      }`}
                    >
                      {step.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
