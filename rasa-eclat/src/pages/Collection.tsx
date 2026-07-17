import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

const filters = ["all", "oud", "floral", "amber"] as const;

export default function Collection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const addItem = useCartStore((state) => state.addItem);
  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((product) => product.tags.includes(filter))),
    [filter]
  );

  return (
    <div className="min-h-screen bg-obsidian pt-[72px]">
      <section className="flex min-h-[40vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-[clamp(54px,8vw,88px)] font-light text-ivory">THE COLLECTION</h1>
        <p className="mt-4 font-body text-base font-light text-ivory-dim">Three signatures. One house.</p>
      </section>

      <div className="sticky top-[72px] z-30 border-y border-copper/15 bg-obsidian/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] justify-center gap-3 sm:gap-8">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`relative px-2 py-2 font-body text-[11px] uppercase tracking-[0.16em] transition ${
                filter === item ? "text-copper" : "text-ivory-dim hover:text-copper"
              }`}
            >
              {item}
              {filter === item ? <motion.span layoutId="filter" className="absolute bottom-0 left-0 h-px w-full bg-copper" /> : null}
            </button>
          ))}
        </div>
      </div>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <motion.div layout className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-2">
          {filtered.map((product) => (
            <motion.article
              layout
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="group overflow-hidden border border-copper/15 bg-smoke"
            >
              <Link to={`/collection/${product.id}`} className="block">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-vessel-glow" data-cursor="image">
                  <div className="vessel-visual scale-90 transition duration-500 group-hover:scale-95 group-hover:opacity-0" />
                  <div className="vessel-visual absolute scale-[0.82] rotate-6 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-obsidian px-6 py-4 text-center font-body text-[12px] uppercase tracking-[0.16em] text-ivory transition duration-300 group-hover:translate-y-0">
                    View Details
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <p className="font-body text-[10px] uppercase tracking-[0.16em] text-copper">No. {product.number}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-[28px] text-ivory">{product.name}</h2>
                    <p className="mt-2 font-body text-[13px] text-ivory-dim">{product.notes.top.concat(product.notes.heart, product.notes.base).slice(0, 4).join(" · ")}</p>
                  </div>
                  <p className="font-body text-lg text-copper">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
                <Button className="mt-6 w-full translate-y-1 opacity-90 transition group-hover:translate-y-0 group-hover:opacity-100" onClick={() => addItem(product.id)}>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
