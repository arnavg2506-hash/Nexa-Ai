"use client";

import { motion } from "framer-motion";
import { BellRing, Bookmark, BriefcaseBusiness, Radar, Sparkles } from "lucide-react";
import Link from "next/link";
import { aiRecommendations, portfolioAssets } from "@/lib/platform-data";
import { Counter } from "@/components/ui/counter";
import { DataDisclosure } from "@/components/ui/data-disclosure";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function InvestorDashboard() {
  function askCopilot(prompt: string) {
    window.dispatchEvent(new CustomEvent("nexa-analyze-prompt", { detail: { prompt } }));
    window.location.hash = "copilot";
  }

  const assetLinks = ["/districts/dholera", "/districts/nagpur", "/districts/visakhapatnam"];

  return (
    <section id="investor-os" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Investor dashboard"
          title="Watchlists, saved searches, portfolio tracking and growth alerts."
          copy="The investor OS brings holdings, saved locations, evidence triggers and AI recommendations into one decision surface. This release shows an illustrative watchlist."
        />

        <div className="mt-8 max-w-4xl">
          <DataDisclosure compact />
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-[0.68fr_1.32fr]">
          <div className="grid gap-5">
            <GlassCard className="p-6">
              <div className="relative z-10 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Portfolio pulse</p>
                <BriefcaseBusiness aria-hidden="true" className="size-5 text-volt" />
              </div>
              <div className="relative z-10 mt-8 grid grid-cols-2 gap-3">
                <Stat label="Saved locations" value={42} />
                <Stat label="Saved searches" value={18} />
                <Stat label="Growth alerts" value={7} />
                <Stat label="AI recs" value={23} />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="relative z-10 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Growth alerts</p>
                <BellRing aria-hidden="true" className="size-5 text-ember" />
              </div>
              <div className="relative z-10 mt-5 space-y-3">
                {[
                  "Sample trigger: Dholera infrastructure evidence moved above threshold",
                  "Sample trigger: Nagpur logistics demand moved above baseline",
                  "Sample trigger: Vizag port-linked absorption needs review",
                ].map((alert) => (
                  <div key={alert} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-3 text-sm text-white/65">
                    {alert}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Illustrative portfolio</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                  Acquisition and ownership intelligence
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-volt/20 bg-volt/10 px-3 py-2 text-xs text-volt">
                <Radar aria-hidden="true" className="size-4" />
                Demonstration watchlist
              </div>
            </div>

            <div className="relative z-10 mt-5 grid gap-4">
              {portfolioAssets.map((asset, index) => (
                <motion.div
                  key={asset.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="grid gap-4 rounded-[8px] border border-white/10 bg-black/25 p-4 md:grid-cols-[1fr_0.42fr_0.36fr]"
                >
                  <div>
                    <p className="font-display text-xl font-semibold text-white">{asset.name}</p>
                    <p className="mt-1 text-sm text-white/50">{asset.type}</p>
                    <p className="mt-4 flex items-center gap-2 text-sm text-volt">
                      <Bookmark aria-hidden="true" className="size-4" />
                      {asset.alert}
                    </p>
                    <Link
                      href={assetLinks[index] ?? "/compare"}
                      className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-white/65 transition hover:border-volt/35 hover:text-volt"
                    >
                      Open asset analysis
                    </Link>
                  </div>
                  <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">Value</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-white">{asset.value}</p>
                  </div>
                  <div className="rounded-[8px] border border-volt/20 bg-volt/10 p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">Growth</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-volt">{asset.growth}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 mt-5 rounded-[8px] border border-signal/20 bg-signal/10 p-5">
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-signal">
                <Sparkles aria-hidden="true" className="size-4" />
                AI recommendations
              </div>
              <div className="grid gap-3">
                {aiRecommendations.map((recommendation) => (
                  <button
                    key={recommendation}
                    type="button"
                    onClick={() => askCopilot(recommendation)}
                    className="rounded-[8px] border border-white/10 bg-black/20 p-3 text-left text-sm leading-7 text-white/70 transition hover:border-signal/30 hover:text-white"
                  >
                    {recommendation}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
      <Counter to={value} className="font-display text-3xl font-semibold text-white" />
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/40">{label}</p>
    </div>
  );
}
