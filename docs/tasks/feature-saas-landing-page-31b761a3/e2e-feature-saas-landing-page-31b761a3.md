# E2E Tests: SaaS Landing Page

## User Story
As a visitor, I want to see a professional landing page with hero, features, and pricing sections so I can evaluate the product and choose a plan.

## Test Steps (using playwright-cli)

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

## Success Criteria

- Page loads without JavaScript errors
- All three sections (hero, features, pricing) are present in the DOM
- Old boilerplate content is completely absent
- "Most Popular" / highlighted pricing tier is visually distinct
- All CTA buttons are present and have non-empty text
- Page renders correctly at 1280px width (desktop) and 375px (mobile)
