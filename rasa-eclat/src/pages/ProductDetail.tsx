import { useMemo, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { Minus, Plus, ShieldCheck, Sparkle, Recycle, ThermometerSun } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { productOrderLink } from "@/utils/whatsapp";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  const [angle, setAngle] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const related = useMemo(() => products.filter((item) => item.id !== id).slice(0, 2), [id]);
  if (!product) return <Navigate to="/collection" replace />;

  return (
    <div className="min-h-screen bg-obsidian pt-[72px]">
      <section className="grid gap-8 px-5 py-12 md:px-8 lg:grid-cols-[1.2fr_0.9fr] lg:py-20">
        <div>
          <motion.div
            key={angle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex aspect-square items-center justify-center overflow-hidden bg-vessel-glow"
            data-cursor="image"
          >
            <div className={`vessel-visual scale-95 transition duration-500 hover:scale-100 ${angle === 1 ? "rotate-6" : angle === 2 ? "-rotate-6" : ""}`} />
          </motion.div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((item) => (
              <button
                key={item}
                onClick={() => setAngle(item)}
                className={`flex aspect-[1.35] items-center justify-center border bg-smoke ${angle === item ? "border-copper" : "border-copper/15"}`}
              >
                <div className={`vessel-visual scale-[0.18] ${item === 1 ? "rotate-6" : item === 2 ? "-rotate-6" : ""}`} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.14em] text-ivory-dim">
            <Link to="/collection">Collection</Link> <span className="text-copper">/</span> {product.name}
          </p>
          <p className="mt-8 font-body text-[11px] uppercase tracking-[0.16em] text-copper">No. {product.number}</p>
          <h1 className="mt-3 font-display text-[clamp(52px,7vw,76px)] font-light leading-none text-ivory">{product.name}</h1>
          <p className="mt-4 font-body text-[13px] uppercase tracking-[0.1em] text-ivory-dim">{product.family}</p>
          <div className="my-8 h-px bg-copper/25" />
          <div>
            <p className="font-display text-[28px] text-ivory">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="mt-1 font-body text-[13px] text-copper">Refills from ₹{product.refillPrice}</p>
          </div>
          <div className="my-8 space-y-4 border-y border-copper/20 py-6">
            {[
              ["TOP NOTES", product.notes.top],
              ["HEART NOTES", product.notes.heart],
              ["BASE NOTES", product.notes.base]
            ].map(([label, notes]) => (
              <div key={label as string} className="grid grid-cols-[120px_1fr] border-b border-copper/10 pb-4 last:border-0 last:pb-0">
                <p className="font-body text-[10px] uppercase tracking-[0.14em] text-ivory-dim">{label as string}</p>
                <p className="font-display text-base text-ivory">{(notes as string[]).join(" · ")}</p>
              </div>
            ))}
          </div>
          <div className="flex border border-copper/35 w-fit">
            <button className="p-4 text-copper" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-12 px-4 py-4 text-center font-body text-sm text-ivory">{quantity}</span>
            <button className="p-4 text-copper" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            <Button onClick={() => addItem(product.id, quantity)} className="w-full py-[18px]">
              Add to Cart
            </Button>
            <ButtonLink external href={productOrderLink(product, quantity)} target="_blank" rel="noreferrer" variant="secondary" className="w-full py-[18px]">
              Order via WhatsApp
            </ButtonLink>
          </div>
          <div className="my-8 h-px bg-copper/25" />
          <Accordion
            items={[
              { title: "The Fragrance", content: product.description.map((paragraph) => <p key={paragraph} className="mb-4 last:mb-0">{paragraph}</p>) },
              { title: "The Vessel", content: "Hand-weighted metal, angular geometry, and a replaceable scent cartridge create a display object that belongs in premium cabins." },
              { title: "The Ingredients", content: "Each formula balances Indian fragrance memory with modern IFRA-minded perfumery, tuned for heat, humidity, and enclosed cabin diffusion." }
            ]}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {[["Phthalate Free", ShieldCheck], ["IFRA Compliant", Sparkle], ["Refillable", Recycle], ["India Formulated", ThermometerSun]].map(([label, Icon]) => {
              const BadgeIcon = Icon as typeof ShieldCheck;
              return (
                <Badge key={label as string}>
                  <BadgeIcon className="mr-2 h-3.5 w-3.5" />
                  {label as string}
                </Badge>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-5 pb-24 md:px-8">
        <h2 className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">You might also explore</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {related.map((item) => (
            <Link key={item.id} to={`/collection/${item.id}`} className="grid grid-cols-[140px_1fr] border border-copper/15 bg-smoke">
              <div className="flex aspect-square items-center justify-center bg-vessel-glow">
                <div className="vessel-visual scale-[0.28]" />
              </div>
              <div className="p-5">
                <p className="font-body text-[10px] uppercase tracking-[0.16em] text-copper">No. {item.number}</p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{item.name}</h3>
                <p className="mt-2 font-body text-sm text-ivory-dim">{item.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
