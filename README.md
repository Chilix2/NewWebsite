# Sailly Website

**AI Voice Agent Platform — Marketing Website**

Sailly is an AI-powered voice assistant for German-speaking service businesses (hotels, restaurants, medical practices, legal firms, service providers). The website is the public-facing marketing site built with Next.js 16 and React 19, deployed at **[www.sailly.de](https://www.sailly.de)**.

> This repository is a standalone copy of the `apps/website/` directory from the main monorepo, isolated for independent development and deployment.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Git History & Development Timeline](#git-history--development-timeline)
- [Tech Stack](#tech-stack)
- [Page Structure](#page-structure)
- [Component Architecture](#component-architecture)
- [Content & Sections](#content--sections)
- [Industry Pages](#industry-pages)
- [Internationalization (i18n)](#internationalization-i18n)
- [Authentication & Dashboard](#authentication--dashboard)
- [SEO & Metadata](#seo--metadata)
- [Compliance & Security](#compliance--security)
- [Cross-Platform Compatibility](#cross-platform-compatibility)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Directory Map](#directory-map)

---

## Project Overview

Sailly is an **AI voice agent** that handles phone calls for service businesses — answering calls 24/7, booking appointments, answering complex questions, and escalating to humans when needed. The website is the primary marketing and conversion channel.

### What the Business Does

- **Answers calls** that would otherwise go unanswered (30% of business calls are missed)
- **Books appointments** directly into the business's calendar system
- **Handles complex questions** about menu items, room availability, treatment details, pricing, etc.
- **Speaks 30+ languages** including German, English, Turkish, Arabic, Chinese, Russian, Polish, French, Greek, Korean, Vietnamese, and Thai
- **Escalates to humans** for sensitive or complex situations
- **GDPR-compliant** with German server hosting, ISO 27001, end-to-end encryption

### Key Selling Points (on the site)

| Benefit | Detail |
|---------|--------|
| Always available | 24/7 call handling, no hold music |
| Multi-language | 30+ languages with natural, empathetic voice |
| Deep integrations | PMS, CRM, calendar, 500+ apps |
| Quick setup | 4 weeks to go live |
| Security | GDPR, ISO 27001, HIPAA, end-to-end encryption |
| ROI | 15-25% more bookings, 2-3 hours saved daily |

---

## Git History & Development Timeline

The current codebase evolved through these key commits on `main`:

| Date | Commit | Description |
|------|--------|-------------|
| Jul 2026 | `5f822ad` | Fix chat bubble alignment, hero slogan font, and propagate styling consistency. Right-align widget/booking bubbles in hero and industry chats. Add w-full to booking/slots cards. Revert hero slogan to font-bold. Fix logo lockup centering. |
| Jul 2026 | `fb01bc5` | Improve industry pages, navigation, hero, and trust badges |
| Jul 2026 | `c6ffcbc` | Expand industries, modernize product and homepage sections, and add media assets |
| Jul 2026 | `bb4db2a` | **feat: Sailly website v2 redesign — Sierra.ai-inspired homepage** |
| Mar 2026 | `c6e3bde` | chore: remove unused artifacts and generated outputs |
| Mar 2026 | `9e6ecc4` | Update configuration, rules, and state documentation |
| Mar 2026 | `2f546aa` | feat: add automated webhook update script for GCP migration |
| Mar 2026 | `df05289` | Fix: deploy to correct production instance + hide sidebar on login |
| Mar 2026 | older | Auto-commits, security audit, dashboard deployment |

### Historical Context

The website underwent a **v2 redesign** in July 2026, inspired by Sierra.ai's design patterns. The redesign focused on:

- **Cinematic hero** with animated chat overlay showing real AI conversations
- **Industry-specific landing pages** for Hotels, Restaurants, Medical, Legal, and Services
- **Glassmorphism UI** with frosted glass cards, dynamic gradients, and smooth animations
- **Trust & compliance badges** prominently displayed (SOC2, ISO 27001, ISO 42001, HIPAA, GDPR, EU AI Act, FedRAMP, PCI DSS)
- **Social proof** with named customer testimonials
- **Live demo preview** section with audio samples in multiple languages
- **Responsive header** that collapses on scroll and reappears on scroll up

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.0.7 |
| UI Library | React | 19.2.0 |
| Styling | Tailwind CSS | ^4.1.9 |
| Animations | Framer Motion + CSS @keyframes | ^12.23.26 |
| 3D Graphics | Three.js + React Three Fiber + Drei | ^0.182 / ^9.5 / ^10.7 |
| UI Primitives | Radix UI (27 packages) | 1.x |
| Icons | Lucide React | ^0.454 |
| Forms | React Hook Form + Zod | ^7.60 / 3.25.76 |
| Charts | Recharts | 2.15.4 |
| Database/Auth | Supabase (ssr + supabase-js) | ^0.10 / ^2.103 |
| Carousel | Embla Carousel React | 8.5.1 |
| Analytics | Vercel Analytics | 1.3.1 |
| Date handling | date-fns | 4.1.0 |
| Type System | TypeScript | ^5 |
| Testing | Playwright + Percy | ^1.58 |
| Build | PostCSS + Autoprefixer | ^8.5 / ^10.4 |

---

## Page Structure

### Page Status Legend

| Icon | Status |
|------|--------|
| ✅ | Fully implemented |
| 🟡 | Partially implemented / placeholder |
| 🔴 | Stub / not yet built |

### Homepage

| Route | File | Status |
|-------|------|--------|
| `/` (redirects to `/de`) | `app/page.tsx` | ✅ |
| `/[locale]/` | `app/[locale]/page.tsx` | ✅ |

**Sections rendered on homepage (`SaillyLandingV2`):**
1. **HeroV2** — cinematic hero with animated chat overlay, video background, stats bar
2. **ProofBandV2** — credibility/reassurance band (GDPR, 24/7, 4 weeks to live)
3. **ValuePropV2** — value proposition cards ("No call goes unanswered", etc.)
4. **IndustriesV2** — industry doorways linking to solution pages
5. **SocialProofV2** — customer testimonials carousel
6. **DemoV2** — live demo preview with audio samples
7. **TrustV2** — security & compliance trust badges
8. **FinalCtaV2** — bottom call-to-action

### Solutions / Industry Pages (`/[locale]/loesungen/`)

| Route | File | Status |
|-------|------|--------|
| `/loesungen/` | `page.tsx` (redirects to hotels) | ✅ |
| `/loesungen/hotels/` | `page.tsx` | ✅ |
| `/loesungen/restaurants/` | `page.tsx` | ✅ |
| `/loesungen/medical/` | `page.tsx` | ✅ |
| `/loesungen/legal/` | `page.tsx` | ✅ |
| `/loesungen/services/` | `page.tsx` | ✅ |

Each industry page uses the reusable `<IndustryTemplate>` component with:
- Hero section with industry-specific video and avatar
- 3 industry-specific pain points (challenges)
- 3 industry-specific benefits
- ROI stats bar
- 4 interactive chat scenario cards showing real AI conversations
- Audio demo cards with playable MP3 samples
- Cross-sell section linking to other industries

### Product Pages (`/[locale]/produkt/`)

| Route | File | Status |
|-------|------|--------|
| `/produkt/` | `page.tsx` | ✅ |
| `/produkt/integrationen/` | `page.tsx` | ✅ |
| `/produkt/data-insights/` | `page.tsx` | 🟡 |
| `/produkt/security-compliance/` | `page.tsx` | 🟡 |
| `/produkt/languages/` | `page.tsx` | 🟡 |
| `/produkt/strategic-partners/` | `page.tsx` | 🟡 |
| `/produkt/ki-integration/` | `page.tsx` | 🟡 |
| `/produkt/workflow-builder/` | `page.tsx` | 🟡 |
| `/produkt/templates/` | `page.tsx` | 🟡 |
| `/produkt/platform-overview/` | `page.tsx` | 🟡 |

### Pricing

| Route | File | Status |
|-------|------|--------|
| `/preise/` | `page.tsx` | ✅ |
| `/pricing/` | `page.tsx` | ✅ |

**Three pricing tiers:**
- **Standard**: 24/7 voice forwarding, AI call summarization, appointment booking
- **Gold**: Standard + direct integrations, industry workflows, up to 12 languages
- **Future**: Gold + custom AI training, complex workflows, dedicated solution architect

### Other Pages

| Route | File | Status |
|-------|------|--------|
| `/technologie/` | `page.tsx` | 🟡 |
| `/demo/` | `page.tsx` | ✅ |
| `/contact/` | `page.tsx` | 🟡 |
| `/news/` | `page.tsx` | 🔴 |
| `/blog/` | `page.tsx` | 🔴 |
| `/community/` | `page.tsx` | 🔴 |
| `/resources/` | `page.tsx` | 🔴 |
| `/docs/` | `page.tsx` | 🔴 |
| `/academy/` | `page.tsx` | 🔴 |
| `/agb/` | `page.tsx` | 🔴 |
| `/datenschutz/` | `page.tsx` | 🔴 |
| `/impressum/` | `page.tsx` | 🔴 |

### Authentication & Dashboard

| Route | File | Status |
|-------|------|--------|
| `/login/` | `page.tsx` + `login-client.tsx` | ✅ |
| `/passwort-vergessen/` | `page.tsx` | 🟡 |
| `/dashboard/` | `page.tsx` | ✅ |
| `/onboarding/` | `page.tsx` + `OnboardingClient.tsx` | ✅ |
| `/auth/callback/` | `route.ts` | ✅ |

### Use Cases (`/[locale]/use-cases/branche/`)

| Route | Status |
|-------|--------|
| `/use-cases/branche/banking/` | 🟡 |
| `/use-cases/branche/healthcare/` | 🟡 |
| `/use-cases/branche/legal/` | 🟡 |
| `/use-cases/branche/retail/` | 🟡 |
| `/use-cases/branche/manufacturing/` | 🟡 |
| `/use-cases/branche/baubranche/` | 🟡 |
| `/use-cases/branche/telecom/` | 🟡 |
| `/use-cases/branche/public-sector/` | 🟡 |

### AI Impacts (`/[locale]/ai-impacts/`)

| Route | Status |
|-------|--------|
| `/ai-impacts/it-ops/` | 🟡 |
| `/ai-impacts/marketing/` | 🟡 |
| `/ai-impacts/sales/` | 🟡 |
| `/ai-impacts/secops/` | 🟡 |
| `/ai-impacts/support/` | 🟡 |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/login/` | POST | Deprecated — returns 410 (client-side Supabase now) |
| `/api/auth/logout/` | POST | Server-side logout |
| `/api/auth/me/` | GET | Returns current user session |
| `/api/auth/update-login/` | POST | Updates last_login_at timestamp |
| `/api/onboarding/submit/` | POST | Submits agent configuration |
| `/api/audio-validation/tests/` | GET | Returns mock audio test data |

---

## Component Architecture

### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| `MainShell` | `components/main-shell.tsx` | Wraps page content; adds `pt-20` on non-home pages |
| `SaillyHeaderV2` | `components/sailly-header-v2.tsx` | Fixed header, transparent on homepage, solid on scroll, mobile hamburger menu |
| `SaillyFooter` | `components/sailly-footer.tsx` | 5-column footer with nav links, social icons |
| `PageLayout` | `components/page-layout.tsx` | Generic page layout wrapper |
| `PageHero` | `components/page-hero.tsx` | Generic hero for subpages |
| `CookieBanner` | `components/CookieBanner.tsx` | GDPR cookie consent banner |

### Homepage Section Components (composed in `SaillyLandingV2`)

| Component | File | Purpose |
|-----------|------|---------|
| `HeroV2` | `components/hero-v2.tsx` | Cinematic hero with video, chat overlay, stats |
| `HeroChatOverlay` | `components/hero-chat-overlay.tsx` | Glass chat bubble overlay on hero videos |
| `HeroSloganSequence` | `components/hero-slogan-sequence.tsx` | Animated slogan cycling |
| `ProofBandV2` | `components/proof-band-v2.tsx` | Credibility band (badges + stats) |
| `ValuePropV2` | `components/value-prop-v2.tsx` | Outcome pillars |
| `IndustriesV2` | `components/industries-v2.tsx` | Industry doorway cards |
| `SocialProofV2` | `components/social-proof-v2.tsx` | Testimonial carousel |
| `DemoV2` | `components/demo-v2.tsx` | Live demo preview |
| `TrustV2` | `components/trust-v2.tsx` | Security & compliance badges |
| `FinalCtaV2` | `components/final-cta-v2.tsx` | Bottom CTA |

### Industry Template System

| Component | File | Purpose |
|-----------|------|---------|
| `IndustryTemplate` | `components/industry-template.tsx` | Reusable template: hero, challenges, benefits, scenarios, audio |
| `IndustryScenariosSection` | `components/industry-scenarios-section.tsx` | Chat scenario cards per industry |
| `AudioDemoCard` | `components/audio-demo-card.tsx` | Playable audio demo widget |
| `CinemaFrame` | `components/cinema-frame.tsx` | Video background frame with overlay text |
| `LanguageBubble` | `components/language-bubble.tsx` | Language selector bubble |
| `LanguageAudioButton` | `components/language-audio-button.tsx` | Language-specific audio play button |

### Product Page Components

| Component | File | Purpose |
|-----------|------|---------|
| `ProduktHeroV2` | `components/produkt-hero-v2.tsx` | Product page hero |
| `ProduktHowItWorks` | `components/produkt-how-it-works.tsx` | 3-step how-it-works section |
| `SaillyOsProductSection` | `components/sailly-os-product-section.tsx` | OS dashboard preview + capability modules |
| `SaillyDashboardPreview` | `components/sailly-dashboard-preview.tsx` | Live dashboard preview (calls/time saved) |
| `SaillyConversationPreview` | `components/sailly-conversation-preview.tsx` | Animated conversation (chat bubbles) |
| `SaillyOsPreview` | `components/sailly-os-preview.tsx` | OS interface mockup |
| `SaillyIntegrationSection` | `components/sailly-integration-section.tsx` | Integration partners |
| `SaillyHowItWorksSection` | `components/sailly-how-it-works-section.tsx` | How it works section |
| `ComplianceCertificates` | `components/compliance-certificates.tsx` | Compliance badge grid |
| `SaillyFlowBuilder` | `components/sailly-flow-builder.tsx` | Flow builder visualization |
| `SaillyWorkflowPipeline` | `components/sailly-workflow-pipeline.tsx` | Workflow pipeline visualization |

### Pricing

| Component | File | Purpose |
|-----------|------|---------|
| `PricingPlans` | `components/pricing-plans.tsx` | 3-tier pricing display |

### Brand & Identity

| Component | File | Purpose |
|-----------|------|---------|
| `SaillyIcon` | `components/sailly-icon.tsx` | Sailly icon/logo |
| `SaillySignalLogo` | `components/sailly-signal-logo.tsx` | Sailly logo lockup |

### Visual Effects & Animations

| Component | File | Purpose |
|-----------|------|---------|
| `FluidBackground` | `components/fluid-background.tsx` | Fluid/animated gradient background |
| `ConditionalBackground` | `components/conditional-background.tsx` | Conditional background renderer |
| `Bubbles` | `components/bubbles.tsx` | Animated background bubbles |
| `LightRays` | `components/light-rays.tsx` | Animated light rays |
| `IosGlassFilters` | `components/ios-glass-filters.tsx` | iOS-style frosted glass filters |
| `HelixCarousel` | `components/helix-carousel.tsx` | Helix-style carousel |
| `NewsScrollShowcase` | `components/news-scroll-showcase.tsx` | News scrolling showcase |

### UI Component Library

61 shadcn/ui-style components in `components/ui/`:

**Layout**: accordion, aspect-ratio, card, carousel, collapsible, dialog, drawer, menubar, navigation-menu, popover, resizable, scroll-area, separator, sheet, tabs

**Input**: button, button-group, checkbox, command, context-menu, dropdown-menu, form, input, input-group, input-otp, label, radio-group, select, slider, switch, textarea, toggle, toggle-group

**Display**: alert, alert-dialog, avatar, badge, breadcrumb, chart, field, glass-card, glass-icon, hover-card, item, kbd, pagination, progress, skeleton, sonner, spinner, spotlight-card, table, toast, toaster, tooltip

**Utility**: calendar (date-fns), empty, use-mobile, use-toast, sound-wave-separator

---

## Content & Sections

### Dictionaries

Content is stored in JSON dictionaries under `dictionaries/` for 13 languages:
`de`, `en`, `tr`, `es`, `ar`, `zh`, `ru`, `pl`, `fr`, `el`, `ko`, `vi`, `th`

Each dictionary contains translations for:

- **navigation**: Header nav items and dropdowns
- **hero**: Taglines, subtitles, CTAs, animated chat scenarios
- **problems**: Pain points (30% unanswered calls, etc.)
- **valueProps**: Why Sailly cards
- **solutions**: Features and capabilities
- **roi**: Revenue, efficiency, satisfaction, cost stats
- **industries**: 5 industry sections (hotels, restaurants, medical, legal, services) each with hero, challenges, benefits, scenarios
- **testimonials**: Customer quotes
- **pricing**: 3 tiers with features
- **product**: Sub-page content (integrations, security, languages, etc.)
- **footer**: Column headings and links
- **cta**: Call-to-action text
- **audio**: Audio demo labels
- **dashboard**: Dashboard labels
- **conversation**: Chat bubble messages
- **platform**: Platform description
- **misc**: Cookie banner, 404, etc.

### Content Strategy

The site targets **German-speaking business owners** (primarily in DACH region: Germany, Austria, Switzerland). Content emphasizes:

1. **Problem-first**: Starts with the pain (missed calls, stressed teams) before introducing the solution
2. **Industry-specific**: Each industry gets customized scenarios showing real AI conversations
3. **Multi-language proof**: Audio demos in 11 languages prove the AI really works multilingually
4. **Trust signals**: GDPR, ISO certifications, German hosting, named testimonials
5. **Clear ROI**: Concrete numbers (15-25% more bookings, 2-3 hours saved daily)
6. **Low-risk CTA**: "30-day money-back guarantee", "4 weeks to go live"

---

## Industry Pages

### Hotels & Hospitality (`/loesungen/hotels`)

- **Hero**: Hotel lobby video background with avatar
- **Pain Points**: Missed reservation calls, guest questions at all hours, front desk overload
- **Benefits**: 24/7 digital concierge, PMS integration, auto-booking
- **Scenarios**: Room availability check, special request handling, check-in time inquiry, multi-room booking
- **Audio**: Demo call in German and English

### Restaurants & Gastronomy (`/loesungen/restaurants`)

- **Hero**: Restaurant interior video background
- **Pain Points**: Table reservations during busy service, allergen/dietary questions, no-show problem
- **Benefits**: Table booking integration, menu Q&A, no-show reduction
- **Scenarios**: Table reservation, dietary restriction inquiry, group booking, special event request
- **Audio**: Demo call in German and English

### Medical Practices (`/loesungen/medical`)

- **Hero**: Medical practice reception video background
- **Pain Points**: Appointment scheduling overload, prescription refill calls, emergency triage
- **Benefits**: Digital MFA (medical practice assistant), appointment booking, emergency recognition
- **Scenarios**: Appointment booking, prescription refill, symptom triage, insurance question
- **Audio**: Demo call in German and English

### Legal & Tax Advisory (`/loesungen/legal`)

- **Hero**: Office environment video background
- **Pain Points**: Client intake calls, appointment coordination, missed consultations
- **Benefits**: Digital secretariat, client intake, prioritization
- **Scenarios**: Initial consultation booking, document status inquiry, practice area question, urgent matter routing
- **Audio**: Demo call in German and English

### Service Providers & SMEs (`/loesungen/services`)

- **Hero**: Service business video background
- **Pain Points**: Virtual reception needed, appointment coordination, status update calls
- **Benefits**: Virtual reception, booking integration, automated status updates
- **Scenarios**: Appointment booking, service inquiry, rescheduling, status check
- **Audio**: Demo call in German and English

---

## Internationalization (i18n)

### Supported Locales

13 languages:
- **de** (German) — default
- **en** (English), **tr** (Turkish), **es** (Spanish), **ar** (Arabic), **zh** (Chinese)
- **ru** (Russian), **pl** (Polish), **fr** (French), **el** (Greek)
- **ko** (Korean), **vi** (Vietnamese), **th** (Thai)

### Architecture

1. **Middleware** (`middleware.ts`): Detects locale from cookie → Accept-Language header → defaults to `de`. Redirects pathnames without locale prefix.
2. **Dictionary loader** (`lib/dictionary.ts`): Dynamic imports per locale using `import("@/dictionaries/{locale}.json")`
3. **Layout**: `app/[locale]/layout.tsx` sets `lang` and `dir` (RTL for Arabic) attributes on `<html>`
4. **Sitemap**: Generates entries for all 13 locales x 51 pages with proper `hreflang` alternates
5. **OpenGraph**: Dynamic OG locale alternates for all 13 languages

### RTL Support

Arabic (`ar`) is configured as the sole RTL locale. The layout sets `dir="rtl"` for Arabic pages.

---

## Authentication & Dashboard

### Supabase Integration

- **Auth**: Supabase Auth (magic link, OAuth)
- **Database**: PostgreSQL via Supabase
- **Middleware**: Session refresh via Supabase SSR

### Login Flow

1. User enters email → Supabase sends magic link
2. User clicks link → `/auth/callback` processes OAuth
3. Redirect to dashboard

### Dashboard Features

- Agent status display (pending/active/inactive/suspended)
- User profile management
- Last calls overview
- Quick actions (test call, support contact)
- Audio validation section

### Onboarding (4-Step Wizard)

1. **Company Info**: Name, industry, business hours, services, languages, Google Maps URL
2. **Agent Config**: Name, voice selection, greeting text, escalation contacts
3. **Phone Setup**: Phone number, provider, forwarding mode, instructions
4. **Legal**: AVV acceptance, transcript consent, data retention settings

### Supported Industries (for onboarding)

Hotel, Medical, Restaurant, Legal, Beauty, Automotive, Real Estate, Other

### Phone Providers

Telekom, Vodafone, O2, 1&1, Sipgate, Other (custom)

---

## SEO & Metadata

### Sitemap

Dynamic sitemap (`app/sitemap.ts`) generates entries for:
- 13 locales x 45 pages
- Proper `hreflang` alternates for every URL
- Homepage priority: 1.0 (weekly), solution pages: 0.9 (monthly), other: 0.7 (monthly)

### Robots.txt

- Allows: Googlebot, Bingbot, ClaudeBot, GPTBot, PerplexityBot, CopilotBot
- Blocks: AhrefsBot, SemrushBot, MJ12bot
- Disallows: `/api/`, `/_next/`, `/admin/`

### OpenGraph

- Dynamic OG image generation (`app/opengraph-image.tsx`)
- Locale alternates for all 13 languages
- SoftwareApplication JSON-LD structured data

### Structured Data

JSON-LD `SoftwareApplication` schema in `app/layout.tsx`:
- Application category: BusinessApplication
- Operating system: Web, iOS, Android
- Price: 0.00 EUR (free tier)
- Offers: All 13 languages listed

### PWA

- `manifest.json` linked
- Apple Web App capable (`apple-mobile-web-app-capable`)
- `format-detection: telephone=no` (prevents iOS number detection)

---

## Compliance & Security

### Compliance Badges Displayed

| Badge | File |
|-------|------|
| SOC2 | `public/images/compliance/soc2.png` |
| ISO 27001 | `public/images/compliance/iso-27001.png` |
| ISO 42001 (AI) | `public/images/compliance/iso-42001.png` |
| HIPAA | `public/images/compliance/hipaa.svg` |
| GDPR | `public/images/compliance/gdpr.svg` |
| EU AI Act | `public/images/compliance/eu-ai-act.svg` |
| STAR | `public/images/compliance/star.png` |
| FedRAMP | `public/images/compliance/fedramp.png` |
| PCI DSS | `public/images/compliance/pci-dss.png` |

### Security Headers

Configured in `next.config.mjs`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Permissions-Policy` | camera/mic/geolocation/usb/payment all denied |
| `Content-Security-Policy` | Custom CSP with CDN, analytics, and font allowances |

### Cache-Control

| Resource | Cache Duration |
|----------|---------------|
| Static assets (images, fonts) | 1 year, immutable |
| HTML pages | 1 hour, public |
| API routes | no-cache, no-store |
| robots.txt, sitemap.xml | 1 day |

---

## Cross-Platform Compatibility

The site follows strict cross-platform guidelines:

### CSS Rules

- `min-height: 100dvh` (not `100vh`) — safe on iOS Safari
- `overscroll-behavior: contain` on scrollable containers
- `overflow-x: hidden`, `max-width: 100vw` on root
- `safe-area-inset` padding for iOS notch / Android cutout
- `touch-action: manipulation` on all interactive elements

### Typography

- `clamp()` for all hero/headline sizes
- `-webkit-font-smoothing: antialiased`
- `-moz-osx-font-smoothing: grayscale`

### Touch Targets

- All interactive elements: `min-height: 44px`, `min-width: 44px`
- `cursor: pointer` on all clickable elements

### Animations

- CSS `@keyframes` preferred over JavaScript for performance
- `will-change: transform` + `transform: translateZ(0)` for GPU acceleration
- Framer Motion used sparingly (one-shot transitions only)

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (for monorepo; npm works for this standalone copy)
- Supabase project (for auth features)

### Installation

```bash
# Clone this standalone repo
git clone https://github.com/Chilix2/NewWebsite.git
cd NewWebsite

# Install dependencies
npm install
# or: pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
# or: pnpm dev
```

The dev server starts at `http://localhost:3000`.

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

### Testing

```bash
# Local Playwright tests
npx playwright test --config=playwright.local.config.ts

# Visual regression tests (requires Percy token)
npx playwright test --config=playwright.browserstack.config.ts
```

---

## Deployment

### Production

The site is deployed at **[www.sailly.de](https://www.sailly.de)** on AWS EC2 (eu-central-1) behind PM2.

### Deployment Artifacts

Build output is in `.next/` directory. For deployment:
1. Build: `npm run build`
2. Package: `.next/`, `public/`, `package.json`, `next.config.mjs`, and source directories
3. Upload to S3
4. SSM command deploys to EC2 instance, restarts PM2

---

## Directory Map

```
.
├── app/                          # Next.js App Router pages
│   ├── [locale]/                 # Locale-prefixed routes (de, en, tr, ...)
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root locale layout (Header + Footer)
│   │   ├── loesungen/            # Industry solution pages
│   │   │   ├── hotels/
│   │   │   ├── restaurants/
│   │   │   ├── medical/
│   │   │   ├── legal/
│   │   │   └── services/
│   │   ├── produkt/              # Product pages
│   │   │   ├── integrationen/
│   │   │   ├── security-compliance/
│   │   │   ├── languages/
│   │   │   └── ... (8 more)
│   │   ├── preise/               # German pricing
│   │   ├── pricing/              # English pricing
│   │   ├── login/                # Login page
│   │   ├── dashboard/            # User dashboard (protected)
│   │   ├── onboarding/           # 4-step agent onboarding wizard
│   │   ├── use-cases/branche/    # Industry use cases
│   │   ├── ai-impacts/           # AI impact pages
│   │   ├── demo/                 # Live demo page
│   │   └── ... (contact, blog, etc.)
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── onboarding/           # Onboarding submission
│   │   └── audio-validation/     # Audio testing
│   ├── auth/callback/            # Supabase OAuth callback
│   ├── layout.tsx                # Root HTML layout
│   ├── page.tsx                  # Redirect / → /de
│   ├── globals.css               # Global styles, Tailwind imports, animations
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── opengraph-image.tsx       # Dynamic OG image
│   └── favicon.tsx               # Dynamic favicon
│
├── components/                   # React components
│   ├── ui/                       # 61 shadcn/ui-style components
│   ├── hero-v2.tsx               # Cinematic hero
│   ├── sailly-landing-v2.tsx      # Homepage composer
│   ├── sailly-header-v2.tsx       # Header/navigation
│   ├── sailly-footer.tsx          # Footer
│   ├── industry-template.tsx      # Reusable industry page template
│   └── ... (50+ more components)
│
├── dictionaries/                 # i18n content (13 languages)
│   ├── de.json                   # German (primary)
│   ├── en.json                   # English
│   └── ... (11 more)
│
├── lib/                          # Utilities & backend
│   ├── dictionary.ts             # i18n dictionary loader
│   ├── supabase/                 # Supabase client/server/middleware
│   └── compliance-certificates.ts # Compliance badge data
│
├── types/                        # TypeScript type definitions
│   └── onboarding.ts             # Customer, Agent, Onboarding types
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── use-toast.ts              # Toast notifications
│   └── use-mobile.ts             # Mobile detection
│
├── context/                      # React contexts
│   └── AuthContext.tsx            # Auth state provider
│
├── public/                       # Static assets
│   ├── images/                   # Images and compliance badges
│   ├── videos/                   # Video backgrounds
│   ├── audio/demos/              # AI voice demo MP3s (11 languages)
│   └── fonts/                    # Custom fonts
│
├── scripts/                      # Build & utility scripts
│   └── watchdog.sh               # PM2 watchdog
│
├── tests/                        # Playwright tests
│   ├── mobile-smoke.spec.ts      # Mobile smoke tests
│   └── percy-visual.spec.ts      # Visual regression tests
│
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── components.json               # shadcn/ui config
├── package.json                  # Dependencies & scripts
├── middleware.ts                  # Locale routing middleware
├── playwright.local.config.ts    # Local Playwright config
├── playwright.browserstack.config.ts # BrowserStack Playwright config
└── README.md                     # This file
```

---

## Contributing

This is a standalone copy of the Sailly website. The original monorepo is at `https://github.com/Chilix2/website`.

### Code Style

- TypeScript strict mode enabled
- Tailwind CSS 4 with `@import "tailwindcss"`
- CSS animations preferred over JavaScript for performance
- Cross-platform compatible (see [Cross-Platform Compatibility](#cross-platform-compatibility))

### Before Committing

```bash
npm run build   # Ensure build passes
npm run lint    # Run ESLint
```

---

## License

Private repository. All rights reserved.

---

## Contact

- Website: [www.sailly.de](https://www.sailly.de)
- Dashboard: [dashboard.sailly.tech](https://dashboard.sailly.tech)
- GitHub: [github.com/Chilix2](https://github.com/Chilix2)
