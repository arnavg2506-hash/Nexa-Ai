"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Calculator, Gauge, MapPinned, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  homesForecast,
  infrastructureLayers,
  landForecast,
  lifestyleSignals,
  type ModuleKey,
} from "@/lib/platform-data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

type IntelligenceModulesProps = {
  selected: ModuleKey;
};

export function IntelligenceModules({ selected }: IntelligenceModulesProps) {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-signal/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Dedicated AI modules"
          title={
            selected === "land"
              ? "Land intelligence for patient capital and acquisition teams."
              : "Homes intelligence for buyers, families, and rental investors."
          }
          copy={
            selected === "land"
              ? "NEXA models appreciation, infrastructure triggers, legal complexity, market liquidity, and development uncertainty for plots, farmland, industrial parcels, and future corridors."
              : "NEXA scores builder trust, rental yield, commute friction, lifestyle quality, neighborhood depth, and personalized property match quality."
          }
        />

        <div className="mt-14">
          {selected === "land" ? <LandDashboard /> : <HomesDashboard />}
        </div>
      </div>
    </section>
  );
}

function LandDashboard() {
  const [budget, setBudget] = useState(100);
  const [chartsReady, setChartsReady] = useState(false);
  const locations = useMemo(
    () => [
      {
        name: "Dholera DMIC Belt",
        score: Math.min(97, 78 + budget / 12),
        reason: "Industrial city and airport-led DMIC thesis",
        href: "/districts/dholera",
      },
      {
        name: "Nagpur Corridor Core",
        score: Math.min(96, 72 + budget / 10),
        reason: "Central India logistics overlap",
        href: "/districts/nagpur",
      },
      {
        name: "Vizag VCIC Arc",
        score: Math.min(94, 70 + budget / 11),
        reason: "Port-led VCIC industrial corridor impact",
        href: "/districts/visakhapatnam",
      },
    ],
    [budget],
  );

  useEffect(() => {
    setChartsReady(true);
  }, []);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
      <GlassCard className="p-6">
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Investment score</p>
          <div className="mt-7 grid place-items-center">
            <div className="relative grid aspect-square w-64 place-items-center rounded-full border border-volt/20 bg-[conic-gradient(from_90deg,rgba(120,247,212,0.9)_0_91%,rgba(255,255,255,0.08)_91%)] p-1 shadow-aurora">
              <div className="grid size-full place-items-center rounded-full bg-graphite-950">
                <div className="text-center">
                  <p className="font-display text-7xl font-semibold text-white">91</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-volt">0-100</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {[
              ["Legal complexity", "Medium", 48],
              ["Market liquidity", "Strong", 82],
              ["Development uncertainty", "Controlled", 34],
            ].map(([label, value, level]) => (
              <div key={label} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-volt to-signal" style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-5">
        <GlassCard className="p-6">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Growth forecast</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">3Y, 5Y and 10Y land appreciation</h3>
            </div>
            <Gauge aria-hidden="true" className="size-6 text-volt" />
          </div>
          <div className="relative z-10 mt-6 h-72 min-h-72">
            {chartsReady ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={landForecast}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="horizon" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.35)" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(3,4,6,0.92)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                  />
                  <Line type="monotone" dataKey="conservative" stroke="#66e3ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="base" stroke="#78f7d4" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="aggressive" stroke="#a58cff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ChartSkeleton />
            )}
          </div>
        </GlassCard>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="p-6">
            <p className="relative z-10 text-xs uppercase tracking-[0.25em] text-white/40">
              Infrastructure impact
            </p>
            <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
              {infrastructureLayers.slice(0, 6).map((layer) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.label} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white/70">
                    <Icon aria-hidden="true" className="size-4 text-volt" />
                    {layer.label}
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="relative z-10 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Opportunity scanner</p>
              <Calculator aria-hidden="true" className="size-5 text-signal" />
            </div>
            <label className="relative z-10 mt-5 block text-sm text-white/60" htmlFor="land-budget">
              Budget: INR {budget}L
            </label>
            <input
              id="land-budget"
              type="range"
              min="50"
              max="500"
              step="10"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="relative z-10 mt-4 w-full accent-[#78f7d4]"
            />
            <div className="relative z-10 mt-5 grid gap-3">
              {locations.map((location) => (
                <div key={location.name} className="rounded-[8px] border border-white/10 bg-black/25 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{location.name}</p>
                    <p className="font-display text-xl font-semibold text-volt">{Math.round(location.score)}</p>
                  </div>
                  <p className="mt-1 text-sm text-white/50">{location.reason}</p>
                  <Link
                    href={location.href}
                    className="mt-3 inline-flex rounded-full border border-volt/20 bg-volt/10 px-3 py-1.5 text-xs font-semibold text-volt transition hover:bg-volt/[0.16]"
                  >
                    Open analysis
                  </Link>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function HomesDashboard() {
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    setChartsReady(true);
  }, []);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
      <GlassCard className="p-6">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Homes intelligence</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white">
              Builder, yield, commute and lifestyle model
            </h3>
          </div>
          <Sparkles aria-hidden="true" className="size-6 text-volt" />
        </div>

        <div className="relative z-10 mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Builder Trust Score", "A+", "91/100"],
            ["Rental Yield Estimate", "5.2%", "Prime lease depth"],
            ["Future Appreciation", "+42%", "5-year forecast"],
            ["AI Match Score", "94", "Personalized fit"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-[8px] border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/40">{label}</p>
              <p className="mt-3 font-display text-4xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-white/50">{detail}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-7 h-72 min-h-72">
          {chartsReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={homesForecast}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="horizon" stroke="rgba(255,255,255,0.45)" />
                <YAxis stroke="rgba(255,255,255,0.35)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(3,4,6,0.92)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                />
                <Bar dataKey="bengaluru" fill="#78f7d4" radius={[5, 5, 0, 0]} />
                <Bar dataKey="pune" fill="#66e3ff" radius={[5, 5, 0, 0]} />
                <Bar dataKey="hyderabad" fill="#a58cff" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ChartSkeleton />
          )}
        </div>
      </GlassCard>

      <div className="grid gap-5">
        <GlassCard className="p-6">
          <div className="relative z-10 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Lifestyle score</p>
            <MapPinned aria-hidden="true" className="size-5 text-signal" />
          </div>
          <div className="relative z-10 mt-6 grid gap-4">
            {lifestyleSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-white/70">
                      <Icon aria-hidden="true" className="size-4 text-volt" />
                      {signal.label}
                    </span>
                    <span className="font-semibold text-white">{signal.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-signal to-volt" style={{ width: `${signal.value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="relative z-10 text-xs uppercase tracking-[0.25em] text-white/40">
            Commute analysis
          </p>
          <div className="relative z-10 mt-5 space-y-3">
            {[
              ["Tech park", "18 min", "Low commute friction"],
              ["Metro station", "7 min", "Walkable plus shuttle"],
              ["Airport", "32 min", "Expressway assisted"],
            ].map(([place, time, note]) => (
              <div key={place} className="flex items-center justify-between rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
                <div>
                  <p className="font-semibold text-white">{place}</p>
                  <p className="mt-1 text-xs text-white/45">{note}</p>
                </div>
                <p className="font-display text-xl font-semibold text-volt">{time}</p>
              </div>
            ))}
          </div>
          <div className="relative z-10 mt-5 flex flex-wrap gap-3">
            <Link
              href="/districts/bengaluru"
              className="inline-flex rounded-full border border-volt/20 bg-volt/10 px-4 py-2 text-sm font-semibold text-volt transition hover:bg-volt/[0.16]"
            >
              Open Bengaluru analysis
            </Link>
            <Link
              href="/compare"
              className="inline-flex rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-signal/30 hover:text-signal"
            >
              Compare home markets
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-full items-end gap-2 rounded-[8px] border border-white/10 bg-black/20 p-4">
      {[34, 46, 58, 42, 72, 64, 86, 78].map((height, index) => (
        <span
          key={height + index}
          className="flex-1 rounded-t-[4px] bg-white/10"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}
