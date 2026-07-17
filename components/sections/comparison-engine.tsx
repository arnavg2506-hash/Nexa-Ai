"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Building2, GitCompare, MapPinned, Scale } from "lucide-react";
import { useState } from "react";
import { comparisonRows } from "@/lib/platform-data";
import { DataDisclosure } from "@/components/ui/data-disclosure";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const comparisonModes = [
  {
    key: "location",
    label: "Location vs Location",
    description: "AI-normalized investment analytics",
    icon: MapPinned,
    title: "DMIC vs AKIC vs VCIC/OEC",
    columns: ["DMIC", "AKIC", "VCIC/OEC"],
    rows: comparisonRows.map((row) => ({
      metric: row.metric,
      values: [row.west, row.northEast, row.southEast],
    })),
  },
  {
    key: "property",
    label: "Property vs Property",
    description: "Yield, risk and resale depth",
    icon: Scale,
    title: "Corridor Plot vs Metro Home vs Port Land",
    columns: ["Dholera Plot", "Bengaluru 3BHK", "Vizag Port Land"],
    rows: [
      { metric: "AI match score", values: ["92", "88", "81"] },
      { metric: "5Y appreciation", values: ["+36%", "+34%", "+54%"] },
      { metric: "Rental yield", values: ["3.2%", "4.8%", "Not income-led"] },
      { metric: "Liquidity", values: ["High", "Medium-high", "Medium"] },
      { metric: "Risk load", values: ["Price risk", "Builder risk", "Timing risk"] },
    ],
  },
  {
    key: "builder",
    label: "Builder vs Builder",
    description: "Trust, delivery and quality scoring",
    icon: Building2,
    title: "National Developers vs Regional Specialists",
    columns: ["National Grade-A", "Regional Industrial", "Township Specialist"],
    rows: [
      { metric: "Trust score", values: ["94", "90", "88"] },
      { metric: "Delivery history", values: ["Very strong", "Strong", "Strong"] },
      { metric: "Premium resale depth", values: ["Very high", "High", "Medium-high"] },
      { metric: "Pricing power", values: ["High", "Medium-high", "Medium"] },
      { metric: "Risk load", values: ["Entry price", "Launch density", "Inventory depth"] },
    ],
  },
  {
    key: "city",
    label: "City vs City",
    description: "Macro growth and capital flow",
    icon: ArrowLeftRight,
    title: "Bengaluru vs Hyderabad vs Pune",
    columns: ["Bengaluru", "Hyderabad", "Pune"],
    rows: [
      { metric: "NEXA score", values: ["90", "89", "85"] },
      { metric: "5Y growth model", values: ["+40%", "+43%", "+36%"] },
      { metric: "Demand depth", values: ["IT + family rental", "Tech + life sciences", "IT + auto + education"] },
      { metric: "Infra catalyst", values: ["CBIC + BMIC + metro", "ORR + industrial corridors", "BMIC + metro"] },
      { metric: "Risk load", values: ["Traffic + water", "Peripheral approvals", "Oversupply + commute"] },
    ],
  },
] as const;

export function ComparisonEngine() {
  const [mode, setMode] = useState<(typeof comparisonModes)[number]["key"]>("location");
  const activeMode = comparisonModes.find((item) => item.key === mode) ?? comparisonModes[0];

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Comparison engine"
          title="Compare location vs location, property vs property, builder vs builder."
          copy="NEXA turns fragmented real estate decisions into side-by-side analytics, with every row grounded in growth, risk, liquidity, and infrastructure logic."
        />

        <div className="mt-8 max-w-4xl">
          <DataDisclosure compact />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="grid gap-4">
            {comparisonModes.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <button
                  type="button"
                  aria-pressed={activeMode.key === item.key}
                  onClick={() => setMode(item.key)}
                  className="group block w-full text-left"
                >
                  <GlassCard
                    active={activeMode.key === item.key}
                    className="p-5 transition group-hover:-translate-y-1 group-hover:border-volt/35"
                  >
                    <div className="relative z-10 flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-[8px] border border-white/10 bg-white/[0.055] text-volt">
                      <item.icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-white/50">{item.description}</p>
                    </div>
                    </div>
                  </GlassCard>
                </button>
              </motion.div>
            ))}
          </div>

          <GlassCard className="overflow-hidden p-0">
            <div className="relative z-10 border-b border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                    Live comparison
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white" aria-live="polite">
                    {activeMode.title}
                  </h3>
                </div>
                <GitCompare aria-hidden="true" className="size-5 text-signal" />
              </div>
            </div>
            <div className="relative z-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-white/40">
                    <th className="px-5 py-4 font-medium">Metric</th>
                    {activeMode.columns.map((column) => (
                      <th key={column} className="px-5 py-4 font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeMode.rows.map((row) => (
                    <tr key={row.metric} className="border-b border-white/10 last:border-0">
                      <td className="px-5 py-5 text-white/60">{row.metric}</td>
                      {row.values.map((value, valueIndex) => (
                        <td
                          key={`${row.metric}-${activeMode.columns[valueIndex]}`}
                          className="px-5 py-5 font-semibold text-white"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
