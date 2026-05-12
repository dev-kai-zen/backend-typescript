import { z } from "zod";

export const createAsaBranchBodySchema = z
  .object({
    branchCode: z.string().min(1, "branchCode is required"),
    branchName: z.string().min(1, "branchName is required"),
    asaAreaId: z.coerce.number().int().positive(),
    asaBranchTypeId: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateAsaBranchBody = z.infer<typeof createAsaBranchBodySchema>;

export const updateAsaBranchBodySchema = z
  .object({
    branchCode: z.string().min(1, "branchCode is required"),
    branchName: z.string().min(1, "branchName is required"),
    asaAreaId: z.coerce.number().int().positive(),
    asaBranchTypeId: z.coerce.number().int().positive(),
  })
  .strict();

export type UpdateAsaBranchBody = z.infer<typeof updateAsaBranchBodySchema>;
