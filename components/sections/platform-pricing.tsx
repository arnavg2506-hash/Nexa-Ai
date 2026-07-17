"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Check, Crown, Info, ShieldCheck, UserRound } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { platformPlans } from "@/lib/platform-data";

type BillingCycle = "monthly" | "annual";

export function PlatformPricing() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const reduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-signal/10 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Launch pricing projection"
            title="Pay for decision volume, not inflated software theatre."
            copy="The model starts free, gives active investors an affordable research tier, and reserves custom data and governance costs for professional teams."
          />

          <div aria-label="Billing cycle" className="grid w-full grid-cols-2 rounded-[8px] border border-white/12 bg-white/[0.04] p-1.5 sm:w-auto">
            <BillingButton active={billing === "monthly"} onClick={() => setBilling("monthly")} label="Monthly" />
            <BillingButton active={billing === "annual"} onClick={() => setBilling("annual")} label="Annual" badge="Save 2 months" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {platformPlans.map((plan, index) => {
            const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
            const period = billing === "annual" ? ("annualPeriod" in plan ? plan.annualPeriod : plan.period) : plan.period;
            const PlanIcon = plan.name === "Explorer" ? UserRound : plan.name === "Enterprise" ? Building2 : plan.highlighted ? Crown : ShieldCheck;

            return (
              <motion.article
                key={plan.name}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.03 }}
              >
                <GlassCard active={plan.highlighted} className="flex h-full min-h-[560px] flex-col p-5">
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className={`grid size-11 place-items-center rounded-[6px] border ${plan.highlighted ? "border-volt/35 bg-volt/10 text-volt" : "border-white/10 bg-white/[0.045] text-white/62"}`}>
                      <PlanIcon aria-hidden="true" className="size-5" />
                    </span>
                    {plan.highlighted ? (
                      <span className="rounded-full border border-volt/25 bg-volt/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-volt">
                        Best for investors
                      </span>
                    ) : null}
                  </div>

                  <div className="relative z-10 mt-7 border-b border-white/10 pb-6">
                    <h3 className="font-display text-2xl font-semibold text-white">{plan.name}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-white/58">{plan.description}</p>
                    <p className="mt-5 font-display text-4xl font-semibold text-white">{price}</p>
                    <div className="mt-2 flex min-h-6 items-center gap-2 text-xs text-white/38">
                      <span>{period}</span>
                      {billing === "annual" && "annualSaving" in plan && plan.annualSaving ? (
                        <span className="text-volt">/ {plan.annualSaving}</span>
                      ) : null}
                    </div>
                  </div>

                  <p className="relative z-10 mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-signal">{plan.usage}</p>

                  <div className="relative z-10 mt-5 grid gap-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-white/68">
                        <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-volt" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#private-briefing"
                    className={`relative z-10 mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 pt-0 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt ${
                      plan.highlighted
                        ? "bg-platinum text-graphite-950 hover:bg-white"
                        : "border border-white/12 bg-white/[0.045] text-white hover:border-volt/40 hover:text-volt"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </a>
                </GlassCard>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-white/52 md:grid-cols-[auto_1fr_auto] md:items-center">
          <Info aria-hidden="true" className="size-5 text-ember" />
          <p>
            Prices are launch projections and exclude GST. Licensed transaction datasets, state record integrations and high-volume API usage are scoped separately so consumer plans do not subsidize enterprise data costs.
          </p>
          <a href="#private-briefing" className="font-semibold text-white transition hover:text-volt">Discuss a plan</a>
        </div>
      </div>
    </section>
  );
}

function BillingButton({
  active,
  onClick,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt ${
        active ? "bg-white text-graphite-950" : "text-white/52 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      {label}
      {badge ? <span className={`hidden text-[10px] uppercase tracking-[0.12em] sm:inline ${active ? "text-graphite-700" : "text-volt"}`}>{badge}</span> : null}
    </button>
  );
}
