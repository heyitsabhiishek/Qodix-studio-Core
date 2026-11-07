"use client";

/** Infinite editorial marquee strip. Decorative — hidden from screen readers. */
export function Marquee({
  words,
  reverse = false,
  className = "",
}: {
  words: { text: string; outline?: boolean }[];
  reverse?: boolean;
  className?: string;
}) {
  const sequence = (
    <>
      {words.map((w, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span
            className={`font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-none tracking-[0.02em] ${
              w.outline ? "text-outline-faint" : "text-white"
            }`}
          >
            {w.text}
          </span>
          <span className="mx-8 inline-block h-2 w-2 rotate-45 bg-white/30 md:mx-12" aria-hidden />
        </span>
      ))}
    </>
  );

  return (
    <div className={`relative overflow-hidden py-6 ${className}`} aria-hidden>
      <div className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        <div className="flex shrink-0 items-center">{sequence}</div>
        <div className="flex shrink-0 items-center">{sequence}</div>
      </div>
    </div>
  );
}
