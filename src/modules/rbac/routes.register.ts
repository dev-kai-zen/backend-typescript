import type { Router } from "express";

import { rbacRoutes } from "./rbac.routes";

export const routeRegistrationOrder = 40;

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/rbac", rbacRoutes);
}
