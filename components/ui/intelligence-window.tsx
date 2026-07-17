"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2, Minus } from "lucide-react";
import { createPortal } from "react-dom";
import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type IntelligenceWindowProps = {
  title: string;
  eyebrow: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  bodyClassName?: string;
  collapsible?: boolean;
  focusable?: boolean;
  tone?: "mint" | "cyan" | "amber" | "iris";
};

const toneStyles = {
  mint: "bg-volt shadow-[0_0_18px_rgba(120,247,212,0.7)]",
  cyan: "bg-signal shadow-[0_0_18px_rgba(102,227,255,0.7)]",
  amber: "bg-ember shadow-[0_0_18px_rgba(255,184,107,0.65)]",
  iris: "bg-iris shadow-[0_0_18px_rgba(165,140,255,0.65)]",
};

export function IntelligenceWindow({
  title,
  eyebrow,
  children,
  icon,
  className,
  bodyClassName,
  collapsible = true,
  focusable = true,
  tone = "mint",
}: IntelligenceWindowProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentId = useId();
  const windowRef = useRef<HTMLElement | null>(null);
  const focusControlRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!focused) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    restoreFocusRef.current = true;
    const focusFrame = window.requestAnimationFrame(() => focusControlRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFocused(false);
        return;
      }

      if (event.key !== "Tab" || !windowRef.current) {
        return;
      }

      const controls = Array.from(
        windowRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((control) => control.offsetParent !== null);

      if (controls.length === 0) {
        event.preventDefault();
        return;
      }

      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focused]);

  useEffect(() => {
    if (focused || !restoreFocusRef.current) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      focusControlRef.current?.focus();
      restoreFocusRef.current = false;
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [focused]);

  const windowContent = (
    <motion.section
      ref={windowRef}
      role={focused ? "dialog" : undefined}
      aria-modal={focused ? true : undefined}
      aria-labelledby={`${contentId}-title`}
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[8px] border border-white/12 bg-[#090c11]/94 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_32px_110px_rgba(0,0,0,0.48)] backdrop-blur-2xl",
        focused && "flex max-h-[calc(100svh-32px)] w-full max-w-6xl flex-col",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <header className="relative z-10 flex min-h-14 items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className={cn("size-2 shrink-0 rounded-full", toneStyles[tone])} />
          {icon ? (
            <span className="grid size-8 shrink-0 place-items-center rounded-[6px] border border-white/10 bg-white/[0.05] text-white/78">
              {icon}
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">
              {eyebrow}
            </p>
            <h3 id={`${contentId}-title`} className="truncate text-sm font-semibold text-white/92">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {collapsible ? (
            <button
              type="button"
              aria-label={collapsed ? "Restore window content" : "Minimize window content"}
              aria-expanded={!collapsed}
              aria-controls={contentId}
              title={collapsed ? "Restore window" : "Minimize window"}
              onClick={() => setCollapsed((current) => !current)}
              className="grid size-9 place-items-center rounded-[6px] text-white/45 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
            >
              <Minus aria-hidden="true" className="size-4" />
            </button>
          ) : null}
          {focusable ? (
            <button
              ref={focusControlRef}
              type="button"
              aria-label={focused ? "Restore window size" : "Open focused window"}
              aria-pressed={focused}
              title={focused ? "Restore window" : "Focus window"}
              onClick={() => setFocused((current) => !current)}
              className="grid size-9 place-items-center rounded-[6px] text-white/45 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
            >
              {focused ? (
                <Minimize2 aria-hidden="true" className="size-4" />
              ) : (
                <Maximize2 aria-hidden="true" className="size-4" />
              )}
            </button>
          ) : null}
        </div>
      </header>

      <AnimatePresence initial={false}>
        {!collapsed ? (
          <motion.div
            id={contentId}
            key="window-content"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.26 }}
            className={cn("relative z-10 min-h-0 overflow-auto", focused && "flex-1", bodyClassName)}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );

  if (focused && mounted) {
    return createPortal(
      <div className="fixed inset-0 z-[120] grid place-items-center bg-black/78 p-4 backdrop-blur-xl">
        {windowContent}
      </div>,
      document.body,
    );
  }

  return windowContent;
}
