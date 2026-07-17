import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let mounted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    import("lenis").then(({ default: Lenis }) => {
      if (!mounted) return;
      lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9, touchMultiplier: 1.1 });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}
