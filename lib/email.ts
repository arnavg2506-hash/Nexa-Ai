import "server-only";

import { createHash } from "node:crypto";
import { Resend } from "resend";
import { AccessRequestEmail } from "@/components/email/access-request-email";
import type { AccessRequest } from "@/lib/access-request";

export function getEmailReadiness() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  const to = process.env.NEXA_EMAIL_TO?.trim();

  return {
    configured: Boolean(apiKey && from && to),
    apiKey,
    from,
    to,
  };
}

export async function sendAccessRequestEmail(request: AccessRequest, requestId: string) {
  const config = getEmailReadiness();

  if (!config.configured || !config.apiKey || !config.from || !config.to) {
    return { sent: false as const, reason: "not-configured" as const };
  }

  const resend = new Resend(config.apiKey);
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
  const requestHash = createHash("sha256")
    .update([request.email, request.interest, request.location, request.message].join("|"))
    .digest("hex")
    .slice(0, 32);

  const response = await resend.emails.send(
    {
      from: config.from,
      to: [config.to],
      replyTo: request.email,
      subject: `NEXA briefing / ${request.interest} / ${request.location}`.slice(0, 140),
      react: AccessRequestEmail({ request, requestId, submittedAt }),
      tags: [
        { name: "workflow", value: "private-briefing" },
        { name: "interest", value: request.interest.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      ],
    },
    { idempotencyKey: `nexa-briefing-${requestHash}` },
  );

  if (response.error) {
    return { sent: false as const, reason: "provider-error" as const };
  }

  return { sent: true as const, id: response.data?.id ?? requestId };
}
