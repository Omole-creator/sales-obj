const audience = [
  { emoji: "👗", label: "Product Sellers", note: "Fashion, food, electronics, beauty" },
  { emoji: "💻", label: "Freelancers", note: "Design, writing, web, video, social" },
  { emoji: "📱", label: "Service Providers", note: "Coaching, catering, logistics, repairs" },
  { emoji: "🏢", label: "Agency Owners", note: "Small team, closing clients consistently" },
  { emoji: "📲", label: "Social Sellers", note: "IG, WhatsApp Business, Facebook" },
  { emoji: "🚀", label: "Starter Businesses", note: "Just launched, and you ARE the sales team" },
];

export default function WhoFor() {
  return (
    <section className="bg-ink px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl/snug uppercase text-white sm:text-4xl/snug">
          This Toolkit Is Made For You If You&rsquo;re&hellip;
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((a) => (
            <div
              key={a.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/40"
            >
              <span className="text-3xl" aria-hidden>
                {a.emoji}
              </span>
              <h3 className="mt-3 font-display text-lg uppercase text-white">{a.label}</h3>
              <p className="mt-1 text-sm text-white/75">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
