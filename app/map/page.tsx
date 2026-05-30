import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IndiaIntelligenceMap } from "@/components/sections/india-intelligence-map";
import { NexaLogo } from "@/components/brand/nexa-logo";

export const metadata: Metadata = {
  title: "India Intelligence Map",
  description:
    "A full-screen AI map for Indian real estate opportunity, infrastructure layers, heatmaps, district comparison and growth signals.",
};

export default function MapPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">India Intelligence Map</h1>
      <div className="px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-[8px] border border-white/10 bg-graphite-950/64 px-4 py-3 backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-white">
            <NexaLogo compact />
            <ArrowLeft aria-hidden="true" className="size-4" />
            Home
          </Link>
          <Link href="/compare" className="text-sm font-semibold text-volt transition hover:text-white">
            Compare districts
          </Link>
        </div>
      </div>
      <IndiaIntelligenceMap standalone />
    </main>
  );
}
