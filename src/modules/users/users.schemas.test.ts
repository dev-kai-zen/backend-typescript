/** Example tests for users.schemas — full guide: docs/how-to-create-test-file.md */

import { describe, expect, it } from "vitest";

import { createUserBodySchema, updateUserBodySchema } from "./users.schemas";

// --- Example 1: group tests for one schema -----------------------------------

describe("createUserBodySchema", () => {
  // Happy path: valid input should parse successfully
  it("accepts a minimal valid body", () => {
    const result = createUserBodySchema.safeParse({
      email: "user@example.com",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
      expect(result.data.isActive).toBeUndefined();
    }
  });

  // Sad path: invalid input → success is false, check error message
  it("rejects missing email", () => {
    const result = createUserBodySchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      // Zod reports "Required" when the field is absent (custom message applies to empty string)
      expect(result.error.issues[0]?.message).toMatch(/required/i);
    }
  });

  // Optional: test several invalid inputs in one test with it.each
  it.each(["", "   "])("rejects empty email (%j)", (email) => {
    const result = createUserBodySchema.safeParse({ email });
    expect(result.success).toBe(false);
  });
});

// --- Example 2: another describe block for a different schema ----------------

describe("updateUserBodySchema", () => {
  it("accepts a partial update", () => {
    const result = updateUserBodySchema.safeParse({ fullName: "Ada Lovelace" });

    expect(result.success).toBe(true);
  });

  it("rejects unknown fields (.strict())", () => {
    const result = updateUserBodySchema.safeParse({ fullName: "Ada", extra: true });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid lastLoginAt date", () => {
    const result = updateUserBodySchema.safeParse({
      lastLoginAt: "not-a-date",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/valid ISO date/i);
    }
  });
});

// --- Your turn ----------------------------------------------------------------
// Add more `it(...)` blocks above, or create `users.service.test.ts` when you
// need to test DB-backed logic (you will mock `users.repository` there).
