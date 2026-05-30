"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export function Counter({ to, suffix = "", prefix = "", decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const value = useMotionValue(0);
  const output = useTransform(value, (latest) => {
    const formatted = latest.toLocaleString("en-IN", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });

    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(value, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [inView, to, value]);

  return <motion.span ref={ref} className={className}>{output}</motion.span>;
}
