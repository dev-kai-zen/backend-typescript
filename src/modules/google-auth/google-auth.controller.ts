import type { Request, Response } from "express";

import { buildUserPayload } from "./google-auth.payload";
import { getMe, loginWithGoogleIdToken } from "./google-auth.service";

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

    const { accessToken, user } = await loginWithGoogleIdToken(googleToken);
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

export async function logout(_req: Request, res: Response): Promise<void> {
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
