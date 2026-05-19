import { Router } from "express";

import { createApp } from "../../src/app";
import { testRoutes } from "../../src/modules/test-routes/test-routes";

/** Minimal app mounting only sample `/api/v1/test` routes (no DB on boot). */
export function createTestApp() {
  const v1Router = Router();
  v1Router.use("/test", testRoutes);
  return createApp(v1Router);
}
