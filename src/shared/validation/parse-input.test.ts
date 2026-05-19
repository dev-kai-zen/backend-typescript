import { z } from "zod";
import { describe, expect, it } from "vitest";

import { parseInput } from "./parse-input";

const emailSchema = z.object({
  email: z.string().email("Invalid email"),
});

describe("parseInput", () => {
  it("returns parsed data when input is valid", () => {
    const result = parseInput(emailSchema, { email: "user@example.com" });
    expect(result).toEqual({ email: "user@example.com" });
  });

  it("throws with the first Zod issue message when input is invalid", () => {
    expect(() => parseInput(emailSchema, { email: "not-an-email" })).toThrow(
      "Invalid email",
    );
  });

});
