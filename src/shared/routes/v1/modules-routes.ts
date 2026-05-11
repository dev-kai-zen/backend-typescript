import { Router } from "express";

import { auditLogsRoutes } from "../../../modules/audit-logs/audit-logs.routes";
import { testRoutes } from "../../../modules/test-routes/test-routes";

export const v1ModulesRouter = Router();

v1ModulesRouter.use("/audit-logs", auditLogsRoutes);
v1ModulesRouter.use("/test", testRoutes);
