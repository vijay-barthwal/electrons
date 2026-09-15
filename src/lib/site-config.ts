// Placeholder until a production domain is registered — update here (and in
// .env.local via NEXT_PUBLIC_SITE_URL) once one exists, so canonical URLs,
// structured data, and social previews point at the real domain.
const DEFAULT_SITE_URL = "https://electrons-zirakpur.example.com";

export const siteConfig = {
  name: "Electrons",
  fullName: "Electrons Contractor & Suppliers",
  tagline: "Complete electrical, solar & automation solutions.",
  description:
    "Electrons Contractor & Suppliers designs and installs on-grid, off-grid and hybrid solar systems, electrical wiring and panels, fire alarm systems, CCTV, home & building automation, servo stabilizers, wind turbines, and EV car charging stations across Zirakpur and the tricity area.",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ""),
  keywords: [
    "solar system installer Zirakpur",
    "on-grid off-grid hybrid solar Zirakpur",
    "electrician Zirakpur",
    "electrical contractor Punjab",
    "servo stabilizer dealer",
    "fire alarm system installation",
    "CCTV camera installation Zirakpur",
    "home automation installer",
    "EV charging station installer",
    "electrical panel & DB installation",
    "wind turbine installer",
  ],
  locale: "en_IN",
  proprietor: "Pankaj Kumar",
  phone: "+91 98145 17799",
  phoneHref: "tel:+919814517799",
  phone2: "+91 78885 12116",
  phone2Href: "tel:+917888512116",
  whatsapp: "https://wa.me/919814517799",
  email: "electrons0511@gmail.com",
  address: "Shop No. 8, Ranjan Plaza, Lottery Bazar, Zirakpur, Punjab",
  areaServed: "Zirakpur, Panchkula, Chandigarh & Mohali (Tricity)",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  emergencyHours: "24/7 for emergency electrical call-outs",
  // Set these in .env.local (see .env.local.example). Left unset, the
  // corresponding footer icon is simply not rendered — see Footer.tsx.
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#showcase" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
