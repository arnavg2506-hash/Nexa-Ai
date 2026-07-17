"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Check,
  GitCompare,
  LayoutDashboard,
  Map,
  Radar,
  Trees,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IntelligenceWindow } from "@/components/ui/intelligence-window";
import { SectionHeading } from "@/components/ui/section-heading";
import { platformModules } from "@/lib/platform-data";

const workspaces = [
  {
    key: "land",
    title: platformModules[0].title,
    label: "Acquisition capital",
    href: "/modules/land",
    description: platformModules[0].description,
    features: platformModules[0].features,
    icon: Trees,
    tone: "mint" as const,
    metrics: [["10Y model", "3 scenarios"], ["Risk gates", "Title + access"], ["Coverage", "11 corridors"]],
    command: "Rank land by infrastructure evidence, holding period and exit liquidity.",
  },
  {
    key: "homes",
    title: platformModules[1].title,
    label: "Lifestyle and yield",
    href: "/modules/homes",
    description: platformModules[1].description,
    features: platformModules[1].features,
    icon: Building2,
    tone: "cyan" as const,
    metrics: [["Builder screen", "Trust + delivery"], ["Yield model", "Rent + vacancy"], ["Lifestyle", "4 signal groups"]],
    command: "Match a home to commute, builder confidence, rental depth and family priorities.",
  },
  {
    key: "map",
    title: "India Intelligence Map",
    label: "National opportunity graph",
    href: "/map",
    description: "Explore an India-wide decision map with district search, corridor overlays, infrastructure layers, opportunity signals and linked reports.",
    features: ["33 intelligence nodes", "11 corridor models", "Layer controls", "District search", "Linked reports"],
    icon: Map,
    tone: "iris" as const,
    metrics: [["District nodes", "33"], ["Corridors", "11"], ["Map layers", "8"]],
    command: "Trace how freight, industrial, airport and metro catalysts connect markets.",
  },
  {
    key: "compare",
    title: "Comparison Engine",
    label: "Side-by-side evidence",
    href: "/compare",
    description: "Compare locations, properties, builders and cities through the same growth, risk, liquidity and infrastructure decision frame.",
    features: ["City vs city", "Property vs property", "Builder risk", "Liquidity framing", "Export-ready logic"],
    icon: GitCompare,
    tone: "amber" as const,
    metrics: [["Compare modes", "4"], ["Decision rows", "5+"], ["Evidence frame", "Normalized"]],
    command: "Remove brochure language and compare every option on the same evidence rows.",
  },
  {
    key: "dashboard",
    title: "Investor OS",
    label: "Continuous monitoring",
    href: "/dashboard",
    description: "Turn saved markets and acquisition theses into a monitored portfolio with watchlists, growth triggers and AI recommendations.",
    features: ["Saved markets", "Portfolio watch", "Growth triggers", "AI recommendations", "Decision history"],
    icon: LayoutDashboard,
    tone: "mint" as const,
    metrics: [["Watchlists", "Unified"], ["Alerts", "Evidence-led"], ["Recommendations", "On demand"]],
    command: "Track what changed since the thesis was created, not just the current price.",
  },
] as const;

export function EntryExperience() {
  const [activeKey, setActiveKey] = useState<(typeof workspaces)[number]["key"]>("land");
  const reduceMotion = useReducedMotion();
  const active = workspaces.find((workspace) => workspace.key === activeKey) ?? workspaces[0];
  const ActiveIcon = active.icon;

  return (
    <section
      id="modules"
      aria-label="Choose a dedicated NEXA AI workspace"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Purpose-built workspaces"
          title="One platform. Five distinct decision rooms."
          copy="Land, homes, mapping, comparison and portfolio monitoring need different evidence. Preview the operating model, then open each workspace in its own route."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.68fr_1.32fr]">
          <div role="tablist" aria-label="NEXA workspaces" className="grid gap-2">
            {workspaces.map((workspace, index) => {
              const Icon = workspace.icon;
              const selected = workspace.key === active.key;

              return (
                <motion.button
                  layout
                  key={workspace.key}
                  type="button"
                  role="tab"
                  id={`workspace-tab-${workspace.key}`}
                  aria-selected={selected}
                  aria-controls="workspace-preview"
                  onClick={() => setActiveKey(workspace.key)}
                  className={`group grid min-h-[88px] grid-cols-[46px_minmax(0,1fr)_auto] items-center gap-4 rounded-[8px] border px-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt ${
                    selected
                      ? "border-volt/40 bg-volt/10 shadow-[inset_3px_0_0_#78f7d4]"
                      : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.055]"
                  }`}
                >
                  <span className={`grid size-11 place-items-center rounded-[6px] border ${selected ? "border-volt/35 bg-volt/10 text-volt" : "border-white/10 bg-black/20 text-white/50"}`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/34">0{index + 1} / {workspace.label}</span>
                    <span className="mt-1 block font-display text-lg font-semibold text-white">{workspace.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className={`size-4 transition ${selected ? "text-volt" : "text-white/25 group-hover:text-white/60"}`} />
                </motion.button>
              );
            })}
          </div>

          <IntelligenceWindow
            eyebrow={`${active.label} / Dedicated route`}
            title={active.title}
            icon={<ActiveIcon aria-hidden="true" className="size-4" />}
            tone={active.tone}
            bodyClassName="max-h-[min(680px,calc(100svh-120px))]"
          >
            <div
              id="workspace-preview"
              role="tabpanel"
              aria-labelledby={`workspace-tab-${active.key}`}
              className="min-h-[520px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.key}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28 }}
                >
                  <div className="grid border-b border-white/10 md:grid-cols-[1fr_0.85fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-volt">{active.label}</p>
                      <h3 className="mt-4 max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">{active.command}</h3>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-white/58 sm:text-base">{active.description}</p>
                      <Link
                        href={active.href}
                        className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-platinum px-5 text-sm font-semibold text-graphite-950 transition hover:bg-white"
                      >
                        Open separate workspace
                        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-white/10 md:grid-cols-1 md:divide-x-0 md:divide-y">
                      {active.metrics.map(([label, value]) => (
                        <div key={label} className="flex min-h-28 flex-col justify-center p-4 sm:p-5">
                          <p className="font-display text-xl font-semibold text-white sm:text-2xl">{value}</p>
                          <p className="mt-2 text-xs leading-5 text-white/38">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-0 sm:grid-cols-2">
                    {active.features.map((feature, index) => (
                      <div
                        key={feature}
                        className={`flex min-h-16 items-center gap-3 border-white/10 px-5 py-4 text-sm text-white/68 ${
                          index < active.features.length - 2 ? "border-b" : ""
                        } ${index % 2 === 0 ? "sm:border-r" : ""}`}
                      >
                        <Check aria-hidden="true" className="size-4 shrink-0 text-volt" />
                        {feature}
                      </div>
                    ))}
                    <div className="flex min-h-16 items-center gap-3 px-5 py-4 text-sm text-white/42">
                      <Radar aria-hidden="true" className="size-4 shrink-0 text-signal" />
                      Every estimate shows its evidence boundary.
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </IntelligenceWindow>
        </div>
      </div>
    </section>
  );
}
