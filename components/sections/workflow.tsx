"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, CircleCheckBig } from "lucide-react";
import { workflow } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Workflow() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-iris/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Agent workflow"
          title="From wish list to acquisition brief without human busywork."
          copy="NEXA turns a single buyer mandate into a sequence of specialized AI jobs, each producing evidence that the next agent can challenge or enrich."
        />

        <div className="mt-14 hidden items-center justify-between gap-3 lg:flex">
          {workflow.map((item, index) => (
            <div key={item.step} className="flex flex-1 items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="flex-1"
              >
                <GlassCard className="h-full p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-volt">{item.step}</span>
                    {index === workflow.length - 1 ? (
                      <CircleCheckBig aria-hidden="true" className="size-4 text-volt" />
                    ) : (
                      <Bot aria-hidden="true" className="size-4 text-signal" />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{item.copy}</p>
                </GlassCard>
              </motion.div>
              {index < workflow.length - 1 ? (
                <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-white/30" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 lg:hidden">
          {workflow.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="relative pl-10"
            >
              <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-volt/60 to-transparent" />
              <span className="absolute left-0 top-4 grid size-8 place-items-center rounded-full border border-volt/30 bg-graphite-950 text-xs text-volt">
                {item.step}
              </span>
              <GlassCard className="p-5">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{item.copy}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
