# feature: SaaS Landing Page

## Metadata
adw_id: `31b761a3`
issue_description: `Build a clean, modern SaaS landing page that showcases the product's value proposition and presents multiple pricing tiers to visitors. The page will replace the current default Next.js starter content in app/page.tsx and consist of several sections: a hero, a features overview, and a pricing plans section with clearly differentiated tiers.`

## Description
The application currently displays the default Next.js boilerplate starter page at `app/page.tsx`. This issue requires replacing that content with a clean, modern SaaS landing page. The landing page should consist of three primary sections:

1. **Hero Section** — A compelling headline, subheadline/value proposition statement, and a primary call-to-action (CTA) button.
2. **Features Section** — An overview of the product's key features presented in a visually appealing grid or list layout.
3. **Pricing Section** — Multiple pricing tiers (e.g., Free, Pro, Enterprise) with clearly differentiated feature sets and CTA buttons per plan.

The page should use the existing Tailwind CSS setup (v4 via `@import "tailwindcss"`) and the Geist font loaded in `layout.tsx`. All components should be Server Components by default (no interactivity needed), keeping the page statically renderable.

## Objective
Replace the default Next.js starter content in `app/page.tsx` with a complete, production-quality SaaS landing page containing a Hero section, a Features section, and a Pricing section with multiple differentiated tiers.

## Problem Statement
The current `app/page.tsx` renders the default Next.js bootstrapping boilerplate (Next.js logo, "edit page.tsx" message, deploy/docs links) which provides no value to end users. The product needs a real landing page that communicates the product's value and drives visitor conversions.

## Solution Statement
Create a structured, component-based landing page in `app/page.tsx` (and optionally extracted sub-components under `app/components/`) using React Server Components, Tailwind CSS v4, and the Geist font variables already configured in `app/layout.tsx`. The page will be fully statically rendered with no client-side JavaScript required for the core landing page experience.

## Code Patterns to Follow
Reference implementations:
- `app/layout.tsx` — shows how Geist font CSS variables (`--font-geist-sans`) are set up and applied via Tailwind's `font-sans`. Use `font-sans` utility class throughout components.
- `app/globals.css` — shows Tailwind v4 usage (`@import "tailwindcss"`) and CSS custom properties for `--background` / `--foreground`. Use these tokens where appropriate.
- `app/page.tsx` (current) — shows the existing Tailwind utility class patterns: flex layouts, `dark:` variants, responsive `sm:` prefixes, `max-w-*`, `rounded-full`, color utilities from `zinc-*` scale. Follow the same utility-first approach.
- Next.js 16 App Router conventions: default Server Components, file-based routing, `app/` directory. No `"use client"` directive needed for static landing pages.

## Relevant Files
Use these files to complete the task:

- `app/page.tsx` — **Primary file to modify.** Replace the entire default boilerplate with the new landing page JSX.
- `app/layout.tsx` — Read for font variables and body class setup. The `--font-geist-sans` variable maps to `font-sans` in Tailwind. Do not modify this file.
- `app/globals.css` — Read for existing CSS custom properties and Tailwind v4 import. May add small global style additions here if needed (e.g., smooth scrolling), but prefer Tailwind utilities.
- `AGENTS.md` — Contains project coding rules: **"This is NOT the Next.js you know — APIs, conventions, and file structure may differ. Read `node_modules/next/dist/docs/` before writing any code."** Follow this rule. Reference `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` for Server vs. Client component guidance.
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` — Next.js 16 guide on when to use Server vs. Client Components. All landing page sections are purely presentational and should remain Server Components.
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` — Confirms App Router page conventions (default export from `app/page.tsx`).

### New Files
- `app/components/HeroSection.tsx` — Extracted Hero section component (Server Component). Contains headline, subheadline, and CTA button(s).
- `app/components/FeaturesSection.tsx` — Extracted Features section component (Server Component). Contains feature cards grid.
- `app/components/PricingSection.tsx` — Extracted Pricing section component (Server Component). Contains pricing tier cards.
- `docs/tasks/feature-saas-landing-page-31b761a3/e2e-feature-saas-landing-page-31b761a3.md` — E2E test file describing browser-based validation of the landing page sections and pricing tiers.

## Implementation Plan

### Phase 1: Foundation
Define the data structures and content for the landing page (feature list, pricing tiers) as static constants. Create the `app/components/` directory to house the extracted section components. Ensure the existing `app/layout.tsx` metadata is updated to reflect the product name rather than "Create Next App".

### Phase 2: Core Implementation
Implement three Server Component files:
1. **`HeroSection`** — Full-width hero with a large headline, supporting paragraph, and one or two CTA buttons (e.g., "Get Started Free" + "View Pricing"). Uses a gradient or bold background color to distinguish the hero visually.
2. **`FeaturesSection`** — Responsive grid of 3–6 feature cards. Each card has an icon (use Unicode or inline SVG to avoid additional dependencies), a feature title, and a short description.
3. **`PricingSection`** — Three pricing cards (Free, Pro, Enterprise). Each card lists: plan name, price, billing period, feature list (checkmarks), and a CTA button. The recommended/popular tier should be visually highlighted (e.g., ring/border accent color, scale transform, or prominent background).

### Phase 3: Integration
Import and compose all three section components in `app/page.tsx`. Remove all boilerplate imports (`Image` from `next/image`, references to Next.js SVGs). Update `app/layout.tsx` metadata (title and description) to match the product landing page. Ensure the full page is responsive at mobile (`sm:`) and desktop breakpoints and supports dark mode via `dark:` Tailwind variants.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Update Metadata in `app/layout.tsx`
- Change `metadata.title` from `"Create Next App"` to the product name (e.g., `"Acme SaaS"`)
- Change `metadata.description` to a concise product value proposition (e.g., `"The all-in-one platform for modern teams"`)

### 2. Create the `app/components/` Directory
- Create `app/components/` directory (no `index.ts` barrel needed; import directly)

### 3. Implement `app/components/HeroSection.tsx`
- No `"use client"` directive — this is a Server Component
- Render a full-width `<section>` with a gradient or solid accent background
- Include a large `<h1>` headline (e.g., "Ship faster with Acme")
- Include a `<p>` subheadline describing the value proposition
- Include two `<a>` (or `<button>`) CTA elements: primary ("Get Started Free") and secondary ("View Pricing" that anchor-links to `#pricing`)
- Use `font-sans` utility class to inherit the Geist font
- Support dark mode via `dark:` variants

### 4. Implement `app/components/FeaturesSection.tsx`
- No `"use client"` directive — Server Component
- Define a static array of 6 features: `{ icon: string, title: string, description: string }[]`
  - Example features: Fast Deployment, Team Collaboration, Analytics Dashboard, API Access, 99.9% Uptime, 24/7 Support
- Render a `<section id="features">` with a centered heading ("Everything you need")
- Render features in a responsive CSS grid: 1 col on mobile, 2 cols at `sm:`, 3 cols at `lg:`
- Each feature card: rounded border, padding, icon + title + description
- Support dark mode via `dark:` variants

### 5. Implement `app/components/PricingSection.tsx`
- No `"use client"` directive — Server Component
- Define a static array of 3 pricing tiers:
  ```ts
  type PricingTier = {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  };

  const tiers: PricingTier[] = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals and small projects",
      features: ["Up to 3 projects", "1 GB storage", "Community support", "Basic analytics"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For growing teams that need more power",
      features: ["Unlimited projects", "50 GB storage", "Priority support", "Advanced analytics", "API access", "Custom domains"],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large organizations with advanced needs",
      features: ["Everything in Pro", "Unlimited storage", "Dedicated support", "SSO & SAML", "SLA guarantee", "Custom integrations"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];
  ```
- Render a `<section id="pricing">` with a centered heading ("Simple, transparent pricing")
- Render tiers in a responsive flex/grid: 1 col on mobile, 3 cols at `lg:`
- Highlighted tier (`highlighted: true`) should have a prominent ring/border and optionally a "Most Popular" badge
- Each tier card: plan name, price + period, description, feature checklist (✓ icon), CTA button
- CTA buttons: primary style for highlighted tier, outline style for others
- Support dark mode via `dark:` variants

### 6. Compose Landing Page in `app/page.tsx`
- Remove all existing boilerplate (the `Image` import, Next.js logo references, deploy/docs links)
- Import `HeroSection`, `FeaturesSection`, `PricingSection` from `./components/`
- Return a single `<main>` element containing all three sections in order: Hero → Features → Pricing
- Add minimal page-level wrapper styling (e.g., `<main className="flex flex-col min-h-screen">`)
- Ensure there are no `"use client"` directives — entire page remains statically rendered

### 7. Create E2E Test File at `docs/tasks/feature-saas-landing-page-31b761a3/e2e-feature-saas-landing-page-31b761a3.md`
- **Do NOT create this file now** — describe it as a task for the E2E pipeline step
- The file should document:
  - **User Story**: As a visitor, I want to see a professional landing page with hero, features, and pricing sections so I can evaluate the product and choose a plan.
  - **Test Steps** (using playwright-cli):
    1. Navigate to `http://localhost:3000`
    2. Screenshot: full page initial load state
    3. Assert `<h1>` text is visible and not the old boilerplate text ("To get started, edit the page.tsx file" must NOT appear)
    4. Assert Hero section is visible: locate element containing "Get Started" CTA button
    5. Screenshot: hero section
    6. Scroll to `#features` section
    7. Assert Features section heading is visible (e.g., "Everything you need")
    8. Assert at least 6 feature cards are rendered
    9. Screenshot: features section
    10. Scroll to `#pricing` section
    11. Assert Pricing section heading is visible (e.g., "Simple, transparent pricing")
    12. Assert 3 pricing tier cards are visible
    13. Assert the "Pro" tier card has a "Most Popular" badge or highlighted visual treatment
    14. Assert each pricing card has a CTA button
    15. Screenshot: pricing section
  - **Success Criteria**:
    - Page loads without JavaScript errors
    - All three sections (hero, features, pricing) are present in the DOM
    - Old boilerplate content is completely absent
    - "Most Popular" / highlighted pricing tier is visually distinct
    - All CTA buttons are present and have non-empty text
    - Page renders correctly at 1280px width (desktop) and 375px (mobile)

### 8. Run Validation Commands
- Run lint, build, and type check commands to confirm zero errors and zero regressions

## Testing Strategy

### Unit Tests
No unit test framework is currently configured in the project (`package.json` has no Jest or Vitest). Tests are validated via TypeScript type checking and build output. If a test framework is added in future, individual section components (`HeroSection`, `FeaturesSection`, `PricingSection`) should each have snapshot tests.

### Edge Cases
- **Dark mode**: All sections must render correctly when `prefers-color-scheme: dark` is active. Use `dark:` Tailwind variants throughout.
- **Mobile viewport**: The features grid and pricing cards must stack vertically on narrow screens (375px). Verify with responsive Tailwind breakpoints.
- **Long text**: Feature descriptions or plan names that are longer than typical should not break layouts. Use `break-words` or `truncate` where appropriate.
- **Missing/empty data**: Since all content is statically defined, this is not a concern at runtime, but ensure the TypeScript types are strict so future data changes are type-safe.
- **Anchor links**: The "View Pricing" CTA in the Hero section links to `#pricing`. Ensure the pricing section has `id="pricing"` and the features section has `id="features"` for in-page navigation to work.

## Acceptance Criteria
- [ ] `app/page.tsx` no longer contains any Next.js boilerplate content (no `next/image` import of Next.js logo, no "edit the page.tsx file" text, no Vercel/Next.js external links)
- [ ] The landing page renders a **Hero section** with a headline, subheadline, and at least one CTA button
- [ ] The landing page renders a **Features section** with at least 6 feature cards in a responsive grid
- [ ] The landing page renders a **Pricing section** with exactly 3 tiers (Free, Pro, Enterprise)
- [ ] The Pro/middle pricing tier is visually highlighted (e.g., ring, badge, or elevated treatment) compared to the other tiers
- [ ] All content is rendered as Server Components (no `"use client"` directives on any landing page component)
- [ ] The page is responsive: sections stack appropriately on mobile (375px) and display in multi-column layouts on desktop (1280px)
- [ ] Dark mode is supported: all sections have `dark:` Tailwind variant styles applied
- [ ] `app/layout.tsx` metadata has been updated with a meaningful product title and description
- [ ] `npm run build` completes with zero errors
- [ ] `npm run lint` completes with zero warnings or errors
- [ ] TypeScript type checking passes with zero errors

## Validation Commands
Execute every command to validate the work is complete with zero regressions.

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build (confirms SSR/static render works correctly)
npm run build
```

> No `.app_config.yaml` was found in the project root. Validation commands were discovered from `package.json` scripts: `build` → `next build`, `lint` → `eslint`.

## Notes
- **Next.js version**: This project uses Next.js `16.2.1` with React `19.2.4`. Per `AGENTS.md`, this version may have breaking changes versus typical training data. The `node_modules/next/dist/docs/` directory contains authoritative docs for this exact version. The App Router conventions (Server Components by default, `app/` directory, `layout.tsx` + `page.tsx`) are confirmed in those docs.
- **Tailwind v4**: The project uses `tailwindcss@^4` with `@import "tailwindcss"` syntax (not `@tailwind base/components/utilities`). This is the v4 way and is already set up correctly in `globals.css`. Do not add a `tailwind.config.js` — it is not needed with v4's CSS-first configuration.
- **No icon library**: To avoid adding new dependencies, use Unicode characters (✓, ✗, →) or simple inline SVG for feature and pricing check icons.
- **No additional dependencies**: Implement everything with the existing stack: Next.js 16, React 19, Tailwind CSS v4, TypeScript 5. Do not install new packages.
- **Component location**: Components live in `app/components/` (not `src/components/` or `components/` — follow the existing `app/` directory structure).
- **Static content only**: All text, features, and pricing data should be hardcoded static constants — no API calls, no database, no dynamic data fetching needed for this landing page.
