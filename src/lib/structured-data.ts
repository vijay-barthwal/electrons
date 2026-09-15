import { siteConfig } from "./site-config";
import { services } from "./services";
import { faqs } from "./faq";

/**
 * ElectricalContractor + LocalBusiness schema, describing who runs the site
 * and what services it offers. Feeds Google rich results, local/map-pack
 * entities, and gives AI answer engines (ChatGPT, Perplexity, Google AI
 * Overviews) a structured fact-base to cite instead of guessing from prose.
 */
export function organizationJsonLd() {
  // Links this entity to its social profiles for knowledge-graph/entity
  // resolution — omitted entirely unless at least one is actually
  // configured (see NEXT_PUBLIC_FACEBOOK_URL etc. in .env.local.example).
  const sameAs = Object.values(siteConfig.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    name: siteConfig.fullName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.proprietor,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 8, Ranjan Plaza, Lottery Bazar",
      addressLocality: "Zirakpur",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Zirakpur" },
      { "@type": "City", name: "Panchkula" },
      { "@type": "City", name: "Chandigarh" },
      { "@type": "City", name: "Mohali" },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
    })),
  };
}

/** WebSite schema — basic site identity for search engines. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.fullName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
    },
  };
}

/**
 * FAQPage schema, generated from the same `faqs` data the visible FAQ
 * section renders — keeps schema and on-page content from drifting apart,
 * which Google requires for FAQ rich results to stay eligible.
 */
export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
