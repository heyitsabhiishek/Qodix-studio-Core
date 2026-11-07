"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Editorial custom cursor: a precise dot + lagging ring that expands over
 * interactive elements and shows contextual labels. Desktop (fine pointer)
 * only, disabled for reduced-motion users.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;

    let rafId = 0;
    rafId = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      setActive(Boolean(interactive));
      const labelled = target?.closest("[data-cursor-label]") as HTMLElement | null;
      setLabel(labelled?.dataset.cursorLabel ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      {/* lagging ring / label */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] flex items-center justify-center rounded-full border border-white/50 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 84 : active ? 52 : 34,
          height: label ? 84 : active ? 52 : 34,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {label && (
          <span className="label-micro text-[9px] font-semibold text-black">{label}</span>
        )}
      </motion.div>
    </>
  );
}
