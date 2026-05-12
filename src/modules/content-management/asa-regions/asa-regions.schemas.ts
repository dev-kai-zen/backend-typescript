import { z } from "zod";

export const createAsaRegionBodySchema = z
  .object({
    regionName: z.string().min(1, "regionName is required"),
    asaDivisionId: z.coerce.number().int().positive(),
  })
  .strict();

export type CreateAsaRegionBody = z.infer<typeof createAsaRegionBodySchema>;

export const updateAsaRegionBodySchema = z
  .object({
    regionName: z.string().min(1, "regionName is required"),
    asaDivisionId: z.coerce.number().int().positive(),
  })
  .strict();

export type UpdateAsaRegionBody = z.infer<typeof updateAsaRegionBodySchema>;
