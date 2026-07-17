import { NextResponse } from "next/server";
import {
  buildCopilotContext,
  fallbackCopilotAnswer,
  getOpenAIClient,
  getOpenAIModel,
} from "@/lib/ai";
import { getClientIp, takeRateLimit } from "@/lib/rate-limit";

type CopilotMessage = {
  role: "assistant" | "user";
  content: string;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 25_000) {
    return NextResponse.json({ error: "The request is too large." }, { status: 413 });
  }

  const rateLimit = takeRateLimit(`copilot:${getClientIp(request)}`, {
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  const responseHeaders = {
    "Cache-Control": "no-store",
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
  };

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "The copilot is receiving too many requests. Try again shortly." },
      { status: 429, headers: responseHeaders },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    messages?: CopilotMessage[];
    prompt?: string;
  } | null;
  const prompt = body?.prompt?.trim().slice(0, 2_000);
  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter(
          (message): message is CopilotMessage =>
            (message.role === "assistant" || message.role === "user") &&
            typeof message.content === "string" &&
            message.content.trim().length > 0 &&
            message.content.length <= 2_000,
        )
        .slice(-8)
    : [];

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400, headers: responseHeaders });
  }

  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json(fallbackCopilotAnswer(prompt, messages), { headers: responseHeaders });
  }

  try {
    const response = await client.responses.create({
      model: getOpenAIModel(),
      store: false,
      max_output_tokens: 700,
      reasoning: { effort: "none" },
      text: { verbosity: "medium" },
      input: [
        {
          role: "system",
          content:
            "You are NEXA AI, a calm, exacting real estate decision copilot for India. Lead with the decision frame, then the strongest evidence, material downside, unknowns and next verification step. Use only the supplied NEXA context for specific scores, rates, forecasts and infrastructure status. Clearly label all supplied figures as illustrative product-demo estimates. Never claim live government, registry, legal, builder or market verification unless the context explicitly says it is verified. Do not promise returns or replace legal, tax, valuation or financial diligence. If evidence is missing, say what must be verified instead of inventing it.",
        },
        {
          role: "user",
          content: [
            "NEXA context:",
            buildCopilotContext(prompt),
            "",
            "Conversation context:",
            ...messages.map((message) => `${message.role.toUpperCase()}: ${message.content.trim()}`),
            "",
            `Latest user request: ${prompt}`,
          ].join("\n"),
        },
      ],
    });

    return NextResponse.json(
      {
        answer: response.output_text || fallbackCopilotAnswer(prompt, messages).answer,
        prompt,
        source: "openai",
        model: response.model,
      },
      { headers: responseHeaders },
    );
  } catch {
    return NextResponse.json(
      { ...fallbackCopilotAnswer(prompt, messages), source: "fallback-after-provider-error" },
      { headers: responseHeaders },
    );
  }
}
