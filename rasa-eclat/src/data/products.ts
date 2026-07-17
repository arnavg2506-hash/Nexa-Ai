export type Product = {
  id: string;
  number: string;
  name: string;
  family: string;
  tagline: string;
  price: number;
  refillPrice: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string[];
  tags: string[];
};

export const products: Product[] = [
  {
    id: "midnight",
    number: "01",
    name: "MIDNIGHT",
    family: "Woody Oriental",
    tagline: "Deep. Smoky. Commanding.",
    price: 1299,
    refillPrice: 499,
    notes: {
      top: ["Oud", "Black Pepper"],
      heart: ["Sandalwood", "Rose Absolute"],
      base: ["Dark Musk", "Warm Amber"]
    },
    description: [
      "MIDNIGHT is the scent of a drive that never quite ends. Built around a core of genuine oud and dark musk, it fills the cabin with the kind of presence that doesn't ask for attention - it simply commands it.",
      "Formulated specifically for India's extreme cabin temperatures, MIDNIGHT holds its character from a morning commute in January to an afternoon drive in May.",
      "Suited to leather interiors, premium sedans, and anyone who wants their car to smell like a decision."
    ],
    tags: ["oud", "woody"]
  },
  {
    id: "ember",
    number: "02",
    name: "EMBER",
    family: "Warm Amber",
    tagline: "Warm. Resinous. Glowing.",
    price: 1199,
    refillPrice: 449,
    notes: {
      top: ["Frankincense", "Cardamom"],
      heart: ["Amber", "Cedar"],
      base: ["Vanilla", "Soft Musk"]
    },
    description: [
      "EMBER draws from the ancient tradition of burning frankincense - a fragrance ritual that predates modern perfumery by three thousand years.",
      "Warm and resinous at its core, with a soft vanilla drydown that makes long drives feel like an arrival.",
      "The scent of golden hour. Suited to family SUVs, evening drives, and festive gifting."
    ],
    tags: ["amber", "woody"]
  },
  {
    id: "first-light",
    number: "03",
    name: "FIRST LIGHT",
    family: "Fresh Floral",
    tagline: "Luminous. Fresh. Refined.",
    price: 1099,
    refillPrice: 399,
    notes: {
      top: ["Bergamot", "Green Tea"],
      heart: ["Rose", "White Peony"],
      base: ["Vetiver", "White Musk"]
    },
    description: [
      "FIRST LIGHT is the scent of a cabin that has just been detailed - clean, precise, and quietly confident.",
      "A bergamot-forward opening gives way to a heart of rose and white peony, grounded by vetiver and white musk that lasts through the afternoon heat.",
      "The most universally wearable fragrance in the RASA ÉCLAT collection. Suited to shared cars, family vehicles, and anyone who wants to make a subtle but lasting impression."
    ],
    tags: ["floral"]
  },
  {
    id: "golden-hour",
    number: "04",
    name: "GOLDEN HOUR",
    family: "Citrus Woody",
    tagline: "Bright. Warm. Effortless.",
    price: 1199,
    refillPrice: 449,
    notes: {
      top: ["Mandarin", "Bergamot"],
      heart: ["Saffron", "Warm Spice"],
      base: ["Cedarwood", "Amber Musk"]
    },
    description: [
      "GOLDEN HOUR captures the exact quality of late afternoon light in North India - warm, hazy, and unhurried.",
      "Mandarin and bergamot open bright and clean, then saffron pulls the scent toward something richer and more considered as the drive continues.",
      "Suited to weekend drives, open highways, and the rare Indian evening when everything feels exactly right."
    ],
    tags: ["amber"]
  },
  {
    id: "dark-road",
    number: "05",
    name: "DARK ROAD",
    family: "Smoky Leather",
    tagline: "Bold. Smoky. Unapologetic.",
    price: 1399,
    refillPrice: 549,
    notes: {
      top: ["Smoke", "Black Pepper"],
      heart: ["Leather", "Vetiver"],
      base: ["Patchouli", "Dark Amber"]
    },
    description: [
      "DARK ROAD is not for everyone. It is for the driver who treats every commute as a statement.",
      "Smoke and leather at its core - the kind of combination that has defined masculine luxury fragrance for a century, recalibrated for India's roads.",
      "Long-lasting, high-projection, and completely uncompromising. The most intense fragrance in the collection."
    ],
    tags: ["woody"]
  },
  {
    id: "still-air",
    number: "06",
    name: "STILL AIR",
    family: "Clean Minimal",
    tagline: "Clean. Precise. Invisible.",
    price: 999,
    refillPrice: 349,
    notes: {
      top: ["White Tea", "Cucumber"],
      heart: ["Iris", "Soft Powder"],
      base: ["Light Cedar", "Clean Musk"]
    },
    description: [
      "STILL AIR is the scent of a cabin that smells like nothing - and everything. The fragrance equivalent of a perfectly pressed shirt.",
      "Built for drivers who find most car fragrances too strong, too synthetic, or too present. STILL AIR works by suggestion, not declaration.",
      "The ideal daily driver. Suited to office commutes, client pickups, and anyone who values restraint."
    ],
    tags: ["floral"]
  }
];
