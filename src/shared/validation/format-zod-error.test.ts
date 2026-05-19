import { z } from "zod";
import { describe, expect, it } from "vitest";

import { formatZodError } from "./format-zod-error";

describe("formatZodError", () => {
  it("returns the first issue message", () => {
    const result = z.string().min(3).safeParse("ab");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(formatZodError(result.error)).toMatch(/at least 3/i);
    }
  });

  it("falls back when there are no issues", () => {
    const error = new z.ZodError([]);
    expect(formatZodError(error)).toBe("Invalid request body");
  });
});
