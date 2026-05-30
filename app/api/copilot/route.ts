import { NextResponse } from "next/server";
import { fallbackCopilotAnswer, getOpenAIClient } from "@/lib/ai";

type CopilotMessage = {
  role: "assistant" | "user";
  content: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    messages?: CopilotMessage[];
    prompt?: string;
  } | null;
  const prompt = body?.prompt?.trim();
  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter(
          (message): message is CopilotMessage =>
            (message.role === "assistant" || message.role === "user") &&
            typeof message.content === "string" &&
            message.content.trim().length > 0,
        )
        .slice(-8)
    : [];

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json(fallbackCopilotAnswer(prompt));
  }

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "You are NEXA AI, a premium real estate intelligence copilot for India. Compare land, homes, districts, builders, growth, demand, liquidity, infrastructure, and risk across India’s national corridor graph: DMIC, AKIC, CBIC, VCIC, HNIC, HWIC, HBIC, OEC, BMIC, CBIC-K and DNIC. Keep responses concise, analytical, and investment-oriented. Do not provide legal or financial guarantees.",
      },
      {
        role: "user",
        content: [
          "Conversation context:",
          ...messages.map((message) => `${message.role.toUpperCase()}: ${message.content.trim()}`),
          "",
          `Latest user request: ${prompt}`,
        ].join("\n"),
      },
    ],
  });

  return NextResponse.json({
    answer: response.output_text,
    prompt,
    source: "openai",
  });
}
