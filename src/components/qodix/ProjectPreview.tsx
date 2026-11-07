"use client";

import type { Project } from "@/lib/content";

/**
 * Handcrafted monochrome preview compositions — each concept project gets an
 * original abstract "screenshot" built from pure CSS/SVG (no stock imagery).
 */

function BrowserFrame({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="flex h-full w-full flex-col border border-line bg-ink-2">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="label-micro ml-2 truncate text-[7px] text-low">{url}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export function ProjectPreview({ project, variant = "thumb" }: { project: Project; variant?: "thumb" | "wide" | "phone" }) {
  const k = project.previewKind;
  const dense = variant === "thumb";

  if (variant === "phone") {
    return (
      <div className="mx-auto flex h-full w-full max-w-[150px] flex-col rounded-[18px] border border-line bg-ink-2 p-2">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
        <div className="flex-1 overflow-hidden rounded-md border border-line/60 bg-ink p-2">
          {k === "dashboard" ? (
            <div className="space-y-1.5">
              <div className="h-1.5 w-2/3 bg-white/40" />
              <div className="h-8 bg-white/10" />
              <div className="grid grid-cols-2 gap-1">
                <div className="h-6 bg-white/[0.07]" />
                <div className="h-6 bg-white/[0.07]" />
              </div>
              <div className="h-1 w-1/2 bg-white/25" />
              <div className="h-1 w-2/3 bg-white/15" />
            </div>
          ) : k === "commerce" ? (
            <div className="grid grid-cols-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className={`aspect-square ${i === 1 ? "bg-white/25" : "bg-white/[0.08]"}`} />
                  <div className="h-1 w-3/4 bg-white/25" />
                </div>
              ))}
            </div>
          ) : k === "ai" ? (
            <div className="space-y-1.5">
              <div className="ml-auto h-4 w-3/4 bg-white/25" />
              <div className="h-6 w-full border border-line bg-white/[0.05]" />
              <div className="h-4 w-2/3 bg-white/20" />
              <div className="h-6 w-full border border-line bg-white/[0.05]" />
            </div>
          ) : (
            <div className="flex h-full flex-col justify-center gap-1.5">
              <div className="h-2.5 w-full bg-white/50" />
              <div className="h-2.5 w-3/4 bg-white/30" />
              <div className="mt-2 h-8 w-full border border-line" />
              <div className="h-1 w-1/2 bg-white/25" />
            </div>
          )}
        </div>
      </div>
    );
  }

  const body = () => {
    switch (k) {
      case "landing":
        return (
          <BrowserFrame url="meridian.studio">
            <div className="flex h-full flex-col justify-between p-[6%]">
              <div className="flex items-center justify-between">
                <div className="h-2 w-10 bg-white/70" />
                <div className="flex gap-2">
                  <div className="h-1 w-8 bg-white/25" />
                  <div className="h-1 w-8 bg-white/25" />
                </div>
              </div>
              <div className={`font-display leading-[0.9] ${dense ? "text-3xl" : "text-5xl"} text-white`}>
                SPACE / LIGHT
                <br />
                <span className="text-outline-faint">FORM</span>
              </div>
              <div className="flex items-end justify-between gap-[6%]">
                <div className="h-1 w-1/4 bg-white/30" />
                <div className="h-[46%] w-[38%] bg-gradient-to-b from-white/20 to-white/[0.04]" />
                <div className="h-[30%] w-[26%] border border-line" />
              </div>
            </div>
          </BrowserFrame>
        );
      case "commerce":
        return (
          <BrowserFrame url="auric.store">
            <div className="flex h-full">
              <div className="hidden w-1/3 flex-col justify-between border-r border-line p-[5%] md:flex">
                <div className="font-display text-xl leading-none text-white">AURIC</div>
                <div className="space-y-1.5">
                  <div className="h-1 w-3/4 bg-white/30" />
                  <div className="h-1 w-1/2 bg-white/20" />
                  <div className="h-1 w-2/3 bg-white/20" />
                </div>
                <div className="label-micro text-[7px] text-low">FW / 26</div>
              </div>
              <div className="grid flex-1 grid-cols-3 gap-[4%] p-[5%]">
                {[0.75, 0.12, 0.3, 0.14, 0.6, 0.1].map((o, i) => (
                  <div key={i} className="group relative bg-white/[0.05]">
                    <div className="absolute inset-0 bg-white transition-all duration-500" style={{ opacity: o }} />
                    <div className="absolute bottom-1 left-1 h-1 w-1/2 bg-black/40" />
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        );
      case "dashboard":
        return (
          <BrowserFrame url="pulseboard.app">
            <div className="flex h-full">
              <div className="hidden w-12 flex-col gap-2 border-r border-line p-2 md:flex">
                <div className="h-1.5 w-full bg-white/60" />
                <div className="h-1 w-full bg-white/15" />
                <div className="h-1 w-full bg-white/15" />
                <div className="h-1 w-3/4 bg-white/15" />
              </div>
              <div className="flex-1 p-[4%]">
                <div className="mb-[3%] flex items-center justify-between">
                  <div className="h-1.5 w-16 bg-white/50" />
                  <div className="h-1 w-8 border border-line" />
                </div>
                <div className="grid grid-cols-3 gap-[3%]">
                  {["A", "B", "C"].map((_, i) => (
                    <div key={i} className="border border-line p-[6%]">
                      <div className="mb-1 h-1 w-2/3 bg-white/20" />
                      <div className="font-display text-lg text-white">{[64.2, 12.8, 3.1][i]}%</div>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 100 26" className="mt-[4%] h-[34%] w-full" preserveAspectRatio="none">
                  <polyline points="0,20 12,16 24,18 36,10 48,13 60,7 72,9 84,4 100,6" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" />
                  <polyline points="0,24 14,22 28,23 42,19 56,21 70,16 84,18 100,13" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </BrowserFrame>
        );
      case "experience":
        return (
          <div className="relative h-full w-full overflow-hidden border border-line bg-black">
            <div className="glow-orb absolute inset-[-30%]" />
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
              {[86, 68, 50, 32].map((r, i) => (
                <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={`rgba(255,255,255,${0.5 - i * 0.1})`} strokeWidth="0.8" strokeDasharray={i % 2 ? "3 5" : undefined} />
              ))}
              <line x1="100" y1="14" x2="100" y2="186" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <line x1="14" y1="100" x2="186" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-display text-white ${dense ? "text-4xl" : "text-6xl"} tracking-[0.1em]`}>N°8</span>
              <span className="label-micro mt-1 text-[7px] text-mid">NOCTURNE — INTERACTIVE RELEASE</span>
            </div>
          </div>
        );
      case "ai":
        return (
          <BrowserFrame url="atlas.ai">
            <div className="flex h-full flex-col gap-[3%] p-[5%]">
              <div className="flex items-center gap-2">
                <div className="flex h-4 w-4 items-center justify-center border border-white/60 font-display text-[9px] text-white">A</div>
                <div className="h-1 w-20 bg-white/40" />
              </div>
              <div className="ml-auto w-2/3 bg-white/25 px-2 py-1.5">
                <div className="h-1 w-full bg-black/50" />
                <div className="mt-1 h-1 w-2/3 bg-black/40" />
              </div>
              <div className="w-5/6 border border-line bg-white/[0.04] p-2">
                <div className="h-1 w-full bg-white/30" />
                <div className="mt-1 h-1 w-5/6 bg-white/20" />
                <div className="mt-1 h-1 w-3/4 bg-white/20" />
                <div className="mt-2 flex gap-1.5">
                  <span className="label-micro border border-line px-1 py-0.5 text-[6px] text-low">SRC 01</span>
                  <span className="label-micro border border-line px-1 py-0.5 text-[6px] text-low">SRC 02</span>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 border border-line px-2 py-1.5">
                <div className="h-1 w-1/2 bg-white/20" />
                <div className="ml-auto h-2.5 w-2.5 bg-white/70" />
              </div>
            </div>
          </BrowserFrame>
        );
      case "brand":
        return (
          <BrowserFrame url="terraform.in">
            <div className="flex h-full flex-col p-[5%]">
              <div className="flex items-baseline justify-between">
                <div className="font-display text-2xl leading-none text-white">TERRA FORM</div>
                <div className="label-micro text-[7px] text-low">MATERIALS / 2025</div>
              </div>
              <div className="mt-[4%] flex-1 border-t border-line">
                {["RAMMED EARTH", "CHARRED TIMBER", "RECYCLED STEEL", "HEMPCRETE"].map((m, i) => (
                  <div key={m} className="flex items-center justify-between border-b border-line py-[3.5%]">
                    <span className="font-display text-[11px] tracking-[0.08em] text-soft">{m}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-white/10">
                        <div className="h-full bg-white/60" style={{ width: `${[80, 62, 45, 70][i]}%` }} />
                      </div>
                      <span className="label-micro text-[7px] text-low">{["A+", "A", "B+", "A+"][i]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BrowserFrame>
        );
    }
  };

  if (variant === "wide") {
    return <div className="aspect-[16/10] w-full">{body()}</div>;
  }
  return <div className="h-full w-full">{body()}</div>;
}
