import type { Request, Response } from "express";

import { formatZodError } from "../../shared/validation/format-zod-error";
import {
  createUserLogBodySchema,
  listUserLogsQuerySchema,
} from "./user-logs.schemas";
import * as userLogsService from "./user-logs.service";

function firstQueryString(val: unknown): string | undefined {
  if (typeof val === "string") {
    return val;
  }
  if (Array.isArray(val) && typeof val[0] === "string") {
    return val[0];
  }
  return undefined;
}

export async function listUserLogs(
  req: Request,
  res: Response,
): Promise<void> {
  const parsed = listUserLogsQuerySchema.safeParse({
    userId: firstQueryString(req.query.userId),
    action: firstQueryString(req.query.action),
    module: firstQueryString(req.query.module),
    limit: firstQueryString(req.query.limit),
    offset: firstQueryString(req.query.offset),
  });
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  const { limit, offset, ...filters } = parsed.data;
  try {
    const logs = await userLogsService.listUserLogs(filters, { limit, offset });
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
  const parsed = createUserLogBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: formatZodError(parsed.error) });
    return;
  }
  try {
    const log = await userLogsService.createUserLog({
      action: parsed.data.action,
      userId: parsed.data.userId ?? null,
      module: parsed.data.module ?? null,
      description: parsed.data.description ?? null,
      method: parsed.data.method ?? null,
      route: parsed.data.route ?? null,
      statusCode: parsed.data.statusCode ?? null,
      ipAddress: parsed.data.ipAddress ?? null,
      userAgent: parsed.data.userAgent ?? null,
      deviceType: parsed.data.deviceType ?? null,
      browser: parsed.data.browser ?? null,
      os: parsed.data.os ?? null,
      sessionId: parsed.data.sessionId ?? null,
      metadata: parsed.data.metadata ?? null,
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
