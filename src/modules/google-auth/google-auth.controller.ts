import type { Request, Response } from "express";

import { env } from "../../config/env-config";
import { buildUserPayload } from "./google-auth.payload";
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
  try {
    const body = req.body as { googleToken?: unknown };
    const googleToken = body.googleToken;
    if (typeof googleToken !== "string" || googleToken.trim() === "") {
      res
        .status(400)
        .json({ success: false, message: "Google Token is required" });
      return;
    }

    const { accessToken, refreshToken, user } =
      await loginWithGoogleIdToken(googleToken);

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      ...refreshCookieBase(),
      maxAge: REFRESH_COOKIE_MAX_MS,
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        user: buildUserPayload(user),
        permissions: [] as string[],
      },
    });
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    if (e.statusCode != null) {
      res.status(e.statusCode).json({ success: false, message: e.message });
      return;
    }
    console.error("google-auth login:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const raw = req.cookies?.[REFRESH_COOKIE_NAME];
    if (typeof raw !== "string" || raw.trim() === "") {
      clearRefreshCookie(res);
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }

    const accessToken = await refreshAccessToken(raw);
    res.json({
      success: true,
      message: "Token refreshed",
      data: { accessToken },
    });
  } catch (err) {
    clearRefreshCookie(res);
    const e = err as Error & { statusCode?: number };
    if (e.statusCode != null) {
      res.status(e.statusCode).json({ success: false, message: e.message });
      return;
    }
    console.error("google-auth refresh:", err);
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  clearRefreshCookie(res);
  res.json({
    success: true,
    message: "Logged out successfully",
    data: {},
  });
}

export async function me(req: Request, res: Response): Promise<void> {
  try {
    const user = req.authUser;
    if (!user?.id) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const fresh = await getMe(user.id);
    res.json({
      success: true,
      message: "User details fetched",
      data: {
        user: buildUserPayload(fresh.user),
        permissions: fresh.permissions,
      },
    });
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    if (e.statusCode != null) {
      res.status(e.statusCode).json({ success: false, message: e.message });
      return;
    }
    console.error("google-auth me:", err);
    res.status(500).json({ success: false, message: "Failed to load profile" });
  }
}
