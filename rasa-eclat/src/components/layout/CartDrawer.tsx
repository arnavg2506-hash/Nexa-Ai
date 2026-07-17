import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useMemo } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { cartOrderLink } from "@/utils/whatsapp";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const hydratedItems = useMemo(
    () =>
      items.flatMap((item) => {
        const product = products.find((candidate) => candidate.id === item.id);
        return product ? [{ product, quantity: item.quantity }] : [];
      }),
    [items]
  );
  const subtotal = hydratedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-[80] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.76, 0, 0.24, 1] }}
            className="fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-[440px] flex-col border-l border-copper/25 bg-obsidian"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-copper/15 px-5">
              <h2 className="font-display text-2xl text-ivory">Your Reserve</h2>
              <button onClick={closeCart} aria-label="Close cart" className="p-3 text-ivory-dim hover:text-copper">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {hydratedItems.length === 0 ? (
                <p className="font-body text-sm font-light leading-7 text-ivory-dim">
                  Your cart is empty. Explore the collection and reserve a fragrance when one feels right.
                </p>
              ) : (
                <div className="space-y-6">
                  {hydratedItems.map(({ product, quantity }) => (
                    <div key={product.id} className="border-b border-copper/15 pb-6">
                      <div className="flex justify-between gap-5">
                        <div>
                          <p className="font-body text-[10px] uppercase tracking-[0.16em] text-copper">No. {product.number}</p>
                          <h3 className="mt-1 font-display text-2xl text-ivory">{product.name}</h3>
                          <p className="mt-1 font-body text-xs text-ivory-dim">
                            {[...product.notes.top, ...product.notes.base].slice(0, 3).join(" · ")}
                          </p>
                        </div>
                        <p className="font-body text-sm text-copper">₹{product.price * quantity}</p>
                      </div>
                      <div className="mt-4 inline-flex border border-copper/30">
                        <button className="p-2 text-copper" onClick={() => decrement(product.id)} aria-label={`Decrease ${product.name}`}>
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-10 px-3 py-2 text-center font-body text-sm text-ivory">{quantity}</span>
                        <button className="p-2 text-copper" onClick={() => increment(product.id)} aria-label={`Increase ${product.name}`}>
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-copper/15 p-5">
              <div className="mb-5 flex justify-between font-display text-2xl text-ivory">
                <span>Subtotal</span>
                <span className="text-copper">₹{subtotal}</span>
              </div>
              <ButtonLink
                external
                href={cartOrderLink(hydratedItems)}
                target="_blank"
                rel="noreferrer"
                className="w-full"
                aria-disabled={hydratedItems.length === 0}
              >
                Checkout via WhatsApp
              </ButtonLink>
              <button onClick={closeCart} className="mt-4 w-full font-body text-[11px] uppercase tracking-[0.16em] text-ivory-dim hover:text-copper">
                Continue Shopping
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
