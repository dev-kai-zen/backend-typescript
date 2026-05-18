import express, { type Router } from "express";

import { applyMiddlewares } from "./config/middleware-config";

export function createApp(v1ModulesRouter: Router): express.Express {
  const app = express();

  applyMiddlewares(app);
  app.use("/api/v1", v1ModulesRouter);

  return app;
}
