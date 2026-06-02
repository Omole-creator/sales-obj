"use client";

import Script from "next/script";
import { useEffect } from "react";
import { FB_PIXEL_ID } from "@/lib/config";

/**
 * Meta Pixel for the sales page.
 * - Fires `PageView` on load (base pixel).
 * - Fires `InitiateCheckout` when any CTA (data-testid="cta") is clicked,
 *   i.e. when a visitor leaves for the Selar checkout.
 *
 * The actual `Purchase` event is fired by Selar (paste the same Pixel ID
 * in your Selar settings), since the payment completes on Selar's domain.
 *
 * Disabled automatically when NEXT_PUBLIC_FB_PIXEL_ID is not set.
 */
export default function FacebookPixel() {
  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-testid="cta"]')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fbq?.("track", "InitiateCheckout");
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!FB_PIXEL_ID) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
