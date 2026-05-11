import { Router } from "express";

/**
 * Test / sample routes for this feature module.
 * These paths are relative to where this router is mounted (see `modules-routes.ts`).
 */
export const testRoutes = Router();

testRoutes.get("/", (_req, res) => {
  res.json({ message: "backend-typescript API" });
});

testRoutes.get("/health", (_req, res) => {
  res.json({ status: "API is running" });
});
