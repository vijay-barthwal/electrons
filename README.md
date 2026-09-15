# Electrons — Contractor & Suppliers

A single-page, mobile-first marketing site for an electrical, solar, and
automation contractor, built with Next.js, Tailwind CSS v4, and Framer
Motion. Includes light/dark themes, local-SEO structured data, and a
contact form wired to email via SMTP.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** for styling, with a light/dark theme switch (`next-themes`)
- **Framer Motion** for scroll/entrance animations
- **lucide-react** for icons
- **Nodemailer** for the contact form (no database/backend required)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Brand name, tagline, contact info, and nav links live in one place:
[src/lib/site-config.ts](src/lib/site-config.ts). Update the phone(s), email,
address, and `NEXT_PUBLIC_SITE_URL` there (and in `.env.local`) once a real
production domain is registered.

Social links (Facebook, Instagram, YouTube) shown in the footer are read
from `NEXT_PUBLIC_FACEBOOK_URL` / `NEXT_PUBLIC_INSTAGRAM_URL` /
`NEXT_PUBLIC_YOUTUBE_URL` in `.env.local` — see `.env.local.example`. Each
icon only renders when its env var is set, so it's safe to leave any of
them out.

Other content lives in [src/lib/](src/lib/):
- `services.ts` — the 12 service cards (Solar, Wind Turbines, Servo
  Stabilizers, Electrical Installation, Electrical Panels, Electrical
  Repairs, Fire Alarm, CCTV, Home/Building Automation, Car Chargers &
  Charging Stations, Maintenance & AMC, 24/7 Emergency Services)
- `faq.ts` — FAQ accordion (also feeds the FAQPage structured data)
- `structured-data.ts` — LocalBusiness/GEO schema for search engines and AI answer engines

Each section of the page is its own component in
[src/components/](src/components/) (`Hero`, `Services`, `Showcase`,
`Features`, `HowItWorks`, `Testimonials`, `FAQ`, `Contact`, `Footer`),
assembled in [src/app/page.tsx](src/app/page.tsx).

**Before launch:** the testimonials in `Testimonials.tsx` are placeholder
examples — swap them for real, verifiable client reviews. The site also has
no dealer/brand-logo section — add one once specific supplier partnerships
(inverter/panel/stabilizer brands, etc.) are confirmed.

## Logo & images

The atom/electron mark from the visiting card is redrawn as inline SVG in
[src/components/Logo.tsx](src/components/Logo.tsx) (used for the navbar/footer
logo, the favicon at `public/icon.svg`, and the OG share image), and the
Open Graph share image is generated on the fly via `next/og`
([src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)) — so there's
nothing to keep in sync when the design changes, just edit the SVG in one
place.

The 12 service card photos in `public/services/` are free-to-use stock
photos (Pexels License — free for commercial use, no attribution required),
chosen to avoid any visible third-party brand names/logos. They're generic
stock photography, not real photos of this business's own jobs — swap in
real jobsite/product photos in `src/lib/services.ts` whenever you have them.
The Services section shows the first 6 cards with a "Show more services"
toggle to reveal the rest.

### Images & caching

[next.config.ts](next.config.ts) sets `images.minimumCacheTTL` to 1 year —
optimized images are cached as aggressively as possible by browsers and any
CDN in front of the site, which keeps bandwidth/optimization costs down on
repeat traffic. Freshness after an update is handled separately, per image,
via a `?v=N` query tag on each image path (in `src/lib/services.ts`) — **not**
by waiting for the cache to expire. This means only the image you actually
changed gets re-fetched/re-optimized after a deploy, not the whole site.

When you update an image, there are two cases:

- **New file, new filename** — just point the relevant entry at the new
  path. Nothing else to do; a new URL is never cached, so it's fetched fresh
  automatically.
- **Replacing a file at the same filename** — bump that one entry's `?v=N`
  to `?v=N+1` (e.g. `/services/solar-power-systems.webp?v=1` →
  `...?v=2`) before redeploying. That changes the URL for just that image,
  so it's fetched fresh; every other image keeps its long cache untouched.

## Contact form (SMTP, no backend/database)

The form posts to a Next.js API route ([src/app/api/contact/route.ts](src/app/api/contact/route.ts))
which sends the message straight to your inbox via plain SMTP + Nodemailer,
using credentials kept only in server-side environment variables — never
sent to the browser.

### Setup (Gmail)

1. Enable **2-Step Verification** on the Gmail account, then generate an
   app password at https://myaccount.google.com/apppasswords. Copy it
   immediately — it's only shown once.
2. Copy the example env file and fill it in:

   ```bash
   cp .env.local.example .env.local
   ```

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=electrons0511@gmail.com
   SMTP_PASSWORD=xxxxxxxxxxxxxxxx
   CONTACT_TO_EMAIL=electrons0511@gmail.com
   ```

3. Restart the dev server. `.env.local` is already git-ignored, so the
   password never gets committed.

The form includes basic server-side validation, a hidden honeypot field to
deter simple spam bots, and clear success/error states in the UI.

## Deploying

On Vercel (or any host), add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASSWORD`, and `CONTACT_TO_EMAIL` as **server-side environment
variables** in the project settings — do not prefix them with `NEXT_PUBLIC_`,
or they would be exposed to the browser. Also set `NEXT_PUBLIC_SITE_URL` to
the real production domain once one exists.

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run start` – run the production build
- `npm run lint` – lint the codebase
