import { motion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ParticleField } from "@/components/three/ParticleField";

export function Hero() {
  const line: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({ y: 0, opacity: 1, transition: { delay: 0.9 + i * 0.18, duration: 0.8, ease: "easeOut" } })
  };

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-obsidian px-5 text-center">
      <ParticleField />
      <div className="relative z-10 mx-auto max-w-5xl pt-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="font-body text-[11px] font-light uppercase tracking-[0.2em] text-copper"
        >
          Lucknow · India
        </motion.p>
        <h1 className="mt-8 overflow-hidden font-display text-hero-display font-light text-ivory">
          {["THE ESSENCE", "OF EVERY", "DRIVE."].map((item, index) => (
            <span key={item} className="block overflow-hidden">
              <motion.span
                className={`block ${index === 2 ? "text-copper" : ""}`}
                variants={line}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {item}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mx-auto mt-8 max-w-[420px] font-body text-[17px] font-light leading-8 text-ivory-dim"
        >
          India's first design-led automotive fragrance house. Crafted from the soul of Kannauj.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <ButtonLink to="/collection" className="w-full sm:w-auto">
            Explore Collection
          </ButtonLink>
          <ButtonLink to="/story" variant="secondary" className="w-full sm:w-auto">
            Our Story
          </ButtonLink>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-ivory-dim">Scroll</p>
        <span className="mx-auto mt-3 block h-12 w-px origin-top bg-copper animate-line-drop" />
      </motion.div>
    </section>
  );
}
