import Image from "next/image";
import { Zap } from "lucide-react";
import CtaButton from "./CtaButton";

export default function Hero() {
  return (
    <section className="noise-overlay relative overflow-hidden bg-ink px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
      {/* Atmospheric orange glow behind the cover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Copy */}
          <div className="animate-rise text-center lg:text-left">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand lg:mx-0">
              <Zap className="h-3.5 w-3.5" /> Built for selling in Nigerian DMs
            </div>

            <h1 className="font-display text-4xl uppercase leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Turn{" "}
              <span className="text-white/50">&ldquo;I&rsquo;m Not Interested&rdquo;</span>{" "}
              Into <span className="text-brand">&ldquo;I&rsquo;ve Sent The Money.&rdquo;</span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg text-white/70 lg:mx-0 sm:text-xl">
              The word-for-word replies that close the customers who go cold, stall, or say
              your price is too high.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 lg:items-start">
              <CtaButton big>Get The Scripts</CtaButton>
              <span className="text-sm text-white/50">
                Instant download. Works on WhatsApp, Instagram &amp; Messenger.
              </span>
            </div>
          </div>

          {/* Cover */}
          <div className="animate-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "0.12s" }}>
            <div aria-hidden className="absolute inset-0 -z-10 translate-y-6 scale-95 bg-brand/30 blur-3xl" />
            <Image
              src="/mainbook.png"
              alt="3D cover of the toolkit: How to Turn I'm Not Interested Into Sales in Nigeria"
              width={520}
              height={680}
              priority
              className="mx-auto h-auto w-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
