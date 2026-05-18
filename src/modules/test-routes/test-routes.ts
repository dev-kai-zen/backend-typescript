import { Router } from "express";

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
  res.json({ message: "backend-typescript APIs" });
});

testRoutes.get("/health", (_req, res) => {
  res.json({ status: "API is running" });
});

/** Valid Bearer access JWT only (`authenticateJwt`). */
testRoutes.get("/protected/me", authenticateJwt, (req, res) => {
  const user = req.authUser!;
  res.json({
    userId: user.id,
    email: user.email,
    rolesFromJwt: req.roles ?? [],
    permissionsFromJwt: req.permissions ?? [],
  });
});

/** JWT + guard using role names embedded in the access token (`source: "token"`). */
testRoutes.get(
  "/protected/by-jwt-role",
  authenticateJwt,
  routesGuard({
    // Replace with a real `rbac_roles.role_name` your user has.
    roles: ["admin"],
    source: "token",
  }),
  (_req, res) => {
    res.json({ message: "OK — JWT contained a matching role" });
  },
);

/** JWT + guard reloading roles/permissions from the DB (`source: "db"`). */
testRoutes.get(
  "/protected/by-db-permission",
  authenticateJwt,
  routesGuard({
    // Replace with a real `rbac_permissions.permission_code` granted via role links.
    permissions: ["user:view"],
    source: "db",
  }),
  (_req, res) => {
    res.json({
      message: "OK — current DB RBAC grants the required permission code",
    });
  },
);
