import { z } from "zod";

export const createRolePermissionBodySchema = z
  .object({
    permissionId: z.coerce
      .number()
      .int()
      .positive({ message: "permissionId must be a positive integer" }),
  })
  .strict();

export type CreateRolePermissionBody = z.infer<
  typeof createRolePermissionBodySchema
>;
