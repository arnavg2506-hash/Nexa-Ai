"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  GitCompare,
  LayoutDashboard,
  Map,
} from "lucide-react";
import { platformModules } from "@/lib/platform-data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const workspaceLinks = [
  {
    title: "India intelligence map",
    href: "/map",
    description: "Full-screen district map with filters, zoom controls and heatmaps.",
    icon: Map,
  },
  {
    title: "Comparison engine",
    href: "/compare",
    description: "Compare cities, districts, builders and properties side by side.",
    icon: GitCompare,
  },
  {
    title: "Investor dashboard",
    href: "/dashboard",
    description: "Watchlists, saved searches, portfolio tracking and growth alerts.",
    icon: LayoutDashboard,
  },
];

export function EntryExperience() {
  return (
    <section
      id="modules"
      aria-label="Choose a dedicated NEXA AI workspace"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-volt/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Entry experience"
          title="Choose the asset class. NEXA rewires the intelligence layer."
          copy="Land and homes behave differently. NEXA separates the decision engine so every score, forecast, and risk vector matches the buyer's real objective."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {platformModules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.key}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
              >
                <Link
                  href={`/modules/${module.key}`}
                  className="group block rounded-[8px]"
                  aria-label={`Open the dedicated ${module.title} intelligence workspace`}
                >
                  <GlassCard className="min-h-[430px] p-6 transition duration-500 group-hover:-translate-y-2 group-hover:border-volt/40 group-hover:bg-white/[0.075]">
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center justify-between gap-4">
                        <span className="grid size-14 place-items-center rounded-[8px] border border-white/10 bg-white/[0.055] text-volt">
                          <Icon aria-hidden="true" className="size-7" />
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-volt/25 bg-volt/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-volt">
                          Open workspace
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </div>

                      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                        {module.label}
                      </p>
                      <h3 className="mt-3 font-display text-4xl font-semibold text-white">
                        {module.title}
                      </h3>
                      <p className="mt-5 text-base leading-8 text-white/72">
                        {module.description}
                      </p>

                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {module.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 text-sm text-white/78">
                            <Check aria-hidden="true" className="size-4 shrink-0 text-volt" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {workspaceLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: 0.18 + index * 0.06 }}
              >
                <Link
                  href={item.href}
                  className="group block rounded-[8px]"
                  aria-label={`Open ${item.title}`}
                >
                  <GlassCard className="h-full p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-signal/35">
                    <div className="relative z-10 flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-[8px] border border-white/10 bg-white/[0.055] text-signal">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p>
                      </div>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-auto size-4 shrink-0 text-white/45 transition group-hover:text-signal"
                      />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 rounded-[8px] border border-white/10 bg-white/[0.045] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <BarChart3 aria-hidden="true" className="mt-1 size-5 text-volt" />
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Every option now opens as its own workspace.
                </h3>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Keyboard users can tab through each card, press Enter, and land on a dedicated page
                  with a clear back path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
