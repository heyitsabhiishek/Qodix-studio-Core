import type { Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_INOUT = [0.76, 0, 0.24, 1] as const;

/** Parent container that staggers its children on enter. */
export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Standard line/element rise reveal. */
export const riseChild: Variants = {
  hidden: { y: 56, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

/** Soft fade for supporting copy. */
export const fadeChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Char-by-char container for headlines. */
export const charParent = (stagger = 0.028, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const charChild: Variants = {
  hidden: { y: "110%", rotate: 4 },
  visible: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.72, ease: EASE_OUT },
  },
};

/** Scroll-triggered viewport config used across sections. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
