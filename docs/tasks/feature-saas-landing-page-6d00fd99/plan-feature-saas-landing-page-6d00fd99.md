# feature: SaaS Landing Page with Pricing Plans

## Metadata
adw_id: `6d00fd99`
issue_description: `create simple SaaS landing page with simple plans`

## Description
Create a simple, professional SaaS landing page for the application. The page should include a hero section, a features/benefits section, a pricing plans section with tiered options, and a footer. The landing page will be built as a static Server Component using the existing Next.js 16 App Router, Tailwind CSS v4, and TypeScript stack. All content is static — no backend integration, authentication, or payment processing is required at this stage.

## Objective
Deliver a fully styled, responsive SaaS landing page at the root route (`/`) that clearly communicates the product value proposition and presents tiered pricing plans (e.g., Free, Pro, Enterprise). The page must be production-ready with proper metadata, responsive design, and accessibility.

## Problem Statement
The application currently displays the default Next.js starter page with no product-specific content. There is no landing page to communicate what the SaaS product does, its features, or its pricing — making it impossible to attract or inform potential users.

## Solution Statement
Replace the default Next.js starter page with a purpose-built SaaS landing page composed of reusable UI components. The page will have the following sections:
1. **Navigation bar** — Logo/brand name with navigation links (Features, Pricing, CTA button)
2. **Hero section** — Headline, subheadline, and call-to-action button
3. **Features section** — 3-4 feature cards highlighting key product benefits
4. **Pricing section** — 3 pricing plan cards (Free, Pro, Enterprise) with feature lists and CTA buttons
5. **Footer** — Copyright, links

All components will be Server Components (no `'use client'` needed for static content), styled with Tailwind CSS v4 utility classes, and follow the existing project conventions.

## Code Patterns to Follow
Reference implementations:
- `app/layout.tsx` — Root layout pattern with Geist font setup, metadata export, and Tailwind class usage
- `app/page.tsx` — Page component pattern as default export, uses `next/image`, Tailwind utility classes with dark mode variants (`dark:`)
- `app/globals.css` — Tailwind v4 `@import "tailwindcss"` pattern, CSS custom properties for theming via `@theme inline`
- `postcss.config.mjs` — Tailwind v4 PostCSS plugin configuration
- `AGENTS.md` — Next.js 16 has breaking changes; consult `node_modules/next/dist/docs/` for conventions
- Tailwind CSS v4 is used (not v3) — use `@import "tailwindcss"` and `@theme inline` syntax
- Dark mode uses `prefers-color-scheme` media query via CSS custom properties plus `dark:` Tailwind variants
- Components are Server Components by default (no `'use client'` unless interactivity is needed)

## Relevant Files
Use these files to complete the task:

- **`app/page.tsx`** — The main page file to be replaced with the landing page content. Currently contains the default Next.js starter template.
- **`app/layout.tsx`** — Root layout with Geist font configuration and metadata. Metadata `title` and `description` need updating to reflect the SaaS product.
- **`app/globals.css`** — Global styles with Tailwind v4 import and CSS custom properties. May need additional custom properties or utility styles for the landing page.
- **`public/`** — Static assets directory. Currently contains default SVGs (`next.svg`, `vercel.svg`, etc.) that can be replaced or supplemented with product-specific assets.
- **`AGENTS.md`** — Project coding rules: Next.js 16 has breaking changes. Read relevant guide in `node_modules/next/dist/docs/` before writing code.
- **`CLAUDE.md`** — References `AGENTS.md` for project rules.
- **`node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`** — Next.js 16 layouts and pages conventions.
- **`node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`** — Server vs Client component guidance.
- **`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`** — CSS and Tailwind v4 styling guide.
- **`node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`** — Image component usage in Next.js 16.

### New Files
- **`app/components/navbar.tsx`** — Navigation bar component with logo, nav links, and CTA button
- **`app/components/hero.tsx`** — Hero section component with headline, subheadline, and CTA
- **`app/components/features.tsx`** — Features grid section with feature cards
- **`app/components/pricing.tsx`** — Pricing plans section with 3 tiered plan cards
- **`app/components/footer.tsx`** — Footer component with copyright and links
- **`docs/tasks/feature-saas-landing-page-6d00fd99/e2e-feature-saas-landing-page-6d00fd99.md`** — E2E test specification for the landing page

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Read Next.js 16 Documentation
- Read `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` to confirm page/layout conventions for this version
- Read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` for Server Component patterns
- Read `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` for Tailwind v4 CSS patterns
- Read `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` for image component usage

### 2. Update Root Layout Metadata
- Edit `app/layout.tsx` to update the `metadata` export:
  - Change `title` from `"Create Next App"` to a SaaS product name (e.g., `"LaunchPad — Ship Your SaaS Faster"`)
  - Change `description` to a product-relevant description (e.g., `"The all-in-one platform to build, launch, and grow your SaaS product."`)

### 3. Create Navigation Bar Component
- Create `app/components/navbar.tsx` as a Server Component
- Include a logo/brand text on the left
- Add navigation links: Features, Pricing
- Add a CTA button (e.g., "Get Started") on the right
- Use Tailwind classes for a sticky/fixed top navigation with responsive layout
- Support dark mode via `dark:` variants
- Use semantic `<nav>` element for accessibility

### 4. Create Hero Section Component
- Create `app/components/hero.tsx` as a Server Component
- Add a compelling headline (e.g., "Ship Your SaaS Faster")
- Add a subheadline explaining the value proposition
- Add a primary CTA button (e.g., "Start Free Trial") and a secondary CTA (e.g., "Learn More")
- Center the content with generous padding
- Use large typography with Tailwind classes (`text-5xl`, `font-bold`, etc.)
- Support dark mode

### 5. Create Features Section Component
- Create `app/components/features.tsx` as a Server Component
- Add a section heading (e.g., "Everything You Need")
- Create a responsive grid of 3-4 feature cards
- Each card should have: an icon/emoji placeholder, title, and description
- Example features: "Lightning Fast", "Secure by Default", "Scalable Infrastructure", "24/7 Support"
- Use CSS Grid or Flexbox via Tailwind (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Support dark mode

### 6. Create Pricing Section Component
- Create `app/components/pricing.tsx` as a Server Component
- Add a section heading (e.g., "Simple, Transparent Pricing")
- Create 3 pricing plan cards in a responsive grid:
  - **Free** — $0/month, includes: 1 project, basic analytics, community support
  - **Pro** — $29/month, includes: unlimited projects, advanced analytics, priority support, custom domain
  - **Enterprise** — $99/month, includes: everything in Pro, dedicated account manager, SLA, SSO, audit logs
- Visually highlight the Pro plan as "Most Popular" with a badge and distinct border/background
- Each card has: plan name, price, feature list with checkmarks, and a CTA button
- CTA buttons: "Get Started" for Free, "Start Free Trial" for Pro, "Contact Sales" for Enterprise
- Support dark mode

### 7. Create Footer Component
- Create `app/components/footer.tsx` as a Server Component
- Include copyright text with current year
- Add links: Privacy Policy, Terms of Service, Contact
- Use a simple layout with muted colors
- Support dark mode

### 8. Assemble Landing Page
- Replace the entire content of `app/page.tsx` with the landing page composition
- Import and render components in order: Navbar, Hero, Features, Pricing, Footer
- Remove unused imports (e.g., `next/image` if no longer used at the page level)
- Remove references to default starter SVGs if not needed
- Ensure the page is a Server Component (no `'use client'`)
- Wrap sections in semantic HTML (`<main>`, `<section>`, etc.)

### 9. Update Global Styles (if needed)
- Review `app/globals.css` for any additional custom properties needed
- Add scroll behavior for smooth scrolling to anchor links: `html { scroll-behavior: smooth; }`
- Ensure the existing `@theme inline` block and dark mode variables work well with the new design

### 10. Clean Up Unused Assets
- Evaluate if default SVGs in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) are still referenced
- Remove any SVGs that are no longer imported or used anywhere

### 11. Create E2E Test Specification
- Create the E2E test file at `docs/tasks/feature-saas-landing-page-6d00fd99/e2e-feature-saas-landing-page-6d00fd99.md`
- **User Story**: As a visitor, I can view the SaaS landing page with a navigation bar, hero section, features section, pricing plans, and footer, so I can understand the product offering and choose a plan.
- **Test Steps**:
  1. Navigate to `http://localhost:3000/`
  2. Verify the navigation bar is visible with "Features" and "Pricing" links and a "Get Started" CTA button
  3. Take screenshot: `landing-page-hero.png`
  4. Verify the hero section displays a headline containing "SaaS" or "Ship" and a CTA button
  5. Scroll to the features section and verify at least 3 feature cards are visible with titles and descriptions
  6. Take screenshot: `landing-page-features.png`
  7. Scroll to the pricing section and verify 3 pricing plan cards are visible
  8. Verify the Free plan shows "$0" and the Pro plan shows "$29" and the Enterprise plan shows "$99"
  9. Verify the Pro plan has a "Most Popular" badge or visual highlight
  10. Verify each pricing card has a CTA button
  11. Take screenshot: `landing-page-pricing.png`
  12. Scroll to the footer and verify copyright text and links are present
  13. Take screenshot: `landing-page-footer.png`
  14. Verify the page is responsive: resize viewport to 375x667 (mobile) and confirm content stacks vertically
  15. Take screenshot: `landing-page-mobile.png`
- **Success Criteria**:
  - All sections render without errors
  - All pricing plans display correct prices and features
  - Pro plan is visually highlighted
  - Page is responsive on mobile viewport
  - No console errors
- **Note**: Do NOT execute this E2E test — it will be run by a separate pipeline step after implementation.

### 12. Run Validation Commands
- Run `npm run build` to verify the project builds without errors
- Run `npm run lint` to verify no linting issues
- Visually verify the page renders correctly at `http://localhost:3000/` (manual step)

## Acceptance Criteria
- The root route (`/`) displays a complete SaaS landing page instead of the default Next.js starter page
- The navigation bar is visible at the top with brand name, nav links (Features, Pricing), and a CTA button
- The hero section displays a compelling headline, subheadline, and CTA buttons
- The features section shows at least 3 feature cards in a responsive grid
- The pricing section displays exactly 3 plans: Free ($0/mo), Pro ($29/mo), Enterprise ($99/mo)
- Each pricing plan card includes: plan name, price, feature list, and a CTA button
- The Pro plan is visually highlighted as the recommended option
- The footer displays copyright and relevant links
- The page is responsive: single column on mobile, multi-column on desktop
- Dark mode is supported using `dark:` Tailwind variants
- The page builds without errors (`npm run build` succeeds)
- The page passes linting (`npm run lint` succeeds)
- All components are Server Components (no unnecessary `'use client'` directives)

## Validation Commands
Execute every command to validate the work is complete with zero regressions.

- `npm run build` — build check (ensures the project compiles without errors)
- `npm run lint` — code quality (ensures no linting issues)

## Notes
- This is a **static landing page** — no backend, API routes, database, or authentication is required at this stage.
- All components should be **Server Components** (default in Next.js App Router). No `'use client'` is needed since the page has no interactive state, event handlers, or browser APIs.
- The project uses **Tailwind CSS v4** (not v3). Use `@import "tailwindcss"` and `@theme inline` syntax. Do not create a `tailwind.config.js` file — Tailwind v4 does not use one by default.
- The project uses **Next.js 16.2.1** which may have breaking changes from older versions. Always consult `node_modules/next/dist/docs/` before implementing to ensure API compatibility.
- Pricing values and feature lists are placeholder content and can be adjusted later when product requirements are finalized.
- Anchor link navigation (e.g., clicking "Pricing" scrolls to the pricing section) can be achieved with `id` attributes on sections and `href="#pricing"` on links — no client-side JavaScript needed.
- Consider using `<Link>` from `next/link` for internal navigation if additional pages are added later, but plain `<a>` tags with anchor hrefs are fine for same-page scrolling.
