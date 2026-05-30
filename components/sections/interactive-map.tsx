"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Map, RadioTower, Route, TrainFront } from "lucide-react";
import { useState } from "react";
import { hotspots } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function InteractiveMap() {
  const [active, setActive] = useState(0);
  const selected = hotspots[active];

  return (
    <section id="map" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-signal/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Predictive market cartography"
          title="A live map of where wealth, transit, and scarcity collide."
          copy="The map fuses investment hotspots, growth predictions, metro projects, coastal access, and upcoming infrastructure into one acquisition-grade signal layer."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.38fr_0.62fr]">
          <GlassCard className="relative min-h-[520px] p-4 sm:p-6">
            <div className="absolute inset-4 rounded-[8px] border border-white/10 bg-radial-grid bg-[size:34px_34px] opacity-90" />
            <div className="absolute inset-4 rounded-[8px] bg-[radial-gradient(circle_at_25%_55%,rgba(120,247,212,0.2),transparent_18%),radial-gradient(circle_at_68%_38%,rgba(102,227,255,0.19),transparent_20%),radial-gradient(circle_at_70%_70%,rgba(165,140,255,0.17),transparent_18%)]" />
            <div className="absolute inset-10 rounded-[8px] border border-signal/10 [clip-path:polygon(20%_18%,60%_8%,82%_24%,76%_68%,59%_91%,28%_78%,12%_45%)]">
              <div className="h-full w-full bg-white/[0.035]" />
            </div>

            <motion.div
              aria-hidden="true"
              className="absolute left-[20%] top-[40%] h-px w-[48%] origin-left rotate-[-11deg] bg-gradient-to-r from-volt via-signal to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-[59%] top-[37%] h-px w-[26%] origin-left rotate-[61deg] bg-gradient-to-r from-signal via-iris to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
            />

            {hotspots.map((hotspot, index) => (
              <motion.button
                type="button"
                key={hotspot.city}
                aria-label={`Select ${hotspot.city}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="absolute z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white shadow-[0_0_36px_rgba(102,227,255,0.25)] backdrop-blur-xl transition hover:border-volt/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-volt"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                <span className="absolute size-12 animate-ping rounded-full bg-volt/20" />
                <span
                  className={`relative size-3 rounded-full ${
                    active === index ? "bg-volt" : "bg-signal"
                  } shadow-[0_0_22px_currentColor]`}
                />
              </motion.button>
            ))}

            <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Metro projects", icon: TrainFront },
                { label: "Infra triggers", icon: Route },
                { label: "AI growth bands", icon: RadioTower },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-graphite-950/70 px-3 py-3 text-xs text-white/60 backdrop-blur-xl"
                  >
                    <Icon aria-hidden="true" className="size-4 text-volt" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <div className="grid gap-5">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.26em] text-white/40">Active hotspot</p>
                <Map aria-hidden="true" className="size-5 text-signal" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.city}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28 }}
                  className="mt-8"
                >
                  <p className="font-display text-4xl font-semibold text-white">{selected.city}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.22em] text-volt">
                    {selected.tag}
                  </p>
                  <div className="mt-7 rounded-[8px] border border-volt/20 bg-volt/10 p-4">
                    <p className="text-xs text-white/50">AI growth prediction</p>
                    <p className="mt-2 font-display text-5xl font-semibold text-white">
                      {selected.growth}
                    </p>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-white/65">{selected.thesis}</p>
                </motion.div>
              </AnimatePresence>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-white/40">Market heat index</p>
              <div className="mt-6 space-y-4">
                {hotspots.map((hotspot, index) => (
                  <button
                    key={hotspot.city}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center justify-between rounded-[8px] border px-4 py-3 text-left transition ${
                      active === index
                        ? "border-volt/40 bg-volt/10 text-white"
                        : "border-white/10 bg-white/[0.035] text-white/60 hover:border-white/20"
                    }`}
                  >
                    <span className="text-sm font-medium">{hotspot.city}</span>
                    <span className="text-sm text-volt">{hotspot.growth}</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
