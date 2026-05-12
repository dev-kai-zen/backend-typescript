import { z } from "zod";

export const createAsaOperationBodySchema = z
  .object({
    operationName: z.string().min(1, "operationName is required"),
  })
  .strict();

export type CreateAsaOperationBody = z.infer<typeof createAsaOperationBodySchema>;

export const updateAsaOperationBodySchema = z
  .object({
    operationName: z.string().min(1, "operationName is required"),
  })
  .strict();

export type UpdateAsaOperationBody = z.infer<typeof updateAsaOperationBodySchema>;
