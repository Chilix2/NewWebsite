# SUPABASE_SETUP.md — Sailly Auth Setup Guide

This file documents the manual steps required to enable Supabase Authentication  
for the Sailly website. The Supabase Postgres database already exists at  
project `eaezqrfizmlkljsuhitz`. These steps add Auth on top.

---

## Step 1 — Get API Keys

1. Open [app.supabase.com/project/eaezqrfizmlkljsuhitz/settings/api](https://app.supabase.com/project/eaezqrfizmlkljsuhitz/settings/api)
2. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep server-only, never expose to browser)

Add these to `apps/website/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://eaezqrfizmlkljsuhitz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste anon key here>
SUPABASE_SERVICE_ROLE_KEY=<paste service_role key here>
```

---

## Step 2 — Enable Email/Password Auth

1. Open [Authentication → Providers](https://app.supabase.com/project/eaezqrfizmlkljsuhitz/auth/providers)
2. Enable **Email** provider
3. Set **Confirm email** to OFF for development (enable in production)
4. Enable **Password** under Email provider settings

---

## Step 3 — Enable Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → project `sailly-voice-agent-eu`
2. Create an OAuth 2.0 Client ID (Web application)
3. Add Authorized redirect URI: `https://eaezqrfizmlkljsuhitz.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. In Supabase: Authentication → Providers → Google → paste Client ID + Secret → Enable
6. Add `https://sailly.de` and `https://www.sailly.de` to the authorized domains list

---

## Step 4 — Configure Redirect URLs

1. Open [Authentication → URL Configuration](https://app.supabase.com/project/eaezqrfizmlkljsuhitz/auth/url-configuration)
2. Set **Site URL** to: `https://sailly.de`
3. Add to **Redirect URLs**:
   - `https://sailly.de/auth/callback`
   - `https://www.sailly.de/auth/callback`
   - `http://localhost:3000/auth/callback` (for local dev)

---

## Step 5 — Run SQL Migrations

Open the [Supabase SQL Editor](https://app.supabase.com/project/eaezqrfizmlkljsuhitz/sql) and run these migration files in order:

1. `migrations/013_customer_profiles.sql`
2. `migrations/014_onboarding_drafts.sql`
3. `migrations/015_agent_configs.sql`

Each file creates a table and enables Row Level Security (RLS) so users can only read/write their own data.

---

## Step 6 — Create Admin Users

1. Open [Authentication → Users](https://app.supabase.com/project/eaezqrfizmlkljsuhitz/auth/users)
2. Click "Add user" → Invite
3. Create: `franck@sailly.de` with password `YachtMaster2026!`
4. Create: `sailly@sailly.de` with password `StartUp2026!`

These replace the hardcoded HMAC accounts.

---

## Step 7 — (Optional) Enable Magic Link

1. Authentication → Providers → Email → enable **Magic Link**
2. Configure email templates (Authentication → Email Templates → Magic Link)
3. Customize the German template:
   - Subject: `Ihr Sailly Anmelde-Link`
   - Body: Use the `{{ .ConfirmationURL }}` variable

---

## Step 8 — (Optional) Configure SMTP for Custom Emails

For production, replace Supabase's built-in email sender with your own SMTP:
1. Project Settings → Auth → SMTP Settings
2. Add your SMTP credentials (e.g. Postmark, Resend, SendGrid)
3. Recommended: Set sender to `noreply@sailly.de`

---

## Verification Checklist

After setup, verify:
- [ ] `GET https://eaezqrfizmlkljsuhitz.supabase.co/rest/v1/` returns 200 with anon key
- [ ] Email sign-up creates a user in Authentication → Users
- [ ] Login with `franck@sailly.de` redirects to `/de/dashboard`
- [ ] New user registration redirects to `/de/onboarding`
- [ ] Logout clears session and redirects to `/de/login`
- [ ] `/de/dashboard` without session redirects to `/de/login`
- [ ] `/de/onboarding` without session redirects to `/de/login`
