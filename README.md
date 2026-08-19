# 📅 Book a Sales Meeting — PRD v3.0 Specification Solution

> **Live Deployment:** [Vercel Deployment URL](https://sales-booking-flow.vercel.app) *(Deploy via GitHub)*  
> **PRD Design Version:** 3.0 (Full-Stack Next.js 14 App Router + Auth.js v5 + Prisma SQLite/PostgreSQL)  
> **Design Specification Spec:** [`docs/design.md`](file:///e:/Book%20sales/docs/design.md)

---

## 1. 🌟 Project Overview

**Book a Sales Meeting** is a production-grade full-stack web application that gates a sales consultation scheduling calendar behind authentication. Unauthenticated visitors are guided through a high-impact marketing landing page with a single primary CTA ("Book Appointment") that opens an overlay Auth Modal (Sign Up / Log In toggle tabs). Upon authentication, users are redirected to the protected `/booking` page featuring an embedded Cal.com scheduling calendar.

---

## 2. 🎨 Design System & Typography Tokens (`docs/design.md`)

The application design system adheres strictly to the PRD specifications outlined in `docs/design.md`:

### Color System
- **Page Background (`--paper`):** `#F8F8FA`
- **Surface / Cards (`--card`):** `#FFFFFF`
- **Primary Text (`--ink`):** `#1B1F27`
- **Secondary / Muted Text (`--muted`):** `#666B76`
- **Borders & Dividers (`--line`):** `#E4E6EC`
- **Primary Action / Accent (`--accent` / `--must`):** `#4C46E0` *(Indigo)*
- **Soft Highlight Fill (`--accent-soft`):** `#EEEDFC`
- **Secondary Accent (`--should`):** `#0E7C6B` *(Teal)* / Soft Fill `#E4F5F1`
- **Neutral Accent (`--nice`):** `#8A8F99` / Soft Fill `#F0F1F3`

### Typography Scale
- **Headings & Titles (`h1`, `h2`):** `'Newsreader', serif` (`weights: 500, 600`) — Letter spacing `-0.01em`
- **Interface & Body Text (`body`, `p`):** `'Inter', sans-serif` (`weights: 400, 500, 600`) — Line height `1.6`
- **Code & Metadata Badges (`.mono`):** `'JetBrains Mono', monospace` (`weights: 400, 500, 600`)

---

## 3. 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | Route Handlers, Server Components, Edge Middleware |
| **Authentication** | **Auth.js (NextAuth v5)** | Credentials Provider, JWT session strategy, HTTP-only cookies |
| **Database** | **SQLite (`dev.db`) / PostgreSQL**| Local zero-config & production serverless database |
| **ORM** | **Prisma ORM** | Type-safe database queries & migrations |
| **Password Hashing**| **bcryptjs** | Secure server-side password encryption |
| **Validation** | **Zod** | Schema validation for API routes & auth inputs |
| **Styling & Fonts** | **Tailwind CSS + Google Fonts**| `Newsreader`, `Inter`, `JetBrains Mono` typography |
| **Calendar Widget**| **Cal.com (`@calcom/embed-react`)**| Client-side 3rd-party calendar widget integration |
| **Deployment** | **Vercel** | Native Next.js edge platform deployment |

---

## 4. 🚀 Local Setup Instructions

### Prerequisites
- Node.js v18.17.0+
- npm v9+

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sales-booking-flow.git
   cd sales-booking-flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="dev-super-secret-key-book-sales-meeting-12345"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database Schema:**
   ```bash
   npx prisma db push
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 5. 📝 Answers to PRD Written Questions

### Question 1: How do you stop someone from reaching the booking page by typing the URL directly while logged out?
**Answer:** Route protection is enforced server-side at the Edge using Next.js Middleware (`src/middleware.ts`) and Server Components. Before any page HTML or React component is rendered, Middleware intercepts requests to `/booking` and verifies the Auth.js JWT session token in HTTP-only cookies. If invalid or missing, it issues an immediate redirect to `/?login=1`. Because no protected HTML is generated or transmitted, there is zero flash of unauthenticated content and no way to bypass protection via direct URL entry, browser back button, or developer tools.

### Question 2: If someone abandons the signup/login modal halfway, what happens when they come back later?
**Answer:** Unsubmitted form inputs are not persisted server-side. If a visitor closes or abandons the modal halfway and returns later, clicking "Book Appointment" re-opens the modal fresh. The modal checks `localStorage` for a prior login indicator (`salesflow_has_account`). If the user previously logged in on that device, it defaults to the **Log In** tab; otherwise, it defaults to the **Sign Up** tab.

### Question 3: What was tricky about wiring a 3rd-party calendar widget into an authenticated flow?
**Answer:** Integrating a 3rd-party calendar widget (Cal.com / Calendly) into an authenticated flow involves three key challenges:
1. **Async Script Execution:** Third-party embed scripts execute asynchronously and have no awareness of internal app authentication state. We defer widget script execution until the server component confirms the user's session.
2. **UI Loading Feedback & Theme Sync:** Providing a clean loading skeleton while the iframe script initializes prevents layout shifts, while dynamically synchronizing light/dark theme state.
3. **Failure Resilience & Fallbacks:** Handling network blocks, slow script loads, or ad-blockers by rendering a human-readable fallback message (*"Scheduling is temporarily unavailable — try refreshing"*) instead of a permanently blank iframe container.

---

## 6. 📊 PRD Feature Compliance Matrix

| Requirement | Priority | Status | Description |
| :--- | :--- | :--- | :--- |
| **REQ-01** | **MUST** | ✅ Pass | Landing page with primary CTA above the fold |
| **REQ-02** | **MUST** | ✅ Pass | Single modal overlay with Sign Up / Log In toggle |
| **REQ-03** | **MUST** | ✅ Pass | Sign up API creates user & authenticates immediately |
| **REQ-04** | **MUST** | ✅ Pass | Login API validates credentials & handles invalid attempts |
| **REQ-05** | **MUST** | ✅ Pass | Cookie-based persistent session across reloads |
| **REQ-06** | **MUST** | ✅ Pass | Protected booking page guarded by server middleware |
| **REQ-07** | **MUST** | ✅ Pass | Embedded Cal.com interactive calendar scheduling widget |
| **REQ-08** | **SHOULD** | ✅ Pass | Input validation & duplicate email error handling |
| **REQ-09** | **SHOULD** | ✅ Pass | Logout action clears session & redirects to home |
