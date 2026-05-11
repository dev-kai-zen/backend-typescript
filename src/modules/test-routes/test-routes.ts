import { Router } from "express";

/**
 * Test / sample routes for this feature module.
 * These paths are relative to where this router is mounted (see `modules-routes.ts`).
 */
export const testRoutes = Router();

/**
 * @openapi
 * /test:
 *   get:
 *     tags: [Test]
 *     summary: Service welcome
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [message]
 *               properties:
 *                 message:
 *                   type: string
 *                   example: backend-typescript APIs
 */
testRoutes.get("/", (_req, res) => {
  res.json({ message: "backend-typescript APIs" });
});

/**
 * @openapi
 * /test/health:
 *   get:
 *     tags: [Test]
 *     summary: Health check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [status]
 *               properties:
 *                 status:
 *                   type: string
 *                   example: API is running
 */
testRoutes.get("/health", (_req, res) => {
  res.json({ status: "API is running" });
});
