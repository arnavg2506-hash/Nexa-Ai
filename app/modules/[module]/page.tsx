import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Map } from "lucide-react";
import { IntelligenceModules } from "@/components/sections/intelligence-modules";
import { platformModules, type ModuleKey } from "@/lib/platform-data";
import { GlassCard } from "@/components/ui/glass-card";
import { NexaLogo } from "@/components/brand/nexa-logo";

type ModulePageProps = {
  params: Promise<{ module: string }>;
};

const moduleCopy = {
  land: {
    title: "Land & Plots Intelligence Workspace",
    description:
      "A dedicated operating window for land acquisition, industrial corridors, farmland, future hotspots, legal complexity and infrastructure-led appreciation.",
    nextLabel: "Open homes workspace",
    nextHref: "/modules/homes",
    frameTitle: "Acquisition committee view",
    signals: [
      ["Mandate", "Industrial and plotted land"],
      ["Hold horizon", "7-10 years"],
      ["Evidence gate", "Title, access and funded infrastructure"],
      ["Primary downside", "Execution timing and exit liquidity"],
    ],
  },
  homes: {
    title: "Homes & Apartments Intelligence Workspace",
    description:
      "A dedicated operating window for home buyers, families and rental investors comparing builders, lifestyle scores, rental yield, commute and appreciation.",
    nextLabel: "Open land workspace",
    nextHref: "/modules/land",
    frameTitle: "Buyer committee view",
    signals: [
      ["Mandate", "Primary home and rental assets"],
      ["Hold horizon", "5-7 years"],
      ["Evidence gate", "Approvals, delivery and resale depth"],
      ["Primary downside", "Builder risk and commute friction"],
    ],
  },
} satisfies Record<
  ModuleKey,
  {
    title: string;
    description: string;
    nextLabel: string;
    nextHref: string;
    frameTitle: string;
    signals: string[][];
  }
>;

export function generateStaticParams() {
  return platformModules.map((module) => ({ module: module.key }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { module } = await params;

  if (module !== "land" && module !== "homes") {
    return {};
  }

  return {
    title: moduleCopy[module].title,
    description: moduleCopy[module].description,
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params;

  if (module !== "land" && module !== "homes") {
    notFound();
  }

  const selected = module as ModuleKey;
  const copy = moduleCopy[selected];

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">
      <div className="px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-[8px] border border-white/10 bg-graphite-950/64 px-4 py-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/#modules"
            className="inline-flex items-center gap-3 text-sm font-semibold text-white/75 transition hover:text-white"
          >
            <NexaLogo compact />
            <ArrowLeft aria-hidden="true" className="size-4" />
            All workspaces
          </Link>
          <nav aria-label="Workspace navigation" className="flex flex-wrap gap-3 text-sm">
            <Link className="font-semibold text-volt transition hover:text-white" href="/map">
              Map
            </Link>
            <Link className="font-semibold text-volt transition hover:text-white" href="/compare">
              Compare
            </Link>
            <Link className="font-semibold text-volt transition hover:text-white" href="/dashboard">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-volt">
              Dedicated workspace
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-tight text-white lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{copy.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={copy.nextHref}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-platinum px-5 text-sm font-semibold text-graphite-950 transition hover:bg-white"
              >
                {copy.nextLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/map"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-white transition hover:border-volt/45 hover:bg-white/[0.09]"
              >
                Open map intelligence
                <Map aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <GlassCard className="p-6">
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-volt">
                Illustrative decision frame
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                {copy.frameTitle}
              </h2>
              <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {copy.signals.map(([label, value]) => (
                  <div key={label} className="grid gap-2 py-4 sm:grid-cols-[0.42fr_0.58fr]">
                    <dt className="text-sm text-white/45">{label}</dt>
                    <dd className="text-sm font-semibold leading-6 text-white/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-6 text-white/48">
                Scenario values are demonstrative until licensed live evidence is connected.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      <IntelligenceModules selected={selected} />
    </main>
  );
}
