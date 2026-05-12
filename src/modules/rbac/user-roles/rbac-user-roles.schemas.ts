import { z } from "zod";

export const createUserRoleBodySchema = z
  .object({
    roleId: z.coerce
      .number()
      .int()
      .positive({ message: "roleId must be a positive integer" }),
    assignedBy: z.coerce
      .number()
      .int()
      .positive({ message: "assignedBy must be a positive integer" }),
  })
  .strict();

export type CreateUserRoleBody = z.infer<typeof createUserRoleBodySchema>;

export const setUserRolesBodySchema = z
  .object({
    roleIds: z.array(
      z.coerce
        .number()
        .int()
        .positive({ message: "each role id must be a positive integer" }),
    ),
    assignedBy: z.coerce
      .number()
      .int()
      .positive({ message: "assignedBy must be a positive integer" }),
  })
  .strict();

export type SetUserRolesBody = z.infer<typeof setUserRolesBodySchema>;
