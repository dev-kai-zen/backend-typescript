import { describe, expect, it } from "vitest";

import { parseRouteId } from "./parse-route-id";

describe("parseRouteId", () => {
  it("parses a positive integer string", () => {
    expect(parseRouteId("42")).toBe(42);
  });

  it("uses the first element when given an array", () => {
    expect(parseRouteId(["7", "8"])).toBe(7);
  });

  it("parses only the integer prefix (parseInt semantics)", () => {
    expect(parseRouteId("1.5")).toBe(1);
  });

  it.each([
    undefined,
    "",
    "0",
    "-1",
    "abc",
    [],
    [""],
  ] as const)("returns null for invalid input (%j)", (raw) => {
    expect(parseRouteId(raw)).toBeNull();
  });
});
