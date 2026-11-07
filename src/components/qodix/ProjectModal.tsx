"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "@/lib/content";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion-presets";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[85] flex items-end justify-center md:items-center"
      initial={false}
      aria-hidden={!project}
    >
      <motion.button
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close project details"
        initial={{ opacity: 0 }}
        animate={{ opacity: project ? 1 : 0 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: project ? "auto" : "none" }}
        tabIndex={project ? 0 : -1}
      />

      <AnimatePresenceGuard project={project} onClose={onClose} />
    </motion.div>
  );
}

function AnimatePresenceGuard({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_INOUT }}
          className="pointer-events-auto relative z-10 max-h-[92svh] w-full max-w-5xl overflow-y-auto border border-line bg-ink-2"
        >
          {/* header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink-2/95 px-6 py-4 backdrop-blur-md md:px-10">
            <div className="flex items-baseline gap-4">
              <h3 className="font-display text-2xl tracking-[0.05em] text-white md:text-3xl">
                {project.title}
              </h3>
              <span className="label-micro hidden text-low md:block">{project.category}</span>
            </div>
            <button
              onClick={onClose}
              className="label-micro flex h-10 items-center gap-2 border border-line px-4 text-mid transition-all duration-300 hover:border-white hover:text-white"
            >
              CLOSE ✕
            </button>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            {/* meta */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="label-micro text-low">CATEGORY — {project.category}</span>
              <span className="label-micro text-low">YEAR — {project.year}</span>
              <span className="label-micro border border-white/40 px-2.5 py-1 text-[9px] text-white">
                CONCEPT PROJECT
              </span>
            </div>

            {/* wide preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
              className="mt-8"
            >
              <ProjectPreview project={project} variant="wide" />
            </motion.div>

            {/* description + approach */}
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <p className="label-micro text-low">OVERVIEW</p>
                <p className="mt-4 text-[15px] leading-relaxed text-mid">{project.description}</p>
              </div>
              <div>
                <p className="label-micro text-low">DESIGN APPROACH</p>
                <p className="mt-4 text-[15px] leading-relaxed text-mid">{project.approach}</p>
                <p className="label-micro mt-6 text-[9px] text-low">{project.accentNote}</p>
              </div>
            </div>

            {/* stack + previews */}
            <div className="mt-10 grid gap-10 border-t border-line pt-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="label-micro text-low">TECHNOLOGY STACK</p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {project.stack.map((t) => (
                    <li key={t} className="label-micro border border-line px-3.5 py-2 text-[9px] text-mid">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-2 text-sm leading-relaxed text-low">
                  <p>
                    Results and live links are published for client work only. This piece is an
                    original concept, built by QODIX to demonstrate our design and engineering
                    direction.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-[190px]">
                <p className="label-micro mb-4 text-low">MOBILE PREVIEW</p>
                <div className="aspect-[9/17] border border-line bg-ink p-3">
                  <ProjectPreview project={project} variant="phone" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
