# Sales Page: "I'm Not Interested" Into Sales

A mobile-first, direct-response sales landing page for my ebook *How to Turn "I'm Not Interested" Into Sales in Nigeria*, a ₦5,000 sales-scripts toolkit for Nigerian business owners. I wrote the copy, designed the page, and ran the Meta Ads that sold it.

I am a non-technical founder. I designed and built this end to end with **Claude Code**, including the conversion copy system and the automated test suite.

## How it sells

- **Narrative section flow:** Hero, Agitation, Solution, Benefits, Objections, Social Proof, Who It's For, Value Stack, Final CTA. One offer, one checkout link, no distractions.
- **Deliberate design system:** money-green CTAs, a single gold "spotlight" section, near-black canvas. The price appears once, late, after the value stack has done its work.
- **Conversion details:** countdown timer, objection-handling FAQ, 30-day money-back guarantee, and a P.S. block, all standard direct-response structure.
- **Every CTA routes through one config file**, so repointing checkout is a one-line change.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Playwright.

## Run it

```bash
npm install
npm run dev       # http://localhost:3000
npm run test:e2e  # Playwright: images decode, CTAs link to checkout, theme colors hold
```
