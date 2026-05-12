import type { Request, Response, NextFunction } from "express";

import { User } from "../../modules/users/users.model";
import { verifyAccessToken } from "../utils/jwt-token";

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

  let userId: number;
  try {
    userId = verifyAccessToken(token);
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
    return;
  }

  const user = await User.findByPk(userId);
  if (!user || !user.isActive) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  req.authUser = user;
  next();
}
