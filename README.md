# Rafshanul Hoque Siam — Portfolio

A personal portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS, and Motion for React.

## What's already filled in vs. what's a placeholder

Content is now sourced from your resume: contact details, all three roles (softwindTech Ltd., eCarnivalBD Ltd., Nanosoft Ltd.) with real dates and highlights, education, certificates, and languages. A few things genuinely weren't in the resume and are left as placeholders in `lib/data.ts` — search for `PLACEHOLDER` and `TODO`:

- **Live demo link for TidBit (Toffee Quiz App)** — no public URL was listed; add one if it's viewable.
- **Excellent Leather Agency** — this project wasn't on your resume, so its description stayed generic and its demo/source links are still `null`. Update or remove this entry in `lib/data.ts` as needed.
- **Production domain** — `siteUrl` in `app/layout.tsx` is still a placeholder until you connect a real domain.

Everything else — PDF Pack (pdfpack.com), NoobFeed (noobfeed.com), and their write-ups — now links to the real URLs from your resume.

## Editing content

Almost everything on the site is driven by one file:

```
lib/data.ts
```

This includes your name/role/bio, skill groups, the four featured projects (problem, contribution, features, stack, links), experience entries, and contact copy. Update the values there — you generally shouldn't need to touch component files just to change content.

### Replacing project preview images

Drop real screenshots into `public/projects/` (e.g. `pdf-pack.png`) and update the matching `image` field in `lib/data.ts`. Recommended: 1200×800px (3:2), optimized/compressed before adding — the site does not run server-side image optimization (see the Netlify note below), so pre-optimize source files.

## Local development

Requires Node.js 18.18 or newer and [pnpm](https://pnpm.io) (`npm install -g pnpm` if you don't have it).

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000`. This first `pnpm install` generates `pnpm-lock.yaml` — commit it to your repo, since Netlify uses its presence to auto-select pnpm for the deploy install step.

Build for production locally to sanity-check before deploying:

```bash
pnpm build
pnpm start
```

## Tech notes

- **App Router** (`app/`) with a single `page.tsx` composing section components from `components/`.
- **Motion for React** (`motion/react`) powers scroll reveals, staggered project entries, the timeline's drawing line, hero load sequence, and the top scroll-progress bar. Every animation reads `prefers-reduced-motion` (via `useReducedMotion`) and falls back to an instant, fully visible state — see `components/Reveal.tsx`.
- **Subtle hover interactions**: `components/MagneticButton.tsx` gives primary CTAs (hero buttons, the email button) a slight cursor-following drift; `components/SpotlightCard.tsx` adds a cursor-tracked glow to the skills cards; `components/ProjectCard.tsx` adds a soft cursor-tilt to each project preview. All three no-op under `prefers-reduced-motion`.
- **Images** use `next/image` with `images.unoptimized = true` in `next.config.mjs`. This keeps the project deployable on Netlify without extra image-optimization setup. If you'd rather have on-the-fly optimization, install `@netlify/plugin-nextjs`'s image CDN support or switch to a remote loader — just remove `unoptimized: true` once that's wired up.
- **Accessibility**: semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip-to-content link, visible focus rings, keyboard-operable mobile menu (Escape to close, focus trap via body scroll lock), and `aria-*` attributes on interactive/decorative elements.

## Deploying to Netlify

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**, and connect the repo.
3. Netlify should auto-detect Next.js. The included `netlify.toml` already sets:
   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"

   [build.environment]
     PNPM_VERSION = "9.7.0"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```
   Netlify detects `pnpm-lock.yaml` automatically and installs with pnpm — no extra flag needed.
   This plugin is what makes Next.js's App Router work correctly on Netlify's runtime — don't remove it.
4. Deploy. Netlify will give you a `*.netlify.app` URL to verify everything before connecting a custom domain.

## Connecting a custom domain via Cloudflare

If your domain's DNS is managed in Cloudflare but the site is hosted on Netlify:

1. In **Netlify → Site settings → Domain management**, add your custom domain.
2. Netlify will show you the DNS records to create (typically an `A`/`ALIAS` record for the apex domain and a `CNAME` for `www`, pointing at Netlify's load balancer / your `*.netlify.app` subdomain).
3. In **Cloudflare → DNS**, add those records.
4. Set the Cloudflare proxy status (the orange cloud) to **DNS only (grey cloud)** first while Netlify issues its SSL certificate — proxying too early can interfere with certificate validation. Once Netlify shows the domain as secured (HTTPS active), you can switch it back to **Proxied (orange cloud)** if you want Cloudflare's CDN/WAF in front of the site.
5. In Cloudflare's SSL/TLS settings, use **Full** (or **Full (strict)**) mode — not "Flexible" — to avoid redirect loops with Netlify's own HTTPS.
6. Update `siteUrl` in `app/layout.tsx` to your real domain once it's live, so Open Graph/Twitter metadata and canonical URLs are correct.

## Before you launch — checklist

- [ ] Add a live-demo link for TidBit (Toffee Quiz App) if one exists publicly
- [ ] Update or remove the Excellent Leather Agency project (not on your resume — confirm details or swap it for another project)
- [ ] Add real screenshots for all four projects in `public/projects/`
- [ ] Update `siteUrl` in `app/layout.tsx`
- [ ] Run `pnpm build` locally once to confirm a clean production build
- [ ] Confirm the site reads correctly with reduced motion enabled (OS-level "reduce motion" setting) and on a small mobile viewport
