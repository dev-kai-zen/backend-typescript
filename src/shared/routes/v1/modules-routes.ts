import { Router } from "express";

import { auditLogsRoutes } from "../../../modules/audit-logs/audit-logs.routes";
import { rbacRoutes } from "../../../modules/rbac/rbac.routes";
import { testRoutes } from "../../../modules/test-routes/test-routes";
import { userLogsRoutes } from "../../../modules/user-logs/user-logs.routes";

export const v1ModulesRouter = Router();

v1ModulesRouter.use("/audit-logs", auditLogsRoutes);
v1ModulesRouter.use("/rbac", rbacRoutes);
v1ModulesRouter.use("/test", testRoutes);
v1ModulesRouter.use("/user-logs", userLogsRoutes);
