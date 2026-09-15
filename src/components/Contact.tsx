"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

const interests = [
  "Solar System (On-Grid/Off-Grid/Hybrid)",
  "Electrical Installation & Panels",
  "Electrical Repairs",
  "Fire Alarm System",
  "CCTV Cameras",
  "Home / Building Automation",
  "Car Charger / Charging Station",
  "Servo Stabilizer",
  "Wind Turbine",
  "Maintenance & AMC",
  "24/7 Emergency Service",
  "Other",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          interest: data.get("interest"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  }

  return (
    <section id="contact" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Ready to power up & automate your space?"
          description="Tell us about your home or business and what you'd like installed — we'll follow up with a free, no-obligation site visit."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-2 space-y-4 lg:order-1 lg:col-span-2"
          >
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold">Contact details</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <User size={18} className="mt-0.5 shrink-0 text-brand" />
                  <span className="text-foreground/90">{siteConfig.proprietor}, Proprietor</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-brand" />
                  <span className="flex flex-col text-foreground/90">
                    <a href={siteConfig.phoneHref} className="hover:text-foreground">
                      {siteConfig.phone}
                    </a>
                    <a href={siteConfig.phone2Href} className="hover:text-foreground">
                      {siteConfig.phone2}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-brand" />
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 hover:text-foreground"
                  >
                    Message us on WhatsApp
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-brand" />
                  <a href={`mailto:${siteConfig.email}`} className="text-foreground/90 hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                  <span className="text-foreground/90">{siteConfig.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-brand" />
                  <span className="text-foreground/90">
                    {siteConfig.hours}
                    <br />
                    <span className="text-muted">{siteConfig.emergencyHours}</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-400/10 to-transparent p-6">
              <p className="text-sm leading-relaxed text-foreground/90">
                Prefer to talk it through first? Call or WhatsApp us directly — we&rsquo;re happy
                to answer quick questions before you fill out anything.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-1 lg:order-2 lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8"
            >
              {/* Honeypot field — hidden from real users, catches simple bots */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name <span className="text-brand">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email <span className="text-brand">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={150}
                    placeholder="you@example.com"
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={30}
                    placeholder="+91 00000 00000"
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="interest" className="mb-1.5 block text-sm font-medium">
                    Interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    defaultValue=""
                    className="input-field"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {interests.map((i) => (
                      <option key={i} value={i} className="bg-surface-2">
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message <span className="text-brand">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Tell us about your space and what you'd like installed..."
                    className="input-field resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary mt-6 w-full sm:w-auto sm:min-w-48"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    Thanks! Your message has been sent — we&rsquo;ll get back to you shortly.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-700 dark:text-red-300"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
