import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../../modules/users/users.model";

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
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ success: false, message: "JWT not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as { sub?: unknown };
    const id =
      typeof decoded.sub === "number"
        ? decoded.sub
        : typeof decoded.sub === "string"
          ? Number.parseInt(decoded.sub, 10)
          : Number.NaN;
    if (!Number.isFinite(id)) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    const user = await User.findByPk(id);
    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    req.authUser = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
