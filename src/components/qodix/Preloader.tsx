"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "@/lib/studio-store";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion-presets";

const LETTERS = ["Q", "O", "D", "I", "X"];

export function Preloader() {
  const setIntroDone = useStudioStore((s) => s.setIntroDone);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    document.documentElement.style.overflow = "hidden";

    const DURATION = reduced ? 250 : 1750;
    const HOLD = reduced ? 80 : 420;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setExiting(true);
          setIntroDone(true);
          document.documentElement.style.overflow = "";
          window.setTimeout(() => setGone(true), 950);
        }, HOLD);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, setIntroDone]);

  const skip = () => {
    if (exiting) return;
    setExiting(true);
    setIntroDone(true);
    document.documentElement.style.overflow = "";
    window.setTimeout(() => setGone(true), 950);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 md:px-10 md:py-8"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_INOUT }}
          aria-hidden={exiting}
          role="status"
          aria-label="Loading QODIX Studio"
        >
          {/* subtle light sweep */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: exiting ? 0 : [0, 1, 0.35], scaleX: exiting ? 0 : 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          />

          {/* top row */}
          <div className="flex items-center justify-between">
            <span className="label-micro text-low">QODIX.STUDIO</span>
            <span className="label-micro text-low">EST. INDEPENDENT</span>
          </div>

          {/* center monogram + wordmark */}
          <div className="flex flex-col items-center gap-7">
            <motion.svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              initial="hidden"
              animate="visible"
              className="text-white"
            >
              <motion.circle
                cx="34"
                cy="34"
                r="21"
                stroke="currentColor"
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
              />
              <motion.line
                x1="49"
                y1="49"
                x2="62"
                y2="62"
                stroke="currentColor"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 1.0 }}
              />
            </motion.svg>

            <div className="flex overflow-hidden" aria-label="QODIX">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-4xl leading-none tracking-[0.08em] text-white md:text-5xl"
                  initial={{ y: "115%" }}
                  animate={{ y: exiting ? "-115%" : 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 + i * 0.055 }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>

          {/* bottom row */}
          <div className="flex items-end justify-between">
            <button
              onClick={skip}
              className="label-micro text-low transition-colors duration-300 hover:text-white"
              tabIndex={exiting ? -1 : 0}
            >
              SKIP INTRO ↗
            </button>
            <div className="font-display text-5xl leading-none text-white/90 tabular-nums md:text-6xl">
              {String(progress).padStart(3, "0")}
            </div>
          </div>

          {/* progress hairline */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/70"
            style={{ scaleX: progress / 100 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
