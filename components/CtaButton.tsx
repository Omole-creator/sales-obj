import { ArrowRight } from "lucide-react";
import { PAYMENT_URL } from "@/lib/config";

type Props = {
  children: React.ReactNode;
  /** Visual emphasis. "primary" = money-green (#16A34A), tested by Playwright. */
  variant?: "primary" | "ghost";
  /** Slightly larger hit-area for hero / final CTAs. */
  big?: boolean;
  pulse?: boolean;
  /** Ghost variant on a dark background: white outline instead of black. */
  light?: boolean;
  className?: string;
  /**
   * Destination. Defaults to the Selar checkout (PAYMENT_URL).
   * Pass an in-page anchor like "#offer" for EARLY CTAs (shown before the price
   * is ever revealed) so a not-yet-sold visitor scrolls to the offer instead of
   * being dumped straight onto a payment page. Anchor links are treated as
   * navigation: they do NOT emit data-testid="cta", so they neither fire the
   * Meta InitiateCheckout event nor get asserted by the checkout E2E test.
   */
  href?: string;
};

export default function CtaButton({
  children,
  variant = "primary",
  big = false,
  pulse = true,
  light = false,
  className = "",
  href = PAYMENT_URL,
}: Props) {
  // In-page anchors (e.g. "#offer") are navigation, not checkout.
  const isCheckout = !href.startsWith("#");

  const base =
    "group inline-flex w-full items-center justify-center gap-2 rounded-xl font-display uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto";

  const size = big
    ? "px-8 py-5 text-2xl sm:text-3xl"
    : "px-6 py-4 text-lg sm:text-xl";

  const look =
    variant === "primary"
      ? "bg-brand text-black shadow-[0_10px_30px_-8px_rgba(22,163,74,0.7)] hover:bg-brand-dark"
      : light
        ? "border-2 border-white/50 bg-transparent text-white hover:bg-white hover:text-black"
        : "border-2 border-black/80 bg-transparent text-black hover:bg-black hover:text-white";

  const motion = pulse && variant === "primary" ? "animate-cta-pulse" : "";

  return (
    <a
      href={href}
      {...(isCheckout ? { "data-testid": "cta" } : {})}
      data-variant={variant}
      className={`${base} ${size} ${look} ${motion} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight
        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}
