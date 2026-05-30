import { NextResponse } from "next/server";
import { districts } from "@/lib/platform-data";

export function GET() {
  return NextResponse.json({
    data: districts,
    meta: {
      count: districts.length,
      source: "sample-intelligence-dataset",
    },
  });
}
