import { z } from "zod";

const nullableTrimmedString = z
  .union([z.string(), z.null()])
  .optional()
  .transform((v) => {
    if (v === undefined || v === null) {
      return null;
    }
    const t = v.trim();
    return t === "" ? null : t;
  });

export const createUserBodySchema = z
  .object({
    email: z.string().trim().min(1, "email is required"),
    googleId: nullableTrimmedString,
    fullName: nullableTrimmedString,
    pictureUrl: nullableTrimmedString,
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
    email: z.string().trim().min(1, "email cannot be empty").optional(),
    googleId: nullableTrimmedString,
    fullName: nullableTrimmedString,
    pictureUrl: nullableTrimmedString,
    isActive: z.boolean().optional(),
    lastLoginAt: lastLoginAtField.optional(),
  })
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
