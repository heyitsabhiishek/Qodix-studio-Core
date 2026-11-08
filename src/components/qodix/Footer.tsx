"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICES } from "@/lib/content";
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion-presets";

const SOCIALS = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/" },
  { label: "GITHUB", href: "https://github.com/" },
];

const EMAIL = "hello@qodix.studio"; // editable placeholder — replace with the live studio inbox

export function Footer() {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);

  const go = (id: string) => scrollToSection(id);

  return (
    <footer className="relative border-t border-line bg-ink-2" aria-label="Footer">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        {/* top row */}
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="label-micro text-low">QODIX STUDIO</p>
            <p className="mt-4 font-display text-3xl leading-none tracking-[0.04em] text-white md:text-4xl">
              ENGINEERING THE WEB.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-low">
              Independent digital technology studio. Websites, software, AI, and digital
              products — engineered from India, shipped to the world.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="link-line label-micro mt-7 inline-block text-soft transition-colors hover:text-white"
            >
              {EMAIL} ↗
            </a>
          </div>

          <nav className="md:col-span-2 md:col-start-7" aria-label="Footer navigation">
            <p className="label-micro text-low">NAVIGATE</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} className="link-line text-sm text-mid transition-colors hover:text-white">
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => go("contact")} className="link-line text-sm text-mid transition-colors hover:text-white">
                  CONTACT
                </button>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label-micro text-low">SERVICES</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.index}>
                  <button onClick={() => go("services")} className="link-line text-sm text-mid transition-colors hover:text-white">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label-micro text-low">CONNECT</p>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-mid transition-colors hover:text-white"
                  >
                    <span className="link-line">{s.label}</span>
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* giant wordmark */}
        <button
          onClick={scrollToTop}
          className="group block w-full overflow-hidden border-t border-line pt-8 md:pt-10"
          aria-label="Back to top"
        >
          <motion.p
            initial={{ y: "40%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="text-center font-display leading-[0.78] tracking-[0.02em] text-white transition-colors duration-700 group-hover:text-soft"
            style={{ fontSize: "clamp(4.5rem, 21.5vw, 24rem)" }}
          >
            QODIX STUDIO'S
          </motion.p>
        </button>

        {/* legal row */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 md:flex-row">
          <p className="label-micro text-[9px] text-low">
            © {new Date().getFullYear()} QODIX STUDIO — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => setLegal("privacy")} className="label-micro text-[9px] text-low transition-colors hover:text-white">
              PRIVACY POLICY
            </button>
            <button onClick={() => setLegal("terms")} className="label-micro text-[9px] text-low transition-colors hover:text-white">
              TERMS & CONDITIONS
            </button>
          </div>
          <p className="label-micro text-[9px] text-low">Design & Founded By Abhiishek</p>
        </div>
      </div>

      {/* legal modal */}
      <AnimatePresence>
        {legal && (
          <motion.div
            className="fixed inset-0 z-[88] flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setLegal(null)} aria-label="Close" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={legal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_INOUT }}
              className="relative max-h-[80svh] w-full max-w-xl overflow-y-auto border border-line bg-ink-2 p-7 md:p-10"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl tracking-[0.04em] text-white">
                  {legal === "privacy" ? "PRIVACY POLICY" : "TERMS & CONDITIONS"}
                </h3>
                <button
                  onClick={() => setLegal(null)}
                  className="label-micro border border-line px-3 py-2 text-[9px] text-mid transition-colors hover:border-white hover:text-white"
                >
                  CLOSE ✕
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-mid">
                {legal === "privacy" ? (
                  <>
                    <p>
                      QODIX Studio collects only the information you submit through the project
                      inquiry form — your name, email, company, project details, budget range,
                      and timeline. This information is used exclusively to understand and
                      respond to your inquiry.
                    </p>
                    <p>
                      We do not sell, rent, or share your information with third parties. Inquiry
                      records are retained only as long as needed to work with you, and you may
                      request deletion at any time by writing to {EMAIL}.
                    </p>
                    <p>
                      This website does not use advertising trackers. Standard, privacy-respecting
                      analytics may be used to understand aggregate traffic.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      All work delivered by QODIX Studio is governed by a written agreement
                      covering scope, timeline, deliverables, and payment terms agreed before the
                      project begins.
                    </p>
                    <p>
                      Concept projects shown on this website are original works created to
                      demonstrate capability. They are not client deliverables, and any resemblance
                      to existing brands is coincidental.
                    </p>
                    <p>
                      Content, design, and code on this website are the property of QODIX Studio
                      and may not be reproduced without permission. For questions about these
                      terms, contact {EMAIL}.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
