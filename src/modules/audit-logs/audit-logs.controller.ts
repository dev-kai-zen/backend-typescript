import type { Request, Response } from "express";

import * as auditLogsService from "./audit-logs.service";

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

    const logs = await auditLogsService.listAuditLogs(
      { action, entityType },
      { limit, offset },
    );

    res.json({ data: logs });
  } catch (err) {
    console.error("listAuditLogs:", err);
    res.status(500).json({
      message: "Failed to list audit logs",
    });
  }
}
