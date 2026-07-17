"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, FileText, ShieldAlert, TrendingUp } from "lucide-react";
import Link from "next/link";
import { districts, slugify } from "@/lib/platform-data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function DistrictIntelligence() {
  const featuredDistricts = districts
    .filter((district) => district.opportunity === "High")
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);

  return (
    <section id="districts" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="District intelligence pages"
          title="Click a district. Get an investment memo, not a brochure."
          copy="NEXA converts population trends, rates, infrastructure, demand, and risk into AI-written investment reports for land and homes decisions."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {featuredDistricts.map((district, index) => (
            <motion.div
              key={district.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.58, delay: index * 0.06 }}
            >
              <GlassCard className="h-full p-6">
                <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-volt">{district.state}</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                      {district.name}
                    </h3>
                  </div>
                  <div className="rounded-[8px] border border-volt/20 bg-volt/10 px-4 py-3 text-right">
                    <p className="text-xs text-white/45">NEXA score</p>
                    <p className="font-display text-3xl font-semibold text-white">{district.score}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2">
                  <Metric icon={Activity} label="Population trends" value={district.populationTrend} />
                  <Metric icon={TrendingUp} label="Growth forecast" value={district.growthForecast} />
                  <Metric icon={FileText} label="Land rates" value={district.landRate} />
                  <Metric icon={FileText} label="Flat rates" value={district.flatRate} />
                </div>

                <div className="relative z-10 mt-6 rounded-[8px] border border-white/10 bg-black/25 p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    <ShieldAlert aria-hidden="true" className="size-4 text-ember" />
                    Risk indicators
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/65">{district.risk}</p>
                </div>

                <div className="relative z-10 mt-6 rounded-[8px] border border-signal/20 bg-signal/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-signal">
                    AI investment report
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/72">{district.report}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {district.infrastructure.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/districts/${slugify(district.name)}`}
                    className="mt-5 inline-flex rounded-full border border-signal/25 bg-signal/10 px-4 py-2 text-sm font-semibold text-signal transition hover:bg-signal/[0.16]"
                  >
                    Open full district page
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/map"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-white transition hover:border-volt/40 hover:text-volt"
          >
            Explore all {districts.length} intelligence nodes
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <Icon aria-hidden="true" className="size-4 text-volt" />
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/40">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
