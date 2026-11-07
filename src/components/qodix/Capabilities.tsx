"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CURRENT_WEB, CURRENT_INFRA, FUTURE_TECH } from "@/lib/content";
import { SectionHeading, Fade } from "./Reveal";
import { viewportOnce, fadeChild, staggerParent } from "@/lib/motion-presets";

type Node = { label: string; angle: number; dist: number; tier: "current" | "infra" | "future" };

const GROUPS = [
  { name: "WEB TECHNOLOGIES", items: CURRENT_WEB, tier: "current" as const },
  { name: "BACKEND & INFRASTRUCTURE", items: CURRENT_INFRA, tier: "infra" as const },
  { name: "IN EXPLORATION", items: FUTURE_TECH, tier: "future" as const },
];

const DISPLAY: Record<string, string> = {
  "ARTIFICIAL INTELLIGENCE": "AI",
  "CLOUD SYSTEMS": "CLOUD",
  "API INTEGRATIONS": "APIs",
};

/** Radial constellation: QODIX core connected to every technology. */
function Constellation({ hovered, setHovered }: { hovered: string | null; setHovered: (v: string | null) => void }) {
  const nodes = useMemo<Node[]>(() => {
    const all: { label: string; tier: Node["tier"] }[] = [
      ...CURRENT_WEB.map((l) => ({ label: l, tier: "current" as const })),
      ...CURRENT_INFRA.map((l) => ({ label: l, tier: "infra" as const })),
      ...FUTURE_TECH.map((l) => ({ label: l, tier: "future" as const })),
    ];
    const count = all.length;
    return all.map((n, i) => ({
      ...n,
      angle: (i / count) * Math.PI * 2 - Math.PI / 2,
      dist: i % 2 === 0 ? 150 : 184,
    }));
  }, []);

  const cx = 320;
  const cy = 250;

  const tierStyles: Record<Node["tier"], { circle: string; text: string; line: string }> = {
    current: { circle: "rgba(255,255,255,0.9)", text: "#ffffff", line: "rgba(255,255,255,0.35)" },
    infra: { circle: "rgba(255,255,255,0.55)", text: "#b5b5b5", line: "rgba(255,255,255,0.18)" },
    future: { circle: "rgba(255,255,255,0.25)", text: "#777777", line: "rgba(255,255,255,0.08)" },
  };

  return (
    <svg viewBox="0 0 640 500" className="h-auto w-full" role="img" aria-label="QODIX technology constellation">
      <defs>
        <radialGradient id="core-glow">
          <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r="140" fill="url(#core-glow)" />
      <circle cx={cx} cy={cy} r="175" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 6" />

      {nodes.map((n) => {
        const x = Math.round((cx + Math.cos(n.angle) * n.dist) * 100) / 100;
        const y = Math.round((cy + Math.sin(n.angle) * n.dist) * 100) / 100;
        const s = tierStyles[n.tier];
        const isHovered = hovered === n.label;
        return (
          <g key={n.label}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={isHovered ? "rgba(255,255,255,0.9)" : s.line}
              strokeWidth={isHovered ? 1.4 : 1}
              strokeDasharray="4 8"
              className={hovered && !isHovered ? "opacity-40" : "animate-dash-flow"}
            />
            <circle cx={x} cy={y} r={isHovered ? 6 : 4} fill={isHovered ? "#ffffff" : s.circle} className="transition-all duration-300" />
            <text
              x={x + Math.round(Math.cos(n.angle) * 22 * 100) / 100}
              y={y + Math.round(Math.sin(n.angle) * 22 * 100) / 100 + 4}
              textAnchor={Math.cos(n.angle) > 0.25 ? "start" : Math.cos(n.angle) < -0.25 ? "end" : "middle"}
              fill={isHovered ? "#ffffff" : s.text}
              fontSize="10.5"
              letterSpacing="2"
              style={{ fontFamily: "var(--font-grotesk)", textTransform: "uppercase", transition: "fill .3s" }}
            >
              {DISPLAY[n.label] ?? n.label}
            </text>
            {/* generous hit area */}
            <circle
              cx={x}
              cy={y}
              r="26"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHovered(n.label)}
              onMouseLeave={() => setHovered(null)}
            />
          </g>
        );
      })}

      {/* core */}
      <circle cx={cx} cy={cy} r="32" fill="#050505" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="5" fill="#ffffff" className="animate-pulse-dot" />
      <text
        x={cx}
        y={cy + 52}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="13"
        letterSpacing="6"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        QODIX
      </text>
    </svg>
  );
}

export function Capabilities() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="capabilities" className="relative py-28 md:py-40" aria-label="Capabilities and technology">
      <div className="pointer-events-none absolute inset-0 bg-ink-2/50" aria-hidden />
      <div className="relative mx-auto max-w-[1680px] px-5 md:px-10">
        <SectionHeading index="04" label="OUR CAPABILITIES" title={"ENGINEERED FOR\nPOSSIBILITIES."} />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          {/* constellation */}
          <Fade className="order-2 md:order-1 md:col-span-6">
            <div className="mx-auto max-w-[520px]">
              <Constellation hovered={hovered} setHovered={setHovered} />
              <p className="label-micro mt-4 text-center text-[9px] text-low">
                HOVER A NODE — CURRENT · INFRASTRUCTURE · EXPLORATION
              </p>
            </div>
          </Fade>

          {/* groups */}
          <div className="order-1 md:order-2 md:col-span-5 md:col-start-8">
            <motion.div
              variants={staggerParent(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-10"
            >
              {GROUPS.map((g) => (
                <motion.div key={g.name} variants={fadeChild}>
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h3 className="label-micro text-mid">{g.name}</h3>
                    <span
                      className={`label-micro border px-2 py-1 text-[8px] ${
                        g.tier === "future"
                          ? "border-white/30 text-low"
                          : "border-white/70 text-white"
                      }`}
                    >
                      {g.tier === "future" ? "EXPLORING" : "ACTIVE"}
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {g.items.map((t) => (
                      <li
                        key={t}
                        onMouseEnter={() => setHovered(t)}
                        onMouseLeave={() => setHovered(null)}
                        className={`label-micro border px-4 py-2.5 text-[9px] transition-all duration-300 ${
                          g.tier === "future"
                            ? "border-line text-low"
                            : "border-line text-soft hover:border-white hover:bg-white hover:text-ink"
                        } ${hovered === t ? "border-white bg-white text-ink" : ""}`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {g.tier === "future" && (
                    <p className="mt-3 max-w-sm text-xs leading-relaxed text-low">
                      Directions we are actively studying — not yet offered as studio services.
                      We add a technology to this list only when we can stand behind it.
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
