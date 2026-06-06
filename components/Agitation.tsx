import Image from "next/image";
import { X } from "lucide-react";

const lies = [
  {
    quote: "Let me get back to you.",
    sting: "…and you wait. And wait. The reply never comes, and you are too proud to chase.",
  },
  {
    quote: "The price is too high.",
    sting: "…and your mind goes blank. You drop the price, or you drop the customer.",
  },
  {
    quote: "Let me think about it.",
    sting: "…and you never hear from them again. No reply. No reason. Nothing.",
  },
  {
    quote: "Send your account, I'll pay later.",
    sting: "…and later never comes. The money you already counted disappears.",
  },
];

export default function Agitation() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Letter-style lead: personal, direct, sets up the agitation. */}
        <div className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
          <p className="font-display text-xl uppercase tracking-wide text-gold">
            Dear business owner,
          </p>
          <p className="mt-4">
            Ever watched a hot customer go cold the second you sent your price? Read this
            slowly.
          </p>
          <p className="mt-4">
            That one silent chat is not small. Now multiply it by every{" "}
            <span className="text-white">&ldquo;let me get back to you&rdquo;</span> you got
            this month.
          </p>
          <p className="mt-4">
            That is &#8358;80,000, sometimes &#8358;150,000, walking out of your DMs and
            straight to a competitor.
          </p>
        </div>

        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-brand">
          Sound familiar?
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl/snug uppercase text-white sm:text-5xl/snug">
          You Send A Great Pitch. Then&hellip; <span className="text-brand">Silence.</span>
        </h2>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* Pain images */}
          <div className="relative lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/woman.jpg"
                alt="A frustrated Nigerian business owner staring at her phone, waiting for a reply that never comes"
                width={1500}
                height={1000}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-2 w-40 overflow-hidden rounded-xl border-2 border-brand shadow-xl sm:w-52">
              <Image
                src="/sadd.jpg"
                alt="A discouraged seller who has run out of things to say"
                width={300}
                height={300}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* The lies */}
          <div className="lg:order-1">
            <ul className="space-y-5">
              {lies.map((l) => (
                <li
                  key={l.quote}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/40"
                >
                  <div className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                    <div>
                      <p className="font-display text-xl uppercase leading-tight text-white sm:text-2xl">
                        &ldquo;{l.quote}&rdquo;
                      </p>
                      <p className="mt-1.5 text-white/80">{l.sting}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The reframe: the pivot of the whole page */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border-l-4 border-brand bg-white/[0.03] p-7 sm:p-9">
          <p className="text-xl leading-relaxed text-white/90 sm:text-2xl">
            Here&rsquo;s the truth nobody told you:{" "}
            <strong className="text-white">it&rsquo;s not your product.</strong> It&rsquo;s
            not your price. It&rsquo;s that{" "}
            <span className="text-brand">nobody ever taught you what to say</span> the moment
            they push back. So you freeze, you over-explain, or you go quiet, and the
            sale dies right there.
          </p>
          <p className="mt-4 font-display text-2xl uppercase text-gold sm:text-3xl">
            That stops today.
          </p>
        </div>
      </div>
    </section>
  );
}
