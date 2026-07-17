import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

export function CollectionPreview() {
  return (
    <section id="collection-preview" className="overflow-hidden bg-obsidian px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1320px]">
        <h2 className="text-center font-display text-section-title font-light text-ivory">THE COLLECTION</h2>
        <div className="mt-14 flex snap-x gap-5 overflow-x-auto pb-7 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.slice(0, 3).map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.12 }}
              className="min-w-[280px] snap-start border border-copper/15 bg-smoke shadow-insetline md:min-w-[340px]"
            >
              <Link to={`/collection/${product.id}`} data-cursor="image">
                <div className="flex aspect-[1/1.08] items-center justify-center bg-vessel-glow">
                  <div className="vessel-visual scale-75" />
                </div>
                <div className="p-6">
                  <p className="font-body text-[10px] uppercase tracking-[0.16em] text-copper">No. {product.number}</p>
                  <h3 className="mt-2 font-display text-[28px] font-normal text-ivory">{product.name}</h3>
                  <p className="mt-2 font-body text-[13px] text-ivory-dim">{product.notes.top.concat(product.notes.base).slice(0, 3).join(" · ")}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-body text-base text-copper">₹{product.price.toLocaleString("en-IN")}</p>
                    <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ivory-dim">Discover →</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ivory-dim">Drag to explore →</p>
      </div>
    </section>
  );
}
