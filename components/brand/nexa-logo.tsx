import { Command } from "lucide-react";

type NexaLogoProps = {
  compact?: boolean;
};

export function NexaLogo({ compact = false }: NexaLogoProps) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="NEXA AI">
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-[8px] border border-volt/45 bg-graphite-950 shadow-[0_0_32px_rgba(120,247,212,0.24)]">
        <span aria-hidden="true" className="absolute inset-0 bg-[conic-gradient(from_210deg,#78f7d4,#66e3ff,#a58cff,#78f7d4)] opacity-[0.22]" />
        <span aria-hidden="true" className="absolute inset-[3px] rounded-[6px] bg-graphite-950/90" />
        <svg
          aria-hidden="true"
          viewBox="0 0 44 44"
          className="relative size-7 drop-shadow-[0_0_12px_rgba(120,247,212,0.8)]"
        >
          <path
            d="M8 31V12h5.5L28 24.5V12h6v19h-5.3L14 18.5V31H8Z"
            fill="#f5f7fb"
          />
          <path d="M29 31 36 12h6l-7.1 19H29Z" fill="#78f7d4" />
        </svg>
        <Command aria-hidden="true" className="absolute right-1 top-1 size-2.5 text-signal/80" />
      </span>
      {compact ? null : (
        <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white">
          NEXA AI
        </span>
      )}
    </span>
  );
}
