import type { Request, Response } from "express";

import { env } from "../../config/env-config";
import {
  sendError,
  sendSuccess,
  sendValidationError,
} from "../../shared/http/api-response";
import { handleControllerError } from "../../shared/http/handle-controller-error";
import { buildUserPayload } from "./google-auth.payload";
import { googleLoginBodySchema } from "./google-auth.schemas";
import {
  getMe,
  loginWithGoogleIdToken,
  refreshAccessToken,
} from "./google-auth.service";

/** Cookie name for the long-lived refresh JWT (httpOnly, not readable from JS). */
const REFRESH_COOKIE_NAME = "refresh_token";

const REFRESH_COOKIE_MAX_MS = 7 * 24 * 60 * 60 * 1000;

function refreshCookieBase() {
  return {
    httpOnly: true as const,
    secure: !env.isDevelopment,
    sameSite: "lax" as const,
    path: "/" as const,
  };
}

function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieBase());
}

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = googleLoginBodySchema.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error);
    return;
  }

  try {
    const { accessToken, refreshToken, user } = await loginWithGoogleIdToken(
      parsed.data.googleToken,
    );

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      ...refreshCookieBase(),
      maxAge: REFRESH_COOKIE_MAX_MS,
    });

    sendSuccess(
      res,
      {
        accessToken,
        user: buildUserPayload(user),
        permissions: [] as string[],
      },
      { message: "Login successful" },
    );
  } catch (err) {
    handleControllerError(res, err, "google-auth login", "Login failed");
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const raw = req.cookies?.[REFRESH_COOKIE_NAME];
    if (typeof raw !== "string" || raw.trim() === "") {
      clearRefreshCookie(res);
      sendError(res, 401, "Not authenticated");
      return;
    }

    const accessToken = await refreshAccessToken(raw);
    sendSuccess(res, { accessToken }, { message: "Token refreshed" });
  } catch (err) {
    clearRefreshCookie(res);
    handleControllerError(
      res,
      err,
      "google-auth refresh",
      "Not authenticated",
    );
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  clearRefreshCookie(res);
  sendSuccess(res, null, { message: "Logged out successfully" });
}

export async function me(req: Request, res: Response): Promise<void> {
  try {
    const user = req.authUser;
    if (!user?.id) {
      sendError(res, 401, "Unauthorized");
      return;
    }
    const fresh = await getMe(user.id);
    sendSuccess(
      res,
      {
        user: buildUserPayload(fresh.user),
        permissions: fresh.permissions,
      },
      { message: "User details fetched" },
    );
  } catch (err) {
    handleControllerError(
      res,
      err,
      "google-auth me",
      "Failed to load profile",
    );
  }
}
