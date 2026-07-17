import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<"default" | "link" | "image">("default");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (event: MouseEvent) => {
      pos.current = { x: event.clientX, y: event.clientY };
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-cursor='image']")) setMode("image");
      else if (target.closest("a,button,input,textarea,select,[role='button']")) setMode("link");
      else setMode("default");
    };
    const tick = () => {
      rendered.current.x += (pos.current.x - rendered.current.x) * 0.22;
      rendered.current.y += (pos.current.y - rendered.current.y) * 0.22;
      const transform = `translate3d(${rendered.current.x}px, ${rendered.current.y}px, 0) translate(-50%, -50%)`;
      if (cursorRef.current) cursorRef.current.style.transform = transform;
      if (dotRef.current) dotRef.current.style.transform = transform;
      requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    const frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[1000] hidden items-center justify-center border border-copper text-[10px] font-light tracking-[0.16em] text-copper transition-[width,height,opacity,background] duration-200 md:flex ${
          mode === "image" ? "h-10 w-24 bg-obsidian/75" : mode === "link" ? "h-10 w-10 bg-transparent" : "h-2 w-2 bg-obsidian"
        }`}
      >
        {mode === "image" ? "EXPLORE" : null}
      </div>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[1001] hidden h-2 w-2 bg-copper transition-opacity duration-200 md:block ${
          mode === "default" ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
