"use client";

import { motion } from "framer-motion";
import { Check, Crown, Shield } from "lucide-react";
import { platformPlans } from "@/lib/platform-data";
import { AnimatedButton } from "@/components/ui/animated-button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function PlatformPricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-signal/10 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Premium subscription model"
          title="A serious intelligence stack for every real estate decision maker."
          copy="Explorer, Investor, Professional, and Enterprise tiers align with the maturity of your real estate acquisition workflow."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {platformPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              <GlassCard active={plan.highlighted} className="h-full p-5">
                <div className="relative z-10 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-[8px] border border-white/10 bg-white/[0.055] text-volt">
                    {plan.highlighted ? (
                      <Crown aria-hidden="true" className="size-5" />
                    ) : (
                      <Shield aria-hidden="true" className="size-5" />
                    )}
                  </span>
                  {plan.highlighted ? (
                    <span className="rounded-full border border-volt/25 bg-volt/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-volt">
                      Best value
                    </span>
                  ) : null}
                </div>

                <h3 className="relative z-10 mt-7 font-display text-2xl font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="relative z-10 mt-3 min-h-16 text-sm leading-6 text-white/60">
                  {plan.description}
                </p>
                <div className="relative z-10 mt-6">
                  <p className="font-display text-4xl font-semibold text-white">{plan.price}</p>
                  {plan.price !== "Custom" ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">per month</p>
                  ) : (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">for teams</p>
                  )}
                </div>

                <div className="relative z-10 mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-white/70">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-volt" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton
                  href="#private-briefing"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="relative z-10 mt-8 w-full"
                >
                  Request private briefing
                </AnimatedButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
