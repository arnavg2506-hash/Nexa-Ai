import { useEffect, useRef } from "react";

export default function Story() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mounted = true;
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".story-reveal").forEach((element) => {
          gsap.fromTo(element, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: element, start: "top 80%" } });
        });
      }, rootRef);
    });
    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-obsidian pt-[72px]">
      <section className="editorial-image noise flex min-h-[calc(100dvh-72px)] items-center justify-center border-0 px-5 text-center">
        <h1 className="max-w-5xl font-display text-hero-display font-light text-ivory">The Soul of Every Drive</h1>
      </section>
      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-[1120px] space-y-28">
          <article className="story-reveal grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <blockquote className="font-display text-[32px] italic leading-tight text-copper">
              The car has become the most personal luxury space in India. We built a fragrance house worthy of it.
            </blockquote>
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">The Origin</p>
              <h2 className="mt-4 font-display text-section-title font-light text-ivory">Why RASA ÉCLAT exists</h2>
              <p className="mt-6 font-body text-base font-light leading-8 text-ivory-dim">
                Indian drivers spend hours inside cabins that are more intimate than offices and more personal than lounges. Yet the fragrance category has been treated as disposable. RASA ÉCLAT begins with a different premise: the car deserves perfume, not perfume-shaped plastic.
              </p>
            </div>
          </article>
          <article className="story-reveal mx-auto max-w-[720px] text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">RASA ÉCLAT</p>
            <h2 className="mt-4 font-display text-section-title font-light text-ivory">The Name</h2>
            <p className="mt-6 font-body text-base font-light leading-8 text-ivory-dim">
              Rasa is the Sanskrit idea of essence, flavor, and emotional core. Éclat is radiance, brilliance, the flash of something exceptional. Together they form a house built for feeling, restraint, and presence.
            </p>
          </article>
          <article className="story-reveal grid items-center gap-10 md:grid-cols-2">
            <div className="editorial-image min-h-[440px]" data-cursor="image" />
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">Our Roots</p>
              <h2 className="mt-4 font-display text-section-title font-light text-ivory">Lucknow and Kannauj</h2>
              <p className="mt-6 font-body text-base font-light leading-8 text-ivory-dim">
                Lucknow gives RASA ÉCLAT its culture of tehzeeb and quiet sophistication. Kannauj, India's fragrance capital, gives it memory: attars, distillation, monsoon earth, rose, oud, and smoke.
              </p>
            </div>
          </article>
          <article className="story-reveal">
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">The Design</p>
            <div className="mt-8 flex min-h-[520px] items-center justify-center bg-charcoal">
              <div className="vessel-visual" data-cursor="image" />
            </div>
            <p className="mt-8 max-w-3xl font-body text-base font-light leading-8 text-ivory-dim">
              The vessel is refillable, weighted, and unapologetically architectural. It is meant to be seen, held, and kept.
            </p>
          </article>
          <article className="story-reveal">
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">The Vision</p>
            <h2 className="mt-4 font-display text-section-title font-light text-ivory">Where We Are Going</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {["Car", "Home", "Hotels", "World"].map((item, index) => (
                <div key={item} className="border-t border-copper/40 pt-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.16em] text-copper">0{index + 1}</p>
                  <p className="mt-2 font-display text-3xl text-ivory">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
