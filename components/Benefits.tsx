import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "The A.V.Q. Method",
    so: "A 3-step framework that melts resistance in seconds, so you stop arguing and start closing.",
  },
  {
    title: "WhatsApp & Instagram DM reply scripts",
    so: "Word-for-word lines for every stage, so you always know what to type next.",
  },
  {
    title: "Price, timing & trust objection scripts",
    so: '"Too expensive," "let me think," "I don\'t know you." Every one gets a reply that turns into a yes.',
  },
  {
    title: "7-day follow-up sequence",
    so: "Re-engage a cold lead without pestering, so the sales you almost lost quietly land in your account.",
  },
  {
    title: "Closing scripts that don't feel pushy",
    so: "Ask for the money with calm confidence, so you stop hinting and start collecting.",
  },
  {
    title: "Lead tracker template",
    so: "See every lead, objection and follow-up at a glance, so no ready buyer ever slips through the cracks.",
  },
  {
    title: "7-day implementation plan",
    so: "A day-by-day plan, so the toolkit gets used this week instead of dying in your downloads folder.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-ink px-5 pt-20 pb-10 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-brand">
          What&rsquo;s inside
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl/snug uppercase text-white sm:text-5xl/snug">
          Everything You Need To Hear <span className="text-brand">&ldquo;Yes&rdquo;</span> More Often
        </h2>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <li
              key={b.title}
              className={`flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-brand/50 hover:bg-white/[0.05] ${
                i === benefits.length - 1 && benefits.length % 2 !== 0 ? "sm:col-span-2" : ""
              }`}
            >
              <CheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-brand" aria-hidden />
              <div>
                <h3 className="font-display text-lg uppercase tracking-wide text-white sm:text-xl">
                  {b.title}
                </h3>
                <p className="mt-1 text-white/80">{b.so}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
