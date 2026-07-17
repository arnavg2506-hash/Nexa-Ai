import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export function Accordion({ items }: { items: Array<{ title: string; content: ReactNode }> }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-copper/20">
      {items.map((item, index) => (
        <div key={item.title} className="border-b border-copper/20">
          <button
            className="flex w-full items-center justify-between py-5 text-left font-body text-[12px] font-light uppercase tracking-[0.14em] text-ivory"
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            {item.title}
            <Plus className={`h-4 w-4 text-copper transition ${open === index ? "rotate-45" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pb-5 font-body text-sm font-light leading-7 text-ivory-dim">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
