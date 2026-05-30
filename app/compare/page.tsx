import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ComparisonEngine } from "@/components/sections/comparison-engine";
import { NexaLogo } from "@/components/brand/nexa-logo";

export const metadata: Metadata = {
  title: "Property Comparison Engine",
  description:
    "Compare city vs city, district vs district, builder vs builder, and property vs property with NEXA AI analytics.",
};

export default function ComparePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">Property Comparison Engine</h1>
      <div className="px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[8px] border border-white/10 bg-graphite-950/64 px-4 py-3 backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-white">
            <NexaLogo compact />
            <ArrowLeft aria-hidden="true" className="size-4" />
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-semibold text-volt transition hover:text-white">
            Investor dashboard
          </Link>
        </div>
      </div>
      <ComparisonEngine />
    </main>
  );
}
