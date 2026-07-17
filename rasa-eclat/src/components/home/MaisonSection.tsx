import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function MaisonSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mounted = true;
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!mounted || !imageRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(22% 0 0 0)", y: 60 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            scrollTrigger: { trigger: imageRef.current, start: "top 82%", end: "top 35%", scrub: true }
          }
        );
      });
    });
    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section id="maison" className="bg-obsidian px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
        <div ref={imageRef} className="editorial-image noise" data-cursor="image" />
        <div>
          <p className="font-body text-[11px] uppercase tracking-[0.18em] text-copper">The Maison</p>
          <h2 className="mt-5 font-display text-[clamp(40px,5vw,58px)] font-light leading-tight text-ivory">
            Born in Lucknow. Built for the world.
          </h2>
          <p className="mt-7 font-body text-base font-light leading-8 text-ivory-dim">
            RASA ÉCLAT draws from two ancient traditions - the Sanskrit concept of rasa, the pure emotional essence of something,
            and the radiance of éclat, the French word for brilliance. Together, they become something entirely new: India's first
            luxury automotive fragrance house.
          </p>
          <Link to="/story" className="mt-8 inline-flex font-body text-[11px] uppercase tracking-[0.16em] text-copper hover:underline">
            Read the full story →
          </Link>
        </div>
      </div>
    </section>
  );
}
