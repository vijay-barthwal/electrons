"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BatteryCharging,
  Building2,
  Camera,
  Factory,
  Home,
  Lightbulb,
  type LucideIcon,
  Siren,
  Store,
  Sun,
  Wind,
  Zap,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

type SpaceType = {
  key: string;
  label: string;
  SpaceIcon: LucideIcon;
  gradient: string;
  points: { Icon: LucideIcon; text: string }[];
};

const spaces: SpaceType[] = [
  {
    key: "home",
    label: "Home",
    SpaceIcon: Home,
    gradient: "from-blue-400/25 via-blue-400/5 to-transparent",
    points: [
      { Icon: Sun, text: "Rooftop solar to cut monthly power bills" },
      { Icon: Camera, text: "Entry, gate & driveway CCTV coverage" },
      { Icon: Lightbulb, text: "Automated lighting scenes for every room" },
      { Icon: Zap, text: "Rewiring & panel upgrades for older homes" },
    ],
  },
  {
    key: "shop",
    label: "Shop / Retail",
    SpaceIcon: Store,
    gradient: "from-indigo-400/25 via-indigo-400/5 to-transparent",
    points: [
      { Icon: Camera, text: "Till, aisle & entrance camera coverage" },
      { Icon: Siren, text: "Fire alarm & smoke detection for compliance" },
      { Icon: Zap, text: "Display & signage electrical wiring" },
      { Icon: BatteryCharging, text: "Servo stabilizer protection for equipment" },
    ],
  },
  {
    key: "office",
    label: "Office / Commercial",
    SpaceIcon: Building2,
    gradient: "from-sky-400/25 via-sky-400/5 to-transparent",
    points: [
      { Icon: Sun, text: "Rooftop solar to cut daytime power costs" },
      { Icon: BatteryCharging, text: "EV charging points for staff & visitors" },
      { Icon: Zap, text: "Electrical panel & DB upgrades" },
      { Icon: Camera, text: "CCTV & fire alarm, integrated monitoring" },
    ],
  },
  {
    key: "industrial",
    label: "Industrial / Farms",
    SpaceIcon: Factory,
    gradient: "from-blue-300/25 via-indigo-300/10 to-transparent",
    points: [
      { Icon: Zap, text: "Industrial-grade wiring & panel installation" },
      { Icon: Wind, text: "Hybrid solar + wind power for remote sites" },
      { Icon: Camera, text: "Perimeter CCTV with night vision" },
      { Icon: Siren, text: "Fire alarm systems for compliance" },
    ],
  },
];

export default function Showcase() {
  const [active, setActive] = useState(spaces[0].key);
  const space = spaces.find((r) => r.key === active)!;

  return (
    <section id="showcase" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="See it in action"
          title="Solutions tailored to every space."
          description="Tap a space type to see the kind of solar, electrical, safety & automation work we typically design for it."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {spaces.map((r) => (
            <button
              key={r.key}
              onClick={() => setActive(r.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                active === r.key
                  ? "bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
                  : "border border-border text-muted hover:text-foreground"
              }`}
            >
              <r.SpaceIcon size={16} />
              {r.label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-10">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${space.gradient}`} />
          <AnimatePresence mode="wait">
            <motion.div
              key={space.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
            >
              <div className="order-2 flex justify-center lg:order-1">
                <div className="flex h-40 w-40 items-center justify-center rounded-[2rem] glass-strong sm:h-56 sm:w-56">
                  <space.SpaceIcon size={64} className="text-brand" strokeWidth={1.5} />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-semibold">{space.label}</h3>
                <ul className="mt-6 space-y-4">
                  {space.points.map((a, i) => (
                    <motion.li
                      key={a.text}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE }}
                      className="flex items-start gap-3 rounded-xl bg-foreground/5 p-3.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-400/15 text-brand">
                        <a.Icon size={16} />
                      </span>
                      <span className="pt-1.5 text-sm text-foreground/90">{a.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
