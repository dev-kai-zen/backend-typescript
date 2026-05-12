import { z } from "zod";

export const createCategoryBodySchema = z
  .object({
    categoryName: z.string().min(1, "categoryName is required"),
  })
  .strict();

export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>;

export const updateCategoryBodySchema = z
  .object({
    categoryName: z.string().min(1, "categoryName is required"),
  })
  .strict();

export type UpdateCategoryBody = z.infer<typeof updateCategoryBodySchema>;
