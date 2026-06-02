"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is this just another ebook?",
    a: "No. It's a toolkit, built to be used, not just read. You get copy-and-paste scripts, a ready-made follow-up sequence, a lead tracker, and a 7-day action plan. Think sales system, not content.",
  },
  {
    q: "Will it work for my type of business?",
    a: "If you sell anything to Nigerians online (products, services or freelance work), yes. The scripts match how Nigerians actually communicate and object. They've been used across fashion, food, design, coaching, real estate and more.",
  },
  {
    q: "I'm not a good writer. Can I still use this?",
    a: "Absolutely. The scripts are already written for you. You copy, paste, and tweak where needed. You don't need to be a writer. You just need to be willing to send the message.",
  },
  {
    q: "How do I get the toolkit after payment?",
    a: "Immediately. As soon as your payment is confirmed, you get a download link. No waiting. You can be reading Module 1 in under 5 minutes.",
  },
  {
    q: "I've been selling for years. Is this still useful?",
    a: "Experienced sellers get the most out of the follow-up sequences and closing scripts. Even if you're already good, having a system you can train a team with is valuable as you grow.",
  },
];

export default function Faq() {
  return (
    <div className="mx-auto mt-4 max-w-2xl">
      <Accordion.Root type="single" collapsible className="space-y-3">
        {faqs.map((item, i) => (
          <Accordion.Item
            key={i}
            value={`item-${i}`}
            className="overflow-hidden rounded-xl border-2 border-black/30 bg-black/90"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg uppercase tracking-wide text-white transition-colors hover:text-brand">
                {item.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 group-data-[state=open]:rotate-45"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none data-[state=open]:animate-rise">
              <p className="px-5 pb-5 text-white/70">{item.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
