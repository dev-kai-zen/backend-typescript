import { z } from "zod";

export const googleLoginBodySchema = z
  .object({
    googleToken: z.string().trim().min(1, "Google Token is required"),
  })
  .strict();

export type GoogleLoginBody = z.infer<typeof googleLoginBodySchema>;
