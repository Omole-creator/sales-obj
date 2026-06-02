// ─────────────────────────────────────────────────────────────────────────
//  Central config. Change PAYMENT_URL once here when the real checkout
//  (Paystack / Selar / Flutterwave) link is ready, and every CTA updates.
// ─────────────────────────────────────────────────────────────────────────

/** Live Selar checkout link. Every CTA points here. */
export const PAYMENT_URL = "https://selar.com/799g812727";

/** Pricing copy. */
export const PRICE = "₦5,000";
export const ANCHOR = "₦27,000"; // ₦15,000 toolkit + ₦12,000 bonuses
export const TOOLKIT_VALUE = "₦15,000";
export const BONUS_VALUE = "₦12,000";

/** Countdown length in hours (resets each visit). */
export const COUNTDOWN_HOURS = 24;

/**
 * Meta (Facebook) Pixel ID. Hard-coded so it works everywhere (local + Vercel)
 * with zero setup; a Pixel ID is public, not a secret. You can still override
 * it with NEXT_PUBLIC_FB_PIXEL_ID if you ever need to.
 */
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1897516267555090";

export const PRODUCT_NAME =
  'How to Turn "I\'m Not Interested" Into Sales in Nigeria';
