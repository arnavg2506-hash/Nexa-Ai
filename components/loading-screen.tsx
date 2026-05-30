"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NexaLogo } from "@/components/brand/nexa-logo";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1050);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading NEXA AI"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-graphite-950"
        >
          <div className="relative grid place-items-center">
            <div aria-hidden="true" className="absolute size-48 animate-slow-spin rounded-full border border-dashed border-volt/20" />
            <div aria-hidden="true" className="absolute size-28 rounded-full border border-signal/30 shadow-[0_0_70px_rgba(102,227,255,0.24)]" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55 }}
              className="grid justify-items-center text-center"
            >
              <NexaLogo />
              <p className="mt-3 text-xs uppercase tracking-[0.32em] text-volt">
                Acquiring signals
              </p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
