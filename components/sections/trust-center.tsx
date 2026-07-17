import { ArrowUpRight, Building2, DatabaseZap, FileSearch, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DataDisclosure } from "@/components/ui/data-disclosure";
import { SectionHeading } from "@/components/ui/section-heading";

const evidenceLayers = [
  {
    icon: FileSearch,
    title: "Parcel and project diligence",
    copy: "Title chain, encumbrance, approvals, litigation and delivery evidence belong ahead of appreciation narratives.",
    status: "Verify before capital",
  },
  {
    icon: Building2,
    title: "Infrastructure maturity",
    copy: "NEXA separates announced, approved, funded, under-construction and operational infrastructure signals.",
    status: "Stage-weighted",
  },
  {
    icon: DatabaseZap,
    title: "Market depth",
    copy: "Registrations, absorption, rental demand, resale liquidity and employment access should move together.",
    status: "Multi-signal",
  },
  {
    icon: Scale,
    title: "Decision confidence",
    copy: "Every recommendation should expose assumptions, unknowns and downside conditions instead of hiding them.",
    status: "Explainable",
  },
];

export function TrustCenter() {
  return (
    <section id="trust" className="relative overflow-hidden border-y border-white/10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust and methodology"
          title="Evidence before confidence. Unknowns stay visible."
          copy="The strongest real estate product is not the one that predicts everything. It is the one that makes evidence, uncertainty and decision risk impossible to miss."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {evidenceLayers.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="bg-graphite-950 p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-[8px] border border-volt/20 bg-volt/10 text-volt">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-volt">{item.status}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{item.copy}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <DataDisclosure />
          <Link
            href="/map"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-white transition hover:border-volt/40 hover:text-volt"
          >
            Inspect the evidence map
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/40">
          <ShieldCheck aria-hidden="true" className="size-4 text-volt" />
          Production launch requires licensed datasets, source timestamps and parcel-level verification.
        </p>
      </div>
    </section>
  );
}
