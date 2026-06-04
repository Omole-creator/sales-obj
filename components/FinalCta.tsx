import { Clock, Download, ShieldCheck } from "lucide-react";
import CtaButton from "./CtaButton";
import CountdownTimer from "./CountdownTimer";
import Faq from "./Faq";
import { PRICE, ANCHOR } from "@/lib/config";

export default function FinalCta() {
  return (
    <section className="noise-overlay relative overflow-hidden bg-ink px-5 py-20 sm:px-8">
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
          <Clock className="h-3.5 w-3.5" /> Special price ends soon
        </div>

        <h2 className="mt-6 font-display text-4xl/snug uppercase text-white sm:text-6xl/snug">
          Your Next Customer Is Already Typing.
          <span className="block text-white/60">Know What To Say Back.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-white/80">
          Every day without the right words is money walking out of your DMs. Grab the
          toolkit at {PRICE} today, before the price goes back up to {ANCHOR}.
        </p>

        <div className="mt-8">
          <CountdownTimer />
        </div>

        <div className="mt-9 flex flex-col items-center gap-3">
          <CtaButton big>Boost Your Sales Now</CtaButton>
          <CtaButton variant="ghost" pulse={false} light>
            Get Instant Access For {PRICE}
          </CtaButton>
        </div>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/70">
          <li className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Instant download
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> One-time payment
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Reading Module 1 in 5 minutes
          </li>
        </ul>
      </div>

      {/* FAQ on the dark base for contrast */}
      <div className="relative mx-auto mt-20 max-w-3xl">
        <h3 className="text-center font-display text-2xl uppercase text-white sm:text-3xl">
          Still Thinking? Read This.
        </h3>
        <Faq />
      </div>

      {/* P.S. the most-read line of any sales letter */}
      <div className="relative mx-auto mt-16 max-w-3xl rounded-2xl border border-gold/30 bg-black p-7 text-left sm:p-9">
        <p className="leading-relaxed text-white/85">
          <span className="font-display text-xl uppercase text-brand">P.S.</span> Every day
          you wait, another &ldquo;let me get back to you&rdquo; quietly walks out of
          your DMs with your money. For less than you&rsquo;d spend on lunch for two, you get
          the exact words to win those people back, plus three bonuses worth ₦12,000 free.
          Put it to work for 30 days. If it doesn&rsquo;t bring you warmer replies, you pay
          nothing. The only way to lose here is to keep doing what already isn&rsquo;t
          working.
        </p>
        <div className="mt-6">
          <CtaButton>Yes, Send Me The Toolkit</CtaButton>
        </div>
      </div>
    </section>
  );
}
