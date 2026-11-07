"use client";

import { motion } from "framer-motion";
import { COLLABORATION_COMMITMENTS } from "@/lib/content";
import { SectionHeading, Fade } from "./Reveal";
import { viewportOnce, fadeChild, staggerParent } from "@/lib/motion-presets";

export function Voices() {
  return (
    <section id="voices" className="relative py-28 md:py-40" aria-label="Client experience">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SectionHeading index="07" label="CLIENT EXPERIENCES" title={"BUILT ON TRUST."} />

            <Fade className="mt-10 max-w-xl space-y-6 text-[15px] leading-relaxed text-mid md:text-base">
              <p>
                QODIX is a young studio, and we are deliberate about how we grow. We do not
                borrow quotes, invent clients, or display borrowed logos. Trust is earned one
                project at a time — and this section will carry the words of real clients as
                those projects ship.
              </p>
              <p className="text-low">
                Until then, this is the collaboration we commit to on every engagement:
              </p>
            </Fade>

            <motion.ul
              variants={staggerParent(0.09)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-12 border-t border-line"
            >
              {COLLABORATION_COMMITMENTS.map((c, i) => (
                <motion.li
                  key={c.title}
                  variants={fadeChild}
                  className="group grid gap-2 border-b border-line py-6 transition-colors duration-500 hover:bg-elevated md:grid-cols-[64px_240px_1fr] md:items-baseline md:gap-8"
                >
                  <span className="font-display text-sm text-low">0{i + 1}</span>
                  <h3 className="font-display text-lg tracking-[0.06em] text-white md:text-xl">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-low transition-colors duration-300 group-hover:text-mid">
                    {c.text}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* founder note — genuine, attributed */}
          <div className="md:col-span-4 md:col-start-9">
            <Fade className="md:sticky md:top-32">
              <figure className="border border-line bg-ink-2 p-7 md:p-9">
                <span className="font-serif text-6xl leading-none text-white/30" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-serif text-[22px] italic leading-snug text-soft md:text-2xl">
                  We treat every build like it carries our own name — because on every commit,
                  it does.
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 font-display text-sm text-white">
                    A
                  </span>
                  <div>
                    <p className="font-display text-base tracking-[0.08em] text-white">ABHIISHEK</p>
                    <p className="label-micro mt-0.5 text-[9px] text-low">FOUNDER, QODIX STUDIO</p>
                  </div>
                </figcaption>
              </figure>

              <p className="label-micro mt-6 text-[9px] leading-relaxed text-low">
                GENUINE CLIENT TESTIMONIALS WILL BE FEATURED HERE AS PROJECTS COMPLETE.
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
