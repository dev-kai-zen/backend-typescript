import { describe, expect, it } from "vitest";

import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyAccessTokenPayload,
  verifyRefreshToken,
} from "./jwt-service";

describe("jwt-service", () => {
  it("round-trips access tokens with roles and permissions", () => {
    const token = signAccessToken(1, ["admin"], ["user:view"]);
    const payload = verifyAccessTokenPayload(token);

    expect(payload).toEqual({
      sub: 1,
      typ: "access",
      roles: ["admin"],
      permissions: ["user:view"],
    });
    expect(verifyAccessToken(token)).toBe(1);
  });

  it("round-trips refresh tokens", () => {
    const token = signRefreshToken(99);
    expect(verifyRefreshToken(token)).toBe(99);
  });

  it("rejects access tokens verified as refresh", () => {
    const access = signAccessToken(1, [], []);
    expect(() => verifyRefreshToken(access)).toThrow("Invalid refresh token");
  });

  it("rejects refresh tokens verified as access payload", () => {
    const refresh = signRefreshToken(1);
    expect(() => verifyAccessTokenPayload(refresh)).toThrow();
  });
});
