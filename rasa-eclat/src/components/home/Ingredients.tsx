import { motion } from "framer-motion";
import { Flame, Gem, Leaf } from "lucide-react";

const ingredients = [
  {
    icon: Leaf,
    name: "OUD",
    origin: "Assam, India",
    description:
      "Dense, shadowed, and quietly opulent. Our oud accord is tuned for cabin warmth, unfolding slowly instead of overwhelming the first minute of a drive."
  },
  {
    icon: Flame,
    name: "FRANKINCENSE",
    origin: "Somalia and India",
    description:
      "Resinous smoke with a ceremonial edge. It gives EMBER its glowing core and creates a sense of calm inside dense city traffic."
  },
  {
    icon: Gem,
    name: "AMBERGRIS",
    origin: "Marine accord",
    description:
      "A luminous ambergris-inspired accord brings diffusion and lift, helping each fragrance feel expensive without turning sweet or synthetic."
  }
];

export function Ingredients() {
  return (
    <section className="bg-obsidian px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">Ingredient Philosophy</p>
        <h2 className="mt-4 max-w-3xl font-display text-section-title font-light text-ivory">Built from materials with memory.</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ingredients.map((ingredient, index) => {
            const Icon = ingredient.icon;
            return (
              <motion.article
                key={ingredient.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.12 }}
                className="relative overflow-hidden border border-copper/15 bg-smoke p-7"
              >
                <span className="absolute right-5 top-2 font-display text-[80px] text-copper opacity-[0.08]">0{index + 1}</span>
                <Icon className="h-8 w-8 text-copper" strokeWidth={1} />
                <h3 className="mt-8 font-display text-[32px] font-light text-ivory">{ingredient.name}</h3>
                <p className="mt-2 font-body text-[10px] uppercase tracking-[0.16em] text-copper">{ingredient.origin}</p>
                <p className="mt-5 font-body text-sm font-light leading-7 text-ivory-dim">{ingredient.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
