import type { ZodTypeAny, infer as ZodInfer } from "zod";

/**
 * Parse and validate input with a Zod schema. Throws a plain `Error` with a readable message.
 * Use in controllers after you decide to validate (controllers own Zod).
 */
export function parseInput<TSchema extends ZodTypeAny>(
  schema: TSchema,
  input: unknown,
): ZodInfer<TSchema> {
  const result = schema.safeParse(input);

  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(issue?.message ?? "Validation failed");
  }

  return result.data;
}
