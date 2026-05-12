import { z } from "zod";

export const createAsaAreaBodySchema = z
  .object({
    areaName: z.string().min(1, "areaName is required"),
    asaRegionId: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateAsaAreaBody = z.infer<typeof createAsaAreaBodySchema>;

export const updateAsaAreaBodySchema = z
  .object({
    areaName: z.string().min(1, "areaName is required"),
    asaRegionId: z.coerce.number().int().positive(),
  })
  .strict();

export type UpdateAsaAreaBody = z.infer<typeof updateAsaAreaBodySchema>;
