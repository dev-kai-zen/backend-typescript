import { z } from "zod";

export const listRefreshTokensQuerySchema = z
  .object({
    userId: z.string().optional(),
  })
  .strict()
  .transform((q) => {
    let userId: number | undefined;
    const raw =
      typeof q.userId === "string" ? q.userId.trim() : "";
    if (raw !== "") {
      const n = Number.parseInt(raw, 10);
      if (Number.isFinite(n)) {
        userId = n;
      }
    }
    return { userId };
  });

export const createRefreshTokenBodySchema = z
  .object({
    userId: z.coerce.number().int().positive(),
    token: z.string().min(1).max(512),
    expiresAt: z
      .string()
      .refine((s) => !Number.isNaN(Date.parse(s)), {
        message: "expiresAt must be a valid ISO date string",
      })
      .transform((s) => new Date(s)),
  })
  .strict();

export const revokeRefreshTokenBodySchema = z
  .object({
    token: z.string().min(1).max(512),
  })
  .strict();
