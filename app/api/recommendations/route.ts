import { NextResponse } from "next/server";
import { aiRecommendations, portfolioAssets } from "@/lib/platform-data";

export function GET() {
  return NextResponse.json({
    recommendations: aiRecommendations,
    watchlist: portfolioAssets,
    workflow: [
      "Parse buyer mandate",
      "Classify asset class",
      "Score district fundamentals",
      "Model infrastructure impact",
      "Rank risk-adjusted opportunities",
      "Generate investment memo",
    ],
  });
}
