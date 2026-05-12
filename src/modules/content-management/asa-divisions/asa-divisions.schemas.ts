import { z } from "zod";

export const createAsaDivisionBodySchema = z
  .object({
    divisionName: z.string().min(1, "divisionName is required"),
    asaOperationId: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateAsaDivisionBody = z.infer<typeof createAsaDivisionBodySchema>;

export const updateAsaDivisionBodySchema = z
  .object({
    divisionName: z.string().min(1, "divisionName is required"),
    asaOperationId: z.coerce.number().int().positive(),
  })
  .strict();

export type UpdateAsaDivisionBody = z.infer<typeof updateAsaDivisionBodySchema>;
