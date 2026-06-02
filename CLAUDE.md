# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page, mobile-first **sales landing page** (Next.js 14 App Router + TypeScript + Tailwind) for a ₦5,000 ebook/toolkit, *How to Turn "I'm Not Interested" Into Sales in Nigeria*. Intended to be hosted on **Vercel**. There is one route (`app/page.tsx`); everything is conversion copy + design, not application logic.

## Commands

```bash
npm run dev          # local dev server (http://localhost:3000)
npm run build        # production build (must stay clean — also typechecks)
npm run start        # serve the production build
npm run test:e2e     # Playwright E2E suite (alias: npx playwright test)

# First-time Playwright setup (only Chromium is needed — see config note below):
npx playwright install chromium

# Run a single test file / by title:
npx playwright test tests/sales-page.spec.ts
npx playwright test -g "primary CTA background"

# Run only one project:
npx playwright test --project=desktop-chromium
```

`playwright.config.ts` has a `webServer` that runs `npm run build && npm run start` automatically, so `test:e2e` builds and serves on its own — no need to start a server first.

## Architecture

- **Page composition:** `app/page.tsx` imports and stacks section components from `components/` in narrative order (Hero → Agitation → Solution → Benefits → Objections → SocialProof → WhoFor → ValueStack → FinalCta). To reorder or add a section, edit this file. Sections are server components **except** `Faq.tsx` and `CountdownTimer.tsx` (marked `"use client"`).
- **Single source of truth for pricing & checkout:** `lib/config.ts`. `PAYMENT_URL` is the live checkout link (currently the Selar URL `https://selar.com/799g812727`) used by every CTA — change it in this one place to repoint checkout. **If you change it, also update the literal URL the CTA test asserts in `tests/sales-page.spec.ts`.** Price strings (`PRICE`, `ANCHOR`, etc.) and `COUNTDOWN_HOURS` also live here.
- **CTAs:** all buttons render through `components/CtaButton.tsx`, an `<a href={PAYMENT_URL}>` styled as a button (opens **same tab** — deliberate for a mobile-heavy single-offer sales page). It emits `data-testid="cta"` and `data-variant="primary|ghost"` — **the Playwright tests select on these**, so don't remove them. Primary = vibrant orange; ghost = outline on orange backgrounds. Every CTA's visible text must contain **Get / Yes / Boost** (the CTA test matches `/Get|Yes|Boost/i`). Note the hero CTA is intentionally price-free ("Get The Scripts"); the price is revealed once, late, in `ValueStack`.

## Design system (intentional, test-coupled)

- Defined in `tailwind.config.ts`: `brand` = **`#FF4500`** (vibrant orange, primary CTAs), `gold` (cover accent), `ink` (near-black bg). High-energy sections use `bg-orange-600`; authority sections use `bg-ink`/`bg-black`.
- **`brand` (#FF4500 = `rgb(255, 69, 0)`) is asserted by a Playwright theme test.** If you change the primary CTA color, update `tests/sales-page.spec.ts` accordingly.
- Fonts are loaded via `next/font/google` in `app/layout.tsx` (Anton display + Plus Jakarta Sans body) exposed as CSS vars `--font-display` / `--font-body`. This requires network access at build time.
- Custom animations (`cta-pulse`, `rise`, `marquee`) and the grain/`tape` helpers live in `tailwind.config.ts` + `app/globals.css`. `globals.css` also honors `prefers-reduced-motion`.

## Images & content

- Image assets live in **`public/`** (referenced via `next/image`). Originals are also duplicated in the repo root — `public/` is the served copy, so **after dropping a new image in the root you must copy it into `public/`** (and clear `.next/cache/images` if a server already optimized the old one).
- Filenames do **not** describe their content; the mapping was chosen by what each image actually shows: `mainbook.png` = ebook cover (hero/solution), `sadw.jpg`/`sadd.jpg` = pain photos (agitation), `objj.jpg` = objections graphic, `salesin.jpg` = growth chart (social proof), `3book.jpg` = the three bonus covers (value stack). There are no credit-alert screenshots — do not fabricate proof imagery.
- Copy is direct-response sales copy with conventions worth preserving:
  - **No em dashes (— ) anywhere** in user-visible copy (and we keep them out of comments too). They read as an AI tell; use periods, commas, or parentheses instead.
  - Testimonials in `SocialProof.tsx` (6 total: Amaka O./Bolaji K./Ifeoma E./Chidinma O./Emeka N./Halima Y.) and the A.V.Q. framing in `Objections.tsx` are kept as-is unless asked.
  - The **30-day money-back guarantee** (`ValueStack.tsx`) and the **P.S.** (`FinalCta.tsx`) are real conversion elements — the guarantee promises refunds, so it must remain honorable.

## E2E test specifics

`tests/sales-page.spec.ts` verifies: all 6 images decode (`naturalWidth > 0`, with `scrollIntoViewIfNeeded` to trigger `next/image` lazy-loading), every CTA matches `/Get|Yes|Boost/i` and links to the checkout URL (asserted as a literal string — keep it in sync with `PAYMENT_URL`), the H1 font shrinks at 390×844, and the primary CTA background is `rgb(255, 69, 0)`. The image list in the spec must match the actual `public/` filenames (e.g. `objj.jpg`).

The `mobile-iphone12` project is pinned to `browserName: "chromium"` (iPhone 12 defaults to WebKit) so the whole suite runs with only Chromium installed.

## Deploying

Vercel detects Next.js automatically. `PAYMENT_URL` is already wired to the live Selar checkout. `npm i sharp` is recommended for production image optimization (Vercel provides it automatically).
