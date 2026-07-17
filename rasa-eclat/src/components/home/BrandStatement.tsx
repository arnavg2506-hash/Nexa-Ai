import { useEffect, useRef } from "react";

export function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mounted = true;
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const words = wordRefs.current.filter(Boolean);
        gsap.set(words, { opacity: 0, scale: 0.94 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%",
              scrub: true,
              pin: true
            }
          })
          .to(words[0], { opacity: 1, scale: 1, duration: 0.8 })
          .to(words[0], { opacity: 0, scale: 1.04, duration: 0.5 })
          .to(words[1], { opacity: 1, scale: 1, duration: 0.8 })
          .to(words[1], { opacity: 0, scale: 1.04, duration: 0.5 })
          .to(words[2], { opacity: 1, scale: 1, duration: 0.8 })
          .fromTo(".brand-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, "<0.2")
          .fromTo(".brand-subline", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1");
      }, sectionRef);
    });
    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-obsidian px-5">
      <div className="relative h-[42vh] w-full text-center">
        {["ESSENCE.", "CRAFTSMANSHIP.", "RASA ÉCLAT."].map((word, index) => (
          <div
            key={word}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`absolute inset-0 flex items-center justify-center font-display text-[clamp(64px,12vw,160px)] font-light leading-none ${
              index === 2 ? "text-copper" : "text-ivory"
            }`}
          >
            {word}
          </div>
        ))}
        <div className="brand-rule absolute bottom-10 left-1/2 h-px w-52 origin-left -translate-x-1/2 bg-copper" />
        <p className="brand-subline absolute bottom-0 left-0 right-0 font-body text-sm font-light uppercase tracking-[0.1em] text-ivory-dim">
          Automotive fragrance. Elevated.
        </p>
      </div>
    </section>
  );
}
