import { z } from "zod";

/** String or explicit null from JSON (`"field": null`). */
const nullableString = z.union([z.string(), z.null()]);

export const createUserBodySchema = z
  .object({
    email: z.string().min(1),
    googleId: nullableString.optional(),
    fullName: nullableString.optional(),
    pictureUrl: nullableString.optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

const lastLoginAtField = z
  .union([
    z.null(),
    z.literal(""),
    z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "lastLoginAt must be a valid ISO date",
    }),
  ])
  .transform((v): Date | null => (v === null || v === "" ? null : new Date(v)));

export const updateUserBodySchema = z
  .object({
    email: z.string().min(1),
    googleId: nullableString,
    fullName: nullableString,
    pictureUrl: nullableString,
    isActive: z.boolean(),
    lastLoginAt: lastLoginAtField,
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

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
