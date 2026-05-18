import { Router } from "express";

import * as auditLogsController from "./audit-logs.controller";

export const auditLogsRoutes = Router();

auditLogsRoutes.get("/", auditLogsController.listAuditLogs);
