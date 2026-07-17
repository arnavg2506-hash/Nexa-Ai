"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Building2,
  Check,
  Gauge,
  Landmark,
  SlidersHorizontal,
  Sparkles,
  Trees,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
import { DataDisclosure } from "@/components/ui/data-disclosure";
import { IntelligenceWindow } from "@/components/ui/intelligence-window";
import { SectionHeading } from "@/components/ui/section-heading";
import { districts, slugify } from "@/lib/platform-data";

type AssetType = "land" | "homes";
type Objective = "balanced" | "growth" | "yield" | "low-risk";
type Region = "All India" | "North" | "West" | "South" | "East";

type MarketProfile = {
  name: string;
  assets: AssetType[];
  minBudget: number;
  region: Exclude<Region, "All India">;
  growth5Y: number;
  yield: number;
  liquidity: number;
  risk: number;
  catalyst: string;
};

const marketProfiles: MarketProfile[] = [
  { name: "Dholera", assets: ["land"], minBudget: 35, region: "West", growth5Y: 42, yield: 2.2, liquidity: 61, risk: 55, catalyst: "DMIC, SIR trunk infrastructure and airport influence" },
  { name: "Nagpur", assets: ["land", "homes"], minBudget: 48, region: "West", growth5Y: 35, yield: 4.1, liquidity: 74, risk: 34, catalyst: "MIHAN and north-south logistics overlap" },
  { name: "Jaipur", assets: ["land", "homes"], minBudget: 52, region: "North", growth5Y: 36, yield: 3.8, liquidity: 78, risk: 35, catalyst: "DMIC, expressways and warehousing demand" },
  { name: "Lucknow", assets: ["land", "homes"], minBudget: 48, region: "North", growth5Y: 34, yield: 3.9, liquidity: 76, risk: 33, catalyst: "Expressway network and institutional growth" },
  { name: "Hyderabad", assets: ["land", "homes"], minBudget: 72, region: "South", growth5Y: 40, yield: 4.9, liquidity: 88, risk: 29, catalyst: "Tech, life sciences, ORR and industrial corridors" },
  { name: "Bengaluru", assets: ["homes"], minBudget: 88, region: "South", growth5Y: 37, yield: 5.1, liquidity: 92, risk: 34, catalyst: "Deep rental demand, metro and high-skill employment" },
  { name: "Pune", assets: ["homes"], minBudget: 68, region: "West", growth5Y: 34, yield: 4.7, liquidity: 87, risk: 30, catalyst: "IT, auto, education and metro expansion" },
  { name: "Visakhapatnam", assets: ["land", "homes"], minBudget: 46, region: "East", growth5Y: 37, yield: 4.2, liquidity: 73, risk: 39, catalyst: "VCIC, OEC and port-linked industry" },
  { name: "Kochi", assets: ["homes"], minBudget: 62, region: "South", growth5Y: 31, yield: 4.4, liquidity: 80, risk: 32, catalyst: "Metro, port demand and NRI housing depth" },
  { name: "Mumbai-Panvel", assets: ["land", "homes"], minBudget: 115, region: "West", growth5Y: 39, yield: 3.7, liquidity: 89, risk: 37, catalyst: "Navi Mumbai airport and harbour-link repricing" },
];

const objectives: Array<{ value: Objective; label: string }> = [
  { value: "balanced", label: "Balanced return and resilience" },
  { value: "growth", label: "Capital appreciation" },
  { value: "yield", label: "Rental income" },
  { value: "low-risk", label: "Lower execution risk" },
];

const horizons = [3, 5, 7, 10] as const;

export function DecisionStudio() {
  const [asset, setAsset] = useState<AssetType>("land");
  const [budget, setBudget] = useState(100);
  const [horizon, setHorizon] = useState<(typeof horizons)[number]>(7);
  const [objective, setObjective] = useState<Objective>("balanced");
  const [region, setRegion] = useState<Region>("All India");
  const reduceMotion = useReducedMotion();

  const rankedMarkets = useMemo(() => {
    return marketProfiles
      .filter((profile) => profile.assets.includes(asset))
      .filter((profile) => region === "All India" || profile.region === region)
      .map((profile) => {
        const district = districts.find((item) => item.name === profile.name);
        const budgetFit = budget >= profile.minBudget
          ? Math.min(7, (budget - profile.minBudget) / 24)
          : -Math.min(24, (profile.minBudget - budget) * 0.45);
        const horizonFit = horizon >= 7 && asset === "land" ? 4 : horizon <= 3 && profile.risk > 42 ? -7 : 1;
        const objectiveFit = objective === "growth"
          ? profile.growth5Y / 7
          : objective === "yield"
            ? profile.yield * 1.8
            : objective === "low-risk"
              ? (100 - profile.risk) / 10
              : (profile.liquidity + profile.growth5Y - profile.risk * 0.35) / 16;
        const score = Math.round(Math.max(48, Math.min(98, (district?.score ?? 78) + budgetFit + horizonFit + objectiveFit - 6)));
        const projectedGrowth = Math.round(profile.growth5Y * (horizon / 5) * (horizon > 5 ? 0.9 : 1));

        return { ...profile, district, score, projectedGrowth };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [asset, budget, horizon, objective, region]);

  function askCopilot() {
    const markets = rankedMarkets.map((market) => market.name).join(", ");
    const prompt = `Compare ${markets} for an ${asset === "land" ? "India land" : "India homes"} mandate with INR ${budget} lakh, a ${horizon}-year horizon, and a ${objectives.find((item) => item.value === objective)?.label.toLowerCase()} objective.`;
    window.dispatchEvent(new CustomEvent("nexa-analyze-prompt", { detail: { prompt } }));
  }

  return (
    <section id="studio" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/45 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Acquisition studio"
          title="Model the mandate before you browse a single listing."
          copy="Set the capital, asset class, holding period and objective. NEXA recalculates a transparent shortlist from its illustrative India intelligence model."
        />

        <div className="mt-8 max-w-4xl">
          <DataDisclosure compact />
        </div>

        <div className="mt-10">
          <IntelligenceWindow
            eyebrow="Decision model / Scenario 01"
            title="India acquisition shortlist"
            icon={<BrainCircuit aria-hidden="true" className="size-4" />}
            tone="amber"
            bodyClassName="max-h-[min(760px,calc(100svh-120px))]"
          >
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
                  <SlidersHorizontal aria-hidden="true" className="size-4 text-ember" />
                  Mandate controls
                </div>

                <fieldset className="mt-6">
                  <legend className="text-sm font-medium text-white/72">Asset class</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-[8px] border border-white/10 bg-black/20 p-1.5">
                    <ModeButton active={asset === "land"} onClick={() => setAsset("land")} icon={<Trees aria-hidden="true" className="size-4" />} label="Land" />
                    <ModeButton active={asset === "homes"} onClick={() => setAsset("homes")} icon={<Building2 aria-hidden="true" className="size-4" />} label="Homes" />
                  </div>
                </fieldset>

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor="studio-budget" className="text-sm font-medium text-white/72">Capital</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/38">INR</span>
                      <input
                        id="studio-budget-number"
                        aria-label="Capital in lakh rupees"
                        type="number"
                        min={25}
                        max={500}
                        step={5}
                        value={budget}
                        onChange={(event) => setBudget(clampBudget(Number(event.target.value)))}
                        className="h-10 w-24 rounded-[6px] border border-white/12 bg-black/25 px-2 text-right text-sm font-semibold text-white focus:border-ember/60 focus:outline-none"
                      />
                      <span className="text-xs text-white/38">Lakh</span>
                    </div>
                  </div>
                  <input
                    id="studio-budget"
                    aria-label="Capital budget"
                    type="range"
                    min={25}
                    max={500}
                    step={5}
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                    className="mt-4 w-full accent-[#ffb86b]"
                  />
                  <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.14em] text-white/30">
                    <span>25L</span>
                    <span>5Cr</span>
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className="text-sm font-medium text-white/72">Holding period</legend>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {horizons.map((item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={horizon === item}
                        onClick={() => setHorizon(item)}
                        className={`min-h-10 rounded-[6px] border text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
                          horizon === item
                            ? "border-ember/55 bg-ember/12 text-ember"
                            : "border-white/10 bg-white/[0.035] text-white/52 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {item}Y
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-white/72">
                    Primary objective
                    <select
                      value={objective}
                      onChange={(event) => setObjective(event.target.value as Objective)}
                      className="min-h-11 rounded-[6px] border border-white/12 bg-[#0b0f15] px-3 text-sm text-white focus:border-ember/55 focus:outline-none"
                    >
                      {objectives.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-white/72">
                    Region
                    <select
                      value={region}
                      onChange={(event) => setRegion(event.target.value as Region)}
                      className="min-h-11 rounded-[6px] border border-white/12 bg-[#0b0f15] px-3 text-sm text-white focus:border-ember/55 focus:outline-none"
                    >
                      {(["All India", "North", "West", "South", "East"] as Region[]).map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={askCopilot}
                  disabled={rankedMarkets.length === 0}
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-platinum px-5 text-sm font-semibold text-graphite-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Sparkles aria-hidden="true" className="size-4" />
                  Ask NEXA about this shortlist
                </button>
              </div>

              <div className="min-h-[520px] p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-volt">Ranked opportunity set</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                      {rankedMarkets.length ? `${rankedMarkets.length} markets fit the current frame` : "No exact regional match"}
                    </h3>
                  </div>
                  <p className="text-xs text-white/38">Recalculates instantly</p>
                </div>

                <div aria-live="polite" className="mt-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {rankedMarkets.map((market, index) => (
                      <motion.article
                        layout
                        key={market.name}
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.04 }}
                        className="grid gap-4 border-b border-white/10 py-5 last:border-0 md:grid-cols-[64px_minmax(0,1fr)_auto] md:items-center"
                      >
                        <div
                          className="grid size-16 place-items-center rounded-full"
                          style={{ background: `conic-gradient(#78f7d4 ${market.score * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}
                          aria-label={`${market.score} percent match`}
                        >
                          <div className="grid size-12 place-items-center rounded-full bg-[#090c11] font-display text-lg font-semibold text-white">
                            {market.score}
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/34">0{index + 1}</span>
                            <h4 className="font-display text-xl font-semibold text-white">{market.name}</h4>
                            {budget < market.minBudget ? (
                              <span className="rounded-full border border-ember/30 bg-ember/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ember">Stretch</span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-white/55">{market.catalyst}</p>
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/45">
                            <span><strong className="text-white/80">+{market.projectedGrowth}%</strong> modelled {horizon}Y</span>
                            <span><strong className="text-white/80">{market.yield.toFixed(1)}%</strong> yield signal</span>
                            <span><strong className="text-white/80">{market.liquidity}/100</strong> liquidity</span>
                          </div>
                        </div>

                        <Link
                          href={`/districts/${slugify(market.name)}`}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 text-xs font-semibold text-white/68 transition hover:border-volt/40 hover:text-volt"
                        >
                          Open report
                          <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      </motion.article>
                    ))}
                  </AnimatePresence>

                  {rankedMarkets.length === 0 ? (
                    <div className="grid min-h-72 place-items-center text-center">
                      <div>
                        <Landmark aria-hidden="true" className="mx-auto size-7 text-white/35" />
                        <p className="mt-4 text-white/62">Try All India or another region for this asset class.</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-2 flex items-start gap-3 border-t border-white/10 pt-4 text-xs leading-5 text-white/38">
                  <Gauge aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember" />
                  Match combines budget fit, NEXA district score, liquidity, risk, objective and holding period. It is a decision aid, not a valuation or return promise.
                </div>
              </div>
            </div>
          </IntelligenceWindow>
        </div>
      </div>
    </section>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
        active ? "bg-white text-graphite-950" : "text-white/52 hover:bg-white/[0.055] hover:text-white"
      }`}
    >
      {active ? <Check aria-hidden="true" className="size-4" /> : icon}
      {label}
    </button>
  );
}

function clampBudget(value: number) {
  if (!Number.isFinite(value)) {
    return 25;
  }
  return Math.min(500, Math.max(25, value));
}
