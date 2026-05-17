import type { Metadata } from "next";
import { BentoSection } from "@/components/landing/BentoSection";
import { CTASection, LandingFooter } from "@/components/landing/CTASection";
import { HeroSection } from "@/components/landing/HeroSection";
import { IllustrationsSection } from "@/components/landing/IllustrationsSection";
import { LandingNavbar } from "@/components/landing/LandingNavbar";

export const metadata: Metadata = {
  title: "CodeForge — Forge your coding skills, one problem at a time",
  description:
    "A minimalist platform for developers to practice algorithms, read articles, and explore community challenges — all in one focused workspace.",
  openGraph: {
    title: "CodeForge",
    description: "Practice algorithms. Read articles. Grow as a developer.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      <LandingNavbar />

      {/* 2. Hero */}
      <HeroSection />

      {/* 3. Bento grid features */}
      <BentoSection />

      {/* 4. Illustrations / How it works */}
      <IllustrationsSection />

      {/* 5. CTA + Footer */}
      <CTASection />
      <LandingFooter />
    </main>
  );
}
