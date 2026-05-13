import rateLimit from "express-rate-limit";

import { env } from "../../config/env-config";

const tooManyRequests = (message: string) => ({
  success: false as const,
  message,
});

/**
 * Stricter limit for credential-bearing routes (login, refresh).
 * Tuned against brute-force / token stuffing; override via `RATE_LIMIT_AUTH_*`.
 */
export const authLimiter = rateLimit({
  windowMs: env.rateLimitAuthWindowMs,
  limit: env.rateLimitAuthMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooManyRequests(
    "Too many authentication attempts. Please try again later.",
  ),
});

/**
 * Default cap for `/api/v1`. Mount once on that prefix; stricter `authLimiter`
 * stacks on specific routes. Override via `RATE_LIMIT_API_*`.
 */
export const apiLimiter = rateLimit({
  windowMs: env.rateLimitApiWindowMs,
  limit: env.rateLimitApiMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: tooManyRequests("Too many requests. Please try again later."),
});
