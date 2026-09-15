"use client";

import { motion } from "framer-motion";
import { ClipboardList, Compass, PlugZap, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    Icon: Compass,
    title: "Free site visit",
    description: "We walk your home, shop, or site and understand what you actually want powered, secured, wired, or automated.",
  },
  {
    Icon: ClipboardList,
    title: "Custom quote & design",
    description: "We map out solar capacity, panels, cameras, and devices tailored to your load, roof, and budget — no guesswork.",
  },
  {
    Icon: PlugZap,
    title: "Expert installation",
    description: "Our team installs, wires, and configures everything — cleanly, safely, and on schedule.",
  },
  {
    Icon: Sparkles,
    title: "Handover & support",
    description: "We walk you through the app and controls, then stay on call for AMC and emergency support.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our process"
          title="From first call to fully installed."
          description="A clear, four-step process so you always know what happens next."
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="pointer-events-none absolute top-8 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block" />

          {steps.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="relative text-center lg:text-left">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl glass-strong text-brand lg:mx-0">
                <s.Icon size={24} strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
