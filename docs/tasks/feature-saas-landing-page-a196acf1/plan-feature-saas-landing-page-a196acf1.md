# feature: SaaS Landing Page with Pricing Plans

## Metadata
adw_id: `a196acf1`
issue_description: `create simple SaaS landing page with simple plans`

## Description
Build a clean, modern SaaS landing page that showcases the product's value proposition and presents multiple pricing tiers to visitors. The page will replace the current default Next.js starter content in `app/page.tsx` and consist of several sections: a hero, a features overview, and a pricing plans section with clearly differentiated tiers.

## Objective
Replace the default Next.js boilerplate home page with a complete SaaS landing page that includes a hero section, features section, and a pricing section with at least three plan tiers (e.g., Free, Pro, Enterprise). The page must be fully responsive and styled with Tailwind CSS v4.

## Problem Statement
The application currently shows the default Next.js create-next-app boilerplate page. There is no landing page that communicates what the product does or what pricing options are available to prospective customers.

## Solution Statement
Implement a single-page SaaS landing site by replacing `app/page.tsx` with purpose-built sections. Each section will be a focused React Server Component. Styling will rely exclusively on Tailwind CSS v4 utility classes (already configured via `@tailwindcss/postcss`). No additional dependencies are required.

## Code Patterns to Follow
Reference implementations:
- `app/page.tsx` — existing page structure; follow the same `export default function` Server Component pattern, Tailwind utility classes, and `dark:` variant usage.
- `app/layout.tsx` — font variable usage (`--font-geist-sans`), metadata export, and `className` composition patterns.
- `app/globals.css` — CSS custom property definitions and `@theme inline` block for Tailwind theme tokens; extend here if new color tokens are needed.

## Relevant Files
Use these files to complete the task:

- `app/page.tsx` — **Modify**: Replace boilerplate with the full landing page content.
- `app/layout.tsx` — **Modify**: Update `metadata` (title, description) to reflect the SaaS product.
- `app/globals.css` — **Modify if needed**: Add any additional CSS custom properties or Tailwind theme tokens required by the design.
- `AGENTS.md` — Project coding rules; implementer **must** read `node_modules/next/dist/docs/` before writing any Next.js code and heed deprecation notices.

### New Files
- `app/components/HeroSection.tsx` — New Server Component for the hero/headline area.
- `app/components/FeaturesSection.tsx` — New Server Component listing key product features.
- `app/components/PricingSection.tsx` — New Server Component rendering the three pricing plan cards.
- `app/components/Navbar.tsx` — New Server Component for the top navigation bar with logo and CTA link.
- `app/components/Footer.tsx` — New Server Component for a minimal footer.
- `docs/tasks/feature-saas-landing-page-a196acf1/e2e-feature-saas-landing-page-a196acf1.md` — E2E test file (described in Step 7 below; do **not** create during implementation).

## Implementation Plan

### Phase 1: Foundation
Set up metadata, shared layout tokens, and the component folder structure. Update `layout.tsx` metadata and confirm Tailwind v4 theme tokens are available. Create the `app/components/` directory.

### Phase 2: Core Implementation
Build each section component individually, starting with the smallest (Navbar, Footer) and working up to the most complex (PricingSection with plan cards and highlight logic). Each component should be a pure Server Component exporting a single default function — no `"use client"` directive unless strictly required.

### Phase 3: Integration
Compose all section components inside `app/page.tsx`. Validate responsive layout at mobile (375 px), tablet (768 px), and desktop (1280 px) breakpoints. Run build and lint to confirm zero errors.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Update Layout Metadata
- In `app/layout.tsx`, change the `metadata` export:
  - `title`: e.g., `"Acme SaaS — Build faster"`
  - `description`: e.g., `"The all-in-one platform for modern teams."`

### 2. Create `app/components/` Directory and Navbar Component
- Create `app/components/Navbar.tsx` as a Server Component.
- Include a logo/brand name on the left (text-based, no external images needed).
- Include navigation links: "Features", "Pricing" (anchor links `#features`, `#pricing`).
- Include a right-side CTA button "Get Started" styled with a solid brand color using Tailwind.
- Use `sticky top-0 z-50` with a semi-transparent background and backdrop blur for modern feel.

### 3. Create HeroSection Component
- Create `app/components/HeroSection.tsx` as a Server Component.
- Include a bold headline (e.g., "Ship faster. Grow smarter."), a supporting sub-headline, and two CTA buttons: primary "Start for free" and secondary "See pricing" (link to `#pricing`).
- Use a full-viewport-height hero (`min-h-screen`) or at minimum a tall padded section.
- Apply a subtle gradient background using Tailwind's `bg-gradient-to-br` with brand colors.

### 4. Create FeaturesSection Component
- Create `app/components/FeaturesSection.tsx` as a Server Component.
- Add `id="features"` to the section element for anchor navigation.
- Display 3–4 feature cards in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- Each card: icon (emoji or simple SVG), title, and short description.
- Example features: "Lightning Fast", "Team Collaboration", "Advanced Analytics", "24/7 Support".

### 5. Create PricingSection Component
- Create `app/components/PricingSection.tsx` as a Server Component.
- Add `id="pricing"` to the section element.
- Define a typed `Plan` interface with fields: `name`, `price` (string, e.g. `"$0"`, `"$29"`, `"Custom"`), `period`, `description`, `features` (string array), `cta` (button label), `highlighted` (boolean).
- Render three plan cards:
  | Plan | Price | Highlights |
  |------|-------|------------|
  | Free | $0/mo | Up to 3 projects, 1 user, community support |
  | Pro | $29/mo | Unlimited projects, 10 users, priority support, analytics |
  | Enterprise | Custom | Unlimited everything, SSO, dedicated support, SLA |
- The "Pro" plan should be `highlighted: true` — render it with a distinct border, badge "Most Popular", and scaled slightly (`scale-105`) on desktop.
- Each card: plan name, price, description, feature list with checkmarks, and a CTA button.

### 6. Create Footer Component
- Create `app/components/Footer.tsx` as a Server Component.
- Simple one-row footer with copyright text and 2–3 links (Privacy, Terms, Contact).
- Dark background matching the overall theme.

### 7. Compose Landing Page in `app/page.tsx`
- Replace all existing content in `app/page.tsx`.
- Import and render components in order: `<Navbar />`, `<HeroSection />`, `<FeaturesSection />`, `<PricingSection />`, `<Footer />`.
- Remove unused `Image` import from `next/image` if no longer needed.
- Wrap everything in a single `<div>` root element with base background color class.

### 8. Create E2E Test File
- Create `docs/tasks/feature-saas-landing-page-a196acf1/e2e-feature-saas-landing-page-a196acf1.md` describing the E2E test plan.
- **Do NOT execute or implement** the E2E test — only create this markdown description file.
- The file should follow this structure:
  - **User Story**: Visitor lands on the homepage and can view all landing page sections and navigate to pricing.
  - **Test Steps** (playwright-cli browser interactions):
    1. Navigate to `http://localhost:3000`
    2. Screenshot: full hero section visible
    3. Assert page `<title>` contains "Acme SaaS"
    4. Assert hero headline text is visible (e.g., contains "Ship faster")
    5. Assert Navbar is present with "Get Started" button
    6. Click "See pricing" CTA in hero
    7. Screenshot: pricing section scrolled into view
    8. Assert three pricing cards are visible
    9. Assert "Most Popular" badge is present on Pro card
    10. Assert Free plan shows "$0"
    11. Assert Pro plan shows "$29"
    12. Assert Enterprise plan shows "Custom"
    13. Scroll to features section
    14. Screenshot: features section
    15. Assert at least 3 feature cards are visible
    16. Assert footer is present with copyright text
  - **Success Criteria**: All assertions pass, no console errors, all three pricing plans visible with correct prices.
  - **Screenshot capture points**: after page load (hero), after clicking pricing CTA (pricing), after scrolling to features.

### 9. Run Validation Commands
- Run all validation commands listed in the **Validation Commands** section below and confirm zero errors/warnings before marking the task complete.

## Testing Strategy
### Unit Tests
No unit test framework is currently configured. Testing will be handled through TypeScript type checking (`tsc --noEmit`) and the E2E test plan.

### Edge Cases
- Long feature list text should not overflow pricing cards — use `break-words` or `truncate` as appropriate.
- Pricing CTA buttons should remain visually distinct at all breakpoints.
- Dark mode: all sections must respect `dark:` Tailwind variants; test with `prefers-color-scheme: dark`.
- SSR: all components are Server Components — ensure no browser-only APIs (`window`, `document`) are used.
- `"Custom"` price in Enterprise plan must not imply a numeric cost — ensure button label says "Contact Sales" rather than implying a checkout flow.

## Acceptance Criteria
- [ ] Navigating to `/` renders a full landing page (no Next.js boilerplate visible).
- [ ] Navbar is present with logo/brand name, navigation links, and a "Get Started" CTA.
- [ ] Hero section displays headline, sub-headline, and two CTA buttons.
- [ ] Features section (`#features`) displays at least 3 feature cards in a responsive grid.
- [ ] Pricing section (`#pricing`) displays exactly 3 plan cards: Free ($0/mo), Pro ($29/mo), Enterprise (Custom).
- [ ] The Pro plan card is visually highlighted with a "Most Popular" badge.
- [ ] All sections are responsive and render correctly at 375 px, 768 px, and 1280 px widths.
- [ ] Dark mode is supported via Tailwind `dark:` variants.
- [ ] `npm run build` completes with zero errors.
- [ ] `npm run lint` completes with zero errors.
- [ ] TypeScript type checking passes with zero errors.
- [ ] Footer is present with copyright text.

## Validation Commands
Execute every command to validate the work is complete with zero regressions.

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build (catches RSC, import, and rendering errors)
npm run build
```

## Notes
- **Next.js version**: This project uses Next.js `16.2.1` with React `19.2.4`. The App Router is in use (files live under `app/`). Read `node_modules/next/dist/docs/` before making changes — this version may have breaking differences from earlier releases.
- **Tailwind v4**: The project uses Tailwind CSS v4 via `@tailwindcss/postcss`. The `@theme inline` block in `globals.css` is the v4 way to expose CSS custom properties as Tailwind tokens. Do **not** create a `tailwind.config.js` — that is the v3 pattern.
- **No external UI library**: Keep dependencies minimal. Do not install any UI component library (e.g., shadcn, MUI, Radix). Use plain Tailwind classes only.
- **Server Components only**: Do not add `"use client"` unless a component requires browser APIs or interactivity (e.g., a mobile menu toggle). For the MVP, all components can be static Server Components.
- **Path alias**: `@/*` maps to the project root (see `tsconfig.json`). Use `@/app/components/...` for imports if preferred, but relative imports are also acceptable.
- **Images**: Avoid external image URLs. Use text-based logos or inline SVGs to keep the page self-contained and avoid `next/image` domain configuration complexity.
