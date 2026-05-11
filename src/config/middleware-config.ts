import type { Express } from "express";
import cors from "cors";
import express from "express";

import { setupSwagger } from "./swagger-config";

/**
 * Register global middleware here in order (top runs first).
 * When you add a new middleware library, wire it here so `app.ts` stays short.
 */
export function applyMiddlewares(app: Express): void {
  const frontendOrigin =
    process.env.FRONTEND_ORIGIN?.trim() || "http://localhost:5173";
  app.use(
    cors({
      origin: frontendOrigin,
      credentials: true,
    }),
  );
  app.use(express.json());

  setupSwagger(app);

  // Add more middlewares below this line, e.g.:
  // app.use(rateLimiter);
}
