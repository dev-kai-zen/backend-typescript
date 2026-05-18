import type { Router } from "express";

import { refreshTokenRoutes } from "./refresh-token.routes";

export function registerV1Routes(v1Router: Router): void {
  v1Router.use("/refresh-tokens", refreshTokenRoutes);
}
