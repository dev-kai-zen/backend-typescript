import { Router } from "express";

import { sendSuccess } from "../../shared/http/api-response";
import { authenticateJwt } from "../../shared/middlewares/auth-middleware";
import routesGuard from "../../shared/middlewares/routes-guard";

/**
 * Test / sample routes for this feature module.
 * These paths are relative to `/api/v1/test` (see this module’s `routes.register.ts`).
 *
 * Mounted at `/api/v1/test` — e.g. `GET /api/v1/test/protected/me`.
 */
export const testRoutes = Router();

testRoutes.get("/", (_req, res) => {
  sendSuccess(
    res,
    { service: "backend-typescript" },
    {
      message: "backend-typescript APIsss",
    },
  );
});

testRoutes.get("/health", (_req, res) => {
  sendSuccess(
    res,
    { status: "API is running" },
    { message: "Health check OK" },
  );
});

/** Valid Bearer access JWT only (`authenticateJwt`). */
testRoutes.get("/protected/me", authenticateJwt, (req, res) => {
  const user = req.authUser!;
  sendSuccess(
    res,
    {
      userId: user.id,
      email: user.email,
      rolesFromJwt: req.roles ?? [],
      permissionsFromJwt: req.permissions ?? [],
    },
    { message: "Authenticated profile from JWT" },
  );
});

/** JWT + guard using role names embedded in the access token (`source: "token"`). */
testRoutes.get(
  "/protected/by-jwt-role",
  authenticateJwt,
  routesGuard({
    roles: ["admin"],
    source: "token",
  }),
  (_req, res) => {
    sendSuccess(res, null, { message: "OK — JWT contained a matching role" });
  },
);

/** JWT + guard reloading roles/permissions from the DB (`source: "db"`). */
testRoutes.get(
  "/protected/by-db-permission",
  authenticateJwt,
  routesGuard({
    permissions: ["user:view"],
    source: "db",
  }),
  (_req, res) => {
    sendSuccess(res, null, {
      message: "OK — current DB RBAC grants the required permission code",
    });
  },
);
