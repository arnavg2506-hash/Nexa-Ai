import { useEffect, useRef, type RefObject } from "react";

export function useInViewport<T extends HTMLElement>(): [RefObject<T | null>, RefObject<boolean>] {
  const elementRef = useRef<T>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [elementRef, visibleRef];
}
