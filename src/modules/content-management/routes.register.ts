import type { Router } from "express";

import { contentManagementRoutes } from "./content-management.routes";

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/content-management", contentManagementRoutes);
}
