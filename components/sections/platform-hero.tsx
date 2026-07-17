"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  LocateFixed,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { NexaLogo } from "@/components/brand/nexa-logo";
import { IntelligenceWindow } from "@/components/ui/intelligence-window";
import { searchPrompts } from "@/lib/platform-data";

const intelligenceLenses = [
  {
    key: "opportunity",
    label: "Opportunity",
    icon: TrendingUp,
    score: "92",
    signal: "High conviction",
    detail: "Western and southern corridor mesh",
    metricA: "+41%",
    metricALabel: "5Y model",
    metricB: "8",
    metricBLabel: "markets cleared",
    bars: [36, 44, 41, 58, 64, 61, 74, 82, 88, 94],
    tone: "text-volt",
  },
  {
    key: "risk",
    label: "Risk",
    icon: ShieldAlert,
    score: "31",
    signal: "Manageable",
    detail: "Title, water and execution gates",
    metricA: "4",
    metricALabel: "evidence gaps",
    metricB: "2",
    metricBLabel: "markets excluded",
    bars: [68, 61, 58, 52, 48, 42, 39, 34, 31, 28],
    tone: "text-ember",
  },
  {
    key: "cashflow",
    label: "Cash flow",
    icon: WalletCards,
    score: "4.9%",
    signal: "Income ready",
    detail: "Rental depth in Bengaluru and Hyderabad",
    metricA: "1.8x",
    metricALabel: "rent coverage",
    metricB: "86",
    metricBLabel: "liquidity score",
    bars: [42, 46, 51, 48, 57, 63, 68, 73, 77, 83],
    tone: "text-signal",
  },
] as const;

type LensKey = (typeof intelligenceLenses)[number]["key"];

export function PlatformHero() {
  const [mandate, setMandate] = useState(searchPrompts[0]);
  const [activeLens, setActiveLens] = useState<LensKey>("opportunity");
  const [running, setRunning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const runTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const lens = intelligenceLenses.find((item) => item.key === activeLens) ?? intelligenceLenses[0];

  useEffect(
    () => () => {
      if (runTimer.current) {
        window.clearTimeout(runTimer.current);
      }
    },
    [],
  );

  function handleAnalyze(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const prompt = mandate.trim();

    if (!prompt || running) {
      return;
    }

    setRunning(true);
    window.dispatchEvent(new CustomEvent("nexa-analyze-prompt", { detail: { prompt } }));
    runTimer.current = window.setTimeout(() => setRunning(false), 1200);
  }

  function handleChooseMode() {
    const modules = document.getElementById("modules");
    window.history.replaceState(null, "", "#modules");
    modules?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => {
      const firstControl = modules?.querySelector<HTMLElement>("button, a");
      firstControl?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 450);
  }

  function handleMobileNavigation(event: ReactMouseEvent<HTMLAnchorElement>, href: string) {
    setMobileMenuOpen(false);

    if (!href.startsWith("#") || href === "#copilot") {
      return;
    }

    event.preventDefault();
    const destination = document.querySelector<HTMLElement>(href);

    if (!destination) {
      return;
    }

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    window.setTimeout(() => {
      destination.scrollIntoView({ behavior: "auto", block: "start" });
    }, reduceMotion ? 0 : 180);
  }

  return (
    <section className="relative isolate overflow-hidden px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <Image
        src="/assets/nexa-villa-hero.png"
        alt="Real estate intelligence command center overlooking a contemporary villa"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover object-[62%_center] opacity-55"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#030406_0%,rgba(3,4,6,0.92)_38%,rgba(3,4,6,0.5)_72%,rgba(3,4,6,0.78)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-20 h-72 bg-gradient-to-t from-graphite-950 via-graphite-950/65 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:84px_84px] opacity-35" />

      <header className="relative z-40 mx-auto max-w-7xl rounded-[8px] border border-white/12 bg-[#080b0f]/82 shadow-line backdrop-blur-2xl">
        <div className="flex min-h-16 items-center justify-between gap-4 px-3 sm:px-4">
          <Link href="/" className="flex items-center gap-3" aria-label="NEXA AI home">
            <NexaLogo />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm text-white/60 lg:flex">
            <a className="transition hover:text-white" href="#modules">Workspaces</a>
            <a className="transition hover:text-white" href="#studio">Acquisition studio</a>
            <Link className="transition hover:text-white" href="/map">India map</Link>
            <Link className="transition hover:text-white" href="/compare">Compare</Link>
            <Link className="transition hover:text-white" href="/dashboard">Investor OS</Link>
            <a className="transition hover:text-white" href="#pricing">Pricing</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#copilot"
              className="hidden min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 text-xs font-semibold text-white transition hover:border-volt/40 hover:bg-white/[0.09] sm:inline-flex"
            >
              <Sparkles aria-hidden="true" className="size-3.5 text-volt" />
              AI Copilot
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="nexa-mobile-navigation"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="grid size-10 place-items-center rounded-[6px] border border-white/12 bg-white/[0.05] text-white lg:hidden"
            >
              {mobileMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen ? (
            <motion.nav
              id="nexa-mobile-navigation"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              className="grid overflow-hidden border-t border-white/10 p-2 lg:hidden"
            >
              {[
                ["Workspaces", "#modules"],
                ["Acquisition studio", "#studio"],
                ["India map", "/map"],
                ["Compare", "/compare"],
                ["Investor OS", "/dashboard"],
                ["Pricing", "#pricing"],
                ["AI Copilot", "#copilot"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={(event) => handleMobileNavigation(event, href)}
                  className="rounded-[6px] px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.055] hover:text-white"
                >
                  {label}
                </a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-10 pb-8 pt-14 lg:min-h-[690px] lg:grid-cols-[1.04fr_0.96fr] lg:pt-12">
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <div className="mb-6 flex w-fit max-w-full items-center gap-2 rounded-full border border-volt/25 bg-volt/10 px-3 py-2 text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-volt sm:text-xs sm:tracking-[0.22em]">
            <span className="size-1.5 shrink-0 rounded-full bg-volt shadow-[0_0_18px_rgba(120,247,212,0.95)]" />
            NEXA property intelligence OS
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Stop searching.<br />Start knowing.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
            One decision system for land, homes, infrastructure, risk and investment intelligence across India.
          </p>

          <form onSubmit={handleAnalyze} className="mt-8 max-w-3xl rounded-[8px] border border-white/14 bg-[#080b0f]/88 shadow-glass backdrop-blur-2xl">
            <label htmlFor="hero-mandate" className="sr-only">Describe your real estate mandate</label>
            <div className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-2 p-2 sm:grid-cols-[44px_minmax(0,1fr)_auto]">
              <span className="grid size-11 place-items-center rounded-[6px] border border-volt/25 bg-volt/10 text-volt">
                <Search aria-hidden="true" className="size-5" />
              </span>
              <input
                id="hero-mandate"
                value={mandate}
                onChange={(event) => setMandate(event.target.value)}
                maxLength={600}
                placeholder="Describe a property, budget, city or investment thesis"
                className="min-h-11 min-w-0 bg-transparent px-2 text-sm leading-6 text-white placeholder:text-white/32 focus:outline-none sm:text-base"
              />
              <button
                type="submit"
                disabled={running || !mandate.trim()}
                className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-platinum px-5 text-sm font-semibold text-graphite-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-55 sm:col-span-1"
              >
                <BrainCircuit aria-hidden="true" className={`size-4 ${running ? "animate-pulse" : ""}`} />
                {running ? "Structuring mandate" : "Run analysis"}
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-2.5">
              {searchPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setMandate(prompt)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/48 transition hover:border-signal/35 hover:text-white"
                >
                  0{index + 1} {prompt.split(".")[0]}
                </button>
              ))}
            </div>
          </form>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleChooseMode}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-platinum px-5 text-sm font-semibold text-graphite-950 shadow-[0_0_50px_rgba(120,247,212,0.18)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
            >
              Choose a workspace
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/map"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.055] px-5 text-sm font-semibold text-white transition hover:border-volt/45 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
            >
              <LocateFixed aria-hidden="true" className="size-4 text-signal" />
              Open India map
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/42">
            <span className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-volt" />33 intelligence nodes</span>
            <span className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-signal" />11 national corridor models</span>
            <span className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-ember" />Evidence gaps disclosed</span>
          </div>
        </motion.div>

        <IntelligenceWindow
          eyebrow="NEXA live model / India"
          title="Acquisition brief"
          icon={<Gauge aria-hidden="true" className="size-4" />}
          tone="cyan"
          className="lg:-rotate-1 lg:hover:rotate-0 lg:hover:scale-[1.01] lg:transition-transform lg:duration-500"
          bodyClassName="max-h-[min(620px,calc(100svh-120px))]"
        >
          <div className="grid grid-cols-3 border-b border-white/10 p-1.5">
            {intelligenceLenses.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={activeLens === item.key}
                  onClick={() => setActiveLens(item.key)}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] text-xs font-semibold transition ${
                    activeLens === item.key ? "bg-white text-graphite-950" : "text-white/48 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={lens.key}
              initial={reduceMotion ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
            >
              <div className="grid sm:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/36">Composite signal</p>
                  <div className="mt-4 flex items-end gap-3">
                    <p className={`font-display text-6xl font-semibold ${lens.tone}`}>{lens.score}</p>
                    <div className="pb-2">
                      <p className="text-sm font-semibold text-white">{lens.signal}</p>
                      <p className="mt-1 text-xs text-white/42">Illustrative model</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-white/58">{lens.detail}</p>
                </div>

                <div className="grid grid-cols-2 divide-x divide-white/10">
                  <Metric value={lens.metricA} label={lens.metricALabel} />
                  <Metric value={lens.metricB} label={lens.metricBLabel} />
                </div>
              </div>

              <div className="border-t border-white/10 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/36">Signal trajectory</p>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-volt">Model active</span>
                </div>
                <div className="mt-5 flex h-36 items-end gap-2 border-b border-l border-white/10 px-2 pt-2">
                  {lens.bars.map((height, index) => (
                    <motion.span
                      key={`${lens.key}-${index}`}
                      className={`flex-1 rounded-t-[3px] ${
                        lens.key === "risk" ? "bg-ember/70" : lens.key === "cashflow" ? "bg-signal/70" : "bg-volt/70"
                      }`}
                      initial={reduceMotion ? false : { height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : index * 0.035 }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.025]">
                {["Search 33 nodes", "Rank the evidence", "Verify before action"].map((step, index) => (
                  <div key={step} className="p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">0{index + 1}</p>
                    <p className="mt-1 text-xs text-white/58">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </IntelligenceWindow>
      </div>

      <a
        href="#modules"
        className="relative z-20 mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-[#080b0f]/78 px-4 py-3 text-xs font-semibold text-white/55 shadow-line backdrop-blur-xl transition hover:border-volt/35 hover:text-white"
      >
        <span><strong className="mr-2 text-volt">Next</strong> Choose the intelligence workspace</span>
        <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
      </a>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-h-32 flex-col justify-center p-4">
      <p className="font-display text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs leading-5 text-white/40">{label}</p>
    </div>
  );
}
