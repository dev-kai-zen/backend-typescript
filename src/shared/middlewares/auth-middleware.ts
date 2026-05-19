import type { Request, Response, NextFunction } from "express";

import { sendError } from "../http/api-response";
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
    sendError(res, 401, "Unauthorized");
    return;
  }

  const token = header.slice("Bearer ".length).trim();

  let payload: AccessTokenPayload;
  try {
    payload = verifyAccessTokenPayload(token);
  } catch {
    sendError(res, 401, "Invalid or expired token");
    return;
  }

  const user = await User.findByPk(payload.sub);
  if (!user || !user.is_active) {
    sendError(res, 401, "Unauthorized");
    return;
  }

  req.authUser = user;
  req.roles = payload.roles;
  req.permissions = payload.permissions;
  next();
}
