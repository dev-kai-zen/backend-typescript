import type { Router } from "express";

import { userLogsRoutes } from "./user-logs.routes";

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/user-logs", userLogsRoutes);
}
