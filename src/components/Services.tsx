"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { services, type Service } from "@/lib/services";
import SectionHeading from "./SectionHeading";

const VISIBLE_COUNT = 6;

function ServiceCard({ s }: { s: Service }) {
  return (
    <motion.div
      variants={fadeUp}
      className="card-hover group overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={s.image}
          alt={s.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${s.gradient} mix-blend-overlay`} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
          <s.Icon size={18} strokeWidth={2} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-base font-semibold">{s.title}</h3>
        <p className="mt-1 text-xs font-medium text-brand">{s.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
        <ul className="mt-4 space-y-2">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-foreground/80">
              <Check size={14} className="mt-0.5 shrink-0 text-brand" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState(false);
  const primary = services.slice(0, VISIBLE_COUNT);
  const rest = services.slice(VISIBLE_COUNT);

  return (
    <section id="services" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title="Solar, electrical, safety & automation — handled end to end."
          description="At Electrons, we offer a comprehensive range of services to cover your power, safety, and smart-space needs, from a single point of contact."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {primary.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </motion.div>

        {/* Animated on mount (not whileInView) — the grid above already fired
            its scroll-triggered "visible" state once (viewportOnce.once),
            so newly mounted cards here would never get a trigger to appear
            if they relied on that same scroll observer. */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="more-services"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer(0.08)}
              className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((s) => (
                <ServiceCard key={s.title} s={s} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {rest.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="btn-outline"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show more services <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
