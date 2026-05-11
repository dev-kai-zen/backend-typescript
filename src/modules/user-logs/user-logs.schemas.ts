import { z } from "zod";

const nullableString = z.union([z.string(), z.null()]).optional();

/**
 * Parsed query matching previous behavior: unknown / invalid numeric queries are ignored
 * instead of rejecting the whole request (except malformed query object via strict).
 */
export const listUserLogsQuerySchema = z
  .object({
    userId: z.string().optional(),
    action: z.string().optional(),
    module: z.string().optional(),
    limit: z.string().optional(),
    offset: z.string().optional(),
  })
  .strict()
  .transform((q) => {
    let userId: number | undefined;
    const rawUserId = typeof q.userId === "string" ? q.userId.trim() : "";
    if (rawUserId !== "") {
      const n = Number.parseInt(rawUserId, 10);
      if (Number.isFinite(n)) {
        userId = n;
      }
    }

    const action =
      typeof q.action === "string" && q.action.trim() !== ""
        ? q.action.trim()
        : undefined;
    const moduleName =
      typeof q.module === "string" && q.module.trim() !== ""
        ? q.module.trim()
        : undefined;

    let limit: number | undefined;
    if (typeof q.limit === "string" && q.limit !== "") {
      const n = Number.parseInt(q.limit, 10);
      if (Number.isFinite(n) && n >= 0) {
        limit = n;
      }
    }

    let offset: number | undefined;
    if (typeof q.offset === "string" && q.offset !== "") {
      const n = Number.parseInt(q.offset, 10);
      if (Number.isFinite(n) && n >= 0) {
        offset = n;
      }
    }

    return {
      userId,
      action,
      module: moduleName,
      limit,
      offset,
    };
  });

export type ListUserLogsQuery = z.infer<typeof listUserLogsQuerySchema>;

export const createUserLogBodySchema = z
  .object({
    action: z
      .string()
      .min(1, "action is required")
      .transform((s) => s.trim())
      .refine((s) => s.length > 0, { message: "action is required" }),
    userId: z.union([z.coerce.number().finite(), z.null()]).optional(),
    module: nullableString,
    description: nullableString,
    method: nullableString,
    route: nullableString,
    statusCode: z.union([z.coerce.number().finite(), z.null()]).optional(),
    ipAddress: nullableString,
    userAgent: nullableString,
    deviceType: nullableString,
    browser: nullableString,
    os: nullableString,
    sessionId: nullableString,
    metadata: z.record(z.unknown()).nullable().optional(),
  })
  .strict();

export type CreateUserLogBody = z.infer<typeof createUserLogBodySchema>;
