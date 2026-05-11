import express from "express";

import { applyMiddlewares } from "./config/middleware-config";
import { registerRoutes } from "./shared/routes/index";

export function createApp() {
  const app = express();

  applyMiddlewares(app);
  registerRoutes(app);

  return app;
}
