import OpenAI from "openai";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export function fallbackCopilotAnswer(prompt: string) {
  const normalized = prompt.toLowerCase();
  let answer =
    "NEXA ranks India-wide opportunities by national corridor adjacency, freight and port access, airport influence, entry price, liquidity, rental demand, title risk, and 5-7 year growth probability. Start with a corridor shortlist, then validate land title, trunk infrastructure, employment catchment, utilities and exit liquidity before committing capital.";

  if (
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
    answer,
    prompt,
    source: "deterministic-fallback",
  };
}
