import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Logo from "./Logo";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

// lucide-react no longer ships brand/social logos, so these are drawn as
// plain glyph icons (not the official brand marks) — a common, low-risk
// substitute used across most UI icon sets.
const socialLinks = [
  {
    href: siteConfig.social.facebook,
    label: "Facebook",
    path: "M13.5 22v-8.5H16l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.2 4.3 15.2 4.2 14 4.2c-2.4 0-4 1.47-4 4.15V10.5H7.5v3H10V22h3.5z",
  },
  {
    href: siteConfig.social.instagram,
    label: "Instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.25A3.25 3.25 0 1112 8.75a3.25 3.25 0 010 6.5zM17.5 6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
  },
  {
    href: siteConfig.social.youtube,
    label: "YouTube",
    path: "M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4h0s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6C2.2 14 2.4 15.7 2.4 15.7s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.6.2 6.5.2 6.5.2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.4v-1.6c0-1.7-.2-3.4-.2-3.4zM9.9 14.2V8.8l5.3 2.7-5.3 2.7z",
  },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <Logo size={36} />
              {siteConfig.name}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-blue-400/40 hover:text-brand"
                  >
                    <SocialIcon path={s.path} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>Solar Systems (On/Off-Grid & Hybrid)</li>
              <li>Electrical Installation & Panels</li>
              <li>Fire Alarm & CCTV Systems</li>
              <li>Home & Building Automation</li>
              <li>Car Chargers & Charging Stations</li>
              <li>Maintenance & AMC</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-muted">
                <Phone size={14} /> {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2 text-muted">
                <Phone size={14} /> {siteConfig.phone2}
              </li>
              <li className="flex items-center gap-2 text-muted">
                <MessageCircle size={14} />
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted">
                <Mail size={14} /> {siteConfig.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </span>
          <span>Solar, electrical, safety & automation — done right.</span>
        </div>
      </div>
    </footer>
  );
}
