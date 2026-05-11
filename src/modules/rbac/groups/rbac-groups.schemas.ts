import { z } from "zod";

export const createGroupBodySchema = z
  .object({
    groupName: z.string().min(1, "groupName is required"),
  })
  .strict();

export type CreateGroupBody = z.infer<typeof createGroupBodySchema>;

export const updateGroupBodySchema = z
  .object({
    groupName: z.string().min(1, "groupName is required"),
  })
  .strict();

export type UpdateGroupBody = z.infer<typeof updateGroupBodySchema>;
