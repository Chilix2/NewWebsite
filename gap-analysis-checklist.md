# Sailly — Gap Analysis Checklist

Audit date: 2026-04-11  
Status options: ✅ Done | 🟡 Stub/Mock | ❌ Missing

---

## SECTION 1: Login Page — UI

| Item | Status |
|---|---|
| Email + password login form — UI complete | ✅ Done |
| Register form — UI complete | ✅ Done |
| Password strength indicator | ✅ Done |
| Show/hide password toggle | ✅ Done |
| Magic link button + sent confirmation state | 🟡 Stub (UI exists, no real email sent) |
| Tab switching (Anmelden / Konto erstellen) | ✅ Done |
| Tab state preserved via URL param ?tab=register | ✅ Done |
| German validation messages (all fields) | ✅ Done |
| Global error banner | ✅ Done |
| Loading states on all async buttons | ✅ Done |
| "Passwort vergessen?" link | 🟡 Link exists, no target page |
| AGB + Datenschutz checkboxes with links | ✅ Done |
| Trust row (DSGVO · Deutsche Server · Support) | ✅ Done (ISO 27001 removed as requested) |
| Legal footer links (Datenschutz · AGB · Impressum) | ✅ Done |
| Google login button | 🟡 Stub (button renders, no OAuth) |
| Apple login button | ❌ Missing (out of scope — skipped per decision) |
| Logo with sound-wave animation | ✅ Done |
| Responsive / mobile layout | ✅ Done |
| Accessibility: labels, aria-invalid, role=alert | ✅ Done |

---

## SECTION 2: Login Page — Function

| Item | Status |
|---|---|
| Real email/password authentication (not mock) | ❌ Missing (HMAC only, 2 hardcoded accounts) |
| Real registration (creates user in database) | ❌ Missing (mock, shows error message) |
| Real magic link email send | ❌ Missing (mock setTimeout) |
| Password reset flow (page + email) | ❌ Missing (no /passwort-vergessen page) |
| Google OAuth — works end to end | ❌ Missing |
| Apple OAuth — works end to end | ❌ Missing (out of scope) |
| Session cookie created after login | 🟡 Done for HMAC (to be replaced with Supabase Auth) |
| Session cookie cleared on logout | ✅ Done |
| New user → redirected to /onboarding | ❌ Missing (always redirects to /dashboard) |
| Returning user → redirected to /dashboard | ✅ Done |
| Error handling: wrong password, user not found | 🟡 Partial (hardcoded users only) |
| Error handling: too many requests, network error | ❌ Missing |

---

## SECTION 3: Auth & Security

| Item | Status |
|---|---|
| Supabase Auth configured (project: eaezqrfizmlkljsuhitz) | ❌ Missing (providers not enabled) |
| Supabase Auth: Email/Password provider enabled | ❌ Missing |
| Supabase Auth: Email Link (magic link) provider enabled | ❌ Missing |
| Supabase Auth: Google provider enabled | ❌ Missing |
| Supabase Auth: Apple provider enabled | ❌ Missing (out of scope) |
| Supabase Postgres already exists | ✅ Done (DATABASE_URL confirmed in .env) |
| Row Level Security (RLS) policies written | ❌ Missing |
| Route protection middleware at /middleware.ts | ❌ Missing (locale-only today) |
| /dashboard protected (redirect to /login if no session) | 🟡 Stub (HMAC check in page, not middleware) |
| /onboarding protected (redirect to /login if no session) | ❌ Missing |
| @supabase/ssr session cookie management | ❌ Missing |
| POST /api/auth/signout endpoint | ❌ Missing (/api/auth/logout exists but not /signout) |
| Apple domain verification file | ❌ Missing (out of scope) |

---

## SECTION 4: Database / Data Model

| Item | Status |
|---|---|
| Supabase table: customer_profiles | ❌ Missing |
| Supabase table: onboarding_drafts | ❌ Missing |
| Supabase table: agent_configs | ❌ Missing |
| TypeScript types: OnboardingDraft in /types/onboarding.ts | ❌ Missing |
| TypeScript types: AgentConfig interface | ❌ Missing |
| TypeScript types: CustomerProfile interface | ❌ Missing |
| Customer profile created on first registration | ❌ Missing |
| onboarding_drafts row created on registration | ❌ Missing |
| last_login_at updated on every login | ❌ Missing |

---

## SECTION 5: Onboarding Wizard

| Item | Status |
|---|---|
| Route /[locale]/onboarding exists | 🟡 Stub (placeholder page only) |
| Step 1 — Company info (name, industry, hours, services, languages) | ❌ Missing |
| Step 2 — Agent setup (name, voice selection, greeting, escalation) | ❌ Missing |
| Step 3 — Phone setup (number, provider, forwarding mode, instructions) | ❌ Missing |
| Step 4 — Legal + consent (AVV, transcripts, contacts) | ❌ Missing |
| Progress indicator (step X of 4) | ❌ Missing |
| Back / Next navigation with step validation | ❌ Missing |
| Draft auto-save to Supabase on every step advance | ❌ Missing |
| Draft resume: detect existing draft on load, show "Fortfahren" banner | ❌ Missing |
| Industry-specific: medical warning banner if industry = medical | ❌ Missing |
| Provider-specific forwarding instructions | ❌ Missing |
| Success / launch screen after Step 4 | ❌ Missing |
| Launch screen: checklist (forwarding · test call · go-live) | ❌ Missing |
| API route: POST /api/onboarding/submit | ❌ Missing |

---

## SECTION 6: Dashboard (minimal, customer-facing)

| Item | Status |
|---|---|
| Route /[locale]/dashboard exists | ✅ Done |
| Agent status card: active / inactive toggle | ❌ Missing (links to sailly.tech only) |
| Agent name + phone number shown | ❌ Missing |
| Last call summary (date, duration, topic) | ❌ Missing |
| Call count this month | ❌ Missing |
| "Einstellungen bearbeiten" link → opens onboarding in edit mode | 🟡 Stub ("Kommt bald" label) |
| "Test-Anruf starten" button (placeholder) | ❌ Missing |
| "Support kontaktieren" link | ❌ Missing (links to sailly.tech only) |
| Logout button | ✅ Done |
| Mobile responsive | ✅ Done |

---

## SECTION 7: Navigation (public site)

| Item | Status |
|---|---|
| "Anmelden" ghost link in desktop nav → /[locale]/login | ✅ Done |
| "Kostenlos starten" CTA in desktop nav → /[locale]/login?tab=register | ✅ Done |
| Both links in mobile nav/hamburger menu | ✅ Done |
| Pricing page CTAs link to /[locale]/login?tab=register | ❌ Missing (buttons have no href/onClick) |

---

## SECTION 8: DSGVO & Legal Compliance

| Item | Status |
|---|---|
| Trust messaging consistent across all pages | ✅ Done (ISO 27001 conflict removed) |
| AVV / DPA document linked from onboarding Step 4 | ❌ Missing |
| AGB document linked from register form | ✅ Done |
| Datenschutz document linked from register form | ✅ Done |
| Cookie consent banner (if any tracking present) | ❌ Missing |
| Supabase data hosted in europe-west3 | ✅ Done (DATABASE_URL confirms supabase.co; verify region in dashboard) |

---

## SECTION 9: What to REMOVE / NOT BUILD

All correctly absent from the codebase:

| Item | Status |
|---|---|
| ❌ Complex analytics dashboards with charts and graphs | ✅ Not present |
| ❌ Team/multi-user management | ✅ Not present |
| ❌ Billing / invoice portal | ✅ Not present |
| ❌ In-app chat / support widget | ✅ Not present |
| ❌ Notification preferences screen | ✅ Not present |
| ❌ "Training data" or AI improvement UI | ✅ Not present |
| ❌ API key management page | ✅ Not present |
| ❌ Webhook configuration UI | ✅ Not present |
| ❌ Role-based permissions screen | ✅ Not present |
| ❌ Anything requiring more than 3 clicks from dashboard | ✅ Not present |
| ❌ Modals layered on modals | ✅ Not present |
| ❌ Any screen with more than 6 visible fields at once | ✅ Not present |

---

## Summary

- **Section 1 (Login UI):** Mostly complete. Google button is a stub. Apple skipped.
- **Section 2 (Login Function):** Auth is HMAC with 2 hardcoded accounts — needs Supabase Auth.
- **Section 3 (Auth & Security):** No Supabase Auth enabled, no middleware route protection.
- **Section 4 (Data Model):** No customer-facing DB tables exist yet.
- **Section 5 (Onboarding):** Stub page only — entire wizard to be built.
- **Section 6 (Dashboard):** Route exists but shows sailly.tech links; needs real agent data.
- **Section 7 (Navigation):** Nav links done; pricing page CTAs missing.
- **Section 8 (DSGVO):** Cookie banner missing; AVV link needed in onboarding Step 4.
- **Section 9 (Do Not Build):** All correctly absent. ✅
