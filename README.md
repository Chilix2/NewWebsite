# QORTEX - Workflow Automation Platform

## 📋 Business Overview

**QORTEX** is a flexible workflow automation platform designed to democratize process automation for businesses of all sizes. The platform combines the power of code with the simplicity of drag-and-drop interfaces, enabling companies to automate complex workflows with AI-powered intelligence.

### Mission Statement
> "Wir demokratisieren Prozessautomatisierung" (We democratize process automation)

QORTEX was founded to give companies of all sizes access to powerful, AI-driven workflows. Our mission is to eliminate repetitive tasks so teams can focus on creativity, strategy, and human relationships.

### Core Value Propositions

1. **Flexible Automation**: Build with the precision of code or the speed of drag-and-drop
2. **AI-Powered**: Native integration with leading LLMs (GPT-4, Claude, Gemini) and RAG capabilities
3. **Enterprise-Ready**: ISO 27001 certified, GDPR compliant, with enterprise-grade security
4. **Universal Connectivity**: 500+ pre-built integrations for all major business tools
5. **No-Code & Code**: Visual builder for business users, code editor for developers

### Target Market

- **Primary**: Mid-to-large enterprises seeking workflow automation
- **Industries**: Banking, Healthcare, Manufacturing, Construction, Retail, Legal, Public Sector, Telecom
- **Use Cases**: IT Operations, Sales, Marketing, Support, SecOps, HR, Finance

---

## 🎨 Design System

### Visual Identity: "Cosmic Iris"

The QORTEX website features a unique **Cosmic Iris** design system - a sophisticated gradient-based aesthetic that combines:

#### Color Palette

**Primary Gradient (Cosmic Iris)**
- Light Background: `#a8b4d4` → `#8b9dc3` → `#7c8bc4`
- Dark Background: `#334155` → `#1e293b` → `#0f172a`
- Brand Colors:
  - Primary Blue: `#3b82f6`
  - Cyan Accent: `#38bdf8`
  - Cosmic Periwinkle: `#8b9dc3`
  - Cosmic Lavender: `#a8b4d4`
  - Cosmic Mint: `#b8e6e0`
  - Cosmic Deep Blue: `#7c8bc4`

**Text Colors**
- Light Mode Headings: `#1e1b4b`
- Light Mode Body: `#312e81`
- Dark Mode Headings: `#ffffff`
- Dark Mode Body: `#cbd5e1`

#### Design Principles

1. **Glass Morphism (Glassmorphism)**
   - Translucent panels with backdrop blur
   - Subtle borders with white/transparent overlays
   - Depth through layered shadows
   - Iridescent shimmer effects on hover

2. **Liquid Backgrounds**
   - Animated gradient waves
   - Organic blob shapes with blur effects
   - Soap bubble animations rising from bottom
   - Neural network connections (subtle)

3. **Visual Elements**
   - **QortexVortex**: Central radiating lines animation (signature visual)
   - Floating bubbles with iridescent effects
   - Glass pill badges for categories
   - Card lines (decorative gradient lines)
   - 3D button effects with shadows

4. **Typography**
   - Primary Font: Geist (Google Fonts)
   - Mono Font: Geist Mono
   - Font weights: Regular (400), Medium (500), Semibold (600), Bold (700)
   - Text shadows for readability on gradient backgrounds

#### Component Styles

**Glass Cards** (`.glass-panel-ultimate`, `.glass-card-neon-5`)
```css
- Background: rgba(255, 255, 255, 0.1)
- Backdrop blur: 25px with 180% saturation
- Border: 1px solid rgba(255, 255, 255, 0.3)
- Border radius: 24px
- Shadow: Multi-layered with inner glow
- Hover: TranslateY(-4px) + scale(1.005)
```

**Glass Icons** (`.glass-icon`)
- Gradient backgrounds (blue, purple, orange, green, red, cyan)
- Size variants: sm, md, lg, xl
- Top highlight gradient for 3D effect
- Bottom reflection shadow

**Buttons**
- Primary: Gradient blue with 3D shadow effect
- Outline: Transparent with border
- Hover states with scale transforms
- Rounded corners (xl: 24px)

---

## 🏗️ Technical Stack

### Core Technologies

- **Framework**: Next.js 16.0.7 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI (shadcn/ui style)
- **Animations**: Framer Motion 12.23.26
- **Icons**: Lucide React 0.454.0
- **Analytics**: Vercel Analytics

### Key Dependencies

**UI & Forms**
- `@radix-ui/*` - Accessible component primitives
- `react-hook-form` - Form management
- `zod` - Schema validation
- `class-variance-authority` - Component variants

**Styling & Design**
- `tailwind-merge` - Merge Tailwind classes
- `clsx` - Conditional class names
- `tw-animate-css` - Animation utilities
- `next-themes` - Theme management

**Data & Charts**
- `recharts` - Chart library
- `date-fns` - Date utilities

**Other**
- `sonner` - Toast notifications
- `cmdk` - Command palette
- `embla-carousel-react` - Carousel component

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js built-in bundler

---

## 📁 Project Structure

```
workflow-logic-review/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with header
│   ├── page.tsx                  # Homepage (landing)
│   ├── globals.css              # Global styles & Cosmic Iris theme
│   │
│   ├── about/                    # About Us page
│   ├── blog/                     # Blog listing
│   ├── careers/                  # Careers page
│   ├── community/                # Community hub
│   ├── contact/                  # Contact form
│   ├── news/                     # News/Showcase page
│   ├── partners/                 # Partner program
│   ├── pricing/                  # Pricing plans
│   ├── resources/                # Resources hub
│   │
│   ├── produkt/                  # Product pages
│   │   ├── platform-overview/    # Platform overview
│   │   ├── workflow-builder/     # Visual builder
│   │   ├── ki-integration/       # AI integration
│   │   ├── integrationen/        # Integrations
│   │   ├── security-compliance/  # Security & compliance
│   │   └── templates/            # Workflow templates
│   │
│   ├── use-cases/                # Industry use cases
│   │   └── branche/
│   │       ├── banking/          # Banking & Finance
│   │       ├── baubranche/       # Construction
│   │       ├── healthcare/       # Healthcare
│   │       ├── legal/            # Legal
│   │       ├── manufacturing/    # Manufacturing
│   │       ├── public-sector/    # Public Sector
│   │       ├── retail/           # Retail
│   │       └── telecom/          # Telecommunications
│   │
│   └── ai-impacts/               # AI impact use cases
│       ├── it-ops/               # IT Ops automation
│       ├── marketing/            # Marketing automation
│       ├── sales/                # Sales automation
│       ├── secops/               # Security operations
│       └── support/              # Support automation
│
├── components/                   # React components
│   ├── qortex-header.tsx         # Main navigation header
│   ├── qortex-landing.tsx        # Landing page component
│   ├── qortex-vortex.tsx         # Signature vortex animation
│   ├── qortex-stats.tsx          # Statistics section
│   ├── content-card.tsx          # Reusable content card
│   ├── news-scroll-showcase.tsx  # News scroll component
│   ├── workflow-diagrams.tsx     # Workflow visualization
│   ├── neural-network-bg.tsx     # Neural network background
│   ├── theme-provider.tsx        # Theme context provider
│   │
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── glass-icon.tsx        # Custom glass icon component
│       └── [50+ other UI components]
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection
│   └── use-toast.ts             # Toast notifications
│
├── lib/                          # Utility functions
│   └── utils.ts                 # cn() class name utility
│
├── public/                       # Static assets
│   ├── icon.svg                 # Favicon
│   ├── icon-light-32x32.png
│   ├── icon-dark-32x32.png
│   └── [placeholder images]
│
├── styles/                       # Additional styles
│   └── globals.css              # Alternative global styles
│
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.mjs              # Next.js config
├── postcss.config.mjs           # PostCSS config
├── components.json              # shadcn/ui config
│
└── [Deployment Scripts]
    ├── deploy-to-aws.ps1        # AWS deployment (PowerShell)
    └── setup-ec2.sh             # EC2 setup script
```

---

## 🎯 Website Structure & Pages

### Main Navigation

1. **Produkt** (Product)
   - Platform Overview
   - Visual Workflow Builder
   - KI-Integration (AI Integration)
   - Integrationen (Integrations)
   - Security & Compliance
   - Templates

2. **Use Cases** (Branche)
   - Banking & Finanzdienstleistungen
   - Architektur & Bau
   - Healthcare
   - Manufacturing
   - Öffentlicher Sektor
   - Retail
   - Rechtswesen
   - Telekommunikation

3. **AImpacts** (AI Impact Use Cases)
   - IT Ops - Mitarbeiter onboarden
   - Support - WhatsApp mit RAG
   - SecOps - Email-Sicherheit
   - Sales - Call-Daten extrahieren
   - Marketing - Branchen-Analyse

4. **Preise** (Pricing)
   - Starter (Free)
   - Pro (€49-59/month)
   - Enterprise (Custom)

5. **Ressourcen** (Resources)
   - Ressourcen Center
   - Dokumentation
   - Blog & Updates
   - Community
   - Academy

6. **News** - Success stories showcase

### Standard Pages

- `/about` - Company mission and values
- `/blog` - Blog articles and insights
- `/careers` - Job openings
- `/community` - Community platforms and events
- `/contact` - Contact form
- `/partners` - Partner program
- `/pricing` - Pricing plans
- `/resources` - Resources hub

---

## 🎨 Design Guidelines

### Layout Principles

1. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
   - Touch-friendly tap targets (min 44px)
   - Horizontal scroll prevention

2. **Spacing System**
   - Section padding: `py-12 sm:py-20 px-4 sm:px-6`
   - Card padding: `p-6 sm:p-8`
   - Gap between elements: `gap-4 sm:gap-6` or `gap-8`

3. **Typography Scale**
   - H1: `text-4xl sm:text-5xl md:text-6xl`
   - H2: `text-2xl sm:text-3xl md:text-4xl`
   - H3: `text-xl sm:text-2xl`
   - Body: `text-base sm:text-lg`
   - Small: `text-sm sm:text-base`

4. **Color Usage**
   - Light sections: Use Cosmic Iris gradient background
   - Dark sections: Use dark gradient with neural network overlay
   - Glass cards: Always on gradient backgrounds
   - Text: High contrast with text shadows for readability

### Component Patterns

**Content Cards** (`ContentCard`)
- Glass morphism styling
- Icon with gradient background
- Category badge
- Feature list
- Impact metric
- Hover effects (scale + shadow)

**Glass Icons** (`GlassIcon`)
- Size variants: sm, md, lg, xl
- Color variants: blue, purple, orange, green, red, cyan
- 3D effect with top highlight and bottom shadow

**Buttons**
- Primary: Solid gradient with 3D effect
- Outline: Transparent with border
- Ghost: Minimal hover state
- Size variants: sm, default, lg

**Navigation**
- Fixed header with backdrop blur
- Dropdown menus on hover (desktop)
- Mobile hamburger menu
- Smooth transitions

### Animation Guidelines

1. **Page Load**
   - Fade-in animations
   - Staggered card appearances
   - Smooth scroll behavior

2. **Interactions**
   - Hover: Scale (1.02-1.05) + shadow increase
   - Click: Subtle press effect
   - Transitions: 0.3s ease for most elements

3. **Background Elements**
   - Gradient wave: 15s infinite ease
   - Bubble rise: 8-16s infinite
   - Cosmic drift: 30s infinite alternate
   - Neural pulse: 3s infinite

---

## 🚀 Development Setup

### Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm
- Git

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd workflow-logic-review

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Currently, no environment variables are required for basic functionality. For production deployment, you may need:

- `NEXT_PUBLIC_ANALYTICS_ID` (for Vercel Analytics)
- API keys for external services (if added)

---

## 📦 Key Features

### Platform Features

1. **Visual Workflow Builder**
   - Drag-and-drop interface
   - 500+ pre-built nodes
   - Live preview
   - Version control (Git integration)
   - Code editor for custom logic

2. **AI Integration**
   - Support for GPT-4, Claude 3, Gemini, Llama
   - RAG (Retrieval-Augmented Generation)
   - Vector database integration
   - Multi-model support

3. **Integrations**
   - 500+ pre-built connectors
   - REST/GraphQL API support
   - Webhook endpoints
   - Database synchronization
   - Custom API connectors

4. **Security & Compliance**
   - ISO 27001 certified
   - GDPR compliant
   - SOC 2 Type II
   - End-to-end encryption
   - SSO/MFA support
   - Audit logging

5. **Templates**
   - 30+ workflow templates
   - Categories: Productivity, Data Processing, AI, Integration, E-Commerce, HR, Marketing, Support, Finance, IT Ops, Sales
   - Community-contributed templates

### Use Case Categories

**By Industry:**
- Banking & Finance
- Construction
- Healthcare
- Legal
- Manufacturing
- Public Sector
- Retail
- Telecommunications

**By Function:**
- IT Operations
- Sales
- Marketing
- Support
- Security Operations
- HR
- Finance

---

## 🎯 Business Goals

### Primary Objectives

1. **Democratize Automation**: Make workflow automation accessible to businesses of all sizes
2. **AI-First Approach**: Leverage modern LLMs for intelligent automation
3. **Enterprise Ready**: Provide security and compliance for regulated industries
4. **Developer Friendly**: Support both no-code and code-based workflows
5. **Community Driven**: Build a thriving ecosystem of templates and integrations

### Target Metrics

- **User Adoption**: 500+ global customers
- **Geographic Reach**: 30+ countries
- **Project Success**: 100% completed projects
- **Experience**: 12+ years in automation

### Competitive Advantages

1. **Hybrid Approach**: Code + No-Code in one platform
2. **Native AI**: Built-in LLM integration, not an add-on
3. **German/EU Focus**: GDPR-first, data residency options
4. **Enterprise Security**: Bank-level security from day one
5. **Flexible Deployment**: Cloud, hybrid, or on-premise

---

## 🔧 Configuration Files

### `next.config.mjs`
- TypeScript build errors ignored (for development)
- Images unoptimized (for static export compatibility)

### `tsconfig.json`
- Strict mode enabled
- Path aliases: `@/*` → `./*`
- React JSX mode

### `components.json`
- shadcn/ui configuration
- Style: "new-york"
- Tailwind CSS variables
- Component aliases

### `postcss.config.mjs`
- Tailwind CSS PostCSS plugin

---

## 📝 Content Strategy

### Messaging Tone

- **Professional yet approachable**: Enterprise-grade but not intimidating
- **German language**: Primary language is German (Deutsch)
- **Benefit-focused**: Emphasize outcomes (time saved, errors reduced)
- **Technical credibility**: Show deep technical capabilities
- **Trust-building**: Highlight security, compliance, certifications

### Key Messages

1. "Flexible Workflow-Automatisierung für Ihr Unternehmen"
2. "Bauen Sie mit der Präzision von Code oder der Geschwindigkeit von Drag-and-Drop"
3. "KI-gestützte Automatisierung reduziert Bearbeitungszeit um 80%"
4. "DSGVO-konform, ISO 27001, Enterprise-ready"

---

## 🚢 Deployment

### AWS EC2 Deployment

Scripts are provided for AWS deployment:

1. **`setup-ec2.sh`**: Initial server setup
   - Installs Node.js 20.x
   - Installs pnpm
   - Configures firewall
   - Sets up PM2 (optional)

2. **`deploy-to-aws.ps1`**: Windows PowerShell deployment script
   - Creates project archive
   - Transfers to EC2
   - Extracts and installs dependencies

### Deployment Steps

```bash
# On EC2
bash setup-ec2.sh

# From local machine (Windows)
.\deploy-to-aws.ps1 -PublicIP "YOUR_IP" -KeyPath "C:\path\to\key.pem"
```

### Production Considerations

- Use environment variables for API keys
- Configure proper domain and SSL
- Set up monitoring and logging
- Enable CDN for static assets
- Configure database connections
- Set up backup strategies

---

## 📚 Additional Resources

### Documentation Files

- `AWS_DEPLOYMENT_GUIDE.md` - AWS deployment instructions
- `AWS_INSTANCE_RECOMMENDATIONS.md` - EC2 instance recommendations
- `DEV_BUILD_SETUP.md` - Development setup guide
- `MULTI_APP_SETUP.md` - Multi-app configuration
- `QUICK_START.md` - Quick start guide
- `VERIFICATION_REPORT.md` - Page verification report
- `WEBSITE_COMPARISON_SUMMARY.md` - Comparison with competitors

### Verification

Run `node verify-pages.js` to verify all pages are properly configured.

---

## 👥 Team & Contact

### Company Information

- **Name**: QORTEX
- **Mission**: Demokratisierung der Prozessautomatisierung
- **Location**: Berlin, Deutschland (based on contact page)
- **Contact**: hello@qortex.com, support@qortex.com

### Values

1. **Kundenliebe** (Customer Love): Build products customers love
2. **Nachhaltigkeit** (Sustainability): Long-term solutions over quick hacks
3. **Teamwork**: Collaborative and transparent work culture

---

## 🔮 Future Enhancements

### Planned Features

1. **Academy**: Interactive courses and certifications
2. **API Documentation**: Comprehensive developer portal
3. **Case Studies**: Detailed customer success stories
4. **Partner Marketplace**: Third-party integrations marketplace
5. **Advanced Analytics**: Workflow performance insights
6. **Mobile App**: Native mobile workflow builder

### Content Expansion

- More industry-specific use cases
- Video tutorials
- Webinar series
- Community-contributed templates
- Integration guides

---

## 📄 License

Private project - All rights reserved © 2025 QORTEX

---

## 🙏 Acknowledgments

- Built with Next.js and React
- UI components from shadcn/ui
- Icons from Lucide
- Design inspiration from modern SaaS platforms

---

**Last Updated**: January 2025
**Version**: 0.1.0
**Status**: Active Development






