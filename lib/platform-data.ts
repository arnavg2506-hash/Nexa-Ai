import {
  Banknote,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  MapPinned,
  Plane,
  Route,
  ShieldAlert,
  TrainFront,
  Trees,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ModuleKey = "land" | "homes";

export type PlatformModule = {
  key: ModuleKey;
  title: string;
  label: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  accent: string;
};

export type Layer = {
  label: string;
  icon: LucideIcon;
  active: boolean;
};

export type District = {
  name: string;
  state: string;
  x: number;
  y: number;
  opportunity: "High" | "Moderate" | "Low";
  score: number;
  populationTrend: string;
  infrastructure: string[];
  landRate: string;
  flatRate: string;
  growthForecast: string;
  demandForecast: string;
  risk: string;
  report: string;
};

export type NationalCorridor = {
  name: string;
  shortName: string;
  route: string;
  states: string[];
  nodes: string[];
  thesis: string;
};

export type ComparisonRow = {
  metric: string;
  west: string;
  northEast: string;
  southEast: string;
};

export type PortfolioAsset = {
  name: string;
  type: string;
  value: string;
  growth: string;
  alert: string;
};

export const intelligenceMeta = {
  status: "illustrative" as const,
  asOf: "July 2026 product demo",
  coverage: "33 India intelligence nodes and 11 national corridor models",
  methodology:
    "Composite demonstration scores combining infrastructure maturity, market depth, liquidity, demand and risk assumptions. Corridor geometry is schematic rather than a surveyed alignment.",
  disclaimer:
    "Not a live government record, title opinion, valuation, financial advice or guarantee of future returns.",
  corridorSource: {
    publisher: "Department for Promotion of Industry and Internal Trade, Government of India",
    title: "National Industrial Corridor Development Programme",
    url: "https://www.dpiit.gov.in/offerings/schemes-and-services/details/industrial-corridors-YjM2UDNtQWa",
    verifiedAt: "17 July 2026",
  },
};

export const platformModules: PlatformModule[] = [
  {
    key: "land",
    title: "Land & Plots",
    label: "For acquisition capital",
    description:
      "For investors, developers, industrial buyers, farmland buyers, and land acquisition teams evaluating future corridors before the market catches up.",
    features: [
      "Growth forecasting",
      "Infrastructure intelligence",
      "Investment scoring",
      "Future hotspot detection",
      "Legal risk indicators",
    ],
    icon: Trees,
    accent: "volt",
  },
  {
    key: "homes",
    title: "Homes & Apartments",
    label: "For lifestyle and yield",
    description:
      "For home buyers, rental investors, and families comparing builder trust, neighborhood quality, commute friction, and appreciation potential.",
    features: [
      "AI property discovery",
      "Builder intelligence",
      "Rental yield prediction",
      "Neighborhood scoring",
      "Appreciation forecasting",
    ],
    icon: Building2,
    accent: "signal",
  },
];

export const searchPrompts = [
  "Find undervalued land near national industrial corridors.",
  "Show me India locations likely to double in value within 7 years.",
  "Compare DMIC, AKIC, VCIC and CBIC for investment potential.",
  "Find homes near upcoming airports, freight corridors and metro expansion.",
];

export const landForecast = [
  { horizon: "3Y", conservative: 18, base: 29, aggressive: 38 },
  { horizon: "5Y", conservative: 34, base: 58, aggressive: 77 },
  { horizon: "10Y", conservative: 82, base: 141, aggressive: 196 },
];

export const homesForecast = [
  { horizon: "Rent", bengaluru: 5.2, pune: 4.7, hyderabad: 4.9 },
  { horizon: "Yield", bengaluru: 5.0, pune: 4.6, hyderabad: 5.1 },
  { horizon: "5Y", bengaluru: 40, pune: 36, hyderabad: 43 },
  { horizon: "Risk", bengaluru: 31, pune: 29, hyderabad: 28 },
];

export const infrastructureLayers: Layer[] = [
  { label: "Highways", icon: Route, active: true },
  { label: "Expressways", icon: Route, active: true },
  { label: "Metro projects", icon: TrainFront, active: true },
  { label: "Airports", icon: Plane, active: true },
  { label: "Smart cities", icon: Landmark, active: false },
  { label: "Industrial corridors", icon: Factory, active: true },
  { label: "Warehousing hubs", icon: Warehouse, active: true },
  { label: "Economic zones", icon: Banknote, active: false },
];

export const nationalCorridors: NationalCorridor[] = [
  {
    name: "Delhi Mumbai Industrial Corridor",
    shortName: "DMIC",
    route: "M220 210 C204 238 185 262 170 317 C158 358 167 394 206 415 C246 437 286 433 315 421",
    states: ["Uttar Pradesh", "Haryana", "Rajasthan", "Madhya Pradesh", "Gujarat", "Maharashtra"],
    nodes: ["Greater Noida", "Nangal Chaudhary", "Vikram Udyogpuri", "Jodhpur-Pali", "Dholera SIR", "Shendra-Bidkin", "Dighi Port"],
    thesis: "Western DFC-backed manufacturing and logistics programme with approved industrial and multimodal nodes.",
  },
  {
    name: "Amritsar Kolkata Industrial Corridor",
    shortName: "AKIC",
    route: "M185 108 C197 145 213 186 220 210 C255 230 289 242 328 262 C369 281 405 269 443 246",
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Uttarakhand", "Bihar", "Jharkhand", "West Bengal"],
    nodes: ["Rajpura-Patiala", "Hisar", "Khurpia", "Agra", "Prayagraj", "Gaya", "Raghunathpur"],
    thesis: "Eastern DFC-influenced corridor linking North Indian demand with eastern manufacturing nodes.",
  },
  {
    name: "Chennai Bengaluru Industrial Corridor",
    shortName: "CBIC",
    route: "M286 493 C306 501 334 508 365 512",
    states: ["Karnataka", "Andhra Pradesh", "Tamil Nadu"],
    nodes: ["Krishnapatnam", "Tumakuru", "Ponneri"],
    thesis: "South India electronics, auto, aerospace and high-skill manufacturing belt.",
  },
  {
    name: "East Coast Industrial Corridor (VCIC Phase 1)",
    shortName: "VCIC",
    route: "M385 358 C381 403 373 457 365 512",
    states: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
    nodes: ["Visakhapatnam", "Kopparthy", "Chittoor"],
    thesis: "East Coast port and manufacturing programme, with VCIC represented as its first phase.",
  },
  {
    name: "Hyderabad Bengaluru Industrial Corridor",
    shortName: "HBIC",
    route: "M291 403 C294 437 300 470 302 499",
    states: ["Telangana", "Andhra Pradesh", "Karnataka"],
    nodes: ["Orvakal Industrial Area"],
    thesis: "Southern inland manufacturing connector between Hyderabad’s pharma/tech base and Bengaluru’s high-skill economy.",
  },
  {
    name: "Bengaluru Mumbai Industrial Corridor",
    shortName: "BMIC",
    route: "M315 421 C308 448 302 474 302 499",
    states: ["Maharashtra", "Karnataka"],
    nodes: ["Dharwad", "Satara"],
    thesis: "High-value western-southern technology, mobility and manufacturing axis.",
  },
  {
    name: "Odisha Economic Corridor",
    shortName: "OEC",
    route: "M443 246 C426 275 414 294 411 301 C404 320 396 340 385 358",
    states: ["Odisha"],
    nodes: ["Paradip-Kendrapada-Dhamra-Subarnarekha", "Gopalpur-Bhubaneswar-Kalinganagar"],
    thesis: "Odisha port, mineral, manufacturing and logistics programme represented here as a schematic market corridor.",
  },
  {
    name: "Hyderabad Nagpur Industrial Corridor",
    shortName: "HNIC",
    route: "M270 329 C278 358 287 382 292 407",
    states: ["Maharashtra", "Telangana"],
    nodes: ["Zaheerabad Phase 1"],
    thesis: "Central India industrial connector linking logistics, warehousing and pharma demand.",
  },
  {
    name: "Hyderabad Warangal Industrial Corridor",
    shortName: "HWIC",
    route: "M291 403 C302 391 311 382 317 378",
    states: ["Telangana"],
    nodes: ["Hyderabad Phase 1"],
    thesis: "Telangana industrial extension joining Hyderabad’s capital stack with Warangal’s manufacturing and education base.",
  },
  {
    name: "CBIC Extension to Kochi via Coimbatore",
    shortName: "CBIC-K",
    route: "M302 499 C306 520 310 536 312 538 C296 546 282 553 270 557",
    states: ["Karnataka", "Tamil Nadu", "Kerala"],
    nodes: ["Palakkad", "Dharmapuri"],
    thesis: "South-west extension connecting high-skill manufacturing, textile/engineering clusters and port/NRI demand.",
  },
  {
    name: "Delhi Nagpur Industrial Corridor",
    shortName: "DNIC",
    route: "M220 210 C235 253 254 293 270 329",
    states: ["Delhi NCR", "Madhya Pradesh", "Maharashtra"],
    nodes: ["Delhi-Nagpur alignment (conceptual)"],
    thesis: "North-south industrial corridor programme currently represented as a conceptual alignment.",
  },
];

export const districts: District[] = [
  {
    name: "Delhi NCR",
    state: "Delhi / Haryana / Uttar Pradesh",
    x: 42,
    y: 33,
    opportunity: "High",
    score: 91,
    populationTrend: "+2.8% annual urban absorption",
    infrastructure: ["DMIC", "AKIC", "Delhi-Nagpur Corridor", "Western/Eastern DFC influence"],
    landRate: "INR 8-18 Cr / acre",
    flatRate: "INR 9,500-22,000 / sq ft",
    growthForecast: "+42% over 5 years",
    demandForecast: "Deepest office, logistics, housing and infrastructure-led demand stack",
    risk: "High entry price, title diligence and micro-market liquidity discipline required",
    report:
      "Delhi NCR is the national command node where DMIC, AKIC and north-south logistics influence overlap. AI should separate premium housing liquidity from speculative fringe land and score only locations with verified infrastructure adjacency.",
  },
  {
    name: "Amritsar",
    state: "Punjab",
    x: 36,
    y: 17,
    opportunity: "Moderate",
    score: 76,
    populationTrend: "+1.5% annual trade-led growth",
    infrastructure: ["AKIC", "Dedicated freight influence", "Border trade logistics"],
    landRate: "INR 1.5-4.8 Cr / acre",
    flatRate: "INR 4,800-8,200 / sq ft",
    growthForecast: "+31% over 5 years",
    demandForecast: "Agro-processing, warehousing and tourism-linked housing demand",
    risk: "Execution timing and end-user absorption must be watched",
    report:
      "Amritsar is a northern AKIC anchor with logistics and agro-processing upside. NEXA should rank land near freight-compatible access higher than purely speculative parcels.",
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    x: 35,
    y: 41,
    opportunity: "High",
    score: 84,
    populationTrend: "+2.4% annual household formation",
    infrastructure: ["DMIC", "Delhi-Mumbai Expressway", "Tourism and warehousing belt"],
    landRate: "INR 1.8-6.2 Cr / acre",
    flatRate: "INR 5,800-11,500 / sq ft",
    growthForecast: "+39% over 5 years",
    demandForecast: "Manufacturing, tourism, logistics and second-home demand",
    risk: "Peripheral land needs title and water-access diligence",
    report:
      "Jaipur sits in the DMIC and expressway influence field. The strongest thesis combines logistics access, ring-road connectivity and liquid residential catchments.",
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    x: 31,
    y: 56,
    opportunity: "High",
    score: 88,
    populationTrend: "+2.6% annual industrial expansion",
    infrastructure: ["DMIC", "Dholera SIR access", "GIFT City influence", "DFC-linked industry"],
    landRate: "INR 2.5-8.5 Cr / acre",
    flatRate: "INR 6,800-14,500 / sq ft",
    growthForecast: "+44% over 5 years",
    demandForecast: "Industrial, financial-services and managed-township demand",
    risk: "Corridor hype must be filtered by actual access and trunk infrastructure",
    report:
      "Ahmedabad is one of western India’s strongest corridor markets. NEXA should connect Dholera, GIFT City, logistics access and housing liquidity before recommending a micro-market.",
  },
  {
    name: "Dholera",
    state: "Gujarat",
    x: 32,
    y: 62,
    opportunity: "High",
    score: 86,
    populationTrend: "+3.2% planned industrial-city ramp",
    infrastructure: ["DMIC", "Dholera SIR", "Airport influence", "Expressway access"],
    landRate: "INR 55L-2.8 Cr / acre",
    flatRate: "INR 3,800-7,200 / sq ft",
    growthForecast: "+58% over 7 years",
    demandForecast: "Long-horizon industrial city and plotted development demand",
    risk: "Holding-period risk and phased execution uncertainty",
    report:
      "Dholera is a high-conviction but patient-capital corridor play. AI should penalize parcels without access, approvals or realistic holding periods.",
  },
  {
    name: "Mumbai-Panvel",
    state: "Maharashtra",
    x: 61,
    y: 66,
    opportunity: "High",
    score: 87,
    populationTrend: "+3.1% airport and commuter migration",
    infrastructure: ["BMIC", "Navi Mumbai Airport", "MTHL", "Logistics parks"],
    landRate: "INR 7.9 Cr / acre",
    flatRate: "INR 11,200-22,000 / sq ft",
    growthForecast: "+46% over 5 years",
    demandForecast: "Airport and harbour-link demand expanding",
    risk: "Execution timelines, flood mapping and entry price risk",
    report:
      "Mumbai-Panvel is shifting from peripheral affordability to infrastructure-led repricing. The best thesis combines airport access with verified land title, drainage and resale depth.",
  },
  {
    name: "Pune",
    state: "Maharashtra",
    x: 57,
    y: 70,
    opportunity: "High",
    score: 85,
    populationTrend: "+2.7% tech and manufacturing inflow",
    infrastructure: ["BMIC", "Mumbai-Pune industrial belt", "Metro expansion"],
    landRate: "INR 3.2-9 Cr / acre",
    flatRate: "INR 7,500-15,500 / sq ft",
    growthForecast: "+36% over 5 years",
    demandForecast: "IT, auto, education and rental depth remains broad",
    risk: "Oversupply pockets and commute friction",
    report:
      "Pune is a balanced homes-and-industry market. NEXA should score projects by commute depth, rental demand, and access to the Mumbai-Bengaluru industrial axis.",
  },
  {
    name: "Nagpur",
    state: "Maharashtra",
    x: 52,
    y: 52,
    opportunity: "High",
    score: 82,
    populationTrend: "+2.1% logistics-led expansion",
    infrastructure: ["Delhi-Nagpur Corridor", "Hyderabad-Nagpur Corridor", "MIHAN", "Central logistics hub"],
    landRate: "INR 90L-3.8 Cr / acre",
    flatRate: "INR 4,900-8,900 / sq ft",
    growthForecast: "+41% over 6 years",
    demandForecast: "Warehousing, data, logistics and central India distribution",
    risk: "Absorption pace and location selection matter",
    report:
      "Nagpur is the central switchboard in the national corridor graph. It deserves high AI attention where logistics access, MIHAN adjacency and realistic absorption overlap.",
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    x: 56,
    y: 63,
    opportunity: "High",
    score: 89,
    populationTrend: "+3.0% tech, pharma and housing inflow",
    infrastructure: ["Hyderabad-Nagpur Corridor", "ORR", "Pharma and aerospace clusters"],
    landRate: "INR 2.2-9.5 Cr / acre",
    flatRate: "INR 6,800-15,000 / sq ft",
    growthForecast: "+43% over 5 years",
    demandForecast: "Tech, life sciences, logistics and family housing demand",
    risk: "Peripheral plotted schemes must be filtered for approvals",
    report:
      "Hyderabad is a national AI-priority market: high job creation, strong affordability relative to metro peers and major logistics/pharma depth.",
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    x: 58,
    y: 78,
    opportunity: "High",
    score: 90,
    populationTrend: "+3.2% skilled migration",
    infrastructure: ["CBIC", "BMIC", "Metro expansion", "Aerospace and tech clusters"],
    landRate: "INR 3.8-14 Cr / acre",
    flatRate: "INR 8,500-18,500 / sq ft",
    growthForecast: "+40% over 5 years",
    demandForecast: "Deep rental, startup, IT and family housing demand",
    risk: "Traffic friction and water stress require micro-market scoring",
    report:
      "Bengaluru is the southern intelligence node where CBIC and BMIC connect. NEXA should reward metro access, water resilience and job-centre proximity.",
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    x: 70,
    y: 80,
    opportunity: "High",
    score: 84,
    populationTrend: "+2.2% industrial and services demand",
    infrastructure: ["CBIC", "VCIC", "Ports", "Auto and electronics corridor"],
    landRate: "INR 2.5-8.8 Cr / acre",
    flatRate: "INR 6,300-13,800 / sq ft",
    growthForecast: "+34% over 5 years",
    demandForecast: "Manufacturing, port logistics, IT and stable housing demand",
    risk: "Flood resilience and commute time must be modelled",
    report:
      "Chennai is a dual-corridor anchor for southern and eastern India. Strong recommendations require flood-risk, port access and industrial catchment scoring.",
  },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    x: 74,
    y: 56,
    opportunity: "High",
    score: 83,
    populationTrend: "+2.5% port and industry growth",
    infrastructure: ["VCIC", "Vizag-Chennai Industrial Corridor", "Port and logistics zones"],
    landRate: "INR 1.4-5.4 Cr / acre",
    flatRate: "INR 5,200-10,500 / sq ft",
    growthForecast: "+40% over 5 years",
    demandForecast: "Port-led, industrial and coastal city demand",
    risk: "Cyclone and slope/flood resilience due diligence",
    report:
      "Visakhapatnam is the VCIC’s most visible industrial-port growth node. AI should prioritize resilient micro-markets with port, highway and employment access.",
  },
  {
    name: "Bhubaneswar",
    state: "Odisha",
    x: 79,
    y: 47,
    opportunity: "Moderate",
    score: 80,
    populationTrend: "+2.3% services and industrial growth",
    infrastructure: ["OEC", "Odisha Economic Corridor", "Smart city investments"],
    landRate: "INR 1.2-4.2 Cr / acre",
    flatRate: "INR 4,800-9,200 / sq ft",
    growthForecast: "+37% over 5 years",
    demandForecast: "Government, education, IT and industrial support demand",
    risk: "Liquidity differs sharply by micro-market",
    report:
      "Bhubaneswar is an Odisha corridor market with steady planned-city fundamentals. NEXA should track institutional land, road access and job creation signals.",
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    x: 85,
    y: 39,
    opportunity: "Moderate",
    score: 79,
    populationTrend: "+1.6% mature metro expansion",
    infrastructure: ["AKIC", "OEC", "Port and logistics network"],
    landRate: "INR 2.1-7.5 Cr / acre",
    flatRate: "INR 5,800-12,500 / sq ft",
    growthForecast: "+29% over 5 years",
    demandForecast: "Port, logistics, affordable housing and eastern gateway demand",
    risk: "Mature-market liquidity and regulatory diligence",
    report:
      "Kolkata is a dual AKIC/OEC gateway. AI should search for value in logistics-linked eastern gateways and avoid slow-moving inventory pockets.",
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    x: 56,
    y: 38,
    opportunity: "High",
    score: 81,
    populationTrend: "+2.4% urban household formation",
    infrastructure: ["AKIC influence", "UP Defence Industrial Corridor", "Expressway network"],
    landRate: "INR 1.4-5.2 Cr / acre",
    flatRate: "INR 5,200-10,800 / sq ft",
    growthForecast: "+36% over 5 years",
    demandForecast: "Government, defence, education and end-user housing demand",
    risk: "Peripheral schemes must be filtered for delivery and title clarity",
    report:
      "Lucknow is becoming a serious North India residential and defence-manufacturing support market. NEXA should score expressway access and delivery credibility.",
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    x: 63,
    y: 41,
    opportunity: "Moderate",
    score: 77,
    populationTrend: "+1.8% tourism and corridor demand",
    infrastructure: ["AKIC influence", "Eastern freight/expressway network", "Tourism infrastructure"],
    landRate: "INR 90L-3.6 Cr / acre",
    flatRate: "INR 4,900-8,800 / sq ft",
    growthForecast: "+33% over 5 years",
    demandForecast: "Tourism, warehousing and eastern UP housing demand",
    risk: "Local title complexity and liquidity variation",
    report:
      "Varanasi is a cultural and logistics-adjacent AKIC watch node. It suits selective capital where access, tourism, and industrial spillover are all visible.",
  },
  {
    name: "Kochi",
    state: "Kerala",
    x: 52,
    y: 87,
    opportunity: "High",
    score: 82,
    populationTrend: "+2.0% port, tourism and NRI demand",
    infrastructure: ["Port logistics", "Metro extension", "Coastal economic activity"],
    landRate: "INR 1.8-6.5 Cr / acre",
    flatRate: "INR 5,800-11,800 / sq ft",
    growthForecast: "+32% over 5 years",
    demandForecast: "NRI, port, tourism and rental demand",
    risk: "Coastal resilience and parcel-level regulation diligence",
    report:
      "Kochi adds a southern coastal resilience and port-demand layer to the national map. NEXA should model flood/coastal rules before recommending land.",
  },
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    x: 60,
    y: 84,
    opportunity: "Moderate",
    score: 80,
    populationTrend: "+2.1% manufacturing and education demand",
    infrastructure: ["Western Tamil Nadu manufacturing belt", "Airport and industrial estates"],
    landRate: "INR 1.5-5.7 Cr / acre",
    flatRate: "INR 4,900-9,600 / sq ft",
    growthForecast: "+34% over 5 years",
    demandForecast: "Textiles, engineering, education and family housing demand",
    risk: "Liquidity and water resilience must be checked micro-market by micro-market",
    report:
      "Coimbatore is a strong secondary-city manufacturing and education market. AI should identify job-centre-linked homes and industrial parcels with reliable utilities.",
  },
  {
    name: "Hisar",
    state: "Haryana",
    x: 40,
    y: 30,
    opportunity: "Moderate",
    score: 78,
    populationTrend: "+1.9% industrial and logistics expansion",
    infrastructure: ["DMIC influence", "Industrial model township", "NCR logistics access"],
    landRate: "INR 1.4-4.8 Cr / acre",
    flatRate: "INR 4,800-8,400 / sq ft",
    growthForecast: "+34% over 5 years",
    demandForecast: "Industrial, warehousing and affordable plotted demand",
    risk: "Liquidity and execution timing need careful screening",
    report:
      "Hisar gives NEXA a Haryana industrial node beyond NCR. AI should score land by highway access, utility readiness, tenant depth and realistic exit liquidity.",
  },
  {
    name: "Rajpura-Patiala",
    state: "Punjab",
    x: 38,
    y: 23,
    opportunity: "Moderate",
    score: 77,
    populationTrend: "+1.6% trade and education-led growth",
    infrastructure: ["AKIC influence", "Freight-compatible access", "Punjab industrial estates"],
    landRate: "INR 1.2-3.9 Cr / acre",
    flatRate: "INR 4,600-8,000 / sq ft",
    growthForecast: "+30% over 5 years",
    demandForecast: "Agro-processing, warehousing and education-linked housing demand",
    risk: "Capital appreciation depends on corridor execution visibility",
    report:
      "Rajpura-Patiala adds Punjab’s inland logistics and education demand to the AKIC layer. NEXA should prefer parcels with clean title and freight access over isolated cheap land.",
  },
  {
    name: "Jodhpur-Pali",
    state: "Rajasthan",
    x: 25,
    y: 43,
    opportunity: "Moderate",
    score: 79,
    populationTrend: "+1.8% manufacturing corridor growth",
    infrastructure: ["DMIC influence", "Marwar industrial node", "Textile and logistics clusters"],
    landRate: "INR 80L-3.2 Cr / acre",
    flatRate: "INR 4,300-7,700 / sq ft",
    growthForecast: "+35% over 6 years",
    demandForecast: "Industrial land, warehousing and workforce housing demand",
    risk: "Water, utilities and absorption timing require diligence",
    report:
      "Jodhpur-Pali is a patient-capital industrial thesis. The AI layer should reward confirmed utilities, highway access and industrial allotment quality.",
  },
  {
    name: "Shendra-Bidkin",
    state: "Maharashtra",
    x: 52,
    y: 60,
    opportunity: "High",
    score: 83,
    populationTrend: "+2.2% industrial city ramp",
    infrastructure: ["DMIC", "Aurangabad industrial belt", "Expressway influence"],
    landRate: "INR 85L-3.5 Cr / acre",
    flatRate: "INR 4,600-8,600 / sq ft",
    growthForecast: "+39% over 6 years",
    demandForecast: "Industrial allotment, logistics and workforce housing demand",
    risk: "Execution phasing and micro-market liquidity",
    report:
      "Shendra-Bidkin is a core DMIC industrial-city node. NEXA should model phasing, tenant announcements and access roads before ranking parcels.",
  },
  {
    name: "Dighi Port",
    state: "Maharashtra",
    x: 53,
    y: 69,
    opportunity: "Moderate",
    score: 78,
    populationTrend: "+1.7% port and coastal logistics demand",
    infrastructure: ["BMIC influence", "Port-led logistics", "Coastal industrial access"],
    landRate: "INR 1.1-4.4 Cr / acre",
    flatRate: "INR 4,900-9,200 / sq ft",
    growthForecast: "+33% over 6 years",
    demandForecast: "Port-linked warehousing, tourism and second-home demand",
    risk: "Coastal regulation and liquidity variance",
    report:
      "Dighi Port extends the western industrial graph toward coastal logistics. AI should check CRZ rules, road access and real tenant demand before recommending land.",
  },
  {
    name: "Agra-Prayagraj",
    state: "Uttar Pradesh",
    x: 57,
    y: 43,
    opportunity: "High",
    score: 82,
    populationTrend: "+2.2% expressway and industrial demand",
    infrastructure: ["AKIC influence", "UP industrial nodes", "Expressway network"],
    landRate: "INR 90L-4.2 Cr / acre",
    flatRate: "INR 4,700-8,900 / sq ft",
    growthForecast: "+37% over 5 years",
    demandForecast: "Tourism, logistics, defence support and affordable housing demand",
    risk: "Title diligence and project-level delivery dispersion",
    report:
      "Agra-Prayagraj widens NEXA’s UP corridor lens beyond NCR. Strong picks should combine expressway access, employment catchments and liquid resale neighborhoods.",
  },
  {
    name: "Gaya",
    state: "Bihar",
    x: 72,
    y: 43,
    opportunity: "Moderate",
    score: 75,
    populationTrend: "+1.7% tourism and logistics-led growth",
    infrastructure: ["AKIC influence", "Eastern industrial access", "Tourism infrastructure"],
    landRate: "INR 55L-2.6 Cr / acre",
    flatRate: "INR 3,900-7,200 / sq ft",
    growthForecast: "+31% over 6 years",
    demandForecast: "Tourism, warehousing and regional housing demand",
    risk: "Lower liquidity and slower institutional absorption",
    report:
      "Gaya is an eastern patience-market node. NEXA should filter for access, title clarity and credible demand rather than just low entry price.",
  },
  {
    name: "Khurpia",
    state: "Uttarakhand",
    x: 54,
    y: 27,
    opportunity: "Moderate",
    score: 76,
    populationTrend: "+1.9% manufacturing support demand",
    infrastructure: ["North India industrial node", "Pantnagar-Rudrapur manufacturing belt", "Freight access"],
    landRate: "INR 80L-3.1 Cr / acre",
    flatRate: "INR 4,200-7,800 / sq ft",
    growthForecast: "+32% over 5 years",
    demandForecast: "Manufacturing, warehousing and workforce housing demand",
    risk: "Execution visibility and tenant depth need validation",
    report:
      "Khurpia gives the AI map a Himalayan foothill industrial node. The model should prioritize approved industrial land, utilities and road connectivity.",
  },
  {
    name: "Zaheerabad",
    state: "Telangana",
    x: 53,
    y: 63,
    opportunity: "High",
    score: 82,
    populationTrend: "+2.4% manufacturing and pharma spillover",
    infrastructure: ["HBIC", "Hyderabad industrial orbit", "Highway access"],
    landRate: "INR 75L-3.4 Cr / acre",
    flatRate: "INR 4,400-8,300 / sq ft",
    growthForecast: "+38% over 6 years",
    demandForecast: "Industrial land, warehousing and affordable workforce housing",
    risk: "Peripheral liquidity and project approval checks",
    report:
      "Zaheerabad is a Hyderabad-Bengaluru corridor trigger. NEXA should rank it highly only where access roads, approvals and employment signals are visible.",
  },
  {
    name: "Warangal",
    state: "Telangana",
    x: 61,
    y: 59,
    opportunity: "Moderate",
    score: 79,
    populationTrend: "+2.1% education and industrial growth",
    infrastructure: ["Hyderabad-Warangal Corridor", "Textile and manufacturing clusters", "Regional airport watch"],
    landRate: "INR 70L-2.9 Cr / acre",
    flatRate: "INR 4,100-7,800 / sq ft",
    growthForecast: "+33% over 5 years",
    demandForecast: "Education, manufacturing and family housing demand",
    risk: "Absorption can lag infrastructure announcements",
    report:
      "Warangal extends the Telangana industrial graph east of Hyderabad. NEXA should score projects by employment proximity, road access and depth of resale demand.",
  },
  {
    name: "Tumakuru",
    state: "Karnataka",
    x: 55,
    y: 77,
    opportunity: "High",
    score: 84,
    populationTrend: "+2.5% Bengaluru spillover and industrial growth",
    infrastructure: ["CBIC", "BMIC", "Industrial township", "Bengaluru logistics orbit"],
    landRate: "INR 1.0-4.8 Cr / acre",
    flatRate: "INR 4,800-9,200 / sq ft",
    growthForecast: "+39% over 5 years",
    demandForecast: "Industrial land, logistics and affordable housing demand",
    risk: "Timing risk and road-access quality",
    report:
      "Tumakuru is a strong Bengaluru spillover node. AI should reward industrial access, utility readiness and commute realism over speculative distance-only bets.",
  },
  {
    name: "Orvakal",
    state: "Andhra Pradesh",
    x: 61,
    y: 70,
    opportunity: "Moderate",
    score: 78,
    populationTrend: "+1.9% industrial and airport-linked growth",
    infrastructure: ["HBIC", "VCIC influence", "Airport and industrial park access"],
    landRate: "INR 55L-2.4 Cr / acre",
    flatRate: "INR 3,800-7,000 / sq ft",
    growthForecast: "+34% over 6 years",
    demandForecast: "Industrial, logistics and affordable plotted development demand",
    risk: "Patient capital required due to absorption timing",
    report:
      "Orvakal sits in the inland Andhra industrial story. NEXA should look for parcels with real access, approvals and a credible 7-year hold period.",
  },
  {
    name: "Koparthy",
    state: "Andhra Pradesh",
    x: 64,
    y: 75,
    opportunity: "Moderate",
    score: 77,
    populationTrend: "+1.8% electronics and industrial growth",
    infrastructure: ["VCIC influence", "Industrial park", "Rayalaseema logistics access"],
    landRate: "INR 50L-2.2 Cr / acre",
    flatRate: "INR 3,700-6,800 / sq ft",
    growthForecast: "+32% over 6 years",
    demandForecast: "Industrial allotment and workforce housing demand",
    risk: "Liquidity and tenant depth must be verified",
    report:
      "Koparthy gives NEXA a precise Andhra industrial node. The AI score should rise only when tenant interest, utilities and approach roads are confirmed.",
  },
  {
    name: "Krishnapatnam",
    state: "Andhra Pradesh",
    x: 67,
    y: 72,
    opportunity: "High",
    score: 81,
    populationTrend: "+2.1% port and industrial activity",
    infrastructure: ["VCIC", "Port logistics", "Industrial city influence"],
    landRate: "INR 75L-3.2 Cr / acre",
    flatRate: "INR 4,100-8,100 / sq ft",
    growthForecast: "+36% over 6 years",
    demandForecast: "Port logistics, industrial land and regional housing demand",
    risk: "Port-cycle timing and environmental diligence",
    report:
      "Krishnapatnam is a coastal logistics node with port-led upside. NEXA should model road access, industrial absorption and resilience before ranking land.",
  },
  {
    name: "Palakkad",
    state: "Kerala",
    x: 57,
    y: 88,
    opportunity: "Moderate",
    score: 78,
    populationTrend: "+1.8% manufacturing and logistics growth",
    infrastructure: ["CBIC-K extension", "Kerala industrial gateway", "Coimbatore-Kochi access"],
    landRate: "INR 80L-3.4 Cr / acre",
    flatRate: "INR 4,500-8,400 / sq ft",
    growthForecast: "+31% over 5 years",
    demandForecast: "Logistics, NRI, manufacturing and family housing demand",
    risk: "Land-use restrictions and water/flood diligence",
    report:
      "Palakkad connects Kerala’s industrial gateway with Coimbatore and Kochi. NEXA should screen land-use permissions, logistics access and long-term climate resilience.",
  },
];

export const lifestyleSignals = [
  { label: "Schools", value: 92, icon: GraduationCap },
  { label: "Hospitals", value: 87, icon: HeartPulse },
  { label: "Shopping", value: 81, icon: Home },
  { label: "Connectivity", value: 94, icon: TrainFront },
];

export const comparisonRows: ComparisonRow[] = [
  { metric: "5Y growth model", west: "+44%", northEast: "+37%", southEast: "+40%" },
  { metric: "Primary thesis", west: "Manufacturing + logistics", northEast: "Freight + inland industry", southEast: "Port-led industrial chain" },
  { metric: "Anchor catalyst", west: "DFC + DMIC nodes", northEast: "AKIC spine", southEast: "VCIC + OEC ports" },
  { metric: "Liquidity", west: "High", northEast: "Medium-high", southEast: "Medium-high" },
  { metric: "Risk load", west: "Entry price", northEast: "Execution timing", southEast: "Climate and port-cycle risk" },
];

export const portfolioAssets: PortfolioAsset[] = [
  {
    name: "Dholera SIR Watch",
    type: "DMIC land corridor",
    value: "INR 1.1 Cr",
    growth: "+34.2%",
    alert: "Trunk infrastructure and airport thesis strengthening",
  },
  {
    name: "Nagpur Logistics Core",
    type: "Central corridor watch",
    value: "INR 1.6 Cr",
    growth: "+27.5%",
    alert: "Delhi-Nagpur and Hyderabad-Nagpur overlap",
  },
  {
    name: "Vizag Port Belt",
    type: "VCIC/OEC opportunity",
    value: "INR 1.3 Cr",
    growth: "+22.8%",
    alert: "Port-led demand crossed NEXA trigger",
  },
];

export const aiRecommendations = [
  "Compare Dholera, Nagpur and Vizag for a 7-year national corridor land thesis.",
  "Find undervalued homes near CBIC, VCIC and HBIC job corridors with strong rental depth.",
  "Scan India-wide corridor nodes where infrastructure is funded but not fully priced in.",
];

export const platformPlans = [
  {
    name: "Explorer",
    monthlyPrice: "Free",
    annualPrice: "Free",
    period: "forever",
    description: "For buyers learning the market before committing capital.",
    usage: "5 AI briefs / month",
    features: ["3 district reports each month", "Basic India map layers", "1 saved comparison", "Community support"],
    cta: "Start exploring",
  },
  {
    name: "Investor",
    monthlyPrice: "INR 4,999",
    annualPrice: "INR 49,990",
    period: "per month",
    annualPeriod: "per year",
    annualSaving: "2 months included",
    description: "For active buyers and investors screening land and homes.",
    usage: "100 AI briefs / month",
    highlighted: true,
    features: ["All district intelligence reports", "10 market watchlists", "Weekly growth and risk alerts", "Full comparison engine"],
    cta: "Request investor pilot",
  },
  {
    name: "Professional",
    monthlyPrice: "INR 19,999",
    annualPrice: "INR 1,99,990",
    period: "per month",
    annualPeriod: "per year",
    annualSaving: "2 months included",
    description: "For advisors, boutique brokers and family-office analysts.",
    usage: "500 AI briefs / month",
    features: ["3 analyst seats", "100-asset portfolio tracking", "Builder and project intelligence", "PDF and spreadsheet exports"],
    cta: "Book a professional pilot",
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    annualPrice: "From INR 6L",
    period: "annual contract",
    annualPeriod: "per year",
    description: "For developers, funds, lenders and land acquisition teams.",
    usage: "Scoped usage and data rights",
    features: ["Private datasets and map layers", "Custom AI and approval workflows", "API, SSO and audit logs", "Onboarding, SLA and dedicated support"],
    cta: "Scope an enterprise plan",
  },
];

export const copilotPrompts = [
  "Where should I invest INR 1 crore across India’s industrial corridors?",
  "Which India corridor has the highest 7-year land growth probability?",
  "Compare DMIC, AKIC, VCIC and CBIC for long-term investment.",
];

export const moduleIcons = {
  legal: ShieldAlert,
  map: MapPinned,
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getDistrictBySlug(slug: string) {
  return districts.find((district) => slugify(district.name) === slug);
}
