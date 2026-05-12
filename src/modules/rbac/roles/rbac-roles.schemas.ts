import { z } from "zod";

const nullableString = z.union([z.string(), z.null()]);

export const createRoleBodySchema = z
  .object({
    roleName: z.string().min(1, "roleName is required"),
    roleDescription: nullableString.optional(),
  })
  .strict();

export type CreateRoleBody = z.infer<typeof createRoleBodySchema>;

export const updateRoleBodySchema = z
  .object({
    roleName: z.string().min(1),
    roleDescription: nullableString,
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

export type UpdateRoleBody = z.infer<typeof updateRoleBodySchema>;
