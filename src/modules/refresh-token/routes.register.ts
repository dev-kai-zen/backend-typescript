import type { Router } from "express";

import { refreshTokenRoutes } from "./refresh-token.routes";

export const routeRegistrationOrder = 50;

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/refresh-tokens", refreshTokenRoutes);
}
