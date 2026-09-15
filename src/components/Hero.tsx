"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { fadeUp, staggerContainer, EASE } from "@/lib/motion";
import { services } from "@/lib/services";
import AppPreview from "./AppPreview";

const stats = [
  { value: `${services.length}+`, label: "Specialized services" },
  { value: "3-in-1", label: "On-grid, off-grid & hybrid solar" },
  { value: "24/7", label: "Emergency support" },
  { value: "Free", label: "Site visit & quote" },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 noise-grid opacity-40" />
      <motion.div
        className="pointer-events-none absolute -top-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-[110px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-20 right-[-160px] -z-10 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[110px]"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-8">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <Sparkles size={14} /> Electricals &middot; Solar &middot; Automation
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Your trusted partner
              <br />
              <span className="gradient-text">for power & automation.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
            >
              We design and install on-grid, off-grid & hybrid solar systems, electrical
              wiring & panels, fire alarm systems, CCTV, home automation, and EV charging
              stations across Zirakpur and the tricity area.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button onClick={() => scrollTo("#contact")} className="btn-primary w-full sm:w-auto">
                Get a Free Consultation <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("#services")} className="btn-outline w-full sm:w-auto">
                Explore Services
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand" /> Contractor & Suppliers, Zirakpur
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wrench size={14} className="text-brand" /> Experienced Electricians
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-400/25 via-indigo-400/10 to-transparent blur-2xl" />
            <AppPreview />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-6 lg:mt-20"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass card-hover rounded-2xl px-4 py-5 text-center sm:py-6"
            >
              <div className="text-2xl font-bold text-foreground sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
