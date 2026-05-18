import { Router } from "express";

import * as rbacRolePermissionController from "./rbac-role-permissions.controller";

/** Nested under `/rbac/roles` (mounted with prefix `/roles`). */
export const rbacRolePermissionsRoutes = Router();

rbacRolePermissionsRoutes.get("/:id/permissions", rbacRolePermissionController.listRolePermissions);
rbacRolePermissionsRoutes.put("/:id/permissions", rbacRolePermissionController.setRolePermissions);
rbacRolePermissionsRoutes.post("/:id/permissions", rbacRolePermissionController.createRolePermission);
rbacRolePermissionsRoutes.delete(
  "/:id/permissions/:permissionId",
  rbacRolePermissionController.deleteRolePermission,
);
