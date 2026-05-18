import type { Router } from "express";

import { auditLogsRoutes } from "./audit-logs.routes";

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/audit-logs", auditLogsRoutes);
}
