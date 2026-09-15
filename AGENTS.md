# Project-specific: updating images in /public

Images are cached very aggressively (`images.minimumCacheTTL` = 1 year in
[next.config.ts](next.config.ts)) to keep bandwidth/optimization costs low.
Freshness after an update is handled **per image**, not by that cache
expiring — every image path carries a `?v=N` query tag, and only the
specific image being replaced gets that tag bumped.

Image paths live in `src/lib/services.ts` (the `image` field on each
service). The logo, favicon, and OG share image are the exception — those
are drawn as inline SVG / generated at request time via `next/og`
([src/components/Logo.tsx](src/components/Logo.tsx),
[src/app/opengraph-image.tsx](src/app/opengraph-image.tsx)), so there's no
file to replace or `?v=` to bump for those.

**Whenever you replace a file in `/public/services` with a new file of the
SAME filename**, find that exact path in `src/lib/services.ts` and
increment its `?v=N` by exactly 1 (e.g. `/services/solar-power-systems.webp?v=1`
→ `...?v=2`). Do **not** touch the `?v=` on any other image — bumping
unrelated images defeats the caching strategy and re-triggers
optimization/bandwidth cost for images that didn't change.

**Whenever you add a new image under a brand-new filename** (or point an
entry at a different existing file), no `?v=` change is needed — just update
the path. A new filename is never cached, so it's fetched fresh automatically.

After either kind of change, run `npm run build` to confirm it still builds.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
