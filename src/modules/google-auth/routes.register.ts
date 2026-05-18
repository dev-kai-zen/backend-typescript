import type { Router } from "express";

import { googleAuthRoutes } from "./google-auth.routes";

export const routeRegistrationOrder = 30;

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/google-auth", googleAuthRoutes);
}
