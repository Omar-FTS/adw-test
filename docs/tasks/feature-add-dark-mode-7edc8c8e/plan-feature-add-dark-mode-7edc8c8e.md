# feature: Dark Mode Support

## Metadata
adw_id: `7edc8c8e`
issue_description: `Add dark mode support`

## Description
The application is a Next.js 16 SaaS landing page (Acme SaaS) with three sections: HeroSection, FeaturesSection, and PricingSection. The components already use Tailwind CSS `dark:` variant classes extensively (22 dark-variant usages across the three components), and `globals.css` already applies dark CSS custom properties via `@media (prefers-color-scheme: dark)`. However, the app currently has no user-controlled dark mode toggle — users cannot manually switch between light and dark themes, and preference is not persisted.

This feature adds an explicit, user-controllable dark mode toggle that:
1. Reads the user's OS preference as a default.
2. Allows the user to override and toggle between light and dark mode via a button in a navigation/header area.
3. Persists the chosen preference to `localStorage` so it survives page refreshes.
4. Applies the theme by toggling a `dark` class on the `<html>` element (Tailwind's `class`-based dark mode strategy), which works with the existing `dark:` variant classes in all components.

## Objective
Add a fully functional, user-controllable dark mode toggle to the Acme SaaS landing page that: respects OS preference by default, allows manual override via a visible toggle button, persists the preference, and works correctly with the existing `dark:` Tailwind variant classes already in place across all page components.

## Problem Statement
While the existing components already use Tailwind `dark:` variant classes, dark mode is currently driven solely by the OS `prefers-color-scheme` CSS media query. Users have no way to manually switch themes, and the `globals.css` approach uses the `media` strategy (not the `class` strategy). To support a user-controlled toggle, Tailwind's dark mode must switch to the `class` strategy (adding/removing `dark` class on `<html>`), which requires a Client Component to read localStorage, handle user interaction, and manage state.

## Solution Statement
1. Switch Tailwind dark mode from the implicit `@media (prefers-color-scheme: dark)` CSS-variables approach to the explicit `class`-based strategy by updating `globals.css` to use a `.dark` selector instead of the media query.
2. Create a `ThemeProvider` Client Component (`app/components/ThemeProvider.tsx`) that:
   - Reads `localStorage.getItem('theme')` on mount.
   - Falls back to `window.matchMedia('(prefers-color-scheme: dark)')` if no persisted preference.
   - Applies/removes the `dark` class on `<html>`.
   - Exposes a `useTheme` context hook for consuming current theme and a toggle function.
3. Create a `ThemeToggle` Client Component (`app/components/ThemeToggle.tsx`) that renders a sun/moon icon button using the `useTheme` hook.
4. Create a `Navbar` Server Component (`app/components/Navbar.tsx`) that renders the site name and includes the `ThemeToggle`.
5. Wrap the app in `ThemeProvider` in `app/layout.tsx` and add `Navbar` to the landing page.

## Code Patterns to Follow
Reference implementations:
- `app/components/HeroSection.tsx` — shows how Server Components use `dark:` Tailwind variants (e.g., `dark:from-indigo-900`, `dark:text-indigo-200`). The same `dark:` classes will continue to work once we switch to class-based dark mode.
- `app/components/FeaturesSection.tsx` — shows the card pattern with `dark:bg-zinc-900 dark:border-zinc-800` that will be driven by the `dark` class on `<html>`.
- `app/components/PricingSection.tsx` — shows conditional className patterns and `dark:` variants used throughout.
- `app/layout.tsx` — shows how the root layout wraps `children`; `ThemeProvider` will be added here.
- `app/globals.css` — uses `@import "tailwindcss"` (Tailwind v4 syntax). Dark mode CSS variables must be updated from `@media (prefers-color-scheme: dark)` to `.dark` selector.
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` — confirms `"use client"` directive is needed for components using `useState`, `useEffect`, and browser APIs (`localStorage`, `window.matchMedia`). `ThemeProvider` and `ThemeToggle` must be Client Components.
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` — confirms Tailwind v4 CSS-first setup with `@import "tailwindcss"`. No `tailwind.config.js` needed; dark mode class strategy is configured via CSS `@variant` or via the `dark` class selector directly.

## Relevant Files
Use these files to complete the task:

- `app/globals.css` — **Modify**: change dark mode CSS variables from `@media (prefers-color-scheme: dark)` block to a `.dark` selector block, so Tailwind's class-based dark mode drives the CSS custom properties.
- `app/layout.tsx` — **Modify**: import and wrap `children` in `ThemeProvider`; add `Navbar` component above `{children}` in the `<body>`.
- `app/page.tsx` — **No change needed**: the `<main>` composition of `HeroSection`, `FeaturesSection`, `PricingSection` stays intact.
- `app/components/HeroSection.tsx` — **No change needed**: `dark:` classes already present and will work with class-based dark mode.
- `app/components/FeaturesSection.tsx` — **No change needed**: `dark:` classes already present.
- `app/components/PricingSection.tsx` — **No change needed**: `dark:` classes already present.
- `AGENTS.md` — Contains project coding rule: **"This is NOT the Next.js you know — APIs, conventions, and file structure may differ. Read `node_modules/next/dist/docs/` before writing any code."** Follow this during implementation.
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` — Reference for when `"use client"` is required.
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` — Reference for Tailwind v4 CSS setup in Next.js 16.

### New Files
- `app/components/ThemeProvider.tsx` — Client Component that provides theme context (`ThemeContext`) with `theme` state and `toggleTheme` function. Uses `useEffect` to read `localStorage` and `window.matchMedia` on mount, persists changes to `localStorage`, and toggles the `dark` class on `document.documentElement`. Exports `useTheme` hook.
- `app/components/ThemeToggle.tsx` — Client Component that consumes `useTheme` context and renders a toggle button with a sun icon (light mode) or moon icon (dark mode). Inline SVG icons to avoid new dependencies.
- `app/components/Navbar.tsx` — Server Component (static shell) that renders the site name/logo and renders `<ThemeToggle />`. Since `ThemeToggle` is a Client Component, it can be imported inside this Server Component.
- `docs/tasks/feature-add-dark-mode-7edc8c8e/e2e-feature-add-dark-mode-7edc8c8e.md` — E2E test file (do NOT create now) describing browser-based validation of the dark mode toggle functionality.

## Implementation Plan

### Phase 1: Foundation
Update CSS and configure Tailwind's class-based dark mode. The `globals.css` file currently applies dark CSS custom properties only when `prefers-color-scheme: dark` is active. We need to replace this with a `.dark` selector so that the `dark` class on `<html>` drives the CSS variables used by all components. This is the prerequisite for the `ThemeProvider`'s class-toggling to take effect.

### Phase 2: Core Implementation
Build the React context system for theme management:
1. **`ThemeProvider`** — A Client Component wrapping its children in a `ThemeContext.Provider`. On mount (`useEffect`), it reads `localStorage.getItem('theme')` to get a stored preference; if none, it checks `window.matchMedia('(prefers-color-scheme: dark)').matches`. It applies the resolved theme by adding/removing the `dark` class on `document.documentElement` and stores the current theme in state. The `toggleTheme` function flips the state, updates the DOM class, and saves to `localStorage`.
2. **`ThemeToggle`** — A Client Component that calls `useTheme()` and renders an accessible `<button>` with `aria-label`. In light mode it shows a moon icon (click to go dark); in dark mode it shows a sun icon (click to go light). Uses inline SVG so no icon library is needed.

### Phase 3: Integration
1. **`Navbar`** — A Server Component that renders a sticky top navigation bar with the "Acme" site name and the `<ThemeToggle />` button aligned to the right. Uses `dark:` Tailwind variants for background and border consistent with existing component style (e.g., `bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800`).
2. **`app/layout.tsx`** — Wrap the `<body>` children in `<ThemeProvider>` and prepend `<Navbar />` before `{children}`. Add `suppressHydrationWarning` to `<html>` to prevent React hydration mismatch caused by the theme class being injected server-side vs. client-side.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Read the Next.js 16 CSS and Server/Client Component Docs
- Read `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` to confirm Tailwind v4 dark mode configuration approach.
- Read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` to confirm `"use client"` requirements for `useState`, `useEffect`, and browser APIs.

### 2. Update `app/globals.css` — Switch to Class-Based Dark Mode
- Remove the `@media (prefers-color-scheme: dark)` block that wraps the dark CSS variable overrides.
- Replace it with a `.dark` selector block:
  ```css
  .dark {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
  ```
- This ensures that when `ThemeProvider` adds the `dark` class to `<html>`, the CSS custom properties update and all existing `dark:` Tailwind variant classes activate correctly.

### 3. Create `app/components/ThemeProvider.tsx`
- Add `"use client"` directive at the top.
- Create a `ThemeContext` with React's `createContext`:
  ```ts
  type Theme = 'light' | 'dark'
  type ThemeContextValue = { theme: Theme; toggleTheme: () => void }
  const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', toggleTheme: () => {} })
  ```
- Implement `ThemeProvider` component with `useState<Theme>('light')`.
- In `useEffect` (runs after mount, client only):
  1. Read `localStorage.getItem('theme')` — if `'dark'` or `'light'`, use that value.
  2. Otherwise, check `window.matchMedia('(prefers-color-scheme: dark)').matches`.
  3. Set state to the resolved theme.
  4. Apply/remove `dark` class: `document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')`.
- Implement `toggleTheme`:
  1. Compute `next = theme === 'dark' ? 'light' : 'dark'`.
  2. `document.documentElement.classList.toggle('dark', next === 'dark')`.
  3. `localStorage.setItem('theme', next)`.
  4. `setTheme(next)`.
- Render `<ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>`.
- Export `useTheme` hook: `export const useTheme = () => useContext(ThemeContext)`.

### 4. Create `app/components/ThemeToggle.tsx`
- Add `"use client"` directive at the top.
- Import `useTheme` from `./ThemeProvider`.
- Render a `<button>` with:
  - `onClick={toggleTheme}`
  - `aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}`
  - Tailwind classes for styling: `rounded-full p-2 transition-colors bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300`
- When `theme === 'dark'`, render a sun SVG icon (inline, 20×20 `viewBox="0 0 24 24"`).
- When `theme === 'light'`, render a moon SVG icon (inline, 20×20 `viewBox="0 0 24 24"`).
- Example sun icon SVG path: `M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z` (stroke-based).
- Example moon icon SVG path: `M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z` (stroke-based).
- Both icons use `stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"`.

### 5. Create `app/components/Navbar.tsx`
- No `"use client"` directive — this is a Server Component (only `ThemeToggle` inside it is a Client Component).
- Render a `<header>` with:
  - `className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm"`
- Inside: a `<div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-6 sm:px-12 lg:px-24">`.
- Left side: `<span className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-sans">Acme</span>`.
- Right side: `<ThemeToggle />`.

### 6. Update `app/layout.tsx`
- Import `ThemeProvider` from `./components/ThemeProvider`.
- Import `Navbar` from `./components/Navbar`.
- Add `suppressHydrationWarning` to the `<html>` element to suppress React's hydration warning caused by the `dark` class being added client-side:
  ```tsx
  <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
  ```
- Wrap `<body>` content in `<ThemeProvider>`:
  ```tsx
  <body className="min-h-full flex flex-col">
    <ThemeProvider>
      <Navbar />
      {children}
    </ThemeProvider>
  </body>
  ```

### 7. Create E2E Test File at `docs/tasks/feature-add-dark-mode-7edc8c8e/e2e-feature-add-dark-mode-7edc8c8e.md`
- **Do NOT create this file now** — describe it as a task for the E2E pipeline step.
- The file should document:
  - **User Story**: As a visitor, I want to be able to toggle between light and dark mode using a visible button in the navigation bar, so that I can view the landing page in my preferred color scheme regardless of my OS setting.
  - **Test Steps** (using playwright-cli):
    1. Navigate to `http://localhost:3000`
    2. Screenshot: initial page state (note OS preference; confirm navbar is visible at top).
    3. Assert the `<header>` Navbar element is present in the DOM.
    4. Assert a toggle button is visible — locate by `aria-label` containing `"Switch to dark mode"` or `"Switch to light mode"`.
    5. Screenshot: navbar with toggle button visible.
    6. Simulate OS preference = light (set `prefers-color-scheme` to light via Playwright's `emulateMedia`).
    7. Reload the page.
    8. Assert `<html>` element does NOT have class `dark`.
    9. Assert toggle button `aria-label` is `"Switch to dark mode"` (currently in light mode).
    10. Click the toggle button.
    11. Assert `<html>` element now HAS class `dark` after click.
    12. Assert toggle button `aria-label` is now `"Switch to light mode"`.
    13. Screenshot: page in dark mode — confirm dark background is applied.
    14. Reload the page.
    15. Assert `<html>` element still HAS class `dark` after reload (localStorage persistence).
    16. Click the toggle button again.
    17. Assert `<html>` element no longer has class `dark`.
    18. Screenshot: page in light mode after toggle back.
    19. Assert Navbar is visible at the top: check that `Acme` text is present in the header.
    20. Assert the HeroSection is still visible below the Navbar.
  - **Success Criteria**:
    - Navbar with `Acme` text and a toggle button is visible at the top of the page.
    - Clicking the toggle button switches `<html>` between having and not having the `dark` class.
    - After reloading, the previously selected theme (dark) is restored from `localStorage`.
    - Toggle button `aria-label` accurately reflects the current mode at each state.
    - The page renders correctly (hero, features, pricing still visible) in both light and dark mode.
    - Page renders correctly at 1280px width (desktop) and 375px (mobile).

### 8. Run Validation Commands
- Run lint, type check, and build to confirm zero errors and zero regressions.

## Testing Strategy

### Unit Tests
No unit test framework is configured in the project (`package.json` has no Jest or Vitest). Tests are validated via TypeScript type checking and build output.

Key type safety considerations:
- `Theme` type (`'light' | 'dark'`) used in `ThemeContext` prevents invalid string values.
- `ThemeContextValue` type ensures consumers always receive `theme` and `toggleTheme`.
- `useTheme` hook must be called only within `ThemeProvider` — add a runtime check if desired: `if (!context) throw new Error('useTheme must be used within ThemeProvider')`.

### Edge Cases
- **Hydration mismatch**: The server renders without the `dark` class; the client adds it after mount. `suppressHydrationWarning` on `<html>` prevents React errors. The layout shift is acceptable (flash of unstyled content is minimal since `useEffect` runs immediately after first paint).
- **No localStorage (SSR/Node environment)**: The `useEffect` only runs client-side, so `localStorage` is never accessed on the server. Safe.
- **`prefers-color-scheme` not supported**: Older browsers that don't support `window.matchMedia` — wrap in a try/catch or a null-check before accessing `.matches`.
- **System preference changes after page load**: For MVP, we do not listen for `window.matchMedia` `change` events — the user's manual toggle takes precedence. This simplifies state management.
- **Multiple tabs**: If user changes theme in one tab, `localStorage` is updated but other tabs won't auto-sync. This is acceptable for MVP scope.
- **Dark mode in Navbar**: Navbar uses `dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-50` — must test that these classes activate when `dark` is on `<html>`.
- **Sticky Navbar offset**: The sticky Navbar (`h-14`, 56px) adds vertical offset to the page. Verify the hero section is not hidden behind it. Add `scroll-padding-top` or adjust anchor links if needed.

## Acceptance Criteria
- [ ] A `Navbar` component is visible at the top of the landing page containing the "Acme" site name and a theme toggle button.
- [ ] The theme toggle button shows a moon icon when in light mode and a sun icon when in dark mode.
- [ ] Clicking the toggle button switches the page between light and dark mode visually (dark background + light text vs. light background + dark text).
- [ ] The `dark` class is toggled on the `<html>` element when the button is clicked.
- [ ] The user's theme preference is persisted to `localStorage` under the key `'theme'`.
- [ ] Reloading the page after selecting dark mode restores dark mode (not reset to OS default).
- [ ] The OS `prefers-color-scheme: dark` preference is respected as the default when no `localStorage` value is set.
- [ ] `app/globals.css` uses `.dark { ... }` selector (not `@media (prefers-color-scheme: dark)`) for dark CSS variable overrides.
- [ ] All existing `dark:` Tailwind variant classes in `HeroSection`, `FeaturesSection`, and `PricingSection` continue to work correctly.
- [ ] No `"use client"` directive exists on `Navbar`, `HeroSection`, `FeaturesSection`, `PricingSection`, or `app/layout.tsx` beyond the two new Client Components (`ThemeProvider`, `ThemeToggle`).
- [ ] `npm run build` completes with zero errors.
- [ ] `npm run lint` completes with zero warnings or errors.
- [ ] TypeScript type checking (`npx tsc --noEmit`) passes with zero errors.

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

> No `.app_config.yaml` was found in the project root. Validation commands discovered from `package.json` scripts: `build` → `next build`, `lint` → `eslint`. TypeScript check via `npx tsc --noEmit`.

## Notes
- **Tailwind v4 dark mode**: Tailwind v4 does not use a `tailwind.config.js`. The `darkMode: 'class'` option used in v3 does not apply here. Instead, in v4, `dark:` variants respond to a `.dark` class on any ancestor element (this is the default behavior — Tailwind v4 automatically uses class-based dark mode via the `@variant dark` rule, which checks for a `.dark` ancestor). Switching `globals.css` from `@media` to `.dark` selector is sufficient; no additional Tailwind config is needed.
- **`suppressHydrationWarning`**: Add this to `<html>` in `layout.tsx`. This suppresses the React warning about the `class` attribute mismatch between server-rendered HTML (no `dark` class) and client-hydrated HTML (with `dark` class added by `ThemeProvider`'s `useEffect`). Without this, you'll see a hydration error in development.
- **No new dependencies**: Implement everything with the existing stack (Next.js 16, React 19, Tailwind v4, TypeScript 5). Use inline SVG for sun/moon icons — do not install `lucide-react` or any other icon library.
- **Next.js 16**: Per `AGENTS.md`, this version may differ from typical training data. Reference `node_modules/next/dist/docs/` for authoritative guidance before writing code.
- **Client Component placement**: `ThemeProvider` and `ThemeToggle` are Client Components. They can be imported into Server Components (`Navbar`, `layout.tsx`) without issue — Next.js handles the boundary correctly. The `"use client"` boundary means those subtrees run on the client; Server Components above them still render on the server.
- **Scroll padding**: The sticky Navbar (`h-14`) may cover anchor-linked sections (`#features`, `#pricing`). Consider adding `scroll-padding-top: 56px` to the `html` element in `globals.css`, or use `scroll-mt-14` on each section, to prevent the navbar from overlapping section headings when anchor links are clicked.
