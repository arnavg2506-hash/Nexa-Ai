import OpenAI from "openai";
import { districts, intelligenceMeta, nationalCorridors } from "@/lib/platform-data";

export const DEFAULT_OPENAI_MODEL = "gpt-5.6-terra";

type ConversationMessage = {
  role: "assistant" | "user";
  content: string;
};

const districtAliases: Record<string, string[]> = {
  "Delhi NCR": ["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida", "faridabad", "ghaziabad"],
  "Mumbai-Panvel": ["mumbai", "bombay", "navi mumbai", "panvel"],
  Bengaluru: ["bangalore", "bengaluru"],
  Visakhapatnam: ["visakhapatnam", "vizag"],
  Kolkata: ["kolkata", "calcutta"],
  Kochi: ["kochi", "cochin"],
  "Rajpura-Patiala": ["rajpura", "patiala"],
  "Jodhpur-Pali": ["jodhpur", "pali"],
  "Shendra-Bidkin": ["shendra", "bidkin", "aurangabad", "chhatrapati sambhajinagar"],
  "Agra-Prayagraj": ["agra", "prayagraj", "allahabad"],
  Koparthy: ["koparthy", "kopparthy"],
};

function districtSearchTerms(districtName: string) {
  return [districtName, ...(districtAliases[districtName] ?? [])];
}

function mentionsDistrict(normalized: string, districtName: string) {
  return districtSearchTerms(districtName).some((candidate) =>
    normalized.includes(candidate.toLowerCase()),
  );
}

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({
    apiKey,
    maxRetries: 1,
    timeout: 25_000,
  });
}

export function getOpenAIModel() {
  return process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL;
}

export function buildCopilotContext(prompt: string) {
  const normalized = prompt.toLowerCase();
  const matchedDistricts = districts.filter((district) => {
    const candidates = [
      ...districtSearchTerms(district.name),
      district.state,
      ...district.infrastructure,
    ];
    return candidates.some((candidate) => normalized.includes(candidate.toLowerCase()));
  });
  const matchedCorridors = nationalCorridors.filter((corridor) =>
    [corridor.name, corridor.shortName, ...corridor.nodes].some((candidate) =>
      normalized.includes(candidate.toLowerCase()),
    ),
  );
  const districtContext = (matchedDistricts.length > 0
    ? matchedDistricts
    : districts.filter((district) => district.opportunity === "High").slice(0, 6)
  ).slice(0, 8);
  const corridorContext = (matchedCorridors.length > 0 ? matchedCorridors : nationalCorridors).slice(0, 6);

  return JSON.stringify({
    disclosure: intelligenceMeta,
    districts: districtContext.map((district) => ({
      name: district.name,
      state: district.state,
      score: district.score,
      opportunity: district.opportunity,
      growthForecast: district.growthForecast,
      demandForecast: district.demandForecast,
      risk: district.risk,
      infrastructure: district.infrastructure,
    })),
    corridors: corridorContext.map((corridor) => ({
      name: corridor.name,
      shortName: corridor.shortName,
      nodes: corridor.nodes,
      thesis: corridor.thesis,
    })),
  });
}

export function fallbackCopilotAnswer(prompt: string, messages: ConversationMessage[] = []) {
  const conversation = [...messages.map((message) => message.content), prompt].join("\n");
  const normalized = conversation.toLowerCase();
  const latestPrompt = prompt.toLowerCase();
  const mentionedDistricts = districts
    .filter((district) => mentionsDistrict(normalized, district.name))
    .slice(0, 4);
  let answer =
    "NEXA ranks India-wide opportunities by national corridor adjacency, freight and port access, airport influence, entry price, liquidity, rental demand, title risk, and 5-7 year growth probability. Start with a corridor shortlist, then validate land title, trunk infrastructure, employment catchment, utilities and exit liquidity before committing capital.";

  if (mentionedDistricts.length >= 2) {
    const ranked = [...mentionedDistricts].sort((left, right) => right.score - left.score);
    const asksAboutRisk = /\b(safer|lower risk|less risky|riskier|execution risk)\b/.test(latestPrompt);
    const comparison = mentionedDistricts
      .map(
        (district) =>
          `${district.name}: NEXA score ${district.score}/100, ${district.growthForecast}, ${district.demandForecast.toLowerCase()}. Key risk: ${district.risk.toLowerCase()}.`,
      )
      .join("\n\n");

    const comparesDelhiAndHyderabad = mentionedDistricts.some((district) => district.name === "Delhi NCR")
      && mentionedDistricts.some((district) => district.name === "Hyderabad");
    const conclusion = asksAboutRisk && comparesDelhiAndHyderabad
      ? "For an established home around INR 1 crore, Hyderabad is the cleaner execution-risk starting point because entry pricing is more forgiving. For land or peripheral plots, neither market earns a lower-risk label until title, access and approvals are verified; Delhi NCR carries higher entry-price and title complexity, while Hyderabad carries peripheral approval risk."
      : asksAboutRisk
        ? "There is no responsible blanket lower-risk winner without the asset type and micro-market. Compare the stated risk conditions, then verify title, approvals, access, liquidity and exact entry price before ranking them."
        : `Within the illustrative model, ${ranked[0].name} leads on composite score. The stronger choice still depends on asset type, entry price, holding period and the evidence available for the exact parcel or project.`;

    answer = `${comparison}\n\n${conclusion}`;
  } else if (mentionedDistricts.length === 1) {
    const [district] = mentionedDistricts;
    answer = `${district.name}, ${district.state}, has an illustrative NEXA score of ${district.score}/100 and a ${district.opportunity.toLowerCase()} opportunity rating. The current model shows ${district.growthForecast.toLowerCase()} with ${district.demandForecast.toLowerCase()}. Infrastructure signals include ${district.infrastructure.join(", ")}. The central downside is ${district.risk.toLowerCase()}.`;
  } else if (/^(hi|hello|hey|namaste)\b/.test(normalized)) {
    answer =
      "Hello. Give me a budget, target geography, asset type and holding period. I can compare up to four NEXA districts, explain corridor exposure, surface the model's downside conditions and turn your mandate into a verification checklist.";
  } else if (
    normalized.includes("dmic") ||
    normalized.includes("akic") ||
    normalized.includes("vcic") ||
    normalized.includes("cbic") ||
    normalized.includes("east coast") ||
    normalized.includes("oec")
  ) {
    answer =
      "DMIC is the strongest western manufacturing and logistics spine, with Dholera, Ahmedabad, Shendra-Bidkin and Mumbai-Panvel as priority nodes. AKIC gives a long North-to-East freight thesis through Punjab, UP, Bihar and Kolkata. VCIC/OEC carry the port-led East Coast thesis around Vizag, Bhubaneswar, Krishnapatnam and Chennai, while CBIC/HBIC connect Bengaluru, Hyderabad and Chennai. For risk-adjusted growth, NEXA would rank DMIC first, CBIC/HBIC for rental-and-jobs depth, then VCIC/OEC for patient port-led upside.";
  } else if (normalized.includes("1 crore") || normalized.includes("1cr") || normalized.includes("₹1") || normalized.includes("inr 1")) {
    answer =
      "For around INR 1 crore across India, NEXA would shortlist Dholera for patient DMIC land upside, Nagpur for central logistics overlap, Vizag or Krishnapatnam for VCIC port-led appreciation, and Coimbatore/Palakkad for lower-risk manufacturing-city housing. The decision should depend on holding period: land needs 7+ years; homes need rental depth and clear resale liquidity.";
  } else if (normalized.includes("land") || normalized.includes("plot")) {
    answer =
      "For land and plots across India, NEXA prioritizes verified infrastructure triggers over hype: industrial corridor nodes, DFC influence, ports, airports, logistics parks, utilities and title clarity. Dholera, Shendra-Bidkin, Nagpur, Vizag, Zaheerabad and Tumakuru rank well for long-horizon upside, but only where access and approvals are real.";
  } else if (normalized.includes("builder") || normalized.includes("project")) {
    answer =
      "For builders and projects, NEXA checks delivery history, litigation signals, debt stress, resale performance, construction stage, and buyer concentration. A lower-priced project from a weak builder can destroy returns; a premium builder near strong infrastructure often wins on liquidity and risk-adjusted appreciation.";
  } else if (normalized.includes("highest future growth") || normalized.includes("double") || normalized.includes("growth")) {
    answer =
      "Highest growth probability usually comes from markets where national infrastructure is funded, visible and not fully priced in. NEXA would shortlist Dholera and Shendra-Bidkin on DMIC, Nagpur at central corridor overlap, Vizag/Krishnapatnam on VCIC, and Bengaluru-Chennai CBIC nodes, then reject locations with weak liquidity, unclear title, poor utilities or execution risk.";
  }

  return {
    answer: `${answer} These are illustrative NEXA model signals, not live records or guaranteed returns; verify current project status, title, approvals and market evidence before acting.`,
    prompt,
    source: "deterministic-fallback",
  };
}
