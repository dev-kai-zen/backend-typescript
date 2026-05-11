import { Router } from "express";

import { auditLogsRoutes } from "../../../modules/audit-logs/audit-logs.routes";
import { googleAuthRoutes } from "../../../modules/google-auth/google-auth.routes";
import { rbacRoutes } from "../../../modules/rbac/rbac.routes";
import { refreshTokenRoutes } from "../../../modules/refresh-token/refresh-token.routes";
import { testRoutes } from "../../../modules/test-routes/test-routes";
import { userLogsRoutes } from "../../../modules/user-logs/user-logs.routes";
import { usersRoutes } from "../../../modules/users/users.routes";

export const v1ModulesRouter = Router();

v1ModulesRouter.use("/audit-logs", auditLogsRoutes);
v1ModulesRouter.use("/google-auth", googleAuthRoutes);
v1ModulesRouter.use("/rbac", rbacRoutes);
v1ModulesRouter.use("/refresh-tokens", refreshTokenRoutes);
v1ModulesRouter.use("/test", testRoutes);
v1ModulesRouter.use("/user-logs", userLogsRoutes);
v1ModulesRouter.use("/users", usersRoutes);
