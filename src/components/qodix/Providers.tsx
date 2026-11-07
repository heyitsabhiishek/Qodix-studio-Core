"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Preloader } from "./Preloader";
import { CustomCursor } from "./CustomCursor";

/** Client shell: reduced-motion config, Lenis smooth scroll, preloader, cursor. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Preloader />
        <CustomCursor />
        {children}
      </SmoothScroll>
    </MotionConfig>
  );
}
