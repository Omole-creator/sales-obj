import Image from "next/image";

const avq = [
  {
    letter: "A",
    name: "Acknowledge",
    body: "Don't argue. Don't defend. Show them you heard them, and the tension drops instantly.",
    example:
      "“I completely understand. You've probably seen people online sell things that didn't deliver.”",
  },
  {
    letter: "V",
    name: "Validate",
    body: "Make their concern feel reasonable, not silly. Their guard comes down.",
    example: "“Honestly, it's smart to be careful. There's a lot of noise out there.”",
  },
  {
    letter: "Q",
    name: "Question",
    body: "Ask one question that steers them to their own reason to say yes. You're not convincing, you're uncovering.",
    example:
      "“What would it mean for you if this problem was solved in the next 30 days?”",
  },
];

const objections = [
  { n: "1", tag: "Price", lines: '"It\'s too expensive" / "My budget is small"', decode: "They haven't seen the value yet." },
  { n: "2", tag: "Timing", lines: '"Not now" / "Let me think about it"', decode: "They're interested, just not confident yet." },
  { n: "3", tag: "Trust", lines: '"I don\'t know you" / "Is this real?"', decode: "They need proof, not more pitching." },
  { n: "4", tag: "Indifference", lines: '"I\'m not interested" / silent ghosting', decode: "They don't see how it solves their problem." },
  { n: "5", tag: "Comparison", lines: '"Someone else is cheaper"', decode: "They need a reason to choose YOU." },
];

export default function Objections() {
  return (
    <section className="noise-overlay relative bg-ink px-5 pt-10 pb-20 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* A.V.Q. */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src="/objj.jpg"
              alt="Handling objections in sales"
              width={500}
              height={300}
              className="h-auto w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
              The core system
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-white sm:text-4xl">
              Your Secret Weapon: <span className="text-brand">The A.V.Q. Method</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              Most sellers argue, give up, or over-explain. A.V.Q. does the opposite. It
              turns resistance into a conversation, and conversations into sales.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {avq.map((s) => (
            <div key={s.letter} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand font-display text-2xl text-black">
                  {s.letter}
                </span>
                <h3 className="font-display text-xl uppercase text-white">{s.name}</h3>
              </div>
              <p className="mt-4 text-white/70">{s.body}</p>
              <p className="mt-4 border-l-2 border-gold pl-3 text-sm italic text-gold-soft">
                {s.example}
              </p>
            </div>
          ))}
        </div>

        {/* The 5 objections */}
        <div className="mt-20">
          <h2 className="text-center font-display text-3xl uppercase leading-tight text-white sm:text-4xl">
            The 5 Objections Every Nigerian Seller Faces
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/60">
            Different objections need different responses. The toolkit hands you the exact
            script for each one.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {objections.map((o) => (
              <div
                key={o.n}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="font-display text-4xl leading-none text-brand/40">{o.n}</span>
                <div>
                  <span className="inline-block rounded bg-brand px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-black">
                    {o.tag}
                  </span>
                  <p className="mt-2 font-medium text-white">{o.lines}</p>
                  <p className="mt-1 text-sm text-white/55">
                    <span className="text-gold">→</span> {o.decode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
