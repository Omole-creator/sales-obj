import Image from "next/image";
import { Check, Gift, ShieldCheck } from "lucide-react";
import CtaButton from "./CtaButton";
import { PRICE, ANCHOR, TOOLKIT_VALUE } from "@/lib/config";

const everything = [
  "What “I'm Not Interested” really means (Module 1)",
  "The 5 objection types + how to identify them",
  "The A.V.Q. Method explained + examples",
  "WhatsApp reply scripts (multiple scenarios)",
  "Instagram DM scripts",
  "Price, timing & trust objection scripts",
  "7-message follow-up sequence",
  "Closing scripts",
  "Lead tracker template (ready to use)",
  "7-day implementation plan",
];

const bonuses = [
  {
    title: 'The "Before You Send That Price" Guide',
    worth: "₦4,000",
    so: "Qualify the buyer and frame your value before you quote, so your price lands instead of scaring people off.",
  },
  {
    title: "The Offer Positioning Blueprint",
    worth: "₦4,500",
    so: "Sharpen your message so you stop sounding generic and become the obvious choice before the chat even starts.",
  },
  {
    title: 'The "Dead Lead" Revival Template',
    worth: "₦3,500",
    so: "One message that restarts cold conversations weeks later, and leads you wrote off start replying again.",
  },
];

export default function ValueStack() {
  return (
    <section id="offer" className="noise-overlay relative bg-ink px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Bonuses */}
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          Pay today &amp; also get these free
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl/snug uppercase text-white sm:text-5xl/snug">
          3 Free Bonuses <span className="text-gold">Worth ₦12,000</span>
        </h2>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Image
            src="/3book.jpg"
            alt="The three free bonus guides: Before You Send That Price, Offer Positioning Blueprint, and Dead Lead Revival Template"
            width={720}
            height={480}
            className="h-auto w-full rounded-2xl border border-white/10 shadow-2xl"
          />
          <ul className="space-y-4">
            {bonuses.map((b) => (
              <li key={b.title} className="rounded-xl border border-gold/30 bg-gold/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <Gift className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-display text-lg uppercase text-white">{b.title}</h3>
                      <span className="text-sm font-semibold text-gold">(Worth {b.worth})</span>
                    </div>
                    <p className="mt-1 text-sm text-white/80">{b.so}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* The full stack + price anchor */}
        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="bg-black/40 px-6 py-5 text-center sm:px-10">
            <h3 className="font-display text-2xl uppercase text-white sm:text-3xl">
              Everything You Get Today
            </h3>
          </div>

          <Image
            src="/bundle.png"
            alt="Everything you get: the main How to Turn I'm Not Interested Into Sales in Nigeria toolkit plus all three bonus guides"
            width={1280}
            height={800}
            className="h-auto w-full"
          />

          <ul className="grid gap-x-6 gap-y-3 px-6 py-7 sm:grid-cols-2 sm:px-10">
            {everything.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-white/80">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span className="text-[15px]">{item}</span>
              </li>
            ))}
            {bonuses.map((b) => (
              <li key={b.title} className="flex items-start gap-2.5 text-gold-soft">
                <Gift className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span className="text-[15px]">Bonus: {b.title}</span>
              </li>
            ))}
            <li className="flex items-start gap-2.5 text-white/80">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span className="text-[15px]">Instant download after payment</span>
            </li>
          </ul>

          {/* Price anchor */}
          <div className="border-t border-white/10 bg-black/40 px-6 py-8 text-center sm:px-10">
            <p className="text-white/80">
              Toolkit ({TOOLKIT_VALUE}) + Bonuses (₦12,000) ={" "}
              <span className="font-semibold text-white">total value {ANCHOR}</span>
            </p>
            <p className="mt-3 text-lg text-white/75">
              You won&rsquo;t pay {ANCHOR}. You won&rsquo;t even pay {TOOLKIT_VALUE}.
            </p>
            <div className="mt-4 flex items-end justify-center gap-4">
              <span className="font-display text-3xl text-white/70 line-through decoration-brand decoration-4">
                {ANCHOR}
              </span>
              <span className="font-display text-6xl leading-none text-brand sm:text-7xl">
                {PRICE}
              </span>
            </div>
            <p className="mt-2 text-sm uppercase tracking-widest text-white/75">
              One-time payment &middot; Instant digital download
            </p>

            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-white/75">
              Why {PRICE} and not {ANCHOR}? Because a script you cannot afford closes zero
              sales. I would rather you grab it today, use it tonight, and tell three fellow
              sellers tomorrow.
            </p>

            <div className="mt-7 flex justify-center">
              <CtaButton big>Get Instant Access For {PRICE}</CtaButton>
            </div>

            <div className="mx-auto mt-7 flex max-w-md items-start gap-3 rounded-xl border border-gold/30 bg-gold/[0.06] p-4 text-left">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden />
              <p className="text-sm text-white/70">
                <span className="font-display uppercase text-gold">
                  Your 30-day no-risk promise:
                </span>{" "}
                put the scripts to work for 30 days. If they don&rsquo;t get you warmer
                replies and more closed chats, send us a message and we&rsquo;ll refund every
                naira. You keep the bonuses either way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
