type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  nexaRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimits = globalRateLimit.nexaRateLimits ?? new Map<string, RateLimitEntry>();
const MAX_RATE_LIMIT_ENTRIES = 5_000;

if (process.env.NODE_ENV !== "production") {
  globalRateLimit.nexaRateLimits = rateLimits;
}

function pruneRateLimits(now: number) {
  if (rateLimits.size < 1_000) {
    return;
  }

  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) {
      rateLimits.delete(key);
    }
  }

  while (rateLimits.size >= MAX_RATE_LIMIT_ENTRIES) {
    const oldestKey = rateLimits.keys().next().value as string | undefined;
    if (!oldestKey) {
      break;
    }
    rateLimits.delete(oldestKey);
  }
}

export function takeRateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    pruneRateLimits(now);
    const resetAt = now + options.windowMs;
    rateLimits.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: options.limit - 1, resetAt };
  }

  if (current.count >= options.limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  rateLimits.set(key, current);
  return {
    allowed: true,
    remaining: Math.max(0, options.limit - current.count),
    resetAt: current.resetAt,
  };
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}
