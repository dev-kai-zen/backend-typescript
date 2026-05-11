import { Router } from "express";

import { listAuditLogs } from "./audit-logs.controller";

export const auditLogsRoutes = Router();

auditLogsRoutes.get("/", listAuditLogs);
