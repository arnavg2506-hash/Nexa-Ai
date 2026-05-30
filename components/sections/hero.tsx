"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, Brain, CheckCircle2, Command, Eye, Layers3, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Counter } from "@/components/ui/counter";
import { GlassCard } from "@/components/ui/glass-card";

const searchSignals = [
  "Scanning 14,280 property sources",
  "Modeling coastal rental yield",
  "Checking builder delivery history",
  "Detecting hidden resale pressure",
];

const findings = [
  { label: "Property matches", value: "27", tone: "text-signal" },
  { label: "ROI forecast", value: "31%", tone: "text-volt" },
  { label: "Growth prediction", value: "High", tone: "text-iris" },
  { label: "Hidden opportunities", value: "4", tone: "text-ember" },
];

export function Hero() {
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSignal((current) => (current + 1) % searchSignals.length);
    }, 1900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden px-4 pb-12 pt-5 sm:px-6 lg:px-8">
      <Image
        src="/assets/nexa-villa-hero.png"
        alt="Futuristic luxury coastal villa with AI property analysis overlays"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover opacity-[0.58]"
      />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_18%,rgba(102,227,255,0.24),transparent_31%),linear-gradient(90deg,#030406_0%,rgba(3,4,6,0.9)_28%,rgba(3,4,6,0.62)_58%,rgba(3,4,6,0.88)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:96px_96px] opacity-30" />
      <div className="absolute left-1/2 top-0 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-signal/10 blur-3xl" />

      <header className="mx-auto flex max-w-7xl items-center justify-between rounded-[8px] border border-white/10 bg-graphite-950/55 px-4 py-3 shadow-line backdrop-blur-xl">
        <a href="#" className="flex items-center gap-3" aria-label="NEXA Estate AI home">
          <span className="grid size-9 place-items-center rounded-[8px] border border-volt/30 bg-volt/10 text-volt">
            <Command aria-hidden="true" className="size-4" />
          </span>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white">
            NEXA
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          <a className="transition hover:text-white" href="#features">Agents</a>
          <a className="transition hover:text-white" href="#map">Hotspots</a>
          <a className="transition hover:text-white" href="#dashboard">Terminal</a>
          <a className="transition hover:text-white" href="#pricing">Pricing</a>
        </nav>

        <a
          href="#pricing"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 text-xs font-semibold text-white transition hover:border-volt/40 hover:bg-white/[0.09]"
        >
          <LockKeyhole aria-hidden="true" className="size-3.5" />
          Private Beta
        </a>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-10 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-volt/25 bg-volt/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-volt">
            <span className="size-1.5 rounded-full bg-volt shadow-[0_0_18px_rgba(120,247,212,0.95)]" />
            AI acquisition engine
          </div>

          <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Stop Searching Properties. Let AI Find Them.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            The world&apos;s first AI-powered real estate acquisition engine.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <AnimatedButton href="#demo">Launch AI search</AnimatedButton>
            <AnimatedButton href="#dashboard" variant="secondary">
              View intelligence terminal
            </AnimatedButton>
          </div>

          <div className="mt-10 hidden max-w-2xl grid-cols-3 gap-3 2xl:grid">
            <GlassCard className="p-4">
              <Counter to={14000} suffix="+" className="font-display text-2xl font-semibold text-white" />
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">Sources</p>
            </GlassCard>
            <GlassCard className="p-4">
              <Counter to={92} suffix="%" className="font-display text-2xl font-semibold text-white" />
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">Risk depth</p>
            </GlassCard>
            <GlassCard className="p-4">
              <Counter to={48} prefix="INR " suffix="L" className="font-display text-2xl font-semibold text-white" />
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">Avg saved</p>
            </GlassCard>
          </div>
        </motion.div>

        <motion.div
          id="demo"
          initial={{ opacity: 0, x: 36, rotateX: 10 }}
          animate={{ opacity: 1, x: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative [perspective:1600px]"
        >
          <div className="absolute -left-8 top-12 hidden h-36 w-36 rounded-full border border-signal/20 bg-signal/10 blur-2xl lg:block" />
          <GlassCard className="relative p-4 sm:p-5 lg:[transform:rotateY(-7deg)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/70 to-transparent" />
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-white/40">NEXA Agent Console</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">Mandate #GOA-2030-77</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-volt/20 bg-volt/10 px-3 py-1.5 text-xs text-volt">
                <Activity aria-hidden="true" className="size-3.5 animate-pulse" />
                Live
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[0.96fr_1.04fr]">
              <div className="space-y-4">
                <div className="rounded-[8px] border border-white/10 bg-black/[0.26] p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                      <Eye aria-hidden="true" className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">User</p>
                      <p className="mt-2 text-sm leading-6 text-white/85">
                        I want a luxury villa near Goa with investment potential.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-volt/20 bg-volt/[0.06] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-volt/12 text-volt">
                      <Brain aria-hidden="true" className="size-4" />
                    </div>
                    <motion.p
                      key={signal}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-volt"
                    >
                      {searchSignals[signal]}
                    </motion.p>
                  </div>
                  <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-volt via-signal to-iris"
                      initial={{ width: "12%" }}
                      animate={{ width: `${34 + signal * 18}%` }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {findings.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + index * 0.12 }}
                      className="rounded-[8px] border border-white/10 bg-white/[0.045] p-3"
                    >
                      <p className={`font-display text-2xl font-semibold ${item.tone}`}>
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-white/50">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 bg-graphite-950/80 p-4">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(102,227,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(102,227,255,0.07)_1px,transparent_1px)] bg-[size:34px_34px] opacity-70" />
                <div className="absolute inset-x-4 top-0 h-28 animate-scan-line bg-gradient-to-b from-transparent via-volt/20 to-transparent" />
                <div className="relative flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/40">AI dashboard preview</p>
                  <Layers3 aria-hidden="true" className="size-4 text-signal" />
                </div>
                <div className="relative mt-6 grid gap-3">
                  {["Coastal scarcity", "Rental demand", "Builder trust", "Infra catalyst"].map(
                    (label, index) => (
                      <div key={label} className="flex items-center gap-3">
                        <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-volt" />
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-signal via-volt to-iris"
                            initial={{ width: 0 }}
                            animate={{ width: `${72 + index * 5}%` }}
                            transition={{ duration: 1, delay: 0.65 + index * 0.15 }}
                          />
                        </div>
                        <span className="w-10 text-right text-xs text-white/50">
                          {72 + index * 5}
                        </span>
                      </div>
                    ),
                  )}
                </div>

                <div className="relative mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-[8px] border border-signal/20 bg-signal/10 p-4">
                    <p className="text-xs text-white/45">Projected value</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-white">
                      INR 18.4 Cr
                    </p>
                  </div>
                  <div className="rounded-[8px] border border-volt/20 bg-volt/10 p-4">
                    <p className="text-xs text-white/45">Hold period</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-white">5 yrs</p>
                  </div>
                </div>

                <div className="relative mt-8 hidden h-28 rounded-[8px] border border-white/10 bg-black/20 p-3 2xl:block">
                  <div className="flex h-full items-end gap-2">
                    {[42, 56, 48, 68, 77, 71, 88, 96].map((height, index) => (
                      <motion.span
                        key={height + index}
                        className="flex-1 rounded-t-[4px] bg-gradient-to-t from-signal/20 to-volt"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.9, delay: 0.85 + index * 0.08 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <a
        href="#features"
        aria-label="Preview AI acquisition agents"
        className="absolute left-4 right-4 top-[calc(100vh-3.9rem)] z-20 mx-auto flex max-w-3xl items-center justify-center gap-2 rounded-full border border-white/10 bg-graphite-950/62 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 shadow-line backdrop-blur-xl transition hover:border-volt/35 hover:text-white"
      >
        <span className="hidden text-volt sm:inline">Next</span>
        <span>AI Property Hunter</span>
        <span className="text-white/20">/</span>
        <span>Hidden Deal Finder</span>
        <span className="hidden text-white/20 sm:inline">/</span>
        <span className="hidden sm:inline">Price Intelligence</span>
      </a>
    </section>
  );
}
