import type { Request, Response } from "express";

import * as auditLogsService from "./audit-logs.service";

function parseLimit(value: unknown): number | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function parseOffset(value: unknown): number | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export async function listAuditLogs(req: Request, res: Response): Promise<void> {
  try {
    const action =
      typeof req.query.action === "string" && req.query.action !== ""
        ? req.query.action
        : undefined;
    const entityType =
      typeof req.query.entityType === "string" &&
      req.query.entityType !== ""
        ? req.query.entityType
        : undefined;

    const logs = await auditLogsService.listAuditLogs(
      { action, entityType },
      { limit: parseLimit(req.query.limit), offset: parseOffset(req.query.offset) },
    );

    res.json({ data: logs });
  } catch (err) {
    console.error("listAuditLogs:", err);
    res.status(500).json({
      message: "Failed to list audit logs",
    });
  }
}
