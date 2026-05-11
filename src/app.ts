import express from "express";

import { applyMiddlewares } from "./config/middleware-config";
import { registerRoutes } from "./shared/routes/index";

/**
 * Request flow you can read top to bottom:
 *
 * 1. Create Express app
 * 2. Apply middlewares (shared for every request) — see `config/middleware-config.ts`
 * 3. Register routes — see `shared/routes/index.ts`
 *
 * Database: `sequelize` is imported in `index.ts` so the server only listens after DB auth succeeds.
 */
export function createApp() {
  const app = express();

  applyMiddlewares(app);
  registerRoutes(app);

  return app;
}
