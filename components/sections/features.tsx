"use client";

import { motion } from "framer-motion";
import { HandCoins, MapPinned, Radar, Search, ShieldAlert, TrendingUp } from "lucide-react";
import { features } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap = {
  search: Search,
  radar: Radar,
  trend: TrendingUp,
  shield: ShieldAlert,
  deal: HandCoins,
  map: MapPinned,
};

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-volt/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Autonomous acquisition agents"
          title="Six specialist AIs working before the market notices."
          copy="Each mandate is decomposed into live research, market logic, risk inference, and negotiation intelligence so buyers see the opportunity before it becomes consensus."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.07, ease: "easeOut" }}
              >
                <GlassCard className="group h-full p-6 transition duration-500 hover:-translate-y-1 hover:border-volt/35 hover:bg-white/[0.075]">
                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-[8px] border border-white/10 bg-white/[0.06] text-volt transition group-hover:border-volt/35 group-hover:bg-volt/10">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/50">
                        {feature.signal}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-4 min-h-24 text-sm leading-7 text-white/60">
                      {feature.description}
                    </p>

                    <div className="mt-7 h-px bg-gradient-to-r from-volt/55 via-signal/20 to-transparent" />
                    <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/40">
                      <span>Agent active</span>
                      <span className="text-volt">Live</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
