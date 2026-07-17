import type { Product } from "@/data/products";

export const whatsappNumber = () => import.meta.env.VITE_WHATSAPP_NUMBER || "91XXXXXXXXXX";

export function productOrderLink(product: Product, quantity = 1) {
  const message = `Hi, I'd like to order RASA ÉCLAT ${product.name} - Qty: ${quantity}. Please confirm availability.`;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

export function cartOrderLink(items: Array<{ product: Product; quantity: number }>) {
  const lines = items.map(({ product, quantity }) => `${product.name} x ${quantity} - ₹${product.price * quantity}`);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const message = `Hi, I'd like to reserve the following RASA ÉCLAT order:\n${lines.join("\n")}\nSubtotal: ₹${subtotal}\nPlease confirm availability.`;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}
