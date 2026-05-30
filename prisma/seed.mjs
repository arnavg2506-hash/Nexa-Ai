import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const districts = [
  {
    name: "Delhi NCR",
    state: "Delhi / Haryana / Uttar Pradesh",
    opportunity: "HIGH",
    intelligenceScore: 91,
    populationTrend: "+2.8% annual urban absorption",
    landRate: "INR 8-18 Cr / acre",
    flatRate: "INR 9,500-22,000 / sq ft",
    growthForecast: "+42% over 5 years",
    demandForecast: "Deep office, logistics, housing and infrastructure-led demand stack",
    riskIndicators: ["High entry price", "Title diligence", "Micro-market liquidity discipline"],
    aiReport:
      "Delhi NCR is the national command node where DMIC, AKIC and north-south logistics influence overlap. AI should separate premium housing liquidity from speculative fringe land.",
  },
  {
    name: "Dholera",
    state: "Gujarat",
    opportunity: "HIGH",
    intelligenceScore: 86,
    populationTrend: "+3.2% planned industrial-city ramp",
    landRate: "INR 55L-2.8 Cr / acre",
    flatRate: "INR 3,800-7,200 / sq ft",
    growthForecast: "+58% over 7 years",
    demandForecast: "Long-horizon industrial city and plotted development demand",
    riskIndicators: ["Holding-period risk", "Phased execution uncertainty"],
    aiReport:
      "Dholera is a high-conviction but patient-capital corridor play. AI should penalize parcels without access, approvals or realistic holding periods.",
  },
  {
    name: "Shendra-Bidkin",
    state: "Maharashtra",
    opportunity: "HIGH",
    intelligenceScore: 83,
    populationTrend: "+2.2% industrial city ramp",
    landRate: "INR 85L-3.5 Cr / acre",
    flatRate: "INR 4,600-8,600 / sq ft",
    growthForecast: "+39% over 6 years",
    demandForecast: "Industrial allotment, logistics and workforce housing demand",
    riskIndicators: ["Execution phasing", "Micro-market liquidity"],
    aiReport:
      "Shendra-Bidkin is a core DMIC industrial-city node. NEXA should model phasing, tenant announcements and access roads before ranking parcels.",
  },
  {
    name: "Nagpur",
    state: "Maharashtra",
    opportunity: "HIGH",
    intelligenceScore: 82,
    populationTrend: "+2.1% logistics-led expansion",
    landRate: "INR 90L-3.8 Cr / acre",
    flatRate: "INR 4,900-8,900 / sq ft",
    growthForecast: "+41% over 6 years",
    demandForecast: "Warehousing, data, logistics and central India distribution",
    riskIndicators: ["Absorption pace", "Location selection sensitivity"],
    aiReport:
      "Nagpur is the central switchboard in the national corridor graph. It deserves high AI attention where logistics access, MIHAN adjacency and realistic absorption overlap.",
  },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    opportunity: "HIGH",
    intelligenceScore: 83,
    populationTrend: "+2.5% port and industry growth",
    landRate: "INR 1.4-5.4 Cr / acre",
    flatRate: "INR 5,200-10,500 / sq ft",
    growthForecast: "+40% over 5 years",
    demandForecast: "Port-led, industrial and coastal city demand",
    riskIndicators: ["Cyclone resilience", "Slope and flood due diligence"],
    aiReport:
      "Visakhapatnam is the VCIC’s most visible industrial-port growth node. AI should prioritize resilient micro-markets with port, highway and employment access.",
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    opportunity: "HIGH",
    intelligenceScore: 90,
    populationTrend: "+3.2% skilled migration",
    landRate: "INR 3.8-14 Cr / acre",
    flatRate: "INR 8,500-18,500 / sq ft",
    growthForecast: "+40% over 5 years",
    demandForecast: "Deep rental, startup, IT and family housing demand",
    riskIndicators: ["Traffic friction", "Water stress", "Entry price"],
    aiReport:
      "Bengaluru is the southern intelligence node where CBIC and BMIC connect. NEXA should reward metro access, water resilience and job-centre proximity.",
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    opportunity: "HIGH",
    intelligenceScore: 89,
    populationTrend: "+3.0% tech, pharma and housing inflow",
    landRate: "INR 2.2-9.5 Cr / acre",
    flatRate: "INR 6,800-15,000 / sq ft",
    growthForecast: "+43% over 5 years",
    demandForecast: "Tech, life sciences, logistics and family housing demand",
    riskIndicators: ["Peripheral approvals", "Speculative plotted schemes"],
    aiReport:
      "Hyderabad is a national AI-priority market with high job creation, strong affordability relative to metro peers and major logistics/pharma depth.",
  },
  {
    name: "Tumakuru",
    state: "Karnataka",
    opportunity: "HIGH",
    intelligenceScore: 84,
    populationTrend: "+2.5% Bengaluru spillover and industrial growth",
    landRate: "INR 1.0-4.8 Cr / acre",
    flatRate: "INR 4,800-9,200 / sq ft",
    growthForecast: "+39% over 5 years",
    demandForecast: "Industrial land, logistics and affordable housing demand",
    riskIndicators: ["Timing risk", "Road-access quality"],
    aiReport:
      "Tumakuru is a strong Bengaluru spillover node. AI should reward industrial access, utility readiness and commute realism over speculative distance-only bets.",
  },
  {
    name: "Kochi",
    state: "Kerala",
    opportunity: "HIGH",
    intelligenceScore: 82,
    populationTrend: "+2.0% port, tourism and NRI demand",
    landRate: "INR 1.8-6.5 Cr / acre",
    flatRate: "INR 5,800-11,800 / sq ft",
    growthForecast: "+32% over 5 years",
    demandForecast: "NRI, port, tourism and rental demand",
    riskIndicators: ["Coastal resilience", "Parcel-level regulation"],
    aiReport:
      "Kochi adds a southern coastal resilience and port-demand layer to the national map. NEXA should model flood/coastal rules before recommending land.",
  },
];

async function main() {
  for (const district of districts) {
    await prisma.district.upsert({
      where: { name_state: { name: district.name, state: district.state } },
      update: district,
      create: district,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
