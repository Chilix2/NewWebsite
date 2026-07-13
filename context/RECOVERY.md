# Sailly Website v2 Redesign — Recovery Guide

## What This Is

Sierra.ai-inspired homepage redesign for sailly.de. Built in a sandbox git worktree
(`/home/charles2/sailly-website-v2-dev/`) fully isolated from production.

- **Production:** `https://sailly.de` (port 3000, `sailly-website.service`)
- **Sandbox dev:** Port 3004, `/home/charles2/sailly-website-v2-dev/apps/website/`
- **Design reference:** Sierra.ai — clean layout, image-first, alternating bg rhythm
- **Status:** 8 sections built, preview working, images pending (placeholders)

## Section Structure (8 total)

| # | Component | Purpose |
|---|-----------|---------|
| 1 | `sailly-header-v2.tsx` | Sticky header + SaillySignalLogo + nav + CTAs |
| 2 | `hero-v2.tsx` | Full-bleed background image with text overlay |
| 3 | `value-prop-v2.tsx` | Benefit cards with images |
| 4 | `social-proof-v2.tsx` | Anonymous/foreign testimonials |
| 5 | `platform-v2.tsx` | Agent OS modules (white cards on gradient bg) |
| 6 | `demo-v2.tsx` | Voice chat preview + audio demos consolidated |
| 7 | `trust-v2.tsx` | Compliance, security, GDPR badges |
| 8 | `final-cta-v2.tsx` | Clean centered call-to-action |

## Setup on New Device

```bash
git clone https://github.com/Chilix2/website.git
cd website/apps/website
npm install
PORT=3004 npm run dev
# Open http://localhost:3004/de
```

## Key Files Modified

- `app/[locale]/layout.tsx` — Swaps `SaillyHeader` → `SaillyHeaderV2`
- `app/[locale]/page.tsx` — Swaps `SaillyLanding` → `SaillyLandingV2`
- `next.config.mjs` — Added `allowedDevOrigins`

## Context Files

- `context/transcripts/` — Full agent chat transcripts for this redesign session
- `context/rules/` — Cursor rules governing the project (restaurant-voice-agent.mdc, etc.)
- `context/AGENTS.md` — Cursor project guide

## Pending Tasks

- [ ] Replace placeholder images with real high-end photography (Unsplash/Pexels)
- [ ] Performance audit — check bundle size, image optimization, lazy loading
- [ ] Mobile responsiveness — perfect auto-scaling on all devices
- [ ] Apply alternating background rhythm (white for images, gradient for text cards)

## Important Warnings

- **DO NOT** run `npm run dev` in the same directory as production — it wipes `.next/static/`
- Production lives at `/home/charles2/sailly-mvp-complete/apps/website/` — never touch it
- The `sailly-signal-logo.tsx` uses CSS `animation-delay: 3s` — logo is static for 3s then animates
