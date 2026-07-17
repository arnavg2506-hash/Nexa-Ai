import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products, type Product } from "@/data/products";

export type CartLine = {
  id: string;
  quantity: number;
};

type CartStore = {
  isOpen: boolean;
  items: CartLine[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  hydratedItems: () => Array<{ product: Product; quantity: number }>;
  subtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (id, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
              ),
              isOpen: true
            };
          }
          return { items: [...state.items, { id, quantity }], isOpen: true };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0)
        })),
      clear: () => set({ items: [] }),
      hydratedItems: () =>
        get().items.flatMap((item) => {
          const product = products.find((candidate) => candidate.id === item.id);
          return product ? [{ product, quantity: item.quantity }] : [];
        }),
      subtotal: () => get().hydratedItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    }),
    {
      name: "rasa-eclat-cart",
      partialize: (state) => ({ items: state.items })
    }
  )
);
