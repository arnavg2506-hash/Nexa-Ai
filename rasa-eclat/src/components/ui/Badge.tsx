import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-copper/20 px-3 py-2 font-body text-[11px] font-light uppercase tracking-[0.12em] text-ivory-dim">
      {children}
    </span>
  );
}
