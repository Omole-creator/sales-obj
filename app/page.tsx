import Hero from "@/components/Hero";
import Agitation from "@/components/Agitation";
import Solution from "@/components/Solution";
import Benefits from "@/components/Benefits";
import Objections from "@/components/Objections";
import SocialProof from "@/components/SocialProof";
import WhoFor from "@/components/WhoFor";
import ValueStack from "@/components/ValueStack";
import FinalCta from "@/components/FinalCta";

function TapeDivider() {
  return <div aria-hidden className="tape h-3 w-full" />;
}

export default function Page() {
  return (
    <main>
      <Hero />
      <Agitation />
      <TapeDivider />
      <Solution />
      <TapeDivider />
      <Benefits />
      <Objections />
      <SocialProof />
      <WhoFor />
      <ValueStack />
      <TapeDivider />
      <FinalCta />
      <footer className="bg-ink px-5 py-10 text-center text-sm text-white/70">
        <p>
          &copy; {new Date().getFullYear()} Business Growth Nigeria. All rights reserved.
        </p>
        <p className="mt-1">
          How to Turn &ldquo;I&rsquo;m Not Interested&rdquo; Into Sales in Nigeria.
        </p>
      </footer>
    </main>
  );
}
