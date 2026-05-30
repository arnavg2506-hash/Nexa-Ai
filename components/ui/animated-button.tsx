"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function AnimatedButton({
  children,
  href = "#demo",
  variant = "primary",
  className,
}: AnimatedButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-volt/80 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950",
        variant === "primary"
          ? "bg-platinum text-graphite-950 shadow-[0_0_50px_rgba(120,247,212,0.22)] hover:bg-white"
          : "border border-white/12 bg-white/[0.055] text-white hover:border-volt/45 hover:bg-white/[0.09]",
        className,
      )}
    >
      {variant === "primary" ? (
        <Sparkles aria-hidden="true" className="size-4" />
      ) : null}
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </motion.a>
  );
}
