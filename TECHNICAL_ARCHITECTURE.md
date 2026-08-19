# Book a Sales Meeting — Technical Architecture & Build Plan

> **Purpose of this doc:** This is the engineering blueprint for the PRD "Book a Sales Meeting" take-home assignment (Version 3.0). It translates the official product spec into a concrete tech stack, data model, file structure, evaluation breakdown, and a phase-by-phase execution plan. Give this file to your AI coding agent (Antigravity) as the system-level instruction — it should build strictly against this, phase by phase.

---

## 0. Assignment Metadata & Evaluation Breakdown

- **Role:** Full Stack Developer Intern
- **Submission Deadline:** EOD Thursday, Aug 20, 2026
- **Estimated Time:** 1 day (focused strictly on MUST items REQ-01 through REQ-07)
- **Stack:** Next.js 14 full-stack (React + API routes + Middleware)
- **Deployment:** Vercel + Neon PostgreSQL (Production connected)

### Evaluation Matrix (How this is graded)
| Category | Weight | Focus Areas |
|---|---|---|
| **Auth & Backend Logic** | **25%** | Correct password hashing, JWT session, error handling on login/signup, server-side route protection. |
| **UI/UX Fidelity & States** | **20%** | Wireframe alignment (Screen 01, 02, 03), single hero CTA, all 4 modal states, no layout jump on error, focus trap, mobile full-screen modal. |
| **Third-Party Integration** | **25% / 15%** | Cal.com / Calendly embed, async loading without blocking paint, graceful fallback state when widget fails. |
| **Deployment** | **15%** | Live Vercel URL with connected production DB, no local-only mocks. |
| **Code Quality** | **15%** | Type safety, clean component separation, security (no secrets committed, passwords never exposed). |
| **Written Answers** | **10%** | Clear 5–8 line responses in README for the 3 PRD questions. |

---

## 1. Scope Recap (what actually needs to ship)

Only **REQ-01 through REQ-07** are in scope for the 1-day submission. Everything tagged "Should / Deferred" (REQ-08, REQ-09, REQ-10) gets a one-paragraph "next steps" mention in the README — **do not build it**, it wastes time that's graded elsewhere (deployment, code quality).

| # | Requirement | Priority | PRD Details |
|---|---|---|---|
| REQ-01 | Landing page with single CTA | Must | Logo ONLY in nav (no secondary login link). Single high-contrast hero CTA. |
| REQ-02 | Auth modal (Sign Up / Log In toggle) | Must | Opens on hero CTA click. Tab toggle at top. Overlay on landing (not a new page). |
| REQ-03 | Sign up → auto-authenticate | Must | POST `/api/auth/signup` creates user & logs in immediately without email confirmation step. |
| REQ-04 | Login with clear error handling | Must | Credentials check. Wrong password / unknown email returns clear error message, not generic 500. |
| REQ-05 | Session persists across refresh | Must | HTTP-only cookie-based JWT session handling. |
| REQ-06 | Protected booking page (server-verified) | Must | Edge Middleware redirects logged-out users to `/` before page HTML renders. No flash of content. |
| REQ-07 | Embedded 3rd-party calendar | Must | Cal.com (`@calcom/embed-react`) or Calendly embed with dummy link + failure fallback message. |

---

## 2. Tech Stack — with reasoning

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | PRD explicitly says "Next.js full-stack (React + API routes)". App Router gives Route Handlers + Server Components + Edge Middleware — required for REQ-06. |
| Auth | **Auth.js (NextAuth v5) — Credentials Provider** | Handles password hashing hooks, JWT session, cookie management out of the box. Matches PRD data model 1:1. Prevents custom security flaws. |
| Database | **PostgreSQL via Neon / Vercel Postgres** | Free tier, serverless, works natively with Vercel deploys. PRD explicitly requires DB "connected in production, not just local." |
| ORM | **Prisma** | Type-safe schema, trivial migrations, plays perfectly with Auth.js Prisma Adapter. |
| Password hashing | **bcryptjs** | Simple, no native binary build issues on Vercel (unlike `bcrypt`). |
| Styling | **Tailwind CSS** | Fast to build clean, accessible, responsive UI without fighting a design system. Matches "trustworthy over decorative" principle. |
| Calendar widget | **Cal.com** (`@calcom/embed-react`) or Calendly inline embed | Cal.com's React embed package is clean to wire into a Next.js client component. Public dummy link — no backend booking storage. |
| Session strategy | **JWT (stateless)**, `httpOnly` secure cookie | Simplest to verify inside Middleware without a DB round-trip on every request — needed for REQ-06's server-side check. |
| Deployment | **Vercel** | PRD requirement. Native Next.js support, env var management, zero-config. |
| Validation (light) | **Zod** | Minimal Zod schemas on API routes keep code clean and type-safe. |

---

## 2.1 Design System, Custom Theme & Typography

### Typography Setup
- **Primary Font:** Google Sans Flex (`font-sans`)
- **Secondary Font:** Inter
- **Tertiary / Mono Font:** IBM Plex Mono (`font-mono`)

```html
<!-- Google Fonts Imports -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Custom Design Tokens (`globals.css`)
```css
:root {
  --card: #f7f8f8;
  --ring: #1da1f2;
  --input: #f7f9fa;
  --muted: #E5E5E6;
  --accent: #E3ECF6;
  --border: #e1eaef;
  --radius: 1.3rem;
  --chart-1: #1e9df1;
  --chart-2: #00b87a;
  --chart-3: #f7b928;
  --chart-4: #17bf63;
  --chart-5: #e0245e;
  --popover: #ffffff;
  --primary: #1e9df1;
  --sidebar: #f7f8f8;
  --font-mono: 'IBM Plex Mono', Menlo, monospace;
  --font-sans: 'Google Sans Flex', Inter, sans-serif;
  --secondary: #0f1419;
  --background: #ffffff;
  --font-serif: Georgia, serif;
  --foreground: #0f1419;
  --destructive: #f4212e;
  --shadow-blur: 0px;
  --shadow-color: rgba(29,161,242,0.15);
  --sidebar-ring: #1da1f2;
  --shadow-spread: 0px;
  --shadow-opacity: 0;
  --sidebar-accent: #E3ECF6;
  --sidebar-border: #e1e8ed;
  --card-foreground: #0f1419;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 2px;
  --sidebar-primary: #1e9df1;
  --muted-foreground: #0f1419;
  --accent-foreground: #1e9df1;
  --popover-foreground: #0f1419;
  --primary-foreground: #ffffff;
  --sidebar-foreground: #0f1419;
  --secondary-foreground: #ffffff;
  --destructive-foreground: #ffffff;
  --sidebar-accent-foreground: #1e9df1;
  --sidebar-primary-foreground: #ffffff;
}

.dark {
  --card: #17181c;
  --ring: #1da1f2;
  --input: #22303c;
  --muted: #181818;
  --accent: #061622;
  --border: #242628;
  --chart-1: #1e9df1;
  --chart-2: #00b87a;
  --chart-3: #f7b928;
  --chart-4: #17bf63;
  --chart-5: #e0245e;
  --popover: #000000;
  --primary: #1c9cf0;
  --sidebar: #17181c;
  --secondary: #f0f3f4;
  --background: #000000;
  --foreground: #e7e9ea;
  --destructive: #f4212e;
  --shadow-color: rgba(29,161,242,0.25);
  --sidebar-ring: #1da1f2;
  --sidebar-accent: #061622;
  --sidebar-border: #38444d;
  --card-foreground: #d9d9d9;
  --sidebar-primary: #1da1f2;
  --muted-foreground: #72767a;
  --accent-foreground: #1c9cf0;
  --popover-foreground: #e7e9ea;
  --primary-foreground: #ffffff;
  --sidebar-foreground: #d9d9d9;
  --secondary-foreground: #0f1419;
  --destructive-foreground: #ffffff;
  --sidebar-accent-foreground: #1c9cf0;
  --sidebar-primary-foreground: #ffffff;
}

@theme inline {
  --color-card: var(--card);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --color-radius: var(--radius);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-popover: var(--popover);
  --color-primary: var(--primary);
  --color-sidebar: var(--sidebar);
  --color-font-mono: var(--font-mono);
  --color-font-sans: var(--font-sans);
  --color-secondary: var(--secondary);
  --color-background: var(--background);
  --color-font-serif: var(--font-serif);
  --color-foreground: var(--foreground);
  --color-destructive: var(--destructive);
  --color-shadow-blur: var(--shadow-blur);
  --color-shadow-color: var(--shadow-color);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-shadow-spread: var(--shadow-spread);
  --color-shadow-opacity: var(--shadow-opacity);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-border: var(--sidebar-border);
  --color-card-foreground: var(--card-foreground);
  --color-shadow-offset-x: var(--shadow-offset-x);
  --color-shadow-offset-y: var(--shadow-offset-y);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary-foreground: var(--primary-foreground);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
}
```

---

## 3. Data Model (Prisma schema)

```prisma
// prisma/schema.prisma
model User {
  id           String   @id @default(cuid())
  name         String?
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

Matches the PRD's suggested shape exactly. No booking table — the PRD explicitly says booking records are NOT stored server-side (third-party widget owns that).

---

## 4. High-Level Flow & Route Protection

```
[Landing Page] (REQ-01: Logo only nav, Single CTA)
      |
      | click "Book Appointment"
      v
[Auth Modal] (REQ-02: Sign Up / Log In toggle tab, Name field on signup only)
      |
      |  POST /api/auth/signup  or  Auth.js signIn("credentials")
      v
[JWT cookie set] --success--> redirect --> [Booking Page] (/booking)
                                                 |
                                     [Middleware checks JWT]
                                     no token -> redirect to "/" (with ?login=1)
                                                 |
                                     [Cal.com / Calendly iframe] (REQ-07)
```

### Route protection mechanism (answers PRD Written Question #1)
- `middleware.ts` runs on the Edge for the `/booking` path.
- It reads the Auth.js JWT session cookie.
- No valid token → `NextResponse.redirect("/")` **before the page ever renders** — not a client-side check, so there's no flash-of-protected-content and no way to bypass via direct URL, back button, or devtools.

---

## 5. File / Folder Structure

```
sales-booking-flow/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Landing page (REQ-01)
│   │   ├── booking/
│   │   │   └── page.tsx              # Protected booking page (REQ-06, REQ-07)
│   │   └── api/
│   │       └── auth/
│   │           ├── [...nextauth]/route.ts   # Auth.js handler (login + session)
│   │           └── signup/route.ts          # REQ-03 signup endpoint
│   ├── components/
│   │   ├── Hero.tsx                  # Screen 01 Hero with single CTA
│   │   ├── AuthModal.tsx             # REQ-02 — Sign Up / Log In overlay modal
│   │   ├── CalendarEmbed.tsx         # REQ-07 + loading & failure fallback state
│   │   └── Header.tsx                # Logged-in email + logout visual control (REQ-09)
│   ├── lib/
│   │   ├── auth.ts                   # Auth.js config (Credentials provider)
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   └── validation.ts             # Zod schemas for signup/login
│   ├── middleware.ts                 # REQ-06 server-side gate
│   └── styles/globals.css
├── .env.example
├── package.json
└── README.md
```

---

## 6. Phase-by-Phase Execution Plan

Build strictly in this order. Each phase is a working, testable checkpoint.

### Phase 0 — Scaffold (15 min)
- `npx create-next-app@latest` (TypeScript, App Router, Tailwind).
- Install: `next-auth@beta prisma @prisma/client bcryptjs zod @calcom/embed-react`
- Set up Neon PostgreSQL, get `DATABASE_URL`.
- `npx prisma init`, write schema, run `npx prisma migrate dev`.

### Phase 1 — Auth backend (25% Evaluation Weight)
- `lib/prisma.ts`: singleton client.
- `api/auth/signup/route.ts`: Zod validation → email uniqueness check → `bcrypt.hash` → create user → auto sign-in.
- `lib/auth.ts`: Auth.js Credentials provider (`authorize()` matches hash, JWT session strategy).
- Verify with POST requests before building UI.

### Phase 2 — Middleware / Server-Side Route Protection (REQ-06)
- `middleware.ts` targeting `/booking`.
- Verify JWT session; redirect unauthenticated requests to `/` immediately.
- Test in incognito: hitting `/booking` must bounce instantly without rendering protected HTML.

### Phase 3 — Landing Page (REQ-01)
- Clean, trustworthy layout per Wireframe Screen 01.
- Logo ONLY in nav (no extra login links).
- Single high-contrast CTA button "Book Appointment".
- Optional static trust-marker cards below the fold.

### Phase 4 — Auth Modal & All 4 UI States (20% Evaluation Weight)
- Modal component mounted as overlay on landing page.
- Top tab toggle: Sign Up (Name, Email, Password) vs Log In (Email, Password).
- **Reserved-height error slot** above submit button so modal layout does NOT jump when error appears.
- Implement 4 explicit states:
  1. `default`: opens on Sign Up tab (or Log In if prior login flag in `localStorage`).
  2. `submitting`: fields locked, submit button disabled with spinner/label change.
  3. `error`: inline error message in reserved slot, fields preserved, button re-enabled.
  4. `success`: modal closes, user redirected to `/booking`.
- Accessibility: `Esc` key closes modal, focus trap inside modal, `<label>` elements for inputs.
- Responsive: Full-screen modal on mobile (≤640px).

### Phase 5 — Booking Page & Calendar Integration (REQ-06 UI + REQ-07)
- Header with logged-in user email and visual logout button (REQ-09).
- `CalendarEmbed.tsx` wrapping Cal.com widget.
- **Async script loading**: Landing page & page skeleton render instantly while calendar script loads async.
- **Fallback state**: If calendar script times out or fails, render: *"Scheduling is temporarily unavailable — try refreshing"* instead of blank screen.

### Phase 6 — Edge Cases & Responsive Polish
- Session expires mid-booking → next navigation/request to `/booking` redirects to `/?login=1` (auto-opens modal on Log In tab).
- Responsive pass: full width CTA and calendar embed on screens ≤640px.

### Phase 7 — Production Deployment & Verification
- Push to GitHub, link to Vercel.
- Configure production environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
- Run `npx prisma migrate deploy` on production DB.
- Smoke test full flow end-to-end on live Vercel URL.

### Phase 8 — README & Written Deliverables (10% Evaluation Weight)
- Setup instructions, auth architecture summary, live deployment URL.
- Detailed answers to the 3 required PRD written questions.
- Mention deferred features (REQ-08, REQ-09, REQ-10) under "Future Improvements / Next Steps".

---

## 7. Non-Functional Criteria Checklist

- [ ] Passwords hashed with `bcryptjs`, never logged or returned in API responses.
- [ ] `/booking` protected via Edge Middleware (server-verified, not client-side redirect).
- [ ] No secrets in repo (`.env` in `.gitignore`, `.env.example` provided).
- [ ] Landing page renders instantly; calendar script loads asynchronously without blocking paint.
- [ ] Modal traps keyboard focus, closes on `Escape`, uses semantic `<label>` tags.
- [ ] Reserved-height error container in modal to prevent layout shift (layout jump).
- [ ] Calendar failure fallback message ("Scheduling is temporarily unavailable — try refreshing").
- [ ] Tested down to 375px mobile viewport width.

---

## 8. Answers to PRD Written Questions (For README)

1. **Stopping direct-URL access while logged out:** Next.js Middleware executes on the Edge before any server component or page HTML is rendered. It inspects the HTTP-only JWT session cookie on requests matching `/booking`. If invalid or missing, it returns a 307 redirect to `/` immediately — ensuring no protected HTML/data is ever sent to the browser.

2. **Abandoned modal, user returns later:** No draft state is stored. If a user closes or abandons the modal and returns later, clicking "Book Appointment" re-opens the modal fresh. It defaults to the Log In tab if a previous session flag exists in `localStorage`, otherwise the Sign Up tab.

3. **Wiring a 3rd-party calendar into an authenticated flow:** 
   - Timing & async script execution: The third-party iframe script loads asynchronously and has no knowledge of internal app auth state. We must defer script mount until server session confirmation.
   - UI feedback: Showing a clear loading skeleton while the iframe script initializes.
   - Error handling: Handling script load failures or network blocks by rendering a human-readable fallback message instead of a broken/blank container.

---

## 9. Deferred Features (Mention in README "Next Steps")

- **REQ-08**: Deep email formatting, password strength checks, duplicate-email custom alerts.
- **REQ-09**: Full functional server logout API route (visual logout button in header included).
- **REQ-10**: Deep intent tracking (direct landing page to booking route state preservation).
- Out of scope per PRD §9: Password reset, email verification, OAuth social login, custom calendar backend, payment steps.
