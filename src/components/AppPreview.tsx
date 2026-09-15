"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Battery,
  Bell,
  BedDouble,
  Camera,
  Lightbulb,
  ShieldAlert,
  ShieldCheck,
  Sofa,
  Sun,
  Sunset,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { EASE } from "@/lib/motion";

const feeds = ["Front Gate", "Shop Floor", "Back Door", "Parking"];

const rooms = [
  { room: "Living Room", Icon: Sofa, defaultOn: true },
  { room: "Bedroom", Icon: BedDouble, defaultOn: true },
  { room: "Kitchen", Icon: UtensilsCrossed, defaultOn: false },
  { room: "Porch", Icon: Sunset, defaultOn: true },
];

const solarModes = ["On-Grid", "Off-Grid", "Hybrid"] as const;
type SolarMode = (typeof solarModes)[number];

const zones = ["Perimeter Sensors", "Motion Detectors", "Smoke Detectors"];

const tabs = [
  { key: "cameras", label: "Cameras", Icon: Camera },
  { key: "automation", label: "Automation", Icon: Lightbulb },
  { key: "solar", label: "Solar", Icon: Sun },
  { key: "alarm", label: "Alarm", Icon: ShieldCheck },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const panelMeta: Record<TabKey, { title: string; HeaderIcon: typeof ShieldCheck }> = {
  cameras: { title: "Live Monitoring", HeaderIcon: ShieldCheck },
  automation: { title: "Automation Scenes", HeaderIcon: Lightbulb },
  solar: { title: "Solar Dashboard", HeaderIcon: Sun },
  alarm: { title: "Fire & Security Alarm", HeaderIcon: ShieldAlert },
};

export default function AppPreview() {
  const [tab, setTab] = useState<TabKey>("cameras");
  const [focusedFeed, setFocusedFeed] = useState<string | null>(null);
  const [lights, setLights] = useState(() =>
    Object.fromEntries(rooms.map((r) => [r.room, r.defaultOn]))
  );
  const [solarMode, setSolarMode] = useState<SolarMode>("Hybrid");
  const [armed, setArmed] = useState(true);

  const lightsOnCount = Object.values(lights).filter(Boolean).length;
  const batteryPct = solarMode === "On-Grid" ? 0 : solarMode === "Off-Grid" ? 82 : 64;

  const meta = panelMeta[tab];
  const subtitle =
    tab === "cameras"
      ? "4 devices online"
      : tab === "automation"
        ? `${lightsOnCount} of ${rooms.length} lights on`
        : tab === "solar"
          ? `${solarMode} mode`
          : armed
            ? "3 zones armed"
            : "System disarmed";

  return (
    <div className="relative mx-auto w-full max-w-sm py-6">
      {/* Floating notification — motion alert */}
      <motion.div
        initial={{ opacity: 0, y: -8, x: -8 }}
        animate={{ opacity: 1, y: [0, -7, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.9 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-2 -top-2 z-20 hidden items-center gap-2.5 rounded-2xl glass-strong px-3.5 py-2.5 shadow-lg sm:-left-7 sm:-top-4 sm:flex"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
          <Bell size={14} />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold">Motion detected</p>
          <p className="text-[10px] text-muted">Front gate &middot; just now</p>
        </div>
      </motion.div>

      {/* Floating notification — solar generation */}
      <motion.div
        initial={{ opacity: 0, y: 8, x: 8 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
        className="absolute -right-2 -bottom-2 z-20 hidden items-center gap-2.5 rounded-2xl glass-strong px-3.5 py-2.5 shadow-lg sm:-right-6 sm:-bottom-4 sm:flex"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
          <Sun size={14} />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold">18.4 kWh generated</p>
          <p className="text-[10px] text-muted">Today &middot; solar</p>
        </div>
      </motion.div>

      {/* App card */}
      <motion.div layout className="relative z-10 rounded-[2rem] border border-border-strong bg-surface p-5 shadow-2xl sm:p-6">
        <motion.div layout="position" className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
              <meta.HeaderIcon size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">{meta.title}</p>
              <p className="text-[11px] text-muted">{subtitle}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-500">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Online
          </span>
        </motion.div>

        <div className="mt-4 min-h-[172px]">
          <AnimatePresence mode="wait">
            {tab === "cameras" && (
              <motion.div
                key="cameras"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid grid-cols-2 gap-2.5"
              >
                {feeds.map((label, i) => {
                  const isFocused = focusedFeed === label;
                  return (
                    <motion.button
                      key={label}
                      type="button"
                      onClick={() => setFocusedFeed(isFocused ? null : label)}
                      whileTap={{ scale: 0.96 }}
                      animate={{ scale: isFocused ? 1.04 : 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-left outline-none ${
                        isFocused ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-surface" : ""
                      }`}
                    >
                      <motion.div
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent"
                        animate={{ x: ["-120%", "220%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                      />
                      <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-black/40 px-1.5 py-0.5 text-[8px] font-medium text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                      </span>
                      <Camera size={18} className="absolute inset-0 m-auto text-white/20" />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] font-medium text-white/80">
                        {label}
                      </span>
                      {isFocused && (
                        <span className="absolute right-1.5 top-1.5 rounded-full bg-blue-500 px-1.5 py-0.5 text-[8px] font-medium text-white">
                          Now
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}

            {tab === "automation" && (
              <motion.div
                key="automation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-amber-400/10 via-transparent to-transparent p-3"
              >
                <div className="space-y-2">
                  {rooms.map((r) => {
                    const on = lights[r.room];
                    return (
                      <button
                        key={r.room}
                        type="button"
                        onClick={() => setLights((prev) => ({ ...prev, [r.room]: !prev[r.room] }))}
                        className="flex w-full items-center justify-between rounded-lg bg-foreground/5 px-3 py-2"
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                              on ? "bg-amber-400/20 text-amber-500" : "bg-foreground/10 text-muted"
                            }`}
                          >
                            <r.Icon size={14} />
                          </span>
                          <span className="text-xs font-medium text-foreground/90">{r.room}</span>
                        </span>
                        <span
                          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                            on ? "bg-amber-400" : "bg-foreground/15"
                          }`}
                        >
                          <motion.span
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 32 }}
                            className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
                            style={{ left: on ? "18px" : "2px" }}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {tab === "solar" && (
              <motion.div
                key="solar"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-xl border border-border bg-foreground/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                    <Sun size={26} />
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-amber-300"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">18.4 kWh generated today</p>
                    <p className="mt-0.5 text-[11px] text-muted">Battery: {batteryPct > 0 ? `${batteryPct}%` : "Grid-tied"}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-1.5">
                  {solarModes.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSolarMode(m)}
                      className={`flex-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors ${
                        solarMode === m
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                          : "bg-foreground/5 text-muted"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between rounded-lg bg-foreground/5 px-3 py-1.5">
                  <span className="flex items-center gap-2 text-xs text-foreground/90">
                    <Battery size={12} className="text-brand" /> Battery storage
                  </span>
                  <span className="text-[10px] font-medium text-emerald-500">
                    {batteryPct > 0 ? `${batteryPct}% charged` : "N/A"}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between rounded-lg bg-foreground/5 px-3 py-1.5">
                  <span className="flex items-center gap-2 text-xs text-foreground/90">
                    <Zap size={12} className="text-brand" /> Grid export
                  </span>
                  <span className="text-[10px] font-medium text-emerald-500">
                    {solarMode === "Off-Grid" ? "Disabled" : "Active"}
                  </span>
                </div>
              </motion.div>
            )}

            {tab === "alarm" && (
              <motion.div
                key="alarm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="rounded-xl border border-border bg-foreground/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setArmed((v) => !v)}
                    className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white ${
                      armed ? "bg-gradient-to-br from-red-400 to-rose-500" : "bg-gradient-to-br from-slate-400 to-slate-500"
                    }`}
                  >
                    {armed && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-red-300"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    <ShieldAlert size={26} />
                  </button>
                  <div>
                    <p className="text-sm font-semibold">{armed ? "System Armed" : "System Disarmed"}</p>
                    <p className="mt-0.5 text-[11px] text-muted">Tap the shield to {armed ? "disarm" : "arm"}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  {zones.map((z) => (
                    <div key={z} className="flex items-center justify-between rounded-lg bg-foreground/5 px-3 py-1.5">
                      <span className="text-xs text-foreground/90">{z}</span>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium ${armed ? "text-red-500" : "text-muted"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${armed ? "bg-red-500" : "bg-muted"}`} />
                        {armed ? "Active" : "Idle"}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div layout="position" className="mt-4 grid grid-cols-4 gap-2">
          {tabs.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-full px-2 py-2 text-[10px] font-medium transition-colors ${
                  isActive ? "text-white" : "border border-border text-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="chip-active-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-1">
                  <t.Icon size={12} /> {t.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
