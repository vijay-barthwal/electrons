import {
  BatteryCharging,
  Camera,
  Clock,
  PanelsTopLeft,
  Plug,
  ShieldCheck,
  Siren,
  Smartphone,
  Sun,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  Icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
  gradient: string;
};

// See the "Images & caching" note in README.md — when you replace one of
// these files with a new file of the SAME name, bump only that image's
// trailing ?v=N so browsers fetch the new one instead of the long cache.
// A brand-new filename doesn't need a ?v= at all.

export const services: Service[] = [
  {
    Icon: Sun,
    title: "Solar Power Systems",
    tagline: "On-grid, off-grid & hybrid — sized to your load.",
    description:
      "We design, supply, and install rooftop solar systems for homes, shops, and industry — matching the right setup to your consumption, budget, and how often the grid is available.",
    bullets: [
      "On-grid (grid-tied) solar systems",
      "Off-grid systems with battery backup",
      "Hybrid solar + grid + battery setups",
      "Net-metering & subsidy paperwork support",
    ],
    image: "/services/solar-power-systems.webp?v=1",
    gradient: "from-amber-400/25 to-amber-400/0",
  },
  {
    Icon: Wind,
    title: "Wind Turbine Systems",
    tagline: "Harness the wind alongside the sun.",
    description:
      "Small and rooftop-scale wind turbines, installed standalone or paired with solar for a hybrid renewable setup — a good fit for open plots, farms, and rural sites with steady wind.",
    bullets: [
      "Rooftop & standalone wind turbines",
      "Hybrid solar-wind installations",
      "Off-grid power for remote sites",
      "Routine servicing & performance checks",
    ],
    image: "/services/wind-turbine-systems.webp?v=1",
    gradient: "from-sky-400/25 to-sky-400/0",
  },
  {
    Icon: ShieldCheck,
    title: "Servo Stabilizers",
    tagline: "Steady voltage, protected equipment.",
    description:
      "Servo voltage stabilizers sized and installed for homes, offices, and machinery — protecting sensitive electronics and motors from voltage fluctuations common on local grids.",
    bullets: [
      "Single & three-phase servo stabilizers",
      "Sizing based on connected load",
      "Protection for ACs, motors & electronics",
      "Installation, testing & AMC",
    ],
    image: "/services/servo-stabilizers.webp?v=1",
    gradient: "from-blue-400/20 to-blue-400/0",
  },
  {
    Icon: Plug,
    title: "Electrical Installation & Wiring",
    tagline: "Safe, code-compliant wiring from day one.",
    description:
      "New wiring, distribution boards, and fittings for homes, offices, and commercial spaces — installed by experienced electricians who plan for both safety and future load.",
    bullets: [
      "New home & office wiring",
      "MCB / distribution board installation",
      "Lighting, switch & socket fitting",
      "Load assessment & safety compliance",
    ],
    image: "/services/electrical-installation.webp?v=1",
    gradient: "from-indigo-400/20 to-indigo-400/0",
  },
  {
    Icon: PanelsTopLeft,
    title: "Electrical Panels & DBs",
    tagline: "The board that keeps every circuit in check.",
    description:
      "Supply and installation of electrical panels and distribution boards for residential, commercial, and industrial loads, built with quality breakers and clear circuit labelling.",
    bullets: [
      "Main & sub distribution panels",
      "Industrial control panels",
      "MCB / RCCB / isolator selection",
      "Panel upgrades for added load",
    ],
    image: "/services/electrical-panels.webp?v=1",
    gradient: "from-cyan-400/20 to-cyan-400/0",
  },
  {
    Icon: Wrench,
    title: "Electrical Repairs",
    tagline: "Fast diagnostics, lasting fixes.",
    description:
      "Flickering lights, tripping breakers, or faulty circuits — our technicians diagnose the root cause and repair it right the first time.",
    bullets: [
      "Circuit & short-circuit troubleshooting",
      "Switchboard & panel repair",
      "Appliance & fitting wiring fixes",
      "Post-repair safety testing",
    ],
    image: "/services/electrical-repairs.webp?v=1",
    gradient: "from-sky-400/20 to-sky-400/0",
  },
  {
    Icon: Siren,
    title: "Fire Alarm Systems",
    tagline: "Early warning, every time.",
    description:
      "Design and installation of fire alarm and smoke-detection systems for homes, shops, and commercial buildings, wired into a central panel for fast, reliable alerts.",
    bullets: [
      "Smoke & heat detector installation",
      "Central fire alarm panel wiring",
      "Manual call points & hooters",
      "Testing & annual compliance checks",
    ],
    image: "/services/fire-alarm-systems.webp?v=1",
    gradient: "from-red-400/20 to-red-400/0",
  },
  {
    Icon: Camera,
    title: "CCTV Cameras & Surveillance",
    tagline: "Round-the-clock eyes on what matters most.",
    description:
      "From single-camera shops to fully networked NVR systems, we design, supply, and install CCTV cameras and video surveillance for homes, shops, and businesses.",
    bullets: [
      "HD dome, bullet & PTZ cameras",
      "NVR/DVR setup with remote mobile viewing",
      "Wired & Wi-Fi camera installations",
      "Maintenance & footage backup setup",
    ],
    image: "/services/cctv-surveillance.webp?v=1",
    gradient: "from-slate-400/20 to-slate-400/0",
  },
  {
    Icon: Smartphone,
    title: "Home & Building Automation",
    tagline: "Control your space with a tap or a word.",
    description:
      "Bring lighting, security, and appliances together into one smart, app- and voice-controlled system — designed around how your home or office already runs.",
    bullets: [
      "Smart switches & scene lighting",
      "App & voice control (Alexa/Google)",
      "Integrated with CCTV & fire alarm",
      "Retrofits onto most existing wiring",
    ],
    image: "/services/home-automation.webp?v=1",
    gradient: "from-violet-400/20 to-violet-400/0",
  },
  {
    Icon: BatteryCharging,
    title: "Car Chargers & Charging Stations",
    tagline: "Power your EV at home, work, or on the road.",
    description:
      "Supply and installation of home EV chargers and public/commercial car charging stations, with the electrical panel and wiring upgrades to support them safely.",
    bullets: [
      "Home EV charger installation",
      "Commercial charging station setup",
      "Load calculation & panel upgrades",
      "Charger selection for your vehicle",
    ],
    image: "/services/ev-chargers.webp?v=1",
    gradient: "from-emerald-400/20 to-emerald-400/0",
  },
  {
    Icon: ShieldCheck,
    title: "Maintenance & AMC",
    tagline: "Keep every system running at its best.",
    description:
      "Scheduled maintenance and annual maintenance contracts (AMC) keep your solar, electrical, CCTV, and fire alarm systems reliable — with cleaning, testing, and preventive checks.",
    bullets: [
      "Annual maintenance contracts (AMC)",
      "Solar panel cleaning & output checks",
      "Wiring & panel health checks",
      "Priority support for AMC clients",
    ],
    image: "/services/maintenance-amc.webp?v=1",
    gradient: "from-blue-300/20 to-indigo-300/0",
  },
  {
    Icon: Clock,
    title: "24/7 Emergency Services",
    tagline: "Help is a call away, any hour.",
    description:
      "Electrical faults don't wait for business hours. Our on-call team responds to urgent breakdowns, alarm faults, and system downtime, day or night.",
    bullets: [
      "24/7 emergency call-out",
      "Power outage & short-circuit response",
      "Alarm & camera downtime support",
      "Rapid on-site diagnosis",
    ],
    image: "/services/emergency-services.webp?v=1",
    gradient: "from-orange-400/20 to-orange-400/0",
  },
];
