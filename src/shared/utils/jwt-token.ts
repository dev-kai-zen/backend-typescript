import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../../config/env-config";

const DEFAULT_EXPIRES_IN: SignOptions["expiresIn"] = "7d";

export function getJwtSecret(): string {
  return env.jwtSecret;
}

/** Access tokens carry the authenticated user id in standard JWT `sub`. */
export type AccessTokenPayload = {
  sub: number;
};

export function signAccessToken(
  userId: number,
  options?: { expiresIn?: SignOptions["expiresIn"] },
): string {
  const secret = getJwtSecret();
  const payload: AccessTokenPayload = { sub: userId };
  const signOptions: SignOptions = {
    expiresIn: options?.expiresIn ?? DEFAULT_EXPIRES_IN,
  };
  return jwt.sign(payload, secret, signOptions);
}

/**
 * Validates the token and returns the user id from `sub`.
 * Throws if the token is invalid, expired, or `sub` is not a finite number.
 */
export function verifyAccessToken(token: string): number {
  const secret = getJwtSecret();
  const decoded = jwt.verify(token, secret) as { sub?: unknown };
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
