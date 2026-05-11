import { z } from "zod";

const nullableString = z.union([z.string(), z.null()]);

/** Query: optional filter; invalid or empty string behaves like omitted (matches previous controller behavior). */
export const listPermissionsQuerySchema = z
  .object({
    groupId: z.union([z.string(), z.undefined()]).optional(),
  })
  .strict()
  .transform(({ groupId }) => {
    if (typeof groupId !== "string" || groupId.trim() === "") {
      return { groupId: undefined as number | undefined };
    }
    const n = Number.parseInt(groupId.trim(), 10);
    return {
      groupId: Number.isFinite(n) ? n : undefined,
    };
  });

export type ListPermissionsQuery = z.infer<typeof listPermissionsQuerySchema>;

export const createPermissionBodySchema = z
  .object({
    permissionCode: z.string().min(1, "permissionCode is required"),
    permissionDescription: nullableString.optional(),
    groupId: z.union([z.coerce.number().int().nonnegative(), z.null()]).optional(),
  })
  .strict();

export type CreatePermissionBody = z.infer<typeof createPermissionBodySchema>;

export const updatePermissionBodySchema = z
  .object({
    permissionCode: z.string().min(1),
    permissionDescription: nullableString,
    groupId: z.union([z.coerce.number().int().nonnegative(), z.null()]),
  })
  .partial()
  .strict()
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No fields to update",
        path: [],
      });
    }
  });

export type UpdatePermissionBody = z.infer<typeof updatePermissionBodySchema>;
