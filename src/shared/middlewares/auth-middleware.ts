import type { Request, Response, NextFunction } from "express";

import { User } from "../../modules/users/users.model";
import {
  type AccessTokenPayload,
  verifyAccessTokenPayload,
} from "../services/jwt-service";

export async function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const token = header.slice("Bearer ".length).trim();

  let payload: AccessTokenPayload;
  try {
    payload = verifyAccessTokenPayload(token);
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
    return;
  }

  const user = await User.findByPk(payload.sub);
  if (!user || !user.is_active) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  req.authUser = user;
  req.roles = payload.roles;
  req.permissions = payload.permissions;
  next();
}
