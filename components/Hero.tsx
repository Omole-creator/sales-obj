import Image from "next/image";
import { Zap } from "lucide-react";
import CtaButton from "./CtaButton";

export default function Hero() {
  return (
    <section className="noise-overlay relative overflow-hidden bg-ink px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
      {/* Atmospheric green glow behind the cover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div className="animate-rise text-center lg:text-left">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold lg:mx-0">
              <Zap className="h-3.5 w-3.5" /> For Nigerian Business Owners
            </div>

            <h1 className="font-display text-5xl uppercase leading-none text-white sm:text-7xl">
              <span className="block text-2xl tracking-wide text-white/80 sm:text-3xl">
                Recover Up To
              </span>
              <span className="block text-6xl leading-[0.95] text-brand sm:text-8xl lg:text-9xl">
                &#8358;150,000
              </span>
              <span className="block text-3xl tracking-wide text-white/90 sm:text-4xl">
                A Month
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-lg font-medium text-white/90 lg:mx-0 sm:text-xl">
              From the customers who say{" "}
              <span className="text-white">&ldquo;Let Me Get Back To You.&rdquo;</span>
            </p>

            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65 lg:mx-0">
              That&rsquo;s nearly &#8358;2 million a year lost to buyers who go quiet and never
              come back. These are the word-for-word replies that win them back.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 lg:items-start">
              <CtaButton big href="#offer">Get The Scripts</CtaButton>
              <span className="text-sm text-white/75">
                Instant download. Works on WhatsApp, Instagram &amp; Messenger.
              </span>
            </div>
          </div>

          {/* Cover */}
          <div className="animate-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "0.12s" }}>
            <div aria-hidden className="absolute inset-0 -z-10 translate-y-6 scale-95 bg-brand/30 blur-3xl" />
            <Image
              src="/man.png"
              alt="Nigerian business owner closing a sale with confidence on his phone"
              width={837}
              height={1108}
              priority
              className="mx-auto h-auto w-full rounded-2xl drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
