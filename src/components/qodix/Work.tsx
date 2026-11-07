"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/lib/content";
import { SectionHeading, Fade } from "./Reveal";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectModal } from "./ProjectModal";
import { EASE_OUT } from "@/lib/motion-presets";

export function Work() {
  const [filter, setFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // gentle scroll parallax on the grid
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const ySlow = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const visible = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // lock scroll while modal open
  useEffect(() => {
    if (selected) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [selected]);

  // escape key closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // asymmetric spans per position in the visible list
  const spans = [
    "md:col-span-7",
    "md:col-span-5 md:mt-20",
    "md:col-span-5 md:-mt-10",
    "md:col-span-7",
    "md:col-span-7 md:-mt-6",
    "md:col-span-5 md:mt-16",
  ];

  return (
    <section id="work" className="relative py-28 md:py-40" aria-label="Selected work">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="03" label="SELECTED WORK" title={"IDEAS MADE\nDIGITAL."} />
          <Fade className="max-w-xs pb-2 text-sm leading-relaxed text-low">
            A selection of concept pieces and directions. Every preview below is an original
            QODIX composition — built to show how we think.
          </Fade>
        </div>

        {/* filters */}
        <Fade className="mt-12 flex flex-wrap gap-2.5 md:mt-16">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`label-micro border px-4 py-2.5 text-[9px] transition-all duration-300 ${
                filter === c
                  ? "border-white bg-white text-ink"
                  : "border-line text-low hover:border-white/50 hover:text-white"
              }`}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </Fade>

        {/* grid */}
        <motion.div
          ref={gridRef}
          style={{ y: ySlow }}
          className="relative mt-14 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-y-24"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className={`group ${spans[i % spans.length]}`}
              >
                <button
                  onClick={() => setSelected(p)}
                  className="block w-full text-left"
                  data-cursor-label="VIEW"
                  aria-haspopup="dialog"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-ink-2 transition-colors duration-500 group-hover:border-white/40">
                    <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
                      <ProjectPreview project={p} />
                    </div>
                    {/* hover veil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="label-micro bg-white px-3 py-1.5 text-[9px] text-ink">
                        OPEN PROJECT ↗
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-5">
                    <div>
                      <h3 className="font-display text-2xl tracking-[0.05em] text-white transition-colors duration-300 md:text-3xl">
                        {p.title}
                      </h3>
                      <p className="label-micro mt-1.5 text-[9px] text-low">{p.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="label-micro text-[9px] text-low">{p.year}</span>
                      <p className="label-micro mt-1.5 border border-white/30 px-2 py-0.5 text-[8px] text-mid">
                        CONCEPT
                      </p>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
