import { z } from "zod";

export const createAsaBranchTypeBodySchema = z
  .object({
    typeName: z.string().min(1, "typeName is required"),
  })
  .strict();

export type CreateAsaBranchTypeBody = z.infer<
  typeof createAsaBranchTypeBodySchema
>;

export const updateAsaBranchTypeBodySchema = z
  .object({
    typeName: z.string().min(1, "typeName is required"),
  })
  .strict();

export type UpdateAsaBranchTypeBody = z.infer<
  typeof updateAsaBranchTypeBodySchema
>;
