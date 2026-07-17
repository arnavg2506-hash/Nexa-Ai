"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BrainCircuit, LocateFixed, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { searchPrompts } from "@/lib/platform-data";
import { NexaLogo } from "@/components/brand/nexa-logo";
import { GlassCard } from "@/components/ui/glass-card";

export function PlatformHero() {
  const [prompt, setPrompt] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPrompt((current) => (current + 1) % searchPrompts.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  function handleAnalyze() {
    window.dispatchEvent(
      new CustomEvent("nexa-analyze-prompt", {
        detail: { prompt: searchPrompts[prompt] },
      }),
    );
    window.location.hash = "copilot";
  }

  function handleChooseMode() {
    const modules = document.getElementById("modules");
    window.history.replaceState(null, "", "#modules");
    modules?.scrollIntoView({ behavior: "smooth", block: "start" });
    const firstWorkspace = modules?.querySelector("a");
    window.setTimeout(() => {
      if (firstWorkspace instanceof HTMLElement) {
        firstWorkspace.focus({ preventScroll: true });
      }
    }, 550);
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden px-4 pb-20 pt-5 sm:px-6 lg:px-8">
      <Image
        src="/assets/nexa-villa-hero.png"
        alt="Futuristic real estate intelligence command center over a luxury property"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover opacity-[0.46]"
      />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_68%_26%,rgba(102,227,255,0.26),transparent_28%),radial-gradient(circle_at_36%_72%,rgba(120,247,212,0.14),transparent_28%),linear-gradient(90deg,#030406_0%,rgba(3,4,6,0.88)_40%,rgba(3,4,6,0.7)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:88px_88px] opacity-35" />

      <header className="mx-auto flex max-w-7xl items-center justify-between rounded-[8px] border border-white/10 bg-graphite-950/58 px-4 py-3 shadow-line backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3" aria-label="NEXA AI home">
          <NexaLogo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          <a className="transition hover:text-white" href="#modules">Modules</a>
          <Link className="transition hover:text-white" href="/map">Map</Link>
          <a className="transition hover:text-white" href="#trust">Trust</a>
          <a className="transition hover:text-white" href="#districts">Districts</a>
          <Link className="transition hover:text-white" href="/compare">Compare</Link>
          <Link className="transition hover:text-white" href="/dashboard">Investor OS</Link>
          <a className="transition hover:text-white" href="#private-briefing">Contact</a>
        </nav>

        <a
          href="#copilot"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 text-xs font-semibold text-white transition hover:border-volt/40 hover:bg-white/[0.09]"
        >
          <Sparkles aria-hidden="true" className="size-3.5 text-volt" />
          AI Copilot
        </a>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-10 pt-16 lg:grid-cols-[1fr_0.94fr] lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex w-fit max-w-full items-start gap-2 rounded-full border border-volt/25 bg-volt/10 px-3 py-2 text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-volt sm:inline-flex sm:items-center sm:text-xs sm:tracking-[0.26em]">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt shadow-[0_0_18px_rgba(120,247,212,0.95)] sm:mt-0" />
            <span>Future operating system for real estate decisions</span>
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Stop Searching. Start Knowing.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
            AI-powered intelligence for land, plots, flats, villas and real estate investments.
          </p>

          <GlassCard className="mt-9 max-w-3xl p-3">
            <div className="relative z-10 grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 sm:flex sm:flex-row">
              <div className="grid size-12 shrink-0 place-items-center rounded-[8px] border border-volt/25 bg-volt/10 text-volt">
                <Search aria-hidden="true" className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Ask NEXA</p>
                <motion.p
                  key={prompt}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 min-h-12 break-words text-sm leading-6 text-white sm:min-h-0 sm:text-base"
                >
                  {searchPrompts[prompt]}
                </motion.p>
              </div>
              <button
                type="button"
                onClick={handleAnalyze}
                className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-platinum px-4 text-sm font-semibold text-graphite-950 transition hover:bg-white sm:col-auto"
              >
                <BrainCircuit aria-hidden="true" className="size-4" />
                Analyze
              </button>
            </div>
          </GlassCard>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleChooseMode}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-platinum px-5 text-sm font-semibold text-graphite-950 shadow-[0_0_50px_rgba(120,247,212,0.22)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-volt/80 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
            >
              <Sparkles aria-hidden="true" className="size-4" />
              <span>Choose intelligence mode</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <Link
              href="/map"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-white transition hover:border-volt/45 hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-volt/80 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
            >
              Open India map
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34, rotateX: 9 }}
          animate={{ opacity: 1, x: 0, rotateX: 0 }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative [perspective:1600px]"
        >
          <GlassCard className="p-5 lg:[transform:rotateY(-7deg)]">
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-white/40">
                    Intelligence grid
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                    India opportunity scan
                  </h2>
                </div>
                <LocateFixed aria-hidden="true" className="size-5 text-signal" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["India corridor score", "92", "DMIC + VCIC/OEC mesh"],
                  ["Node trust", "A+", "Funded infra and demand"],
                  ["Rental yield", "5.1%", "Bengaluru and Pune depth"],
                  ["Infra catalyst", "High", "Freight, ports and airports"],
                ].map(([label, value, detail]) => (
                  <div key={label} className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/40">{label}</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm text-white/55">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-36 overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(rgba(102,227,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(102,227,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px] p-4">
                <div className="flex h-full items-end gap-2">
                  {[36, 48, 42, 64, 58, 74, 83, 78, 91, 96].map((height, index) => (
                    <motion.span
                      key={height + index}
                      className="flex-1 rounded-t-[4px] bg-gradient-to-t from-signal/20 via-signal/60 to-volt"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 0.35 + index * 0.06 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <a
        href="#modules"
        aria-label="Jump to workspace options for land, homes, and maps"
        className="relative z-20 mx-auto mt-10 flex max-w-4xl items-center justify-center gap-2 rounded-full border border-white/10 bg-graphite-950/64 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 shadow-line backdrop-blur-xl transition hover:border-volt/35 hover:text-white"
      >
        <span className="text-volt">Enter</span>
        <span>Land & plots</span>
        <span className="text-white/20">/</span>
        <span>Homes & apartments</span>
        <span className="hidden text-white/20 sm:inline">/</span>
        <span className="hidden sm:inline">India intelligence map</span>
      </a>
    </section>
  );
}
