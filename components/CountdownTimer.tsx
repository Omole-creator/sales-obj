"use client";

import { useEffect, useState } from "react";
import { COUNTDOWN_HOURS } from "@/lib/config";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * A visual 24-hour countdown. Starts fresh on each visit (resets on reload).
 * Renders zeros on the server to avoid hydration mismatch, then begins ticking
 * once mounted on the client.
 */
export default function CountdownTimer() {
  const total = COUNTDOWN_HOURS * 3600;
  const [remaining, setRemaining] = useState(total);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const left = total - elapsed;
      setRemaining(left > 0 ? left : 0);
      if (left <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [total]);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  const units: { label: string; value: string }[] = [
    { label: "Hrs", value: pad(h) },
    { label: "Min", value: pad(m) },
    { label: "Sec", value: mounted ? pad(s) : "00" },
  ];

  return (
    <div
      className="flex items-center justify-center gap-3 sm:gap-4"
      role="timer"
      aria-label="Limited-time offer countdown"
    >
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-4">
          <div className="flex min-w-[68px] flex-col items-center rounded-xl border border-white/15 bg-black px-3 py-2 sm:min-w-[84px] sm:px-4 sm:py-3">
            <span className="font-display text-3xl leading-none text-brand tabular-nums sm:text-5xl">
              {u.value}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 sm:text-xs">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-3xl text-white/40 sm:text-4xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
