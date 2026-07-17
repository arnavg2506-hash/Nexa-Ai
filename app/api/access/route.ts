import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { parseAccessRequest } from "@/lib/access-request";
import { getEmailReadiness, sendAccessRequestEmail } from "@/lib/email";
import { getClientIp, takeRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;

function response(body: Record<string, unknown>, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return response({ error: "This request must come from the NEXA application." }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response({ error: "The request is too large." }, 413);
  }

  const clientIp = getClientIp(request);
  const rateLimit = takeRateLimit(`access:${clientIp}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  const rateHeaders = {
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
  };

  if (!rateLimit.allowed) {
    return response({ error: "Too many requests. Try again in a few minutes." }, 429, rateHeaders);
  }

  const body = await request.json().catch(() => null);
  const parsed = parseAccessRequest(body);

  if (!parsed.ok) {
    return response({ error: parsed.error }, 400, rateHeaders);
  }

  if (parsed.honeypot) {
    return response({ success: true, delivery: "accepted" }, 200, rateHeaders);
  }

  const requestId = `NX-${randomUUID().slice(0, 8).toUpperCase()}`;
  const readiness = getEmailReadiness();

  if (!readiness.configured) {
    if (process.env.NODE_ENV === "production") {
      return response(
        { error: "Private briefings are temporarily unavailable. Please try again shortly." },
        503,
        rateHeaders,
      );
    }

    return response(
      {
        success: true,
        delivery: "preview",
        requestId,
        message: "Request validated. Add Resend environment variables to deliver it.",
      },
      200,
      rateHeaders,
    );
  }

  try {
    const delivery = await sendAccessRequestEmail(parsed.data, requestId);

    if (!delivery.sent) {
      return response(
        { error: "We could not deliver the request. Please try again." },
        502,
        rateHeaders,
      );
    }

    return response(
      {
        success: true,
        delivery: "sent",
        requestId,
        message: "Your private briefing request has been delivered.",
      },
      200,
      rateHeaders,
    );
  } catch {
    return response(
      { error: "We could not deliver the request. Please try again." },
      502,
      rateHeaders,
    );
  }
}
