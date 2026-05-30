import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
};

export function GlassCard({ active, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.055] shadow-glass backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(125deg,rgba(255,255,255,0.16),transparent_38%,rgba(120,247,212,0.08))] before:opacity-70",
        active && "border-volt/45 bg-volt/[0.07] shadow-aurora",
        className,
      )}
      {...props}
    />
  );
}
