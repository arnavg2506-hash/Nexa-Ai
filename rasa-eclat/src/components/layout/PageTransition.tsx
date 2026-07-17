import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`wipe-${location.pathname}`}
          className="pointer-events-none fixed inset-0 z-[900] bg-obsidian"
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.86, times: [0, 0.38, 0.62, 1], ease: [0.76, 0, 0.24, 1] }}
        />
      </AnimatePresence>
    </>
  );
}
