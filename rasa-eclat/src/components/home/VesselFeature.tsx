import { useEffect, useRef } from "react";

const callouts = [
  {
    title: "Designed to be displayed.",
    body: "The RASA ÉCLAT vessel is not packaging. It is the product. Hand-weighted metal, angular geometry, a replaceable scent cartridge that refills without waste."
  },
  {
    title: "Formulated for India.",
    body: "Every RASA ÉCLAT fragrance is calibrated for 45°C heat, 80% monsoon humidity, and 70°C cabin temperatures - conditions no European car perfume is ever tested against."
  },
  {
    title: "The refill system.",
    body: "Buy the vessel once. Refill it forever. A subscription that makes luxury sustainable and repeat purchase effortless."
  }
];

export function VesselFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mounted = true;
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to(visualRef.current, {
          rotate: 8,
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "+=200%", scrub: true, pin: true }
        });
        gsap.fromTo(".vessel-callout", { opacity: 0.25, x: 18 }, { opacity: 1, x: 0, stagger: 0.25, scrollTrigger: { trigger: sectionRef.current, start: "top center", end: "bottom bottom", scrub: true } });
      }, sectionRef);
    });
    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section id="vessel" ref={sectionRef} className="min-h-dvh bg-charcoal px-5 py-24 md:px-8">
      <div className="mx-auto grid min-h-[80vh] max-w-[1320px] items-center gap-12 lg:grid-cols-2">
        <div className="flex justify-center">
          <div ref={visualRef} className="vessel-visual transition hover:drop-shadow-[0_0_42px_rgba(181,113,44,0.38)]" data-cursor="image" />
        </div>
        <div className="space-y-8">
          {callouts.map((callout, index) => (
            <article key={callout.title} className="vessel-callout border-l border-copper/30 pl-6">
              <p className="font-body text-[10px] uppercase tracking-[0.16em] text-copper">0{index + 1}</p>
              <h2 className="mt-2 font-display text-card-title font-light text-ivory">{callout.title}</h2>
              <p className="mt-3 max-w-xl font-body text-base font-light leading-8 text-ivory-dim">{callout.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
