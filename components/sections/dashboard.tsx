"use client";

import { motion } from "framer-motion";
import { Cpu, Gauge, LineChart, Satellite, ShieldCheck } from "lucide-react";
import { dashboardMetrics } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const toneClass = {
  signal: "from-signal to-white text-signal",
  volt: "from-volt to-white text-volt",
  iris: "from-iris to-white text-iris",
  ember: "from-ember to-white text-ember",
};

export function Dashboard() {
  return (
    <section id="dashboard" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI acquisition terminal"
          title="Bloomberg Terminal discipline with cinematic machine intelligence."
          copy="Every property becomes a live decision instrument with scoring, forecasting, risk traces, and negotiation-grade evidence."
        />

        <GlassCard className="mt-14 overflow-hidden p-0">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative border-b border-white/10 bg-black/30 p-6 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(120,247,212,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(120,247,212,0.07)_1px,transparent_1px)] bg-[size:30px_30px]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">Signal lock</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-white">
                      Mandate Intelligence
                    </p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-[8px] border border-volt/25 bg-volt/10 text-volt">
                    <Satellite aria-hidden="true" className="size-5" />
                  </span>
                </div>

                <div className="relative mx-auto mt-10 grid aspect-square max-w-[280px] place-items-center rounded-full border border-white/10 bg-[conic-gradient(from_90deg,rgba(120,247,212,0.8),rgba(102,227,255,0.55),rgba(165,140,255,0.55),rgba(120,247,212,0.8))] p-1 shadow-aurora">
                  <div className="absolute inset-8 animate-slow-spin rounded-full border border-dashed border-black/35" />
                  <div className="grid size-full place-items-center rounded-full bg-graphite-950">
                    <div className="text-center">
                      <p className="font-display text-7xl font-semibold text-white">94</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-volt">
                        NEXA score
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Liquidity", "High"],
                    ["Scarcity", "Rare"],
                    ["Downside", "Low"],
                    ["Action", "Bid"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
                      <p className="text-xs text-white/40">{label}</p>
                      <p className="mt-1 font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative p-5 sm:p-6">
              <div className="mb-5 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">Asset file</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    Villa Goa North Sector 7A
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-volt/20 bg-volt/10 px-3 py-2 text-xs text-volt">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  Verified by 9 agents
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {dashboardMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="rounded-[8px] border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                          {metric.label}
                        </p>
                        <p className={`mt-3 font-display text-4xl font-semibold ${toneClass[metric.tone].split(" ")[2]}`}>
                          {metric.value}
                        </p>
                      </div>
                      <Gauge aria-hidden="true" className="size-5 text-white/35" />
                    </div>
                    <p className="mt-3 text-sm text-white/55">{metric.detail}</p>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${toneClass[metric.tone].split(" ").slice(0, 2).join(" ")}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.08 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.86fr]">
                <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                      Appreciation model
                    </p>
                    <LineChart aria-hidden="true" className="size-4 text-signal" />
                  </div>
                  <div className="flex h-44 items-end gap-2">
                    {[22, 30, 28, 42, 54, 63, 72, 81, 90, 96].map((height, index) => (
                      <motion.span
                        key={height + index}
                        className="flex-1 rounded-t-[4px] bg-gradient-to-t from-signal/15 via-signal/55 to-volt"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                      Agent log
                    </p>
                    <Cpu aria-hidden="true" className="size-4 text-volt" />
                  </div>
                  <div className="space-y-3 font-mono text-xs text-white/60">
                    {[
                      "title_check: clean",
                      "builder_debt: stable",
                      "micro_market: underpriced",
                      "negotiation_band: -6.8%",
                      "recommendation: advance",
                    ].map((line, index) => (
                      <motion.p
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                      >
                        <span className="text-volt">nexa://</span>
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
