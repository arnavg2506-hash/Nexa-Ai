export type Feature = {
  title: string;
  description: string;
  signal: string;
  icon: "search" | "radar" | "trend" | "shield" | "deal" | "map";
};

export type Hotspot = {
  city: string;
  tag: string;
  x: number;
  y: number;
  growth: string;
  thesis: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  level: number;
  tone: "signal" | "volt" | "iris" | "ember";
};

export type WorkflowStep = {
  step: string;
  title: string;
  copy: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  portfolio: string;
};

export type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const features: Feature[] = [
  {
    title: "AI Property Hunter",
    description:
      "Autonomous agents track new launches, owner listings, resale inventory, and private mandates before they hit the obvious portals.",
    signal: "14,280 sources live",
    icon: "search",
  },
  {
    title: "Hidden Deal Finder",
    description:
      "Compares micro-market pricing, distress signals, supply pressure, and seller timing to identify undervalued opportunities.",
    signal: "7.4 percent alpha spotted",
    icon: "radar",
  },
  {
    title: "AI Price Intelligence",
    description:
      "Forecasts future appreciation using demand velocity, infra timelines, rental depth, and premium absorption patterns.",
    signal: "2030 forecast active",
    icon: "trend",
  },
  {
    title: "Builder Risk Scanner",
    description:
      "Flags delivery delays, litigation exposure, debt stress, approval gaps, and reputation anomalies across developer history.",
    signal: "92 risk vectors",
    icon: "shield",
  },
  {
    title: "AI Negotiator",
    description:
      "Builds a negotiation brief with comparable sales, urgency cues, concession paths, and a data-backed offer range.",
    signal: "INR 48L saved avg",
    icon: "deal",
  },
  {
    title: "Area Future Score",
    description:
      "Projects infrastructure growth from metro lines, airports, coastal roads, tech parks, schools, and luxury demand migration.",
    signal: "18-year area model",
    icon: "map",
  },
];

export const hotspots: Hotspot[] = [
  {
    city: "North Goa",
    tag: "Luxury rental compression",
    x: 20,
    y: 58,
    growth: "+31%",
    thesis:
      "Villa inventory is thin, short-stay yields are resilient, and premium buyers are shifting inland toward gated privacy.",
  },
  {
    city: "Mopa Corridor",
    tag: "Airport-led repricing",
    x: 28,
    y: 42,
    growth: "+44%",
    thesis:
      "Airport connectivity, hospitality land banking, and arterial road upgrades are creating a long-cycle appreciation band.",
  },
  {
    city: "Navi Mumbai",
    tag: "Infra convergence",
    x: 62,
    y: 37,
    growth: "+28%",
    thesis:
      "Airport operations, trans-harbour links, and office demand are compressing the gap with established Mumbai premiums.",
  },
  {
    city: "Whitefield Edge",
    tag: "Tech wealth expansion",
    x: 70,
    y: 68,
    growth: "+24%",
    thesis:
      "A new executive rental class is forming around larger-format homes near schools, offices, and high-speed transit.",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Property Score",
    value: "94",
    detail: "Institutional-grade fit",
    level: 94,
    tone: "volt",
  },
  {
    label: "Risk Score",
    value: "18",
    detail: "Low delivery exposure",
    level: 18,
    tone: "signal",
  },
  {
    label: "Appreciation Forecast",
    value: "31%",
    detail: "5-year model",
    level: 79,
    tone: "iris",
  },
  {
    label: "Rental Yield",
    value: "8.6%",
    detail: "Short-stay adjusted",
    level: 86,
    tone: "ember",
  },
  {
    label: "Builder Trust Rating",
    value: "A+",
    detail: "43 completed assets",
    level: 91,
    tone: "volt",
  },
];

export const workflow: WorkflowStep[] = [
  {
    step: "01",
    title: "User Request",
    copy: "Natural-language mandate with lifestyle, yield, risk, budget, and holding-period constraints.",
  },
  {
    step: "02",
    title: "AI Research",
    copy: "Agents crawl listings, broker networks, developer inventory, documents, and market signals.",
  },
  {
    step: "03",
    title: "Market Analysis",
    copy: "Comparables, absorption, rental yield, scarcity, demand migration, and price elasticity are modeled.",
  },
  {
    step: "04",
    title: "Risk Detection",
    copy: "Builder, title, approvals, litigation, flood, debt, and delivery risks are scored before shortlisting.",
  },
  {
    step: "05",
    title: "Negotiation",
    copy: "Offer bands, concession strategy, and walk-away thresholds are generated for the buyer.",
  },
  {
    step: "06",
    title: "Recommendation",
    copy: "The final brief ranks the strongest opportunities with evidence, forecasts, and action steps.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "NEXA found a villa opportunity our family office had dismissed. The AI surfaced a road expansion and rental-supply mismatch that changed the entire investment case.",
    name: "Aarav Malhotra",
    role: "Partner, Malhotra Capital",
    portfolio: "INR 420 Cr real asset portfolio",
  },
  {
    quote:
      "The negotiation brief was sharper than what we usually receive from private bankers. It gave us leverage without making the process feel mechanical.",
    name: "Meera Rao",
    role: "Founder, Meridian Luxe",
    portfolio: "Cross-border luxury investor",
  },
  {
    quote:
      "We use it as a second brain for acquisition committee meetings. Every shortlist arrives with downside logic, not just glossy upside.",
    name: "Rohan Sethi",
    role: "Managing Director, Westline Holdings",
    portfolio: "Hospitality and villas",
  },
];

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "INR 29K",
    description: "For serious buyers evaluating one premium purchase.",
    features: [
      "5 AI property mandates",
      "Area Future Score",
      "ROI and rental yield forecast",
      "Basic builder risk scan",
      "Concierge shortlist export",
    ],
  },
  {
    name: "Professional",
    price: "INR 99K",
    description: "For founders, CXOs, and advisors comparing multiple markets.",
    highlighted: true,
    features: [
      "Unlimited AI mandates",
      "Hidden Deal Finder",
      "Full risk intelligence",
      "AI negotiation brief",
      "Priority analyst review",
    ],
  },
  {
    name: "Investor Elite",
    price: "Custom",
    description: "For family offices and luxury asset acquisition teams.",
    features: [
      "Private inventory watchlist",
      "Multi-city acquisition pipeline",
      "Dedicated deal intelligence desk",
      "Portfolio-level risk modeling",
      "White-glove mandate support",
    ],
  },
];
