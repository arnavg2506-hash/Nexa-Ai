"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ComparisonEngine } from "@/components/sections/comparison-engine";
import { DistrictIntelligence } from "@/components/sections/district-intelligence";
import { EntryExperience } from "@/components/sections/entry-experience";
import { IndiaIntelligenceMap } from "@/components/sections/india-intelligence-map";
import { InvestorDashboard } from "@/components/sections/investor-dashboard";
import { PlatformHero } from "@/components/sections/platform-hero";
import { PlatformPricing } from "@/components/sections/platform-pricing";
import { LoadingScreen } from "@/components/loading-screen";
import { NexaLogo } from "@/components/brand/nexa-logo";

export function NexaExperience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <LoadingScreen />
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[90] h-1 w-full origin-left bg-gradient-to-r from-volt via-signal to-iris"
        style={{ scaleX }}
      />
      <main id="main-content" tabIndex={-1}>
        <PlatformHero />
        <EntryExperience />
        <IndiaIntelligenceMap />
        <DistrictIntelligence />
        <ComparisonEngine />
        <InvestorDashboard />
        <PlatformPricing />
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <NexaLogo compact />
          <p>NEXA AI. India-wide real estate intelligence OS for land, homes, corridors and investors.</p>
        </div>
        <div className="flex gap-5">
          <a className="transition hover:text-white" href="#modules">Modules</a>
          <a className="transition hover:text-white" href="/map">Map</a>
          <a className="transition hover:text-white" href="#districts">Districts</a>
          <a className="transition hover:text-white" href="/compare">Compare</a>
          <a className="transition hover:text-white" href="/dashboard">Dashboard</a>
          <a className="transition hover:text-white" href="#pricing">Access</a>
        </div>
      </div>
    </footer>
  );
}
