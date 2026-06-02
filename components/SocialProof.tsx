import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    text: "Before this toolkit, I used to panic whenever a customer said 'too expensive.' Now I have a whole script ready. I closed 4 out of 5 objections last week alone.",
    name: "Amaka O.",
    role: "Fashion Vendor, Lagos",
  },
  {
    text: "The WhatsApp scripts changed how I sell my services. I used to just send a price and wait. Now I know what to say at every step. My conversions doubled.",
    name: "Bolaji K.",
    role: "Freelance Graphic Designer, Abuja",
  },
  {
    text: "The follow-up sequence alone is worth 10x the price. I was losing sales because I didn't know how to follow up without sounding desperate. Not anymore.",
    name: "Ifeoma E.",
    role: "Online Cake Business, Port Harcourt",
  },
  {
    text: "My brand is still new, so people kept asking how they know I'm real. The trust scripts gave me the exact words to calm that fear. Two buyers who almost ghosted me ended up paying.",
    name: "Chidinma O.",
    role: "Skincare Vendor, Enugu",
  },
  {
    text: "A customer told me someone else was cheaper. I used to just slash my price and kill my profit. Now I have a reply that makes them pick me without begging. I sold three power banks that same afternoon.",
    name: "Emeka N.",
    role: "Phone Accessories Seller, Onitsha",
  },
  {
    text: "I had a whole notebook of 'let me get back to you' people. I sent the follow-up messages word for word, and four of them replied and paid within two days. That alone covered the price many times over.",
    name: "Halima Y.",
    role: "Thrift (Okrika) Seller, Kano",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-black text-black" aria-hidden />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden bg-orange-600 px-5 py-20 text-black sm:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/70">
              Real results
            </p>
            <h2 className="mt-3 font-display text-3xl/snug uppercase sm:text-5xl/snug">
              Sellers Across Nigeria Are Already Closing More
            </h2>
            <p className="mt-4 max-w-xl text-lg font-medium text-black/80">
              When you finally know what to say, the &ldquo;maybes&rdquo; turn into credit
              alerts. Here&rsquo;s what your fellow vendors are seeing.
            </p>
          </div>
          <Image
            src="/salesin.jpg"
            alt="Sales climbing after using the toolkit"
            width={200}
            height={200}
            className="mx-auto h-40 w-40 rounded-2xl border-4 border-black object-cover shadow-xl sm:h-48 sm:w-48"
          />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]"
            >
              <Quote className="h-8 w-8 text-brand" aria-hidden />
              <Stars />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-black/80">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-black/10 pt-3">
                <span className="font-display text-lg uppercase leading-none">{r.name}</span>
                <span className="block text-sm text-black/60">{r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
