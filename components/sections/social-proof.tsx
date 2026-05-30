"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function SocialProof() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Private client signal"
          title="Built for buyers who need discretion and asymmetry."
          copy="Representative private-client narratives for high-context decision makers using NEXA as an acquisition intelligence layer."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <GlassCard className="h-full p-6">
                <Quote aria-hidden="true" className="size-8 text-volt/80" />
                <p className="mt-7 text-base leading-8 text-white/75">{testimonial.quote}</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-display text-lg font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-white/50">{testimonial.role}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-volt/80">
                    {testimonial.portfolio}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
