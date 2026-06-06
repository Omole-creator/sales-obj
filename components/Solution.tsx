import Image from "next/image";
import CtaButton from "./CtaButton";

export default function Solution() {
  return (
    <section className="relative overflow-hidden bg-gold px-5 py-20 text-black sm:px-8">
      <div aria-hidden className="absolute inset-0 opacity-10 mix-blend-multiply tape" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="order-2 mx-auto w-full max-w-xs lg:order-1">
          <Image
            src="/mainbook.png"
            alt="The complete toolkit"
            width={420}
            height={560}
            className="mx-auto h-auto w-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/70">
            Introducing
          </p>
          <h2 className="mt-3 font-display text-3xl/snug uppercase sm:text-5xl/snug">
            The Only Toolkit Built For{" "}
            <span className="box-decoration-clone bg-black px-2 text-brand">
              Nigerian
            </span>{" "}
            Sales Conversations
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-black/80 lg:mx-0 sm:text-xl">
            Not a recycled ebook from abroad full of American small talk that falls flat in
            your DMs. This is a <strong>done-for-you system</strong> of scripts, templates
            and follow-up sequences, written for exactly how Nigerians chat, price, haggle
            and buy.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg font-semibold text-black lg:mx-0">
            Picture it: a lead types &ldquo;it&rsquo;s too expensive,&rdquo; you paste one
            reply, and minutes later your phone lights up with a payment alert. You stop
            guessing what to type. You copy, paste, tweak, and close.
          </p>

          <div className="mt-9 flex justify-center lg:justify-start">
            <CtaButton variant="ghost" pulse={false} href="#offer">
              Yes, I Want The Toolkit
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
