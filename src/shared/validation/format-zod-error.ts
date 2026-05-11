import type { ZodError } from "zod";

export function formatZodError(error: ZodError): string {
  const issue = error.issues[0];
  return issue?.message ?? "Invalid request body";
}
