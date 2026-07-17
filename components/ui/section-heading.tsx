"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={false}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-volt">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-platinum sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">{copy}</p>
    </motion.div>
  );
}
