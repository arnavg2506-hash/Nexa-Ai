import { NextResponse } from "next/server";
import { districts, intelligenceMeta } from "@/lib/platform-data";

export function GET() {
  return NextResponse.json({
    data: districts,
    meta: {
      count: districts.length,
      source: "sample-intelligence-dataset",
      ...intelligenceMeta,
    },
  }, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
