"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from "@/lib/content";
import { scrollToSection } from "@/lib/smooth-scroll";
import { Magnetic } from "./Magnetic";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion-presets";

type FormState = { 
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

type StepErrors = Partial<Record<keyof FormState, string>>;

function validateStep(step: number, f: FormState): StepErrors {
  const e: StepErrors = {};
  if (step === 0) {
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  }
  if (step === 1) {
    if (!f.projectType) e.projectType = "Select a project type.";
    if (!f.budget) e.budget = "Select a budget range.";
    if (!f.timeline) e.timeline = "Select a timeline.";
  }
  if (step === 2) {
    if (f.description.trim().length < 20) e.description = "Tell us a little more (min. 20 characters).";
  }
  return e;
}

const inputCls =
  "w-full border border-line bg-ink px-4 py-3.5 text-[15px] text-white placeholder:text-low/70 transition-colors duration-300 focus:border-white focus:outline-none";
const labelCls = "label-micro mb-2.5 block text-[9px] text-low";
const errCls = "mt-2 text-xs text-white/80";

const STEP_TITLES = ["ABOUT YOU", "THE PROJECT", "THE VISION"] as const;

export function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<StepErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const next = () => {
    const e = validateStep(step, form);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(2, s + 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateStep(2, form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("sending");
    setServerError("");
    try {
const res = await fetch('https: //api.web3forms.com /submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apikey: '43ef7edd-7fd3-4f56-b7ae-a 06a692cc565', ...form }), });
          const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setReferenceId(data.referenceId);
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  const fieldError = (k: keyof FormState) =>
    errors[k] ? <p className={errCls} role="alert">{errors[k]}</p> : null;

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40" aria-label="Contact QODIX">
      {/* glow backdrop */}
      <div className="glow-orb pointer-events-none absolute left-1/2 top-0 h-[60vmin] w-[80vmin] -translate-x-1/2 opacity-70" aria-hidden />

      <div className="relative mx-auto max-w-[1680px] px-5 md:px-10">
        {/* huge CTA type */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="label-micro text-low"
          >
            09 / START SOMETHING
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="mt-6 font-display leading-[0.88] text-white"
          >
            <span className="block text-[clamp(3rem,9vw,8.5rem)]">HAVE AN IDEA?</span>
            <span className="mt-2 block text-[clamp(2.2rem,6.4vw,6rem)]">
              LET&rsquo;S BUILD <span className="text-outline">SOMETHING</span>
            </span>
            <span className="mt-1 block text-[clamp(2.2rem,6.4vw,6rem)]">
              <span className="font-serif italic tracking-normal text-soft">extraordinary.</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-mid"
          >
            Tell us what you&rsquo;re imagining. Let&rsquo;s explore how technology can bring it to life.
          </motion.p>
        </div>

        {/* form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mx-auto mt-16 max-w-3xl border border-line bg-ink-2/80 backdrop-blur-sm md:mt-20"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="flex flex-col items-center px-6 py-16 text-center md:py-20"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M3 10.5L8 15.5L17 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-8 font-display text-3xl tracking-[0.04em] text-white md:text-4xl">
                  INQUIRY RECEIVED.
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-mid">
                  Thank you, {form.name.split(" ")[0]}. Your project brief is with the studio —
                  we will review it and get back to you shortly.
                </p>
                <p className="label-micro mt-8 border border-line px-4 py-2.5 text-[10px] text-soft">
                  REFERENCE — {referenceId}
                </p>
                <button
                  onClick={() => {
                    setForm(INITIAL);
                    setStep(0);
                    setStatus("idle");
                  }}
                  className="link-line label-micro mt-10 text-low transition-colors hover:text-white"
                >
                  SEND ANOTHER INQUIRY ↗
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={false} className="p-6 md:p-10">
                {/* step header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
                  <div className="flex items-center gap-3">
                    {STEP_TITLES.map((t, i) => (
                      <div key={t} className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => i < step && setStep(i)}
                          className={`label-micro text-[9px] transition-colors duration-300 ${
                            i === step ? "text-white" : i < step ? "text-mid hover:text-white" : "text-low/60"
                          }`}
                          disabled={i >= step}
                        >
                          {String(i + 1).padStart(2, "0")} {t}
                        </button>
                        {i < STEP_TITLES.length - 1 && (
                          <span className="h-px w-6 bg-line" aria-hidden />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1 w-8 transition-colors duration-500 ${i <= step ? "bg-white" : "bg-line"}`}
                      />
                    ))}
                  </div>
                </div>

                <form onSubmit={submit} noValidate>
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.45, ease: EASE_INOUT }}
                        className="grid gap-6 pt-8 md:grid-cols-2"
                      >
                        <div>
                          <label htmlFor="f-name" className={labelCls}>NAME *</label>
                          <input id="f-name" className={inputCls} value={form.name} onChange={set("name")} placeholder="Your full name" autoComplete="name" />
                          {fieldError("name")}
                        </div>
                        <div>
                          <label htmlFor="f-email" className={labelCls}>EMAIL *</label>
                          <input id="f-email" type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@company.com" autoComplete="email" />
                          {fieldError("email")}
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="f-company" className={labelCls}>COMPANY / BUSINESS</label>
                          <input id="f-company" className={inputCls} value={form.company} onChange={set("company")} placeholder="Company or brand name (optional)" autoComplete="organization" />
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.45, ease: EASE_INOUT }}
                        className="grid gap-6 pt-8 md:grid-cols-2"
                      >
                        <div>
                          <label htmlFor="f-type" className={labelCls}>PROJECT TYPE *</label>
                          <select id="f-type" className={`${inputCls} appearance-none`} value={form.projectType} onChange={set("projectType")}>
                            <option value="" disabled>Select a type</option>
                            {PROJECT_TYPES.map((t) => (
                              <option key={t} value={t} className="bg-ink">{t}</option>
                            ))}
                          </select>
                          {fieldError("projectType")}
                        </div>
                        <div>
                          <label htmlFor="f-budget" className={labelCls}>BUDGET RANGE *</label>
                          <select id="f-budget" className={`${inputCls} appearance-none`} value={form.budget} onChange={set("budget")}>
                            <option value="" disabled>Select a range</option>
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b} className="bg-ink">{b}</option>
                            ))}
                          </select>
                          {fieldError("budget")}
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="f-timeline" className={labelCls}>EXPECTED TIMELINE *</label>
                          <select id="f-timeline" className={`${inputCls} appearance-none`} value={form.timeline} onChange={set("timeline")}>
                            <option value="" disabled>Select a timeline</option>
                            {TIMELINES.map((t) => (
                              <option key={t} value={t} className="bg-ink">{t}</option>
                            ))}
                          </select>
                          {fieldError("timeline")}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.45, ease: EASE_INOUT }}
                        className="pt-8"
                      >
                        <div>
                          <label htmlFor="f-desc" className={labelCls}>PROJECT DESCRIPTION *</label>
                          <textarea
                            id="f-desc"
                            rows={5}
                            className={`${inputCls} resize-none`}
                            value={form.description}
                            onChange={set("description")}
                            placeholder="What are you building? What problem does it solve? Anything that helps us understand the vision."
                          />
                          {fieldError("description")}
                        </div>

                        {/* review summary */}
                        <div className="mt-7 grid gap-3 border border-line bg-ink p-5 text-sm sm:grid-cols-2">
                          <Summary label="NAME" value={form.name} />
                          <Summary label="EMAIL" value={form.email} />
                          <Summary label="COMPANY" value={form.company || "—"} />
                          <Summary label="TYPE" value={form.projectType} />
                          <Summary label="BUDGET" value={form.budget} />
                          <Summary label="TIMELINE" value={form.timeline} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* actions */}
                  <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-7">
                    <button
                      type="button"
                      onClick={back}
                      className={`label-micro text-low transition-colors duration-300 hover:text-white ${
                        step === 0 ? "pointer-events-none opacity-0" : ""
                      }`}
                    >
                      ← BACK
                    </button>

                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={next}
                        className="label-micro border border-white/30 px-7 py-3.5 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
                      >
                        CONTINUE →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="label-micro flex items-center gap-3 bg-white px-7 py-3.5 text-ink transition-all duration-300 hover:bg-soft disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border border-ink/30 border-t-ink" aria-hidden />
                            SENDING…
                          </>
                        ) : (
                          "SUBMIT INQUIRY ↗"
                        )}
                      </button>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="mt-5 border border-white/40 bg-white/5 px-4 py-3 text-sm text-white" role="alert">
                      {serverError}
                    </p>
                  )}
                  <p className="label-micro mt-5 text-[8px] leading-relaxed text-low">
                    YOUR BRIEF IS STORED SECURELY AND USED ONLY TO RESPOND TO YOUR INQUIRY.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* secondary CTA */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
          <Magnetic>
            <button
              onClick={() => scrollToSection("home")}
              className="label-micro text-low transition-colors duration-300 hover:text-white"
            >
              START YOUR PROJECT ↗
            </button>
          </Magnetic>
          <span className="hidden h-4 w-px bg-line md:block" aria-hidden />
          <Magnetic>
            <a
              href="mailto: qodixstudio@gmail.com"
              className="link-line label-micro text-low transition-colors duration-300 hover:text-white"
            >
              CONTACT QODIX — qodixstudio@gmail.com
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-baseline gap-3">
      <span className="label-micro shrink-0 text-[8px] text-low">{label}</span>
      <span className="truncate text-mid">{value}</span>
    </p>
  );
}
