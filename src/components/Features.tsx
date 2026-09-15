"use client";

import { motion } from "framer-motion";
import { BadgeIndianRupee, Headset, ShieldCheck, Smartphone, UserCheck, Wrench } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

const features = [
  {
    Icon: UserCheck,
    title: "Experienced, hands-on team",
    description: "Our technicians stay current with solar, electrical, and automation technology to deliver the best solution for your space.",
  },
  {
    Icon: Wrench,
    title: "Design & installation",
    description: "From site survey to final walkthrough, we plan the wiring, panels, solar array, and devices for you — and install it all ourselves.",
  },
  {
    Icon: ShieldCheck,
    title: "Quality assurance",
    description: "Every product and installation meets a high bar for safety and reliability, backed by manufacturer warranties.",
  },
  {
    Icon: Smartphone,
    title: "Remote access, anywhere",
    description: "Monitor your solar generation, cameras, and automated home from your phone, wherever you are.",
  },
  {
    Icon: BadgeIndianRupee,
    title: "Affordable, transparent pricing",
    description: "Competitive rates with no hidden costs, so solar, security, and electrical work stays within reach.",
  },
  {
    Icon: Headset,
    title: "Local support & AMC",
    description: "Real humans on call for emergencies, plus annual maintenance contracts to keep everything running smoothly.",
  },
];

export default function Features() {
  return (
    <section className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why homeowners & businesses choose us"
          title="Built for reliability, backed by real support."
          description="Great power, safety, and automation systems should feel invisible. We handle the complexity so you only notice the convenience."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="card-hover rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400/20 to-indigo-400/10 text-brand">
                <f.Icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
