"use client";

import { motion } from "framer-motion";
import { Check, Crown, Shield } from "lucide-react";
import { plans } from "@/lib/data";
import { AnimatedButton } from "@/components/ui/animated-button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-signal/10 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Premium acquisition SaaS"
          title="Pick the intelligence layer that matches your mandate."
          copy="From a focused luxury purchase to an institutional acquisition desk, NEXA scales from buyer intent to portfolio intelligence."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <GlassCard active={plan.highlighted} className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-[8px] border border-white/10 bg-white/[0.055] text-volt">
                    {plan.highlighted ? (
                      <Crown aria-hidden="true" className="size-5" />
                    ) : (
                      <Shield aria-hidden="true" className="size-5" />
                    )}
                  </span>
                  {plan.highlighted ? (
                    <span className="rounded-full border border-volt/25 bg-volt/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-volt">
                      Most chosen
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-8 font-display text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-white/60">{plan.description}</p>
                <div className="mt-7 flex items-end gap-2">
                  <p className="font-display text-5xl font-semibold text-white">{plan.price}</p>
                  {plan.price !== "Custom" ? (
                    <span className="pb-2 text-sm text-white/40">/ month</span>
                  ) : null}
                </div>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-white/70">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-volt" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton
                  href="#demo"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-9 w-full"
                >
                  Request access
                </AnimatedButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
