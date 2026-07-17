import { BrandStatement } from "@/components/home/BrandStatement";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { Hero } from "@/components/home/Hero";
import { Ingredients } from "@/components/home/Ingredients";
import { MaisonSection } from "@/components/home/MaisonSection";
import { VesselFeature } from "@/components/home/VesselFeature";
import { WaitlistCTA } from "@/components/home/WaitlistCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <MaisonSection />
      <CollectionPreview />
      <VesselFeature />
      <Ingredients />
      <WaitlistCTA />
    </>
  );
}
