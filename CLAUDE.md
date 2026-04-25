# Pizza Night

A Next.js pizza dough calculator with toppings and sauce recipes. Mobile-first; designed to feel like a native app on phones and tablets.

## Stack
- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS (theme colors: `primary` = #C30000, `cream` = #FFDFC5)
- No backend; all state is client-side

## Layout
- `app/page.tsx` — single-page shell, owns tab state and persisted prefs
- `app/layout.tsx` — root layout, viewport meta
- `components/TabNav.tsx` — fixed bottom tab bar with inline-SVG icons
- `components/{Crust,Toppings,Sauce}Tab.tsx` — tab content
- `data/pizzaData.ts` — recipe data, `PIZZA_STYLES`, sauce/topping types

## Dev
- `npm run dev` — Next dev server on http://localhost:3000
- `npm run build` / `npm run lint`

## Deployment
- `main` auto-deploys to Vercel production. Don't push experimental work to `main`.
- Feature branches and PRs get automatic Vercel preview URLs — use those for in-progress work.

## Conventions
- All page-level components use `'use client'` (no SSR data fetching).
- Persisted user prefs live in `localStorage` under `pizza-night:prefs:v1`. When changing the shape, bump the version suffix rather than writing a migration.
- Mobile-first: tab nav is fixed to the bottom with safe-area padding for iOS home indicators. Don't add a top header that competes for vertical space.
- Style overrides reset whenever pizza style changes — this is intentional (overrides are tuned per-style).
