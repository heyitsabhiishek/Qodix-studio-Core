"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeChild, riseChild, staggerParent, viewportOnce, EASE_OUT } from "@/lib/motion-presets";

/** Standard scroll-triggered rise reveal wrapper. */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={riseChild}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Soft fade-up for supporting copy. */
export function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeChild}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Editorial section header: number / label + hairline + oversized display title. */
export function SectionHeading({
  index,
  label,
  title,
  className = "",
  align = "left",
}: {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={className}>
      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <motion.span variants={fadeChild} className="label-micro text-low">
          {index}
        </motion.span>
        <motion.span variants={fadeChild} className="h-px w-10 bg-line" aria-hidden />
        <motion.span variants={fadeChild} className="label-micro text-mid">
          {label}
        </motion.span>
      </motion.div>

      <motion.h2
        variants={staggerParent(0.09, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`mt-6 font-display leading-[0.92] tracking-[0.005em] text-white ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <TitleLines title={title} />
      </motion.h2>
    </div>
  );
}

function TitleLines({ title }: { title: ReactNode }) {
  if (typeof title !== "string") {
    return (
      <span className="block overflow-hidden">
        <motion.span variants={riseChild} className="display-section block">
          {title}
        </motion.span>
      </span>
    );
  }
  return (
    <>
      {title.split("\n").map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={riseChild} className="display-section block">
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Character-by-character masked reveal for hero-scale headlines. */
export function CharsReveal({
  text,
  started,
  delay = 0,
  stagger = 0.03,
  className = "",
}: {
  text: string;
  started: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${className}`} aria-label={text} role="text">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={{ y: "112%", rotate: 3 }}
          animate={started ? { y: 0, rotate: 0 } : { y: "112%", rotate: 3 }}
          transition={{ duration: 0.85, ease: EASE_OUT, delay: delay + i * stagger }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
