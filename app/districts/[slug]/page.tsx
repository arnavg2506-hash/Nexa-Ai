import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Activity, ArrowLeft, Building2, FileText, ShieldAlert, TrendingUp } from "lucide-react";
import { districts, getDistrictBySlug, slugify } from "@/lib/platform-data";
import { GlassCard } from "@/components/ui/glass-card";
import { NexaLogo } from "@/components/brand/nexa-logo";
import { DataDisclosure } from "@/components/ui/data-disclosure";

type DistrictPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return districts.map((district) => ({ slug: slugify(district.name) }));
}

export async function generateMetadata({ params }: DistrictPageProps): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    return {};
  }

  return {
    title: `${district.name} District Intelligence`,
    description: `${district.name} real estate intelligence: population trends, infrastructure projects, land rates, flat rates, growth forecasts, demand and risk indicators.`,
  };
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const { slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_0%,rgba(120,247,212,0.12),transparent_32rem),radial-gradient(circle_at_80%_20%,rgba(102,227,255,0.12),transparent_28rem)]" />
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between rounded-[8px] border border-white/10 bg-graphite-950/64 px-4 py-3 backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-white">
            <NexaLogo compact />
            <ArrowLeft aria-hidden="true" className="size-4" />
            NEXA AI
          </Link>
          <Link
            href="/compare"
            className="rounded-full border border-volt/25 bg-volt/10 px-4 py-2 text-sm font-semibold text-volt transition hover:bg-volt/[0.16]"
          >
            Compare markets
          </Link>
        </header>

        <section className="grid gap-8 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-volt">
              District intelligence page
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-white lg:text-7xl">
              {district.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/65">{district.report}</p>

            <div className="mt-6">
              <DataDisclosure compact />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {district.infrastructure.map((project) => (
                <span
                  key={project}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/65"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          <GlassCard className="p-6">
            <div className="relative z-10 grid gap-4 sm:grid-cols-2">
              <Metric icon={Activity} label="Population trend" value={district.populationTrend} />
              <Metric icon={TrendingUp} label="Growth forecast" value={district.growthForecast} />
              <Metric icon={FileText} label="Land rates" value={district.landRate} />
              <Metric icon={Building2} label="Flat rates" value={district.flatRate} />
            </div>
            <div className="relative z-10 mt-5 rounded-[8px] border border-volt/20 bg-volt/10 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-volt">NEXA score</p>
              <p className="mt-3 font-display text-7xl font-semibold text-white">{district.score}</p>
              <p className="mt-2 text-sm text-white/60">
                {district.opportunity} opportunity / {district.demandForecast}
              </p>
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-5 pb-20 lg:grid-cols-[0.76fr_1.24fr]">
          <GlassCard className="p-6">
            <div className="relative z-10 flex items-center gap-3">
              <ShieldAlert aria-hidden="true" className="size-5 text-ember" />
              <h2 className="font-display text-2xl font-semibold text-white">Risk indicators</h2>
            </div>
            <p className="relative z-10 mt-5 text-base leading-8 text-white/68">{district.risk}</p>
          </GlassCard>

          <GlassCard className="p-6">
            <p className="relative z-10 text-xs uppercase tracking-[0.24em] text-signal">
              AI-written investment report
            </p>
            <div className="relative z-10 mt-5 grid gap-4 text-sm leading-7 text-white/70 md:grid-cols-3">
              <p>
                <span className="font-semibold text-white">Land thesis:</span> prioritize parcels
                near verified infrastructure triggers and avoid speculative fringe pricing.
              </p>
              <p>
                <span className="font-semibold text-white">Homes thesis:</span> filter by builder
                trust, commute depth, rental demand and resale liquidity.
              </p>
              <p>
                <span className="font-semibold text-white">Action:</span> compare adjacent
                micro-markets before committing capital, then run title and risk diligence.
              </p>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
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
    <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
      <Icon aria-hidden="true" className="size-4 text-volt" />
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/40">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
