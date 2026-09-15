"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

// Placeholder examples — swap in verified client reviews before launch.
const testimonials = [
  {
    quote:
      "They sized and installed our rooftop hybrid solar system in a few days, and walked us through the app before they left. Our power bill dropped noticeably from the very first month.",
    name: "Rajeev K.",
    role: "Homeowner, Zirakpur",
  },
  {
    quote:
      "Our shop's wiring was outdated and the breaker kept tripping. Electrons rewired the panel, added a servo stabilizer, and set up CCTV across the whole floor — all in one visit.",
    name: "Simran B.",
    role: "Retail shop owner, Zirakpur",
  },
  {
    quote:
      "Called them for an emergency electrical fault late in the evening and someone was at our door within the hour. Fixed it properly instead of a quick patch job.",
    name: "Harpreet S.",
    role: "Homeowner, Panchkula",
  },
];

export default function Testimonials() {
  return (
    <section className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trusted by clients"
          title="Don't just take our word for it."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="card-hover flex flex-col rounded-2xl border border-border bg-surface p-7"
            >
              <Quote className="text-blue-400/40" size={28} />
              <div className="mt-3 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
