import type { Metadata, Viewport } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://im-not-interested.vercel.app"),
  title:
    'How to Turn "I\'m Not Interested" Into Sales in Nigeria | Sales Scripts Toolkit',
  description:
    "Word-for-word WhatsApp & Instagram DM sales scripts for Nigerian sellers. Turn objections like 'price is too high' and 'I'll get back to you' into closed sales and credit alerts. Instant download for ₦5,000.",
  keywords: [
    "Business Growth Nigeria",
    "Sales Scripts",
    "WhatsApp sales Nigeria",
    "objection handling Nigeria",
    "how to close sales Nigeria",
    "Instagram DM sales scripts",
    "Nigerian sales toolkit",
  ],
  authors: [{ name: "Business Growth Nigeria" }],
  openGraph: {
    title: 'Turn "I\'m Not Interested" Into Sales in Nigeria',
    description:
      "The done-for-you toolkit of WhatsApp & IG scripts that turns cold rejections into credit alerts. Just ₦5,000 with instant download.",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/mainbook.png", width: 1200, height: 1200, alt: "The toolkit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Turn "I\'m Not Interested" Into Sales in Nigeria',
    description:
      "WhatsApp & IG sales scripts built for how Nigerians actually buy. ₦5,000.",
    images: ["/mainbook.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink font-sans text-white antialiased">{children}</body>
    </html>
  );
}
