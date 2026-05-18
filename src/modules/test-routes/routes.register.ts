import type { Router } from "express";

import { testRoutes } from "./test-routes";

export const routeRegistrationOrder = 60;

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/test", testRoutes);
}
