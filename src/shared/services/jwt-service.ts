import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../../config/env-config";

/** Short-lived API access (sent in `Authorization` header). */
const ACCESS_EXPIRES_IN: SignOptions["expiresIn"] = "15m";

/** Long-lived rotation token (sent only as an httpOnly cookie from the backend). */
const REFRESH_EXPIRES_IN: SignOptions["expiresIn"] = "30d";

export function getJwtSecret(): string {
  return env.jwtSecret;
}

/** Access tokens carry the authenticated user id in standard JWT `sub`. */
export type AccessTokenPayload = {
  sub: number;
  typ: "access";
  roles: string[];
  permissions: string[];
};

export type RefreshTokenPayload = {
  sub: number;
  typ: "refresh";
};

export function signAccessToken(userId: number, roles: string[], permissions: string[]): string {
  const secret = getJwtSecret();
  const payload: AccessTokenPayload = { sub: userId, typ: "access", roles, permissions };
  const signOptions: SignOptions = { expiresIn: ACCESS_EXPIRES_IN };
  return jwt.sign(payload, secret, signOptions);
}

export function signRefreshToken(userId: number): string {
  const secret = getJwtSecret();
  const payload: RefreshTokenPayload = { sub: userId, typ: "refresh" };
  const signOptions: SignOptions = { expiresIn: REFRESH_EXPIRES_IN };
  return jwt.sign(payload, secret, signOptions);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

/**
 * Validates the access token and returns the signed payload (user id, roles, permissions).
 * Throws if the token is invalid, expired, or `sub` is not a finite number.
 */
export function verifyAccessTokenPayload(token: string): AccessTokenPayload {
  const secret = getJwtSecret();
  const decoded = jwt.verify(token, secret) as Record<string, unknown>;
  if (decoded.typ !== "access") {
    throw new Error("Invalid access token");
  }
  const id =
    typeof decoded.sub === "number"
      ? decoded.sub
      : typeof decoded.sub === "string"
        ? Number.parseInt(decoded.sub, 10)
        : Number.NaN;
  if (!Number.isFinite(id)) {
    throw new Error("Invalid token subject");
  }
  return {
    sub: id,
    typ: "access",
    roles: asStringArray(decoded.roles),
    permissions: asStringArray(decoded.permissions),
  };
}

/**
 * Validates the token and returns the user id from `sub`.
 * Throws if the token is invalid, expired, or `sub` is not a finite number.
 */
export function verifyAccessToken(token: string): number {
  return verifyAccessTokenPayload(token).sub;
}

/**
 * Validates a refresh JWT and returns the user id from `sub`.
 * Throws if the token is not typed as `refresh`, is invalid, or expired.
 */
export function verifyRefreshToken(token: string): number {
  const secret = getJwtSecret();
  const decoded = jwt.verify(token, secret) as {
    sub?: unknown;
    typ?: unknown;
  };
  if (decoded.typ !== "refresh") {
    throw new Error("Invalid refresh token");
  }
  const id =
    typeof decoded.sub === "number"
      ? decoded.sub
      : typeof decoded.sub === "string"
        ? Number.parseInt(decoded.sub, 10)
        : Number.NaN;
  if (!Number.isFinite(id)) {
    throw new Error("Invalid token subject");
  }
  return id;
}
