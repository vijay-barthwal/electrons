import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Freshness is handled per-image via a "?v=N" query tag on each src
    // (see the "Images & caching" note in README.md), not by this TTL
    // expiring — so it's safe to set this to the effective maximum instead
    // of tying it to the update cadence. That maximizes CDN/browser caching
    // and minimizes image-optimization/bandwidth cost on repeat traffic.
    minimumCacheTTL: 31536000, // 1 year, in seconds
    // Local images with a query string require an explicit allowlist in
    // Next 15+. Every src we pass is our own hardcoded /public path (never
    // user input), so allowing all local paths/queries here is safe.
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
