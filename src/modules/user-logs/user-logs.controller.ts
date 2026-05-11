import type { Request, Response } from "express";

import * as userLogsService from "./user-logs.service";

export async function listUserLogs(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    let userId: number | undefined;
    if (typeof req.query.userId === "string" && req.query.userId !== "") {
      const n = Number.parseInt(req.query.userId, 10);
      if (Number.isFinite(n)) {
        userId = n;
      }
    }

    const action =
      typeof req.query.action === "string" && req.query.action !== ""
        ? req.query.action
        : undefined;
    const module =
      typeof req.query.module === "string" && req.query.module !== ""
        ? req.query.module
        : undefined;

    let limit: number | undefined;
    if (typeof req.query.limit === "string") {
      const n = Number.parseInt(req.query.limit, 10);
      if (Number.isFinite(n) && n >= 0) {
        limit = n;
      }
    }

    let offset: number | undefined;
    if (typeof req.query.offset === "string") {
      const n = Number.parseInt(req.query.offset, 10);
      if (Number.isFinite(n) && n >= 0) {
        offset = n;
      }
    }

    const logs = await userLogsService.listUserLogs(
      { userId, action, module },
      { limit, offset },
    );
    res.json({ data: logs });
  } catch (err) {
    console.error("listUserLogs:", err);
    res.status(500).json({ message: "Failed to list user logs" });
  }
}

export async function createUserLog(
  req: Request,
  res: Response,
): Promise<void> {
  const body = req.body as Record<string, unknown>;
  if (!body.action || typeof body.action !== "string") {
    res.status(400).json({ message: "action is required" });
    return;
  }

  let userId: number | null = null;
  if (body.userId !== undefined && body.userId !== null) {
    if (typeof body.userId === "number" && Number.isFinite(body.userId)) {
      userId = body.userId;
    } else if (
      typeof body.userId === "string" &&
      body.userId.trim() !== ""
    ) {
      const n = Number.parseInt(body.userId.trim(), 10);
      if (Number.isFinite(n)) {
        userId = n;
      } else {
        res.status(400).json({ message: "userId must be a number" });
        return;
      }
    } else {
      res.status(400).json({ message: "userId must be a number or null" });
      return;
    }
  }

  let statusCode: number | null = null;
  if (body.statusCode !== undefined && body.statusCode !== null) {
    if (typeof body.statusCode === "number" && Number.isFinite(body.statusCode)) {
      statusCode = body.statusCode;
    } else {
      res.status(400).json({ message: "statusCode must be a number" });
      return;
    }
  }

  try {
    const log = await userLogsService.createUserLog({
      userId,
      action: body.action,
      module: typeof body.module === "string" ? body.module : null,
      description:
        typeof body.description === "string" ? body.description : null,
      method: typeof body.method === "string" ? body.method : null,
      route: typeof body.route === "string" ? body.route : null,
      statusCode,
      ipAddress:
        typeof body.ipAddress === "string" ? body.ipAddress : null,
      userAgent:
        typeof body.userAgent === "string" ? body.userAgent : null,
      deviceType:
        typeof body.deviceType === "string" ? body.deviceType : null,
      browser: typeof body.browser === "string" ? body.browser : null,
      os: typeof body.os === "string" ? body.os : null,
      sessionId:
        typeof body.sessionId === "string" ? body.sessionId : null,
      metadata:
        typeof body.metadata === "object" && body.metadata !== null
          ? (body.metadata as Record<string, unknown>)
          : null,
    });
    res.status(201).json(log);
  } catch (err) {
    console.error("createUserLog:", err);
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Failed to create user log" });
  }
}
